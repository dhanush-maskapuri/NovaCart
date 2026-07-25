import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCpu, FiSend, FiZap, FiCheckCircle, FiShoppingCart, FiSearch } from 'react-icons/fi';
import Breadcrumb from '../components/common/Breadcrumb';
import ProductCard from '../components/product/ProductCard';
import { products } from '../data/products';
import { formatCurrency } from '../utils/formatters';

/**
 * AIAssistantPage Component - Dedicated AI Shopping Guide (/ai-assistant)
 * Users enter queries like "I need a gaming laptop under ₹80000" and get smart recommendations.
 */
const AIAssistantPage = () => {
  const [prompt, setPrompt] = useState('I need a gaming laptop under ₹80000');
  const [recommendations, setRecommendations] = useState(
    products.filter((p) => p.category === 'Laptops' || p.category === 'Gaming').slice(0, 4)
  );
  const [aiMessage, setAiMessage] = useState(
    'I analysed your query for gaming laptops under ₹80,000. Here are top-rated high performance options with RTX Graphics and fast cooling!'
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const presets = [
    'I need a gaming laptop under ₹80000',
    'Best flagship smartphone under ₹40000',
    '10-Min instant NovaMart grocery essentials',
    'Organic Kama Ayurveda skincare serums',
    'Teakwood living room sofa sets',
  ];

  const handleSearchAI = (queryText) => {
    const q = queryText || prompt;
    if (!q.trim()) return;

    setIsProcessing(true);
    setPrompt(q);

    setTimeout(() => {
      setIsProcessing(false);
      const lower = q.toLowerCase();

      let matched = [];
      let textResponse = '';

      if (lower.includes('laptop') || lower.includes('gaming')) {
        matched = products.filter((p) => p.category === 'Laptops' || p.category === 'Gaming').slice(0, 4);
        textResponse = `Found ${matched.length} top-rated gaming laptops and mechanical gear matching "${q}". Included GST Invoice and 1-Year Warranty!`;
      } else if (lower.includes('phone') || lower.includes('mobile') || lower.includes('iphone') || lower.includes('oneplus')) {
        matched = products.filter((p) => p.category === 'Mobiles').slice(0, 4);
        textResponse = `Found ${matched.length} flagship 5G smartphones matching "${q}" with 10-Min delivery options!`;
      } else if (lower.includes('grocery') || lower.includes('novamart') || lower.includes('milk') || lower.includes('atta')) {
        matched = products.filter((p) => p.category === 'Groceries').slice(0, 4);
        textResponse = `Here are fresh organic groceries ready for 10-Minute NovaMart express delivery to your doorstep!`;
      } else if (lower.includes('beauty') || lower.includes('skin') || lower.includes('serum')) {
        matched = products.filter((p) => p.category === 'Beauty & Skincare').slice(0, 4);
        textResponse = `Recommended 100% Ayurvedic & clean serums by Kama Ayurveda & Minimalist for your skin routine.`;
      } else {
        matched = products.slice(0, 4);
        textResponse = `Here are top recommendations from NOVACART catalog matching "${q}".`;
      }

      setRecommendations(matched);
      setAiMessage(textResponse);
    }, 600);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-5xl mx-auto">
      <Breadcrumb items={[{ label: 'AI Shopping Assistant' }]} />

      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-black uppercase tracking-wider">
          <FiCpu className="w-4 h-4 animate-pulse" />
          <span>SPHERE AI SHOPPING ENGINE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          What are you looking to buy today?
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Type any natural requirement (e.g. "I need a gaming laptop under ₹80000" or "Organic groceries for 10-min delivery") and our AI will curate the best deals for you.
        </p>
      </div>

      {/* Main AI Input Bar */}
      <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearchAI(prompt);
          }}
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <FiZap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400 fill-amber-400" />
            <input
              type="text"
              placeholder="Ask AI e.g. I need a gaming laptop under ₹80000..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 text-xs sm:text-sm font-extrabold rounded-2xl border border-slate-700 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            disabled={isProcessing}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-black shadow-lg shadow-indigo-600/30 flex items-center gap-2 shrink-0"
          >
            <FiSend className="w-4 h-4" />
            <span>{isProcessing ? 'Curating...' : 'Ask AI'}</span>
          </button>
        </form>

        {/* Preset Query Chips */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 self-center mr-1">
            Try Examples:
          </span>
          {presets.map((pr, idx) => (
            <button
              key={idx}
              onClick={() => handleSearchAI(pr)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
            >
              ⚡ {pr}
            </button>
          ))}
        </div>
      </div>

      {/* AI Response Notice */}
      <div className="p-5 rounded-3xl bg-purple-950/40 border border-purple-800/60 flex items-start gap-4">
        <div className="p-3 rounded-2xl bg-purple-600 text-white shrink-0">
          <FiCpu className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-purple-300">NOVACART AI CURATOR</h4>
          <p className="text-xs sm:text-sm font-semibold text-slate-200 mt-1 leading-relaxed">
            {aiMessage}
          </p>
        </div>
      </div>

      {/* Recommended Products Grid */}
      <div className="space-y-4">
        <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          Curated Recommendations ({recommendations.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map((prod) => (
            <ProductCard key={prod._id} product={prod} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AIAssistantPage;
