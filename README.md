# ✨ Write It Down - Your Digital Journal ✨

A beautiful and secure journal app where you can write down your thoughts, feelings, and memories. Built with modern technologies and a sprinkle of magic! 🌟

## 🎨 Features

- 📝 Write and save your journal entries
- 🔒 Secure authentication with Clerk
- 🎯 Protected routes for your private thoughts
- 💫 Beautiful UI with Tailwind CSS
- 🚀 Fast and responsive with Next.js
- 🗄️ Reliable data storage with PostgreSQL
- 🎭 Track your mood with each entry
- 📱 Mobile-friendly design

## 🛠️ Tech Stack

- ⚡ Next.js 14 (App Router)
- 🔐 Clerk Authentication
- 🎨 Tailwind CSS
- 🗄️ Prisma ORM
- 🐘 PostgreSQL
- 📦 pnpm Package Manager

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm 8+
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/write-it-down.git
cd write-it-down
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up your environment variables:
Create a `.env` file in the root directory with:
```env
DATABASE_URL="postgresql://your_username:your_password@localhost:5432/journal_app"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

4. Set up the database:
```bash
pnpm prisma generate
pnpm prisma db push
```

5. Start the development server:
```bash
pnpm dev
```

Visit `http://localhost:3000` and start journaling! 🎉

## 📝 How to Use

1. Sign up or log in to your account
2. Click "New Entry" to create a journal entry
3. Add a title, write your thoughts, and optionally add your mood
4. Save your entry and revisit it anytime!

## 🎯 Project Structure

```
write-it-down/
├── app/                # Next.js app directory
│   ├── api/           # API routes
│   ├── journal/       # Journal pages
│   └── layout.tsx     # Root layout
├── lib/               # Utility functions
├── prisma/            # Database schema
└── public/            # Static assets
```

## 🤝 Contributing

Feel free to contribute to this project! All contributions are welcome.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to all the amazing open-source projects that made this possible
- Special thanks to the Next.js team for their incredible framework
- And to you, for using this app! 💖

---

Made with 💖 and ☕ by [Your Name]

Happy Journaling! 📖✨
