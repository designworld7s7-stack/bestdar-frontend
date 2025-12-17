import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

type Article = {
  id: string | number;
  title: string;
  content?: string | null;
  excerpt?: string | null;
  slug: string;
  published_at?: string | null;
  publish?: boolean | null;
  tags?: string[] | null;
  image_url?: string | null;
};

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const hdrs = headers();
  const host = hdrs.get('x-forwarded-host') ?? hdrs.get('host') ?? '';
  const proto = hdrs.get('x-forwarded-proto') ?? 'https';
  const origin = host ? `${proto}://${host}` : '';

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables');
    notFound();
  }

  const base = supabaseUrl.replace(/\/$/, '');
  const url = `${base}/rest/v1/articles?select=*&slug=eq.${encodeURIComponent(slug)}&publish=eq.true&limit=1`;

  const res = await fetch(url, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      Accept: 'application/json',
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    console.error('Failed to fetch article', await res.text());
    notFound();
  }

  const data = (await res.json()) as Article[];
  const article = data?.[0] ?? null;
  if (!article || !article.publish) notFound();

  const date = article.published_at ? new Date(article.published_at) : null;
  const formatted = date ? date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : null;

  const pageUrl = origin ? `${origin}/articles/${article.slug}` : `/articles/${article.slug}`;

  const twitter = `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(article.title)}`;
  const facebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
  const whatsappShare = `https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' ' + pageUrl)}`;

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '';
  const whatsappChat = whatsappNumber ? `https://wa.me/${whatsappNumber.replace(/[^0-9+]/g, '')}` : '/contact';

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-3xl bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-900 text-start mb-2">{article.title}</h1>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          {formatted && <time dateTime={date!.toISOString()}>{formatted}</time>}
          <div className="flex items-center gap-3">
            <a href={twitter} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
              Share on Twitter
            </a>
            <a href={facebook} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
              Share on Facebook
            </a>
            <a href={whatsappShare} target="_blank" rel="noreferrer" className="text-green-600 hover:underline">
              Share on WhatsApp
            </a>
          </div>
        </div>

        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.map((t) => (
              <span key={t} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                {t}
              </span>
            ))}
          </div>
        )}

        <article className="prose prose-neutral max-w-none">
          <div dangerouslySetInnerHTML={{ __html: article.content ?? '' }} />
        </article>
      </div>

      {/* Sticky CTA */}
      <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3">
        <a
          href={whatsappChat}
          target={whatsappNumber ? '_blank' : undefined}
          rel={whatsappNumber ? 'noreferrer' : undefined}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-full shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 0 1-2 2h-1l-3 3-2-1-4 1 1-4-1-2V7a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2z" />
          </svg>
          <span className="text-sm font-medium">WhatsApp</span>
        </a>

        <a href="/contact" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-full shadow-lg">
          Consultation
        </a>
      </div>
    </main>
  );
}
