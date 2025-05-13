# Write It Down - Personal Journal App

A beautiful, secure, and feature-rich journaling application built with Next.js, Clerk, and Prisma. Created by Pedram.

## Features

- 🔐 **Secure Authentication**
  - Sign up and sign in with Clerk
  - Protected routes and secure user data
  - Seamless authentication flow

- 📝 **Journal Management**
  - Create, read, update, and delete journal entries
  - Rich text editing experience
  - Mood tracking for each entry
  - Image upload support
  - Beautiful dark purple theme

- 🎨 **Modern UI/UX**
  - Responsive design for all devices
  - Smooth animations and transitions
  - Intuitive navigation
  - Loading states and error handling
  - Beautiful dark mode interface

- 🛠 **Tech Stack**
  - Next.js 14 with App Router
  - Clerk for authentication
  - Prisma with PostgreSQL (Neon)
  - Tailwind CSS for styling
  - Framer Motion for animations

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- A Clerk account
- A Neon PostgreSQL database

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

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   DATABASE_URL=your_neon_database_url
   ```

4. Set up the database:
   ```bash
   pnpm prisma db push
   ```

5. Start the development server:
   ```bash
   pnpm dev
   ```

The application will be available at `http://localhost:3000`.

## Project Structure

```
write-it-down/
├── app/
│   ├── api/           # API routes
│   ├── journal/       # Journal pages
│   ├── sign-in/       # Authentication pages
│   ├── sign-up/
│   ├── error.tsx      # Error handling
│   ├── loading.tsx    # Loading states
│   └── not-found.tsx  # 404 page
├── components/        # Reusable components
├── lib/              # Utility functions
├── prisma/           # Database schema
└── public/           # Static assets
```

## Features in Detail

### Authentication
- Secure sign-up and sign-in with Clerk
- Protected routes for authenticated users
- Automatic redirection for unauthenticated users

### Journal Entries
- Create new journal entries with title, content, and mood
- Upload images to enhance your entries
- Edit existing entries
- Delete entries with confirmation
- View all entries in a beautiful grid layout

### User Experience
- Smooth page transitions
- Loading states for better feedback
- Error handling with user-friendly messages
- Responsive design for all screen sizes
- Dark mode interface with purple accents

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with Next.js
- Authentication powered by Clerk
- Database managed by Prisma
- Styling with Tailwind CSS
- Animations with Framer Motion

---

Made with 💖 and ☕ by [Your Name]

Happy Journaling! 📖✨
