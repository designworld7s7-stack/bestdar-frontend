import SkeletonCard from "@/components/shared/skeleton-card";

export default function Loading() {
  return (
    <main className="px-6 lg:px-12 py-20">
      {/* Title Placeholder */}
      <div className="h-10 w-48 bg-gray-100 rounded-lg mb-12 animate-pulse" />
      
      {/* Grid of Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </main>
  );
}