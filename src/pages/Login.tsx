import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { ValidationIndicator, ValidationState } from "@/components/auth/ValidationIndicator";
import { WelcomeTransition } from "@/components/auth/WelcomeTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { validateEmail, validatePassword } from "@/lib/validation";
import { motion, AnimatePresence } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Form state
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  
  // Validation states
  const [emailValidation, setEmailValidation] = useState<ValidationState>("default");
  const [passwordValidation, setPasswordValidation] = useState<ValidationState>("default");
  
  // Error message
  const [errorMessage, setErrorMessage] = useState("");

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
      // Basic username check (non-empty, reasonable length)
      setEmailValidation(emailOrUsername.length >= 3 ? "valid" : "invalid");
    }
  };

  const handlePasswordBlur = () => {
    if (!password) {
      setPasswordValidation("default");
      return;
    }
    
    const result = validatePassword(password);
    setPasswordValidation(result.isValid ? "valid" : "invalid");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    
    // Validate all fields
    if (!emailOrUsername || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    }
    
    if (emailValidation === "invalid" || passwordValidation === "invalid") {
      setErrorMessage("Please correct the errors before submitting");
      return;
    }
    
    setLoading(true);
    
    try {
      // API Integration Point: POST /api/auth/login
      // Expected payload: { emailOrUsername: string, password: string, rememberMe: boolean }
      // Expected response: { success: boolean, user: { id, email, firstName, lastName }, token: string }
      // Error codes: 401 (invalid credentials), 429 (rate limit), 500 (server error)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const mockSuccess = true;
      
      if (mockSuccess) {
        setShowWelcome(true);
      } else {
        setErrorMessage("Invalid email/username or password");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleWelcomeComplete = () => {
    // Navigate to dashboard after welcome animation
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
                Sign in to your account
              </h2>
              <p className="text-sm text-ti-grey-500">
                Enter your credentials to access your dashboard
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
                    aria-describedby="email-validation"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <ValidationIndicator
                      state={emailValidation}
                      label="Email or username"
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-ti-black">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={handlePasswordBlur}
                    className="pr-20"
                    required
                    aria-describedby="password-validation"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <ValidationIndicator
                      state={passwordValidation}
                      label="Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-ti-grey-500 hover:text-ti-black transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked === true)}
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm text-ti-grey-600 cursor-pointer"
                  >
                    Remember me
                  </Label>
                </div>
                
                <button
                  type="button"
                  onClick={() => navigate("/auth/forgot-password")}
                  className="text-sm font-medium text-ti-black hover:text-ti-grey-700 transition-colors"
                >
                  Forgot password?
                </button>
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
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>

              {/* Sign up link */}
              <div className="text-center pt-4">
                <p className="text-sm text-ti-grey-600">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/auth/signup")}
                    className="font-semibold text-ti-black hover:text-ti-grey-700 transition-colors"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </AuthLayout>

      {/* Welcome Transition */}
      <AnimatePresence>
        {showWelcome && (
          <WelcomeTransition
            isReturning={true}
            onComplete={handleWelcomeComplete}
          />
        )}
      </AnimatePresence>
    </>
  );
}