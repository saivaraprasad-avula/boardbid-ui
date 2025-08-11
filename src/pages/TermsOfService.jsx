import React from "react";
import { Link } from "react-router-dom";

export default function TermsOfService() {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}

      <div className="mx-auto mb-8 flex items-center justify-between gap-x-8 lg:mx-0">
        {/* Left: Logo + Title (logo = home link) */}
        <Link to="/" className="flex items-center gap-x-3 group" aria-label="Go to home">
          <img
            alt="BoardBid.ai"
            src="https://ik.imagekit.io/boardbid/faviconBB.svg?updatedAt=1754589379642"
            className="h-9 w-auto shrink-0 object-contain transition-opacity group-hover:opacity-90
                      dark:drop-shadow-[0_0_0.25rem_rgba(255,255,255,0.25)]"
            loading="eager"
            decoding="async"
          />
          <div>
            <div className="text-sm/6 text-gray-500 dark:text-gray-400">
              Legal <span className="text-gray-700 dark:text-gray-300">/ Terms of Service</span>
            </div>
            <div className="mt-1 text-base font-semibold text-gray-900 dark:text-white">
              BoardBid.ai
            </div>
          </div>
        </Link>

      </div>
      {/* Card */}
      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
        {/* Card Header */}
        <div className="px-4 py-5 sm:px-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <strong>Effective Date:</strong> August 11, 2025
          </p>
        </div>

        {/* Card Body */}
        <div className="px-4 py-5 sm:p-6 max-w-none space-y-8 prose prose-gray dark:prose-invert">
          {/* Intro */}
          <p>
            Welcome to <strong>BoardBid.ai</strong> (“we,” “our,” “us”). These Terms of Service
            (“Terms”) govern your access and use of our demand-side platform (“Platform”) for Digital
            Out-of-Home (“DOOH”) advertising campaigns. By using our Platform, you agree to these Terms.
          </p>

          {/* 1 */}
          <SectionHeading>1. Eligibility</SectionHeading>
          <ul>
            <li>You must be at least 18 years old.</li>
            <li>You must have authority to bind your organization.</li>
            <li>You must comply with all applicable U.S. laws and regulations.</li>
          </ul>

          {/* 2 */}
          <SectionHeading>2. Services</SectionHeading>
          <p>
            We provide tools for discovering, booking, and managing DOOH campaigns via third-party
            supply-side platforms (“SSPs”). We do not own or operate DOOH screens and cannot guarantee
            specific inventory availability.
          </p>

          {/* 3 */}
          <SectionHeading>3. Account Registration</SectionHeading>
          <ul>
            <li>Provide accurate, current, and complete information.</li>
            <li>Maintain confidentiality of login credentials.</li>
            <li>You are responsible for all activity under your account.</li>
          </ul>

          {/* 4 */}
          <SectionHeading>4. Bookings & Payments</SectionHeading>
          <ul>
            <li>Bookings are binding once confirmed.</li>
            <li>Payments are due via approved methods (credit card, ACH, wire transfer).</li>
            <li>Prices exclude taxes unless otherwise stated.</li>
            <li>Cancellation/refund terms vary by SSP and will be shown at booking.</li>
          </ul>

          {/* 5 */}
          <SectionHeading>5. Creative Guidelines</SectionHeading>
          <p>
            All ad creatives must meet technical requirements and comply with applicable laws and
            industry standards (FTC, IAB, NAI). Prohibited content includes illegal products/services,
            hate or discriminatory content, adult/explicit material, and false or misleading claims. We
            may reject any creative at our discretion.
          </p>

          {/* 6 */}
          <SectionHeading>6. License to Use the Service</SectionHeading>
          <p>
            We grant you a limited, non-exclusive, non-transferable, revocable license to access and
            use the Platform for your internal business purposes, subject to these Terms.
          </p>

          {/* 7 */}
          <SectionHeading>7. User Obligations</SectionHeading>
          <ul>
            <li>Do not use the Platform for unlawful purposes.</li>
            <li>Do not interfere with auctions/bidding systems or attempt to bypass processes.</li>
            <li>Do not upload malicious code or disrupt the service.</li>
          </ul>

          {/* 8 */}
          <SectionHeading>8. Third-Party Services</SectionHeading>
          <p>
            Our Platform integrates with SSPs and analytics providers. Their terms apply and their
            outages may affect your campaigns. We are not responsible for third-party failures.
          </p>

          {/* 9 */}
          <SectionHeading>9. Disclaimers & Limitation of Liability</SectionHeading>
          <p>
            The Platform is provided “as is” without warranties. We are not liable for indirect,
            incidental, or consequential damages. Our total liability is capped at the fees you paid us
            in the three months before a claim.
          </p>

          {/* 10 */}
          <SectionHeading>10. Indemnification</SectionHeading>
          <p>
            You agree to indemnify and hold harmless BoardBid.ai from claims, losses, and expenses
            arising from your campaigns, content, or misuse of the Platform.
          </p>

          {/* 11 */}
          <SectionHeading>11. Governing Law</SectionHeading>
          <p>
            These Terms are governed by the laws of the State of Delaware, without regard to conflict of
            laws principles.
          </p>

          {/* 12 */}
          <SectionHeading>12. Dispute Resolution & Arbitration</SectionHeading>
          <p>
            Any dispute, claim, or controversy arising out of or relating to these Terms or your use of
            the Platform shall be resolved exclusively by binding arbitration under the rules of the
            American Arbitration Association (“AAA”). Arbitration will be conducted remotely via video
            conference, unless both parties agree to an in-person hearing in Delaware.
          </p>
          <p><strong>Class Action Waiver:</strong> Disputes will be resolved only on an individual basis and not as part of a class, consolidated, or representative action.</p>
          <p><strong>Waiver of Jury Trial:</strong> You waive any right to a jury trial in any proceeding arising from or related to these Terms.</p>

          {/* 13 */}
          <SectionHeading>13. Changes to Terms</SectionHeading>
          <p>
            We may update these Terms. The latest version will be posted here with a new effective date.
            Continued use constitutes acceptance.
          </p>

          {/* Contact */}
          <SectionHeading>Contact</SectionHeading>
          <p>
            <strong>Email:</strong> support@boardbid.ai<br />
            131 Continental Dr, Suite 305, Newark, New Castle County, Delaware 19713, United States
          </p>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ children }) {
  return (
    <div className="border-b border-gray-200 pb-5 dark:border-white/10">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white">{children}</h3>
    </div>
  );
}