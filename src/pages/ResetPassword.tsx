import { useState, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { ValidationIndicator, ValidationState } from "@/components/auth/ValidationIndicator";
import { PasswordRulesIndicator } from "@/components/auth/PasswordRulesIndicator";
import { WelcomeTransition } from "@/components/auth/WelcomeTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validatePassword, validatePasswordMatch } from "@/lib/validation";
import { motion, AnimatePresence } from "framer-motion";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const resetToken = location.state?.resetToken || "";
  const emailOrUsername = location.state?.emailOrUsername || "";
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Form state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Validation states
  const [passwordValidation, setPasswordValidation] = useState<ValidationState>("default");
  const [confirmPasswordValidation, setConfirmPasswordValidation] = useState<ValidationState>("default");
  
  // Error message
  const [errorMessage, setErrorMessage] = useState("");

  // Redirect if no token
  if (!resetToken) {
    navigate("/auth/forgot-password");
    return null;
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (!value) {
      setPasswordValidation("default");
      return;
    }
    const result = validatePassword(value);
    setPasswordValidation(result.isValid ? "valid" : "invalid");
    
    // Revalidate confirm password if it has a value
    if (confirmPassword) {
      const matchResult = validatePasswordMatch(value, confirmPassword);
      setConfirmPasswordValidation(matchResult.isValid ? "valid" : "invalid");
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (!value) {
      setConfirmPasswordValidation("default");
      return;
    }
    const result = validatePasswordMatch(password, value);
    setConfirmPasswordValidation(result.isValid ? "valid" : "invalid");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    
    if (!password || !confirmPassword) {
      setErrorMessage("Please fill in all fields");
      return;
    }
    
    if (passwordValidation === "invalid" || confirmPasswordValidation === "invalid") {
      setErrorMessage("Please correct the errors before submitting");
      return;
    }
    
    setLoading(true);
    
    try {
      // API Integration Point: POST /api/auth/reset-password
      // Expected payload: { resetToken: string, newPassword: string }
      // Expected response: { success: boolean, message: string }
      // Error codes: 400 (validation), 401 (invalid/expired token), 500 (server error)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful reset
      const mockSuccess = true;
      
      if (mockSuccess) {
        setShowSuccess(true);
      } else {
        setErrorMessage("Failed to reset password. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessComplete = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <AuthLayout>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-2xl font-bold tracking-tight text-ti-black">
                Create new password
              </h2>
              <p className="text-sm text-ti-grey-500">
                Enter a strong password to secure your account
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
                  <p className="text-sm text-ti-error font-medium">{errorMessage}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* New Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-ti-black">
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    className="pr-20"
                    required
                    autoFocus
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <ValidationIndicator state={passwordValidation} label="Password" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-ti-grey-500 hover:text-ti-black transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <PasswordRulesIndicator password={password} />
              </div>

              {/* Confirm New Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-semibold text-ti-black">
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                    className="pr-20"
                    required
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <ValidationIndicator state={confirmPasswordValidation} label="Confirm password" />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-ti-grey-500 hover:text-ti-black transition-colors"
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="auth"
                size="lg"
                className="w-full mt-6"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Resetting password...
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          </div>
        </motion.div>
      </AuthLayout>

      {/* Success Transition */}
      <AnimatePresence>
        {showSuccess && (
          <WelcomeTransition
            isReturning={false}
            onComplete={handleSuccessComplete}
          />
        )}
      </AnimatePresence>
    </>
  );
}