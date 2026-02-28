import { getArticleData, getArticles } from '@/lib/content';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import { FormatDate } from '@/components/FormatDate';
import { Link } from '@/i18n/routing';
import ReadingProgress from '@/components/ReadingProgress';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { TerminalSquare, Calendar, User, Clock, ChevronRight } from 'lucide-react';

export async function generateStaticParams() {
    const locales = ['id', 'en'];
    const paths: { locale: string; slug: string }[] = [];

    for (const locale of locales) {
        const articles = await getArticles(locale);
        articles.forEach((a) => {
            paths.push({
                locale,
                slug: a.slug,
            });
        });
    }

    return paths;
}

export async function generateMetadata({ params, ...props }: { params: Promise<{ locale: string, slug: string }> }) {
    const { locale, slug } = await params;
    const article = await getArticleData(locale, slug);
    if (!article) return {};
    return {
        title: article.title,
        description: article.description
    };
}

export default async function ArticlePage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
    const { locale, slug } = await params;
    setRequestLocale(locale);

    const article = await getArticleData(locale, slug);
    if (!article) return notFound();

    const allArticles = await getArticles(locale);
    const relatedArticles = allArticles.filter(a => a.slug !== slug).slice(0, 3);

    const mdxOptions = {
        mdxOptions: {
            rehypePlugins: [
                rehypeSlug,
                [
                    rehypePrettyCode,
                    {
                        theme: 'material-theme-darker',
                        keepBackground: true,
                    }
                ]
            ]
        }
    };

    const t = await getTranslations('Articles');

    return (
        <>
            <ReadingProgress />
            <div className="container mx-auto px-4 py-12 md:px-6">
                <nav className="flex mb-8 text-sm font-medium text-muted-foreground items-center gap-2 overflow-x-auto whitespace-nowrap pb-2">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <ChevronRight className="h-4 w-4 shrink-0" />
                    <Link href="/articles" className="hover:text-primary transition-colors">Tutorials</Link>
                    <ChevronRight className="h-4 w-4 shrink-0" />
                    <span className="text-foreground truncate">{article.title}</span>
                </nav>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Main Article Content */}
                    <article className="lg:w-3/4">
                        <div className="mb-12">
                            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 leading-tight">
                                {article.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-muted-foreground text-sm border-y py-4">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-primary" />
                                    <span>{t('writtenBy')} <strong>{article.author}</strong></span>
                                </div>
                                <div className="flex items-center gap-2 border-l pl-6">
                                    <Calendar className="h-4 w-4 text-primary" />
                                    <FormatDate date={article.date} />
                                </div>
                                <div className="flex items-center gap-2 border-l pl-6">
                                    <Clock className="h-4 w-4 text-primary" />
                                    <span>5 min read</span>
                                </div>
                                <span className="ml-auto bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    {article.category}
                                </span>
                            </div>
                        </div>

                        {article.image && (
                            <div className="mb-12 rounded-[40px] overflow-hidden border shadow-2xl group">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-auto max-h-[500px] object-cover transition-transform duration-1000 group-hover:scale-105 shadow-2xl"
                                />
                            </div>
                        )}

                        <div className="prose prose-neutral dark:prose-invert max-w-none prose-pre:bg-[#0d1117] prose-img:rounded-2xl prose-headings:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
                            {/* AdSense Placement: After Intro */}
                            <div className="my-10 p-8 bg-muted/30 border-2 border-dashed border-muted-foreground/10 rounded-3xl text-center text-sm text-muted-foreground/60 flex flex-col items-center justify-center min-h-[150px] transition-all hover:bg-muted/50">
                                <TerminalSquare className="h-10 w-10 mb-2 opacity-20" />
                                <span className="font-medium">Premium AD Spot: Content Optimized</span>
                            </div>

                            <div className="mdx-content">
                                <MDXRemote source={article.content} options={mdxOptions as any} />
                            </div>

                            {/* AdSense Placement: End of Article */}
                            <div className="my-12 p-10 bg-muted/40 border-2 border-dashed border-muted-foreground/15 rounded-3xl text-center text-sm text-muted-foreground/70 flex flex-col items-center justify-center min-h-[250px] transition-colors hover:bg-muted/60">
                                <span className="font-bold text-lg mb-1 italic opacity-40">ADVERTISEMENT</span>
                                <span>Support our content by allowing non-intrusive ads</span>
                            </div>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:w-1/4 space-y-10">
                        {/* Table of Contents */}
                        <div className="sticky top-24 space-y-8">
                            <div className="bg-muted/20 p-8 rounded-3xl border shadow-sm">
                                <h3 className="font-bold text-lg mb-6 border-b pb-4 flex items-center gap-2">
                                    <TerminalSquare className="h-5 w-5 text-primary" />
                                    {t('tableOfContents')}
                                </h3>
                                <ul className="space-y-4 text-sm text-muted-foreground font-medium">
                                    <li className="hover:text-primary transition-colors flex gap-2"><div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" /><a href="#">Introduction</a></li>
                                    <li className="hover:text-primary transition-colors flex gap-2"><div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30 mt-1.5 shrink-0" /><a href="#">Key Concepts</a></li>
                                    <li className="hover:text-primary transition-colors flex gap-2"><div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30 mt-1.5 shrink-0" /><a href="#">Code Implementation</a></li>
                                    <li className="hover:text-primary transition-colors flex gap-2"><div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30 mt-1.5 shrink-0" /><a href="#">Conclusion</a></li>
                                </ul>
                            </div>

                            {/* Sidebar Banner */}
                            <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10 space-y-4">
                                <h3 className="font-bold text-lg leading-tight">Want more tutorials?</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">Join our developer newsletter to get the latest guides delivered straight to your inbox.</p>
                                <Link href="/" className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-primary px-6 py-2 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                                    Join Now
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Related Articles Section */}
            <div className="bg-muted/10 border-t mt-12 py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-3xl font-bold mb-10 text-center">{t('relatedArticles')}</h2>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                        {relatedArticles.map((rel) => (
                            <Link key={rel.slug} href={`/articles/${rel.slug}`} className="group">
                                <Card className="flex flex-col h-full overflow-hidden border-2 border-transparent hover:border-primary/20 hover:shadow-xl transition-all duration-300 rounded-2xl">
                                    <div className="h-40 bg-muted/50 flex items-center justify-center group-hover:bg-muted transition-colors">
                                        <TerminalSquare className="h-10 w-10 text-muted-foreground/30 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <CardHeader className="p-6">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-2 block">{rel.category}</span>
                                        <CardTitle className="line-clamp-2 text-lg group-hover:text-primary transition-colors">{rel.title}</CardTitle>
                                    </CardHeader>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
