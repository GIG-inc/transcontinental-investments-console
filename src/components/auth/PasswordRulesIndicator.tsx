import { Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PasswordRule {
  label: string;
  test: (password: string) => boolean;
}

interface PasswordRulesIndicatorProps {
  password: string;
}

const passwordRules: PasswordRule[] = [
  { label: "At least 8 characters", test: (pw) => pw.length >= 8 },
  { label: "Contains lowercase letter", test: (pw) => /[a-z]/.test(pw) },
  { label: "Contains uppercase letter", test: (pw) => /[A-Z]/.test(pw) },
  { label: "Contains number", test: (pw) => /[0-9]/.test(pw) },
];

export const PasswordRulesIndicator = ({ password }: PasswordRulesIndicatorProps) => {
  if (password.length === 0) return null;

  return (
    <div className="space-y-2 mt-2" role="status" aria-live="polite">
      {passwordRules.map((rule, index) => {
        const isValid = rule.test(password);
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-2 text-sm"
          >
            <AnimatePresence mode="wait">
              {isValid ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-4 h-4 rounded-full bg-ti-success flex items-center justify-center"
                >
                  <Check className="w-3 h-3 text-ti-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="x"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-4 h-4 rounded-full bg-ti-grey-300 flex items-center justify-center"
                >
                  <X className="w-3 h-3 text-ti-grey-600" />
                </motion.div>
              )}
            </AnimatePresence>
            <span className={isValid ? "text-ti-success" : "text-ti-grey-600"}>
              {rule.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};
