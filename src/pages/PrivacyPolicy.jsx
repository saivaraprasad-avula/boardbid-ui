import React from "react";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mx-auto mb-8 flex items-center justify-between gap-x-8 lg:mx-0">
        {/* Left: Logo = Home link + Title */}
        <Link to="/" className="flex items-center gap-x-3 group" aria-label="Go to home">
          <img
            alt="BoardBid.ai"
            src="https://ik.imagekit.io/boardbid/faviconBB.svg?updatedAt=1754589379642"
            className="h-9 w-auto shrink-0 object-contain transition-opacity group-hover:opacity-90 dark:drop-shadow-[0_0_0.25rem_rgba(255,255,255,0.25)]"
            loading="eager"
            decoding="async"
          />
          <div>
            <div className="text-sm/6 text-gray-500 dark:text-gray-400">
              Legal <span className="text-gray-700 dark:text-gray-300">/ Privacy Policy</span>
            </div>
            <div className="mt-1 text-base font-semibold text-gray-900 dark:text-white">BoardBid.ai</div>
          </div>
        </Link>
        {/* (Optional) separate Home button removed since logo links home */}
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
          <p>
            BoardBid.ai (“we,” “our,” “us”) values your privacy. This Privacy Policy explains how we
            collect, use, and share personal information when you use our services.
          </p>

          <SectionHeading>1. Information We Collect</SectionHeading>
          <ul>
            <li><strong>Account Data:</strong> Name, email, phone, company, payment info.</li>
            <li><strong>Campaign Data:</strong> Creative files, targeting details, budgets.</li>
            <li><strong>Usage Data:</strong> IP address, device/browser info, activity logs.</li>
            <li><strong>Partner Data:</strong> Data from SSPs and analytics tools.</li>
          </ul>

          <SectionHeading>2. How We Use Information</SectionHeading>
          <ul>
            <li>Deliver and optimize campaigns</li>
            <li>Process payments</li>
            <li>Provide customer support</li>
            <li>Improve our Platform</li>
          </ul>

          <SectionHeading>3. Sharing Information</SectionHeading>
          <ul>
            <li>With SSPs for campaign delivery</li>
            <li>With payment processors</li>
            <li>With analytics providers</li>
            <li>When required by law</li>
          </ul>

          <SectionHeading>4. CCPA Rights (California Residents)</SectionHeading>
          <ul>
            <li>Right to know what personal data we collect</li>
            <li>Right to request deletion</li>
            <li>Right to opt-out of sale/sharing of data</li>
          </ul>
          <p>
            To exercise these rights, email us at{" "}
            <a href="mailto:support@boardbid.ai" className="text-indigo-600">support@boardbid.ai</a>{" "}
            with “CCPA Request” in the subject line.
          </p>

          <SectionHeading>5. Cookies & Tracking</SectionHeading>
          <p>
            We use cookies for authentication, analytics, and functionality. You can disable cookies in
            your browser, but some features may not work.
          </p>

          <SectionHeading>6. Security</SectionHeading>
          <p>We use reasonable technical and organizational measures to protect your data.</p>

          <SectionHeading>7. Data Retention</SectionHeading>
          <p>We keep personal data only as long as necessary for business or legal purposes.</p>

          <SectionHeading>8. Children’s Privacy</SectionHeading>
          <p>Our Platform is not intended for children under 13. We do not knowingly collect their data.</p>

          <SectionHeading>9. Dispute Resolution</SectionHeading>
          <p>
            Any disputes regarding this Privacy Policy will be handled according to the Dispute
            Resolution & Arbitration process outlined in our Terms of Service.
          </p>

          <SectionHeading>10. Changes to This Policy</SectionHeading>
          <p>We may update this Privacy Policy. Updates will be posted with a new effective date.</p>

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