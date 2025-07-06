import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Shield, 
  Globe, 
  Code, 
  Star, 
  Download, 
  Mail, 
  MessageSquare,
  Users,
  ArrowRight,
  Github,
  Linkedin,
  Crown,
  CheckCircle,
  Clock
} from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Generate professional email replies in seconds using advanced AI technology."
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Multiple Tones",
      description: "Choose from professional, friendly, casual, or formal tones to match your communication style."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Privacy Focused",
      description: "Your emails stay secure and private. We don't store or share your email content."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Universal Compatibility",
      description: "Works with any email client. Copy and paste generated replies anywhere."
    }
  ];

  const techStack = [
    { name: "Frontend", tech: "React + Vite + Tailwind CSS" },
    { name: "Backend", tech: "Spring Boot + Java 21" },
    { name: "AI Engine", tech: "Google Gemini AI" },
    { name: "Hosting", tech: "Chrome Extension + Web Demo" }
  ];

  const stats = [
    { number: "5", label: "Free API calls per day", suffix: "" },
    { number: "25", label: "With Chrome Extension", suffix: "" },
    { number: "5", label: "Different tone options", suffix: "" },
    { number: "100%", label: "Privacy guaranteed", suffix: "" }
  ];

  const handleInstallExtension = () => {
    window.open('https://chrome.google.com/webstore/detail/smartreply-plus/YOUR_EXTENSION_ID', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
<div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white py-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div className="flex justify-center mb-8">
      <img
        src="/logo.png"
        alt="SmartReply+"
        className="w-20 h-20 rounded-2xl shadow-lg"
        onError={(e) => {
          // Fallback to gradient background if image fails to load
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex';
        }}
      />
      <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg" style={{ display: 'none' }}>
        <span className="text-white font-bold text-2xl">S+</span>
      </div>
    </div>
    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
      About SmartReply+
    </h1>
    <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
      Revolutionizing email communication with AI-powered reply generation. 
      Built to supercharge your productivity and transform how you handle email correspondence.
    </p>
    <div className="flex flex-wrap justify-center gap-8 text-blue-100">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-3xl font-bold text-white">{stat.number}{stat.suffix}</div>
          <div className="text-sm">{stat.label}</div>
        </div>
      ))}
    </div>
  </div>
</div>

      {/* Extension Benefits Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              🚀 Get 5x More Smart Replies with Chrome Extension!
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-center justify-center space-x-3">
                <Zap className="w-6 h-6 text-yellow-300" />
                <span className="text-lg">25 daily AI replies (vs 5 on web)</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <MessageSquare className="w-6 h-6 text-yellow-300" />
                <span className="text-lg">Custom writing styles & prompts</span>
              </div>
            </div>
            <button
              onClick={handleInstallExtension}
              className="bg-white text-red-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"
            >
              <Download className="w-5 h-5 inline mr-2" />
              Install Free Chrome Extension
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to generate perfect email replies, powered by cutting-edge AI technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:transform hover:scale-105"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Simple, fast, and effective. Generate professional email replies in just a few clicks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Paste Email",
                description: "Copy and paste the email you want to reply to into our form."
              },
              {
                step: "02", 
                title: "Choose Tone",
                description: "Select your preferred tone: professional, friendly, casual, or formal."
              },
              {
                step: "03",
                title: "Generate Reply",
                description: "Click generate and let our AI create the perfect response for you."
              },
              {
                step: "04",
                title: "Copy & Send",
                description: "Copy the generated reply and paste it into your email client."
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {step.description}
                </p>
                {index < 3 && (
                  <ArrowRight className="w-5 h-5 text-gray-400 mx-auto mt-4 hidden lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Built With Modern Technology
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Leveraging the latest technologies to deliver a fast, reliable, and scalable solution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((item, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <div className="flex items-center space-x-2 mb-3">
                  <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {item.name}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {item.tech}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pro Features Teaser */}
      <div className="py-20 bg-gradient-to-r from-purple-600 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold">Coming Soon</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">
              Ready for <span className="text-yellow-300">Pro Features</span>?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Unlock unlimited potential with SmartReply+ Pro
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-3">Unlimited Replies</h3>
              <p className="text-purple-100">No daily limits - generate as many AI replies as you need</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-3">Multi-Response Options</h3>
              <p className="text-purple-100">Get 3 different reply variants for every email</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-3">Smart Classification</h3>
              <p className="text-purple-100">AI automatically detects email type and adjusts tone</p>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm inline-block p-6 rounded-2xl mb-6">
              <div className="text-3xl font-bold mb-2">
                $4.99 <span className="text-lg font-normal">USD</span> / 
                ₹299 <span className="text-lg font-normal">INR</span>
              </div>
              <div className="text-purple-200">per month</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/pro"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-lg px-8 py-4 rounded-lg font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Crown className="w-5 h-5" />
                <span>Explore Pro Features</span>
              </Link>
              <button
                onClick={handleInstallExtension}
                className="border-2 border-white text-white text-lg px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Try Free Version</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Developer Section */}
<div className="py-20 bg-white dark:bg-gray-800">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div className="mb-12">
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        About the Developer
      </h2>
      <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Built with passion for improving email productivity and demonstrating modern web development skills.
      </p>
    </div>

    <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-600">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-4 border-blue-500 shadow-lg">
          <img
            src="/dev-logo.png"
            alt="CodeTirtho97"
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to initials if image fails to load
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ display: 'none' }}>
            CT
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          CodeTirtho97
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
          Full-Stack Developer & AI Enthusiast
        </p>
        
        <div className="flex items-center space-x-4">
          <a
            href="https://www.tirthorajportfolio.xyz/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg"
          >
            <Globe className="w-4 h-4" />
            <span>Portfolio</span>
          </a>
          <a
            href="https://github.com/CodeTirtho97"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-4 py-2 bg-gray-900 dark:bg-gray-600 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-500 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/tirthoraj-bhattacharya/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Final CTA */}
      <div className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Start Generating Smart Replies Today
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Experience the future of email communication with AI-powered reply generation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleInstallExtension}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg px-8 py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
            >
              <Download className="w-5 h-5" />
              <span>Install Chrome Extension</span>
            </button>
            <Link
              to="/"
              className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-lg px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Mail className="w-5 h-5" />
              <span>Try SmartReply+ Now</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;