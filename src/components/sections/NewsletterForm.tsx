"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface NewsletterFormProps {
    title: string;
    description: string;
    subscribeText: string;
    placeholder: string;
}

export default function NewsletterForm({ title, description, subscribeText, placeholder }: NewsletterFormProps) {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Subscribing:', email);
        // Add newsletter subscription logic here
        alert('Thank you for subscribing!');
        setEmail('');
    };

    return (
        <section className="container mx-auto px-4 md:px-6 mt-8">
            <div className="bg-muted rounded-3xl p-8 md:p-16 text-center max-w-4xl mx-auto flex flex-col items-center gap-6">
                <h3 className="text-2xl md:text-3xl font-bold">{title}</h3>
                <p className="text-muted-foreground">{description}</p>
                <form className="flex w-full max-w-sm items-center gap-2" onSubmit={handleSubmit}>
                    <Input
                        type="email"
                        placeholder={placeholder}
                        className="bg-background"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Button type="submit">{subscribeText}</Button>
                </form>
            </div>
        </section>
    );
}
