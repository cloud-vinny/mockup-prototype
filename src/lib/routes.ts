export type NavItem = {
  label: string;
  href: string;
};

/** Primary mockup navigation — static routes only. */
export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Analyze", href: "/analyze" },
  { label: "Results", href: "/results" },
  { label: "About us", href: "/about" },
];
