import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Lock } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoginSuccess, login, isAdmin } = useAuth();

  // Not yet resolved
  if (!isLoginSuccess && !isAuthenticated) {
    return (
      <div
        className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4"
        data-ocid="auth-gate"
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Lock className="w-8 h-8 text-primary" />
        </div>
        <div className="text-center max-w-sm">
          <h2 className="font-display font-bold text-xl text-foreground mb-2">
            Sign in to continue
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            Please sign in with Internet Identity to access this page.
          </p>
          <Button
            onClick={login}
            size="lg"
            className="w-full"
            data-ocid="protected-login-btn"
          >
            Sign in with Internet Identity
          </Button>
        </div>
      </div>
    );
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div
        className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4"
        data-ocid="access-denied"
      >
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
          <Lock className="w-8 h-8 text-destructive" />
        </div>
        <div className="text-center max-w-sm">
          <h2 className="font-display font-bold text-xl text-foreground mb-2">
            Access Denied
          </h2>
          <p className="text-muted-foreground text-sm">
            You don't have permission to view this page. Admin access is
            required.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
