"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

interface BookingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingGuideModal({ isOpen, onClose }: BookingGuideModalProps) {
  const steps = [
    {
      number: "1",
      title: "Create an Account",
      description: "Sign up or log in to access event booking features",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: "2",
      title: "Browse Events",
      description: "Explore available events in the Browse Events section of your dashboard",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      color: "from-purple-500 to-pink-500"
    },
    {
      number: "3",
      title: "Select Your Event",
      description: "Click on any event to view full details, pricing, and availability",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: "from-orange-500 to-red-500"
    },
    {
      number: "4",
      title: "Complete Booking",
      description: "Fill in your details and complete secure payment to confirm your spot",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            How to Book an Event
          </DialogTitle>
          <DialogDescription className="text-base">
            Follow these simple steps to book your next amazing event
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl p-5 border-2 border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300"
            >
              {/* Step Number Badge */}
              <div className={`absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center shadow-lg`}>
                <span className="text-white font-bold text-lg">{step.number}</span>
              </div>

              <div className="flex items-start gap-4 ml-4">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shrink-0`}>
                  {step.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-2 top-14 w-0.5 h-8 bg-gradient-to-b from-blue-300 to-purple-300 dark:from-blue-600 dark:to-purple-600"></div>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
          <Button
            size="lg"
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
            asChild
          >
            <Link href="/login">
              Log In to Book
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="flex-1 border-2 border-gray-300 hover:border-blue-500 dark:border-gray-600 dark:hover:border-blue-400"
            asChild
          >
            <Link href="/signup">
              Create Account
            </Link>
          </Button>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mt-2">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">
                Already have an account?
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-300">
                Log in to directly access Browse Events in your dashboard and book instantly!
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
