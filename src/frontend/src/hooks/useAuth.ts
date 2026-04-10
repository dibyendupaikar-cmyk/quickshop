import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";

const ADMIN_PRINCIPALS: string[] = [];

export function useAuth() {
  const { login, clear, isLoginSuccess, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity && isLoginSuccess;
  const principal = identity?.getPrincipal();
  const principalText = principal?.toString() ?? "";

  const isAdmin =
    ADMIN_PRINCIPALS.length === 0
      ? isAuthenticated
      : ADMIN_PRINCIPALS.includes(principalText);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      if (msg === "User is already authenticated") {
        await clear();
        setTimeout(() => login(), 300);
      } else {
        console.error("Login error:", error);
      }
    }
  };

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  return {
    isAuthenticated,
    isLoginSuccess,
    login: handleLogin,
    logout: handleLogout,
    principal,
    principalText,
    isAdmin,
    identity,
  };
}
