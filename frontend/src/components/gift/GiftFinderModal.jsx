import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGift, FiX, FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import { useCompare } from '../../context/CompareContext';
import { products } from '../../data/products';
import ProductGrid from '../product/ProductGrid';

const GiftFinderModal = () => {
  const { isGiftFinderOpen, setIsGiftFinderOpen } = useCompare();

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    recipient: 'Parents',
    occasion: 'Birthday',
    budget: '5000',
    category: 'Electronics',
  });
  const [matchedGifts, setMatchedGifts] = useState([]);

  if (!isGiftFinderOpen) return null;

  const handleFinish = () => {
    let filtered = products;
    if (answers.category) {
      filtered = products.filter((p) => p.category?.toLowerCase().includes(answers.category.toLowerCase()));
    }
    if (filtered.length === 0) filtered = products.slice(0, 4);
    setMatchedGifts(filtered.slice(0, 4));
    setStep(5);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-3xl rounded-3xl p-6 shadow-2xl space-y-6 text-slate-900 dark:text-slate-100 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <FiGift className="w-6 h-6 text-pink-500" />
              <h2 className="text-xl font-black">NovaCart Smart Gift Finder Wizard</h2>
            </div>
            <button onClick={() => setIsGiftFinderOpen(false)} className="text-slate-400">
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {step < 5 ? (
            <div className="space-y-6">
              <div className="flex justify-between text-xs font-mono font-black text-indigo-600">
                <span>Step {step} of 4</span>
                <span>{step === 1 ? 'Recipient' : step === 2 ? 'Occasion' : step === 3 ? 'Budget' : 'Category'}</span>
              </div>

              {step === 1 && (
                <div className="space-y-3">
                  <h3 className="font-extrabold text-sm">Who are you shopping for?</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['Parents', 'Friends', 'Spouse', 'Children'].map((r) => (
                      <button
                        key={r}
                        onClick={() => setAnswers({ ...answers, recipient: r })}
                        className={`p-4 rounded-2xl border text-xs font-bold transition-all ${
                          answers.recipient === r ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 dark:bg-slate-800 border-slate-200'
                        }`}
                      >
                        🎁 {r}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3">
                  <h3 className="font-extrabold text-sm">What is the special occasion?</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['Birthday', 'Anniversary', 'Festival', 'Wedding'].map((o) => (
                      <button
                        key={o}
                        onClick={() => setAnswers({ ...answers, occasion: o })}
                        className={`p-4 rounded-2xl border text-xs font-bold transition-all ${
                          answers.occasion === o ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 dark:bg-slate-800 border-slate-200'
                        }`}
                      >
                        🎉 {o}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-3">
                  <h3 className="font-extrabold text-sm">What is your target budget range?</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['Under ₹2,000', '₹2,000 - ₹5,000', '₹5,000 - ₹15,000', '₹15,000+'].map((b) => (
                      <button
                        key={b}
                        onClick={() => setAnswers({ ...answers, budget: b })}
                        className={`p-4 rounded-2xl border text-xs font-bold transition-all ${
                          answers.budget === b ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 dark:bg-slate-800 border-slate-200'
                        }`}
                      >
                        💳 {b}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-3">
                  <h3 className="font-extrabold text-sm">Preferred Product Category?</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['Electronics', 'Beauty & Skincare', 'Fashion', 'Groceries'].map((c) => (
                      <button
                        key={c}
                        onClick={() => setAnswers({ ...answers, category: c })}
                        className={`p-4 rounded-2xl border text-xs font-bold transition-all ${
                          answers.category === c ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 dark:bg-slate-800 border-slate-200'
                        }`}
                      >
                        ⭐ {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  disabled={step === 1}
                  onClick={() => setStep((s) => s - 1)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold disabled:opacity-50"
                >
                  Back
                </button>

                {step < 4 ? (
                  <button
                    onClick={() => setStep((s) => s + 1)}
                    className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold flex items-center gap-1"
                  >
                    Next <FiArrowRight />
                  </button>
                ) : (
                  <button
                    onClick={handleFinish}
                    className="px-6 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-black shadow-lg"
                  >
                    Find Curated Gifts ✨
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-pink-50 dark:bg-pink-950/40 border border-pink-200 text-xs space-y-1">
                <h4 className="font-extrabold text-pink-700 dark:text-pink-300">Curated Gifts for {answers.recipient} ({answers.occasion})</h4>
                <p className="text-slate-600 dark:text-slate-400">Budget: {answers.budget} | Category: {answers.category}</p>
              </div>

              <ProductGrid products={matchedGifts} />

              <div className="flex justify-end pt-2">
                <button onClick={() => setStep(1)} className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold">
                  Start Over
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default GiftFinderModal;
