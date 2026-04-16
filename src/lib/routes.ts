export type NavItem = {
  label: string;
  href: string;
};

/** Primary mockup navigation — static routes only. */
export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/home" },
  { label: "Analyse", href: "/analyze" },
  { label: "About", href: "/about" },
];
