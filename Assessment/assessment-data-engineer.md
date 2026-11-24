# Data Engineer — Technical Assessment

**Time:** 60 minutes
**Task:** Analytics pipeline implementation
**Objective:** Build a data pipeline for business intelligence and real-time analytics

---

## Before You Begin

Set the project up and confirm it runs before your window starts — see the setup section in [`assessments-README.md`](assessments-README.md). Setup time is not part of your 60 minutes.

```bash
npm install
npm run dev   # http://localhost:8080
```

### Context

The platform currently stores data in local JSON files under `/data/`. Part of what we are assessing is how you design a pipeline that works against today's storage while being ready for the move to PostgreSQL.

---

## Task 1 — ETL Pipeline Design (25 min)

**Files:** `/lib/data/etl-pipeline.ts`, `/scripts/data-processing.js`

1. **Extraction** — Pull data from conversations, documents, and user actions
2. **Transformation** — Clean and normalise it for analytics
3. **Loading** — Load the processed data into the analytics store
4. **Scheduling** — Automate the pipeline run

Design for re-runs. A pipeline that produces duplicates when run twice is a pipeline that will produce duplicates in production.

---

## Task 2 — Real-time Analytics (20 min)

**Files:** `/lib/analytics/real-time.ts`, `/pages/api/analytics/live.ts`

1. **Live metrics** — Conversation volume and response times
2. **Dashboard API** — Endpoints serving live dashboard data
3. **Data streaming** — WebSocket delivery of updates
4. **Query performance** — Efficient queries for live data

Say what "real-time" means in your implementation. A one-second refresh and a one-minute refresh are both defensible; what matters is that the choice was deliberate.

---

## Task 3 — Business Intelligence (15 min)

**File:** `/lib/analytics/business-intelligence.ts`

1. **KPI calculations** — The key indicators for a support platform
2. **Trend analysis** — Trends and growth metrics
3. **Predictive models** — Basic forecasting for support volume
4. **Reporting** — Automated report generation

Define your metrics explicitly. If you calculate average response time, state whether it is the mean or a percentile, and which events bound it.

---

## What to Submit

| Item | Detail |
| --- | --- |
| Code changes | All new and modified files |
| Notes | Your approach, your schema decisions, and your metric definitions |
| Evidence | Sample output from the pipeline or the live endpoint |
| Time log | Roughly how long each task took |

---

## Evaluation Criteria

| Criterion | What we look for |
| --- | --- |
| **Data architecture** | Well-designed models and pipelines |
| **Performance** | Efficient processing and querying |
| **Real-time systems** | Sound handling of streaming data |
| **Business value** | Metrics someone would actually make a decision from |
| **Scalability** | Approaches that survive growing data volumes |

---

## Notes

A clear schema with two working metrics beats a sprawling pipeline producing numbers nobody can define.

If you run out of time, write down what you would have done next.
