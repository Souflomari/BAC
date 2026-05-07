-- ============================================================
-- Migration: Add interactive item types to enum
-- Required for exam_questions table
-- ============================================================

-- Add new item types for interactive exam questions
ALTER TYPE item_type ADD VALUE IF NOT EXISTS 'graph';
ALTER TYPE item_type ADD VALUE IF NOT EXISTS 'simulate';
ALTER TYPE item_type ADD VALUE IF NOT EXISTS 'dragPoint';
ALTER TYPE item_type ADD VALUE IF NOT EXISTS 'adjustSlider';
