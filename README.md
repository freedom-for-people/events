# Event Landing Page with Admin Panel

A modern, minimal web application for displaying and managing events. Built with React, TypeScript, Tailwind CSS, and Supabase.

## ✨ Features

- **Public Landing Page**: Browse all events organized by country
- **Admin Panel**: Secure interface for managing events (create, edit, delete)
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Modern UI**: Clean, minimal aesthetic with smooth animations
- **Real-time Data**: Powered by Supabase for instant updates

## 🚀 Quick Start

**⚠️ IMPORTANT: You must set up Supabase before running the application!**

See **[SETUP.md](./SETUP.md)** for detailed setup instructions.

### Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works great)

### Installation

1. **Clone and install dependencies:**
   ```bash
   cd event-landing-page
   npm install
   ```

2. **Set up Supabase:**
   - Follow the complete guide in [SETUP.md](./SETUP.md)
   - Create a Supabase project
   - Run the database migrations
   - Create a `.env` file with your credentials

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - Landing page: [http://localhost:5173](http://localhost:5173)
   - Admin login: [http://localhost:5173/login](http://localhost:5173/login)

## 📁 Project Structure

```
event-landing-page/
├── src/
│   ├── components/       # React components
│   │   ├── landing/     # Public landing page components
│   │   ├── admin/       # Admin panel components
│   │   └── shared/      # Reusable UI components
│   ├── contexts/        # React Context providers
│   ├── services/        # API and service layer
│   ├── pages/           # Page components
│   └── types/           # TypeScript type definitions
├── supabase/
│   └── migrations/      # Database migration files
└── .env.example         # Environment variable template
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Lint code

## 🔧 Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Authentication)
- **Build Tool**: Vite
- **Deployment**: Netlify-ready

## 📖 Documentation

- **[SETUP.md](./SETUP.md)** - Complete setup guide
- **[.env.example](./.env.example)** - Environment variables reference
- **[Design Document](./.kiro/specs/event-landing-page/design.md)** - Technical design
- **[Requirements](./.kiro/specs/event-landing-page/requirements.md)** - Feature requirements

## 🐛 Troubleshooting

### Blank landing page?
- Check the browser console for errors (F12)
- Verify your `.env` file exists and has correct Supabase credentials
- Ensure database migrations have been run
- Add some sample events to the database (see SETUP.md)

### Can't log in to admin panel?
- Verify you created an admin user in Supabase Authentication
- Check that email and password are correct

### "Missing Supabase environment variables" error?
- Create a `.env` file based on `.env.example`
- Restart the development server after creating the file

See [SETUP.md](./SETUP.md) for more troubleshooting tips.

## 📝 License

MIT
