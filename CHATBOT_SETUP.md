# AI Chatbot Setup Guide

Your website now includes an AI-powered chatbot that can answer customer questions about Collation AI products and services. The chatbot uses Claude AI with prompt caching for cost-effective operation.

## Setup Instructions

### Step 1: Get Your Claude API Key

1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign up or log in to your account
3. Navigate to **Settings** → **API Keys**
4. Click **Create Key**
5. Copy your API key (it starts with `sk-ant-`)

### Step 2: Configure Your API Key

1. In your project root, create a file named `.env.local`:
   ```bash
   touch .env.local
   ```

2. Add your API key to `.env.local`:
   ```
   ANTHROPIC_API_KEY=sk-ant-api03-your-actual-api-key-here
   ```

3. **IMPORTANT**: Never commit `.env.local` to git (it's already in `.gitignore`)

### Step 3: Restart the Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 4: Test the Chatbot

1. Visit http://localhost:3000
2. Click the blue "Chat with us" button in the bottom right
3. Ask a question like: "What does Collation AI do?"
4. The chatbot should respond with information about your products

## Adding Your Product Information

The chatbot's knowledge base is located in:
```
lib/knowledge/product-info.ts
```

### Option 1: Update the Knowledge Base File (Recommended)

Edit `lib/knowledge/product-info.ts` and replace the placeholder content with your actual product information.

**What to include:**
- Product features and capabilities
- Pricing information (general tiers)
- Use cases and industries served
- Technical specifications
- Integration information
- Security and compliance details
- FAQs

### Option 2: Share PowerPoint/Documents with Me

You can provide:
- PowerPoint presentations (.pptx)
- PDF documents
- Word documents
- Or just copy/paste text

I'll extract the information and update the knowledge base for you.

## How It Works

### Architecture

```
User Browser → Chatbot UI Component
              ↓
              Next.js API Route (/api/chat)
              ↓
              Claude API (with cached knowledge base)
              ↓
              Response → Display to User
```

### Security Features

✅ **API Key Protection**: Your API key stays on the server, never exposed to browsers
✅ **Environment Variables**: Secure key storage
✅ **Error Handling**: Graceful failures with helpful messages
✅ **Rate Limiting Ready**: Built-in structure for rate limiting

### Cost Optimization

The chatbot uses **Prompt Caching** which reduces costs by up to 90%:

- First request: Full knowledge base is cached (~5 minutes)
- Subsequent requests: Use cached knowledge base (much cheaper)
- Cache lasts 5 minutes, then refreshes automatically

**Typical Costs** (as of 2024):
- Input tokens (cached): $0.30 per million tokens
- Input tokens (uncached): $3.00 per million tokens
- Output tokens: $15.00 per million tokens

A typical conversation costs $0.01-0.05 depending on length.

## Customization

### Change the Appearance

Edit `components/Chatbot.tsx` to customize:
- Colors and styling
- Button position
- Chat window size
- Welcome message
- Brand name and logo

### Modify the System Prompt

Edit `lib/knowledge/product-info.ts` → `SYSTEM_PROMPT` to change:
- Chatbot personality
- Response style
- Escalation rules
- Call-to-action messages

### Add Rate Limiting

To prevent abuse, you can add rate limiting to `/app/api/chat/route.ts`:

```typescript
// Example: Limit to 10 messages per IP per minute
import { ratelimit } from '@/lib/ratelimit'

const limiter = ratelimit({
  limit: 10,
  duration: '1m'
})
```

## Monitoring and Analytics

### Monitor Usage

1. Check Anthropic Console: https://console.anthropic.com/
2. View usage statistics, costs, and API calls
3. Set spending limits to control costs

### Add Analytics (Optional)

Track chatbot usage by adding analytics to `components/Chatbot.tsx`:

```typescript
// When sending a message
analytics.track('chatbot_message_sent', {
  question: input,
  timestamp: new Date()
})
```

## Troubleshooting

### "API key not configured" Error

**Cause**: API key is not set in `.env.local`

**Solution**:
1. Create `.env.local` file in project root
2. Add `ANTHROPIC_API_KEY=your-key-here`
3. Restart the dev server

### "Invalid API key" Error

**Cause**: API key is incorrect or expired

**Solution**:
1. Check your API key in Anthropic Console
2. Generate a new key if needed
3. Update `.env.local`

### Chatbot Not Appearing

**Cause**: Component might not be loaded

**Solution**:
1. Clear browser cache
2. Check browser console for errors
3. Ensure `Chatbot` component is in `app/layout.tsx`

### Slow Responses

**Cause**: Large knowledge base or slow API

**Solution**:
1. Prompt caching helps after first request
2. Consider reducing knowledge base size
3. Use shorter system prompts

## Best Practices

### Knowledge Base

✅ **Do:**
- Keep information accurate and up-to-date
- Include specific product details
- Add common FAQs
- Structure information clearly

❌ **Don't:**
- Include sensitive customer data
- Store API keys or credentials
- Add too much irrelevant information (increases costs)

### Escalation Strategy

Configure the chatbot to escalate these to human support:
- Account-specific issues
- Billing questions
- Complex technical problems
- Sales negotiations requiring custom pricing

### Response Quality

To improve response quality:
- Provide comprehensive product documentation
- Include examples and use cases
- Add troubleshooting guides
- Update knowledge base based on user questions

## Deployment

When deploying to production:

### Vercel (Recommended)

1. Add `ANTHROPIC_API_KEY` to Vercel environment variables:
   - Go to Project Settings → Environment Variables
   - Add `ANTHROPIC_API_KEY` with your key
   - Deploy

### Other Platforms

Ensure your hosting platform supports:
- Next.js API routes
- Environment variables
- Node.js runtime

## Next Steps

1. ✅ Set up your API key
2. ✅ Test the chatbot
3. 📝 Update the knowledge base with your product info
4. 🎨 Customize the appearance (optional)
5. 📊 Monitor usage and costs
6. 🚀 Deploy to production

## Need Help?

- **Anthropic Documentation**: https://docs.anthropic.com/
- **Claude API Reference**: https://docs.anthropic.com/claude/reference/
- **Prompt Caching Guide**: https://docs.anthropic.com/claude/docs/prompt-caching

---

**Ready to add your product information?** Share your PowerPoint presentations or documentation, and I'll update the knowledge base for you!
