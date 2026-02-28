"use client";

import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { Button } from './ui/button';
import { Languages } from 'lucide-react';

export function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const locale = params.locale as string;

    function onSelectChange(nextLocale: 'id' | 'en') {
        router.replace(
            pathname,
            { locale: nextLocale }
        );
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => onSelectChange(locale === 'id' ? 'en' : 'id')}
            title="Switch Language"
            className="rounded-full"
        >
            <Languages className="h-4 w-4" />
            <span className="sr-only">Toggle Language</span>
        </Button>
    );
}
