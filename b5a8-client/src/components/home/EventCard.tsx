import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface EventCardProps {
  event: {
    id: number | string;
    title: string;
    date: string;
    location: string;
    category: string;
    price: string;
    image: string;
    attendees: number;
    status: string;
  };
  onShowGuide?: () => void;
}

export default function EventCard({ event, onShowGuide }: EventCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer border-0 shadow-md">
      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
        <div
          className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
          style={{
            backgroundImage: `url(${event.image})`,
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        <Badge className="absolute top-3 right-3 bg-green-500 hover:bg-green-600 text-white border-0">
          {event.status}
        </Badge>
        <Badge className="absolute top-3 left-3 bg-white/95 hover:bg-white text-gray-900 border-0">
          {event.category}
        </Badge>
      </div>
      <CardContent className="p-5">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3 line-clamp-2 min-h-14">
          {event.title}
        </h3>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0"
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
            <span className="font-medium">{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="line-clamp-1">{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <span className="font-medium">{event.attendees.toLocaleString()} attending</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
          <span className="font-bold text-xl text-blue-600 dark:text-blue-400">
            {event.price}
          </span>
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
      </CardContent>
    </Card>
  );
}
