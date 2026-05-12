# Emotion AI (Lumina Tracker)

**Lumina Tracker** is a professional, high-performance real-time emotional intelligence dashboard. It leverages browser-based neural networks (via `face-api.js`) to analyze facial expressions, detect engagement metrics, and track emotional trends with sub-100ms latency.

![Project Preview](https://via.placeholder.com/1200x500/0a0a0f/6366f1?text=Emotion+AI+Lumina+Dashboard)

---

## 🚀 Key Features

- ⚡ **Real-Time AI Tracking**: Instant emotion detection directly in the browser using neural networks.
- 🧬 **Cyber Face Mesh**: Dynamic, real-time visualization of 68 facial landmarks and bounding box tracking.
- 📸 **Manual Photo Analysis**: A dedicated capture mode with a **5-second animated countdown** for high-precision snapshots.
- 📊 **Professional Dashboard**: A clean, distraction-free dark theme (`#0a0a0f`) designed for serious data analysis.
- 📥 **CSV Session Export**: Download a full history of every detected emotion and engagement metric for an entire session with one click.
- 👁️ **Engagement Analytics**: Live tracking of Eye Contact, Attention span, and AI detection Confidence.

---

## 🏗️ Technology Stack

### Frontend
- **React 18** + **Vite**: Ultra-fast, modern reactive UI framework.
- **Tailwind CSS**: Professional, custom-themed utility-first styling.
- **face-api.js**: Browser-based machine learning for face & emotion detection.
- **Chart.js**: Real-time line and bar charts for emotional trends.
- **Lucide React**: Premium icon set for a professional look.

### Backend
- **ASP.NET Core 8.0**: High-performance API foundation and static file hosting.
- **C# 12**: Modern, strongly-typed server logic.

---

## 💻 Running the Project (Step-by-Step)

### Prerequisites
- [Node.js 18+](https://nodejs.org/)
- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)

### 1️⃣ Launching the Backend (API & Hosting)
1. Open your terminal.
2. Navigate to the `server` directory:
   ```powershell
   cd server
   ```
3. Run the backend server:
   ```powershell
   dotnet run
   ```
4. The backend will start (default: `https://localhost:7001`). This provides the foundation for the local development environment.

### 2️⃣ Launching the Frontend (React Application)
1. Open a **second** terminal window.
2. Navigate to the `Client` directory:
   ```powershell
   cd Client
   ```
3. Install the required dependencies:
   ```powershell
   npm install
   ```
4. Start the development server in "Cyber" mode:
   ```powershell
   npm run dev
   ```
5. Open your browser to: **`http://localhost:5173`**

---

## 📖 Usage Guide

1. **Start Tracking**: Click the blue **"Start"** button to load the AI models and activate your webcam.
2. **Real-Time Mode**: Observe live emotional shifts and engagement metrics on the right panels.
3. **Photo Analysis**: Toggle the mode to "Photo", position your face within the bounding box, and click **"Capture"** to trigger the 5-second countdown.
4. **Data Analysis**: Review the **Emotion Trends** chart at the bottom to see progress over time.
5. **Session Export**: Click the **"Export CSV"** button in the header to download your entire session history as a spreadsheet.
6. **Stop Tracking**: Hit the big red **"Stop"** button in the top-right corner to instantly halt all monitoring.

---

## 📁 Project Structure

```
EmotionalFeedbackTracker/
├── Client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # UI Components (VideoFeed, Panels, Charts)
│   │   ├── hooks/          # Core AI & Tracking logic (useEmotionTracking)
│   │   └── index.css       # Clean Dark Theme CSS Variables
├── server/                 # ASP.NET Core Backend
│   ├── Models/             # Shared Data Entities
│   └── Services/           # API Logic
```

---

**Built with ❤️ for Real-Time Emotional Analytics**