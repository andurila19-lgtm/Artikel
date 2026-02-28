# 🗡️ Anduril Blog - Premium Web Development Insights

Anduril Blog is a state-of-the-art blogging platform designed for modern web developers. Built with **Next.js 16**, **React 19**, and **Tailwind CSS v4**, it offers a premium, futuristic experience with a focus on speed, accessibility, and high-quality educational content.

---

## ✨ Key Features

- 🌍 **Multilingual Support**: Fully localized in Indonesian (ID) and English (EN) using `next-intl`.
- 🗄️ **Supabase Integration**: Uses Supabase for dynamic article metadata retrieval and Storage for professional article covers.
- 📝 **MDX-Powered**: seamless local article management using MDX with `gray-matter` for a rich writing experience.
- 🎨 **Premium Aesthetics**: Dark mode by default, featuring vibrant glassmorphism effects, smooth Framer Motion transitions, and modern typography.
- 📧 **Direct Communication**: Advanced contact form integrated with **Nodemailer** (via Gmail SMTP) for direct user inquiries.
- 🚀 **Performance Optimized**: Built for high-speed delivery with Next.js 16's Turbopack and Server Components.
- 🔍 **SEO Ready**: Automatically generated sitemaps and meta-data optimization for search engines.

---

## 🛠️ Technology Stack

| Core | Database & Storage | Frontend |
| :--- | :--- | :--- |
| **Framework**: Next.js 16 (App Router) | **Backend**: Supabase | **Styling**: Tailwind CSS v4 |
| **Runtime**: Node.js & React 19 | **Storage**: Supabase Buckets | **Animations**: Framer Motion |
| **Logic**: TypeScript | **Cloud**: Vercel | **Icons**: Lucide React |

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (Latest LTS)
- NPM, PNPM, or Bun

### 2. Installation
```bash
git clone https://github.com/andurila19-lgtm/Artikel.git
cd anduril-blog
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory and add your credentials:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Nodemailer (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

### 4. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to explore the blog.

---

## 📂 Project Structure

```text
├── content/              # MDX source files (ID & EN)
├── messages/             # i18n translation files
├── src/
│   ├── app/              # Next.js App Router (Locale & Admin)
│   ├── components/       # Reusable UI components
│   ├── lib/              # Content & Supabase logic
│   └── i18n/             # Routing & Middleware config
├── public/               # Static assets & article images
└── package.json          # Dependencies & Scripts
```

---

## 🗺️ Roadmap
- [ ] Admin Dashboard for browser-based article uploading.
- [ ] Comment system using Giscus or Supabase.
- [ ] Newsletter subscription with Mailchimp/Resend integration.
- [ ] Advanced search functionality using Algolia.

---

## 📄 License
This project is for educational purposes. Feel free to fork and build your own vision.

Built with 💻 by **Anduril Senior Developer**
