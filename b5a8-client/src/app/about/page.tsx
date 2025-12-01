import CommonLayout from "@/components/layouts/CommonLayout";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <CommonLayout>
      <div className="container mx-auto px-4 py-12 lg:py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About SyncSpace
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We&apos;re on a mission to bring people together through
            unforgettable events and seamless event management experiences.
          </p>
        </div>

        {/* Mission Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Our Mission
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                At SyncSpace, we believe that every event has the power to
                create lasting memories and meaningful connections. Our platform
                empowers event organizers and attendees alike to discover,
                create, and participate in amazing experiences.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Whether you&apos;re hosting a small gathering or a large-scale
                conference, we provide the tools and support you need to make
                your event a success.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values Grid */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Community First
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We prioritize building strong communities and fostering
                  meaningful connections between people.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Innovation
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We constantly innovate to provide the best event management
                  tools and experiences.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Trust & Safety
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Your safety and privacy are our top priorities. We ensure
                  secure and reliable services.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              SyncSpace by the Numbers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">500K+</div>
                <div className="text-blue-100">Events Created</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">2M+</div>
                <div className="text-blue-100">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">150+</div>
                <div className="text-blue-100">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">99.9%</div>
                <div className="text-blue-100">Uptime</div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-6xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Our Team
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            We&apos;re a diverse team of passionate individuals dedicated to
            revolutionizing the event management industry.
          </p>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { name: "Sarah Johnson", role: "CEO & Founder" },
              { name: "Michael Chen", role: "CTO" },
              { name: "Emily Rodriguez", role: "Head of Design" },
              { name: "David Kim", role: "Head of Operations" },
            ].map((member) => (
              <Card key={member.name}>
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 bg-linear-to-br from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {member.role}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}
