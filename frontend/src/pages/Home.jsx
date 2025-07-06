import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, Shield, Clock, Star, Download, Crown, 
  ChevronRight, Mail, Settings, Palette, BarChart3, Send, Copy 
} from 'lucide-react';
import ExtensionPrompt from '../components/home/ExtensionPrompt';
import DemoSection from '../components/home/DemoSection';

const Home = () => {
  const [showExtensionPrompt, setShowExtensionPrompt] = useState(false);
  const [selectedTone, setSelectedTone] = useState('professional');
  const [dailyUsage, setDailyUsage] = useState(0);
  const [emailInput, setEmailInput] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [isLoadingUsage, setIsLoadingUsage] = useState(true);

  const tones = [
    { value: 'professional', label: 'Professional', color: 'bg-blue-500', example: 'Thank you for your email. I will review this matter and provide you with a comprehensive response by end of business day.' },
    { value: 'casual', label: 'Casual', color: 'bg-green-500', example: 'Hey! Thanks for reaching out. I\'ll take a look at this and get back to you soon.' },
    { value: 'friendly', label: 'Friendly', color: 'bg-yellow-500', example: 'Hi there! Thanks so much for your message. I\'d be happy to help you with this!' },
    { value: 'formal', label: 'Formal', color: 'bg-purple-500', example: 'Dear Sir/Madam, I acknowledge receipt of your correspondence and will address your inquiry with due diligence.' },
    { value: 'concise', label: 'Concise', color: 'bg-red-500', example: 'Received. Will respond by EOD.' }
  ];

  const sampleEmails = [
    "Hi John,\n\nI hope this email finds you well. I wanted to follow up on our meeting last week regarding the quarterly project timeline. Could you please share the updated documents we discussed?\n\nBest regards,\nSarah",
    "Dear Team,\n\nI'm writing to inform you about the upcoming deadline for the client presentation. We need to finalize all materials by Friday. Please let me know if you need any assistance.\n\nThanks,\nMike",
    "Hello,\n\nI'm interested in learning more about your services. Could you provide me with a detailed quote for a custom web development project?\n\nLooking forward to hearing from you.\nAlex"
  ];

  const handleInstallExtension = () => {
    window.open('https://chrome.google.com/webstore/detail/smartreply-plus/YOUR_EXTENSION_ID', '_blank');
  };

  // Fetch current usage count on component mount
  useEffect(() => {
    const fetchUsageCount = async () => {
      try {
        const response = await fetch('/api/usage-count', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDailyUsage(data.dailyUsage || 0);
        } else {
          console.error('Failed to fetch usage count');
        }
      } catch (error) {
        console.error('Error fetching usage count:', error);
      } finally {
        setIsLoadingUsage(false);
      }
    };

    fetchUsageCount();
  }, []);

  const handleGenerateReply = async () => {
    if (!emailInput.trim()) {
      alert('Please paste an email to reply to!');
      return;
    }

    if (dailyUsage >= 5) {
      setShowExtensionPrompt(true);
      return;
    }

    setIsGenerating(true);
    setError('');
    setGeneratedReply('');

    try {
      // Make actual API call to your backend
      const response = await fetch('/api/generate-reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailBody: emailInput.trim(),
          tone: selectedTone,
          // Add any other parameters your backend expects
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        // Handle rate limit specifically
        if (response.status === 429) {
          setDailyUsage(5); // Set to limit
          setShowExtensionPrompt(true);
          throw new Error(errorData.message || 'Daily limit reached. Install extension for more replies!');
        }
        
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Assuming your backend returns { reply: "generated reply text", dailyUsage: number }
      // Adjust this based on your actual API response structure
      if (data.reply) {
        setGeneratedReply(data.reply);
        // Update usage count from backend response
        if (typeof data.dailyUsage === 'number') {
          setDailyUsage(data.dailyUsage);
        } else {
          // Fallback: increment local count if backend doesn't return it
          setDailyUsage(prev => prev + 1);
        }
      } else {
        throw new Error('No reply generated from server');
      }

    } catch (error) {
      console.error('Error generating reply:', error);
      setError(error.message || 'Failed to generate reply. Please try again.');
      
      // Optional: Fallback to example if API fails (remove this in production)
      // const selectedToneObj = tones.find(t => t.value === selectedTone);
      // setGeneratedReply(selectedToneObj.example);
      
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyReply = () => {
    navigator.clipboard.writeText(generatedReply);
    alert('Reply copied to clipboard!');
  };

  const handleSampleEmail = (email) => {
    setEmailInput(email);
    setError(''); // Clear any previous errors
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                🚀 5x More Replies with Extension
              </span>
              <Link 
                to="/pro"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 rounded-full text-sm font-bold hover:from-yellow-500 hover:to-orange-600 transition-all duration-200"
              >
                ✨ Pro Version Coming Soon
              </Link>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              One Click.
              <br />
              <span className="text-yellow-300">Smart Reply.</span>
            </h1>
            
            <p className="text-xl mb-8 text-blue-100 leading-relaxed max-w-3xl mx-auto">
              Generate AI-powered Gmail replies instantly with Gemini AI. 
              Save hours daily with intelligent email responses that match your style.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleInstallExtension}
                className="bg-white text-blue-600 text-lg px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Install Free Extension</span>
              </button>
              <button
                onClick={() => document.getElementById('demo-section').scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-white/30 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-white/10 transition-colors backdrop-blur-sm flex items-center justify-center space-x-2"
              >
                <span>Try Demo Below</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
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
                <Palette className="w-6 h-6 text-yellow-300" />
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

      {/* Main Demo Section */}
      <div id="demo-section" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Try SmartReply+ Now
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Paste an email, choose your tone, and get an AI-generated reply instantly
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Paste Email to Reply To:
                </label>
                <textarea
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Paste the email you want to reply to here..."
                  className="w-full h-40 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none"
                />
              </div>

              {/* Sample Emails */}
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Or try a sample email:
                </p>
                <div className="space-y-2">
                  {sampleEmails.map((email, index) => (
                    <button
                      key={index}
                      onClick={() => handleSampleEmail(email)}
                      className="w-full text-left p-3 text-sm bg-gray-50 dark:bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-500 rounded-lg transition-colors"
                    >
                      {email.split('\n')[0]}...
                    </button>
                  ))}
                </div>
              </div>

              {/* Tone Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Select Tone:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {tones.map((tone) => (
                    <button
                      key={tone.value}
                      onClick={() => setSelectedTone(tone.value)}
                      className={`p-3 rounded-lg text-sm font-medium transition-all ${
                        selectedTone === tone.value
                          ? `${tone.color} text-white shadow-lg`
                          : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500'
                      }`}
                    >
                      {tone.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Usage Counter */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Daily Usage
                  </span>
                  <span className="text-sm text-gray-500">
                    {isLoadingUsage ? 'Loading...' : `${dailyUsage}/5 used`}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300" 
                    style={{width: `${isLoadingUsage ? 0 : (dailyUsage/5) * 100}%`}}
                  ></div>
                </div>
                {dailyUsage >= 5 && (
                  <p className="text-sm text-red-600 mt-2">
                    Daily limit reached! Install Chrome Extension for 25 daily replies.
                  </p>
                )}
                {isLoadingUsage && (
                  <p className="text-sm text-gray-500 mt-2">
                    Checking your daily usage...
                  </p>
                )}
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerateReply}
                disabled={isGenerating}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all flex items-center justify-center space-x-2 ${
                  isGenerating
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg'
                }`}
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Generating Reply...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Generate Smart Reply</span>
                  </>
                )}
              </button>
            </div>

            {/* Output Section */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  AI Generated Reply:
                </label>
                <div className="relative">
                  <textarea
                    value={generatedReply}
                    readOnly
                    placeholder="Your AI-generated reply will appear here..."
                    className="w-full h-40 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white resize-none"
                  />
                  {generatedReply && (
                    <button
                      onClick={handleCopyReply}
                      className="absolute top-2 right-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      title="Copy to clipboard"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg border-l-4 border-red-500">
                  <div className="flex items-center space-x-2 text-red-700 dark:text-red-300">
                    <span className="text-sm font-medium">Error</span>
                  </div>
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                    {error}
                  </p>
                </div>
              )}

              {generatedReply && !error && (
                <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border-l-4 border-green-500">
                  <div className="flex items-center space-x-2 text-green-700 dark:text-green-300">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">Reply Generated Successfully</span>
                  </div>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                    Perfect! You can copy this reply and paste it into your email client.
                  </p>
                </div>
              )}

              {/* Extension Promotion */}
              <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2 flex items-center">
                  <Crown className="w-5 h-5 mr-2" />
                  Want More Features?
                </h3>
                <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1 mb-4">
                  <li>• 25 daily replies (vs 5 on web)</li>
                  <li>• Custom writing styles & prompts</li>
                  <li>• Direct Gmail integration</li>
                  <li>• One-click reply insertion</li>
                </ul>
                <button
                  onClick={handleInstallExtension}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Install Free Extension</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <DemoSection />

      {/* Features Section */}
      <div className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose SmartReply+?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              The most advanced AI email assistant for Gmail
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Instant AI Replies
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Generate contextual email replies in seconds with advanced Gemini AI technology.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Customizable Tones
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Choose from Professional, Casual, Friendly, Formal, and Concise writing styles.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Privacy Focused
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your emails stay private. We only process the context needed for AI generation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pro Features CTA */}
      <div className="py-20 bg-gradient-to-r from-purple-600 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready for <span className="text-yellow-300">Pro Features</span>?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Unlimited replies, multi-response options, smart classification, and more!
          </p>
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
              <span>Try Free Extension</span>
            </button>
          </div>
        </div>
      </div>

      {/* Extension Prompt Modal */}
      <ExtensionPrompt 
        isVisible={showExtensionPrompt} 
        onClose={() => setShowExtensionPrompt(false)} 
      />
    </div>
  );
};

export default Home;