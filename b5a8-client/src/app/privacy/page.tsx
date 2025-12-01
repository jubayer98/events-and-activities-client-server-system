import CommonLayout from "@/components/layouts/CommonLayout";

export default function PrivacyPage() {
  return (
    <CommonLayout>
      <div className="container mx-auto px-4 py-12 lg:py-16 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Last updated: December 1, 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Introduction
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              At SyncSpace, we take your privacy seriously. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you use our event management platform. Please
              read this privacy policy carefully.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Information We Collect
            </h2>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Personal Information
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-6">
              <li>Name and contact information (email, phone number)</li>
              <li>Account credentials (username and password)</li>
              <li>Payment information (processed securely through our payment partners)</li>
              <li>Profile information (photo, bio, preferences)</li>
              <li>Event creation and attendance information</li>
              <li>Communications with us and other users</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Automatically Collected Information
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              When you use our platform, we automatically collect:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-6">
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Usage data (pages viewed, features used, time spent)</li>
              <li>Location data (with your permission)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              How We Use Your Information
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, prevent, and address technical issues and fraud</li>
              <li>Personalize your experience on our platform</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Information Sharing and Disclosure
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We may share your information in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
              <li>
                <strong>With event organizers:</strong> When you register for an
                event, we share your information with the event organizer
              </li>
              <li>
                <strong>With service providers:</strong> We work with third-party
                companies to provide services on our behalf
              </li>
              <li>
                <strong>For legal reasons:</strong> When required by law or to
                protect our rights
              </li>
              <li>
                <strong>With your consent:</strong> When you explicitly agree to
                share information
              </li>
              <li>
                <strong>Business transfers:</strong> In connection with a merger,
                acquisition, or sale of assets
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Data Security
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction. However, no internet
              transmission is ever completely secure or error-free.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Your Rights and Choices
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
              <li>
                <strong>Access:</strong> Request a copy of your personal data
              </li>
              <li>
                <strong>Correction:</strong> Update or correct inaccurate information
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your personal data
              </li>
              <li>
                <strong>Opt-out:</strong> Unsubscribe from marketing communications
              </li>
              <li>
                <strong>Data portability:</strong> Receive your data in a portable format
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We use cookies and similar tracking technologies to track activity
              on our platform and store certain information. You can instruct
              your browser to refuse all cookies or to indicate when a cookie is
              being sent.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Children&apos;s Privacy
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Our service is not intended for children under the age of 13. We do
              not knowingly collect personal information from children under 13.
              If you become aware that a child has provided us with personal
              information, please contact us.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Changes to This Privacy Policy
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              If you have any questions about this Privacy Policy, please contact
              us:
            </p>
            <ul className="list-none text-gray-600 dark:text-gray-400 space-y-2">
              <li>
                <strong>Email:</strong> privacy@syncspace.com
              </li>
              <li>
                <strong>Phone:</strong> +1 (234) 567-890
              </li>
              <li>
                <strong>Address:</strong> 123 Event Street, New York, NY 10001
              </li>
            </ul>
          </section>
        </div>
      </div>
    </CommonLayout>
  );
}
