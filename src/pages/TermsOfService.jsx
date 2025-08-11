import React from "react";

export default function TermsOfService() {
  return (
    <div className="bg-gray-50 text-gray-800 font-sans px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-8">
        <strong>Effective Date:</strong> August 9, 2025
      </p>

      <p className="mb-6">
        Welcome to <strong>BoardBid.ai</strong> (“we,” “our,” “us”). These Terms
        of Service (“Terms”) govern your access and use of our demand-side
        platform (“Platform”) for Digital Out-of-Home (“DOOH”) advertising
        campaigns. By using our Platform, you agree to these Terms.
      </p>

      <Section title="1. Eligibility">
        <List
          items={[
            "You must be at least 18 years old.",
            "You must have authority to bind your organization.",
            "You must comply with all applicable U.S. laws and regulations.",
          ]}
        />
      </Section>

      <Section title="2. Services">
        <p>
          We provide tools for discovering, booking, and managing DOOH campaigns
          via third-party supply-side platforms (“SSPs”). We do not own or
          operate DOOH screens and cannot guarantee specific inventory
          availability.
        </p>
      </Section>

      <Section title="3. Account Registration">
        <List
          items={[
            "Provide accurate, current, and complete information.",
            "Maintain confidentiality of login credentials.",
            "You are responsible for all activity under your account.",
          ]}
        />
      </Section>

      <Section title="4. Bookings & Payments">
        <List
          items={[
            "Bookings are binding once confirmed.",
            "Payments are due via approved methods (credit card, ACH, wire transfer).",
            "Prices exclude taxes unless otherwise stated.",
            "Cancellation and refund terms vary by SSP and will be shown at booking.",
          ]}
        />
      </Section>

      <Section title="5. Creative Guidelines">
        <p className="mb-2">
          All ad creatives must meet technical requirements and comply with
          applicable laws and industry standards (FTC, IAB, NAI). We prohibit:
        </p>
        <List
          items={[
            "Illegal products or services",
            "Hate speech or discriminatory content",
            "Adult or sexually explicit material",
            "False or misleading claims",
          ]}
        />
      </Section>

      <Section title="6. User Obligations">
        <List
          items={[
            "Use the Platform for unlawful purposes",
            "Interfere with bidding systems",
            "Upload malicious code",
          ]}
        />
      </Section>

      <Section title="7. Third-Party Services">
        <p>
          Our Platform integrates with SSPs and analytics providers. Their terms
          and outages may affect your campaigns. We are not responsible for
          third-party failures.
        </p>
      </Section>

      <Section title="8. Disclaimers & Limitation of Liability">
        <p>
          The Platform is provided “as is” without warranties. We are not liable
          for indirect or consequential damages. Our liability is capped at the
          fees you paid us in the three months before a claim.
        </p>
      </Section>

      <Section title="9. Indemnification">
        <p>
          You agree to indemnify and hold harmless BoardBid.ai from any claims
          arising from your campaigns or misuse of the Platform.
        </p>
      </Section>

      <Section title="10. Governing Law">
        <p>
          These Terms and any disputes will be governed by the laws of the State
          of Delaware, without regard to its conflict of laws principles.
        </p>
      </Section>

      <Section title="11. Dispute Resolution & Arbitration">
        <p>
          Any dispute, claim, or controversy arising out of or relating to these
          Terms or your use of the Platform shall be resolved exclusively by
          binding arbitration under the rules of the American Arbitration
          Association (“AAA”). Arbitration will be conducted remotely via video
          conference unless both parties agree to an in-person hearing in
          Delaware.
        </p>
        <p className="mt-2">
          <strong>Class Action Waiver:</strong> You agree that disputes will be
          resolved only on an individual basis and not as part of a class,
          consolidated, or representative action.
        </p>
        <p className="mt-2">
          <strong>Waiver of Jury Trial:</strong> You waive any right to a jury
          trial in any proceeding arising from or related to these Terms.
        </p>
      </Section>

      <Section title="12. Changes to Terms">
        <p>
          We may update these Terms. The latest version will be posted here with
          a new effective date. Continued use constitutes acceptance.
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