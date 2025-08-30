# DevTinder Frontend

A modern, responsive React frontend for the DevTinder platform - where developers connect, collaborate, and grow together.

## 🚀 Features

- **Modern UI/UX**: Built with Tailwind CSS and Framer Motion for smooth animations
- **Responsive Design**: Mobile-first approach that works on all devices
- **Authentication**: Complete login/signup system with JWT tokens
- **User Profiles**: View and edit user profiles with skills and information
- **Developer Feed**: Swipe through developer profiles with like/dislike/super-like actions
- **Connection Management**: Handle incoming requests and view accepted connections
- **Real-time Updates**: Toast notifications and real-time state management
- **Search & Filters**: Advanced search and filtering capabilities

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks and functional components
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Framer Motion** - Production-ready motion library for React
- **React Router** - Declarative routing for React
- **Axios** - Promise-based HTTP client for API calls
- **React Hot Toast** - Beautiful toast notifications
- **React Icons** - Popular icon library for React

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running (see backend setup)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Backend URL

The frontend is configured to proxy requests to `http://localhost:3001` by default. If your backend runs on a different port, update the `proxy` field in `package.json`.

### 3. Start Development Server

```bash
npm start
```

The application will open at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the frontend root directory:

```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_ENV=development
```

### Tailwind CSS

The project uses Tailwind CSS with custom configuration. You can modify:

- `tailwind.config.js` - Custom colors, animations, and theme extensions
- `src/index.css` - Custom component classes and utilities

## 📱 Pages & Components

### Pages
- **Home** (`/`) - Landing page with features and signup/login
- **Login** (`/login`) - User authentication
- **Signup** (`/signup`) - User registration
- **Feed** (`/feed`) - Main developer discovery feed
- **Profile** (`/profile`) - User profile management
- **Connections** (`/connections`) - Accepted connections
- **Requests** (`/requests`) - Incoming connection requests

### Components
- **Navbar** - Navigation with user menu and mobile responsiveness
- **AuthContext** - Authentication state management
- **Protected Routes** - Route protection for authenticated users

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6) - Main brand color
- **Secondary**: Orange (#F59E0B) - Accent color
- **Success**: Green (#10B981) - Positive actions
- **Danger**: Red (#EF4444) - Destructive actions
- **Warning**: Orange (#F59E0B) - Caution states

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800

### Components
- **Buttons**: Multiple variants (primary, secondary, success, danger, warning)
- **Cards**: Consistent card design with hover effects
- **Forms**: Styled form inputs with validation states
- **Modals**: Animated modal components

## 🔌 API Integration

The frontend integrates with the DevTinder backend API:

### Authentication Endpoints
- `POST /api/signup` - User registration
- `POST /api/login` - User authentication
- `POST /api/logout` - User logout

### User Endpoints
- `GET /api/profile/view` - Get user profile
- `PATCH /api/profile/edit` - Update user profile
- `PATCH /api/profile/password` - Change password

### Connection Endpoints
- `GET /api/feed` - Get developer feed
- `POST /api/request/send/:status/:userId` - Send connection request
- `POST /api/request/review/:status/:requestId` - Review connection request
- `GET /api/user/connections` - Get accepted connections
- `GET /api/user/requests/received` - Get incoming requests

## 🎯 Key Features

### Developer Discovery
- **Swipe Interface**: Like/dislike/super-like developers
- **Advanced Filters**: Filter by gender, age, and skills
- **Search**: Search developers by name or skills
- **Pagination**: Load more developers as needed

### Connection Management
- **Request Handling**: Accept/reject incoming requests
- **Connection Viewing**: See all accepted connections
- **Status Tracking**: Track request and connection statuses

### User Experience
- **Responsive Design**: Works on all device sizes
- **Smooth Animations**: Framer Motion powered transitions
- **Toast Notifications**: User feedback for actions
- **Loading States**: Skeleton loaders and spinners

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## 📦 Build & Deployment

### Development Build
```bash
npm run build
```

### Production Optimization
The build process includes:
- Code splitting and lazy loading
- Tree shaking for unused code
- CSS optimization and minification
- Asset optimization

### Deployment
The built application can be deployed to:
- **Vercel**: Zero-config deployment
- **Netlify**: Drag and drop deployment
- **AWS S3**: Static website hosting
- **GitHub Pages**: Free hosting for open source

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Route-level access control
- **Input Validation**: Client-side form validation
- **XSS Protection**: React's built-in XSS protection
- **CSRF Protection**: Backend handles CSRF protection

## 🌟 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Support

For support and questions:
- Create an issue in the repository
- Check the backend documentation
- Review the API endpoints

## 🎉 Acknowledgments

- **Tailwind CSS** for the amazing utility-first CSS framework
- **Framer Motion** for smooth animations
- **React Icons** for the comprehensive icon library
- **React Hot Toast** for beautiful notifications

---

Built with ❤️ for the developer community
