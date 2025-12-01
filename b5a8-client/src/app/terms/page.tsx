import CommonLayout from "@/components/layouts/CommonLayout";

export default function TermsPage() {
  return (
    <CommonLayout>
      <div className="container mx-auto px-4 py-12 lg:py-16 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Last updated: December 1, 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              By accessing and using SyncSpace (&quot;the Platform&quot;), you
              accept and agree to be bound by the terms and provisions of this
              agreement. If you do not agree to these Terms of Service, please do
              not use the Platform.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              2. Use of Service
            </h2>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              2.1 Eligibility
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You must be at least 13 years old to use this Platform. By using
              the Platform, you represent and warrant that you meet this
              requirement.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              2.2 Account Registration
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You may be required to create an account to access certain features.
              You agree to:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-6">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your password</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized access</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              2.3 Prohibited Activities
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You agree not to:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-6">
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Transmit harmful or malicious code</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Create fake accounts or impersonate others</li>
              <li>Scrape or collect data from the Platform</li>
              <li>Interfere with the Platform&apos;s operation</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              3. Event Creation and Management
            </h2>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              3.1 Event Organizer Responsibilities
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              As an event organizer, you agree to:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-6">
              <li>Provide accurate event information</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Deliver the event as described</li>
              <li>Handle refunds in accordance with your stated policy</li>
              <li>Maintain appropriate insurance coverage</li>
              <li>Protect attendee data and privacy</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              3.2 Platform Fees
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              SyncSpace charges service fees for paid events. Fees are clearly
              displayed during event creation and may include:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-6">
              <li>Platform service fees</li>
              <li>Payment processing fees</li>
              <li>Premium feature charges (if applicable)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              4. Tickets and Registration
            </h2>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              4.1 Ticket Purchases
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              When you purchase a ticket through SyncSpace:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-6">
              <li>You agree to the event organizer&apos;s terms and conditions</li>
              <li>All sales are subject to availability</li>
              <li>Prices are set by event organizers</li>
              <li>Tickets are non-transferable unless stated otherwise</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              4.2 Refunds and Cancellations
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Refund policies are set by individual event organizers. SyncSpace
              facilitates refunds but is not responsible for the event
              organizer&apos;s refund decisions.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              5. Intellectual Property
            </h2>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              5.1 Platform Content
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The Platform and its original content, features, and functionality
              are owned by SyncSpace and are protected by international copyright,
              trademark, and other intellectual property laws.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              5.2 User Content
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You retain ownership of content you post on the Platform. By
              posting content, you grant SyncSpace a worldwide, non-exclusive,
              royalty-free license to use, display, and distribute your content in
              connection with the Platform.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              6. Disclaimers and Limitations
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The Platform is provided &quot;as is&quot; without warranties of any
              kind. SyncSpace:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-6">
              <li>Does not guarantee uninterrupted or error-free service</li>
              <li>Is not responsible for event organizer actions</li>
              <li>Cannot guarantee the accuracy of event information</li>
              <li>Is not liable for any event-related issues or disputes</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              7. Indemnification
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You agree to indemnify and hold harmless SyncSpace and its officers,
              directors, employees, and agents from any claims, damages, losses,
              or expenses arising from:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-6">
              <li>Your use of the Platform</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any rights of another party</li>
              <li>Events you organize through the Platform</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              8. Termination
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We may terminate or suspend your account and access to the Platform
              immediately, without prior notice, for any reason, including
              violation of these Terms. You may also terminate your account at any
              time through your account settings.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              9. Changes to Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We reserve the right to modify these Terms at any time. We will
              notify users of material changes via email or through the Platform.
              Your continued use of the Platform after changes constitutes
              acceptance of the new Terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              10. Governing Law
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              These Terms shall be governed by and construed in accordance with
              the laws of the State of New York, United States, without regard to
              its conflict of law provisions.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              11. Contact Information
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            <ul className="list-none text-gray-600 dark:text-gray-400 space-y-2">
              <li>
                <strong>Email:</strong> legal@syncspace.com
              </li>
              <li>
                <strong>Phone:</strong> +1 (234) 567-890
              </li>
              <li>
                <strong>Address:</strong> 123 Event Street, New York, NY 10001
              </li>
            </ul>
          </section>

          <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-900 dark:text-blue-200">
              <strong>Note:</strong> By using SyncSpace, you acknowledge that you
              have read, understood, and agree to be bound by these Terms of
              Service.
            </p>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}
