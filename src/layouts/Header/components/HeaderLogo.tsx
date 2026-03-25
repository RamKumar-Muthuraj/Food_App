import React from "react";
import { Link } from "react-router";

export function HeaderLogo() {
  return (
    <Link to="/" className="flex items-center gap-2 group shrink-0">
      <div className="w-9 h-9 rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center">
        <span className="text-xl">🍽️</span>
      </div>
      <div className="hidden sm:block">
        <h1 className="text-xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
          LuxeEats
        </h1>
        <p className="text-[10px] text-muted-foreground">Premium Dining</p>
      </div>
    </Link>
  );
}
