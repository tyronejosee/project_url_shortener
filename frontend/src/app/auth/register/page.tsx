import type { Metadata } from "next";
import { COMPANY_NAME } from "@/config/constants";
import RegisterContainer from "./container";

export const metadata: Metadata = {
  title: `Register - ${COMPANY_NAME}`,
  description:
    "Register to your account and start using the URL Shortener service.",
};

export default function RegisterPage() {
  return (
    <main className="flex-1 max-w-screen-lg mx-auto p-6 w-full">
      <section className="max-w-lg mx-auto p-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
          Create an Account
        </h1>
        <p className="text-center text-gray-500 mb-12">
          Sign up to access all the features of the service.
        </p>
        <RegisterContainer />
      </section>
    </main>
  );
}
