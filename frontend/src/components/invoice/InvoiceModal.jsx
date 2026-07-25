import { motion, AnimatePresence } from 'framer-motion';
import { FiPrinter, FiDownload, FiX, FiCheckCircle, FiShield } from 'react-icons/fi';
import { formatCurrency, calculateGST, formatDate } from '../../utils/formatters';

/**
 * InvoiceModal Component - Indian GST Tax Invoice View & Print
 */
const InvoiceModal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  const {
    id = 'ORD-98421',
    createdAt = new Date().toISOString(),
    items = [],
    shippingAddress = {},
    totalAmount = 0,
    paymentMethod = 'UPI (Google Pay)',
  } = order;

  const gstBreakdown = calculateGST(totalAmount);

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden my-8"
        >
          {/* Header Action Bar */}
          <div className="p-4 bg-slate-100 dark:bg-slate-800 flex items-center justify-between border-b border-slate-200 dark:border-slate-700 print:hidden">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                OFFICIAL TAX INVOICE
              </span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                GSTIN: 29AAAAA0000A1Z5
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <FiPrinter className="w-4 h-4" />
                <span>Print Invoice</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable GST Invoice Body */}
          <div id="printable-invoice" className="p-8 space-y-6 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900">
            {/* Header / Brand */}
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
              <div>
                <h1 className="text-2xl font-black tracking-tight text-indigo-600">
                  ShopSphere India Technologies Pvt. Ltd.
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Embassy Tech Village, Outer Ring Road, Devarabeesanahalli, Bengaluru, Karnataka 560103
                </p>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-0.5">
                  GSTIN: 29AAAAA0000A1Z5 | Corporate CIN: U72900KA2026PTC123456
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">
                  TAX INVOICE / BILL OF SUPPLY
                </span>
                <span className="text-lg font-black text-slate-900 dark:text-slate-100 block">
                  #{id}
                </span>
                <span className="text-xs text-slate-500 block">Date: {formatDate(createdAt)}</span>
              </div>
            </div>

            {/* Address Columns */}
            <div className="grid grid-cols-2 gap-6 text-xs border-b border-slate-200 dark:border-slate-800 pb-6">
              <div>
                <h4 className="font-extrabold uppercase text-slate-400 mb-1">Billed To / Buyer Details:</h4>
                <p className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  {shippingAddress.name || 'Rahul Sharma'}
                </p>
                <p className="text-slate-600 dark:text-slate-300 mt-0.5">
                  {shippingAddress.street || '42, Outer Ring Road, HSR Layout'}
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  {shippingAddress.city || 'Bengaluru'}, {shippingAddress.state || 'Karnataka'} -{' '}
                  {shippingAddress.pincode || '560102'}
                </p>
                <p className="text-slate-500 mt-1">Phone: {shippingAddress.phone || '+91 9876543210'}</p>
              </div>

              <div className="text-right">
                <h4 className="font-extrabold uppercase text-slate-400 mb-1">Order Details:</h4>
                <p className="font-semibold">
                  Payment Method: <span className="font-bold text-indigo-600">{paymentMethod}</span>
                </p>
                <p className="font-semibold text-slate-600 dark:text-slate-300 mt-0.5">
                  Place of Supply: {shippingAddress.state || 'Karnataka'} (State Code 29)
                </p>
                <p className="font-semibold text-emerald-600 mt-1 flex items-center justify-end gap-1">
                  <FiCheckCircle className="w-3.5 h-3.5" />
                  <span>Payment Verified</span>
                </p>
              </div>
            </div>

            {/* Taxable Items Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                    <th className="py-2.5 px-3 font-extrabold uppercase">#</th>
                    <th className="py-2.5 px-3 font-extrabold uppercase">Product Description</th>
                    <th className="py-2.5 px-3 font-extrabold uppercase">HSN Code</th>
                    <th className="py-2.5 px-3 font-extrabold uppercase text-right">Qty</th>
                    <th className="py-2.5 px-3 font-extrabold uppercase text-right">Unit Price</th>
                    <th className="py-2.5 px-3 font-extrabold uppercase text-right">Total (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {items.map((item, idx) => {
                    const p = item.product || item;
                    const qty = item.quantity || 1;
                    const itemTotal = (p.price || 0) * qty;
                    return (
                      <tr key={idx}>
                        <td className="py-3 px-3 font-bold text-slate-400">{idx + 1}</td>
                        <td className="py-3 px-3 font-bold text-slate-900 dark:text-slate-100">
                          {p.name}
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-500">{p.hsnCode || '8518'}</td>
                        <td className="py-3 px-3 text-right font-bold">{qty}</td>
                        <td className="py-3 px-3 text-right font-medium">{formatCurrency(p.price)}</td>
                        <td className="py-3 px-3 text-right font-black">{formatCurrency(itemTotal)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* GST Summary & Grand Total */}
            <div className="flex flex-col md:flex-row justify-between gap-6 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="text-xs text-slate-500 max-w-sm space-y-1">
                <p className="font-bold text-slate-700 dark:text-slate-300">GST Declaration:</p>
                <p>
                  We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct. CGST @ 9% + SGST @ 9% applied as per Indian GST Rules.
                </p>
              </div>

              <div className="w-full md:w-72 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Taxable Base Value:</span>
                  <span className="font-semibold">{formatCurrency(gstBreakdown.basePrice)}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>CGST (9%):</span>
                  <span className="font-semibold">{formatCurrency(gstBreakdown.cgst)}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>SGST (9%):</span>
                  <span className="font-semibold">{formatCurrency(gstBreakdown.sgst)}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Delivery Charges:</span>
                  <span className="font-bold text-emerald-600">FREE</span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-900 dark:text-slate-100 pt-2 border-t border-slate-300 dark:border-slate-700">
                  <span>Grand Total:</span>
                  <span className="text-indigo-600">{formatCurrency(totalAmount)}</span>
                </div>
              </div>
            </div>

            {/* Authorised Signatory */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-end text-xs">
              <div>
                <p className="font-bold text-slate-400 uppercase text-[10px]">Thank you for shopping on ShopSphere India!</p>
              </div>
              <div className="text-right">
                <div className="font-serif italic font-bold text-slate-800 dark:text-slate-200 text-sm">ShopSphere India Pvt Ltd</div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Authorised Signatory</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default InvoiceModal;
