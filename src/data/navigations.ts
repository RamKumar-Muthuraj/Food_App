type NavItem = {
  label: string;
  path: string;
  roles?: ("ADMIN" | "USER" | "GUEST")[];
};

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    path: "/",
    roles: ["ADMIN", "USER", "GUEST"],
  },
  {
    label: "Explore",
    path: "/foods",
    roles: ["ADMIN", "USER"],
  },
  {
    label: "Admin",
    path: "/admin",
    roles: ["ADMIN"],
  },
];
