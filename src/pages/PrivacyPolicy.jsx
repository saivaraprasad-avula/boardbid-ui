import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="bg-gray-50 text-gray-800 font-sans px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">
        <strong>Effective Date:</strong> August 9, 2025
      </p>

      <p className="mb-6">
        BoardBid.ai (“we,” “our,” “us”) values your privacy. This Privacy Policy
        explains how we collect, use, and share personal information when you
        use our services.
      </p>

      <Section title="1. Information We Collect">
        <List
          items={[
            "Account Data: Name, email, phone, company, payment info.",
            "Campaign Data: Creative files, targeting details, budgets.",
            "Usage Data: IP address, device/browser info, activity logs.",
            "Partner Data: Data from SSPs and analytics tools.",
          ]}
        />
      </Section>

      <Section title="2. How We Use Information">
        <List
          items={[
            "Deliver and optimize campaigns",
            "Process payments",
            "Provide customer support",
            "Improve our Platform",
          ]}
        />
      </Section>

      <Section title="3. Sharing Information">
        <List
          items={[
            "With SSPs for campaign delivery",
            "With payment processors",
            "With analytics providers",
            "When required by law",
          ]}
        />
      </Section>

      <Section title="4. CCPA Rights (California Residents)">
        <List
          items={[
            "Right to know what personal data we collect",
            "Right to request deletion",
            "Right to opt-out of sale/sharing of data",
          ]}
        />
        <p className="mt-2">
          To exercise these rights, email us at{" "}
          <a href="mailto:support@boardbid.ai" className="text-blue-600">
            support@boardbid.ai
          </a>{" "}
          with “CCPA Request” in the subject line.
        </p>
      </Section>

      <Section title="5. Cookies & Tracking">
        <p>
          We use cookies for authentication, analytics, and functionality. You
          can disable cookies in your browser, but some features may not work.
        </p>
      </Section>

      <Section title="6. Security">
        <p>
          We use reasonable technical and organizational measures to protect
          your data.
        </p>
      </Section>

      <Section title="7. Data Retention">
        <p>
          We keep personal data only as long as necessary for business or legal
          purposes.
        </p>
      </Section>

      <Section title="8. Children’s Privacy">
        <p>
          Our Platform is not intended for children under 13. We do not knowingly
          collect their data.
        </p>
      </Section>

      <Section title="9. Dispute Resolution">
        <p>
          Any disputes regarding this Privacy Policy will be handled according to
          the Dispute Resolution & Arbitration process outlined in our Terms of
          Service.
        </p>
      </Section>

      <Section title="10. Changes to This Policy">
        <p>
          We may update this Privacy Policy. Updates will be posted with a new
          effective date.
        </p>
      </Section>

      <div className="mt-8 border-t border-gray-300 pt-4 text-sm text-gray-600">
        <p>
          <strong>Contact:</strong> support@boardbid.ai
        </p>
        <p>
          131 Continental Dr, Suite 305, Newark, New Castle County, Delaware
          19713, United States
        </p>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <>
      <h2 className="text-xl font-semibold mt-8 mb-3">{title}</h2>
      <div className="space-y-2">{children}</div>
    </>
  );
}

function List({ items }) {
  return (
    <ul className="list-disc list-inside space-y-1">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}