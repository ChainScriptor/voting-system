// utils/role.ts
import { User } from "@clerk/nextjs/server";

export const isAdmin = (user: User | null | undefined): boolean => {
  return user?.publicMetadata?.role === "admin";
};

export const isUser = (user: User | null | undefined): boolean => {
  return user?.publicMetadata?.role === "user";
};
