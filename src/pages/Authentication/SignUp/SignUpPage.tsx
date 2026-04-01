import { Link } from "react-router-dom";
import { Mail, Lock, User, Phone, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { useState } from "react";
import DomoApi from "@/API/domoAPI";
import { LoginFieldProps } from "@/types/Login.types";
import {
  SignUpErrors,
  validateSignUp,
} from "@/utils/validation/SingUp.validation";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/utils/Firebase/firebase";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import { AuthRole, CollectionName, ProviderName } from "@/data/mockData";
import { googleAuth } from "@/utils/GoogleOAuth/googleOauth";
import { useCurrentUser } from "@/API/currentUserContext";

export function SignUpPage() {
  const [formData, setFormData] = useState<LoginFieldProps>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    role: "user",
    is_termsCheck: false,
  });

  const [errors, setErrors] = useState<SignUpErrors>({});
  const { refreshUser } = useCurrentUser();
  const navigate = useNavigate();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmitSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateSignUp(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const existingUsers = (await DomoApi.ListDocuments(
      CollectionName.FOODAPP_USERS,
    )) as {
      content: LoginFieldProps;
    }[];

    const emailExists = existingUsers.some(
      (user) =>
        user.content?.email?.toLowerCase() === formData.email.toLowerCase(),
    );

    const phoneExists = existingUsers.some(
      (user) => user.content?.phone === formData.phone,
    );

    if (emailExists || phoneExists) {
      setErrors((prev) => ({
        ...prev,
        ...(emailExists && { email: "Email already registered" }),
        ...(phoneExists && { phone: "Phone already registered" }),
      }));
      return;
    }

    const passwordHash = await bcrypt.hash(formData.password, 10);

    const newUser = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      password: passwordHash,
      authProvider: ProviderName.LOCAL,
      providerId: "",
      createdAt: new Date().toISOString(),
      role: AuthRole.USER,
    };

    await DomoApi.CreateDocument(CollectionName.FOODAPP_USERS, newUser);

    navigate("/login");
  };

  const handleGoogleSignUp = async () => {
    const user = await googleAuth();
    refreshUser()
    if (user) navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="order-2 lg:order-1"
        >
          <Card className="p-8 backdrop-blur-xl bg-card/50 border-primary/20">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Create Account</h1>
              <p className="text-muted-foreground">
                Join the premium dining community
              </p>
            </div>

            {/* Social Login */}
            <div className="space-y-3 mb-6">
              <Button
                variant="outline"
                onClick={handleGoogleSignUp}
                className="w-full border-primary/20 hover:bg-primary/10 hover:border-primary/40"
              >
                <Chrome className="w-5 h-5 mr-2" />
                Sign up with Google
              </Button>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-linear-to-r from-transparent via-primary to-transparent"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-card text-sm text-muted-foreground">
                  Or sign up with email
                </span>
              </div>
            </div>

            {/* Sign Up Form */}
            <form className="space-y-4" onSubmit={handleSubmitSignUp}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleOnChange}
                      className="pl-10 bg-background/50 border-primary/20 focus:border-primary"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs">{errors.firstName}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleOnChange}
                    className="bg-background/50 border-primary/20 focus:border-primary"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleOnChange}
                    className="pl-10 bg-background/50 border-primary/20 focus:border-primary"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleOnChange}
                    className="pl-10 bg-background/50 border-primary/20 focus:border-primary"
                  />
                </div>{" "}
                {errors.phone && (
                  <p className="text-red-500 text-xs">{errors.phone}</p>
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

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="is_termsCheck"
                  checked={formData.is_termsCheck}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      is_termsCheck: !!checked,
                    }))
                  }
                  className={errors.is_termsCheck ? "ring-2 ring-red-500" : ""}
                />
                <label
                  htmlFor="is_termsCheck"
                  className="text-sm font-normal cursor-pointer"
                >
                  I agree to the{" "}
                  <Link to="#" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="#" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </label>
                {errors.is_termsCheck && (
                  <p className="text-red-500 text-xs">Please accept terms</p>
                )}
              </div>

              <Button className="w-full bg-linear-to-r from-primary to-accent hover:opacity-90 text-lg py-6">
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary hover:underline font-semibold"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Right Side - Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="order-1 lg:order-2 hidden lg:block"
        >
          <div className="relative rounded-3xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800"
              alt="Delicious food"
              className="w-full h-175 object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-l from-background via-background/60 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="text-right ml-auto">
                <h2 className="text-5xl font-bold mb-4">Join LuxeEats</h2>
                <p className="text-xl text-muted-foreground">
                  Experience premium dining like never before
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
