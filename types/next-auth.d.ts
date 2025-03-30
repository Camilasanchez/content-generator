import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
      hasPaid?: boolean;
    };
  }

  interface User {
    id: string;
    role?: string;
    hasPaid?: boolean;
  }

  interface JWT {
    sub: string;
    role?: string;
    hasPaid?: boolean;
  }
}
