# Database Schema (high level)

Suggested pieces:

- `users` table
- `contacts` / `friends`
- `conversations` (one-to-one and group)
- `messages` with indexing for searching
- `media` references

Use Postgres for relational data and Redis for presence and pub/sub.
