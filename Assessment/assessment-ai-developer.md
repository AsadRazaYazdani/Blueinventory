# AI Developer — Technical Assessment

**Time:** 60 minutes
**Task:** Document processing enhancement
**Objective:** Improve document processing and the accuracy of generated responses

---

## Before You Begin

Set the project up and confirm it runs before your window starts — see the setup section in [`assessments-README.md`](assessments-README.md). Setup time is not part of your 60 minutes.

```bash
npm install
npm run dev   # http://localhost:8080
```

The AI features need a model API key in `.env.local`:

```
GEMINI_API_KEY=your_key_here
```

This stays server-side. If you have not been given a key, contact your point of contact before your window begins.

---

## Task 1 — Document Chunking Optimisation (25 min)

**Files:** `/lib/ai/document-processor.ts`, `/lib/ai/embeddings.ts`

1. **Smart chunking** — Chunk semantically, based on document structure, rather than on a fixed character count
2. **Overlap strategy** — Configurable overlap between chunks to preserve context across boundaries
3. **Metadata extraction** — Extract and store title, section headings, and position
4. **Quality metrics** — A way to assess whether the chunking is any good

That last point is the one we care about most. Any chunking change can be justified in prose; we want to see how you would *measure* that it helped.

---

## Task 2 — Response Generation Improvement (20 min)

**Files:** `/lib/ai/response-generator.ts`, `/pages/api/ai/chat.ts`

1. **Context window** — A sliding window for long conversations
2. **Source attribution** — More accurate citations, better formatted
3. **Response filtering** — Quality filtering and validation before a response reaches the user
4. **Fallback handling** — Better behaviour when no relevant document is found

On fallbacks: saying "I don't have information on that" is a correct answer. A confident, ungrounded guess is a failure, and the system should prefer the former.

---

## Task 3 — Model Performance Monitoring (15 min)

**File:** `/lib/ai/monitoring.ts`

1. **Response metrics** — Track accuracy and user satisfaction
2. **Performance logging** — Response times and token usage
3. **Quality assessment** — Automated quality scoring
4. **A/B testing** — A framework for comparing approaches

---

## What to Submit

| Item | Detail |
| --- | --- |
| Code changes | All new and modified files |
| Notes | Your approach, and how you would validate that each change improved things |
| Evidence | Before and after examples on the same questions, if time allows |
| Time log | Roughly how long each task took |

A handful of question-and-answer comparisons is worth more than a paragraph claiming improvement.

---

## Evaluation Criteria

| Criterion | What we look for |
| --- | --- |
| **AI/ML expertise** | Real understanding of retrieval and NLP, not just API wiring |
| **Code quality** | Clean, efficient processing code |
| **Performance** | Attention to speed, cost, and accuracy together |
| **Monitoring** | Measurement treated as part of the work, not an afterthought |
| **Innovation** | Thoughtful solutions to the underlying problem |

---

## Notes

We would rather see one chunking change you can defend with evidence than four you cannot.

If you run out of time, write down what you would have done next and how you would have tested it.
