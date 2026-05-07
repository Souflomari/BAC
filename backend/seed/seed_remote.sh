#!/bin/bash
# ============================================================
# BacPrep Remote Seeding Script
# Seeds data to Supabase cloud via Management API
# ============================================================

SEED_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_REF="iwoydyudjondihzzsqay"

if [ -z "$SUPABASE_ACCESS_TOKEN" ]; then
  echo "ERROR: Set SUPABASE_ACCESS_TOKEN environment variable"
  exit 1
fi

API_URL="https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query"

run_sql_file() {
  local file="$1"
  local fname=$(basename "$file")

  # Read file content and escape for JSON
  local sql_content
  sql_content=$(cat "$file")

  # Use python to properly JSON-encode the SQL
  local json_payload
  json_payload=$(python -c "
import json, sys
with open(sys.argv[1], 'r', encoding='utf-8') as f:
    sql = f.read()
print(json.dumps({'query': sql}))
" "$file")

  local response
  response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
    -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
    -H "Content-Type: application/json" \
    -d "$json_payload" 2>&1)

  local http_code=$(echo "$response" | tail -1)
  local body=$(echo "$response" | sed '$d')

  if [ "$http_code" = "201" ] || [ "$http_code" = "200" ]; then
    echo "  OK: $fname"
  else
    echo "  FAIL: $fname (HTTP $http_code)"
    echo "    $body"
    return 1
  fi
}

echo "============================================"
echo "BacPrep Remote Seeding"
echo "============================================"
echo ""

# Step 1: Seed structural data
echo "1. Seeding structural data..."
run_sql_file "$SEED_DIR/seed_data.sql"
echo ""

# Step 2: Seed content files
echo "2. Seeding content files..."
for f in "$SEED_DIR/content"/*.sql; do
  run_sql_file "$f"
done
echo ""

# Step 3: Verify counts
echo "3. Verifying..."
result=$(curl -s -X POST "$API_URL" \
  -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query": "SELECT (SELECT count(*) FROM subjects) as subjects, (SELECT count(*) FROM topics) as topics, (SELECT count(*) FROM skills) as skills, (SELECT count(*) FROM items) as items"}')

echo "  $result"
echo ""
echo "============================================"
echo "Seeding complete!"
echo "============================================"
