// Crea en: /style/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    hasPaid: boolean;
    email: string;
  }

  interface Session {
    user: {
      id: string;
      hasPaid: boolean;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}