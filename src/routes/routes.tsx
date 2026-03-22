import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./RootLayout";
import HomePage from "@/pages/Home/HomePage";
import { SignUpPage } from "@/pages/Authentication/SignUp/SignUpPage";
import FoodListingPage from "@/pages/FoodListingPage/FoodListingPage";
import VendorPage from "@/pages/VendorPage/VendorPage";
import FoodDetailPage from "@/pages/FoodDetailPage/FoodDetailPage";
import CartPage from "@/pages/CartPage/CartPage";
import ProfilePage from "@/pages/ProfilePage/ProfilePage";
import { AdminLayout } from "@/layouts/AdminLayout/AdminLayout";
import { AdminDashboard } from "@/pages/AdminDashboard/AdminDashboard";
import { NotFoundPage } from "@/pages/NotFoundPage/NotFoundPage";
import { LoginPage } from "@/pages/Authentication/Login/LoginPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "login", Component: LoginPage },
      { path: "signup", Component: SignUpPage },
      { path: "foods", Component: FoodListingPage },
      { path: "vendor/:id", Component: VendorPage },
      { path: "food/:id", Component: FoodDetailPage },
      { path: "cart", Component: CartPage },
      { path: "profile", Component: ProfilePage },
    ],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [{ index: true, Component: AdminDashboard }],
  },
  { path: "*", Component: NotFoundPage },
]);
