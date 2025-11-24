import { motion } from "framer-motion";
import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

interface WelcomeTransitionProps {
  firstName?: string;
  isReturning?: boolean;
  onComplete: () => void;
}

export const WelcomeTransition = ({
  firstName,
  isReturning = false,
  onComplete,
}: WelcomeTransitionProps) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, isReturning ? 500 : 900);
    return () => clearTimeout(timer);
  }, [onComplete, isReturning]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ti-black/95 backdrop-blur-sm"
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="text-center space-y-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        >
          <CheckCircle2 className="w-16 h-16 text-ti-success mx-auto" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <h2 className="text-3xl font-bold text-ti-white">
            {isReturning ? "Welcome back" : "Welcome"}
            {firstName && !isReturning && `, ${firstName}`}!
          </h2>
          <p className="text-ti-grey-300">
            {isReturning
              ? "Taking you to your dashboard..."
              : "Your account is ready. Redirecting..."}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};