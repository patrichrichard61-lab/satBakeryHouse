# Language Tracker

A calm, single-page tracker for daily language study. No accounts, no backend —
everything is saved privately in your browser via `localStorage`.

## Features

- **Calendar** — a month view (with previous/next navigation) that fills in every
  day you logged a study session, drawn from the same data as the streak.
- **Study streak** — tap *I studied today* to keep your streak going. The streak
  counts consecutive days and resets if you miss one. A progress bar fills toward
  a 7-day week.
- **New words this week** — add words (with an optional meaning) toward a weekly
  goal of 20. The weekly count resets every Monday; your word list stays.
- **Progress bars** under each section show how the week is going at a glance.

## Bundled study set

The tracker ships with a set of CIT421 (Net-Centric Computing) past-exam Q&A
entries that are merged into your word list once, the first time you open it.
These reference entries count toward the weekly-goal bar but are deliberately
excluded from the study streak and calendar, and deleting them is permanent
(they are not re-added on reload).

## Usage

Open `index.html` in any modern browser — double-click it, or serve the folder
statically. That's it. Your data lives in that browser only.
