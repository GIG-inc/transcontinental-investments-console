import { Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type ValidationState = "default" | "valid" | "invalid";

interface ValidationIndicatorProps {
  state: ValidationState;
  label: string;
}

export const ValidationIndicator = ({ state, label }: ValidationIndicatorProps) => {
  return (
    <div
      className={`validation-indicator ${state}`}
      role="status"
      aria-label={`${label}: ${state === "valid" ? "valid" : state === "invalid" ? "invalid" : "not checked"}`}
    >
      <AnimatePresence mode="wait">
        {state === "valid" && (
          <motion.div
            key="check"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Check className="w-3 h-3" />
          </motion.div>
        )}
        {state === "invalid" && (
          <motion.div
            key="x"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <X className="w-3 h-3" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};