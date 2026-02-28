import { setRequestLocale } from 'next-intl/server';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <div className="container mx-auto px-4 py-16 md:px-6 max-w-4xl prose prose-neutral dark:prose-invert">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                {locale === 'id' ? 'Tentang Kami' : 'About Us'}
            </h1>
            {locale === 'id' ? (
                <>
                    <p>Anduril Blog adalah platform edukasi yang berfokus pada penyediaan tutorial mendalam seputar web development modern.</p>
                    <p>Kami percaya bahwa pengetahuan adalah kunci untuk membangun masa depan digital yang lebih baik. Oleh karena itu, misi kami adalah menyajikan konten teknis yang berkualitas, mudah dipahami, dan relevan dengan industri saat ini.</p>
                    <h2>Visi & Misi</h2>
                    <p><strong>Visi:</strong> Menjadi sumber utama pembelajaran web development yang inspiratif dan transformatif.</p>
                    <p><strong>Misi:</strong> Memberikan panduan berbasis praktik terbaik menggunakan teknologi seperti Next.js, React, dan ekosistem modern lainnya.</p>
                </>
            ) : (
                <>
                    <p>Anduril Blog is an educational platform focused on providing in-depth tutorials about modern web development.</p>
                    <p>We believe that knowledge is the key to building a better digital future. Our mission is to present high-quality, easy-to-understand, and industry-relevant technical content.</p>
                    <h2>Vision & Mission</h2>
                    <p><strong>Vision:</strong> To be a primary source of inspiring and transformative web development learning.</p>
                    <p><strong>Mission:</strong> Provide guides based on best practices using technologies like Next.js, React, and other modern ecosystems.</p>
                </>
            )}
        </div>
    );
}
