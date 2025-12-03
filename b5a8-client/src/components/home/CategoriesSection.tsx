import CategoryCard from "./CategoryCard";

const categories = [
  { name: "Cultural", icon: "🎭", color: "from-pink-500 to-rose-500" },
  { name: "Travel", icon: "✈️", color: "from-blue-500 to-cyan-500" },
  { name: "Sports", icon: "⚽", color: "from-green-500 to-emerald-500" },
  { name: "Business", icon: "💼", color: "from-purple-500 to-violet-500" },
  { name: "Conference", icon: "🎤", color: "from-indigo-500 to-blue-500" },
  { name: "Workshop", icon: "🛠️", color: "from-orange-500 to-amber-500" },
  { name: "Family", icon: "👨‍👩‍👧‍👦", color: "from-teal-500 to-cyan-500" },
  { name: "Exhibition", icon: "🖼️", color: "from-fuchsia-500 to-pink-500" },
  { name: "Training", icon: "📚", color: "from-red-500 to-orange-500" },
  { name: "Tour", icon: "🗺️", color: "from-lime-500 to-green-500" },
  { name: "Food", icon: "🍕", color: "from-yellow-500 to-orange-500" },
  { name: "Networking", icon: "🤝", color: "from-cyan-500 to-blue-500" },
];

export default function CategoriesSection() {
  const bookingSteps = [
    {
      step: "1",
      title: "Browse Events",
      description: "Explore events by category or search for specific interests",
      icon: "🔍"
    },
    {
      step: "2",
      title: "Select Event",
      description: "Click on any event to view full details and availability",
      icon: "📅"
    },
    {
      step: "3",
      title: "Register & Pay",
      description: "Complete registration with secure payment options",
      icon: "💳"
    },
    {
      step: "4",
      title: "Get Confirmation",
      description: "Receive instant booking confirmation via email",
      icon: "✅"
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Booking Process */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How to Book an Event
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Booking your next event is simple and secure. Follow these easy steps to reserve your spot
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {bookingSteps.map((item) => (
              <div
                key={item.step}
                className="relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 dark:border-gray-700"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {item.step}
                </div>
                <div className="text-4xl mb-4 text-center">{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 text-center">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
