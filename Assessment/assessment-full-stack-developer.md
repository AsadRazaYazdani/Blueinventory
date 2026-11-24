# Full Stack Developer — Technical Assessment

**Time:** 60 minutes
**Task:** User management system
**Objective:** Build a complete feature across both frontend and backend

---

## Before You Begin

Set the project up and confirm it runs before your window starts — see the setup section in [`assessments-README.md`](assessments-README.md). Setup time is not part of your 60 minutes.

```bash
npm install
npm run dev   # http://localhost:8080
```

### Stack

Next.js, React, TypeScript, Next.js API routes, SCSS.

---

## Task 1 — User Registration Flow (25 min)

**Files:** `/pages/register.tsx`, `/pages/api/auth/register.ts`

1. **Registration form** — Email validation, password strength, terms acceptance
2. **API endpoint** — Secure user creation with server-side validation
3. **Email verification** — Send a verification email and handle confirmation
4. **Error handling** — Clear error messages and success feedback

Validate on both sides. Client-side validation is for the user's benefit; server-side validation is the one that counts.

---

## Task 2 — Dashboard Integration (20 min)

**Files:** `/pages/dashboard/users.tsx` and related API routes

1. **User list** — All users, with pagination and search
2. **User roles** — Admin, staff, and customer role management
3. **User actions** — Enable and disable users, reset passwords, change roles
4. **Real-time updates** — Live user status

Role checks belong on the server. A hidden button is not an access control.

---

## Task 3 — Profile Management (15 min)

**File:** `/pages/dashboard/profile.tsx`

1. **Profile editing** — Update user information and change password
2. **Avatar upload** — Profile picture upload and management
3. **Activity log** — Login history and recent actions
4. **Settings** — User preferences and notification settings

---

## What to Submit

| Item | Detail |
| --- | --- |
| Code changes | All new and modified files |
| Notes | Your approach and the trade-offs you made |
| Screenshots | The registration flow and user dashboard |
| Evidence | A short description or recording of the flow working end to end |
| Time log | Roughly how long each task took |

---

## Evaluation Criteria

| Criterion | What we look for |
| --- | --- |
| **Full stack integration** | Clean communication between client and server |
| **User experience** | Intuitive, responsive interface |
| **Data security** | Proper handling and validation of user data |
| **Feature completeness** | Working flows rather than partial scaffolding |
| **Code organisation** | Well-structured and maintainable |

---

## Notes

This role is judged on whether a feature works end to end. One complete, working flow beats three half-wired ones — if you have to choose, finish Task 1 properly.

If you run out of time, write down what you would have done next.
