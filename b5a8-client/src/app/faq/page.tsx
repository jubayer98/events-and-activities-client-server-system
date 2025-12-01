import CommonLayout from "@/components/layouts/CommonLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

export default function FAQPage() {
  const faqCategories = [
    {
      category: "General",
      questions: [
        {
          question: "What is SyncSpace?",
          answer:
            "SyncSpace is a comprehensive event management platform that helps organizers create, manage, and promote events while making it easy for attendees to discover and register for events they love.",
        },
        {
          question: "How do I create an account?",
          answer:
            'Click the "Sign Up" button in the top right corner, fill in your details, and verify your email address. You\'ll be ready to start creating or attending events in minutes!',
        },
        {
          question: "Is SyncSpace free to use?",
          answer:
            "Yes! SyncSpace offers a free tier that includes basic event creation and management features. We also offer premium plans with advanced features for professional event organizers.",
        },
      ],
    },
    {
      category: "For Event Organizers",
      questions: [
        {
          question: "How do I create an event?",
          answer:
            'Log in to your account, navigate to the dashboard, and click "Create Event". Follow the step-by-step wizard to add event details, set up ticketing, and publish your event.',
        },
        {
          question: "Can I sell tickets through SyncSpace?",
          answer:
            "Yes! Our platform includes integrated ticketing features with secure payment processing, customizable ticket types, and automated confirmation emails.",
        },
        {
          question: "How do I track event analytics?",
          answer:
            "Your dashboard provides real-time analytics including ticket sales, attendee demographics, revenue tracking, and engagement metrics to help you measure your event's success.",
        },
        {
          question: "Can I customize my event page?",
          answer:
            "Absolutely! You can customize your event page with your branding, colors, logos, and custom content to match your organization's identity.",
        },
      ],
    },
    {
      category: "For Attendees",
      questions: [
        {
          question: "How do I find events?",
          answer:
            "Browse our events page, use the search function, or filter by category, location, date, and price to find events that interest you.",
        },
        {
          question: "How do I register for an event?",
          answer:
            'Click on an event you\'re interested in, select your tickets, and complete the registration process. You\'ll receive a confirmation email with your ticket details.',
        },
        {
          question: "Can I get a refund for my ticket?",
          answer:
            "Refund policies vary by event. Check the specific event's refund policy on the event page. Some organizers offer full refunds, while others may have restrictions.",
        },
        {
          question: "How do I access my tickets?",
          answer:
            "Your tickets are available in your account dashboard under 'My Bookings'. You can view, download, or email your tickets anytime.",
        },
      ],
    },
    {
      category: "Payment & Pricing",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, and digital payment methods like PayPal and Apple Pay.",
        },
        {
          question: "Are there any service fees?",
          answer:
            "Service fees vary depending on your plan and ticket price. Free events have no service fees. Paid events include a small processing fee that covers payment processing and platform maintenance.",
        },
        {
          question: "When do I receive payment for ticket sales?",
          answer:
            "Payments are typically processed within 5-7 business days after your event concludes. You can track pending and completed payouts in your dashboard.",
        },
      ],
    },
    {
      category: "Technical Support",
      questions: [
        {
          question: "What if I encounter a technical issue?",
          answer:
            "Contact our support team through the help center, email us at support@syncspace.com, or call our customer care line at +1 (234) 567-890. We're here to help!",
        },
        {
          question: "Is my data secure?",
          answer:
            "Yes! We use industry-standard encryption and security measures to protect your personal information and payment data. We're fully GDPR compliant.",
        },
        {
          question: "Can I use SyncSpace on mobile devices?",
          answer:
            "Absolutely! Our platform is fully responsive and works seamlessly on all devices including smartphones, tablets, and desktop computers.",
        },
      ],
    },
  ];

  return (
    <CommonLayout>
      <div className="container mx-auto px-4 py-12 lg:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Find answers to common questions about SyncSpace. Can&apos;t find
            what you&apos;re looking for? Contact our support team.
          </p>
        </div>

        {/* Quick Links */}
        <Card className="mb-12 max-w-4xl mx-auto">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4 justify-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Quick jump to:
              </span>
              {faqCategories.map((cat) => (
                <a
                  key={cat.category}
                  href={`#${cat.category.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                >
                  {cat.category}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQ Sections */}
        <div className="max-w-4xl mx-auto space-y-12">
          {faqCategories.map((category) => (
            <div
              key={category.category}
              id={category.category.toLowerCase().replace(/\s+/g, "-")}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {category.category}
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`${category.category}-${index}`}
                    className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg px-6"
                  >
                    <AccordionTrigger className="text-left hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Still have questions?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Our support team is here to help you with any questions or
                concerns you may have.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
              >
                Contact Support
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </CommonLayout>
  );
}
