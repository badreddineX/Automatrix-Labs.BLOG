# Working Efficiently in This Repo — Read Alongside CLAUDE.md

This is guidance for *how* to work in this repo economically and reliably — not what the
project is (see `CLAUDE.md` for that). Written 2026-07-28 after a long session that touched
analytics, Pinterest strategy, an indexing bug, and mobile performance fixes across both
live sites.

## Token/usage economy

- **Don't re-read a file already read this session** unless it may have changed since (an
  Edit/Write to it doesn't require a re-read — the tool result already shows the new state).
- **Batch independent tool calls in parallel** (multiple greps, multiple file reads, multiple
  independent bash checks) instead of one at a time when there's no dependency between them.
- **Don't re-verify something already confirmed** in the same session (e.g., don't re-run
  `git status` three times in a row with no changes in between).
- **Grep/read targeted sections, not whole large files**, when only a specific part is
  needed — use `offset`/`limit` or a grep pattern rather than dumping an entire file.
- **Summarize large tool output instead of repeating it verbatim** in the response back to
  the user — the user doesn't need to see a 40-line JSON dump if a 2-line summary answers
  the question.
- **Keep responses proportional to the question.** A yes/no question gets a short answer,
  not a restated history of the whole conversation.

## When to delegate outside Claude Code entirely

**Updated 2026-08-13 — the section below is superseded; see global `CLAUDE.md` (user-level,
`~/.claude/CLAUDE.md`) for the current, authoritative delegation setup.** OpenRouter/Cline was
retired 2026-08-05 (paid credit exhausted, free tier unreliable) and is no longer a valid
delegation path — don't route tasks there. Current setup: Gemini direct API (first choice when
available) and a local Ollama install (`qwen2.5-coder:3b`/`7b`, fallback, picked by task
complexity + free RAM) via `ollama-delegate.mjs`. Same underlying split still applies:

- **Bulk, low-stakes, generative tasks** (drafting many pin title options, brainstorming
  topic ideas, a quick throwaway script you'll review yourself) — use Gemini or Ollama
  directly, not routed through Claude Code as a middleman.
- **Anything touching git, live site code, deletions, quality-sensitive/sellable content, or
  requiring multi-step verification** — stays on Claude Code. This is most of what actually
  happens in this repo day to day.
- Decide which bucket a task is in *before* starting it, not mid-task.

Full details, model picks, RAM-check command, and the hardware constraints that shaped this
choice all live in the global `CLAUDE.md` — don't duplicate them here again, just check there
for anything delegation-related so this file doesn't drift out of date a second time.

## Practices that produced good results this session (keep doing these)

- **Verify before destructive actions.** Check `git status` before any command that could
  discard work; confirm build succeeds before committing/pushing a live site change.
- **Root-cause with real evidence before proposing a fix**, rather than guessing. The RSS
  trailing-slash indexing bug and the mobile LCP/oversized-thumbnail fixes were both found
  by pulling real API/PSI data first, not by assumption — and both diagnoses turned out to
  be more specific (and different) than the first guess.
- **Confirm scope before a large batch of new content/assets**, especially anything that
  will be committed or published (the Pinterest trend-pin batch was built, reviewed, and
  then fully reverted once it turned out to duplicate existing coverage — confirming scope
  earlier would have saved that round-trip).
- **When reverting, use `git revert` not `git reset --hard` + force-push** on already-pushed
  commits — keeps history clean and reversible.
- **Treat API keys/secrets as compromised the moment they appear in chat**, regardless of
  who's "the only one with access" — rotate them, don't just move on.
