import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/logo.png"
                alt="SmartReply+"
                className="h-8 w-8 rounded-lg"
                onError={(e) => {
                  // Fallback to gradient background if image fails
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center" style={{ display: 'none' }}>
                <span className="text-white font-bold text-sm">S+</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                SmartReply+
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md">
              Generate AI-powered Gmail replies instantly. Supercharge your email productivity with Gemini AI.
              One click, smart reply.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors duration-200"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/features"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors duration-200"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/pro"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors duration-200"
                >
                  Pro Features
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open('https://chrome.google.com/webstore/detail/smartreply-plus/YOUR_EXTENSION_ID', '_blank');
                  }}
                >
                  Chrome Extension
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Connect
            </h3>
            <div className="flex space-x-3">
              <a
                href="https://github.com/CodeTirtho97"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                aria-label="GitHub Profile"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/tirthoraj-bhattacharya/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/lucifer_7951"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                aria-label="Twitter Profile"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-300 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 SmartReply+. Built for demo purposes.
            </p>
            <p className="text-gray-400 text-sm mt-2 sm:mt-0">
              Powered by Gemini AI
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;