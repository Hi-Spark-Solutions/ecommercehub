import type { Metadata } from "next";
import { AuthForm } from "@/components/marketing/auth-form";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your Ecommerce Hub workspace.",
};

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
