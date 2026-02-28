import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { supabase } from './supabase';

const contentDirectory = path.join(process.cwd(), 'content');

const SLUG_TO_IMAGE: Record<string, string> = {
    // ID mapping
    'dasar-website-modern': 'modern-web-architecture',
    'peran-frontend-developer': 'role-of-frontend-developer',
    'backend-developer-otak-sistem': 'backend-developer-system-brain',
    'pentingnya-rest-api': 'importance-of-rest-api',
    'deployment-vercel': 'deploying-with-vercel',
    'optimasi-performa-cloudflare': 'optimizing-performance-cloudflare',
    'pentingnya-github': 'importance-of-github',
    'cloud-computing-web-developer': 'cloud-computing-for-web-developers',
    'backend-scalable-aws': 'scalable-backend-aws',
    'masa-depan-web-development-ai': 'future-of-web-development-ai',
    'cara-membuat-website': 'modern-web-architecture',
    'pentingnya-website-development': 'modern-web-architecture',

    // EN mapping
    'how-to-build-website': 'modern-web-architecture',
    'importance-of-web-development': 'modern-web-architecture',
    'modern-web-architecture': 'modern-web-architecture',
    'role-of-frontend-developer': 'role-of-frontend-developer',
    'backend-developer-system-brain': 'backend-developer-system-brain',
    'importance-of-rest-api': 'importance-of-rest-api',
    'deploying-with-vercel': 'deploying-with-vercel',
    'optimizing-performance-cloudflare': 'optimizing-performance-cloudflare',
    'importance-of-github': 'importance-of-github',
    'cloud-computing-for-web-developers': 'cloud-computing-for-web-developers',
    'scalable-backend-aws': 'scalable-backend-aws',
    'future-of-web-development-ai': 'future-of-web-development-ai',
    'importance-of-web-development-and-its-benefits': 'modern-web-architecture',
};

const getSupabaseImageUrl = (slug: string) => {
    // Match against mapping first
    const fileName = SLUG_TO_IMAGE[slug] || slug;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    // Fallback if Supabase is not configured or in dev
    if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
        return `/images/articles/${fileName}.png`;
    }

    return `${supabaseUrl}/storage/v1/object/public/articles/${fileName}.png`;
};

export interface ArticleData {
    slug: string;
    title: string;
    description: string;
    date: string;
    author: string;
    category: string;
    image?: string;
    content: string;
}

export async function getArticles(locale: string): Promise<Omit<ArticleData, 'content'>[]> {
    if (!locale) return [];

    // 1. Try fetching from Supabase
    try {
        const { data: dbArticles, error } = await supabase
            .from('articles')
            .select('slug, title, description, date, author, category, image')
            .eq('locale', locale)
            .order('date', { ascending: false });

        if (!error && dbArticles && dbArticles.length > 0) {
            return dbArticles.map(art => ({
                ...art,
                image: art.image || getSupabaseImageUrl(art.slug)
            }));
        }
    } catch (e) {
        console.error('Error fetching from Supabase:', e);
    }

    // 2. Fallback to local files
    const articlesDir = path.join(contentDirectory, locale, 'articles');
    if (!fs.existsSync(articlesDir)) return [];

    const fileNames = fs.readdirSync(articlesDir);
    const articles = fileNames
        .filter((fileName) => fileName.endsWith('.mdx'))
        .map((fileName) => {
            const slug = fileName.replace(/\.mdx$/, '');
            const fullPath = path.join(articlesDir, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data } = matter(fileContents);

            return {
                slug,
                title: data.title || '',
                description: data.description || '',
                date: data.date || '',
                author: data.author || '',
                category: data.category || '',
                image: data.image || getSupabaseImageUrl(slug),
            };
        })
        .sort((a, b) => (a.date < b.date ? 1 : -1));

    return articles;
}

export async function getArticleData(locale: string, slug: string): Promise<ArticleData | null> {
    // 1. Try Supabase
    try {
        const { data, error } = await supabase
            .from('articles')
            .select('*')
            .eq('locale', locale)
            .eq('slug', slug)
            .single();

        if (!error && data) {
            return {
                ...data,
                image: data.image || getSupabaseImageUrl(data.slug)
            };
        }
    } catch (e) {
        console.error('Error fetching one from Supabase:', e);
    }

    // 2. Fallback to local files
    const fullPath = path.join(contentDirectory, locale, 'articles', `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug,
        title: data.title || '',
        description: data.description || '',
        date: data.date || '',
        author: data.author || '',
        category: data.category || '',
        image: data.image || getSupabaseImageUrl(slug),
        content,
    };
}
