import Footer from "@/layouts/Footer/Footer";
import { Header } from "@/layouts/Header/Header";
import ScrollToTop from "@/utils/ScrollToTop";
import { Outlet } from "react-router-dom";


export function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop/>
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
