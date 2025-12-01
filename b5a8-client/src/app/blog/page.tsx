"use client";

import { useState } from "react";
import CommonLayout from "@/components/layouts/CommonLayout";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

export default function BlogPage() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Successfully subscribed!", {
        description: "You'll receive our latest updates and event tips.",
      });
      setEmail("");
    }
  };

  const blogPosts = [
    {
      id: 1,
      title: "10 Tips for Hosting Successful Virtual Events",
      excerpt:
        "Learn the best practices for creating engaging virtual events that keep attendees connected and entertained.",
      author: "Sarah Johnson",
      date: "November 28, 2025",
      category: "Event Tips",
      readTime: "5 min read",
      image: "🎭",
    },
    {
      id: 2,
      title: "How to Price Your Event Tickets Effectively",
      excerpt:
        "Discover strategies for setting ticket prices that maximize attendance while ensuring profitability.",
      author: "Michael Chen",
      date: "November 25, 2025",
      category: "Business",
      readTime: "7 min read",
      image: "💰",
    },
    {
      id: 3,
      title: "The Future of Hybrid Events in 2026",
      excerpt:
        "Explore the latest trends and technologies shaping the future of hybrid event experiences.",
      author: "Emily Rodriguez",
      date: "November 22, 2025",
      category: "Trends",
      readTime: "6 min read",
      image: "🚀",
    },
    {
      id: 4,
      title: "Building Community Through Events",
      excerpt:
        "How to create events that foster meaningful connections and build lasting communities.",
      author: "David Kim",
      date: "November 20, 2025",
      category: "Community",
      readTime: "4 min read",
      image: "🤝",
    },
    {
      id: 5,
      title: "Event Marketing Strategies That Work",
      excerpt:
        "Proven marketing tactics to boost event visibility and drive ticket sales.",
      author: "Sarah Johnson",
      date: "November 18, 2025",
      category: "Marketing",
      readTime: "8 min read",
      image: "📢",
    },
    {
      id: 6,
      title: "Sustainability in Event Planning",
      excerpt:
        "Tips for organizing eco-friendly events that minimize environmental impact.",
      author: "Emily Rodriguez",
      date: "November 15, 2025",
      category: "Sustainability",
      readTime: "5 min read",
      image: "🌱",
    },
  ];

  const categories = [
    "All",
    "Event Tips",
    "Business",
    "Trends",
    "Community",
    "Marketing",
    "Sustainability",
  ];

  return (
    <CommonLayout>
      <div className="container mx-auto px-4 py-12 lg:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            SyncSpace Blog
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Insights, tips, and stories from the world of event management and
            community building.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === "All"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        <Card className="mb-12 overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-12 flex items-center justify-center">
              <div className="text-9xl">🎉</div>
            </div>
            <CardContent className="p-8 flex flex-col justify-center">
              <div className="inline-block">
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                  Featured
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-3">
                The Complete Guide to Event Planning in 2026
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Everything you need to know about planning, promoting, and
                executing successful events in the modern era.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                <span>Sarah Johnson</span>
                <span>•</span>
                <span>December 1, 2025</span>
                <span>•</span>
                <span>12 min read</span>
              </div>
              <button
                onClick={() => toast.info("Article coming soon!", {
                  description: "This blog post is not yet available."
                })}
                className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                Read article
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </CardContent>
          </div>
        </Card>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 p-12 flex items-center justify-center">
                <div className="text-6xl">{post.image}</div>
              </div>
              <CardContent className="p-6">
                <div className="inline-block mb-3">
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {post.author}
                    </div>
                    <div>{post.date}</div>
                  </div>
                  <button
                    onClick={() => toast.info("Article coming soon!", {
                      description: "This blog post is not yet available."
                    })}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                  >
                    Read more →
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <Card className="mt-16 max-w-2xl mx-auto">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Get the latest event tips, industry insights, and SyncSpace
              updates delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-800"
              />
              <button 
                type="submit"
                className="px-6 py-2 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    </CommonLayout>
  );
}
