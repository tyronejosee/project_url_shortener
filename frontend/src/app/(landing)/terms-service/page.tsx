import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY_NAME } from "@/config/constants";

export const metadata: Metadata = {
  title: `Terms Service - ${COMPANY_NAME}`,
  description: "Learn about our privacy policy and how we protect your data.",
};

export default function TermsServicePage() {
  return (
    <main className="flex-1 max-w-screen-lg mx-auto p-6">
      <div className="space-y-6">
        <h1 className="text-4xl font-extrabold text-center">Terms Service</h1>
        <p className="text-gray-500 text-center">
          <span>Last updated: [20-02-2025]</span>
        </p>
        <p className="text-xl">
          Welcome to <strong>URL Shortener</strong>, an online link shortening
          service. By accessing and using our services, you agree to the
          following Terms and Conditions. If you do not agree with these terms,
          we ask that you do not use our service.
        </p>

        <hr />

        <section>
          <h2 className="text-2xl font-semibold">1. Services Provided</h2>
          <p>
            <strong>URL Shortener</strong> offers a free tool to create
            shortened links. The service allows you to convert long URLs into
            shorter ones that redirect to the same destination page.
          </p>
        </section>

        <hr />

        <section>
          <h2 className="text-2xl font-bold mt-6">2. Permitted Use</h2>
          <p>
            The service may only be used for lawful purposes and must not be
            used to:
          </p>
          <ul className="list-inside list-disc space-y-2">
            <li>
              Post or share content that infringes on copyrights, trademarks,
              patents, trade secrets, or other intellectual property rights.
            </li>
            <li>
              Distribute content that is defamatory, obscene, offensive, or
              otherwise illegal or violates third-party rights.
            </li>
            <li>
              Use the service to distribute malware, viruses, or any other
              malicious software.
            </li>
          </ul>
        </section>

        <hr />

        <section>
          <h2 className="text-2xl font-semibold mt-6">
            3. User Responsibility
          </h2>
          <p>
            The user is solely responsible for the links they shorten and share.{" "}
            <strong>URL Shortener</strong> is not responsible for the content to
            which shortened links redirect. Users must ensure that the use of
            the links complies with applicable laws and regulations.
          </p>
        </section>

        <hr />

        <section>
          <h2 className="text-2xl font-semibold mt-6">4. Data Protection</h2>
          <p>
            We collect and process your personal data in accordance with our{" "}
            <Link
              href="/privacy-policy"
              className="text-primary hover:underline"
            >
              Privacy Policy
            </Link>
            . By using our services, you consent to the collection, use, and
            storage of your data in accordance with that policy.
          </p>
        </section>

        <hr />

        <section>
          <h2 className="text-2xl font-semibold mt-6">
            5. Service Modifications and Suspension
          </h2>
          <p>
            We reserve the right to modify, suspend, or discontinue the service
            at any time without prior notice. We will not be liable for any loss
            or damage resulting from the interruption or modification of the
            service.
          </p>
        </section>

        <hr />

        <section>
          <h2 className="text-2xl font-semibold mt-6">6. Restrictions</h2>
          <ul className="list-inside list-disc space-y-2">
            <li>
              <strong>URL Shortener</strong> does not guarantee that shortened
              links will always be available or function properly.
            </li>
            <li>
              We reserve the right to remove links or accounts that violate
              these Terms and Conditions.
            </li>
          </ul>
        </section>

        <hr />

        <section>
          <h2 className="text-2xl font-semibold mt-6">
            7. Intellectual Property
          </h2>
          <p>
            All intellectual property rights related to the service, including
            software rights, trademarks, logos, and related content, are owned
            by <strong>URL Shortener</strong> or its licensors. The use of this
            content without proper authorization is prohibited.
          </p>
        </section>

        <hr />

        <section>
          <h2 className="text-2xl font-semibold mt-6">
            8. Disclaimer of Liability
          </h2>
          <p>
            The service is provided "as is", without warranties of any kind. We
            are not responsible for any damages arising from the use or
            inability to use the service, including direct, indirect,
            incidental, special, consequential, or punitive damages.
          </p>
        </section>

        <hr />

        <section>
          <h2 className="text-2xl font-semibold mt-6">9. Indemnification</h2>
          <p>
            The user agrees to indemnify and hold harmless [Service Name], its
            affiliates, employees, and directors from any claim, damage,
            liability, cost, and expense (including legal fees) arising from
            their use of the service or violation of these Terms and Conditions.
          </p>
        </section>

        <hr />

        <section>
          <h2 className="text-2xl font-semibold mt-6">
            10. Modification of Terms
          </h2>
          <p>
            We may update these Terms and Conditions at any time. Any changes
            will be posted on this page with an updated date. It is recommended
            that you review these terms periodically.
          </p>
        </section>

        <hr />

        <section>
          <h2 className="text-2xl font-semibold mt-6">11. Governing Law</h2>
          <p>
            These Terms and Conditions will be governed by the laws of{" "}
            <strong>Chile</strong>, without regard to its conflict of laws
            principles. Any disputes related to the use of this service will be
            resolved in the competent courts of <strong>Chile</strong>.
          </p>
        </section>

        <hr />

        <section>
          <h2 className="text-2xl font-semibold mt-6">12. Contact</h2>
          <p>
            If you have any questions about these Terms and Conditions, you can
            contact us through our{" "}
            <a
              href="https://discord.gg/w2KYb7uB"
              className="text-primary hover:underline"
            >
              Discord channel
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
