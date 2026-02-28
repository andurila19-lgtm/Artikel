import { MetadataRoute } from 'next';
import { getArticles } from '@/lib/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://artikel.anduril.web.id';
    const locales = ['id', 'en'];

    const pages = ['', '/about', '/contact', '/services', '/articles', '/terms-conditions', '/privacy-policy', '/disclaimer'];

    const siteMapEntries = pages.flatMap(page =>
        locales.map(locale => ({
            url: `${baseUrl}/${locale}${page}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: page === '' ? 1 : 0.8,
        }))
    );

    const idArticles = await getArticles('id');
    const idArticlesMap = idArticles.map(article => ({
        url: `${baseUrl}/id/articles/${article.slug}`,
        lastModified: new Date(article.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    const enArticles = await getArticles('en');
    const enArticlesMap = enArticles.map(article => ({
        url: `${baseUrl}/en/articles/${article.slug}`,
        lastModified: new Date(article.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [...siteMapEntries, ...idArticlesMap, ...enArticlesMap];
}
