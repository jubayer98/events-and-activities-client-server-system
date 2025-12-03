"use client";

import { useState } from "react";
import { Event } from "../hooks/usePublicEvents";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BookingGuideModal from "./BookingGuideModal";

interface EventsGridProps {
  events: Event[];
}

export default function EventsGrid({ events }: EventsGridProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (events.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No Events Found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Try adjusting your filters to find more events
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-900 dark:text-white">{events.length}</span> event{events.length !== 1 && "s"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event._id} event={event} onShowGuide={() => setIsModalOpen(true)} />
          ))}
        </div>
      </div>

      <BookingGuideModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

function EventCard({ event, onShowGuide }: { event: Event; onShowGuide: () => void }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-green-500";
      case "Full":
        return "bg-orange-500";
      case "Completed":
        return "bg-gray-500";
      default:
        return "bg-blue-500";
    }
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      Cultural: "from-pink-500 to-rose-500",
      Travel: "from-blue-500 to-cyan-500",
      Sports: "from-green-500 to-emerald-500",
      Business: "from-purple-500 to-violet-500",
      Conference: "from-indigo-500 to-blue-500",
      Workshop: "from-orange-500 to-amber-500",
      Family: "from-teal-500 to-cyan-500",
      Exhibition: "from-fuchsia-500 to-pink-500",
      Training: "from-red-500 to-orange-500",
      Tour: "from-lime-500 to-green-500",
      Food: "from-yellow-500 to-orange-500",
      Networking: "from-cyan-500 to-blue-500",
    };
    return colors[type] || "from-gray-500 to-gray-600";
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        {event.image ? (
          <div
            className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
            style={{ backgroundImage: `url(${event.image})` }}
          />
        ) : (
          <div className={`w-full h-full bg-linear-to-br ${getTypeColor(event.type)} flex items-center justify-center`}>
            <svg className="w-16 h-16 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        
        {/* Status Badge */}
        <Badge className={`absolute top-3 right-3 ${getStatusColor(event.status)} hover:${getStatusColor(event.status)} text-white border-0`}>
          {event.status}
        </Badge>
        
        {/* Type Badge */}
        <Badge className="absolute top-3 left-3 bg-white/95 hover:bg-white text-gray-900 border-0 font-semibold">
          {event.type}
        </Badge>
      </div>

      {/* Card Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3 line-clamp-2 min-h-14">
          {event.name}
        </h3>

        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">{new Date(event.date).toLocaleDateString()} • {event.time}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="line-clamp-1">{event.location}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="font-medium">
              {event.currentParticipants} / {event.requiredParticipant.max} attending
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div>
            {event.feeStatus === "free" ? (
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">Free</span>
            ) : (
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-500">Starting from</p>
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  ${event.joiningFee}
                </span>
              </div>
            )}
          </div>
          <Button
            size="sm"
            className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            onClick={onShowGuide}
          >
            Interested?
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}

