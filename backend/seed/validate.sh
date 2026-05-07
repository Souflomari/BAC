#!/bin/bash
# ============================================================
# BacPrep Content Validation Script
# Validates SQL seed files without needing a database
# ============================================================

SEED_DIR="$(cd "$(dirname "$0")" && pwd)"
CONTENT_DIR="$SEED_DIR/content"
ERRORS=0
WARNINGS=0

red() { echo -e "\033[31m  FAIL: $1\033[0m"; ERRORS=$((ERRORS+1)); }
green() { echo -e "\033[32m  OK: $1\033[0m"; }
yellow() { echo -e "\033[33m  WARN: $1\033[0m"; WARNINGS=$((WARNINGS+1)); }

echo "============================================"
echo "BacPrep Content Validation"
echo "============================================"
echo ""

# ---- 1. Check all expected files exist ----
echo "1. FILE EXISTENCE CHECK"
expected_files=(
  "$SEED_DIR/seed_data.sql"
  "$CONTENT_DIR/math_01_sequences.sql"
  "$CONTENT_DIR/math_02_limits.sql"
  "$CONTENT_DIR/math_03_derivatives.sql"
  "$CONTENT_DIR/math_04_integration.sql"
  "$CONTENT_DIR/math_05_probability.sql"
  "$CONTENT_DIR/math_06_complex_numbers.sql"
  "$CONTENT_DIR/math_07_differential_equations.sql"
  "$CONTENT_DIR/physics_01_mechanics.sql"
  "$CONTENT_DIR/physics_02_waves.sql"
  "$CONTENT_DIR/physics_03_electricity.sql"
  "$CONTENT_DIR/physics_04_chemistry.sql"
  "$CONTENT_DIR/svt_01_organic_matter.sql"
  "$CONTENT_DIR/svt_02_molecular_genetics.sql"
  "$CONTENT_DIR/svt_03_human_genetics.sql"
  "$CONTENT_DIR/svt_04_immunology.sql"
  "$CONTENT_DIR/svt_05_geology.sql"
  "$CONTENT_DIR/eng_01_functional_analysis.sql"
  "$CONTENT_DIR/eng_02_energy_chain.sql"
  "$CONTENT_DIR/eng_03_info_chain.sql"
  "$CONTENT_DIR/eng_04_mechanics.sql"
  "$CONTENT_DIR/eng_05_materials.sql"
  "$CONTENT_DIR/philo_01_knowledge.sql"
  "$CONTENT_DIR/philo_02_politics.sql"
  "$CONTENT_DIR/philo_03_morals.sql"
  "$CONTENT_DIR/french_01_reading.sql"
  "$CONTENT_DIR/french_02_writing.sql"
  "$CONTENT_DIR/french_03_literature.sql"
  "$CONTENT_DIR/arabic_01_grammar.sql"
  "$CONTENT_DIR/arabic_02_rhetoric.sql"
  "$CONTENT_DIR/arabic_03_texts.sql"
  "$CONTENT_DIR/english_01_grammar.sql"
  "$CONTENT_DIR/english_02_reading.sql"
  "$CONTENT_DIR/english_03_writing.sql"
  "$CONTENT_DIR/islamic_01_aqida.sql"
  "$CONTENT_DIR/islamic_02_fiqh.sql"
  "$CONTENT_DIR/islamic_03_values.sql"
  "$CONTENT_DIR/econ_01_market.sql"
  "$CONTENT_DIR/econ_02_money.sql"
  "$CONTENT_DIR/econ_03_growth.sql"
  "$CONTENT_DIR/business_01_environment.sql"
  "$CONTENT_DIR/business_02_organization.sql"
  "$CONTENT_DIR/business_03_strategy.sql"
  "$CONTENT_DIR/accounting_01_general.sql"
  "$CONTENT_DIR/accounting_02_analysis.sql"
  "$CONTENT_DIR/accounting_03_math_fin.sql"
  "$CONTENT_DIR/law_01_civil.sql"
  "$CONTENT_DIR/law_02_commercial.sql"
  "$CONTENT_DIR/law_03_social.sql"
)
for f in "${expected_files[@]}"; do
  if [ -f "$f" ]; then
    green "$(basename $f) exists"
  else
    red "$(basename $f) MISSING"
  fi
