import Link from 'next/link';
import Image from 'next/image';

type ArticleCardProps = {
	title: string;
	excerpt?: string | null;
	slug: string;
	published_at?: string | Date | null;
	tags?: string[];
	image_url?: string | null;
};

export default function ArticleCard({ title, excerpt, slug, published_at, tags = [], image_url }: ArticleCardProps) {
	const date = published_at ? new Date(published_at) : null;
	const formatted = date ? date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : null;

	const words = excerpt ? excerpt.trim().split(/\s+/).length : 0;
	const readingTime = words > 0 ? Math.max(1, Math.ceil(words / 200)) : null; // minutes

	return (
		<Link href={`/articles/${slug}`} className="block group" aria-label={`Read article ${title}`}>
			<article dir="auto" className="w-full bg-white border border-gray-100 rounded-lg p-5 hover:shadow-md transition-shadow">
				<div className="flex items-start gap-4">
					{image_url ? (
						<div className="hidden sm:block w-24 h-16 relative flex-shrink-0 rounded overflow-hidden bg-gray-100">
							<Image src={image_url} alt={title} fill className="object-cover" />
						</div>
					) : null}

					<div className="flex-1">
						<header className="mb-2">
							<h3 className="text-lg font-semibold text-gray-900 text-start line-clamp-2">{title}</h3>
							<div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
								{formatted && <time dateTime={date!.toISOString()}>{formatted}</time>}
								{readingTime && <span aria-hidden>•</span>}
								{readingTime && <span>{readingTime} min read</span>}
							</div>
						</header>

						{excerpt && (
							<p className="text-sm text-gray-700 text-start mb-4 line-clamp-3">{excerpt}</p>
						)}

						{tags.length > 0 && (
							<footer className="flex flex-wrap items-center gap-2">
								{tags.map((t) => (
									<span key={t} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
										{t}
									</span>
								))}
							</footer>
						)}
					</div>
				</div>
			</article>
		</Link>
	);
}

