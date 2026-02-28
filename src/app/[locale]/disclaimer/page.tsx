import { setRequestLocale } from 'next-intl/server';

export default async function DisclaimerPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <div className="container mx-auto px-4 py-16 md:px-6 max-w-4xl prose prose-neutral dark:prose-invert">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                Disclaimer
            </h1>
            <p>Last updated: February 28, 2026</p>
            {locale === 'id' ? (
                <>
                    <p>Semua informasi di situs ini, Anduril Web ID, diterbitkan dengan itikad baik dan untuk tujuan informasi umum saja.</p>
                    <p>Setiap tindakan yang Anda ambil terkait informasi yang Anda temukan di situs ini adalah risiko Anda sendiri. Anduril Web ID tidak akan bertanggung jawab atas segala kerugian dan / atau kerusakan sehubungan dengan penggunaan situs web kami.</p>
                    <h2>Disclaimer AdSense</h2>
                    <p>AdSense dari Google menayangkan iklan di situs kami. Kami tidak bertanggung jawab atas isi langsung dari situs-situs yang diiklankan tersebut, semua penanganan konten pihak ketiga berada di bawah wewenang pengiklan tersebut.</p>
                </>
            ) : (
                <>
                    <p>All the information on this website – Anduril Web ID – is published in good faith and for general information purpose only.</p>
                    <p>Any action you take upon the information you find on this website, is strictly at your own risk. Anduril Web ID will not be liable for any losses and/or damages in connection with the use of our website.</p>
                    <h2>AdSense Disclaimer</h2>
                    <p>Google AdSense may serve ads on this site. We do not endorse any products or services advertised by third parties and hold no liability for their assertions.</p>
                </>
            )}
        </div>
    );
}
