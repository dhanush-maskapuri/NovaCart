import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCpu, FiX, FiSend, FiZap, FiShoppingCart } from 'react-icons/fi';
import { products } from '../../data/products';
import { formatCurrency } from '../../utils/formatters';
import { useCart } from '../../hooks/useCart';

const AIAssistantFloating = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Namaste! I am your NovaCart AI Shopping Guide. How can I help you today? (e.g. "Suggest a smartphone under ₹25,000" or "Gift for my mother")',
      products: [],
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const { addToCart } = useCart();

  const handleSend = (e) => {
    e?.preventDefault();
    if (!prompt.trim()) return;

    const userText = prompt.trim();
    const newMessages = [...messages, { sender: 'user', text: userText }];
    setMessages(newMessages);
    setPrompt('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const lower = userText.toLowerCase();
      let recs = [];
      let reply = '';

      if (lower.includes('phone') || lower.includes('mobile') || lower.includes('25000') || lower.includes('25,000')) {
        recs = products.filter((p) => p.category === 'Mobiles' || (p.price && p.price <= 25000)).slice(0, 3);
        reply = `Here are top-rated smartphones under ₹25,000 with 5G connectivity & 10-Min delivery!`;
      } else if (lower.includes('laptop') || lower.includes('gaming')) {
        recs = products.filter((p) => p.category === 'Laptops' || p.category === 'Gaming').slice(0, 3);
        reply = `Here are high performance laptops & gaming gear matching your requirements.`;
      } else if (lower.includes('mother') || lower.includes('mom') || lower.includes('gift') || lower.includes('birthday')) {
        recs = products.filter((p) => p.category === 'Beauty & Skincare' || p.category === 'Groceries' || p.category === 'Fashion').slice(0, 3);
        reply = `I curated these thoughtful skincare & ethnic gift sets for your mother!`;
      } else if (lower.includes('headphone') || lower.includes('earbud') || lower.includes('audio')) {
        recs = products.filter((p) => p.category === 'Audio' || p.category === 'Electronics').slice(0, 3);
        reply = `Top active noise cancellation audio headsets matching your budget!`;
      } else {
        recs = products.slice(0, 3);
        reply = `Here are popular trending recommendations from NovaCart marketplace.`;
      }

      setMessages([...newMessages, { sender: 'ai', text: reply, products: recs }]);
    }, 700);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl flex items-center gap-2 font-black text-xs"
      >
        <FiCpu className="w-6 h-6 animate-pulse" />
        <span className="hidden sm:inline">AI Shopping Guide</span>
      </motion.button>

      {/* Modern Floating Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[480px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-900 dark:text-slate-100"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiCpu className="w-5 h-5" />
                <div>
                  <h3 className="font-black text-sm">NovaCart AI Assistant</h3>
                  <span className="text-[10px] text-indigo-200 block">Online • Smart Recommendations</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs font-semibold">
              {messages.map((m, i) => (
                <div key={i} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`p-3 rounded-2xl max-w-[85%] ${
                      m.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-none'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none'
                    }`}
                  >
                    <p>{m.text}</p>
                  </div>

                  {m.products && m.products.length > 0 && (
                    <div className="mt-2 space-y-2 w-full">
                      {m.products.map((p) => (
                        <div key={p._id} className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 overflow-hidden">
                            <img src={p.image} alt={p.name} className="w-8 h-8 object-cover rounded-lg shrink-0" />
                            <div className="truncate">
                              <span className="font-bold block truncate">{p.name}</span>
                              <span className="text-indigo-600 font-black">{formatCurrency(p.price)}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => addToCart(p, 1)}
                            className="p-1.5 rounded-xl bg-indigo-600 text-white shrink-0"
                            title="Add to Cart"
                          >
                            <FiShoppingCart className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {isTyping && <p className="text-[10px] text-slate-400 font-mono animate-pulse">AI Curator is thinking...</p>}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSend} className="p-3 border-t border-slate-100 dark:border-slate-800 flex gap-2">
              <input
                type="text"
                placeholder="Ask e.g. phone under ₹25000..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-indigo-500"
              />
              <button type="submit" className="p-2 rounded-xl bg-indigo-600 text-white">
                <FiSend className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistantFloating;
