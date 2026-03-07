# NMD Market Bot Architecture

## System Components

```
Telegram User
     │
     ▼
Telegram Bot API (webhook or polling)
     │
     ├── Slash commands → Marketplace Bot logic
     ├── Natural language → Groq AI Assistant
     └── Admin commands → Article Generator
          │
          ▼
     Supabase (nmd_market DB)
     PostgreSQL + Row-Level Security
          │
          ├── users table
          ├── listings table
          ├── escrow table
          ├── messages table
          └── articles table
```

## Supabase Schema

### users
```sql
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  telegram_id BIGINT UNIQUE NOT NULL,
  username TEXT,
  first_name TEXT,
  trust_score INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT false,
  joined_at TIMESTAMP DEFAULT NOW(),
  last_active TIMESTAMP,
  is_banned BOOLEAN DEFAULT false
);
```

### listings
```sql
CREATE TABLE listings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id UUID REFERENCES users(id),
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT,
  photos TEXT[], -- array of Telegram file_ids or URLs
  status TEXT DEFAULT 'active', -- active, sold, cancelled
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP
);
```

### escrow
```sql
CREATE TABLE escrow (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id UUID REFERENCES listings(id),
  buyer_id UUID REFERENCES users(id),
  seller_id UUID REFERENCES users(id),
  amount DECIMAL(10,2) NOT NULL,
  fee DECIMAL(10,2), -- 3% of amount
  status TEXT DEFAULT 'pending', -- pending, funded, delivered, released, disputed, refunded
  payment_method TEXT,
  payment_reference TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);
```

### messages
```sql
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  from_user_id UUID REFERENCES users(id),
  to_user_id UUID REFERENCES users(id),
  listing_id UUID REFERENCES listings(id),
  content TEXT,
  sent_at TIMESTAMP DEFAULT NOW(),
  read BOOLEAN DEFAULT false
);
```

### articles
```sql
CREATE TABLE articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  topic TEXT,
  content TEXT,
  telegram_message_id BIGINT,
  posted_at TIMESTAMP,
  generated_by TEXT DEFAULT 'groq',
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Groq API Config

```
Base URL: https://api.groq.com/openai/v1
API Key: GROQ_API_KEY (env var)
Model: llama-3.1-70b-versatile (fast, high quality)
Temperature: 0.7 for assistant, 0.9 for article generation
Max tokens: 200 for FAQ, 800 for articles
```

## Bot Config (Environment Variables)

```
TELEGRAM_BOT_TOKEN=
SUPABASE_URL=
SUPABASE_SERVICE_KEY=
GROQ_API_KEY=
ADMIN_TELEGRAM_ID=
MARKET_CHANNEL_ID=
ESCROW_WALLET_ADDRESS= (if crypto)
```

## Deployment Notes

- Bot can run as a long-polling script or webhook (Railway, Render, or VPS)
- Supabase handles auth + DB — no separate backend server needed for basic flows
- Groq handles AI — fast inference, no rate limit issues at current scale
- For scheduled article generation: use a cron job or Supabase Edge Functions

## Error Handling

- If Groq API fails: fall back to static FAQ responses from `bot_responses` table
- If Supabase is down: log error, notify admin via direct Telegram message to admin ID
- Unhandled commands: "I didn't understand that. Type /help for a list of commands."
- Spam detection: rate limit to 10 messages/minute per user; auto-mute if exceeded
