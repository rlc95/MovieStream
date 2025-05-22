import { createAuthClient } from "better-auth/react";
console.log("Auth URL from ENV: client-auth", process.env.BETTER_AUTH_URL);
export const { signIn, signUp, signOut, useSession } = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
});
