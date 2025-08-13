import os
import io
import json
import asyncio
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from docx import Document
from PyPDF2 import PdfReader
from dotenv import load_dotenv
import httpx
from tenacity import retry, stop_after_attempt, wait_exponential, RetryError # Import RetryError

# Load environment variables from .env file (if it exists)
load_dotenv()

app = FastAPI()

# Configure CORS to allow requests from your React frontend
# In a production environment, replace "*" with your frontend's specific URL
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Function to extract text from DOCX files
def extract_text_from_docx(docx_file: io.BytesIO) -> str:
    """
    Extracts text from a DOCX file.
    """
    document = Document(docx_file)
    full_text = []
    for para in document.paragraphs:
        full_text.append(para.text)
    return "\n".join(full_text)

# Function to extract text from PDF files
def extract_text_from_pdf(pdf_file: io.BytesIO) -> str:
    """
    Extracts text from a PDF file.
    """
    reader = PdfReader(pdf_file)
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""
    return text

# Function to call the Gemini API for resume review with exponential backoff
@retry(stop=stop_after_attempt(5), wait=wait_exponential(multiplier=1, min=4, max=10))
async def get_gemini_review(resume_text: str, job_description: str = "") -> dict:
    """
    Calls the Gemini API to review the resume and provide suggestions.
    """
    # Load API key from environment variables
    # For local development, ensure you have a .env file in the backend directory
    # with GEMINI_API_KEY="YOUR_ACTUAL_GEMINI_API_KEY_HERE"
    API_KEY = os.getenv("GEMINI_API_KEY") 
    
    # --- DEBUGGING LINE ADDED HERE ---
    print(f"DEBUG: API_KEY being used: {'*' * len(API_KEY) if API_KEY else 'None (API Key not loaded)'}")
    # --- END DEBUGGING LINE ---

    if not API_KEY:
        raise HTTPException(status_code=500, detail="Gemini API Key not found. Please set GEMINI_API_KEY in your .env file.")

    # Construct the prompt for the AI model
    prompt_parts = [
        "You are an expert AI-powered Resume Reviewer. Your task is to analyze the provided resume text thoroughly. ",
        "Provide a comprehensive review covering the following aspects in a structured JSON format:\n",
        "- **ATS Friendliness**: Assess how well the resume is optimized for Applicant Tracking Systems. Provide a score (0-100) and specific reasons/suggestions.\n",
        "- **Improvements**: Suggest detailed improvements for content, clarity, conciseness, and impact. List at least 3-5 actionable points.\n",
        "- **Mistakes**: Identify common resume mistakes (e.g., typos, grammatical errors, inconsistent formatting, vague language, missing quantifiable achievements). List at least 3-5 specific mistakes.\n",
        "- **Keyword Suitability**: If a job description is provided, analyze the resume for suitable keywords relevant to that job description. If no job description is provided, suggest general industry-relevant keywords based on the resume's content. Provide a list of suggested keywords and explain why they are suitable.\n",
        "- **LinkedIn Optimization**: Based on the resume content, provide concrete suggestions for optimizing a LinkedIn profile. List at least 3-5 actionable tips (e.g., headline, summary, experience section, skills, recommendations).\n\n",
        "**Resume Text:**\n",
        resume_text,
        "\n\n"
    ]

    if job_description:
        prompt_parts.append(f"**Job Description (for keyword suitability):**\n{job_description}\n\n")

    prompt_parts.append("Please provide the output in a single JSON object with the following keys: `ats_friendliness` (object with `score` and `suggestions`), `improvements` (array of strings), `mistakes` (array of strings), `keyword_suitability` (object with `suggested_keywords` as array of strings and `explanation`), and `linkedin_optimization` (array of strings).")

    full_prompt = "".join(prompt_parts)
    print(f"DEBUG: Prompt length: {len(full_prompt)} characters.")
    # Optional: Truncate prompt if it's too long for the model's context window
    # You might need to adjust this based on the model's actual token limit
    # A common rule of thumb is 4 characters per token, so 30000 chars is roughly 7500 tokens
    # If the resume is very long, consider summarizing it before sending to the LLM
    if len(full_prompt) > 30000: # Example limit, adjust as needed
        print("WARNING: Prompt is very long, truncating to 30000 characters.")
        full_prompt = full_prompt[:30000]

    chat_history = []
    chat_history.append({ "role": "user", "parts": [{ "text": full_prompt }] })

    # Payload for the Gemini API call
    payload = {
        "contents": chat_history,
        "generationConfig": {
            "responseMimeType": "application/json",
            "responseSchema": {
                "type": "OBJECT",
                "properties": {
                    "ats_friendliness": {
                        "type": "OBJECT",
                        "properties": {
                            "score": {"type": "INTEGER"},
                            "suggestions": {"type": "ARRAY", "items": {"type": "STRING"}}
                        },
                        "required": ["score", "suggestions"]
                    },
                    "improvements": {"type": "ARRAY", "items": {"type": "STRING"}},
                    "mistakes": {"type": "ARRAY", "items": {"type": "STRING"}},
                    "keyword_suitability": {
                        "type": "OBJECT",
                        "properties": {
                            "suggested_keywords": {"type": "ARRAY", "items": {"type": "STRING"}},
                            "explanation": {"type": "STRING"}
                        },
                        "required": ["suggested_keywords", "explanation"]
                    },
                    "linkedin_optimization": {"type": "ARRAY", "items": {"type": "STRING"}}
                },
                "required": ["ats_friendliness", "improvements", "mistakes", "keyword_suitability", "linkedin_optimization"]
            }
        }
    }

    api_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key={API_KEY}"

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(api_url, json=payload, timeout=60.0)
            response.raise_for_status() # Raise an exception for bad status codes (4xx or 5xx)
            result = response.json()
        except httpx.HTTPStatusError as e:
            print(f"ERROR: HTTP Status Error from Gemini API: {e.response.status_code}")
            print(f"ERROR: Gemini API Response Body: {e.response.text}")
            raise HTTPException(status_code=500, detail=f"Gemini API error: {e.response.status_code} - {e.response.text}")
        except httpx.RequestError as e:
            print(f"ERROR: Request Error to Gemini API: {e}")
            raise HTTPException(status_code=500, detail=f"Network error communicating with Gemini API: {e}")
        except json.JSONDecodeError as e:
            print(f"ERROR: Failed to decode JSON from Gemini API response: {e}")
            print(f"ERROR: Raw response text: {response.text}")
            raise HTTPException(status_code=500, detail="Gemini API returned invalid JSON.")
        except Exception as e:
            print(f"ERROR: An unexpected error occurred during Gemini API call: {e}")
            raise HTTPException(status_code=500, detail=f"Unexpected error during AI processing: {e}")


    if result.get("candidates") and len(result["candidates"]) > 0 and \
       result["candidates"][0].get("content") and result["candidates"][0]["content"].get("parts") and \
       len(result["candidates"][0]["content"]["parts"]) > 0:
        json_string = result["candidates"][0]["content"]["parts"][0].get("text")
        if json_string:
            try:
                parsed_json = json.loads(json_string)
                return parsed_json
            except json.JSONDecodeError as e:
                print(f"ERROR: Error decoding JSON from AI response: {e}")
                print(f"ERROR: Raw AI response text: {json_string}")
                raise HTTPException(status_code=500, detail="AI returned malformed JSON.")
        else:
            raise ValueError("AI response text part is empty.")
    else:
        raise ValueError("Unexpected AI response structure or missing content.")


