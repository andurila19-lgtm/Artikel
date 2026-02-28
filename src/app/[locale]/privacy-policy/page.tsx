import { setRequestLocale } from 'next-intl/server';

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <div className="container mx-auto px-4 py-16 md:px-6 max-w-4xl prose prose-neutral dark:prose-invert">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                Privacy Policy
            </h1>
            <p>Last updated: February 28, 2026</p>
            {locale === 'id' ? (
                <>
                    <p>Kebijakan Privasi ini menjelaskan bagaimana informasi pribadi Anda dikumpulkan, digunakan, dan dibagikan saat Anda mengunjungi atau melakukan pembelian dari Anduril Web ID.</p>
                    <h2>Informasi Pribadi yang Kami Kumpulkan</h2>
                    <p>Saat Anda mengunjungi Situs, kami secara otomatis mengumpulkan informasi tertentu tentang perangkat Anda, termasuk informasi tentang browser web Anda, alamat IP, zona waktu, dan beberapa cookie yang diinstal pada perangkat Anda.</p>
                    <h2>Google AdSense dan Cookie</h2>
                    <p>Situs ini menggunakan Google AdSense untuk menampilkan iklan. Google menggunakan cookie untuk menayangkan iklan berdasarkan kunjungan pengguna sebelumnya ke situs ini. Pengguna dapat memilih untuk tidak menggunakan cookie dengan mengunjungi kebijakan privasi jaringan konten dan iklan Google.</p>
                </>
            ) : (
                <>
                    <p>This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from Anduril Web ID.</p>
                    <h2>Personal Information We Collect</h2>
                    <p>When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.</p>
                    <h2>Google AdSense and Cookies</h2>
                    <p>This site uses Google AdSense to display ads. Google uses cookies to serve ads based on users prior visits to this site. Users may opt out of personalized advertising by visiting Google's Help and privacy center.</p>
                </>
            )}
        </div>
    );
}
