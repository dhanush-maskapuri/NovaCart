import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiCpu,
  FiX,
  FiSearch,
  FiGift,
  FiSend,
  FiZap,
  FiMic,
  FiPackage,
  FiHelpCircle,
  FiZap as FiSparkles,
} from 'react-icons/fi';
import { products } from '../../data/products';
import { formatCurrency } from '../../utils/formatters';
import { Link } from 'react-router-dom';

/**
 * FloatingAIAssistant Component - Nova AI ("India's Smart Marketplace Assistant")
 * Single Floating AI Widget (Bottom-Right corner) featuring:
 * Shopping Assistant, Gift Finder, Product Recommendations, Order Help & Voice Input.
 */
const FloatingAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('assistant'); // 'assistant', 'gift', 'orders', 'recommend'
  const [userQuery, setUserQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'ai',
      text: 'Namaste! I am Nova AI, your smart shopping assistant. How can I help you on NovaCart today?',
    },
  ]);

  const handleSendMessage = (textToSend) => {
    const queryText = textToSend || userQuery;
    if (!queryText.trim()) return;

    const query = queryText.trim().toLowerCase();
    setChatMessages((prev) => [...prev, { sender: 'user', text: queryText }]);
    if (!textToSend) setUserQuery('');

    // Generate response
    setTimeout(() => {
      let responseText = "I've searched NovaCart's 40+ Lakh products for you!";
      if (query.includes('gift') || query.includes('birthday') || query.includes('diwali')) {
        responseText = "🎁 Great Gift Ideas: 1. iPhone 15 Pro Titanium, 2. Kama Ayurveda Kumkumadi Serum, 3. Titan Smartwatch Pro, 4. Royal Teakwood Sofa.";
      } else if (query.includes('order') || query.includes('track') || query.includes('delivery')) {
        responseText = "📦 Order Help: Your recent order #ORD-98421 is on track! Out for delivery via NovaMart 10-Min Rider.";
      } else if (query.includes('phone') || query.includes('mobile') || query.includes('samsung') || query.includes('iphone')) {
        responseText = "📱 Smartphone Recommendations: Apple iPhone 15 Pro Titanium, Samsung S24 Ultra 5G with Galaxy AI, and OnePlus 12R 5G!";
      } else if (query.includes('milk') || query.includes('grocery') || query.includes('food') || query.includes('novamart')) {
        responseText = "⚡ NovaMart 10-Min Groceries: Amul Fresh Milk 1L, Organic Vegetables, Fortune Oil & Tata Sampann Pulses delivered in 10 mins!";
      } else {
        responseText = `✨ Found top products matching "${queryText}". All eligible for instant GST tax invoices and 100% genuine brand warranty!`;
      }
      setChatMessages((prev) => [...prev, { sender: 'ai', text: responseText }]);
    }, 400);
  };

  const handleVoiceMic = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setIsListening(false);
        handleSendMessage(transcript);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } else {
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        handleSendMessage('Best deals on smartphones under 30000');
      }, 1500);
    }
  };

  const recommendedPicks = products.slice(0, 3);

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      {/* Floating Toggle Icon */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl shadow-blue-500/40 border-2 border-white/20"
          >
            <FiSparkles className="w-6 h-6 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full border-2 border-slate-950 text-[9px] font-black text-slate-950 flex items-center justify-center">
              AI
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating AI Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[520px]"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <FiSparkles className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h4 className="text-sm font-black flex items-center gap-1.5">
                    <span>Nova AI</span>
                    <span className="bg-amber-400 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase">
                      ONLINE
                    </span>
                  </h4>
                  <p className="text-[10px] text-blue-100 font-medium">Smart Marketplace Assistant</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Action Tabs */}
            <div className="grid grid-cols-4 gap-1 p-2 bg-slate-100 dark:bg-slate-950 text-[10px] font-bold border-b border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setActiveTab('assistant')}
                className={`py-1.5 rounded-xl transition-all ${
                  activeTab === 'assistant'
                    ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-500'
                }`}
              >
                Shopping
              </button>
              <button
                onClick={() => setActiveTab('gift')}
                className={`py-1.5 rounded-xl transition-all ${
                  activeTab === 'gift'
                    ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-500'
                }`}
              >
                Gift Finder
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`py-1.5 rounded-xl transition-all ${
                  activeTab === 'orders'
                    ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-500'
                }`}
              >
                Order Help
              </button>
              <button
                onClick={() => setActiveTab('recommend')}
                className={`py-1.5 rounded-xl transition-all ${
                  activeTab === 'recommend'
                    ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-500'
                }`}
              >
                Picks
              </button>
            </div>

            {/* Tab Specific Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs custom-scrollbar">
              {activeTab === 'recommend' ? (
                <div className="space-y-3">
                  <h5 className="font-extrabold text-slate-900 dark:text-slate-100 text-xs">
                    🌟 AI Recommended Top Picks
                  </h5>
                  {recommendedPicks.map((prod) => (
                    <Link
                      key={prod._id}
                      to={`/product/${prod._id}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 hover:border-blue-500 transition-colors"
                    >
                      <img src={prod.image} alt={prod.name} className="w-12 h-12 object-cover rounded-xl" />
                      <div className="flex-1 min-w-0">
                        <h6 className="font-bold text-slate-900 dark:text-slate-100 truncate">{prod.name}</h6>
                        <span className="text-xs font-black text-emerald-600">{formatCurrency(prod.price)}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : activeTab === 'gift' ? (
                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 font-bold">
                    🎁 Festive & Birthday Gift Assistant
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleSendMessage('Suggest anniversary gifts under ₹15000')}
                      className="w-full text-left p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
                    >
                      ✨ Anniversary gifts under ₹15,000
                    </button>
                    <button
                      onClick={() => handleSendMessage('Suggest Diwali gift hampers and sweets')}
                      className="w-full text-left p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
                    >
                      🪔 Festive Sweets & Dry Fruit Hampers
                    </button>
                  </div>
                </div>
              ) : (
                /* Chat Message Log */
                <div className="space-y-3">
                  {chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-blue-600 text-white font-medium rounded-br-none'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium rounded-bl-none border border-slate-200/60 dark:border-slate-700'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Input Footer with Voice Button */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
            >
              <button
                type="button"
                onClick={handleVoiceMic}
                title="Voice Input"
                className={`p-2 rounded-xl text-slate-500 hover:text-blue-600 ${
                  isListening ? 'text-red-500 animate-pulse' : ''
                }`}
              >
                <FiMic className="w-4 h-4" />
              </button>

              <input
                type="text"
                placeholder="Ask Nova AI anything..."
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                className="flex-1 px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />

              <button
                type="submit"
                className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors"
              >
                <FiSend className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingAIAssistant;
