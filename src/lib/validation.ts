// Validation utilities for authentication forms
// All validation logic centralized here for consistency

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

// Email validation using RFC 5322 simplified pattern
export const validateEmail = (email: string): ValidationResult => {
  const trimmedEmail = email.trim();
  
  if (!trimmedEmail) {
    return { isValid: false, message: "Email is required" };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(trimmedEmail)) {
    return { isValid: false, message: "Invalid email format" };
  }
  
  if (trimmedEmail.length > 255) {
    return { isValid: false, message: "Email must be less than 255 characters" };
  }
  
  return { isValid: true };
};

// Username validation
export const validateUsername = (username: string): ValidationResult => {
  const trimmedUsername = username.trim();
  
  if (!trimmedUsername) {
    return { isValid: false, message: "Username is required" };
  }
  
  if (trimmedUsername.length < 3) {
    return { isValid: false, message: "Username must be at least 3 characters" };
  }
  
  if (trimmedUsername.length > 30) {
    return { isValid: false, message: "Username must be less than 30 characters" };
  }
  
  // Allow alphanumeric, underscore, and hyphen
  const usernameRegex = /^[a-zA-Z0-9_-]+$/;
  
  if (!usernameRegex.test(trimmedUsername)) {
    return { isValid: false, message: "Username can only contain letters, numbers, underscores, and hyphens" };
  }
  
  return { isValid: true };
};

// Password validation with strength requirements
export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, message: "Password is required" };
  }
  
  if (password.length < 8) {
    return { isValid: false, message: "Password must be at least 8 characters" };
  }
  
  if (password.length > 128) {
    return { isValid: false, message: "Password must be less than 128 characters" };
  }
  
  // Recommended: at least one lowercase, one uppercase, one number
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  
  if (!hasLowercase || !hasUppercase || !hasNumber) {
    return { isValid: false, message: "Password must contain lowercase, uppercase, and numbers" };
  }
  
  return { isValid: true };
};

// Confirm password validation
export const validatePasswordMatch = (password: string, confirmPassword: string): ValidationResult => {
  if (!confirmPassword) {
    return { isValid: false, message: "Please confirm your password" };
  }
  
  if (password !== confirmPassword) {
    return { isValid: false, message: "Passwords do not match" };
  }
  
  return { isValid: true };
};

// Name validation (first name, last name)
export const validateName = (name: string, fieldName: string = "Name"): ValidationResult => {
  const trimmedName = name.trim();
  
  if (!trimmedName) {
    return { isValid: false, message: `${fieldName} is required` };
  }
  
  if (trimmedName.length < 2) {
    return { isValid: false, message: `${fieldName} must be at least 2 characters` };
  }
  
  if (trimmedName.length > 50) {
    return { isValid: false, message: `${fieldName} must be less than 50 characters` };
  }
  
  // Allow letters, spaces, hyphens, and apostrophes
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  
  if (!nameRegex.test(trimmedName)) {
    return { isValid: false, message: `${fieldName} can only contain letters, spaces, hyphens, and apostrophes` };
  }
  
  return { isValid: true };
};

// Phone number validation (E.164 format recommended)
export const validatePhone = (phone: string): ValidationResult => {
  const trimmedPhone = phone.trim();
  
  if (!trimmedPhone) {
    return { isValid: false, message: "Phone number is required" };
  }
  
  // Remove common formatting characters
  const cleanedPhone = trimmedPhone.replace(/[\s\-\(\)\.]/g, '');
  
  // E.164 format: + followed by 1-15 digits
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  
  if (!phoneRegex.test(cleanedPhone)) {
    return { isValid: false, message: "Invalid phone number format (use +1234567890)" };
  }
  
  return { isValid: true };
};

// OTP validation
export const validateOTP = (otp: string, expectedLength: number = 6): ValidationResult => {
  if (!otp) {
    return { isValid: false, message: "OTP is required" };
  }
  
  if (otp.length !== expectedLength) {
    return { isValid: false, message: `OTP must be ${expectedLength} digits` };
  }
  
  const otpRegex = /^\d+$/;
  
  if (!otpRegex.test(otp)) {
    return { isValid: false, message: "OTP must contain only numbers" };
  }
  
  return { isValid: true };
};