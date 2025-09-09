# 🔒 Patch Security Testing Guide

Complete guide for testing Patch's hardened security features.

## 🛡️ **Security Features Implemented**

### **1. CORS Whitelist**

- ✅ Only allows requests from:
  - `https://bigalexenergy.com`
  - `https://bigalexenergy.dev`
  - `http://localhost:3000` (dev)
  - `http://localhost:8888` (Netlify dev)

### **2. Honeypot Protection**

- ✅ Expects empty `honeypot` field
- ✅ Rejects bots with filled honeypot

### **3. Rate Limiting**

- ✅ 60 requests per hour per IP
- ✅ In-memory store (serverless-safe)

### **4. Human Verification**

- ✅ CLI riddle test: "What color is the text on this terminal?"
- ✅ Accepts "green" or "terminal" as answers
- ✅ Frontend `isHuman: true` bypass

### **5. Enhanced OpenAI Integration**

- ✅ Uses `gpt-4o` model (not mini)
- ✅ 500 token limit
- ✅ Temperature 0.8 for personality
- ✅ Graceful fallback on API errors

## 🧪 **Testing Commands**

### **Test CORS Protection**

```bash
# Should be blocked (403)
curl -X POST https://your-site.netlify.app/.netlify/functions/patch-ai \
  -H "Origin: https://malicious-site.com" \
  -H "Content-Type: application/json" \
  -d '{"message": "hello", "honeypot": "", "isHuman": true}'

# Should work (200)
curl -X POST https://your-site.netlify.app/.netlify/functions/patch-ai \
  -H "Origin: https://bigalexenergy.com" \
  -H "Content-Type: application/json" \
  -d '{"message": "hello", "honeypot": "", "isHuman": true}'
```

### **Test Honeypot Protection**

```bash
# Should be blocked (bot response)
curl -X POST https://your-site.netlify.app/.netlify/functions/patch-ai \
  -H "Origin: https://bigalexenergy.com" \
  -H "Content-Type: application/json" \
  -d '{"message": "hello", "honeypot": "filled", "isHuman": true}'

# Should work (human response)
curl -X POST https://your-site.netlify.app/.netlify/functions/patch-ai \
  -H "Origin: https://bigalexenergy.com" \
  -H "Content-Type: application/json" \
  -d '{"message": "hello", "honeypot": "", "isHuman": true}'
```

### **Test Rate Limiting**

```bash
# Make 61 requests quickly (should get rate limited on 61st)
for i in {1..65}; do
  curl -X POST https://your-site.netlify.app/.netlify/functions/patch-ai \
    -H "Origin: https://bigalexenergy.com" \
    -H "Content-Type: application/json" \
    -d '{"message": "test", "honeypot": "", "isHuman": true}'
  echo "Request $i"
done
```

### **Test Human Verification**

```bash
# First request - should ask for verification
curl -X POST https://your-site.netlify.app/.netlify/functions/patch-ai \
  -H "Origin: https://bigalexenergy.com" \
  -H "Content-Type: application/json" \
  -d '{"message": "hello", "honeypot": "", "isHuman": false}'

# Answer the riddle - should work
curl -X POST https://your-site.netlify.app/.netlify/functions/patch-ai \
  -H "Origin: https://bigalexenergy.com" \
  -H "Content-Type: application/json" \
  -d '{"message": "green", "honeypot": "", "isHuman": false}'
```

## 🎯 **Expected Responses**

### **CORS Blocked (403)**

```json
{
  "sender": "patch",
  "avatar": "(¬_¬)",
  "text": "Access denied. This terminal is for authorized users only."
}
```

### **Honeypot Triggered (200)**

```json
{
  "sender": "patch",
  "avatar": "(¬_¬)",
  "text": "Nice try, crawler. You're not getting in."
}
```

### **Rate Limited (429)**

```json
{
  "sender": "patch",
  "avatar": "(-_-)",
  "text": "You're moving a little fast there, friend. Come back later."
}
```

### **Human Verification Required (200)**

```json
{
  "sender": "patch",
  "avatar": "(¬_¬)",
  "text": "Before we get too cozy, prove you're not a script. What color is the text on this terminal?"
}
```

### **Normal Response (200)**

```json
{
  "sender": "patch",
  "avatar": "(o_~)",
  "text": "Hey there! What can I help you explore today?",
  "action": {
    "type": "scrollTo",
    "payload": "resume"
  }
}
```

## 🔧 **Frontend Integration**

The frontend automatically includes security fields:

```typescript
{
  message: "user message",
  honeypot: "", // Always empty for humans
  isHuman: true, // Frontend claims human interaction
  context: {
    currentPage: "/resume",
    userAgent: "Mozilla/5.0..."
  }
}
```

## 🚀 **Deployment Checklist**

- [ ] Set `OPENAI_API_KEY` in Netlify environment variables
- [ ] Test CORS with actual domain
- [ ] Verify rate limiting works
- [ ] Test human verification flow
- [ ] Confirm honeypot protection
- [ ] Test fallback responses

## 🐛 **Debugging**

### **Check Function Logs**

```bash
netlify functions:log patch-ai
```

### **Common Issues**

1. **CORS errors**: Check domain whitelist
2. **Rate limiting**: Wait for window reset
3. **Human verification**: Answer "green" or "terminal"
4. **API errors**: Check OpenAI key and quota

## 📊 **Security Metrics**

- **Rate Limit**: 60 requests/hour per IP
- **CORS**: 4 allowed origins
- **Honeypot**: Blocks non-empty values
- **Human Check**: CLI riddle + frontend flag
- **Fallback**: Graceful degradation on errors

Patch is now locked and loaded! 🔒✨
