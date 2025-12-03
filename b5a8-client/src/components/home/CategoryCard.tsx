import Link from "next/link";

interface CategoryCardProps {
  category: {
    name: string;
    icon: string;
    color: string;
  };
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/events?category=${category.name}`}>
      <div className="flex items-center gap-3 px-5 py-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-100 dark:border-gray-700 hover:border-transparent hover:-translate-y-0.5">
        <div
          className={`w-12 h-12 rounded-xl bg-linear-to-br ${category.color} flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform duration-300`}
        >
          {category.icon}
        </div>
        <span className="font-semibold text-gray-900 dark:text-white text-sm">
          {category.name}
        </span>
      </div>
    </Link>
  );
}
