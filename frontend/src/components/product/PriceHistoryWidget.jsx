import { FiTrendingDown, FiCheckCircle } from 'react-icons/fi';
import { formatCurrency } from '../../utils/formatters';

const PriceHistoryWidget = ({ currentPrice = 2499, originalPrice = 3499 }) => {
  const lowestPrice = Math.round(currentPrice * 0.92);
  const highestPrice = Math.round(originalPrice * 1.05);
  const isBestTime = currentPrice <= lowestPrice * 1.05;

  return (
    <div className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-black text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <FiTrendingDown className="text-emerald-500" /> 30-Day Price History & Trend
          </h4>
          <span className="text-[10px] text-slate-400 font-medium">Recorded across NovaCart marketplace</span>
        </div>
        {isBestTime && (
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-black text-[10px] flex items-center gap-1 border border-emerald-200">
            <FiCheckCircle /> BEST TIME TO BUY
          </span>
        )}
      </div>

      {/* SVG Trend Graph */}
      <div className="h-20 w-full pt-1">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 300 80">
          <defs>
            <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M 0,20 Q 60,60 120,30 T 240,70 L 300,50 L 300,80 L 0,80 Z" fill="url(#priceGrad)" />
          <path d="M 0,20 Q 60,60 120,30 T 240,70 L 300,50" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] font-extrabold text-center">
        <div>
          <span className="text-slate-400 block text-[9px] uppercase">Lowest (30D)</span>
          <span className="text-emerald-600">{formatCurrency(lowestPrice)}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[9px] uppercase">Current</span>
          <span className="text-indigo-600">{formatCurrency(currentPrice)}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[9px] uppercase">Highest (30D)</span>
          <span className="text-slate-500">{formatCurrency(highestPrice)}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceHistoryWidget;
