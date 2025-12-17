import ArticleCard from '@/components/ArticleCard';
import { headers } from 'next/headers';

type Article = {
	id: string | number;
	title: string;
	excerpt?: string | null;
	slug: string;
	published_at?: string | null;
	publish?: boolean | null;
	tags?: string[] | null;
	image_url?: string | null;
};

export default async function ArticlesPage() {
	const hdrs = headers();
	const lang = hdrs.get('x-nextjs-locale') ?? 'en';

	let articles: Article[] = [];
	let errorMsg: string | null = null;

	try {
		const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
		const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
		if (!supabaseUrl || !supabaseKey) throw new Error('Missing Supabase environment variables');

		// Fetch published articles ordered by published_at desc. Filter publish=eq.true
		const base = supabaseUrl.replace(/\/$/, '');
		const url = `${base}/rest/v1/articles?select=*&publish=eq.true&order=published_at.desc`;

		const res = await fetch(url, {
			headers: {
				apikey: supabaseKey,
				Authorization: `Bearer ${supabaseKey}`,
				Accept: 'application/json',
			},
			next: { revalidate: 60 },
		});

		if (!res.ok) {
			const txt = await res.text();
			throw new Error(txt || 'Failed to fetch articles');
		}

		const data = (await res.json()) as Article[];
		articles = data ?? [];
	} catch (err: any) {
		console.error('Failed to fetch articles', err);
		errorMsg = err?.message ?? 'Failed to fetch articles';
	}

	return (
		<main className="min-h-screen p-6 bg-gray-50">
			<div className="mx-auto max-w-7xl">
				<header className="mb-6">
					<h1 className="text-2xl font-bold text-gray-900">Articles</h1>
					<p className="text-sm text-gray-600">Latest articles{lang ? ` (${lang.toUpperCase()})` : ''}</p>
				</header>

				{errorMsg && <div className="text-center text-red-600 mb-4">{errorMsg}</div>}

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{articles.map((a) => (
						<ArticleCard
							key={a.slug}
							title={a.title}
							excerpt={a.excerpt ?? ''}
							slug={a.slug}
							published_at={a.published_at ?? null}
							tags={a.tags ?? []}
							image_url={a.image_url ?? null}
						/>
					))}
				</div>
			</div>
		</main>
	);
}

