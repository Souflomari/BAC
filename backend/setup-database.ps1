# BacPrep Database Setup Script
# Run this script to populate the database with exams and questions

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  BacPrep Database Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Supabase CLI is available
$supabaseCmd = Get-Command supabase -ErrorAction SilentlyContinue
$psqlCmd = Get-Command psql -ErrorAction SilentlyContinue

if ($supabaseCmd) {
    Write-Host "[1] Using Supabase CLI..." -ForegroundColor Yellow
    
    # Run migrations
    Write-Host "Pushing migrations..." -ForegroundColor Cyan
    supabase db push --db-url "postgresql://postgres:__REMOVED__@localhost:54322/postgres"
    
    # Run seed data
    Write-Host "Running seed data..." -ForegroundColor Cyan
    supabase db seed --db-url "postgresql://postgres:__REMOVED__@localhost:54322/postgres" --file "seed_setup.sql"
    
} elseif ($psqlCmd) {
    Write-Host "[2] Using psql directly..." -ForegroundColor Yellow
    
    # Run the setup script
    Write-Host "Executing SQL..." -ForegroundColor Cyan
    & psql -h localhost -p 54322 -U postgres -d postgres -f "seed_setup.sql"
    
} else {
    Write-Host "[!] Neither Supabase CLI nor psql found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install one of the following:" -ForegroundColor Yellow
    Write-Host "  1. Supabase CLI: https://supabase.com/docs/guides/cli"
    Write-Host "     npm install -g supabase"
    Write-Host "     supabase login"
    Write-Host ""
    Write-Host "  2. PostgreSQL client:"
    Write-Host "     choco install postgresql -y  # Windows"
    Write-Host "     brew install postgresql     # macOS"
    Write-Host "     apt install postgresql-client  # Linux"
    Write-Host ""
    Write-Host "Alternative: Import seed_setup.sql manually via:" -ForegroundColor Yellow
    Write-Host "  - Supabase Dashboard > SQL Editor"
    Write-Host "  - pgAdmin"
    Write-Host "  - DBeaver"
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "You can now:" -ForegroundColor Cyan
Write-Host "  1. Start the Flutter app: flutter run" -ForegroundColor White
Write-Host "  2. Browse exams at /exams" -ForegroundColor White
Write-Host "  3. Practice with interactive widgets" -ForegroundColor White
Write-Host ""
