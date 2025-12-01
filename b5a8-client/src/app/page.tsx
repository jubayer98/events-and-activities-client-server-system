import CommonLayout from "@/components/layouts/CommonLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function Home() {
  const currentEvents = [
    {
      id: 1,
      title: "Global Business Summit 2025",
      date: "Dec 15, 2025",
      location: "San Francisco, CA",
      category: "Business",
      price: "$299",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
      attendees: 1240,
      status: "Open",
    },
    {
      id: 2,
      title: "Professional Training Workshop",
      date: "Dec 20, 2025",
      location: "Los Angeles, CA",
      category: "Workshop",
      price: "$149",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
      attendees: 450,
      status: "Open",
    },
    {
      id: 3,
      title: "Modern Art Exhibition",
      date: "Dec 10, 2025",
      location: "New York, NY",
      category: "Exhibition",
      price: "Free",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&h=600&fit=crop",
      attendees: 780,
      status: "Open",
    },
    {
      id: 4,
      title: "International Food Festival",
      date: "Dec 18, 2025",
      location: "Chicago, IL",
      category: "Food",
      price: "$45",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",
      attendees: 1890,
      status: "Open",
    },
  ];

  const popularEvents = [
    {
      id: 1,
      title: "Tech Conference 2026",
      date: "Jan 5, 2026",
      location: "Boston, MA",
      rating: 4.9,
      reviews: 2450,
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop",
      price: "$399",
      category: "Conference",
    },
    {
      id: 2,
      title: "Cultural Heritage Tour",
      date: "Jan 12, 2026",
      location: "Miami, FL",
      rating: 4.8,
      reviews: 1820,
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop",
      price: "$199",
      category: "Tour",
    },
    {
      id: 3,
      title: "Sports Championship Finals",
      date: "Jan 8, 2026",
      location: "Seattle, WA",
      rating: 4.9,
      reviews: 3120,
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop",
      price: "$89",
      category: "Sports",
    },
  ];

  const superHosts = [
    {
      name: "Sarah Mitchell",
      events: 45,
      rating: 4.9,
      specialty: "Business & Conference",
      avatar: "SM",
      totalAttendees: "12K+",
    },
    {
      name: "James Chen",
      events: 38,
      rating: 4.8,
      specialty: "Cultural Events",
      avatar: "JC",
      totalAttendees: "8.5K+",
    },
    {
      name: "Emma Rodriguez",
      events: 52,
      rating: 5.0,
      specialty: "Workshops & Training",
      avatar: "ER",
      totalAttendees: "15K+",
    },
    {
      name: "Michael Brown",
      events: 41,
      rating: 4.9,
      specialty: "Sports & Travel",
      avatar: "MB",
      totalAttendees: "10K+",
    },
  ];

  return (
    <CommonLayout>
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Discover Amazing Events Near You
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Connect with your community through unforgettable experiences.
              From concerts to conferences, find your next adventure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6"
                asChild
              >
                <Link href="/events">Browse Events</Link>
              </Button>
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6"
                asChild
              >
                <Link href="/dashboard">Create Event</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-background to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">500K+</div>
              <div className="text-gray-600 dark:text-gray-400">Events</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">2M+</div>
              <div className="text-gray-600 dark:text-gray-400">Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-600 mb-2">150+</div>
              <div className="text-gray-600 dark:text-gray-400">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">4.9★</div>
              <div className="text-gray-600 dark:text-gray-400">Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Open Events */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Currently Open Events
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Join these events happening soon
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/events">View All</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentEvents.map((event) => (
              <Card
                key={event.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer border-0 shadow-md"
              >
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
                    <Button size="sm" className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Register Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Events */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Most Popular Events
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Trending events loved by our community
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/events">Explore More</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {popularEvents.map((event) => (
              <Card
                key={event.id}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer border-0 shadow-lg"
              >
                <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{
                      backgroundImage: `url(${event.image})`,
                    }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-4 right-4 bg-linear-to-r from-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-bold text-sm">{event.rating}</span>
                  </div>
                  <Badge className="absolute top-4 left-4 bg-white/95 hover:bg-white text-gray-900 border-0 font-semibold">
                    {event.category}
                  </Badge>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-bold text-xl text-white mb-1 line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-white/90 text-sm">
                      {event.reviews.toLocaleString()} reviews
                    </p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-5">
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
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">Starting from</p>
                      <span className="font-bold text-2xl bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {event.price}
                      </span>
                    </div>
                    <Button className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Super Hosts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Meet Our Super Hosts
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Trusted event organizers creating amazing experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {superHosts.map((host) => (
              <Card
                key={host.name}
                className="text-center hover:shadow-xl transition-all duration-300 group cursor-pointer border-0 shadow-md bg-linear-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
              >
                <CardContent className="p-6">
                  <div className="relative inline-block mb-4">
                    <div className="absolute inset-0 bg-linear-to-br from-blue-600 to-purple-600 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    <Avatar className="w-24 h-24 mx-auto border-4 border-white dark:border-gray-800 shadow-xl relative">
                      <AvatarImage src="" />
                      <AvatarFallback className="text-3xl font-bold bg-linear-to-br from-blue-600 to-purple-600 text-white">
                        {host.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-linear-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {host.rating}
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                    {host.name}
                  </h3>
                  <p className="text-sm font-medium bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                    {host.specialty}
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-5 p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <div>
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {host.events}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Events</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {host.totalAttendees}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Attendees</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full border-2 hover:bg-linear-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white hover:border-transparent transition-all">
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Explore by Category
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Find events that match your interests
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "Cultural", icon: "🎭", color: "from-pink-500 to-rose-500", count: "2.4K" },
              { name: "Travel", icon: "✈️", color: "from-blue-500 to-cyan-500", count: "1.8K" },
              { name: "Sports", icon: "⚽", color: "from-green-500 to-emerald-500", count: "3.2K" },
              { name: "Business", icon: "💼", color: "from-purple-500 to-violet-500", count: "5.6K" },
              { name: "Conference", icon: "🎤", color: "from-indigo-500 to-blue-500", count: "4.1K" },
              { name: "Workshop", icon: "🛠️", color: "from-orange-500 to-amber-500", count: "3.8K" },
              { name: "Family", icon: "👨‍👩‍👧‍👦", color: "from-teal-500 to-cyan-500", count: "2.1K" },
              { name: "Exhibition", icon: "🖼️", color: "from-fuchsia-500 to-pink-500", count: "1.5K" },
              { name: "Training", icon: "📚", color: "from-red-500 to-orange-500", count: "2.9K" },
              { name: "Tour", icon: "🗺️", color: "from-lime-500 to-green-500", count: "1.3K" },
              { name: "Food", icon: "🍕", color: "from-yellow-500 to-orange-500", count: "2.7K" },
              { name: "Networking", icon: "🤝", color: "from-cyan-500 to-blue-500", count: "1.9K" },
            ].map((category) => (
              <Card
                key={category.name}
                className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group border-0 shadow-md overflow-hidden relative"
              >
                <div className={`absolute inset-0 bg-linear-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                <CardContent className="p-6 text-center relative">
                  <div
                    className={`w-16 h-16 mx-auto mb-3 rounded-2xl bg-linear-to-br ${category.color} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                  >
                    {category.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {category.count} events
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-linear-to-r from-blue-600 to-purple-600 text-white border-0">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Create Your Event?
              </h2>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Join thousands of organizers who trust SyncSpace to bring their
                events to life. Start creating unforgettable experiences today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8"
                  asChild
                >
                  <Link href="/dashboard">Create Event</Link>
                </Button>
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8"
                  asChild
                >
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </CommonLayout>
  );
}
