import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  id: string | number;
  title: string;
  image_url?: string | null;
  price: string;
  location: string;
}

export default function ProjectCard({ id, title, image_url, price, location }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${id}`}
      className="block group"
      aria-label={`View project ${title}`}
    >
      <article dir="auto" className="relative w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        {/* Image */}
        <div className="relative w-full h-48 sm:h-56 bg-gray-100">
          {image_url ? (
            <Image src={image_url} alt={title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M8 7l4 4 4-4M8 17h8" />
              </svg>
            </div>
          )}
        </div>

        <div className="p-4 sm:p-6 flex flex-col gap-3">
          <div className="flex flex-col">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 text-start truncate">{title}</h3>
            <p className="text-sm text-gray-600 text-start truncate">{location}</p>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 text-start">Starting from</p>
              <p className="text-lg font-bold text-green-600 text-start">{price}</p>
            </div>
            <div className="hidden sm:flex items-center text-sm text-gray-700">
              <span className="px-3 py-1 bg-gray-100 rounded text-gray-800">View</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
