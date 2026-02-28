import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return {
        title: locale === 'id' ? 'Layanan Web Development - Anduril Web' : 'Web Development Services - Anduril Web',
        description: locale === 'id' ? 'Jasa pembuatan website profesional dan bergaransi' : 'Professional website development services',
    };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('Services');

    const services = [
        {
            title: t('companyProfile'),
            price: locale === 'id' ? 'Mulai Rp 2.500.000' : 'From $199',
            features: locale === 'id' ? [
                'Desain Premium & Responsive',
                'SEO Dasar & Google Indexing',
                'Gratis Domain & Hosting 1 Tahun',
                'Kapasitas hingga 10 Halaman',
                'Tombol Kontak WhatsApp'
            ] : [
                'Premium & Responsive Design',
                'Basic SEO & Google Indexing',
                'Free Domain & Hosting for 1 Year',
                'Up to 10 Pages',
                'WhatsApp Contact Button'
            ],
            recommended: false
        },
        {
            title: t('ecommerce'),
            price: locale === 'id' ? 'Mulai Rp 5.500.000' : 'From $499',
            features: locale === 'id' ? [
                'Sistem Keranjang Belanja',
                'Integrasi Payment Gateway',
                'Manajemen Produk (CMS)',
                'SEO Lanjutan',
                'Dukungan Teknis Prioritas'
            ] : [
                'Shopping Cart System',
                'Payment Gateway Integration',
                'Product Management (CMS)',
                'Advanced SEO',
                'Priority Technical Support'
            ],
            recommended: true
        },
        {
            title: t('customApp'),
            price: locale === 'id' ? 'Hubungi Kami' : 'Contact Us',
            features: locale === 'id' ? [
                'Sistem Sesuai Kebutuhan',
                'API & Integrasi Pihak Ketiga',
                'Dashboard Admin Khusus',
                'Keamanan Tingkat Lanjut',
                'Skalabilitas Tinggi'
            ] : [
                'Custom Tailored System',
                'API & Third-Party Integrations',
                'Custom Admin Dashboard',
                'Advanced Security',
                'High Scalability'
            ],
            recommended: false
        }
    ];

    return (
        <div className="container mx-auto px-4 py-16 md:px-6">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">{t('title')}</h1>
                <p className="text-muted-foreground text-lg max-w-[600px] mx-auto">
                    {locale === 'id'
                        ? 'Transformasi bisnis Anda ke ranah digital dengan website cepat, aman, dan modern.'
                        : 'Transform your business digitally with fast, accurate, and modern websites.'}
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                {services.map((service, index) => (
                    <Card key={index} className={`flex flex-col relative ${service.recommended ? 'border-primary shadow-lg scale-105 z-10' : ''}`}>
                        {service.recommended && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                                {locale === 'id' ? 'Paling Populer' : 'Most Popular'}
                            </div>
                        )}
                        <CardHeader className="text-center pb-4 border-b">
                            <CardTitle className="text-2xl">{service.title}</CardTitle>
                            <CardDescription className="text-xl font-bold text-foreground mt-2">{service.price}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 pt-6">
                            <ul className="space-y-4">
                                {service.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <Check className="h-5 w-5 text-green-500" />
                                        <span className="text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" variant={service.recommended ? 'default' : 'outline'}>
                                {t('contactCta')}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
