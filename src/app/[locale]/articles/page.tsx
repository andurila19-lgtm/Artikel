import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getArticles } from '@/lib/content';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TerminalSquare, ArrowRight, User, Calendar } from 'lucide-react';
import { Link } from '@/i18n/routing';

export default async function ArticlesPage({
    params,
    searchParams,
}: {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ page?: string }>;
}) {
    const { locale } = await params;
    const { page } = await searchParams;
    const currentPage = parseInt(page || '1');
    const articlesPerPage = 6;
    setRequestLocale(locale);

    const allArticles = await getArticles(locale);
    const totalPages = Math.ceil(allArticles.length / articlesPerPage);
    const articles = allArticles.slice((currentPage - 1) * articlesPerPage, currentPage * articlesPerPage);
    const t = await getTranslations('Home');

    return (
        <div className="container mx-auto px-4 py-20 md:px-6 max-w-7xl">
            <div className="mb-16 text-center max-w-3xl mx-auto">
                <h1 className="text-5xl font-black tracking-tight lg:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 dark:to-blue-400">
                    All Tutorials
                </h1>
                <p className="text-muted-foreground text-xl leading-relaxed">
                    Explore our complete collection of in-depth guides and technical articles on modern web development.
                </p>
            </div>

            {articles.length === 0 ? (
                <div className="text-center py-32 text-muted-foreground border-2 border-dashed rounded-[40px] bg-muted/5">
                    <TerminalSquare className="h-20 w-20 mx-auto mb-6 opacity-10" />
                    <p className="text-2xl font-bold">No articles found yet.</p>
                </div>
            ) : (
                <div className="space-y-16">
                    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                        {articles.map((article) => (
                            <Link key={article.slug} href={`/articles/${article.slug}`} className="group relative">
                                <Card className="flex flex-col h-full overflow-hidden border-2 border-transparent hover:border-primary/20 hover:shadow-2xl transition-all duration-500 rounded-[32px] bg-card/50 backdrop-blur-sm">
                                    <div className="h-64 bg-muted/30 relative overflow-hidden group-hover:bg-muted/50 transition-colors flex items-center justify-center">
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent group-hover:from-primary/10 transition-colors" />
                                        {article.image ? (
                                            <img
                                                src={article.image}
                                                alt={article.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <TerminalSquare className="h-20 w-20 text-muted-foreground/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700" />
                                        )}
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                                        <div className="absolute top-6 left-6">
                                            <span className="bg-primary px-4 py-1.5 rounded-full text-[10px] font-black text-primary-foreground shadow-lg uppercase tracking-widest">
                                                {article.category}
                                            </span>
                                        </div>
                                    </div>
                                    <CardHeader className="flex-1 p-8">
                                        <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground/60 mb-6 uppercase tracking-wider">
                                            <div className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {article.date}</div>
                                            <div className="flex items-center gap-1.5 border-l pl-4 font-black text-primary/80"><User className="h-3.5 w-3.5" /> {article.author}</div>
                                        </div>
                                        <CardTitle className="text-2xl font-extrabold group-hover:text-primary transition-colors line-clamp-2 leading-tight mb-4">
                                            {article.title}
                                        </CardTitle>
                                        <CardDescription className="line-clamp-3 text-base leading-relaxed text-muted-foreground/80">
                                            {article.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <div className="px-8 pb-8 mt-auto">
                                        <div className="flex items-center text-sm font-black text-primary transition-all duration-300 group-hover:translate-x-2">
                                            Read More <ArrowRight className="ml-2 h-5 w-5" />
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 pt-10 border-t border-muted/20">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                <Link
                                    key={pageNum}
                                    href={`/articles?page=${pageNum}`}
                                    className={`px-6 py-3 rounded-full text-sm font-black transition-all duration-300 ${currentPage === pageNum
                                        ? 'bg-primary text-primary-foreground shadow-xl shadow-primary/20 scale-110'
                                        : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-primary'
                                        }`}
                                >
                                    {pageNum}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