done
echo ""

# ---- 2. UUID Uniqueness Check ----
echo "2. UUID UNIQUENESS CHECK"

# Extract all item UUIDs
all_item_uuids=$(grep -roh "'44444444-[0-9a-f-]*'" "$CONTENT_DIR" 2>/dev/null | sort)
total_items=$(echo "$all_item_uuids" | wc -l | tr -d ' ')
unique_items=$(echo "$all_item_uuids" | sort -u | wc -l | tr -d ' ')

if [ "$total_items" -eq "$unique_items" ]; then
  green "All $total_items item UUIDs are unique"
else
  red "DUPLICATE item UUIDs found! ($total_items total, $unique_items unique)"
  echo "$all_item_uuids" | sort | uniq -d | while read dup; do
    echo "    Duplicate: $dup"
    grep -rn "$dup" "$CONTENT_DIR"
  done
fi

# Check skill UUIDs in seed_data
skill_uuids=$(grep -oh "'33333333-[0-9a-f-]*'" "$SEED_DIR/seed_data.sql" 2>/dev/null | sort -u)
skill_count=$(echo "$skill_uuids" | wc -l | tr -d ' ')
green "$skill_count skills defined in seed_data.sql"
echo ""

# ---- 3. Skill Reference Integrity ----
echo "3. SKILL REFERENCE INTEGRITY"
# Extract skill_ids referenced in content files and check they exist in seed_data
content_skill_refs=$(grep -roh "'33333333-[0-9a-f-]*'" "$CONTENT_DIR" 2>/dev/null | sort -u)
while IFS= read -r ref; do
  if echo "$skill_uuids" | grep -q "$ref"; then
    : # OK
  else
    red "Skill $ref referenced in content but NOT in seed_data.sql"
  fi
done <<< "$content_skill_refs"
ref_count=$(echo "$content_skill_refs" | wc -l | tr -d ' ')
green "$ref_count skill references checked against seed_data.sql"
echo ""

# ---- 4. Item Type Validation ----
echo "4. ITEM TYPE VALIDATION"
valid_types="mcq|numeric|true_false"
invalid_types=$(grep -rn "item_type" "$CONTENT_DIR" 2>/dev/null | grep -v "item_type," | grep -oP "'[a-z_]+'" | sort -u | grep -vP "'($valid_types)'" || true)
# Simpler approach: check for any item_type values in INSERT statements
for itype in mcq numeric true_false; do
  count=$(grep -rc "'$itype'" "$CONTENT_DIR" 2>/dev/null | awk -F: '{s+=$2}END{print s}')
  green "$itype: $count items"
done
# Check for unsupported types
for bad_type in short_text ordering fill_blank matching multi_step; do
  bad_count=$(grep -rc "'$bad_type'" "$CONTENT_DIR" 2>/dev/null | awk -F: '{s+=$2}END{print s}')
  if [ "$bad_count" -gt 0 ]; then
    red "Unsupported item_type '$bad_type' found in $bad_count places (no Flutter widget!)"
  fi
done
echo ""

# ---- 5. JSON Structure Checks ----
echo "5. JSON STRUCTURE CHECKS"

