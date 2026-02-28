'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TerminalSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function UploadPage() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        author: 'Anduril Senior Developer',
        category: 'Technology',
        content: '',
        locale: 'id',
        date: new Date().toISOString().split('T')[0]
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            let imageUrl = '';

            // 1. Upload Image to Supabase Storage if file selected
            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `${formData.slug}-${Math.random().toString(36).substring(2)}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError, data } = await supabase.storage
                    .from('articles')
                    .upload(filePath, imageFile);

                if (uploadError) throw uploadError;

                // Get Public URL
                const { data: { publicUrl } } = supabase.storage
                    .from('articles')
                    .getPublicUrl(filePath);

                imageUrl = publicUrl;
            }

            // 2. Upsert Article Metadata to Database
            const { error: dbError } = await supabase
                .from('articles')
                .upsert([{
                    ...formData,
                    image: imageUrl || undefined // Only update if new image uploaded
                }]);

            if (dbError) throw dbError;

            setStatus('success');
            setMessage('Artikel dan Gambar berhasil diunggah!');
        } catch (err: any) {
            console.error(err);
            setStatus('error');
            setMessage(err.message || 'Terjadi kesalahan saat mengunggah.');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    return (
        <div className="container mx-auto px-4 py-20 max-w-4xl">
            <div className="mb-12 text-center">
                <div className="inline-flex p-4 rounded-3xl bg-primary/10 mb-6">
                    <TerminalSquare className="h-10 w-10 text-primary" />
                </div>
                <h1 className="text-4xl font-black tracking-tight mb-4">Admin Upload Artikel</h1>
                <p className="text-muted-foreground text-lg">Unggah artikel baru langsung ke database Supabase.</p>
            </div>

            <Card className="border-2 rounded-[40px] shadow-2xl overflow-hidden bg-card/50 backdrop-blur-xl">
                <CardHeader className="p-10 border-b bg-muted/20">
                    <CardTitle>Konten Artikel</CardTitle>
                    <CardDescription>Isi detail artikel dengan teliti sebelum mengirim.</CardDescription>
                </CardHeader>
                <CardContent className="p-10">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-sm font-black uppercase tracking-widest text-primary/70">Judul Artikel</label>
                                <Input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Contoh: Belajar Next.js Dasar"
                                    required
                                    className="rounded-2xl h-14 border-2 focus:border-primary transition-all"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-sm font-black uppercase tracking-widest text-primary/70">Slug (URL)</label>
                                <Input
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleChange}
                                    placeholder="contoh-belajar-nextjs"
                                    required
                                    className="rounded-2xl h-14 border-2 focus:border-primary transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-black uppercase tracking-widest text-primary/70">Deskripsi Singkat (SEO)</label>
                            <Textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Tuliskan ringkasan singkat artikel ini..."
                                required
                                className="rounded-2xl min-h-[100px] border-2 focus:border-primary transition-all p-4"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-black uppercase tracking-widest text-primary/70">Gambar Unggulan (Thumbnail)</label>
                            <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-primary/20 border-dashed rounded-[32px] cursor-pointer bg-muted/10 hover:bg-muted/30 transition-all group">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <div className="p-3 bg-primary/10 rounded-2xl mb-3 group-hover:scale-110 transition-transform">
                                            <Send className="h-6 w-6 text-primary rotate-[-45deg]" />
                                        </div>
                                        <p className="mb-2 text-sm font-black uppercase tracking-widest text-primary/70">
                                            {imageFile ? imageFile.name : 'Pilih file gambar'}
                                        </p>
                                        <p className="text-xs text-muted-foreground">PNG, JPG atau WebP (Maks. 5MB)</p>
                                    </div>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                </label>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="space-y-3">
                                <label className="text-sm font-black uppercase tracking-widest text-primary/70">Penulis</label>
                                <Input name="author" value={formData.author} onChange={handleChange} required className="rounded-2xl h-12 border-2" />
                            </div>
                            <div className="space-y-3">
                                <label className="text-sm font-black uppercase tracking-widest text-primary/70">Kategori</label>
                                <Input name="category" value={formData.category} onChange={handleChange} required className="rounded-2xl h-12 border-2" />
                            </div>
                            <div className="space-y-3">
                                <label className="text-sm font-black uppercase tracking-widest text-primary/70">Bahasa</label>
                                <select
                                    name="locale"
                                    value={formData.locale}
                                    onChange={handleChange}
                                    className="w-full rounded-2xl h-12 border-2 px-4 bg-background focus:ring-2 focus:ring-primary outline-none"
                                >
                                    <option value="id">Indonesia (id)</option>
                                    <option value="en">English (en)</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-black uppercase tracking-widest text-primary/70">Konten (MDX / Markdown)</label>
                            <Textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                placeholder="Tuliskan konten artikel menggunakan Markdown..."
                                required
                                className="rounded-2xl min-h-[400px] border-2 focus:border-primary transition-all p-6 font-mono text-sm leading-relaxed"
                            />
                        </div>

                        {status === 'success' && (
                            <div className="flex items-center gap-3 p-6 rounded-3xl bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                                <CheckCircle2 className="h-6 w-6" />
                                <span className="font-bold">{message}</span>
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="flex items-center gap-3 p-6 rounded-3xl bg-destructive/10 text-destructive border border-destructive/20">
                                <AlertCircle className="h-6 w-6" />
                                <span className="font-bold">{message}</span>
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full h-16 rounded-3xl text-lg font-black shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            {status === 'loading' ? 'Sedang Mengunggah...' : (
                                <span className="flex items-center gap-2">
                                    Unggah Artikel <Send className="h-5 w-5" />
                                </span>
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
