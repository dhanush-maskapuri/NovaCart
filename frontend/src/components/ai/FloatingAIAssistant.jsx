import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiCpu,
  FiX,
  FiSearch,
  FiDollarSign,
  FiGift,
  FiBarChart2,
  FiShield,
  FiSend,
  FiChevronRight,
  FiZap,
} from 'react-icons/fi';
import { products } from '../../data/products';
import { formatCurrency } from '../../utils/formatters';
import { Link } from 'react-router-dom';

/**
 * FloatingAIAssistant Component - Glassmorphic AI Shopping Companion
 * Smart Search, Budget Advisor, Product Comparison, Gift Finder, Eco Score & Price History.
 */
const FloatingAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('advisor'); // 'advisor', 'budget', 'gift', 'history'
  const [budgetLimit, setBudgetLimit] = useState(5000);
  const [userQuery, setUserQuery] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'ai',
      text: 'Namaste! I am your SphereAI Assistant. How can I help you shop today on ShopSphere India?',
    },
  ]);

  // Filter products under budget limit
  const budgetProducts = products
    .filter((p) => p.price <= budgetLimit)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    const query = userQuery.trim().toLowerCase();
    const newMsgs = [...chatMessages, { sender: 'user', text: userQuery }];
    setUserQuery('');

    // Generate AI response based on query
    let aiResponse = "I've searched our Indian marketplace database for you.";
    if (query.includes('boat') || query.includes('headphone') || query.includes('audio')) {
      aiResponse = "I recommend checking out the boAt Nirvana Ion ANC Earbuds! They offer 120H battery life, active noise cancellation, and express 10-min delivery.";
    } else if (query.includes('phone') || query.includes('apple') || query.includes('iphone') || query.includes('oneplus')) {
      aiResponse = "Top picks for smartphones: iPhone 15 Pro Natural Titanium (128GB) or OnePlus Watch 2 with GST Tax invoice.";
    } else if (query.includes('budget') || query.includes('cheap') || query.includes('under')) {
      aiResponse = `Here are top rated items under ${formatCurrency(budgetLimit)}: Tata Sampann Kesar, Organic Tattva Toor Dal, or boAt Earbuds!`;
    } else if (query.includes('gift') || query.includes('diwali') || query.includes('festival')) {
      aiResponse = "For festive gifts, Kama Ayurveda Kumkumadi Serum, Titan Smartwatch, and Royal Oak Teak Chair are huge hits!";
    } else {
      aiResponse = `I found ${products.length} verified authentic products matching "${query}". Check out our NovaMart (Groceries in 10Mins) and NovaTech categories!`;
    }

    setTimeout(() => {
      setChatMessages((prev) => [...prev, { sender: 'ai', text: aiResponse }]);
    }, 400);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl shadow-indigo-500/40 flex items-center gap-2 border border-white/20"
      >
        <div className="relative">
          <FiCpu className="w-6 h-6 animate-pulse" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900" />
        </div>
        <span className="hidden sm:inline font-bold text-xs">SphereAI</span>
      </motion.button>

      {/* Floating AI Drawer Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 sm:right-6 w-96 max-w-[92vw] h-[520px] bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header Bar */}
            <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                  <FiCpu className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm leading-none">SphereAI Marketplace Guide</h3>
                  <span className="text-[10px] font-medium text-indigo-200">
                    Smart Shopping • Instant Indian Recommendations
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-white/20 text-white"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Feature Mode Switcher Tabs */}
            <div className="flex items-center justify-around border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-1.5 text-xs font-bold text-slate-500">
              <button
                onClick={() => setActiveTab('advisor')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  activeTab === 'advisor'
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'hover:text-slate-900'
                }`}
              >
                Advisor
              </button>
              <button
                onClick={() => setActiveTab('budget')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  activeTab === 'budget'
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'hover:text-slate-900'
                }`}
              >
                Budget ₹
              </button>
              <button
                onClick={() => setActiveTab('gift')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  activeTab === 'gift'
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'hover:text-slate-900'
                }`}
              >
                Gift Finder
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  activeTab === 'history'
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'hover:text-slate-900'
                }`}
              >
                Eco & Price
              </button>
            </div>

            {/* Tab 1: AI Chat Advisor */}
            {activeTab === 'advisor' && (
              <div className="flex-1 flex flex-col p-4 justify-between min-h-0">
                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                  {chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-indigo-600 text-white rounded-br-none font-medium'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200/60 dark:border-slate-700/60'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="mt-3 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Ask AI e.g. best earbuds under ₹3000..."
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                    className="flex-1 px-3.5 py-2 text-xs rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
                  >
                    <FiSend className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* Tab 2: Budget Recommendation Filter */}
            {activeTab === 'budget' && (
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                <div className="bg-indigo-50 dark:bg-indigo-950/40 p-3 rounded-2xl border border-indigo-200 dark:border-indigo-800/50">
                  <div className="flex items-center justify-between text-xs font-bold text-indigo-700 dark:text-indigo-300">
                    <span>Set Max Budget:</span>
                    <span className="text-base font-black">{formatCurrency(budgetLimit)}</span>
                  </div>
                  <input
                    type="range"
                    min={500}
                    max={150000}
                    step={500}
                    value={budgetLimit}
                    onChange={(e) => setBudgetLimit(Number(e.target.value))}
                    className="w-full mt-2 accent-indigo-600 cursor-pointer"
                  />
                </div>

                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  Top Recommended Within Budget
                </h4>

                <div className="space-y-2.5">
                  {budgetProducts.map((prod) => (
                    <Link
                      key={prod._id}
                      to={`/product/${prod._id}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-12 h-12 object-cover rounded-xl border border-slate-200"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                          {prod.name}
                        </h5>
                        <p className="text-[11px] font-bold text-indigo-600">
                          {formatCurrency(prod.price)}
                        </p>
                      </div>
                      <FiChevronRight className="w-4 h-4 text-slate-400" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Gift Finder */}
            {activeTab === 'gift' && (
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  Select Occasion for Indian Gift Ideas
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {['Festive Diwali', 'Weddings', 'Birthday & Tech', 'Corporate Gifts'].map(
                    (giftTag) => (
                      <button
                        key={giftTag}
                        onClick={() => {
                          setChatMessages([
                            ...chatMessages,
                            { sender: 'user', text: `Recommend gifts for ${giftTag}` },
                            {
                              sender: 'ai',
                              text: `For ${giftTag}, we recommend Kama Ayurveda Elixir, boAt ANC Earbuds, or Tata Sampann Pure Saffron gift sets!`,
                            },
                          ]);
                          setActiveTab('advisor');
                        }}
                        className="p-3 text-left rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-colors"
                      >
                        <FiGift className="w-4 h-4 text-pink-500 mb-1" />
                        <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                          {giftTag}
                        </span>
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Tab 4: Eco Score & Price History */}
            {activeTab === 'history' && (
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-extrabold text-xs">
                    <FiShield className="w-4 h-4" />
                    <span>Sphere Green Eco-Rating: A+</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">
                    94% of our products use 100% recyclable Indian packaging and zero single-use plastics.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-slate-100 mb-2">
                    <span>Average Marketplace Price Trend</span>
                    <span className="text-emerald-600 font-bold">Lowest in 30 Days</span>
                  </div>
                  <div className="h-16 flex items-end justify-between gap-1.5 pt-2">
                    {[40, 65, 50, 80, 45, 90, 35].map((val, idx) => (
                      <div
                        key={idx}
                        className="flex-1 bg-indigo-500/80 hover:bg-indigo-600 rounded-t-lg transition-all"
                        style={{ height: `${val}%` }}
                        title={`Day ${idx + 1}: Optimal Buy Zone`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingAIAssistant;
