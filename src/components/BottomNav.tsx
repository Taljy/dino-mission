import { Home, Footprints, Star } from "lucide-react";
import { NavLink } from "react-router-dom";

const TABS = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/park", label: "Park", icon: Footprints, end: false },
  { to: "/stars", label: "Sterne", icon: Star, end: false },
] as const;

export function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 border-t border-sand-dark/40 bg-sand-light/95 backdrop-blur"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-around">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <li key={tab.to} className="flex-1">
              <NavLink
                to={tab.to}
                end={tab.end}
                className={({ isActive }) =>
                  [
                    "mx-1 my-2 flex flex-col items-center justify-center gap-0.5 rounded-2xl py-2 transition-colors",
                    isActive
                      ? "bg-dino-orange text-dino-text shadow-inner"
                      : "text-dino-text-light hover:text-dino-text",
                  ].join(" ")
                }
              >
                <Icon size={26} strokeWidth={2.4} />
                <span className="font-display text-sm leading-none">
                  {tab.label}
                </span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
