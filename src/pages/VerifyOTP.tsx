import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { OTPInput } from "@/components/auth/OTPInput";
import { AuthFormSkeleton } from "@/components/auth/AuthFormSkeleton";
import { validateOTP } from "@/lib/validation";
import { motion, AnimatePresence } from "framer-motion";

const OTP_LENGTH = 6;
const COUNTDOWN_DURATION = 60; // seconds

export default function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const emailOrUsername = location.state?.emailOrUsername || "";
  
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [countdown, setCountdown] = useState(COUNTDOWN_DURATION);
  const [canResend, setCanResend] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  // Page load simulation
  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Redirect back if no email/username provided
    if (!emailOrUsername) {
      navigate("/auth/forgot-password");
      return;
    }

    // Countdown timer
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown, emailOrUsername, navigate]);

  const handleOTPComplete = async (otp: string) => {
    setErrorMessage("");
    
    const validation = validateOTP(otp, OTP_LENGTH);
    if (!validation.isValid) {
      setErrorMessage(validation.message || "Invalid OTP");
      return;
    }
    
    setIsVerifying(true);
    
    try {
      // API Integration Point: POST /api/auth/verify-otp
      // Expected payload: { emailOrUsername: string, otp: string }
      // Expected response: { success: boolean, resetToken: string }
      // Error codes: 400 (invalid OTP), 401 (expired OTP), 429 (rate limit), 500 (server error)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful verification
      const mockSuccess = true;
      const mockResetToken = "mock_reset_token_123";
      
      if (mockSuccess) {
        // Navigate to reset password page with token
        navigate("/auth/reset-password", {
          state: { resetToken: mockResetToken, emailOrUsername }
        });
      } else {
        setErrorMessage("Invalid or expired OTP. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Verification failed. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    
    setErrorMessage("");
    setCanResend(false);
    setCountdown(COUNTDOWN_DURATION);
    
    try {
      // API Integration Point: POST /api/auth/request-reset (same as forgot password)
      // Expected payload: { emailOrUsername: string }
      // Expected response: { success: boolean }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Show success feedback via live region
      const message = document.createElement('div');
      message.setAttribute('role', 'status');
      message.setAttribute('aria-live', 'polite');
      message.textContent = 'New code sent successfully';
      message.className = 'sr-only';
      document.body.appendChild(message);
      setTimeout(() => document.body.removeChild(message), 1000);
      
    } catch (error) {
      setErrorMessage("Failed to resend code. Please try again.");
      setCanResend(true);
    }
  };

  return (
    <AuthLayout>
      {isPageLoading ? (
        <AuthFormSkeleton type="otp" />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="space-y-6">
            {/* Back button */}
            <button
              onClick={() => navigate("/auth/forgot-password")}
              className="flex items-center gap-2 text-sm font-medium text-ti-grey-600 hover:text-ti-black transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            {/* Header */}
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-bold tracking-tight text-ti-black">
                Enter verification code
              </h2>
              <p className="text-sm text-ti-grey-500">
                We sent a {OTP_LENGTH}-digit code to
              </p>
              <p className="text-sm font-semibold text-ti-black">
                {emailOrUsername}
              </p>
            </div>

          {/* Error Message */}
          <AnimatePresence mode="wait">
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-ti-error-light border border-ti-error rounded-input p-3"
                role="alert"
              >
                <p className="text-sm text-ti-error font-medium text-center">{errorMessage}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Verifying status */}
          {isVerifying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <p className="text-sm text-ti-grey-600 font-medium">
                Verifying your code...
              </p>
            </motion.div>
          )}

          {/* OTP Input */}
          <div className="py-4">
            <OTPInput
              length={OTP_LENGTH}
              onComplete={handleOTPComplete}
              onResend={handleResend}
              resendDisabled={!canResend}
              countdown={countdown}
            />
          </div>

          {/* Additional help */}
          <div className="text-center pt-4 space-y-2">
            <p className="text-xs text-ti-grey-500">
              The code will expire in 10 minutes
            </p>
            <p className="text-xs text-ti-grey-500">
              Need help?{" "}
              <a href="#" className="font-medium text-ti-black hover:underline">
                Contact support
              </a>
            </p>
          </div>
          </div>
        </motion.div>
      )}
    </AuthLayout>
  );
}