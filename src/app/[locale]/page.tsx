import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, TerminalSquare } from 'lucide-react';
import { Link } from '@/i18n/routing';
import Hero from '@/components/sections/Hero';
import NewsletterForm from '@/components/sections/NewsletterForm';
import { getArticles } from '@/lib/content';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('Home');
    const latestArticles = await getArticles(locale);

    return (
        <div className="flex flex-col gap-16 pb-16">
            <Hero
                title={t('heroTitle')}
                subtitle={t('heroSubtitle')}
                ctaText={t('ctaText')}
                articlesText={t('articles')}
            />

            {/* Main Articles Grid - Replacing the Services/Intro split */}
            <section className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between mb-8 border-b pb-4">
                    <h2 className="text-3xl font-bold tracking-tight">{t('latestArticles')}</h2>
                    <div className="flex gap-2">
                        <span className="text-sm text-muted-foreground">{latestArticles.length} Articles</span>
                    </div>
                </div>

                {latestArticles.length === 0 ? (
                    <div className="text-center py-20 text-muted-foreground border-2 border-dashed rounded-3xl bg-muted/10">
                        <TerminalSquare className="h-12 w-12 mx-auto mb-4 opacity-20" />
                        <p>No articles found for this language yet.</p>
                    </div>
                ) : (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {latestArticles.map((article) => (
                            <Link key={article.slug} href={`/articles/${article.slug}`} className="group h-full">
                                <Card className="flex flex-col h-full overflow-hidden border-2 border-transparent hover:border-primary/20 hover:shadow-2xl transition-all duration-300">
                                    <div className="h-56 bg-muted relative overflow-hidden flex items-center justify-center group">
                                        {article.image ? (
                                            <img
                                                src={article.image}
                                                alt={article.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <TerminalSquare className="h-16 w-16 text-muted-foreground/30 group-hover:scale-110 transition-transform duration-500" />
                                        )}
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-primary/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-primary-foreground shadow-lg uppercase tracking-widest">
                                                {article.category}
                                            </span>
                                        </div>
                                    </div>
                                    <CardHeader className="flex-1">
                                        <div className="text-xs text-muted-foreground mb-3 font-medium flex items-center gap-2">
                                            <time>{article.date}</time>
                                            <span>•</span>
                                            <span>{article.author}</span>
                                        </div>
                                        <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                                            {article.title}
                                        </CardTitle>
                                        <CardDescription className="line-clamp-3 text-[0.95rem] mt-3 leading-relaxed">
                                            {article.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <div className="p-6 pt-0 mt-auto">
                                        <div className="flex items-center text-sm font-semibold text-primary group-hover:translate-x-1 transition-transform">
                                            Read Article <ArrowRight className="ml-2 h-4 w-4" />
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </section>

            {/* Newsletter Section */}
            <NewsletterForm
                title={t('newsletterTitle')}
                description={t('newsletterDesc')}
                subscribeText={t('subscribe')}
                placeholder={locale === 'id' ? 'Alamat email' : 'Email address'}
            />
        </div>
    );
}
