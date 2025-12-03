import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-20 bg-linear-to-br from-purple-600 via-pink-600 to-orange-500 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main Content */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-white font-semibold text-sm">Join Our Host Community</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Turn Your Passion Into Profit
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Start hosting events today and earn up to 90% of ticket sales. 
              Join thousands of successful hosts who have built thriving event businesses on our platform.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">80%</div>
              <p className="text-white/80 text-sm">Revenue Share</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
              <p className="text-white/80 text-sm">Support & Tools</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">2M+</div>
              <p className="text-white/80 text-sm">Potential Attendees</p>
            </div>
          </div>

          {/* Benefits List */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-10">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Why Host With Us?</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-400 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Easy Setup</h4>
                  <p className="text-white/80 text-sm">Create and publish your event in minutes with our intuitive tools</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-400 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Powerful Analytics</h4>
                  <p className="text-white/80 text-sm">Track bookings, revenue, and attendee insights in real-time</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-400 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Secure Payments</h4>
                  <p className="text-white/80 text-sm">Fast, reliable payouts directly to your account</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-400 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Marketing Support</h4>
                  <p className="text-white/80 text-sm">Get featured and reach millions of potential attendees</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-10 py-7 font-bold shadow-2xl hover:shadow-3xl transition-all hover:scale-105"
              asChild
            >
              <Link href="/login">
                Start Hosting Now
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600 text-lg px-10 py-7 font-semibold transition-all"
              asChild
            >
              <Link href="/contact">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
