# BlueInventory — Technical Assessments

Practical, time-boxed assessments for candidates joining the BlueInventory platform team.

**Product:** AI-powered customer support SaaS platform
**Format:** One 60-minute assessment per role, completed on a local development setup

---

## Choose Your Assessment

| Role | Assessment |
| --- | --- |
| UX/UI Designer | [`assessment-ux-ui-designer.md`](assessment-ux-ui-designer.md) |
| Frontend Developer | [`assessment-frontend-developer.md`](assessment-frontend-developer.md) |
| Backend Developer | [`assessment-backend-developer.md`](assessment-backend-developer.md) |
| Full Stack Developer | [`assessment-full-stack-developer.md`](assessment-full-stack-developer.md) |
| AI Developer | [`assessment-ai-developer.md`](assessment-ai-developer.md) |
| Data Engineer | [`assessment-data-engineer.md`](assessment-data-engineer.md) |

Read the setup section below first, then open the document for your role.

---

## Before You Start

### Prerequisites

| Requirement | Notes |
| --- | --- |
| Node.js 18+ | LTS release recommended |
| Git | Any recent version |
| Code editor | VS Code recommended |
| Terminal access | Command line / shell |

### Getting the Project

You will receive access details separately from your point of contact. Set the project up and confirm it runs **before** your assessment window begins — setup time is not part of your 60 minutes.

```bash
cd blueinventory
npm install
npm run dev
```

Then open **http://localhost:8080** and confirm the application loads.

If anything fails at this stage, contact your point of contact rather than spending assessment time on it.

### Project Structure

```
blueinventory/
├── components/          # React components
│   ├── Frontend/        # Public-facing components
│   └── Backend/         # Dashboard components
├── pages/               # Next.js pages
├── styles/              # SCSS and CSS files
├── lib/                 # Utility functions and API helpers
├── public/              # Static assets
└── data/                # Local data storage
```

---

## How the 60 Minutes Works

Each assessment is split into three tasks with a suggested time budget. The budgets are guidance, not a stopwatch — if you spend longer on one task because you found something worth doing properly, say so in your notes.

**We would rather see two tasks done well than three done carelessly.** Finishing everything is not the bar; showing how you think is.

---

## What to Submit

| Item | Detail |
| --- | --- |
| **Code changes** | All modified files, with comments where a decision isn't obvious |
| **Notes** | A short written explanation of your approach and the trade-offs you made |
| **Screenshots** | Before and after images, for any visual change |
| **Evidence it works** | A short description or recording showing the change behaving correctly |
| **Time log** | Roughly how long you spent on each task |

Notes can be a single Markdown file added alongside your changes. A few clear paragraphs are better than a long document.

---

## How We Evaluate

Applies to every role, alongside the role-specific criteria in each document.

| Criterion | What we look for |
| --- | --- |
| **Technical competency** | Skill level appropriate to the role |
| **Problem-solving** | A logical, explainable approach |
| **Code quality** | Clean, readable, maintainable work |
| **Attention to detail** | Careful implementation and testing |
| **Communication** | Clear documentation of what you did and why |

We also pay attention to:

- **Integration** — whether you understood how your change fits the wider system
- **Judgement** — knowing what to leave alone, and flagging what you'd do with more time
- **Professional standards** — following the conventions already present in the codebase

---

## After the Assessment

1. **Code review** with senior team members
2. **Discussion** — a 30-minute conversation about your approach and decisions
3. **Team fit** — collaboration and communication
4. **Reference check**
5. **Decision** — communicated within 48–72 hours

Questions at any point are welcome, and asking a good one counts in your favour rather than against it.
