import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  User,
  Search,
  Menu,
  X,
  ChefHat,
  Store,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { useCurrentUser } from "@/API/currentUserContext";
import { selectCartCount } from "@/store/FoodCart/actions";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { FoodService } from "@/service/food.service";
import { VendorService } from "@/service/vendor.service";
import { useDebounce } from "@/utils/useDebounce";
import HeaderNav from "./components/HeaderNav";
import { HeaderLogo } from "./components/HeaderLogo";
import HeaderSearch from "./components/HeaderSearch";

export interface SearchResult {
  type: "food" | "vendor";
  id: string;
  name: string;
  description?: string;
  image?: string;
  meta?: string;
}

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItemsCount = useSelector(selectCartCount);
  const { logout, role, currentUser } = useCurrentUser();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showMega, setShowMega] = useState(false);
  const [focused, setFocused] = useState(false);
  const debouncedQuery = useDebounce(query, 280);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setShowMega(false);
      return;
    }

    const q = debouncedQuery.toLowerCase();
    let cancelled = false;

    const search = async () => {
      setLoading(true);
      try {
        const [foodRes, vendorRes] = await Promise.all([
          FoodService.getAll(),
          VendorService.getAll(),
        ]);

        if (cancelled) return;

        // Normalise foods
        const foods: SearchResult[] = (foodRes as any[])
          .map((f: any) => {
            const c = f?.content ?? f;
            return {
              type: "food" as const,
              id: f.id ?? c.id,
              name: c.name ?? "",
              description: c.description ?? "",
              image: c.image ?? "",
              meta: c.price ? `₹${c.price}` : "",
            };
          })
          .filter((f) => f.name.toLowerCase().includes(q));

        // Normalise vendors
        const vendors: SearchResult[] = (vendorRes as any[])
          .map((v: any) => {
            const c = v?.content ?? v;
            return {
              type: "vendor" as const,
              id: v.id ?? c.id,
              name: c.name ?? "",
              description: c.description ?? "",
              image: c.image ?? "",
              meta: c.type ?? "",
            };
          })
          .filter((v) => v.name.toLowerCase().includes(q));

        setResults([...vendors.slice(0, 4), ...foods.slice(0, 6)]);
        setShowMega(true);
      } catch (e) {
        console.error("Search error:", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    search();
    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  // ── Close click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowMega(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mega on route change
  useEffect(() => {
    setShowMega(false);
    setQuery("");
  }, [location.pathname]);

  const handleResultClick = (result: SearchResult) => {
    setShowMega(false);
    setQuery("");
    if (result.type === "food") {
      navigate(`/food/${result.id}`);
    } else {
      navigate(`/vendor/${result.id}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setShowMega(false);
      inputRef.current?.blur();
    }
  };

  const foodResults = results.filter((r) => r.type === "food");
  const vendorResults = results.filter((r) => r.type === "vendor");

  const SearchInput = ({ mobile = false }: { mobile?: boolean }) => (
    <div
      ref={mobile ? undefined : searchRef}
      className={`relative ${mobile ? "w-full" : "flex-1 max-w-xl"}`}
    >
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
      <Input
        ref={mobile ? undefined : inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => {
          setFocused(true);
          if (results.length > 0) setShowMega(true);
        }}
        onKeyDown={handleKeyDown}
        placeholder="Search restaurants, dishes..."
        className="w-full pl-9 pr-8 bg-card/50 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-full text-sm h-9"
      />
      {query && (
        <button
          title="close"
          onClick={() => {
            setQuery("");
            setResults([]);
            setShowMega(false);
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <HeaderLogo />
          {/* Desktop Search with Mega Menu */}
          <HeaderSearch
            query={query}
            setQuery={setQuery}
            results={results}
            setResults={setResults}
            loading={loading}
            showMega={showMega}
            setShowMega={setShowMega}
            searchRef={searchRef}
            inputRef={inputRef}
            handleKeyDown={handleKeyDown}
            handleResultClick={handleResultClick}
            foodResults={foodResults}
            vendorResults={vendorResults}
            debouncedQuery={debouncedQuery}
          />

          {/* Navigation */}
          <HeaderNav role={role} />

          {/* Actions */}
          <div className="flex items-center gap-1.5 shrink-0">
            <Link to="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-primary/10 w-9 h-9"
              >
                <ShoppingCart className="w-4 h-4" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center p-0 bg-primary text-primary-foreground text-[10px]">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </Link>
            <Link to="/profile">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10 w-9 h-9"
              >
                <User className="w-4 h-4" />
              </Button>
            </Link>
            {!currentUser ? (
              <Link to="/login" className="hidden sm:block">
                <Button
                  size="sm"
                  className="bg-linear-to-r from-primary to-accent text-xs h-8 px-3"
                >
                  Sign In
                </Button>
              </Link>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="text-xs h-8 px-3"
              >
                Logout
              </Button>
            )}
            {/* <Button variant="ghost" size="icon" className="lg:hidden w-9 h-9">
              <Menu className="w-4 h-4" />
            </Button> */}
          </div>
        </div>

        {/* Mobile Search */}
        <div ref={searchRef} className="md:hidden mt-3 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => {
                if (results.length > 0) setShowMega(true);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search restaurants, dishes..."
              className="w-full pl-9 pr-8 bg-card/50 border-primary/20 focus:border-primary rounded-full text-sm h-9"
            />
            {query && (
              <button
                title="close"
                onClick={() => {
                  setQuery("");
                  setResults([]);
                  setShowMega(false);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Mobile Mega Menu */}
          <AnimatePresence>
            {showMega && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden z-50 max-h-[60vh] overflow-y-auto"
              >
                {loading && (
                  <div className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 animate-spin" />
                    Searching...
                  </div>
                )}

                {!loading && results.length === 0 && debouncedQuery && (
                  <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                    No results for{" "}
                    <span className="text-foreground font-medium">
                      "{debouncedQuery}"
                    </span>
                  </div>
                )}

                {!loading && vendorResults.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 px-4 pt-3 pb-1.5">
                      <Store className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Restaurants
                      </span>
                    </div>
                    {vendorResults.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => handleResultClick(r)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-primary/5 transition-colors text-left group"
                      >
                        <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0 border border-border">
                          {r.image ? (
                            <img
                              src={r.image}
                              alt={r.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                              <Store className="w-3.5 h-3.5 text-primary" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm group-hover:text-primary transition-colors truncate">
                            {r.name}
                          </p>
                          {r.meta && (
                            <p className="text-xs text-muted-foreground">
                              {r.meta}
                            </p>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {!loading && foodResults.length > 0 && (
                  <div
                    className={
                      vendorResults.length > 0
                        ? "border-t border-border/50"
                        : ""
                    }
                  >
                    <div className="flex items-center gap-2 px-4 pt-3 pb-1.5">
                      <ChefHat className="w-3.5 h-3.5 text-accent" />
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Dishes
                      </span>
                    </div>
                    {foodResults.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => handleResultClick(r)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-primary/5 transition-colors text-left group"
                      >
                        <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0 border border-border">
                          {r.image ? (
                            <img
                              src={r.image}
                              alt={r.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-accent/10 flex items-center justify-center">
                              <ChefHat className="w-3.5 h-3.5 text-accent" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm group-hover:text-primary transition-colors truncate">
                            {r.name}
                          </p>
                          {r.description && (
                            <p className="text-xs text-muted-foreground truncate">
                              {r.description}
                            </p>
                          )}
                        </div>
                        {r.meta && (
                          <span className="text-sm font-bold text-primary shrink-0">
                            {r.meta}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}
