# E-commerce App 🛍️

Main shopping application for the e-commerce microfront-end architecture.

## 🚀 Features

- Product catalog and browsing
- Shopping cart management
- Product search and filtering
- Wishlist management
- Order history
- Responsive design
- Integration with checkout process

## 🛠️ Technologies

- Next.js 14
- React.js
- Ant Design
- Context API for state management
- CSS Modules for styling
- Jest & Testing Library for tests

## 📋 Prerequisites

- Node.js 20.x or later
- npm or yarn
- Docker (for containerized environment)

## 🏃‍♂️ Running the Project

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
NEXT_PUBLIC_PROXY_URL=http://localhost:8080
NEXT_PUBLIC_CHECKOUT_APP_URL=http://localhost:8080/checkout
```

3. Start the development server:
```bash
npm run dev
```

### Using Docker

```bash
docker compose up ecommerce-app
```

The application will be available at:
- Local: http://localhost:3000
- Docker: http://localhost:8080 (via proxy)

## 🧪 Testing

Run unit tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

## 📁 Project Structure

```
ecommerce-app/
├── src/
│   ├── app/          # Next.js app directory
│   ├── components/   # React components
│   ├── contexts/     # React contexts
│   ├── services/     # API services
│   └── styles/       # CSS modules
├── public/           # Static files
└── tests/           # Test files
```

## 🔄 Dependencies

This project is part of a microfront-end architecture and requires:
- `ecommerce-proxy` - API Gateway/BFF
- `checkout-app` - Checkout process

## 📚 Available Scripts

- `npm run dev` - Run development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint