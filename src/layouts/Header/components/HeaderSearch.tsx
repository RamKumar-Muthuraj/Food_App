import { Badge, Input } from "@/shared";
import { AnimatePresence, motion } from "framer-motion";
import { ChefHat, Clock, Search, Store, X } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
import { SearchResult } from "../Header";

type HeaderSearchProps = {
  query: string;
  setQuery: (v: string) => void;
  results: any[];
  setResults: Dispatch<SetStateAction<SearchResult[]>>;
  loading: boolean;
  showMega: boolean;
  setShowMega: (v: boolean) => void;
  searchRef: any;
  inputRef: any;
  handleKeyDown: (e: any) => void;
  handleResultClick: (r: any) => void;
  foodResults: any[];
  vendorResults: any[];
  debouncedQuery: string;
};

export default function HeaderSearch({
  query,
  setQuery,
  results,
  setResults,
  loading,
  showMega,
  setShowMega,
  searchRef,
  inputRef,
  handleKeyDown,
  handleResultClick,
  foodResults,
  vendorResults,
  debouncedQuery,
}: HeaderSearchProps) {
  return (
    <div ref={searchRef} className="hidden md:flex flex-1 max-w-xl relative">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
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

      {/* Mega Menu Dropdown */}
      <AnimatePresence>
        {showMega && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl shadow-black/20 overflow-hidden z-50"
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
                    <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-border">
                      {r.image ? (
                        <img
                          src={r.image}
                          alt={r.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                          <Store className="w-4 h-4 text-primary" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm group-hover:text-primary transition-colors truncate">
                        {r.name}
                      </p>
                      {r.meta && (
                        <p className="text-xs text-muted-foreground truncate">
                          {r.meta}
                        </p>
                      )}
                    </div>
                    <Badge
                      variant="outline"
                      className="text-[10px] shrink-0 border-primary/20 text-primary"
                    >
                      Restaurant
                    </Badge>
                  </button>
                ))}
              </div>
            )}

            {!loading && foodResults.length > 0 && (
              <div
                className={
                  vendorResults.length > 0 ? "border-t border-border/50" : ""
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
                    <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-border">
                      {r.image ? (
                        <img
                          src={r.image}
                          alt={r.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-accent/10 flex items-center justify-center">
                          <ChefHat className="w-4 h-4 text-accent" />
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

            {/* Footer hint */}
            {results.length > 0 && (
              <div className="px-4 py-2 border-t border-border/50 bg-muted/20">
                <p className="text-xs text-muted-foreground">
                  Press{" "}
                  <kbd className="px-1 py-0.5 rounded bg-muted text-xs">
                    Esc
                  </kbd>{" "}
                  to close
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
