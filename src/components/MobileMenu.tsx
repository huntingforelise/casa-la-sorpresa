"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { NavItem } from "@/data/site";
import { localizedPath, type Locale } from "@/lib/i18n";

type MobileMenuProps = {
  locale: Locale;
  items: NavItem[];
};

export const MobileMenu = ({ locale, items }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className="relative lg:hidden">
      <button
        type="button"
        className="grid h-10 w-10 place-items-center rounded-full border border-border bg-cream text-foreground transition hover:border-pool hover:text-pool-deep"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-primary-menu"
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Menu className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
      {isOpen ? (
        <nav
          id="mobile-primary-menu"
          className="absolute right-0 top-12 z-50 grid min-w-52 gap-1 rounded-[1.35rem] border border-border bg-cream p-2 shadow-[0_18px_54px_rgba(85,107,47,0.18)]"
          aria-label="Mobile primary"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={localizedPath(locale, item.href)}
              className="rounded-full px-4 py-3 text-sm font-black text-foreground transition hover:bg-sun/40"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  );
};
