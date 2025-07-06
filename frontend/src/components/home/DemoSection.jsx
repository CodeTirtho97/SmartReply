import React, { useState } from 'react';
import { 
  Zap, Mail, Settings, Clock, ArrowRight, 
  CheckCircle, Sparkles, Star 
} from 'lucide-react';

const DemoSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedTone, setSelectedTone] = useState('professional');

  const demoSteps = [
    {
      title: "Compose or Reply",
      description: "Open any email in Gmail that you want to reply to",
      icon: <Mail className="w-6 h-6" />,
      screenshot: "/screenshots/step1-gmail.png"
    },
    {
      title: "Choose Your Tone",
      description: "Select from 5 different writing styles",
      icon: <Settings className="w-6 h-6" />,
      screenshot: "/screenshots/step2-settings.png"
    },
    {
      title: "Generate Instantly",
      description: "AI creates a perfect reply in seconds",
      icon: <Zap className="w-6 h-6" />,
      screenshot: "/screenshots/step3-result.png"
    }
  ];

  const tones = [
    { value: 'professional', label: 'Professional', color: 'bg-blue-500' },
    { value: 'casual', label: 'Casual', color: 'bg-green-500' },
    { value: 'friendly', label: 'Friendly', color: 'bg-yellow-500' },
    { value: 'formal', label: 'Formal', color: 'bg-purple-500' },
    { value: 'concise', label: 'Concise', color: 'bg-red-500' }
  ];

  const sampleReplies = {
    professional: "Thank you for your email. I will review the proposal and provide you with comprehensive feedback by the end of business day.",
    casual: "Hey! Thanks for reaching out. I'll take a look at this and get back to you soon.",
    friendly: "Hi there! Thanks so much for your message. I'd be happy to help you with this!",
    formal: "Dear Sir/Madam, I acknowledge receipt of your correspondence and will address your inquiry with due diligence.",
    concise: "Received. Will respond by EOD."
  };

  return (
    <div className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            See It In Action
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Watch how SmartReply+ transforms your email workflow
          </p>
        </div>

        {/* Interactive Demo Steps */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              How It Works
            </h3>
            <div className="space-y-4">
              {demoSteps.map((step, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                    activeStep === index
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${
                      activeStep === index ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}>
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {step.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {step.description}
                      </p>
                    </div>
                    {activeStep === index && (
                      <ArrowRight className="w-5 h-5 text-blue-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Step {activeStep + 1}: {demoSteps[activeStep].title}
              </h4>
              <div className="bg-white dark:bg-gray-600 rounded p-4 border-2 border-dashed border-gray-300 dark:border-gray-500">
                <img
                  src={demoSteps[activeStep].screenshot}
                  alt={`Step ${activeStep + 1} demo`}
                  className="w-full rounded"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="text-center text-gray-500 dark:text-gray-400 py-8" style={{display: 'none'}}>
                  📱 Demo Screenshot: {demoSteps[activeStep].title}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tone Selection Demo */}
        <div className="glass-card p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Try Different Tones
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              See how the same email can be replied to in different styles
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                Select Tone:
              </h4>
              <div className="space-y-2">
                {tones.map((tone) => (
                  <button
                    key={tone.value}
                    onClick={() => setSelectedTone(tone.value)}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      selectedTone === tone.value
                        ? `${tone.color} text-white shadow-lg`
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {tone.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                Generated Reply:
              </h4>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Original: "Can you help me with the quarterly report?"
                </div>
                <div className="bg-white dark:bg-gray-600 p-4 rounded border-l-4 border-blue-500">
                  <p className="text-gray-900 dark:text-white">
                    {sampleReplies[selectedTone]}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Generated in 1.2s</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Save 2+ Hours Daily
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Reduce email response time from minutes to seconds
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Professional Quality
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              AI-generated replies that maintain your professional image
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Highly Customizable
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Multiple tones and custom prompts to match your style
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoSection;