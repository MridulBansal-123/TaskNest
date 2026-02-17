import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

/**
 * Signup Page — Cream & Purple Theme
 */
const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const { confirmPassword, ...signupData } = formData;
      await signup(signupData);
      navigate("/");
    } catch (error) {
      setErrors({
        general: error.message || "Signup failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-[#6C63FF] rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[#4A4A4A] mb-1">
            Create Account
          </h1>
          <p className="text-[#9B9B9B]">Join us to manage your tasks</p>
        </div>

        {/* Form Card */}
        <Card className="shadow-lg animate-fade-in-up">
          <form onSubmit={handleSubmit} className="space-y-5">
            {errors.general && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
                {errors.general}
              </div>
            )}

            <Input
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              error={errors.username}
              required
            />

            <Input
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name (optional)"
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Choose a password"
              error={errors.password}
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              error={errors.confirmPassword}
              required
            />

            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              className="w-full shadow-lg shadow-indigo-500/20"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#6C63FF] hover:text-[#5A52D5] font-semibold transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;
