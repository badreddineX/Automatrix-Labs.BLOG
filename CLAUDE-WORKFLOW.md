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

An OpenRouter + Cline setup exists at `C:\Users\bader\OneDrive\Desktop\openrouter-tools\`
(see `models.md` there for the current model list and picks). The split:

- **Bulk, low-stakes, generative tasks** (drafting many pin title options, brainstorming
  topic ideas, a quick throwaway script you'll review yourself) — **use Cline/OpenRouter
  directly, not through Claude.** Asking Claude to relay a request to a free model and then
  check the result doesn't save meaningful usage — the relay + verification step costs
  about as much as just doing the task directly.
- **Anything touching git, live site code, deletions, or requiring multi-step verification**
  — stays on Claude Code. This is most of what actually happens in this repo day to day.
- Decide which bucket a task is in *before* starting it, not mid-task — that's what
  actually reduces load, not routing through Claude as a middleman.

**Other free options, checked 2026-07-28 (verify currency before relying on these — this
space changes fast):**

- **Codeium** — unlimited free autocomplete + basic in-editor chat in VS Code, no API key
  to manage at all. Good for everyday autocomplete while typing, separate from Cline's
  agentic chat.
- **Amazon Q Developer** — unlimited free completions + 50 agentic requests/day, also no
  key management. A second free agentic option to fall back on if Cline/OpenRouter's free
  models are rate-limited that day.
- Skipped: Cursor (separate editor, not a VS Code extension — bigger switch than
  warranted), Continue.dev/Aider (same bring-your-own-key model as Cline, redundant).

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
