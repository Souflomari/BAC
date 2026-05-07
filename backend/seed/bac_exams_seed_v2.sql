-- ============================================================
-- Bac Exam Seed Data - Complete Edition
-- Sources: taalime.ma, sigmaths.net
-- 
-- This file contains:
-- 1. Sciences Math A/B - Math exams 2016-2024
-- 2. Sciences Math A/B - Physics exams 2022-2024
-- 3. Sciences Physiques - Math & Physics exams 2022-2024
-- 4. SVT Stream - SVT exams 2022-2024
-- 5. Sample questions with solutions for 2024 exams
-- ============================================================

BEGIN;

-- ============================================================
-- SECTION 1: Sciences Math - Mathematics (2016-2024)
-- ============================================================

-- 2024 Normale - Math Sciences Maths A
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-mat-2024-n', 
  2024, 
  'normale', 
  'sciences_maths_a',
  s.id,
  '2024-06-07',
  180, 
  20,
  'https://drive.google.com/file/d/1pPLM-O2VYY-NW7lEDEtUKL3gMMgcGU1s/view',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'math';

-- 2024 Rattrapage - Math Sciences Maths A
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-mat-2024-r', 
  2024, 
  'rattrapage', 
  'sciences_maths_a',
  s.id,
  '2024-07-08',
  180, 
  20,
  'https://drive.google.com/file/d/1yDzmuDkFwxdrrTP-jxOb_NWU1no9n_tY/view',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'math';

-- 2023 Normale - Math Sciences Maths A
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-mat-2023-n', 
  2023, 
  'normale', 
  'sciences_maths_a',
  s.id,
  '2023-06-07',
  180, 
  20,
  'https://drive.google.com/file/d/1xjxMvY57ibxlbB2W76jqzSHws8tulq2e/view',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'math';

-- 2023 Rattrapage - Math Sciences Maths A
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-mat-2023-r', 
  2023, 
  'rattrapage', 
  'sciences_maths_a',
  s.id,
  '2023-07-05',
  180, 
  20,
  'https://drive.google.com/file/d/1eJrxXPcGFA2JCKjqAP4BdvhTOXsKVWuX/view',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'math';

-- 2022 Normale - Math Sciences Maths A
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-mat-2022-n', 
  2022, 
  'normale', 
  'sciences_maths_a',
  s.id,
  '2022-06-08',
  180, 
  20,
  'https://drive.google.com/file/d/1-UDiXkwbE03ZTTe2_lzkO5HK5a7SFWOR/view',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'math';

-- 2022 Rattrapage - Math Sciences Maths A
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-mat-2022-r', 
  2022, 
  'rattrapage', 
  'sciences_maths_a',
  s.id,
  '2022-07-06',
  180, 
  20,
  'https://drive.google.com/file/d/1yBSFxnvMT2RDBkxB1GdEIY4kM3vV7J3M/view',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'math';

-- 2021 Normale - Math Sciences Maths A
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-mat-2021-n', 
  2021, 
  'normale', 
  'sciences_maths_a',
  s.id,
  '2021-06-08',
  180, 
  20,
  'https://drive.google.com/file/d/1PPVuCL-tOugYigE-tkqAplo2aiibil34/view',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'math';

-- 2021 Rattrapage - Math Sciences Maths A
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-mat-2021-r', 
  2021, 
  'rattrapage', 
  'sciences_maths_a',
  s.id,
  '2021-07-07',
  180, 
  20,
  'https://drive.google.com/file/d/1yJnZ3tpyVhACbJ5Q4btvXOiCvIG4vEy3/view',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'math';

-- 2020 Normale - Math Sciences Maths A
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-mat-2020-n', 
  2020, 
  'normale', 
  'sciences_maths_a',
  s.id,
  '2020-06-03',
  180, 
  20,
  'https://drive.google.com/file/d/1AthiTn_Xm24PWEREUBNwj3FPLEsklvam/view',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'math';

-- 2020 Rattrapage - Math Sciences Maths A
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-mat-2020-r', 
  2020, 
  'rattrapage', 
  'sciences_maths_a',
  s.id,
  '2020-07-20',
  180, 
  20,
  'https://drive.google.com/file/d/1zs8AeZrqJVpUkj2dAgCUO7wgrW5PBkCU/view',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'math';

-- 2019 Normale - Math Sciences Maths A
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-mat-2019-n', 
  2019, 
  'normale', 
  'sciences_maths_a',
  s.id,
  '2019-06-05',
  180, 
  20,
  'https://drive.google.com/file/d/1TkeOKO-VGrKBrs7yPW8EHckq6Zo8XuM7/view',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'math';

