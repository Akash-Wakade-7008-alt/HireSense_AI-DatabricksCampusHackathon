# 🛡️ JobGuard AI — Intelligent Job Fraud Detection

JobGuard AI is an AI-powered web application that helps job seekers identify fraudulent job offers. By analyzing job descriptions, emails, or uploaded screenshots, the platform detects suspicious patterns and provides a clear risk assessment.

In a world where online job scams are increasing, JobGuard AI acts as a simple, fast, and reliable first line of defense.

---

## 📸 Preview

![JobGuard AI Preview](./assets/Preview.png)

---

## 🚀 Features

* 🔍 Analyze job descriptions for scam indicators
* 🖼️ Upload screenshots of job offers
* 🤖 AI-powered fraud detection using Gemini
* ⚡ Fast and responsive UI
* 📊 Clear risk assessment (Legit / Suspicious / High Risk)
* 🎯 Clean and beginner-friendly interface

---

## 🧠 How It Works

1. Paste a job description or upload a screenshot
2. The frontend sends data to the backend
3. Backend processes input using AI (Gemini API)
4. The system detects red flags (fake domains, urgency, payment requests, etc.)
5. A risk score and explanation are returned
6. Results are displayed instantly on the UI

---

## 🖥️ Frontend

The frontend is designed for clarity and ease of use, ensuring users can quickly check job offers without friction.

### Tech Stack:

* HTML, CSS, TypeScript
* Vite

### Responsibilities:

* Accept user input (text or image upload)
* Display analysis results clearly
* Provide smooth and responsive UI
* Communicate with backend APIs

---

## ⚙️ Backend

The backend is responsible for processing data and performing AI-based fraud detection.

### Tech Stack:

* Node.js / Python (depending on your implementation)
* Google Gemini API
* REST API

### Responsibilities:

* Receive user input
* Process text and image data
* Send prompts to Gemini API
* Detect scam patterns and anomalies
* Return structured fraud analysis

---

## 🤖 AI Integration (Gemini)

This project uses Google's Gemini API to analyze job-related content and detect fraud signals.

### What the AI checks:

* Unrealistic salary offers
* Requests for upfront payments
* Suspicious email domains
* Urgency or pressure tactics
* Lack of company authenticity

---

## 📁 Project Structure

```
├── assets/             # Images and static files
│   └── Preview.png     # App preview image
├── src/                # Frontend source code
├── node_modules/       # Dependencies
├── index.html          # Main entry point
├── package.json        # Project metadata and scripts
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript config
├── .env.example        # Environment variables template
└── README.md           # Project documentation
```

---

## 🔧 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/jobguard-ai.git
cd jobguard-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file in the root directory and add:

```env
GEMINI_API_KEY=your_api_key_here
```

> ⚠️ Never commit your API keys or `.env` file to GitHub.

---

### 4. Run the project

```bash
npm run dev
```

---

## 🌐 Usage

* Paste a job description OR upload an image
* Click **"Scan for Fraud"**
* Instantly receive AI-based fraud analysis

---

## 🎯 Future Improvements

* 🔐 User authentication system
* 📊 Detailed fraud reports with scoring breakdown
* 🌍 Multi-language support
* 🧩 Browser extension for LinkedIn / job portals
* 📁 History of scanned job offers
* 📈 Analytics dashboard

---

## 🧪 Example Use Cases

* Checking suspicious LinkedIn job offers
* Verifying emails from unknown recruiters
* Screening freelance job proposals
* Detecting scam internship postings

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

---

## 📜 License

This project is licensed under the MIT License.

---

## 💡 Inspiration

Many job seekers—especially students—fall victim to scams due to lack of awareness.
JobGuard AI was built to provide a simple tool that empowers users to verify opportunities before trusting them.

---

## 👨‍💻 Author

Built with ❤️ by Akash Wakade

---

## ⭐ Support

If you found this project useful, consider giving it a star ⭐ on GitHub!
