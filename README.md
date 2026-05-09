# 🤖 AI Resume Pro    [![Live Demo](https://img.shields.io/badge/Live-Demo-blue)](https://ai-resume-pro-ochre.vercel.app)

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Gemini API](https://img.shields.io/badge/Gemini_API-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://aistudio.google.com/)

An AI powered resume analyzer that checks your resume for **ATS (Applicant Tracking System) compatibility**, gives you a real time score, and delivers intelligent optimization suggestions.

---

## 🌟 Overview

Job seekers often lose opportunities because their resumes are filtered out by ATS software before a human ever reads them. **AI Resume Pro** solves this problem by instantly analyzing your resume and telling you exactly what to fix.

**Key Benefits:**

- 🎯 **Know your ATS score** before you apply
- 🔍 **Understand why** your resume is being rejected
- 💡 **Get specific suggestions** to improve it instantly
- ⚡ **Real-time feedback** — no waiting, no guessing

---

## 🎬 Demo

https://github.com/PiyumiAnupama/ai-resume-pro/raw/master/public/1.mp4

---

## ✨ Features

- 📄 **Resume Upload** — Upload your resume in PDF format
- 🤖 **AI Analysis** — Gemini API evaluates content against ATS best practices
- 📊 **ATS Score** — Get a compatibility score with a detailed breakdown
- 🔍 **Keyword Suggestions** — See which keywords are missing for your target role
- 💾 **Save Results** — Analysis history stored in MongoDB
- 📱 **Responsive UI** — Works on desktop and mobile browsers

---

## 🛠 Technologies Used

| Category | Details |
|---|---|
| Frontend | React.js, CSS |
| Backend | Python, Node.js |
| Database | MongoDB |
| AI Integration | Google Gemini API |
| Tools | VS Code, Postman, Git, GitHub |

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v16 or above
- [Python](https://www.python.org/) v3.8 or above
- [MongoDB](https://www.mongodb.com/) (local or Atlas cloud)
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey)

---

### 📦 Installation

**1. Clone the repository**

```bash
git clone https://github.com/PiyumiAnupama/ai-resume-pro.git
cd ai-resume-pro
```

**2. Install and run the Frontend**

```bash
npm install
npm start
```

The React app will open at `http://localhost:3000`

**3. Install and run the Backend**

```bash
cd backend
pip install -r requirements.txt
python app.py
```

---

### 🔑 Environment Variables

Create a `.env` file inside the `backend/` folder and add:

```env
GEMINI_API_KEY=your_google_gemini_api_key_here
MONGO_URI=your_mongodb_connection_string_here
PORT=5000
```

> ⚠️ Never commit your `.env` file. It is already included in `.gitignore`.

---

## 📁 Project Structure

```
ai-resume-pro/
│
├── public/               # Static assets
├── src/                  # React frontend source
│   ├── components/       # Reusable UI components
│   ├── pages/            # App pages/views
│   └── App.js            # Root component
│
├── backend/              # Python backend
│   ├── app.py            # Server entry point
│   └── requirements.txt  # Python dependencies
│
├── .gitignore
├── package.json
└── README.md
```

---

## 🗺️ Roadmap

- [x] Resume upload and parsing
- [x] ATS compatibility scoring with Gemini API
- [x] Keyword gap analysis and suggestions
- [ ] Job description matching (paste a JD, get tailored feedback)
- [ ] User login and personal history dashboard
- [ ] Export analysis report as PDF
- [ ] DOCX resume format support

---

## 📧 Contact

**Anupama Piyadigama**

- 💼 LinkedIn: [linkedin.com/in/anupamapiyadigama](https://linkedin.com/in/anupamapiyadigama)
- 🐙 GitHub: [github.com/PiyumiAnupama](https://github.com/PiyumiAnupama)
- 🎨 Behance: [behance.net/piyumianupama1](https://behance.net/piyumianupama1)

---

*Built with 💻 by Anupama Piyadigama | 2025*
