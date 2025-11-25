# Currency Converter Application

A modern, responsive currency conversion web application that converts Australian Dollar (AUD) to multiple target currencies with real-time exchange rates and historical data visualization.

# Screenshots

See screenshot files by searching for "Screenshot" key word

## Features

- ✅ Real-time currency conversion from AUD to 5 target currencies (CAD, EUR, GBP, NZD, USD)
- ✅ Live exchange rate updates via OpenExchangeRates API
- ✅ Historical exchange rate charts (14-day trend) [Bonus Feature]
- ✅ Responsive design - works on desktop and mobile
- ✅ Clean, modern UI with smooth animations
- ✅ Docker containerization for easy deployment

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **API**: OpenExchangeRates
- **Containerization**: Docker

## Prerequisites

- Node.js 20+ (for local development)
- Docker (for containerized deployment)
- OpenExchangeRates API key ([Get one free here](https://openexchangerates.org/signup/free))

## Getting Started

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/rajivos/currency-converter.git
cd currency-converter
\`\`\`

### 2. Set Up Environment Variables

Create a \`.env.local\` file in the root directory:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Edit \`.env.local\` and add your API key:

\`\`\`env
EXCHANGE_API_KEY=your_actual_api_key_here
\`\`\`

## Running the Application

### Option 1: Local Development (without Docker)

#### Install Dependencies

\`\`\`bash
npm install
\`\`\`

#### Run Development Server

\`\`\`bash
npm run dev
\`\`\`

The application will be available at [http://localhost:3000](http://localhost:3000)

#### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

---

### Option 2: Docker (Recommended)

#### Build the Docker Image

\`\`\`bash
docker build -t currency-converter .
\`\`\`

#### Run the Container

**Method 1: Pass environment variable directly**

\`\`\`bash
docker run -p 3000:3000 -e EXCHANGE_API_KEY=your_api_key_here currency-converter
\`\`\`

**Method 2: Use environment file**

\`\`\`bash
docker run -p 3000:3000 --env-file .env.local currency-converter
\`\`\`

The application will be available at [http://localhost:3000](http://localhost:3000)

---

### Option 3: Docker Compose (Easiest)

#### Set your API key in the environment

\`\`\`bash
export EXCHANGE_API_KEY=your_api_key_here
\`\`\`

Or create a \`.env.local\` file in the root:

\`\`\`env
EXCHANGE_API_KEY=your_api_key_here
\`\`\`

## Project Structure

\`\`\`
currency-converter/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── rates/          # Latest exchange rates endpoint
│   │   │   └── historical/     # Historical rates endpoint
│   │   ├── page.tsx            # Main page
│   │   ├── layout.tsx          # Root layout
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── CurrencyConverter.tsx
│   │   ├── CurrencyInput.tsx
│   │   ├── ConversionCard.tsx
│   │   └── ChartModal.tsx      # Historical chart (bonus)
│   ├── lib/
│   │   ├── constants.ts        # Currency definitions
│   │   ├── exchangeRateService.ts
│   │   └── utils.ts            # Helper functions
│   └── types/
│       └── currency.ts         # TypeScript types
├── public/                     # Static assets
├── Dockerfile                  # Docker configuration
├── docker-compose.yml          # Docker Compose setup
├── .env.example               # Environment variable template
└── README.md                  # This file
\`\`\`

## API Endpoints

### GET /api/rates
Returns the latest exchange rates for all currencies.

**Response:**
\`\`\`json
{
  "base": "USD",
  "rates": {
    "AUD": 1.52,
    "EUR": 0.92,
    ...
  },
  "timestamp": 1234567890
}
\`\`\`

### GET /api/historical?currency=EUR
Returns historical exchange rates for the past 14 days for a specific currency.

**Parameters:**
- \`currency\` (required): Target currency code (e.g., EUR, GBP, USD)

**Response:**
\`\`\`json
{
  "currency": "EUR",
  "data": [
    { "date": "2024-11-10", "rate": 0.92 },
    { "date": "2024-11-11", "rate": 0.93 },
    ...
  ]
}
\`\`\`

## Testing

### Manual Testing
1. Enter different amounts and verify conversions update correctly
2. Click refresh button to fetch new rates
3. Click on any currency card to view historical chart
4. Test responsive design on different screen sizes
5. Test error handling by temporarily using invalid API key

### API Testing
\`\`\`bash
# Test latest rates
curl http://localhost:3000/api/rates

# Test historical rates
curl http://localhost:3000/api/historical?currency=EUR
\`\`\`

## Troubleshooting

### Issue: "API key not configured" error
**Solution**: Ensure \`.env.local\` or environment variable is set correctly with your OpenExchangeRates API key.

### Issue: Docker container fails to start
**Solution**: 
1. Check if port 3000 is already in use: \`lsof -i :3000\`
2. Verify API key is passed correctly
3. Check Docker logs: \`docker logs <container_id>\`

### Issue: Rates not updating
**Solution**: 
1. Verify your API key is valid at openexchangerates.org
2. Check API rate limits (free tier: 1,000 requests/month)
3. Check browser console for errors

### Issue: Historical chart not loading
**Solution**: Historical data requires multiple API calls. Ensure you haven't exceeded your API rate limit.

## Author

Rajiv Khushiram 


## Step 8: Test the Docker build
```bash
# Build the image
docker build -t currency-converter .

# Run it
docker run -p 3000:3000 -e EXCHANGE_API_KEY=your_actual_key currency-converter

# Or with docker-compose
docker-compose up --build
```

---

## Step 9: Final commit
```bash
git add .
git commit -m "Add Docker configuration and comprehensive README"
```

---

## Step 10: Create the submission package
```bash
# Create a clean build
docker build -t currency-converter .

# Test it works
docker run -p 3000:3000 -e EXCHANGE_API_KEY=your_key currency-converter
```
