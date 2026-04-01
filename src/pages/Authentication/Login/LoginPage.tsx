import { Link } from "react-router";
import { Mail, Lock, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/utils/Firebase/firebase";
import DomoApi from "@/API/domoAPI";
import {
  LoginErrors,
  validateLogin,
} from "@/utils/validation/SignIn.validations";
import { LoginFieldProps } from "@/types/Login.types";
import bcrypt from "bcryptjs";
import { AuthRole, CollectionName, ProviderName } from "@/data/mockData";
import { googleAuth } from "@/utils/GoogleOAuth/googleOauth";
import { useCurrentUser } from "@/API/currentUserContext";

export type LoginFormProps = {
  email: string;
  password: string;
};

export function LoginPage() {
  const [formData, setFormData] = useState<LoginFormProps>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginErrors>({});
  const { refreshUser } = useCurrentUser();
  const navigate = useNavigate();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateLogin(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const users = (await DomoApi.ListDocuments(
      CollectionName.FOODAPP_USERS,
    )) as {
      id: string;
      content: LoginFieldProps;
    }[];

    const user = users.find((u) => u.content?.email === formData.email);

    if (!user) {
      setErrors({ email: "Invalid credentials" });
      return;
    }

    // compare hashed password
    const isMatch = await bcrypt.compare(
      formData.password,
      user.content.password,
    );

    if (!isMatch) {
      setErrors({ email: "Invalid credentials" });
      return;
    }

    localStorage.setItem("userData", JSON.stringify(user));
    localStorage.setItem("userId", user.id);
    refreshUser();
    navigate("/");
  };

const handleGoogleLogin = async () => {
  const user = await googleAuth();
  refreshUser();
  if (user) navigate("/");
};

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block"
        >
          <div className="relative rounded-3xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800"
              alt="Delicious food"
              className="w-full h-175 object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-r from-background via-background/60 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="text-left">
                <h2 className="text-5xl font-bold mb-4">Welcome Back!</h2>
                <p className="text-xl text-muted-foreground">
                  Continue your culinary journey with LuxeEats
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-8 backdrop-blur-xl bg-card/50 border-primary/20">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Sign In</h1>
              <p className="text-muted-foreground">
                Access your premium dining experience
              </p>
            </div>

            {/* Social Login */}
            <div className="space-y-3 mb-6">
              <Button
                variant="outline"
                onClick={handleGoogleLogin}
                className="w-full border-primary/20 hover:bg-primary/10 hover:border-primary/40"
              >
                <Chrome className="w-5 h-5 mr-2" />
                Continue with Google
              </Button>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-linear-to-r from-transparent via-primary to-transparent"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-card text-sm text-muted-foreground">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Email Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleOnChange}
                    placeholder="your@email.com"
                    className="pl-10 bg-background/50 border-primary/20 focus:border-primary"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleOnChange}
                    className="pl-10 bg-background/50 border-primary/20 focus:border-primary"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <label
                    htmlFor="remember"
                    className="text-sm font-normal cursor-pointer hover:text-primary transition-colors"
                  >
                    Remember me
                  </label>
                </div>
                <Link to="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button className="w-full bg-linear-to-r from-primary to-accent hover:opacity-90 text-lg py-6">
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-primary hover:underline font-semibold"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
