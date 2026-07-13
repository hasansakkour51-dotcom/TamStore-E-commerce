import React, { Suspense, lazy } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";

// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Error Boundary
import ErrorBoundary from "./shared/errorBoundary/ErrorBoundary";

// Wishlist Context
import { WishlistProvider } from "./contextWishlist/WishlistContext";

// Auth
// ⚠️ ProtectedRoute موجود لكن معلّق مؤقتًا لعرض الـ features للجميع
// import ProtectedRoute from "./shared/auth/ProtectedRoute";

// Framer Motion
import { AnimatePresence, motion } from "framer-motion";

// ⭐ Theme Provider (Dark / Light Mode)
import { ThemeProvider } from "./contextTheme/ThemeContext";

// ✅ Lazy Imports
const HomePage = lazy(() =>
  import("./feature/homePage/ui/components/HomePage")
);
const Products = lazy(() =>
  import("./feature/products/ui/components/Products")
);
const CartPage = lazy(() => import("./feature/cart/ui/CartPage"));
const Profile = lazy(() => import("./feature/Profile/Profile"));
const AuthForm = lazy(() => import("./feature/Auth/AuthForm"));

// ✅ Loading Component
function Loading() {
  return (
    <div className="loading-screen">
      <div className="spinner"></div>
      <h2>Loading...</h2>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: "tween",
    ease: "easeOut",
    duration: 0.5,
  };

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<Loading />}>
        <Routes location={location} key={location.pathname}>
          {/* صفحات عامة */}
          <Route
            path="/"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
              >
                <HomePage />
              </motion.div>
            }
          />

          <Route
            path="/authForm"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
              >
                <AuthForm />
              </motion.div>
            }
          />

          {/* صفحات محمية - ⚠️ الحماية معلّقة مؤقتًا */}
          <Route
            path="/products"
            element={
              // Normally wrapped with <ProtectedRoute>
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
              >
                <Products />
              </motion.div>
            }
          />

          <Route
            path="/cart"
            element={
              // Normally wrapped with <ProtectedRoute>
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
              >
                <CartPage />
              </motion.div>
            }
          />

          <Route
            path="/profile"
            element={
              // Normally wrapped with <ProtectedRoute>
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
              >
                <Profile />
              </motion.div>
            }
          />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ThemeProvider>
      <WishlistProvider>
        <ErrorBoundary>
          <AnimatedRoutes />

          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </ErrorBoundary>
      </WishlistProvider>
    </ThemeProvider>
  );
}

export default App;
