import { setRequestLocale } from 'next-intl/server';

export default async function TermsConditionsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <div className="container mx-auto px-4 py-16 md:px-6 max-w-4xl prose prose-neutral dark:prose-invert">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                Terms & Conditions
            </h1>
            <p>Last updated: February 28, 2026</p>
            {locale === 'id' ? (
                <>
                    <p>Syarat & Ketentuan berikut mengatur penggunaan situs web kami. Dengan mengakses situs ini, Anda setuju untuk terikat oleh Syarat & Ketentuan ini.</p>
                    <h2>Layanan</h2>
                    <p>Anduril Web ID menyediakan layanan web development dan jasa terkait yang bisa berubah sewaktu-waktu. Informasi lebih lanjut tentang cakupan layanan dapat ditanyakan secara langsung melalui kontak kami.</p>
                    <h2>Hukum Berlaku</h2>
                    <p>Syarat dan Ketentuan ini akan diatur dan ditafsirkan sesuai dengan hukum yang berlaku di Indonesia.</p>
                </>
            ) : (
                <>
                    <p>The following Terms & Conditions govern your use of our website. By accessing this site, you agree to be bound by these Terms & Conditions.</p>
                    <h2>Services</h2>
                    <p>Anduril Web ID provides premium web development and related services that are subject to change. For specific scopes, an individual contract applies.</p>
                    <h2>Governing Law</h2>
                    <p>These terms and conditions will be governed by and construed in accordance with the laws of Indonesia.</p>
                </>
            )}
        </div>
    );
}
