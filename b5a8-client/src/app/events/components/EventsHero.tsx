interface EventsHeroProps {
  totalEvents: number;
}

export default function EventsHero({ totalEvents }: EventsHeroProps) {
  return (
    <section className="relative bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-16 md:py-20">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
            </svg>
            <span className="font-semibold text-sm">
              {totalEvents} Events Available
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Discover Events That Inspire
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Explore a world of amazing experiences. From cultural festivals to business conferences, 
            find events that match your interests and connect with like-minded people.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-gray-50 dark:from-gray-900 to-transparent"></div>
    </section>
  );
}
