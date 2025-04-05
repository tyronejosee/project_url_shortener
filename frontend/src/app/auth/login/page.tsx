import type { Metadata } from "next";
import { COMPANY_NAME } from "@/config/constants";
import LoginContainer from "./container";

export const metadata: Metadata = {
  title: `Login - ${COMPANY_NAME}`,
  description:
    "Login to your account and start using the URL Shortener service.",
};

export default function LoginPage() {
  return (
    <main className="flex-1 max-w-screen-lg mx-auto p-6 w-full">
      <section className="max-w-lg mx-auto p-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
          Welcome Back!
        </h1>
        <p className="text-center text-gray-500 mb-12">
          Sign in to access all the features of the service.
        </p>
        <LoginContainer />
      </section>
    </main>
  );
}
