import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext';
import { CompareProvider } from './context/CompareContext';
import { PreferencesProvider } from './context/PreferencesContext';
import CompareModal from './components/compare/CompareModal';
import GiftFinderModal from './components/gift/GiftFinderModal';
import AIAssistantFloating from './components/common/AIAssistantFloating';
import MobileBottomNav from './components/common/MobileBottomNav';
import AppRoutes from './routes/AppRoutes';

/**
 * App Component
 * Root component encapsulating Global Context Providers and React Router setup.
 */
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PreferencesProvider>
          <CartProvider>
            <WishlistProvider>
              <RecentlyViewedProvider>
                <CompareProvider>
                  <Router>
                    <AppRoutes />
                    <CompareModal />
                    <GiftFinderModal />
                    <AIAssistantFloating />
                    <MobileBottomNav />
                  </Router>
                </CompareProvider>
              </RecentlyViewedProvider>
            </WishlistProvider>
          </CartProvider>
        </PreferencesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
