import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { Link, useLocation } from "@tanstack/react-router";
import {
  ChevronDown,
  Cpu,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Shirt,
  ShoppingCart,
  User,
  UtensilsCrossed,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";

const categoryLinks = [
  { href: "/products?category=clothing", label: "Clothing", icon: Shirt },
  { href: "/products?category=electronics", label: "Electronics", icon: Cpu },
  { href: "/products?category=food", label: "Food", icon: UtensilsCrossed },
];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = useCartStore((s) => s.itemCount());
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const { isAuthenticated, isAdmin, login, logout, isLoginSuccess } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header
        className="sticky top-0 z-50 bg-card border-b border-border shadow-xs"
        data-ocid="site-header"
      >
        <div className="container flex items-center h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center group-hover:scale-110 transition-smooth">
              <Zap
                className="w-4 h-4 text-primary-foreground"
                fill="currentColor"
              />
            </div>
            <span className="font-display font-bold text-lg text-foreground tracking-tight">
              QuickShop
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1 ml-4"
            aria-label="Main navigation"
          >
            <Link
              to="/"
              className={cn(
                "px-3 py-1.5 rounded-md text-sm font-medium transition-smooth",
                isActive("/")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
              data-ocid="nav-home"
            >
              Home
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  data-ocid="nav-categories"
                >
                  Categories
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {categoryLinks.map(({ href, label, icon: Icon }) => (
                  <DropdownMenuItem key={href} asChild>
                    <Link to={href} className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-muted-foreground" />
                      {label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
              aria-label="Wishlist"
              data-ocid="nav-wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 text-[10px] leading-none flex items-center justify-center bg-destructive text-destructive-foreground">
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </Badge>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
              aria-label="Cart"
              data-ocid="nav-cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 text-[10px] leading-none flex items-center justify-center bg-primary text-primary-foreground">
                  {cartCount > 99 ? "99+" : cartCount}
                </Badge>
              )}
            </Link>

            {/* Auth */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1.5 px-2"
                    data-ocid="nav-user-menu"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center">
                      <User className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <ChevronDown className="w-3 h-3 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link
                      to="/orders"
                      className="flex items-center gap-2"
                      data-ocid="nav-orders"
                    >
                      <Package className="w-4 h-4" />
                      My Orders
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link
                          to="/admin"
                          className="flex items-center gap-2"
                          data-ocid="nav-admin"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="text-destructive focus:text-destructive"
                    data-ocid="nav-logout"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                size="sm"
                onClick={login}
                disabled={!isLoginSuccess && isAuthenticated}
                className="hidden sm:inline-flex"
                data-ocid="nav-login-btn"
              >
                Sign In
              </Button>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              type="button"
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav
            className="md:hidden border-t border-border bg-card px-4 py-3 flex flex-col gap-1 animate-slide-up"
            aria-label="Mobile navigation"
          >
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-smooth"
            >
              Home
            </Link>
            {categoryLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                to={href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-smooth"
              >
                <Icon className="w-4 h-4 text-muted-foreground" />
                {label}
              </Link>
            ))}
            {isAuthenticated && (
              <Link
                to="/orders"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-smooth"
              >
                <Package className="w-4 h-4 text-muted-foreground" />
                My Orders
              </Link>
            )}
            {!isAuthenticated && (
              <Button
                onClick={() => {
                  login();
                  setMenuOpen(false);
                }}
                className="mt-2"
                data-ocid="mobile-login-btn"
              >
                Sign In
              </Button>
            )}
          </nav>
        )}
      </header>

      {/* Main */}
      <main className="flex-1 bg-background">{children}</main>

      {/* Footer */}
      <footer
        className="bg-card border-t border-border mt-auto"
        data-ocid="site-footer"
      >
        <div className="container py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
                <Zap
                  className="w-3.5 h-3.5 text-primary-foreground"
                  fill="currentColor"
                />
              </div>
              <span className="font-display font-semibold text-foreground">
                QuickShop
              </span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()}. Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
