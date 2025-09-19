# 🌺 Dewataksu - Bali Tourism & Cultural Platform

**Dewataksu** is a modern full-stack web application that celebrates the beauty and cultural richness of Bali and Indonesia. Named after the Balinese concept of "taksu" (spiritual energy and divine inspiration), this platform connects travelers with authentic Balinese experiences, cultural traditions, and tourism destinations.

## ✨ Features

### 🏖️ Tourism Destinations
- **Comprehensive Database**: Explore 20+ curated destinations across Indonesia
- **Smart Organization**: Browse by districts (Gianyar, Badung, Tabanan, etc.) and categories
- **Rich Information**: Detailed descriptions, pricing, addresses, and map integration
- **User Engagement**: Like, bookmark, and comment on destinations
- **Advanced Search**: Filter by price, location, popularity, and more

### 🎭 Cultural Traditions
- **Cultural Heritage**: Learn about authentic Balinese Hindu traditions and ceremonies
- **Educational Content**: Detailed explanations of Ngaben, Galungan, Nyepi, Kecak Dance, and more
- **Preservation**: Digital preservation of cultural practices and their significance

### 📖 Travel Stories
- **Community Platform**: Share and discover personal travel experiences
- **User-Generated Content**: Write and publish your own Bali adventures
- **Inspiration Hub**: Find travel guides and tips from fellow explorers

### 👥 User Management
- **Role-Based Access**: Admin and User roles with appropriate permissions
- **Authentication**: Secure user registration and login
- **Content Moderation**: Admin controls for managing community content

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS with dark/light theme support
- **UI Components**: Radix UI primitives
- **Backend**: Next.js API routes
- **Database**: Prisma ORM
- **Authentication**: Better-auth
- **Validation**: Zod schemas
- **Icons**: Lucide React

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Database (PostgreSQL, MySQL, or SQLite)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fullstack
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment setup**
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL="your-database-connection-string"
   NEXTAUTH_SECRET="your-auth-secret"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Database setup**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push database schema
   npm run db:push
   
   # Seed database with sample data
   npm run db:seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:seed      # Seed database with sample data
npm run db:pull      # Pull schema from database
npm run db:studio    # Open Prisma Studio
```

## 🗂️ Project Structure

```
fullstack/
├── src/
│   ├── app/                 # Next.js app directory
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Utility functions and configurations
│   └── middleware.ts        # Next.js middleware
├── prisma/
│   ├── schema/              # Prisma schema files
│   └── seed.js              # Database seeding script
├── doc/                     # API documentation
│   ├── destination.md
│   ├── tradition.md
│   ├── story.md
│   └── ...
├── public/                  # Static assets
├── rest/                    # API testing files
└── components.json          # Shadcn/ui configuration
```

## 📚 API Documentation

The project includes comprehensive API documentation for all endpoints:

- **[Destinations API](./doc/destination.md)** - Tourist destinations management
- **[Traditions API](./doc/tradition.md)** - Cultural traditions content
- **[Stories API](./doc/story.md)** - User-generated travel stories
- **[Districts API](./doc/district.md)** - Bali regional divisions
- **[Categories API](./doc/category.md)** - Content categorization
- **[Users API](./doc/user.md)** - User management
- **[Likes API](./doc/like.md)** - User engagement
- **[Bookmarks API](./doc/bookmark.md)** - Content bookmarking
- **[Comments API](./doc/comment.md)** - Community discussions

## 🎨 Sample Data

The project includes rich seed data featuring:

### 🏖️ Destinations (20+)
- Kuta Beach, Bali
- Mount Bromo, East Java
- Borobudur Temple, Central Java
- Komodo Island, East Nusa Tenggara
- Raja Ampat Islands, West Papua
- And many more...

### 🎭 Traditions (7)
- Ngaben Ceremony (Cremation ritual)
- Galungan and Kuningan (Major holidays)
- Nyepi Day (Day of Silence)
- Kecak Dance (Traditional performance)
- Barong Dance (Good vs evil story)
- Canang Sari (Daily offerings)
- Omed-omedan (Kissing festival)

### 📍 Districts (8)
All major Bali districts: Gianyar, Badung, Karangasem, Tabanan, Jembrana, Buleleng, Bangli, Klungkung

## 🔐 Authentication

The application uses role-based authentication:

- **Admin Users**: Full content management capabilities
- **Regular Users**: Can create stories, like, bookmark, and comment
- **Public Access**: Browse destinations and traditions without authentication

Default admin credentials (after seeding):
- Email: `admin@gmail.com`
- Role: ADMIN

## 🌐 Deployment

The application is optimized for deployment on Vercel:

1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically with each push

For other platforms, run:
```bash
npm run build
npm run start
```

## 🤝 Contributing

We welcome contributions to improve Dewataksu! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by the rich cultural heritage of Bali and Indonesia
- Built with modern web technologies for optimal performance
- Designed to promote sustainable and cultural tourism

## 📞 Support

For support, questions, or suggestions:
- Create an issue on GitHub
- Contact the development team

---

**Made with ❤️ for preserving and sharing the beauty of Balinese culture and Indonesian tourism**
