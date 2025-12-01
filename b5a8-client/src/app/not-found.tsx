import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 p-4">
      <div className="text-center text-white space-y-8 max-w-2xl mx-auto">
        {/* 404 Animation */}
        <div className="relative">
          <h1 className="text-[150px] md:text-[200px] font-bold leading-none opacity-20">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-pulse">
              <svg
                className="w-12 h-12 md:w-16 md:h-16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">
            Oops! Page Not Found
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved to another location.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button
            asChild
            size="lg"
            className="bg-white text-purple-600 hover:bg-white/90 font-semibold min-w-[200px]"
          >
            <Link href="/">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Back to Home
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold min-w-[200px]"
          >
            <Link href="/events">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Browse Events
            </Link>
          </Button>
        </div>

        {/* Additional Help */}
        <div className="pt-8 text-white/80">
          <p className="text-sm">
            Need help?{" "}
            <Link href="/contact" className="underline hover:text-white font-semibold">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
