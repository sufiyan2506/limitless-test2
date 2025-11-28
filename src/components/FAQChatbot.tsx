import { useState, useEffect, useRef } from 'react';
import { X, MessageCircle, Send, RotateCcw, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ContactForm {
  name: string;
  email: string;
  phone: string;
}

const FAQ_DATA = {
  'services': 'We offer comprehensive design and development services including UI/UX design, web development, mobile app development, branding, and digital strategy consulting.',
  'pricing': 'Our pricing varies based on project scope and complexity. We offer both fixed-price projects and hourly rates. Contact us for a personalized quote tailored to your specific needs.',
  'timeline': 'Project timelines typically range from 2-12 weeks depending on complexity. We provide detailed timelines during our initial consultation and keep you updated throughout the process.',
  'portfolio': 'You can view our latest work in the Work section of our website. We showcase a variety of projects across different industries and technologies.',
  'contact': 'You can reach us through our Contact page, email us directly, or use this chat. We typically respond within 24 hours during business days.',
  'technologies': 'We work with modern technologies including React, Next.js, TypeScript, Tailwind CSS, Node.js, and various databases. We stay current with the latest tech trends.',
  'support': 'We provide ongoing support and maintenance for all our projects. This includes bug fixes, updates, and feature enhancements based on your needs.',
  'process': 'Our process includes discovery, planning, design, development, testing, and deployment phases. We maintain clear communication throughout each stage.'
};

const QUICK_QUESTIONS = [
  'What services do you offer?',
  'How much does it cost?',
  'What is your timeline?',
  'Can I see your portfolio?',
  'How can I contact you?',
  'What technologies do you use?'
];

const FAQChatbot = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show popup after 30 seconds
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowPopup(true);
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    // Add welcome message when chatbot opens
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        text: 'Hello! I\'m here to help you learn more about Limitless. What would you like to know?',
        isUser: false,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const findBestAnswer = (question: string): string => {
    const lowerQuestion = question.toLowerCase();

    for (const [key, answer] of Object.entries(FAQ_DATA)) {
      if (lowerQuestion.includes(key) ||
        (key === 'services' && (lowerQuestion.includes('do') || lowerQuestion.includes('offer'))) ||
        (key === 'pricing' && (lowerQuestion.includes('cost') || lowerQuestion.includes('price') || lowerQuestion.includes('much'))) ||
        (key === 'timeline' && (lowerQuestion.includes('time') || lowerQuestion.includes('long') || lowerQuestion.includes('when'))) ||
        (key === 'portfolio' && (lowerQuestion.includes('work') || lowerQuestion.includes('example') || lowerQuestion.includes('show'))) ||
        (key === 'contact' && (lowerQuestion.includes('reach') || lowerQuestion.includes('email') || lowerQuestion.includes('phone'))) ||
        (key === 'technologies' && (lowerQuestion.includes('tech') || lowerQuestion.includes('stack') || lowerQuestion.includes('language'))) ||
        (key === 'support' && (lowerQuestion.includes('maintain') || lowerQuestion.includes('help') || lowerQuestion.includes('after'))) ||
        (key === 'process' && (lowerQuestion.includes('how') || lowerQuestion.includes('method') || lowerQuestion.includes('approach')))) {
        return answer;
      }
    }

    return "Thank you for your question! For specific inquiries, please don't hesitate to contact us directly through our Contact page or email. We'd be happy to provide detailed information tailored to your needs.";
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date()
    };

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: findBestAnswer(messageText),
      isUser: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
    setInputValue('');
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const handleResetChat = () => {
    setMessages([]);
    // Re-add welcome message
    setTimeout(() => {
      const welcomeMessage: Message = {
        id: '1',
        text: 'Hello! I\'m here to help you learn more about Limitless. What would you like to know?',
        isUser: false,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }, 100);
  };

  const handleContactClick = () => {
    setIsOpen(false);
    navigate('/contact');
  };

  const openChatbot = () => {
    setIsOpen(true);
    setShowPopup(false);
  };

  if (showPopup && !isOpen) {
    return (
      <div className="fixed bottom-20 right-4 z-50 animate-fade-up max-w-xs sm:max-w-sm">
        <div className="glass-strong rounded-xl p-4 shadow-2xl">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-black" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white mb-1">Need help?</p>
              <p className="text-xs text-white/80 break-words">Ask me anything about Limitless services!</p>
            </div>
            <button
              onClick={() => setShowPopup(false)}
              className="text-white/60 hover:text-white transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <Button
            onClick={openChatbot}
            className="w-full mt-3 bg-primary hover:bg-primary/90 text-black font-medium"
          >
            Start Chat
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={openChatbot}
            className="relative w-12 h-12 sm:w-14 sm:h-14 bg-secondary hover:bg-secondary/90 border border-white/20 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110"
          >
            <User className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />

            {/* Live Indicator */}
            <div className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-red-500/80 text-white text-[10px] font-medium rounded-full shadow-lg animate-pulse">
              Live
            </div>
          </button>
        </div>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed inset-4 sm:bottom-4 sm:right-4 sm:top-auto sm:left-auto z-50 w-auto sm:w-96 h-auto sm:h-[600px] bg-black border border-white/10 rounded-2xl shadow-2xl flex flex-col animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 flex-shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-secondary border border-primary/30 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-white text-sm sm:text-base truncate">Limitless Assistant</h3>
                <div className="status-online text-xs">
                  <div className="status-dot w-2 h-2"></div>
                  <span>Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handleResetChat}
                className="text-white/60 hover:text-white transition-colors p-1"
                title="Reset Chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide min-h-0">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.isUser ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 py-2 text-sm break-words",
                    message.isUser
                      ? "bg-purple-600 text-white"
                      : "bg-zinc-900 text-white/90 border border-white/10"
                  )}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions - Always visible */}
          <div className="p-4 border-t border-white/10 flex-shrink-0">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-white/60">Quick questions:</p>
              <button
                onClick={handleContactClick}
                className="text-xs text-primary hover:text-primary/80 transition-colors"
              >
                Contact us
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              {QUICK_QUESTIONS.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="text-xs p-2 bg-zinc-900 hover:bg-zinc-800 border border-white/10 rounded-lg transition-colors text-white/80 hover:text-white text-left"
                >
                  {question}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your question..."
                className="flex-1 bg-zinc-900 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-primary/50 min-w-0"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim()}
                className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:hover:bg-primary rounded-xl p-2 transition-colors flex-shrink-0"
              >
                <Send className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>

          {/* Watermark */}
          <div className="px-4 py-2 border-t border-white/5 flex items-center justify-center gap-2 flex-shrink-0">
            <span className="text-[10px] text-white/30">powered by</span>
            <div className="flex items-center gap-1">
              <img src="/lovable-uploads/c695b3f2-d6e6-4948-ab32-c15cbab07ae7.png" alt="Limitless Logo" className="w-3 h-3" />
              <span className="text-[10px] text-white/40 font-medium">Limitless AI</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FAQChatbot;