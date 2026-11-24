import { User } from "@/redux/slices/authSlice";

interface GetDashboardRouteParams {
  user: User | null;
}

export function getDashboardRoute({
  user,
}: GetDashboardRouteParams): string {
  const userType = user?.type;

  // Handling for admins
  if (userType === "ADMIN") {
    return "/"; // Or "/admin" depending on routing setup
  }

  // General users
  return "/";
}