@app.post("/review-resume/")
async def review_resume(file: UploadFile = File(...), job_description: str = Form("")):
    """
    API endpoint to receive a resume file and an optional job description,
    then process it using the AI model.
    """
    file_extension = file.filename.split(".")[-1].lower()
    resume_text = ""

    try:
        file_content = await file.read()
        if file_extension == "docx":
            resume_text = extract_text_from_docx(io.BytesIO(file_content))
        elif file_extension == "pdf":
            resume_text = extract_text_from_pdf(io.BytesIO(file_content))
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type. Please upload a .docx or .pdf file.")

        if not resume_text.strip():
            raise HTTPException(status_code=400, detail="Could not extract text from the resume. Please ensure it's a readable document.")

        # Get AI review
        ai_review = await get_gemini_review(resume_text, job_description)
        return JSONResponse(content=ai_review)

    except HTTPException as e:
        raise e
    except RetryError as e:
        # Catch the RetryError specifically from tenacity
        print(f"An error occurred during resume processing (RetryError): {e}")
        raise HTTPException(status_code=500, detail=f"Failed to get review from AI after multiple retries. Please try again.")
    except Exception as e:
        print(f"An unexpected error occurred during resume processing: {e}")
        raise HTTPException(status_code=500, detail=f"An internal server error occurred: {e}")

# To run this backend:
# 1. Save the above code as `main.py`
# 2. Save the dependencies as `requirements.txt`
# 3. Install dependencies: `pip install -r requirements.txt`
# 4. Run the server: `uvicorn main:app --reload`
# The server will typically run on http://127.0.0.1:8000
