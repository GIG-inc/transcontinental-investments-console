import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, ArrowLeft } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { ValidationIndicator, ValidationState } from "@/components/auth/ValidationIndicator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateEmail } from "@/lib/validation";
import { motion, AnimatePresence } from "framer-motion";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [emailOrUsername, setEmailOrUsername] = useState("");
  
  // Validation state
  const [emailValidation, setEmailValidation] = useState<ValidationState>("default");
  
  // Messages
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleEmailBlur = () => {
    if (!emailOrUsername) {
      setEmailValidation("default");
      return;
    }
    
    // Accept either email or username format
    const isEmail = emailOrUsername.includes("@");
    if (isEmail) {
      const result = validateEmail(emailOrUsername);
      setEmailValidation(result.isValid ? "valid" : "invalid");
    } else {
      setEmailValidation(emailOrUsername.length >= 3 ? "valid" : "invalid");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    
    if (!emailOrUsername) {
      setErrorMessage("Please enter your email or username");
      return;
    }
    
    if (emailValidation === "invalid") {
      setErrorMessage("Please enter a valid email or username");
      return;
    }
    
    setLoading(true);
    
    try {
      // API Integration Point: POST /api/auth/request-reset
      // Expected payload: { emailOrUsername: string }
      // Expected response: { success: boolean, message: string }
      // Error codes: 404 (user not found), 429 (rate limit), 500 (server error)
      // Note: For security, even if user not found, show success message
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful request
      const mockSuccess = true;
      
      if (mockSuccess) {
        setSuccessMessage("OTP sent! Check your email and enter the code below.");
        
        // Navigate to OTP verification after short delay
        setTimeout(() => {
          navigate("/auth/verify-otp", { 
            state: { emailOrUsername } 
          });
        }, 1500);
      } else {
        setErrorMessage("Failed to send reset code. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="space-y-6">
          {/* Back button */}
          <button
            onClick={() => navigate("/auth/login")}
            className="flex items-center gap-2 text-sm font-medium text-ti-grey-600 hover:text-ti-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to sign in
          </button>

          {/* Header */}
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl font-bold tracking-tight text-ti-black">
              Reset your password
            </h2>
            <p className="text-sm text-ti-grey-500">
              Enter your email or username and we'll send you a verification code
            </p>
          </div>

          {/* Success Message */}
          <AnimatePresence mode="wait">
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-ti-success-light border border-ti-success rounded-input p-3"
                role="status"
              >
                <p className="text-sm text-ti-success font-medium">{successMessage}</p>
              </motion.div>
            )}
          </AnimatePresence>

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
                <p className="text-sm text-ti-error font-medium">{errorMessage}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email or Username */}
            <div className="space-y-2">
              <Label htmlFor="emailOrUsername" className="text-sm font-semibold text-ti-black">
                Email or Username
              </Label>
              <div className="relative">
                <Input
                  id="emailOrUsername"
                  type="text"
                  placeholder="your.email@example.com"
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  onBlur={handleEmailBlur}
                  className="pr-10"
                  required
                  autoFocus
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <ValidationIndicator
                    state={emailValidation}
                    label="Email or username"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="auth"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending code...
                </>
              ) : (
                "Send Verification Code"
              )}
            </Button>

            {/* Additional help */}
            <div className="text-center pt-4">
              <p className="text-xs text-ti-grey-500">
                Need help?{" "}
                <a href="#" className="font-medium text-ti-black hover:underline">
                  Contact support
                </a>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </AuthLayout>
  );
}