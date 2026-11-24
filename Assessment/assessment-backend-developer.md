# Backend Developer — Technical Assessment

**Time:** 60 minutes
**Task:** API security and authentication
**Objective:** Build secure API endpoints with proper authentication and rate limiting

---

## Before You Begin

Set the project up and confirm it runs before your window starts — see the setup section in [`assessments-README.md`](assessments-README.md). Setup time is not part of your 60 minutes.

```bash
npm install
npm run dev   # http://localhost:8080
```

### Stack

Next.js API routes, Node.js, TypeScript, PostgreSQL.

---

## Task 1 — Authentication System (25 min)

**Files:** `/pages/api/auth/` — create this directory

1. **JWT implementation** — Login and logout endpoints
2. **Password security** — bcrypt hashing with an appropriate cost factor
3. **Session management** — Token generation and validation
4. **Middleware** — Authentication middleware for protected routes

Be explicit about token lifetime and where tokens are stored on the client. If you choose a short-lived access token, say how you would refresh it — you do not need to build the refresh flow in the time available.

---

## Task 2 — Rate Limiting & Security (20 min)

**Files:** Middleware under `/pages/api/`

1. **Rate limiting** — Per IP and per user
2. **Input validation** — Request validation and sanitisation
3. **CORS** — Correct cross-origin configuration
4. **Security headers** — Standard headers and HTTPS enforcement

Auth endpoints deserve stricter limits than read endpoints. We will look for whether you distinguished between them.

---

## Task 3 — Database Integration (15 min)

**Files:** `/lib/database/` — create this directory

1. **Connection setup** — Configure the PostgreSQL connection, with pooling
2. **Migration** — A users table migration
3. **Queries** — CRUD operations for user management
4. **Error handling** — Database errors handled and logged without leaking internals to the client

The project currently stores data in local JSON files, so you are laying the first piece of the real database layer. Design the schema as though more will be built on it.

---

## What to Submit

| Item | Detail |
| --- | --- |
| Code changes | All new and modified files |
| Notes | Your approach, and any security trade-offs you made under time pressure |
| Evidence | Example requests and responses showing auth and rate limiting working |
| Time log | Roughly how long each task took |

---

## Evaluation Criteria

| Criterion | What we look for |
| --- | --- |
| **Security** | Sound authentication and authorisation |
| **Database design** | Sensible schema, indexed appropriately, parameterised queries |
| **API design** | RESTful endpoints with correct status codes |
| **Error handling** | Comprehensive, and safe in what it reveals |
| **Code security** | Input validation, SQL injection prevention, no secrets in source |

---

## Notes

Shortcuts are acceptable under a 60-minute limit — undocumented shortcuts are not. If you hardcode something you would never hardcode in production, leave a comment saying so.

If you run out of time, write down what you would have done next.
