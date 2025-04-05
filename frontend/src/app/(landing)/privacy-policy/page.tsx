import { Metadata } from "next";
import { COMPANY_NAME } from "@/config/constants";

export const metadata: Metadata = {
  title: `Privacy Policy - ${COMPANY_NAME}`,
  description: "Learn about our privacy policy and how we protect your data.",
};

export default function PrivacyPolicy() {
  return (
    <main className="flex-1 max-w-screen-lg mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Privacy Policy
      </h1>

      <p className="text-lg text-gray-700 mb-8">
        This privacy policy outlines how the URL Shortener service collects,
        processes, and protects your personal data.
      </p>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          1. General Provisions
        </h2>
        <p className="text-gray-700">
          This policy has been developed in accordance with the Federal Law No.
          152-FZ &quot;On Personal Data&quot; dated July 27, 2006. It defines
          how we process personal data and ensures the protection of your data
          while using the URL Shortener service.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800">
          2. Key Concepts
        </h2>
        <ul className="list-inside list-disc text-gray-700">
          <li>
            <strong>Automated processing of personal data:</strong> Processing
            using computer technology.
          </li>
          <li>
            <strong>Personal data:</strong> Any information related to an
            identifiable user of the URL Shortener service.
          </li>
          <li>
            <strong>Operator:</strong> The entity responsible for organizing the
            processing of personal data.
          </li>
          <li>
            <strong>Processing of personal data:</strong> Any operation
            performed on personal data, including collection, storage, and
            transfer.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800">
          3. Collected Personal Data
        </h2>
        <p className="text-gray-700">
          We may collect the following personal data: full name, email address,
          and anonymized data such as cookies. We use analytics services such as
          Yandex Metrica and Google Analytics to improve the service.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800">
          4. Purpose of Data Processing
        </h2>
        <p className="text-gray-700">
          The purpose of processing your personal data is to communicate with
          you, inform you of new services, and provide access to our platform.
          You can opt-out of receiving notifications at any time.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800">
          5. Legal Grounds for Processing Data
        </h2>
        <p className="text-gray-700">
          We process your data only when you provide it through forms on our
          website, with your consent. Anonymized data may also be processed for
          analytics purposes.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800">
          6. Security Measures
        </h2>
        <p className="text-gray-700">
          We implement legal, organizational, and technical measures to ensure
          the safety of your personal data. We will never share your personal
          data with third parties unless required by law.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800">
          7. International Data Transfer
        </h2>
        <p className="text-gray-700">
          We will only transfer your data to foreign countries where your rights
          are protected by applicable law.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800">8. Contact Us</h2>
        <p className="text-gray-700">
          If you have any questions about this privacy policy or the processing
          of your personal data, feel free to contact us at{" "}
          <a
            href="mailto:goo.su@mail.ru"
            className="text-blue-600 hover:underline"
          >
            goo.su@mail.ru
          </a>
          .
        </p>
      </section>

      <div className="mt-12 text-center">
        <p className="text-gray-500 text-sm">
          This Privacy Policy is effective indefinitely and will be updated as
          needed. The latest version is always available at{" "}
          <a
            href="https://goo.su/policy"
            className="text-blue-600 hover:underline"
          >
            https://goo.su/policy
          </a>
          .
        </p>
      </div>
    </main>
  );
}
