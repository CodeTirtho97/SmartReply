# SmartReply+

**One Click. Smart Reply.**

An AI-powered Gmail Chrome extension that generates intelligent email replies using Gemini AI. Transform your email productivity with instant, contextually appropriate responses.

![SmartReply+ Logo](./assets/smartreply-logo.png)

### Check out the Chrome Extension Now! [SmartReply+ Chrome Extension]()

## 🚀 Features

### Core Features

- **One-Click Reply Generation**: Generate AI-powered email replies directly in Gmail
- **Multiple Tone Options**: Professional, Friendly, Brief, Detailed response styles
- **Real-time Integration**: Seamless Gmail interface integration
- **Smart Email Classification**: Automatically categorizes emails for better responses
- **Multi-Reply Options**: Generate multiple reply variations to choose from

### Advanced Features

- **Rate Limiting System**: Prevents API abuse with transparent usage tracking
- **Security Content Detection**: Blocks sensitive information from being processed
- **Modern UI/UX**: Premium design with smooth animations and loading states
- **Usage Analytics**: Real-time tracking of extension usage
- **Error Handling**: Comprehensive error management with user-friendly messaging

## 🛠️ Technology Stack

### Backend

- **Spring Boot** - REST API framework
- **Java** - Primary backend language
- **Gemini AI API** - AI-powered reply generation
- **Maven** - Dependency management
- **Render** - Cloud deployment platform

### Frontend

- **React** - User interface framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests

### Chrome Extension

- **Manifest V3** - Latest Chrome extension standard
- **Content Scripts** - Gmail integration
- **Background Service Worker** - Extension lifecycle management
- **Chrome Storage API** - Settings and data persistence

## 📁 Project Structure

```bash
    SmartReply+/
    ├── email-writer-sb/          # Spring Boot Backend
    │   ├── src/main/java/
    │   │   └── com/emailwriter/
    │   │       ├── controller/
    │   │       ├── service/
    │   │       ├── model/
    │   │       └── config/
    │   ├── pom.xml
    │   └── application.properties
    ├── frontend/                 # React Frontend
    │   ├── src/
    │   │   ├── components/
    │   │   ├── pages/
    │   │   ├── services/
    │   │   └── utils/
    │   ├── package.json
    │   └── vite.config.js
    ├── chrome-extension/         # Chrome Extension
    │   ├── manifest.json
    │   ├── content.js
    │   ├── background.js
    │   ├── popup.html
    │   └── content.css
    └── README.md
```

## 🔧 Installation & Setup

### Prerequisites

- **Node.js** (v16 or higher)
- **Java 17** or higher
- **Maven** 3.6+
- **Chrome Browser**
- **Gemini AI API Key**

### Backend Setup

1. **Clone the repository**

```bash
   git clone https://github.com/CodeTirtho97/SmartReply
   cd SmartReply+/email-writer-sb
```

2. **Configure environment variables**

```bash
    # application.properties
    gemini.api.key=YOUR_GEMINI_API_KEY
    server.port=8080
    spring.application.name=SmartReplyPlus
```

3. **Build and run**

```bash
    mvn clean install
    mvn spring-boot:run
```

### Frontend Setup

1. **Navigate to frontend directory**

```bash
    cd ../frontend
```

2. **Install dependencies**

```bash
    npm install
```

3. **Configure environment**

```bash
    # .env
    VITE_API_BASE_URL=http://localhost:8080/api
    VITE_API_TIMEOUT=30000
```

4. **Start development server**

```bash
    npm run dev
```

### Chrome Extension Setup

1. **Build extension files**

```bash
    # From project root
    cd chrome-extension
```

2. **Load extension in Chrome**

- Open Chrome and go to chrome://extensions/.
- Enable "Developer mode".
- Click "Load unpacked".
- Select the chrome-extension folder.

3. **Configure extension**

- Click the SmartReply+ icon in Chrome toolbar.
- Enter your settings in the popup.
- Grant necessary permissions for Gmail access.

## 🎯 Usage Guide

### Gmail Integration

1. Open Gmail in Chrome browser.
2. Open any email you want to reply to.
3. Click Reply to open the compose window.
4. Look for the SmartReply+ button near the Send button.
5. Click SmartReply+ to generate AI-powered reply.
6. Choose from multiple reply options if available.
7. Edit and send your response.

### Web Interface

1. Visit the web application at [SmartReply+](https://smart-reply-tirth-v1.vercel.app/).
2. Paste email content you want to reply to.
3. Select desired tone (Professional, Friendly, Brief, Detailed).
4. Generate reply using AI.
5. Copy and use the generated response.

## 🔐 Security & Privacy

### Data Protection

- No Email Storage: Emails are processed in real-time, not stored.
- Encrypted Transmission: All API calls use HTTPS.
- Local Settings: User preferences stored locally in Chrome.
- Sensitive Content Detection: Automatic filtering of sensitive information.

### Privacy Features

- Minimal Permissions: Only requests necessary Chrome permissions.
- No User Tracking: Extension doesn't track personal information.
- Opt-out Analytics: Usage tracking can be disabled.
- Open Source: Code is transparent and auditable.

## 🔮 Roadmap

### Version 2.0 Features

- Multi-language Support: Support for multiple languages.
- Custom Templates: User-defined reply templates.
- Integration Expansion: Outlook, Apple Mail support.
- Advanced AI: GPT-4, Claude integration options.
- Team Features: Shared templates and analytics.

### Long-term Vision

- Enterprise Version: Advanced security and compliance.
- Mobile Apps: iOS and Android applications.
- API Platform: Third-party integrations.
- Machine Learning: Personalized reply suggestions.
- Workflow Automation: Integration with productivity tools.

## 📄 License

This project is licensed under the MIT License

_Built with ❤️ for productivity enthusiasts by CodeTirtho97_

### SmartReply+ - Making email replies smarter, one click at a time.
