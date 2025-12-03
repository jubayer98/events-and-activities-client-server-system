import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        {/* Main Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 animate-fade-in">
            Your Gateway to Unforgettable Events
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Whether you&apos;re seeking amazing experiences or creating them, we&apos;ve got you covered
          </p>
        </div>

        {/* Two-Part Split Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Browse Events Card */}
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 group">
            <CardContent className="p-8 md:p-10">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-blue-500 to-purple-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Discover Events
              </h2>
              
              <p className="text-gray-600 mb-6 text-base md:text-lg leading-relaxed">
                Connect with your community through unforgettable experiences. 
                Browse thousands of events from concerts to conferences, workshops to festivals.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-500 mt-0.5 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">Access thousands of events worldwide</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-500 mt-0.5 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">Secure booking & instant confirmation</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-500 mt-0.5 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">Join a vibrant community of hundreds of members</span>
                </li>
              </ul>

              <Button
                size="lg"
                className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg py-6 shadow-lg hover:shadow-xl transition-all"
                asChild
              >
                <Link href="/events">
                  Browse Events
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Host Events Card */}
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 group">
            <CardContent className="p-8 md:p-10">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-purple-500 to-pink-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Become a Host
              </h2>
              
              <p className="text-gray-600 mb-6 text-base md:text-lg leading-relaxed">
                Turn your passion into profit. Create and manage events that inspire, 
                educate, and entertain while earning substantial income.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-500 mt-0.5 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">Keep up to 81% of ticket sales revenue</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-500 mt-0.5 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">Powerful tools for event management</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-500 mt-0.5 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">Reach millions of potential attendees</span>
                </li>
              </ul>

              <Button
                size="lg"
                className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg py-6 shadow-lg hover:shadow-xl transition-all"
                asChild
              >
                <Link href="/login">
                  Start Hosting
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-background to-transparent"></div>
    </section>
  );
}
