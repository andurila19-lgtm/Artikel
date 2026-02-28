"use client";

import { useLocale } from 'next-intl';
import { format } from 'date-fns';
import { id, enUS } from 'date-fns/locale';

export function FormatDate({ date }: { date: string }) {
    const locale = useLocale();
    const dateObj = new Date(date);

    if (isNaN(dateObj.getTime())) return <span>{date}</span>;

    const formatted = format(dateObj, 'MMMM d, yyyy', {
        locale: locale === 'id' ? id : enUS,
    });

    return <time dateTime={date}>{formatted}</time>;
}