-- 2019 Rattrapage - Math Sciences Maths A
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-mat-2019-r', 
  2019, 
  'rattrapage', 
  'sciences_maths_a',
  s.id,
  '2019-07-03',
  180, 
  20,
  'https://drive.google.com/file/d/1n8XK_zyzBOZxBFxXt0AurEC2i3QD7Twp/view',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'math';

-- 2018 Normale - Math Sciences Maths A
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-mat-2018-n', 
  2018, 
  'normale', 
  'sciences_maths_a',
  s.id,
  '2018-06-06',
  180, 
  20,
  'https://drive.google.com/file/d/1NflDSo4n7VsPyv-8ugMjq2HNSeYwpudp/view',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'math';

-- 2018 Rattrapage - Math Sciences Maths A
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-mat-2018-r', 
  2018, 
  'rattrapage', 
  'sciences_maths_a',
  s.id,
  '2018-07-04',
  180, 
  20,
  'https://drive.google.com/file/d/12lWmpVuP20sl7ABP2EHaRmNhxo3UCGM6/view',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'math';

-- 2017 Normale - Math Sciences Maths A
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-mat-2017-n', 
  2017, 
  'normale', 
  'sciences_maths_a',
  s.id,
  '2017-06-07',
  180, 
  20,
  'https://drive.google.com/file/d/1nUk0-Mt4SAJDy4c-M0JZEHGjiNoQKz9f/view',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'math';

-- 2017 Rattrapage - Math Sciences Maths A
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-mat-2017-r', 
  2017, 
  'rattrapage', 
  'sciences_maths_a',
  s.id,
  '2017-07-05',
  180, 
  20,
  'https://drive.google.com/file/d/1_EpAmCwDmHVzVLbASVzPWaOioZeb9yZ3/view',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'math';

-- 2016 Normale - Math Sciences Maths A
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-mat-2016-n', 
  2016, 
  'normale', 
  'sciences_maths_a',
  s.id,
  '2016-06-08',
  180, 
  20,
  'https://drive.google.com/file/d/18RRmH9Dh9zrtmyMw51l_7CRKm22uqsvy/view',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'math';

-- 2016 Rattrapage - Math Sciences Maths A
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-mat-2016-r', 
  2016, 
  'rattrapage', 
  'sciences_maths_a',
  s.id,
  '2016-07-06',
  180, 
  20,
  'https://drive.google.com/file/d/1djtHs07qowJwmVAFTSB9xIQ4uVqt3Bun/view',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'math';

-- ============================================================
-- SECTION 2: Sciences Math - Physics/Chemistry (2022-2024)
-- ============================================================

-- 2024 Normale - Physics Sciences Maths A
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-pc-2024-n', 
  2024, 
  'normale', 
  'sciences_maths_a',
  s.id,
  '2024-06-11',
  180, 
  20,
  'https://www.taalime.ma/examen-national-pc-physique-bac-sciences-mathematique-2024-normale-rattrapage-avec-correction-biof/',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'physics';

-- 2023 Normale - Physics Sciences Maths A
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-pc-2023-n', 
  2023, 
  'normale', 
  'sciences_maths_a',
  s.id,
  '2023-06-12',
  180, 
  20,
  'https://www.taalime.ma/examen-national-pc-physique-bac-sm-sciences-math-2023-normale-rattrapage-avec-correction-biof/',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'physics';

-- 2022 Normale - Physics Sciences Maths A
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-pc-2022-n', 
  2022, 
  'normale', 
  'sciences_maths_a',
  s.id,
  '2022-06-13',
  180, 
  20,
  'https://www.taalime.ma/examen-national-pc-physique-bac-sciences-mathematique-2022-normale-rattrapage-avec-correction-biof/',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'physics';

-- ============================================================
-- SECTION 3: Sciences Physiques - Math & Physics (2022-2024)
-- ============================================================

-- 2024 Normale - Math Sciences Physiques
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sp-mat-2024-n', 
  2024, 
  'normale', 
  'sciences_physiques',
  s.id,
  '2024-06-07',
  180, 
  20,
  'https://www.taalime.ma/examen-national-math-bac-sciences-physique-svt-avec-correction-biof-pdf-maroc/',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'math';

