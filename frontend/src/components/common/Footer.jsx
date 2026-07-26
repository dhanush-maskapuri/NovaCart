import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiShoppingBag,
  FiGithub,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiMapPin,
  FiShield,
  FiTruck,
  FiRefreshCw,
  FiFileText,
  FiSmartphone,
} from 'react-icons/fi';
import { APP_NAME, APP_TAGLINE } from '../../utils/constants';

/**
 * Footer Component - NovaCart ("India's Smart Marketplace")
 * Modern Footer featuring About, Contact, Careers, Become Seller, Privacy, Terms,
 * GitHub, LinkedIn, Instagram, App Store & Play Store download badges.
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
      title: '7-Day Easy Replacement',
      desc: 'Instant UPI refunds directly to GPay or PhonePe',
    },
    {
      icon: FiFileText,
      title: 'GST Tax Invoice',
      desc: 'Input tax credit ready invoices for business buyers',
    },
  ];

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/dhanush-maskapuri', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FiInstagram, href: 'https://instagram.com', label: 'Instagram' },
  ];

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 mt-auto transition-colors duration-300">
      {/* Top Trust Badges Strip */}
      <div className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/50 py-8">
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustFeatures.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-start gap-3.5 p-3 rounded-2xl">
                <div className="p-2.5 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shrink-0">
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
          {/* Brand & App Download Column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white flex items-center justify-center shadow-md">
                <FiShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400">
                {APP_NAME}
              </span>
            </Link>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              {APP_NAME} ({APP_TAGLINE}) is India's premier online marketplace combining electronics, 10-minute grocery delivery (NovaMart), fashion, home decor, and appliances with instant UPI checkout.
            </p>

            {/* App Store & Play Store Download Badges */}
            <div className="pt-2">
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block mb-2">
                Download NovaCart App
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="#download-playstore"
                  className="px-3.5 py-2 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-bold flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <FiSmartphone className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
                  <div className="flex flex-col text-left leading-tight">
                    <span className="text-[9px] uppercase font-bold text-slate-400">GET IT ON</span>
                    <span className="text-xs font-extrabold">Google Play</span>
                  </div>
                </a>

                <a
                  href="#download-appstore"
                  className="px-3.5 py-2 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-bold flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <FiSmartphone className="w-4 h-4 text-blue-400 dark:text-blue-600" />
                  <div className="flex flex-col text-left leading-tight">
                    <span className="text-[9px] uppercase font-bold text-slate-400">DOWNLOAD ON THE</span>
                    <span className="text-xs font-extrabold">App Store</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs font-bold text-slate-400 mr-2">Connect:</span>
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
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick Links Column 1 */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-black tracking-wider uppercase text-slate-900 dark:text-slate-100">
              Company
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <li>
                <Link to="/about" className="hover:text-blue-600 transition-colors">
                  About NovaCart
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-600 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-blue-600 transition-colors">
                  Careers (We're Hiring!)
                </Link>
              </li>
              <li>
                <Link to="/become-seller" className="hover:text-blue-600 font-bold transition-colors text-amber-600 dark:text-amber-400">
                  Become a Seller
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-blue-600 transition-colors font-bold">
                  Merchant Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Column 2 */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-black tracking-wider uppercase text-slate-900 dark:text-slate-100">
              Policies & Help
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <li>
                <Link to="/privacy" className="hover:text-blue-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-blue-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-blue-600 transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-blue-600 transition-colors">
                  My Profile & Addresses
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-blue-600 transition-colors">
                  GST Tax Invoice Info
                </Link>
              </li>
            </ul>
          </div>

          {/* Corporate HQ Column */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-black tracking-wider uppercase text-slate-900 dark:text-slate-100">
              Corporate Headquarters
            </h4>
            <ul className="flex flex-col gap-3 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <li className="flex items-start gap-2.5">
                <FiMapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>{APP_NAME} India Technologies Pvt. Ltd., Embassy Tech Village, Outer Ring Road, Bengaluru, Karnataka 560103</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiPhone className="w-4 h-4 text-blue-600 shrink-0" />
                <span>+91 1800-419-7467 (Toll-Free)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiMail className="w-4 h-4 text-blue-600 shrink-0" />
                <span>support@novacart.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Accepted Payment Methods Banner */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-8 pb-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500">
            <span>Accepted Payment Modes:</span>
            <span className="bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-[11px] text-slate-800 dark:text-slate-200">
              UPI (GPay / PhonePe / Paytm / BHIM)
            </span>
            <span className="bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-[11px] text-slate-800 dark:text-slate-200">
              RuPay / Visa / Mastercard
            </span>
            <span className="bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-[11px] text-slate-800 dark:text-slate-200">
              Cash on Delivery (COD)
            </span>
          </div>

          <p className="text-xs text-slate-400 font-medium">
            GSTIN: <span className="font-mono text-slate-600 dark:text-slate-300 font-bold">29AAAAA0000A1Z5</span>
          </p>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {currentYear} {APP_NAME} India Technologies Pvt. Ltd. All rights reserved.</p>
          <p className="text-slate-400 font-semibold">
            NovaCart – India's Smart Marketplace
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
