import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Code2 } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';

export default function Navbar() {
    const t = useTranslations('Navigation');
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center space-x-2 px-4 hover:opacity-80 transition-opacity">
                    <div className="bg-primary p-1.5 rounded-lg shadow-lg">
                        <Code2 className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="font-bold tracking-tight text-xl hidden sm:inline-block">Anduril<span className="text-primary">Blog</span></span>
                </Link>
                <nav className="flex items-center space-x-8 text-sm font-semibold pr-4">
                    <Link href="/" className="transition-colors hover:text-primary text-foreground/70">{t('home')}</Link>
                    <Link href="/articles" className="transition-colors hover:text-primary text-foreground/70">{t('articles')}</Link>
                    <Link href="/about" className="transition-colors hover:text-primary text-foreground/70 hidden md:inline-block">{t('about')}</Link>
                    <Link href="/contact" className="transition-colors hover:text-primary text-foreground/70 hidden md:inline-block">{t('contact')}</Link>
                </nav>
                <div className="flex items-center space-x-3 px-4">
                    <LanguageSwitcher />
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
