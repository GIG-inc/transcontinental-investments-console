import { useRef, useState, useEffect, KeyboardEvent, ClipboardEvent } from "react";
import { motion } from "framer-motion";

interface OTPInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  onResend: () => void;
  resendDisabled: boolean;
  countdown: number;
}

export const OTPInput = ({
  length = 6,
  onComplete,
  onResend,
  resendDisabled,
  countdown,
}: OTPInputProps) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Auto-focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    // Check if OTP is complete
    if (otp.every((digit) => digit !== "")) {
      onComplete(otp.join(""));
    }
  }, [otp, onComplete]);

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Take last character only
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Focus previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, length);
    
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split("").concat(Array(length).fill("")).slice(0, length);
    setOtp(newOtp);

    // Focus last filled input
    const lastFilledIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[lastFilledIndex]?.focus();
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 justify-center" role="group" aria-label="One-time password input">
        {Array.from({ length }).map((_, index) => (
          <motion.input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={otp[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={index === 0 ? handlePaste : undefined}
            className="w-12 h-14 text-center text-2xl font-semibold border-2 border-ti-grey-200 rounded-input focus:border-ti-black focus:outline-none focus:ring-2 focus:ring-ti-black focus:ring-offset-2 transition-colors"
            aria-label={`Digit ${index + 1} of ${length}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          />
        ))}
      </div>

      <div className="text-center space-y-2">
        <p className="text-sm text-ti-grey-500">
          {countdown > 0 ? (
            <>Resend code in <span className="font-semibold text-ti-black">{countdown}s</span></>
          ) : (
            "Didn't receive the code?"
          )}
        </p>
        <button
          type="button"
          onClick={onResend}
          disabled={resendDisabled}
          className="text-sm font-medium text-ti-black hover:text-ti-grey-700 disabled:text-ti-grey-300 disabled:cursor-not-allowed transition-colors"
          aria-live="polite"
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
};