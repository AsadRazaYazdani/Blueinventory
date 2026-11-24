# Frontend Developer — Technical Assessment

**Time:** 60 minutes
**Task:** Real-time chat enhancement
**Objective:** Add real-time behaviour to the chat interface and tighten up component quality

---

## Before You Begin

Set the project up and confirm it runs before your window starts — see the setup section in [`assessments-README.md`](assessments-README.md). Setup time is not part of your 60 minutes.

```bash
npm install
npm run dev   # http://localhost:8080
```

### Stack

Next.js, React, TypeScript, SCSS.

---

## Task 1 — WebSocket Chat Implementation (30 min)

**File:** `/components/Backend/Dashboard/components/AiWorkspace.tsx`

1. **Real-time messaging** — Establish a WebSocket connection for live chat
2. **Typing indicators** — Show when either side is typing
3. **Message status** — Sent, delivered, and read indicators
4. **Auto-scroll** — Scroll to new messages as they arrive, without fighting the user when they have scrolled up to read history

Handle connection lifecycle explicitly: what happens on open, on close, on error, and on reconnect. A chat that works only on the happy path is not finished.

---

## Task 2 — Component Optimisation (20 min)

**Files:** Modal components in `/components/Backend/Dashboard/components/`

1. **Modal management** — Fix the z-index issues with overlapping modals
2. **State management** — Update state properly, without a full page reload
3. **Error handling** — User-friendly error messages and loading states
4. **Performance** — Apply `React.memo` and `useCallback` where they genuinely help

On the last point: we are more interested in whether you can explain *why* a particular memoisation helps than in seeing it applied everywhere. Blanket memoisation is its own kind of problem.

---

## Task 3 — Testing & Documentation (10 min)

1. **Unit tests** — Cover the components you added or changed
2. **Integration test** — Exercise the WebSocket connection and message flow
3. **Documentation** — JSDoc comments on new functions

---

## What to Submit

| Item | Detail |
| --- | --- |
| Code changes | All modified files |
| Notes | Your approach and the trade-offs you made |
| Evidence | A short recording or description showing real-time messaging working |
| Time log | Roughly how long each task took |

---

## Evaluation Criteria

| Criterion | What we look for |
| --- | --- |
| **Technical implementation** | Clean, idiomatic React |
| **Real-time features** | Correct WebSocket handling, including failure cases |
| **Performance** | Deliberate rendering and state decisions |
| **Testing** | Meaningful coverage of what you built |
| **Code quality** | Proper TypeScript, no implicit `any`, real error handling |

---

## Notes

Depth beats breadth. A solid, well-tested WebSocket implementation with Task 2 partly done tells us more than three tasks rushed.

If you run out of time, write down what you would have done next and why.
