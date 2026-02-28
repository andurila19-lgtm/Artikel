"use client";

import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
    title: string;
    subtitle: string;
    ctaText: string;
    articlesText: string;
}

export default function Hero({ title, subtitle, ctaText, articlesText }: HeroProps) {
    return (
        <section className="mx-auto flex max-w-[980px] flex-col items-center gap-4 py-16 text-center md:py-24 lg:py-32">
            <h1 className="text-5xl font-extrabold tracking-tight lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 pb-2">
                {title}
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl leading-relaxed">
                {subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="/articles">
                    <Button size="lg" className="h-12 px-8 text-base font-bold shadow-xl shadow-primary/20">
                        {ctaText} <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </Link>
                <Button size="lg" variant="outline" className="h-12 px-8 text-base font-bold" onClick={() => document.getElementById('latest-section')?.scrollIntoView({ behavior: 'smooth' })}>
                    Latest Posts
                </Button>
            </div>
        </section>
    );
}