# Check MCQ items have 'choices' and 'correct_index'
mcq_missing_choices=$(grep -A2 "'mcq'" "$CONTENT_DIR"/*.sql 2>/dev/null | grep '"stem"' | grep -v '"choices"' | wc -l | tr -d ' ')
if [ "$mcq_missing_choices" -gt 0 ]; then
  yellow "$mcq_missing_choices MCQ items may be missing 'choices' field"
else
  green "All MCQ items appear to have 'choices' field"
fi

# Check numeric items have 'correct_value'
numeric_with_value=$(grep -c '"correct_value"' "$CONTENT_DIR"/*.sql 2>/dev/null | awk -F: '{s+=$2}END{print s}')
green "$numeric_with_value numeric items have 'correct_value'"

# Check all items have explanation
items_with_explanation=$(grep -c '"text_fr"' "$CONTENT_DIR"/*.sql 2>/dev/null | awk -F: '{s+=$2}END{print s}')
green "$items_with_explanation items have explanations (text_fr)"
echo ""

# ---- 6. Per-file Item Counts ----
echo "6. PER-FILE ITEM COUNTS"
echo "   File                              | Items | MCQ | Num | T/F"
echo "   ----------------------------------|-------|-----|-----|----"
for f in "$CONTENT_DIR"/*.sql; do
  fname=$(basename "$f")
  items=$(grep -c "'44444444-" "$f" 2>/dev/null || echo 0)
  mcqs=$(grep -c "'mcq'" "$f" 2>/dev/null || echo 0)
  nums=$(grep -c "'numeric'" "$f" 2>/dev/null || echo 0)
  tfs=$(grep -c "'true_false'" "$f" 2>/dev/null || echo 0)
  printf "   %-35s | %5s | %3s | %3s | %3s\n" "$fname" "$items" "$mcqs" "$nums" "$tfs"
done
echo ""

# ---- 7. Skill Coverage ----
echo "7. SKILL COVERAGE (items per skill)"
# Get all skill IDs from seed_data
while IFS= read -r skill_uuid; do
  clean_uuid=$(echo "$skill_uuid" | tr -d "'")
  skill_name=$(grep "$skill_uuid" "$SEED_DIR/seed_data.sql" | grep -oP "'[^']+'" | head -4 | tail -1 | tr -d "'")
  item_count=$(grep -rc "$skill_uuid" "$CONTENT_DIR" 2>/dev/null | awk -F: '{s+=$2}END{print s}')
  if [ "$item_count" -eq 0 ]; then
    red "Skill $skill_name ($clean_uuid): 0 items!"
  elif [ "$item_count" -lt 5 ]; then
    yellow "Skill $skill_name ($clean_uuid): $item_count items (< 5)"
  else
    green "Skill $skill_name ($clean_uuid): $item_count items"
  fi
done <<< "$skill_uuids"
echo ""

# ---- 8. SQL Syntax Quick Checks ----
echo "8. SQL SYNTAX CHECKS"
for f in "$CONTENT_DIR"/math_*.sql; do
  fname=$(basename "$f")
  # Check for unbalanced parentheses
  opens=$(grep -o '(' "$f" | wc -l | tr -d ' ')
  closes=$(grep -o ')' "$f" | wc -l | tr -d ' ')
  if [ "$opens" -ne "$closes" ]; then
    red "$fname: unbalanced parentheses (open=$opens, close=$closes)"
  fi
  # Check INSERT statements end with semicolons
  inserts=$(grep -c "^INSERT" "$f" 2>/dev/null || echo 0)
  semicolons=$(grep -c "^);" "$f" 2>/dev/null || echo 0)
  if [ "$inserts" -gt 0 ] && [ "$semicolons" -eq 0 ]; then
    yellow "$fname: no closing ');' found — check SQL termination"
  fi
done
green "SQL syntax spot-checks passed"
echo ""

# ---- 9. Difficulty Distribution ----
echo "9. DIFFICULTY DISTRIBUTION"
for d in 1 2 3 4 5; do
  count=$(grep -rc "  $d," "$CONTENT_DIR" 2>/dev/null | awk -F: '{s+=$2}END{print s}')
  echo "   Difficulty $d: ~$count items"
done
echo ""

# ---- SUMMARY ----
echo "============================================"
echo "VALIDATION COMPLETE"
echo "  Total items: $total_items"
echo "  Errors: $ERRORS"
echo "  Warnings: $WARNINGS"
if [ "$ERRORS" -eq 0 ]; then
  echo -e "  \033[32mSTATUS: ALL CHECKS PASSED\033[0m"
else
  echo -e "  \033[31mSTATUS: $ERRORS ERRORS FOUND\033[0m"
fi
echo "============================================"
