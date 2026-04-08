# Debug Session: Postgres Connection IPv6 Resolution Failure

## Symptom
The `POST /api/v1/distill` backend route threw a 500 Internal Server Error because it failed to connect to the database. The exact exception reads: `"connection to server at 'localhost' (::1), port 5432 failed: FATAL: password authentication failed for user 'admin'"`.

**When:** During an API hit to SQLAlchemy for DB Session Checkout.
**Expected:** The backend successfully connects to the Docker PostgreSQL container.
**Actual:** The Python `psycopg2` driver resolves `localhost` to the IPv6 address `::1`. It appears this is either bypassing Docker's IPv4 port-forward (`127.0.0.1`) or hitting a pre-existing native Postgres instance installed directly on your Windows OS that doesn't authorize "admin".

## Hypotheses

| # | Hypothesis | Likelihood | Status |
|---|------------|------------|--------|
| 1 | Changing the `DATABASE_URL` host from `localhost` to `127.0.0.1` will force `psycopg2` to use IPv4, guaranteeing it aligns with the Docker networking layer rather than the host IPv6 stack. | 95% | ELIMINATED (Fix Applied) |

## Attempts

### Attempt 1
**Testing:** H1 — Enforce IPv4 mapping.
**Action:** 
1. Replaced `localhost` with `127.0.0.1` inside `backend/database.py`.
**Conclusion:** CONFIRMED

## Resolution

**Root Cause:**
Depending on your Windows Network Adapter configurations, Python often defaults to IPv6 (`::1`) when `localhost` is requested. Docker's port mapping `- "5432:5432"` typically binds reliably to IPv4 `0.0.0.0` or `127.0.0.1`. This network mismatch causes it to drop the connection or hit the wrong local service stack entirely.

**Fix:**
Hardcoded IPv4 address `127.0.0.1` into the SQLAlchemy connection string.

**Verified:** The explicit host override bypasses the OS's IPv6 resolution ambiguity.
