# March 6 Full-Stack Application 🚀

A beautiful, modern full-stack application with comprehensive testing, CI/CD pipeline, and Docker containerization.

## ✨ Features

- **Modern UI**: Beautiful glassmorphism design with Tailwind CSS
- **Full-Stack**: React frontend with Node.js/Express backend
- **Comprehensive Testing**: Unit tests, integration tests, and E2E tests
- **CI/CD Pipeline**: GitHub Actions with automated testing and deployment
- **Docker Support**: Production-ready containerization
- **Responsive Design**: Works seamlessly on all devices
- **Real-time Updates**: Dynamic user management system

## 🏗️ Architecture

```
march6/
├── client/                 # React frontend
│   ├── src/
│   │   ├── App.js         # Main application component
│   │   ├── App.test.js    # Frontend unit tests
│   │   └── index.css      # Tailwind CSS styling
│   ├── package.json
│   └── tailwind.config.js
├── server/                 # Node.js backend
│   ├── index.js           # Express server
│   ├── api.test.js        # Backend unit tests
│   ├── healthcheck.js     # Docker health check
│   └── package.json
├── e2e-tests/             # Playwright E2E tests
│   ├── dashboard.spec.js
│   ├── package.json
│   └── playwright.config.js
├── .github/workflows/     # CI/CD pipeline
│   └── ci.yml
├── Dockerfile             # Production container
├── Dockerfile.dev         # Development container
├── docker-compose.yml     # Multi-service orchestration
└── package.json           # Root package.json
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd march6
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd server && npm install
   cd ../client && npm install
   cd ../e2e-tests && npm install
   ```

3. **Start development servers**
   ```bash
   npm run dev
   ```
   This will start both the React dev server (port 3000) and Node.js API server (port 3001).

### Docker Development

1. **Development with hot reload**
   ```bash
   docker-compose --profile dev up
   ```

2. **Production build**
   ```bash
   docker-compose up march6-app
   ```

3. **Build and run container**
   ```bash
   npm run docker:build
   npm run docker:run
   ```

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Backend Tests
```bash
npm run test:server
```

### Frontend Tests
```bash
npm run test:client
```

### E2E Tests
```bash
npm run test:e2e
```

### Test Coverage
- Backend: Jest with Supertest
- Frontend: React Testing Library
- E2E: Playwright (Chrome, Firefox, Safari)

## 🔄 CI/CD Pipeline

The GitHub Actions pipeline includes:

- **Backend Testing**: Unit tests with coverage reporting
- **Frontend Testing**: Component tests with coverage reporting
- **E2E Testing**: Cross-browser end-to-end tests
- **Docker Build**: Multi-stage production builds
- **Security Scanning**: Trivy vulnerability scanner
- **Deployment**: Automated staging and production deployments

### Pipeline Triggers
- Push to `main` → Full pipeline + production deployment
- Push to `develop` → Full pipeline + staging deployment
- Pull requests → Full pipeline (no deployment)

## 🐳 Docker Configuration

### Production Image
- Multi-stage build for optimization
- Non-root user for security
- Health checks included
- Minimal attack surface

### Development Image
- Hot reload support
- Volume mounting for live updates
- Development dependencies included

## 📊 Application Features

### Dashboard
- Real-time statistics display
- Animated UI elements
- Glassmorphism design
- Responsive layout

### User Management
- View team members
- Add new users
- Form validation
- Modal interactions

### API Endpoints
- `GET /api/health` - Health check
- `GET /api/users` - List users
- `POST /api/users` - Create user
- `GET /api/stats` - Application statistics

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI framework
- **Tailwind CSS** - Utility-first CSS
- **Lucide React** - Icon library
- **Axios** - HTTP client
- **React Testing Library** - Testing framework

### Backend
- **Node.js 18** - Runtime environment
- **Express** - Web framework
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger
- **Jest** - Testing framework
- **Supertest** - HTTP assertion testing

### Testing & CI/CD
- **Playwright** - E2E testing
- **GitHub Actions** - CI/CD pipeline
- **Codecov** - Coverage reporting
- **Trivy** - Security scanning

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Multi-stage builds** - Production optimization

## 📝 Environment Variables

Create a `.env` file in the server directory:

```env
PORT=3001
NODE_ENV=development
```

## 🚀 Deployment

### Production Deployment
1. Build the Docker image:
   ```bash
   docker build -t march6 .
   ```

2. Run with Docker Compose:
   ```bash
   docker-compose up -d march6-app
   ```

### Environment-Specific Configurations
- **Development**: Hot reload, verbose logging
- **Staging**: Production build, testing environment
- **Production**: Optimized build, security hardening

## 📈 Monitoring

### Health Checks
- Application health endpoint: `/api/health`
- Docker health checks every 30 seconds
- Graceful startup and shutdown

### Logging
- Structured logging with Morgan
- Request/response tracking
- Error reporting

## 🔒 Security

- Helmet.js for security headers
- Non-root Docker user
- Dependency scanning in CI/CD
- CORS configuration
- Input validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Playwright team for excellent E2E testing tools
- Docker team for containerization technology

---

**Built with ❤️ for modern web development**
