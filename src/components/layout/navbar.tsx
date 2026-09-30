"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { ButtonLink } from "@/components/ui/button";
import { primaryNav } from "@/config/navigation";
import { primaryCta } from "@/config/site";
import { cn } from "@/lib/utils";

export interface MegaItem {
  label: string;
  href: string;
  description: string;
}

interface NavbarProps {
  serviceItems: MegaItem[];
  industryItems: MegaItem[];
}

export function Navbar({ serviceItems, industryItems }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduce = useReducedMotion();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const megaFor = (label: string) =>
    label === "Services" ? serviceItems : label === "Industries" ? industryItems : null;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const openWithDelay = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || mobileOpen
          ? "border-b border-ink-800 bg-ink-950/90 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-accent-500 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>

      <div className="container-page">
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-300",
            scrolled ? "h-16" : "h-20",
          )}
        >
          <Logo />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => {
                const mega = megaFor(item.label);
                return (
                  <li
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => (mega ? openWithDelay(item.label) : setOpenMenu(null))}
                    onMouseLeave={mega ? scheduleClose : undefined}
                  >
                    <Link
                      href={item.href}
                      aria-haspopup={mega ? "true" : undefined}
                      aria-expanded={mega ? openMenu === item.label : undefined}
                      onFocus={() => (mega ? openWithDelay(item.label) : setOpenMenu(null))}
                      className={cn(
                        "flex items-center gap-1 px-3 py-2 text-[0.85rem] font-medium transition-colors",
                        isActive(item.href)
                          ? "text-white"
                          : "text-ink-300 hover:text-white",
                      )}
                    >
                      {item.label}
                      {mega ? (
                        <ChevronDown
                          className={cn(
                            "size-3.5 transition-transform duration-200",
                            openMenu === item.label && "rotate-180",
                          )}
                          aria-hidden="true"
                        />
                      ) : null}
                    </Link>

                    <AnimatePresence>
                      {mega && openMenu === item.label ? (
                        <motion.div
                          initial={reduce ? false : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={reduce ? undefined : { opacity: 0, y: 4 }}
                          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute left-1/2 top-full z-50 w-[42rem] -translate-x-1/2 pt-3"
                        >
                          <div className="surface grid grid-cols-2 gap-1 p-3 shadow-2xl shadow-black/50">
                            {mega.map((entry) => (
                              <Link
                                key={entry.href}
                                href={entry.href}
                                className="group/item flex flex-col gap-1 rounded-[3px] p-3 transition-colors hover:bg-ink-800/70"
                              >
                                <span className="flex items-center gap-1.5 text-[0.85rem] font-medium text-ink-100 group-hover/item:text-white">
                                  {entry.label}
                                  <ArrowUpRight
                                    className="size-3 opacity-0 transition-opacity group-hover/item:opacity-100"
                                    aria-hidden="true"
                                  />
                                </span>
                                <span className="text-[0.76rem] leading-relaxed text-ink-400">
                                  {entry.description}
                                </span>
                              </Link>
                            ))}
                            <Link
                              href={item.href}
                              className="col-span-2 mt-1 border-t border-ink-800 px-3 pb-1 pt-3 text-[0.78rem] font-medium text-accent-300 hover:text-accent-200"
                            >
                              View all {item.label.toLowerCase()} →
                            </Link>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ButtonLink href={primaryCta.href} size="sm" withArrow>
              {primaryCta.label}
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center border border-ink-700 text-ink-100 lg:hidden"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-navigation"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto border-t border-ink-800 bg-ink-950 lg:hidden"
          >
            <nav aria-label="Mobile" className="container-page flex flex-col gap-1 py-6">
              {primaryNav.map((item) => {
                const mega = megaFor(item.label);
                return (
                  <div key={item.href} className="border-b border-ink-800/80 py-1">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        className="flex-1 py-3 text-[1.05rem] font-medium text-ink-100"
                      >
                        {item.label}
                      </Link>
                      {mega ? (
                        <button
                          type="button"
                          aria-label={`Toggle ${item.label} submenu`}
                          aria-expanded={openMenu === item.label}
                          onClick={() =>
                            setOpenMenu(openMenu === item.label ? null : item.label)
                          }
                          className="grid size-9 place-items-center text-ink-400"
                        >
                          <ChevronDown
                            className={cn(
                              "size-4 transition-transform",
                              openMenu === item.label && "rotate-180",
                            )}
                          />
                        </button>
                      ) : null}
                    </div>
                    <AnimatePresence initial={false}>
                      {mega && openMenu === item.label ? (
                        <motion.ul
                          initial={reduce ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={reduce ? undefined : { height: 0, opacity: 0 }}
                          className="overflow-hidden pb-2"
                        >
                          {mega.map((entry) => (
                            <li key={entry.href}>
                              <Link
                                href={entry.href}
                                className="block py-2.5 pl-3 text-[0.9rem] text-ink-400 hover:text-accent-300"
                              >
                                {entry.label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              })}

              <ButtonLink href={primaryCta.href} size="lg" className="mt-6 w-full" withArrow>
                {primaryCta.label}
              </ButtonLink>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
