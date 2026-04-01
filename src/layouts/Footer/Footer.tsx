import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DomoApi from "@/API/domoAPI";
import { CollectionName } from "@/shared";

const QUICK_LINKS = [
  { label: "Home", to: "/" },
  { label: "Explore Restaurants", to: "/foods" },
  { label: "My Cart", to: "/cart" },
  { label: "My Profile", to: "/profile" },
];

const COMPANY_LINKS = [
  "About Us",
  "Careers",
  "Partner With Us",
  "Terms & Conditions",
  "Privacy Policy",
];

const SOCIALS = [
  { icon: Facebook, label: "Facebook" },
  { icon: Instagram, label: "Instagram" },
  { icon: Twitter, label: "Twitter" },
  { icon: Youtube, label: "YouTube" },
];

export default function Footer() {
  const [formData, setFormData] = useState({
    id: "",
    email: "",
  });
  const [error, setError] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      setError("Email is required");
      return;
    }

    if (!emailRegex.test(formData.email)) {
      setError("Invalid email address");
      return;
    }

    setError("");

    const response: any = await DomoApi.ListDocuments(
      CollectionName.NEWSELTTER
    );

   const exists = response?.content?.some(
  (item: any) => item.content?.email === formData.email
);

    if (exists) {
      setError("Email is already Subscribed");
      return;
    }

    const newData = {
      ...formData,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };

    await DomoApi.CreateDocument(CollectionName.NEWSELTTER, newData);

    setFormData({ id: "", email: "" });

  } catch (error) {
    console.error(error, "Error at Post Newsletter Data");
  }
};

  return (
    <footer className="relative mt-20 overflow-hidden border-t border-primary/10">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-card/40 pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-150 h-75 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative container mx-auto px-4">
        {/* ── Newsletter ── */}
        <div className="relative mt-3 mb-14 mx-auto max-w-4xl">
          <div className="rounded-3xl bg-linear-to-br from-primary/15 via-accent/10 to-primary/5 border border-primary/20 p-6 sm:p-10 text-center shadow-xl shadow-primary/5 backdrop-blur-sm">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="text-xs font-medium text-primary">
                Exclusive Offers
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-2">
              Stay in the Loop
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-md mx-auto">
              Get exclusive deals, culinary tips, and new restaurant alerts
              delivered to your inbox.
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
            >
              <Input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleOnChange}
                placeholder="your@email.com"
                className="flex-1 bg-background/60 border-primary/20 focus:border-primary rounded-full text-sm h-10"
              />
              
              <Button
                type="submit"
                className="bg-linear-to-r from-primary to-accent hover:opacity-90 rounded-full h-10 px-6 text-sm shrink-0 gap-1.5"
              >
                Subscribe
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </form>
            {error && <p className="text-red-500 p-1">{error}</p>}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="h-px bg-linear-to-r from-transparent via-primary/30 to-transparent mb-12" />

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 mb-4 group"
            >
              <div className="w-9 h-9 rounded-xl bg-linear-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-lg">🍽️</span>
              </div>
              <div>
                <h2 className="text-xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent leading-none">
                  LuxeEats
                </h2>
                <p className="text-[10px] text-muted-foreground">
                  Premium Dining
                </p>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed max-w-xs">
              Premium food delivery bringing luxury dining experiences right to
              your doorstep, every single day.
            </p>
            {/* Socials */}
            <div className="flex gap-1.5">
              {SOCIALS.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg border border-primary/15 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/8 transition-all"
                >
                  <Icon className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground/80 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-primary transition-all duration-200 rounded" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground/80 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map((label) => (
                <li key={label}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-primary transition-all duration-200 rounded" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground/80 uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                  <span className="mt-0.5 w-7 h-7 rounded-lg bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                  </span>
                  <span className="leading-snug">
                    123 Culinary Street,
                    <br />
                    Food District
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+15551234567"
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                  <span className="w-7 h-7 rounded-lg bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                    <Phone className="w-3.5 h-3.5 text-primary" />
                  </span>
                  +1 (555) 123-4567
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@luxeeats.com"
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                  <span className="w-7 h-7 rounded-lg bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                    <Mail className="w-3.5 h-3.5 text-primary" />
                  </span>
                  support@luxeeats.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="h-px bg-linear-to-r from-transparent via-primary/30 to-transparent mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-8 text-xs text-muted-foreground">
          <p>© 2026 LuxeEats. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Cookies
            </a>
          </div>
          <p className="hidden sm:block">Crafted with ❤️ for food lovers.</p>
        </div>
      </div>
    </footer>
  );
}
