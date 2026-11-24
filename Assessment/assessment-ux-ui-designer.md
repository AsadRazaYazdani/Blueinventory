# UX/UI Designer — Technical Assessment

**Time:** 60 minutes
**Task:** Help Desk interface redesign
**Objective:** Make the Help Desk look like a professional product rather than a demo

---

## How This Assessment Works

**Every candidate runs the project.** You will install Node.js, start the development server, and explore the current Help Desk in your browser. You cannot redesign an interface you have not used, and screenshots do not show you how it feels to type a message and wait for a reply.

The setup guide below assumes no prior experience with Node.js or the terminal. Follow it step by step and it will work.

**How you deliver the redesign is your choice.**

| Option | For you if |
| --- | --- |
| **Edit the code directly** | You are comfortable changing SCSS and markup |
| **Design in Figma, Sketch, or Adobe XD** | You prefer to work in a design tool |
| **Sketch it out** | You think fastest on paper or a whiteboard |

None of these is worth more than the others. We are assessing design judgement, not tooling. Say in your submission which you chose.

> **Set up before your window starts.** Installation takes 5–10 minutes and is not counted in your 60 minutes.

---

## Setup Guide

### Step 1 — Install Node.js

Node.js is the software that serves the project on your own machine. You will not write any Node.js code — you only need it running.

1. Go to **https://nodejs.org**
2. Download the **LTS** version (20.x or higher; 18.x is the minimum)
3. Run the installer and accept the defaults
4. Open your terminal — **Terminal** on macOS, **PowerShell** on Windows — and type:

```bash
node --version
npm --version
```

Both should print a version number, like `v20.11.0`. If either says "command not found", close the terminal window, open a new one, and try again — the installer needs a fresh session to take effect.

### Step 2 — Open the Project Folder

Extract the project files somewhere you can find again. Then, in your terminal:

```bash
cd blueinventory
```

`cd` means "change directory." On macOS and Windows you can type `cd ` (with a space after it) and then drag the project folder onto the terminal window — it fills in the path for you.

### Step 3 — Install Dependencies

```bash
npm install
```

This downloads the libraries the project needs. It takes 3–5 minutes and prints a lot of text. Yellow warnings are normal. Red errors are not — if you see those, contact your point of contact.

### Step 4 — Start the Server

```bash
npm run dev
```

Leave this terminal window open for the rest of the assessment. Closing it stops the server.

### Step 5 — Open the Application

Go to **http://localhost:8080** in your browser.

To stop the server later, click the terminal window and press `Ctrl + C`.

---

## Step 6 — Review the Current Interface

Spend your first few minutes using the product as a customer would, then as a staff member would. Open the mobile view too — press `F12`, then click the phone icon in the toolbar that appears, and set the width to 375px.

### Public Help Desk — http://localhost:8080/support

The customer-facing page. A visitor arrives with a question and types it into the chat.

Things worth looking at closely:

- The page header, and what it does or does not tell a customer about who is answering
- The empty state before the first message is sent
- How a message from "You" differs visually from one from "Support" — and whether it differs enough
- How a source citation renders when the answer draws on an uploaded document
- The message input and send button
- How all of the above behaves at 375px wide

### Staff Help Desk — http://localhost:8080/dashboard/ai-support

The internal tool. Staff monitor incoming conversations, step in when an automated answer is not enough, and install the chat widget on their own site.

Things worth looking at closely:

- Whether a staff member can tell at a glance that this is a different tool from the public page
- How several active conversations are presented, and how you would switch between them
- The widget installation instructions, and whether a non-technical user could follow them
- The empty state when no conversations are active

### Files Behind These Screens

| Purpose | Path |
| --- | --- |
| Help Desk (public) | `/pages/support.tsx` |
| Help Desk (staff) | `/pages/dashboard/ai-support.tsx` |
| Chat workspace component | `/components/Backend/Dashboard/components/AiWorkspace.tsx` |
| Global styles | `/styles/globals.scss` |
| Component styles | Component-specific `.scss` files alongside each component |

If you are editing code, open the project folder in **VS Code** (https://code.visualstudio.com) via **File → Open Folder**. `.tsx` files hold the page markup — look for the HTML-like tags and the `className` attributes connecting them to styles. You can change markup, class names, and copy, and you can add new `.scss` files. The browser reloads automatically when you save.

If you are designing elsewhere, take screenshots of what you found here to work against.

---

## Design Guidelines

| Token | Value |
| --- | --- |
| Primary (navy) | `#09275e` |
| Accent (gold) | `#e8b042` |
| Corner radius | `border-radius: 0` — square corners throughout |

Beyond the tokens:

- **Professional, not chatbot.** The interface should read as a support desk, not as an AI toy.
- **No technical terminology visible to users.** Words like *embedding*, *vector*, *model*, *token*, and *prompt* do not belong in customer-facing copy.
- **Mobile matters.** Customers will reach the public Help Desk from phones.

---

## Task 1 — Public Help Desk Redesign (25 min)

**Screen:** http://localhost:8080/support — `/pages/support.tsx` and related components

1. **Page header** — A professional header carrying support hours and contact information
2. **Chat interface**
   - Improve the empty state, which is currently generic
   - Style the conversation bubbles distinctly for "You" and "Support"
   - Style source citations where the answer references a document
3. **Input area** — Redesign the message input and send button
4. **Mobile** — Make sure the interface works on a phone-sized screen

If you are designing rather than coding, produce a 375px-wide frame alongside the desktop one.

---

## Task 2 — Staff Help Desk Enhancement (25 min)

**Screen:** http://localhost:8080/dashboard/ai-support — `/pages/dashboard/ai-support.tsx`

1. **Operations interface** — Make it visually clear this is an internal staff tool, distinct from the public Help Desk
2. **Widget installation** — Design a clear, non-technical installation guide
3. **Conversation management** — Design the interface for handling several customer conversations at once
4. **Empty states** — A professional empty state for when there are no active conversations

---

## Task 3 — Design Documentation (10 min)

1. **Before and after** — The current screens as you found them, next to your redesign
2. **Design rationale** — A short written explanation of your decisions
3. **Mobile notes** — How you approached responsive behaviour

Short and specific beats long and general. Three paragraphs is plenty.

---

## What to Submit

| Item | Detail |
| --- | --- |
| **Your method** | Code, design tool, or sketches |
| **The work** | Modified files, a design file link, or photographs of your sketches |
| **Before screenshots** | The current screens as you found them running locally |
| **After visuals** | Your redesign, desktop and mobile |
| **Rationale** | A short written explanation |
| **Time log** | Roughly how long each task took |

A view-only Figma link is fine — check that sharing is enabled before sending it. Photographs of paper sketches are fine too, as long as they are legible.

---

## Evaluation Criteria

| Criterion | What we look for |
| --- | --- |
| **Visual design** | Professional appearance, consistent with the brand |
| **User experience** | Intuitive navigation, clear information hierarchy |
| **Responsive design** | Genuinely usable on mobile, not just non-broken |
| **Attention to detail** | Spacing, typography, and colour used deliberately |
| **Understanding of the product** | Evidence that you used the running application and designed against what you found |
| **Craft** | Clean SCSS if you edited code; tidy, well-named layers and consistent styles if you designed |

---

## Notes

If the setup does not work, contact your point of contact rather than spending assessment time on it. Setup problems are ours to fix, not a test.

If you run out of time, write down what you would have done next. We read those notes carefully — knowing what to do is most of the skill.
