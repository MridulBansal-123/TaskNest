import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

/**
 * Login Page — Cream & Purple Theme
 */
const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
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
      await login(formData);
      navigate("/");
    } catch (error) {
      setErrors({
        general: error.message || "Invalid username or password",
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[#4A4A4A] mb-1">
            Welcome Back
          </h1>
          <p className="text-[#9B9B9B]">Sign in to your account</p>
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
              placeholder="Enter your username"
              error={errors.username}
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              error={errors.password}
              required
            />

            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              className="w-full shadow-lg shadow-indigo-500/20"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-[#6C63FF] hover:text-[#5A52D5] font-semibold transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
