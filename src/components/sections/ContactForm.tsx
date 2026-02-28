"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';

interface ContactFormProps {
    locale: string;
}

export default function ContactForm({ locale }: ContactFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to send message');
            }

            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <Card className="h-fit">
            <CardHeader>
                <CardTitle>{locale === 'id' ? 'Kirim Pesan' : 'Send Message'}</CardTitle>
                <CardDescription>
                    {locale === 'id' ? 'Kami akan membalas secepat mungkin.' : 'We will reply as fast as possible.'}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">{locale === 'id' ? 'Nama Lengkap' : 'Full Name'}</label>
                            <Input
                                id="name"
                                placeholder={locale === 'id' ? 'Ketik nama Anda' : 'John Doe'}
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                            <Input
                                id="email"
                                type="email"
                                placeholder={locale === 'id' ? 'Email Anda' : 'Your Email'}
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium">{locale === 'id' ? 'Subjek' : 'Subject'}</label>
                        <Input
                            id="subject"
                            placeholder={locale === 'id' ? 'Tujuan pesan Anda' : 'How can we help?'}
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">{locale === 'id' ? 'Pesan' : 'Message'}</label>
                        <Textarea
                            id="message"
                            placeholder={locale === 'id' ? 'Tulis pesan Anda di sini...' : 'Write your message...'}
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {status === 'success' && (
                        <div className="flex items-center gap-2 p-4 rounded-xl bg-green-500/10 text-green-600 border border-green-500/20 text-sm font-medium animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <CheckCircle2 className="h-5 w-5" />
                            {locale === 'id' ? 'Pesan Anda telah berhasil dikirim!' : 'Your message has been sent successfully!'}
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="flex items-center gap-2 p-4 rounded-xl bg-destructive/10 text-destructive border border-destructive/20 text-sm font-medium animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <AlertCircle className="h-5 w-5" />
                            {locale === 'id' ? 'Gagal mengirim pesan. Silakan coba lagi.' : 'Failed to send message. Please try again.'}
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/10 transition-all hover:scale-[1.01] active:scale-95"
                        disabled={status === 'loading'}
                    >
                        {status === 'loading' ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {locale === 'id' ? 'Mengirim...' : 'Sending...'}
                            </>
                        ) : (
                            <>
                                {locale === 'id' ? 'Kirim Pesan' : 'Send Message'}
                                <Send className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
