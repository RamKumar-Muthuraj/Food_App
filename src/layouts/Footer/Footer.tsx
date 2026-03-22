import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-card/30 border-t border-primary/10 mt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Newsletter Section */}
        <div className="mb-12 p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-3xl mb-2">Subscribe to Our Newsletter</h3>
            <p className="text-muted-foreground mb-6">
              Get exclusive deals, culinary tips, and new restaurant alerts
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-background/50 border-primary/30 rounded-full"
              />
              <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 px-8 rounded-full">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Golden Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent mb-12"></div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-2xl">🍽️</span>
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  LuxeEats
                </h2>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Premium food delivery service bringing luxury dining experiences to your doorstep.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
                <Youtube className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/foods" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Explore Restaurants
              </Link>
              <Link to="/cart" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                My Cart
              </Link>
              <Link to="/profile" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                My Profile
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg mb-4">Company</h4>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                About Us
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Careers
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Partner With Us
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms & Conditions
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span>123 Culinary Street, Food District</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span>support@luxeeats.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Golden Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent mb-6"></div>

        {/* Copyright */}
        <div className="text-center text-sm text-muted-foreground">
          <p>© 2026 LuxeEats. All rights reserved. Crafted with passion for food lovers.</p>
        </div>
      </div>
    </footer>
  );
}
