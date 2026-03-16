'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  User,
  CreditCard,
  LogOut,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect, useRef } from 'react';
import { useSubscriberAuth } from '@/auth/SubscriberAuthContext';

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { subscriber, isLoggedIn, loading, logout } = useSubscriberAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const close = () => {
      setMobileOpen(false);
      setDropdownOpen(false);
    };
    close();
  }, [pathname]);

  function handleLogout() {
    logout();
    setDropdownOpen(false);
    router.push('/');
  }

  const initials = subscriber?.full_name
    ? subscriber.full_name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : subscriber?.username?.slice(0, 2).toUpperCase() ?? '?';

  const isHome = pathname === '/';

  return (
    <header className={cn(
      'fixed inset-x-0 top-0 w-full z-50 transition-colors duration-300 border-b',
      scrolled || !isHome
        ? 'bg-background/95 supports-[backdrop-filter]:bg-background/80 backdrop-blur-md border-white/10 shadow-lg'
        : 'bg-background/0 border-transparent'
    )}>
      <div className="container mx-auto px-4 md:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20 text-primary"
          >
            <Shield size={20} className="group-hover:text-primary-dark transition-colors" />
          </motion.div>
          <span className="font-bold text-lg tracking-tight">LLM<span className="text-primary">Firewall</span></span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-foreground/80">
          <Link href="/#features" className="hover:text-primary transition-colors">Features</Link>
          <Link href="/#architecture" className="hover:text-primary transition-colors">Pipeline</Link>
          <Link href="/#dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
          <Link
            href="/pricing"
            className={cn('hover:text-primary transition-colors', pathname === '/pricing' && 'text-primary')}
          >
            Pricing
          </Link>
          <Link href="/docs" className="hover:text-primary transition-colors">Docs</Link>
        </nav>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-3">
          {loading ? (
            <div className="w-7 h-7 rounded-full border-2 border-primary/30 border-t-transparent animate-spin" />
          ) : isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((o) => !o)}
                className="flex items-center gap-2 h-9 px-3 rounded-lg bg-surface border border-white/10 hover:bg-surface-hover transition-colors"
              >
                {subscriber?.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={subscriber.avatar_url} alt={initials} className="w-6 h-6 rounded-full object-cover" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-primary/20 text-primary text-[10px] font-bold flex items-center justify-center">
                    {initials}
                  </div>
                )}
                <span className="text-sm text-foreground/80 max-w-[100px] truncate">
                  {subscriber?.full_name?.split(' ')[0] || subscriber?.username}
                </span>
                <ChevronDown size={13} className={cn('text-foreground/50 transition-transform', dropdownOpen && 'rotate-180')} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-48 rounded-xl bg-surface border border-white/10 shadow-2xl overflow-hidden"
                  >
                    <div className="px-3 py-2.5 border-b border-white/8">
                      <p className="text-xs text-foreground/40 truncate">{subscriber?.email}</p>
                      {subscriber?.active_plan_name && (
                        <p className="text-[11px] text-primary font-semibold mt-0.5">{subscriber.active_plan_name}</p>
                      )}
                    </div>
                    <Link href="/subscriber/profile" className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-foreground/80 hover:bg-surface-hover hover:text-foreground transition-colors">
                      <User size={14} className="text-primary" /> Profile
                    </Link>
                    <Link href="/subscriber/subscription" className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-foreground/80 hover:bg-surface-hover hover:text-foreground transition-colors">
                      <CreditCard size={14} className="text-secondary" /> Subscription
                    </Link>
                    <div className="h-px bg-white/8 my-0.5" />
                    <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-foreground/60 hover:bg-surface-hover hover:text-danger transition-colors">
                      <LogOut size={14} /> Log out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link
                href="/subscriber/login"
                className="h-9 px-4 inline-flex items-center justify-center rounded-md bg-surface text-sm font-medium text-foreground/80 border border-white/10 hover:bg-surface-hover hover:text-foreground transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/subscriber/register"
                className="h-9 px-4 inline-flex items-center justify-center rounded-md bg-primary text-background text-sm font-medium shadow transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-foreground/70 hover:text-foreground hover:bg-surface transition-colors"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-white/10 bg-background/95 backdrop-blur-md"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1 text-sm font-medium">
              <Link href="/#features" className="py-2.5 px-3 rounded-lg text-foreground/70 hover:text-primary hover:bg-surface transition-colors">Features</Link>
              <Link href="/#architecture" className="py-2.5 px-3 rounded-lg text-foreground/70 hover:text-primary hover:bg-surface transition-colors">Pipeline</Link>
              <Link href="/#dashboard" className="py-2.5 px-3 rounded-lg text-foreground/70 hover:text-primary hover:bg-surface transition-colors">Dashboard</Link>
              <Link href="/pricing" className="py-2.5 px-3 rounded-lg text-foreground/70 hover:text-primary hover:bg-surface transition-colors">Pricing</Link>
              <Link href="/docs" className="py-2.5 px-3 rounded-lg text-foreground/70 hover:text-primary hover:bg-surface transition-colors">Docs</Link>
              <div className="h-px bg-white/8 my-2" />
              {isLoggedIn ? (
                <>
                  <div className="px-3 py-2">
                    <p className="text-xs text-foreground/40">{subscriber?.email}</p>
                    {subscriber?.active_plan_name && (
                      <p className="text-xs text-primary font-semibold mt-0.5">{subscriber.active_plan_name}</p>
                    )}
                  </div>
                  <Link href="/subscriber/profile" className="flex items-center gap-2 py-2.5 px-3 rounded-lg text-foreground/70 hover:text-foreground hover:bg-surface transition-colors">
                    <User size={14} className="text-primary" /> Profile
                  </Link>
                  <Link href="/subscriber/subscription" className="flex items-center gap-2 py-2.5 px-3 rounded-lg text-foreground/70 hover:text-foreground hover:bg-surface transition-colors">
                    <CreditCard size={14} className="text-secondary" /> Subscription
                  </Link>
                  <button onClick={handleLogout} className="flex items-center gap-2 py-2.5 px-3 rounded-lg text-foreground/60 hover:text-danger hover:bg-surface transition-colors text-left">
                    <LogOut size={14} /> Log out
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 pt-1">
                  <Link href="/subscriber/login" className="h-11 flex items-center justify-center rounded-lg bg-surface border border-white/10 text-sm font-medium text-foreground/80 hover:bg-surface-hover transition-colors">Log in</Link>
                  <Link href="/subscriber/register" className="h-11 flex items-center justify-center rounded-lg bg-primary text-background text-sm font-semibold hover:bg-primary-dark transition-colors">Get Started</Link>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
