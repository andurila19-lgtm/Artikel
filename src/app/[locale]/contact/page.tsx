import { getTranslations, setRequestLocale } from 'next-intl/server';
import ContactForm from '@/components/sections/ContactForm';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('Navigation');

    return (
        <div className="container mx-auto px-4 py-20 md:px-6 max-w-2xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">{t('contact')}</h1>
                <p className="text-muted-foreground text-lg">
                    {locale === 'id'
                        ? 'Punya pertanyaan tentang tutorial kami atau ingin memberikan masukan? Silakan isi formulir di bawah ini atau kirim langsung ke '
                        : 'Have questions about our tutorials or want to give feedback? Please fill out the form below or send an email to '}
                    <a href="mailto:andurila19@gmail.com" className="text-primary hover:underline font-medium">andurila19@gmail.com</a>
                </p>
            </div>

            <ContactForm locale={locale} />
        </div>
    );
}