-- 2024 Normale - Physics Sciences Physiques
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sp-pc-2024-n', 
  2024, 
  'normale', 
  'sciences_physiques',
  s.id,
  '2024-06-11',
  180, 
  20,
  'https://www.taalime.ma/examen-national-pc-physique-chimie-bac-sciences-sp-physique-2024-normale-rattrapage-avec-correction-biof/',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'physics';

-- 2023 Normale - Physics Sciences Physiques
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sp-pc-2023-n', 
  2023, 
  'normale', 
  'sciences_physiques',
  s.id,
  '2023-06-12',
  180, 
  20,
  'https://www.taalime.ma/examen-national-pc-physique-chimie-bac-sciences-sp-physique-2023-normale-rattrapage-avec-correction-biof/',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'physics';

-- 2022 Normale - Physics Sciences Physiques
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sp-pc-2022-n', 
  2022, 
  'normale', 
  'sciences_physiques',
  s.id,
  '2022-06-13',
  180, 
  20,
  'https://www.taalime.ma/examen-national-pc-physique-chimie-bac-sciences-physique-2022-normale-rattrapage-avec-correction-biof/',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'physics';

-- ============================================================
-- SECTION 4: SVT Stream - SVT Exams (2022-2024)
-- ============================================================

-- 2024 Normale - SVT Sciences Math
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-svt-2024-n', 
  2024, 
  'normale', 
  'sciences_maths_a',
  s.id,
  '2024-06-14',
  180, 
  20,
  'https://www.taalime.ma/examen-national-svt-bac-sciences-mathematique-2024-normale-rattrapage-avec-correction-biof/',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'svt';

-- 2023 Normale - SVT Sciences Math
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-svt-2023-n', 
  2023, 
  'normale', 
  'sciences_maths_a',
  s.id,
  '2023-06-14',
  180, 
  20,
  'https://www.taalime.ma/examen-national-svt-bac-sciences-math-2023-normale-rattrapage-avec-correction-biof/',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'svt';

-- 2022 Normale - SVT Sciences Math
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-svt-2022-n', 
  2022, 
  'normale', 
  'sciences_maths_a',
  s.id,
  '2022-06-15',
  180, 
  20,
  'https://www.taalime.ma/examen-national-svt-bac-sm-mathematique-2022-normale-rattrapage-avec-correction-biof/',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'svt';

-- 2024 Normale - SVT SVT Stream
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-svt-2024-n', 
  2024, 
  'normale', 
  'svt',
  s.id,
  '2024-06-14',
  180, 
  20,
  'https://www.taalime.ma/examen-national-svt-bac-sciences-physique-sp-2024-avec-correction-biof-pdf-maroc/',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'svt';

-- 2023 Normale - SVT SVT Stream
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-svt-2023-n', 
  2023, 
  'normale', 
  'svt',
  s.id,
  '2023-06-14',
  180, 
  20,
  'https://www.taalime.ma/examen-national-svt-bac-sciences-physique-sp-2023-avec-correction-biof/',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'svt';

-- ============================================================
-- SECTION 5: SVT Stream - Physics/Chemistry
-- ============================================================

-- 2024 Normale - Physics SVT Stream
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-svt-pc-2024-n', 
  2024, 
  'normale', 
  'svt',
  s.id,
  '2024-06-11',
  180, 
  20,
  'https://www.taalime.ma/examen-national-pc-physique-chimie-bac-sciences-svt-2024-normale-rattrapage-avec-correction-biof/',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'physics';

-- 2023 Normale - Physics SVT Stream
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-svt-pc-2023-n', 
  2023, 
  'normale', 
  'svt',
  s.id,
  '2023-06-12',
  180, 
  20,
  'https://www.taalime.ma/examen-national-pc-physique-bac-sciences-svt-2023-normale-rattrapage-avec-correction-biof/',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'physics';

-- 2022 Normale - Physics SVT Stream
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-svt-pc-2022-n', 
  2022, 
  'normale', 
  'svt',
  s.id,
  '2022-06-13',
  180, 
  20,
  'https://www.taalime.ma/examen-national-pc-physique-bac-sciences-svt-2021-normale-rattrapage-avec-correction-biof/',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'physics';

-- 2024 Normale - Math SVT Stream
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-svt-mat-2024-n', 
  2024, 
  'normale', 
  'svt',
  s.id,
  '2024-06-07',
  180, 
  20,
  'https://www.taalime.ma/examen-national-math-bac-sciences-physique-svt-avec-correction-biof-pdf-maroc/',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'math';

COMMIT;
