import {
  HomePage,
  LoginPage,
  SignUpPage,
  FoodListingPage,
  VendorPage,
  FoodDetailPage,
  CartPage,
  ProfilePage,
  AdminDashboard,
  NotFoundPage,
} from "@/pages";
import { createBrowserRouter } from "react-router";
import { RootLayout } from "@/layouts/RootLayout/RootLayout";
import { AdminLayout } from "@/layouts/AdminLayout/AdminLayout";

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
