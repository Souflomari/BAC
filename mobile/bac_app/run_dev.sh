#!/bin/bash
# BacPrep Dev Runner — connects to live Supabase.
# The anon key is read from the environment (never hard-coded / committed).
# Set it first, e.g.:  export SUPABASE_ANON_KEY="<your anon/public key>"
# (see mobile/bac_app/.env.example), or source your gitignored .env.production.
: "${SUPABASE_ANON_KEY:?Set SUPABASE_ANON_KEY before running (see mobile/bac_app/.env.example)}"
flutter run \
  --dart-define=SUPABASE_URL="${SUPABASE_URL:-https://iwoydyudjondihzzsqay.supabase.co}" \
  --dart-define=SUPABASE_ANON_KEY="$SUPABASE_ANON_KEY"
