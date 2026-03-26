import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const WelcomePopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 40 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="fixed bottom-6 right-6 z-50 glass-strong neon-box rounded-2xl p-6 max-w-sm shadow-2xl"
        >
          <button
            onClick={() => setShow(false)}
            className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🐍</span>
            <h3 className="text-lg font-display font-bold text-primary">
              Welcome to Python World!
            </h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Start your Python journey here! Paste code, trace execution, explore roadmaps, and chat with our Python guide.
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShow(false)}
            className="mt-4 w-full gradient-primary text-primary-foreground font-display font-semibold text-sm py-2 rounded-lg"
          >
            Let's Go! 🚀
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomePopup;
