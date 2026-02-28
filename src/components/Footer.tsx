import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Footer() {
    const t = useTranslations('Footer');

    return (
        <footer className="border-t bg-muted/30">
            <div className="container py-12 md:py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                    <div className="col-span-2 space-y-6">
                        <div className="flex items-center space-x-2">
                            <span className="font-bold text-2xl tracking-tight">Anduril<span className="text-primary">Blog</span></span>
                        </div>
                        <p className="text-muted-foreground max-w-sm leading-relaxed">{t('description')}</p>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-bold text-sm tracking-widest uppercase">{t('links')}</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link href="/articles" className="hover:text-primary transition-colors">Tutorials</Link></li>
                            <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-bold text-sm tracking-widest uppercase">{t('legal')}</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">{t('privacy')}</Link></li>
                            <li><Link href="/terms-conditions" className="hover:text-primary transition-colors">{t('terms')}</Link></li>
                            <li><Link href="/disclaimer" className="hover:text-primary transition-colors">{t('disclaimer')}</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} Anduril Web ID. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-primary">Github</a>
                        <a href="#" className="hover:text-primary">Twitter</a>
                        <a href="#" className="hover:text-primary">LinkedIn</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
