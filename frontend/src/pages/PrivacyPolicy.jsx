import React from 'react';
import { Shield, Lock, Eye, Database, Server, Mail, AlertTriangle } from 'lucide-react';

const PrivacyPolicy = () => {
  const lastUpdated = "July 10, 2025";

  const sections = [
    {
      id: "information-collection",
      icon: <Database className="w-6 h-6" />,
      title: "Information We Collect",
      content: [
        {
          subtitle: "Email Content (Temporary Processing Only)",
          description: "SmartReply+ temporarily processes the content of emails you're replying to in order to generate contextually appropriate AI responses. This content is sent to our secure servers and Google's Gemini AI service for processing only.",
          important: "Email content is never stored permanently and is immediately discarded after generating your reply."
        },
        {
          subtitle: "User Preferences",
          description: "We store your personalized settings including your preferred writing tone (Professional, Casual, Friendly, Formal, Concise), custom writing prompts, and extension configuration preferences.",
          important: "These preferences are stored locally in your browser and optionally synced via Chrome's sync service."
        },
        {
          subtitle: "Usage Analytics",
          description: "We track basic usage statistics such as the number of AI replies generated daily to enforce rate limits and improve our service.",
          important: "No personal information is collected in our analytics."
        }
      ]
    },
    {
      id: "information-usage",
      icon: <Server className="w-6 h-6" />,
      title: "How We Use Your Information",
      content: [
        {
          subtitle: "AI Reply Generation",
          description: "Email content is processed by our backend service and Google's Gemini AI to generate intelligent, contextually appropriate email replies based on your selected tone and custom prompts."
        },
        {
          subtitle: "Service Personalization",
          description: "Your saved preferences ensure a consistent experience across all your devices and sessions, allowing SmartReply+ to generate responses that match your communication style."
        },
        {
          subtitle: "Rate Limiting",
          description: "Usage tracking helps us enforce daily limits (25 free replies per day) and prevent abuse of our AI generation service."
        },
        {
          subtitle: "Service Improvement",
          description: "Aggregated, anonymized usage data helps us understand how users interact with SmartReply+ to improve features and performance."
        }
      ]
    },
    {
      id: "information-sharing",
      icon: <Eye className="w-6 h-6" />,
      title: "Information Sharing",
      content: [
        {
          subtitle: "Google Gemini AI",
          description: "Email content is sent to Google's Gemini AI service for processing. Google's privacy policy and terms of service apply to this processing.",
          important: "We have configured our integration to ensure email content is not retained by Google for training purposes."
        },
        {
          subtitle: "No Third-Party Sharing",
          description: "We do not sell, rent, or share your personal information with any third parties for marketing or commercial purposes."
        },
        {
          subtitle: "Legal Requirements",
          description: "We may disclose information if required by law or to protect our rights, but this does not include email content which is not stored."
        }
      ]
    },
    {
      id: "data-security",
      icon: <Lock className="w-6 h-6" />,
      title: "Data Security",
      content: [
        {
          subtitle: "Encryption in Transit",
          description: "All communication between your browser, our servers, and Google's Gemini AI service is encrypted using HTTPS/TLS encryption."
        },
        {
          subtitle: "Sensitive Content Detection",
          description: "SmartReply+ automatically detects and blocks processing of emails containing sensitive information such as passwords, credit card numbers, social security numbers, and other confidential data.",
          important: "If sensitive content is detected, AI generation is blocked and you'll receive a security warning."
        },
        {
          subtitle: "No Permanent Storage",
          description: "Email content is processed in real-time and immediately discarded. We do not maintain databases of your email content."
        },
        {
          subtitle: "Local Data Storage",
          description: "Your preferences are stored locally in your browser using Chrome's secure storage APIs. This data remains under your control."
        }
      ]
    },
    {
      id: "user-rights",
      icon: <Shield className="w-6 h-6" />,
      title: "Your Rights and Choices",
      content: [
        {
          subtitle: "Data Access",
          description: "You can view and modify your stored preferences at any time through the SmartReply+ extension settings panel."
        },
        {
          subtitle: "Data Deletion",
          description: "You can delete all stored preferences by uninstalling the extension or clearing your browser data. Since we don't store email content, there's no email data to delete."
        },
        {
          subtitle: "Service Opt-out",
          description: "You can disable SmartReply+ at any time by turning off the extension or uninstalling it from Chrome."
        },
        {
          subtitle: "Chrome Sync Control",
          description: "You control whether your preferences sync across devices through your Chrome browser settings."
        }
      ]
    },
    {
      id: "cookies-tracking",
      icon: <Eye className="w-6 h-6" />,
      title: "Cookies and Tracking",
      content: [
        {
          subtitle: "Extension Storage Only",
          description: "SmartReply+ uses Chrome's local storage APIs to save your preferences. We do not use traditional web cookies or tracking scripts."
        },
        {
          subtitle: "No Cross-Site Tracking",
          description: "Our extension only operates on Gmail and does not track your browsing behavior on other websites."
        },
        {
          subtitle: "No Advertising Tracking",
          description: "We do not use any advertising networks or tracking pixels. SmartReply+ is focused solely on email productivity."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                <Shield className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-xl text-blue-100 mb-4">
              Your privacy is our priority. Here's how SmartReply+ protects your data.
            </p>
            <p className="text-blue-200">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Introduction
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              SmartReply+ is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our Chrome extension for Gmail.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-blue-800 dark:text-blue-200 font-medium mb-2">
                    Key Privacy Principle
                  </p>
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    SmartReply+ is designed with privacy-first principles. We process email content only to generate AI replies and never store your email data permanently.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Sections */}
          <div className="space-y-8">
            {sections.map((section) => (
              <div key={section.id} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="text-blue-600 dark:text-blue-400">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {section.title}
                  </h2>
                </div>
                
                <div className="space-y-6">
                  {section.content.map((item, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      {item.subtitle && (
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {item.subtitle}
                        </h3>
                      )}
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        {item.description}
                      </p>
                      {item.important && (
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mt-2">
                          <p className="text-yellow-800 dark:text-yellow-200 text-sm font-medium">
                            <strong>Important:</strong> {item.important}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Information */}
          {/* <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl p-8 mt-12">
            <div className="text-center">
              <Mail className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Questions About Privacy?</h2>
              <p className="text-gray-300 mb-6">
                If you have any questions about this Privacy Policy or how we handle your data, please don't hesitate to contact us.
              </p>
              <div className="space-y-2">
                <p className="text-blue-400">
                  <strong>Email:</strong> privacy@smartreplyplus.com
                </p>
                <p className="text-blue-400">
                  <strong>Developer:</strong> Tirthoraj Bhattacharya
                </p>
              </div>
              <div className="mt-6 p-4 bg-black/20 rounded-lg">
                <p className="text-sm text-gray-300">
                  We typically respond to privacy inquiries within 48 hours. For urgent security concerns, please mark your email as "URGENT - Security".
                </p>
              </div>
            </div>
          </div> */}

          {/* Policy Updates */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Policy Updates
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                <strong>How you'll be notified:</strong> We will notify users of any material changes through the extension's update mechanism and by updating the "Last updated" date at the top of this policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;