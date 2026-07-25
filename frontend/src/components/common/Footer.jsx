import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiShoppingBag,
  FiGithub,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiMapPin,
  FiShield,
  FiTruck,
  FiRefreshCw,
  FiFileText,
} from 'react-icons/fi';
import { APP_NAME, APP_TAGLINE } from '../../utils/constants';

/**
 * Footer Component - NOVACART ("India's Smart Marketplace")
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const trustFeatures = [
    {
      icon: FiShield,
      title: '100% Authentic Products',
      desc: 'Sourced directly from verified Indian & global brands',
    },
    {
      icon: FiTruck,
      title: 'Express 10-Min Delivery',
      desc: 'Hyperlocal grocery delivery via NovaMart hubs',
    },
    {
      icon: FiRefreshCw,
      title: '7-Day Easy Returns',
      desc: 'Instant UPI refunds directly to GPay or PhonePe',
    },
    {
      icon: FiFileText,
      title: 'GST Tax Invoice',
      desc: 'Input tax credit ready invoices for business buyers',
    },
  ];

  const socialLinks = [
    { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: FiInstagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: FiGithub, href: 'https://github.com', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 mt-auto transition-colors duration-300">
      {/* Top Trust Badges Strip */}
      <div className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 py-8">
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustFeatures.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-start gap-3.5 p-3 rounded-2xl">
                <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{item.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Footer Links Container */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
                <FiShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-gradient">{APP_NAME}</span>
            </Link>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              {APP_NAME} ({APP_TAGLINE}) is India's premier modern marketplace connecting top Indian brands, 10-minute grocery hubs, flagship electronics, and ethnic fashion with instant UPI checkout.
            </p>

            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs font-bold text-slate-400 mr-2">Follow Us:</span>
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick Hubs */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold tracking-wider uppercase text-slate-900 dark:text-slate-100">
              Marketplace Hubs
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <li>
                <Link to="/shop?category=groceries" className="hover:text-indigo-600 transition-colors">
                  NovaMart (10-Min Groceries)
                </Link>
              </li>
              <li>
                <Link to="/shop?category=mobiles" className="hover:text-indigo-600 transition-colors">
                  NovaTech (5G Mobiles & Laptops)
                </Link>
              </li>
              <li>
                <Link to="/shop?category=fashion" className="hover:text-indigo-600 transition-colors">
                  NovaFashion (Ethnic & Streetwear)
                </Link>
              </li>
              <li>
                <Link to="/shop?category=furniture" className="hover:text-indigo-600 transition-colors">
                  NovaHome (Furniture & Decor)
                </Link>
              </li>
              <li>
                <Link to="/ai-assistant" className="hover:text-purple-500 font-bold transition-colors">
                  ⚡ AI Shopping Assistant
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold tracking-wider uppercase text-slate-900 dark:text-slate-100">
              Customer Support
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <li>
                <Link to="/orders" className="hover:text-indigo-600 transition-colors">
                  Track Order Shipment Timeline
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-indigo-600 transition-colors">
                  My Profile & Indian Addresses
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-indigo-600 transition-colors">
                  GST Invoice & Cart Breakdown
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-indigo-600 transition-colors font-bold">
                  Merchant / Admin Suite
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & HQ */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold tracking-wider uppercase text-slate-900 dark:text-slate-100">
              Corporate Headquarters
            </h4>
            <ul className="flex flex-col gap-3 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <li className="flex items-start gap-2.5">
                <FiMapPin className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>{APP_NAME} Technologies Pvt. Ltd., Embassy Tech Village, Outer Ring Road, Bengaluru, Karnataka 560103</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiPhone className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>+91 1800-419-7467 (Toll-Free)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiMail className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>support@novacart.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Accepted Payment Methods Badge Banner */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-8 pb-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <span>Accepted Payments:</span>
            <span className="bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-[11px]">
              GPay / PhonePe / Paytm UPI
            </span>
            <span className="bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-[11px]">
              RuPay / Visa / Mastercard
            </span>
            <span className="bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-[11px]">
              HDFC / ICICI NetBanking
            </span>
          </div>

          <p className="text-xs text-slate-400">
            GSTIN: <span className="font-mono text-slate-600 dark:text-slate-300">29AAAAA0000A1Z5</span>
          </p>
        </div>

        {/* Copyright Line */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {currentYear} {APP_NAME} Technologies Pvt. Ltd. All rights reserved.</p>
          <p className="text-slate-400">
            Engineered with React 18, Tailwind CSS & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
