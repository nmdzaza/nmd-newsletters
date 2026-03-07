---
name: market-bot
description: >
  Use this skill for anything related to the NMD Market Telegram bot and marketplace.
  Triggers include: "NMD Market", "Telegram bot", "market bot", "marketplace listing",
  "escrow bot", "Groq bot", "NMD Market article", "generate marketplace content",
  "bot welcome sequence", "bot FAQ response", "Telegram marketplace", "manage NMD Market",
  "market bot update", "write a bot message", "bot customer service".
version: 0.1.0
---

# NMD Market Bot

NMD Market is a Telegram-based marketplace with AI-powered automation. Three main bots:

1. **Marketplace Bot** — listings, escrow, user management, messaging
2. **AI Assistant Bot** — welcome sequences, FAQ, customer service (powered by Groq)
3. **Article Generation Bot** — generates content for the market, pushes to feed

## Architecture Overview

See `references/bot-architecture.md` for full technical spec.

- **Backend**: Supabase (PostgreSQL) — `nmd_market` database
- **AI**: Groq API (fast inference, LLaMA / Mixtral models)
- **Messaging**: Telegram Bot API
- **Escrow**: On-chain or manual escrow handled in-bot

## Key Tables (Supabase `nmd_market`)

| Table | Purpose |
|-------|---------|
| `users` | Telegram user profiles, trust score, join date |
| `listings` | Active marketplace listings |
| `messages` | In-bot DMs between buyers/sellers |
| `escrow` | Escrow transactions (amount, buyer, seller, status) |
| `articles` | AI-generated market content |
| `bot_responses` | FAQ and canned responses |

## Marketplace Bot Workflows

### New Listing Flow
1. Seller sends `/list` command
2. Bot asks: title, description, price, category, photos
3. Bot validates and creates record in `listings` table
4. Bot posts listing to market channel with ID
5. Bot sends seller confirmation with listing link

### Escrow Flow
1. Buyer sends `/buy [listing_id]`
2. Bot confirms listing details and price
3. Bot initiates escrow: creates `escrow` record, requests payment
4. Buyer sends funds (crypto or manual)
5. Admin confirms receipt → bot notifies seller to ship/deliver
6. Buyer confirms receipt → bot releases funds to seller
7. If dispute: bot flags for admin review

### User Trust System
- New users start at trust score 0
- Each completed transaction: +10 points
- Each dispute lost: -25 points
- Verified users (ID submitted): +50 base
- Trust score shown on profile

## AI Assistant Bot (Groq-Powered)

The assistant handles inbound messages that aren't slash commands.

### Welcome Sequence (New User Joins)

Message 1 (immediate):
```
👋 Welcome to NMD Market! I'm your AI assistant.

NMD Market is a private marketplace for buyers and sellers with escrow protection.

Here's how to get started:
• /list — Post a listing
• /browse — Browse active listings
• /help — Full command list

What brings you here today?
```

Message 2 (24 hours later, if no activity):
```
Hey [name] — still here if you need anything.

Most new members start by browsing our latest listings 👇
/browse

Or if you have something to sell, /list takes about 2 minutes.
```

### FAQ Responses

When user asks about fees:
```
NMD Market charges a 3% escrow fee on completed transactions — this covers payment protection for both buyer and seller. No fee if the deal doesn't close.
```

When user asks about disputes:
```
If there's an issue with your transaction, type /dispute [transaction_id] and our team reviews within 24 hours. Escrow funds are held until resolved.
```

When user asks about listings:
```
Listings are free to post. Use /list to get started — you'll need a title, price, and description. Photos are optional but strongly recommended.
```

## Article Generation Bot

Generates marketplace content and pushes to the NMD Market channel.

### Trigger
Admin sends `/generate article [topic]` or bot runs on schedule.

### Workflow
1. Receive topic or pull from content queue
2. Call Groq API with article generation prompt
3. Format as Telegram message (no markdown tables — use plain text)
4. Post to market channel or return to admin for review

### Article Types
- Market trend reports ("Most popular categories this week")
- How-to guides ("How to list safely on NMD Market")
- Community spotlights ("Top seller of the month")
- Product features ("New escrow upgrade — what's changed")

## Groq API Integration

Model preference: `llama-3.1-70b-versatile` or `mixtral-8x7b-32768`

Prompt pattern for FAQ/assistant:
```
You are the NMD Market AI assistant. You help buyers and sellers on a Telegram marketplace.
Be concise, friendly, and direct. Never make up policies — if unsure, say "reach out to admin @nmdzaza".

User message: [MESSAGE]
Respond in under 100 words.
```

## Admin Commands

- `/stats` — active listings, total users, volume today
- `/broadcast [message]` — send to all users
- `/ban [user_id]` — ban user
- `/refund [escrow_id]` — manually trigger refund
- `/generate article [topic]` — trigger article bot
