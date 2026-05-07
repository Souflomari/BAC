-- ============================================================
-- Bac Exam Seed Data
-- National Baccalaureate Exams 2016-2024
-- Sources: taalime.ma, sigmaths.net
-- ============================================================

-- ============================================================
-- Sciences Math A & B - Mathematics Exams
-- ============================================================

-- 2024 Normale - Math
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
VALUES (
  'a1b2c3d4-0001-0000-0000-000000000001',
  2024, 'normale', 'sciences_maths_a',
  (SELECT id FROM subjects WHERE code = 'math'),
  '2024-06-07',
  180, 20,
  'https://drive.google.com/file/d/1pPLM-O2VYY-NW7lEDEtUKL3gMMgcGU1s/view',
  TRUE,
  NOW()
);

-- 2024 Rattrapage - Math
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
VALUES (
  'a1b2c3d4-0001-0000-0000-000000000002',
  2024, 'rattrapage', 'sciences_maths_a',
  (SELECT id FROM subjects WHERE code = 'math'),
  '2024-07-08',
  180, 20,
  'https://drive.google.com/file/d/1yDzmuDkFwxdrrTP-jxOb_NWU1no9n_tY/view',
  TRUE,
  NOW()
);

-- 2023 Normale - Math
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
VALUES (
  'a1b2c3d4-0001-0000-0000-000000000003',
  2023, 'normale', 'sciences_maths_a',
  (SELECT id FROM subjects WHERE code = 'math'),
  '2023-06-07',
  180, 20,
  'https://drive.google.com/file/d/1xjxMvY57ibxlbB2W76jqzSHws8tulq2e/view',
  TRUE,
  NOW()
);

-- 2023 Rattrapage - Math
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
VALUES (
  'a1b2c3d4-0001-0000-0000-000000000004',
  2023, 'rattrapage', 'sciences_maths_a',
  (SELECT id FROM subjects WHERE code = 'math'),
  '2023-07-05',
  180, 20,
  'https://drive.google.com/file/d/1eJrxXPcGFA2JCKjqAP4BdvhTOXsKVWuX/view',
  TRUE,
  NOW()
);

-- 2022 Normale - Math
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
VALUES (
  'a1b2c3d4-0001-0000-0000-000000000005',
  2022, 'normale', 'sciences_maths_a',
  (SELECT id FROM subjects WHERE code = 'math'),
  '2022-06-08',
  180, 20,
  'https://drive.google.com/file/d/1-UDiXkwbE03ZTTe2_lzkO5HK5a7SFWOR/view',
  TRUE,
  NOW()
);

-- 2022 Rattrapage - Math
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
VALUES (
  'a1b2c3d4-0001-0000-0000-000000000006',
  2022, 'rattrapage', 'sciences_maths_a',
  (SELECT id FROM subjects WHERE code = 'math'),
  '2022-07-06',
  180, 20,
  'https://drive.google.com/file/d/1yBSFxnvMT2RDBkxB1GdEIY4kM3vV7J3M/view',
  TRUE,
  NOW()
);

-- 2021 Normale - Math
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
VALUES (
  'a1b2c3d4-0001-0000-0000-000000000007',
  2021, 'normale', 'sciences_maths_a',
  (SELECT id FROM subjects WHERE code = 'math'),
  '2021-06-08',
  180, 20,
  'https://drive.google.com/file/d/1PPVuCL-tOugYigE-tkqAplo2aiibil34/view',
  TRUE,
  NOW()
);

-- 2021 Rattrapage - Math
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
VALUES (
  'a1b2c3d4-0001-0000-0000-000000000008',
  2021, 'rattrapage', 'sciences_maths_a',
  (SELECT id FROM subjects WHERE code = 'math'),
  '2021-07-07',
  180, 20,
  'https://drive.google.com/file/d/1yJnZ3tpyVhACbJ5Q4btvXOiCvIG4vEy3/view',
  TRUE,
  NOW()
);

-- 2020 Normale - Math
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
VALUES (
  'a1b2c3d4-0001-0000-0000-000000000009',
  2020, 'normale', 'sciences_maths_a',
  (SELECT id FROM subjects WHERE code = 'math'),
  '2020-06-03',
  180, 20,
  'https://drive.google.com/file/d/1AthiTn_Xm24PWEREUBNwj3FPLEsklvam/view',
  TRUE,
  NOW()
);

-- 2020 Rattrapage - Math
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
VALUES (
  'a1b2c3d4-0001-0000-0000-000000000010',
  2020, 'rattrapage', 'sciences_maths_a',
  (SELECT id FROM subjects WHERE code = 'math'),
  '2020-07-20',
  180, 20,
  'https://drive.google.com/file/d/1zs8AeZrqJVpUkj2dAgCUO7wgrW5PBkCU/view',
  TRUE,
  NOW()
);

-- 2019 Normale - Math
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
VALUES (
  'a1b2c3d4-0001-0000-0000-000000000011',
  2019, 'normale', 'sciences_maths_a',
  (SELECT id FROM subjects WHERE code = 'math'),
  '2019-06-05',
  180, 20,
  'https://drive.google.com/file/d/1TkeOKO-VGrKBrs7yPW8EHckq6Zo8XuM7/view',
  TRUE,
  NOW()
);

-- 2019 Rattrapage - Math
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
VALUES (
  'a1b2c3d4-0001-0000-0000-000000000012',
  2019, 'rattrapage', 'sciences_maths_a',
  (SELECT id FROM subjects WHERE code = 'math'),
  '2019-07-03',
  180, 20,
  'https://drive.google.com/file/d/1n8XK_zyzBOZxBFxXt0AurEC2i3QD7Twp/view',
  TRUE,
  NOW()
);

-- 2018 Normale - Math
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
VALUES (
  'a1b2c3d4-0001-0000-0000-000000000013',
  2018, 'normale', 'sciences_maths_a',
  (SELECT id FROM subjects WHERE code = 'math'),
  '2018-06-06',
  180, 20,
  'https://drive.google.com/file/d/1NflDSo4n7VsPyv-8ugMjq2HNSeYwpudp/view',
  TRUE,
  NOW()
);

-- 2018 Rattrapage - Math
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
VALUES (
  'a1b2c3d4-0001-0000-0000-000000000014',
  2018, 'rattrapage', 'sciences_maths_a',
  (SELECT id FROM subjects WHERE code = 'math'),
  '2018-07-04',
  180, 20,
  'https://drive.google.com/file/d/12lWmpVuP20sl7ABP2EHaRmNhxo3UCGM6/view',
  TRUE,
  NOW()
);

-- 2017 Normale - Math
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
VALUES (
  'a1b2c3d4-0001-0000-0000-000000000015',
  2017, 'normale', 'sciences_maths_a',
  (SELECT id FROM subjects WHERE code = 'math'),
  '2017-06-07',
  180, 20,
  'https://drive.google.com/file/d/1nUk0-Mt4SAJDy4c-M0JZEHGjiNoQKz9f/view',
  TRUE,
  NOW()
);

-- 2017 Rattrapage - Math
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
VALUES (
  'a1b2c3d4-0001-0000-0000-000000000016',
  2017, 'rattrapage', 'sciences_maths_a',
  (SELECT id FROM subjects WHERE code = 'math'),
  '2017-07-05',
  180, 20,
  'https://drive.google.com/file/d/1_EpAmCwDmHVzVLbASVzPWaOioZeb9yZ3/view',
  TRUE,
  NOW()
);

-- 2016 Normale - Math
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
VALUES (
  'a1b2c3d4-0001-0000-0000-000000000017',
  2016, 'normale', 'sciences_maths_a',
  (SELECT id FROM subjects WHERE code = 'math'),
  '2016-06-08',
  180, 20,
  'https://drive.google.com/file/d/18RRmH9Dh9zrtmyMw51l_7CRKm22uqsvy/view',
  TRUE,
  NOW()
);

-- 2016 Rattrapage - Math
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
VALUES (
  'a1b2c3d4-0001-0000-0000-000000000018',
  2016, 'rattrapage', 'sciences_maths_a',
  (SELECT id FROM subjects WHERE code = 'math'),
  '2016-07-06',
  180, 20,
  'https://drive.google.com/file/d/1djtHs07qowJwmVAFTSB9xIQ4uVqt3Bun/view',
  TRUE,
  NOW()
);

-- ============================================================
-- Sciences Math - Physics/Chemistry Exams
-- ============================================================

-- 2024 Normale - Physics
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
VALUES (
  'a1b2c3d4-0002-0000-0000-000000000001',
  2024, 'normale', 'sciences_maths_a',
  (SELECT id FROM subjects WHERE code = 'physics'),
  '2024-06-11',
  180, 20,
  'https://www.taalime.ma/examen-national-pc-physique-bac-sciences-mathematique-2024-normale-rattrapage-avec-correction-biof/',
  TRUE,
  NOW()
);

-- 2023 Normale - Physics
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
VALUES (
  'a1b2c3d4-0002-0000-0000-000000000002',
  2023, 'normale', 'sciences_maths_a',
  (SELECT id FROM subjects WHERE code = 'physics'),
  '2023-06-12',
  180, 20,
  'https://www.taalime.ma/examen-national-pc-physique-bac-sm-sciences-math-2023-normale-rattrapage-avec-correction-biof/',
  TRUE,
  NOW()
);

-- 2022 Normale - Physics
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
VALUES (
  'a1b2c3d4-0002-0000-0000-000000000003',
  2022, 'normale', 'sciences_maths_a',
  (SELECT id FROM subjects WHERE code = 'physics'),
  '2022-06-13',
  180, 20,
  'https://www.taalime.ma/examen-national-pc-physique-bac-sciences-mathematique-2022-normale-rattrapage-avec-correction-biof/',
  TRUE,
  NOW()
);

-- ============================================================
-- Sciences Physiques - Mathematics Exams
-- ============================================================

-- 2024 Normale - Math Sciences Physiques
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
VALUES (
  'a1b2c3d4-0003-0000-0000-000000000001',
  2024, 'normale', 'sciences_physiques',
  (SELECT id FROM subjects WHERE code = 'math'),
  '2024-06-07',
  180, 20,
  'https://www.taalime.ma/examen-national-math-bac-sciences-physique-svt-avec-correction-biof-pdf-maroc/',
  TRUE,
  NOW()
);

-- 2023 Normale - Math Sciences Physiques
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
VALUES (
  'a1b2c3d4-0003-0000-0000-000000000002',
  2023, 'normale', 'sciences_physiques',
  (SELECT id FROM subjects WHERE code = 'math'),
  '2023-06-07',
  180, 20,
  'https://www.sigmaths.net/bac2/bacMaroc.php',
  TRUE,
  NOW()
);

-- ============================================================
-- Sciences Physiques - Physics/Chemistry Exams
-- ============================================================

-- 2024 Normale - Physics Sciences Physiques
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
VALUES (
  'a1b2c3d4-0004-0000-0000-000000000001',
  2024, 'normale', 'sciences_physiques',
  (SELECT id FROM subjects WHERE code = 'physics'),
  '2024-06-11',
  180, 20,
  'https://www.taalime.ma/examen-national-pc-physique-chimie-bac-sciences-sp-physique-2024-normale-rattrapage-avec-correction-biof/',
  TRUE,
  NOW()
);

-- 2023 Normale - Physics Sciences Physiques
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
VALUES (
  'a1b2c3d4-0004-0000-0000-000000000002',
  2023, 'normale', 'sciences_physiques',
  (SELECT id FROM subjects WHERE code = 'physics'),
  '2023-06-12',
  180, 20,
  'https://www.taalime.ma/examen-national-pc-physique-chimie-bac-sciences-sp-physique-2023-normale-rattrapage-avec-correction-biof/',
  TRUE,
  NOW()
);

-- 2022 Normale - Physics Sciences Physiques
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
VALUES (
  'a1b2c3d4-0004-0000-0000-000000000003',
  2022, 'normale', 'sciences_physiques',
  (SELECT id FROM subjects WHERE code = 'physics'),
  '2022-06-13',
  180, 20,
  'https://www.taalime.ma/examen-national-pc-physique-chimie-bac-sciences-physique-2022-normale-rattrapage-avec-correction-biof/',
  TRUE,
  NOW()
);

-- ============================================================
-- SVT Stream - SVT Exams
-- ============================================================

-- 2024 Normale - SVT Sciences Math
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
VALUES (
  'a1b2c3d4-0005-0000-0000-000000000001',
  2024, 'normale', 'sciences_maths_a',
  (SELECT id FROM subjects WHERE code = 'svt'),
  '2024-06-14',
  180, 20,
  'https://www.taalime.ma/examen-national-svt-bac-sciences-mathematique-2024-normale-rattrapage-avec-correction-biof/',
  TRUE,
  NOW()
);

-- 2023 Normale - SVT Sciences Math
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
VALUES (
  'a1b2c3d4-0005-0000-0000-000000000002',
  2023, 'normale', 'sciences_maths_a',
  (SELECT id FROM subjects WHERE code = 'svt'),
  '2023-06-14',
  180, 20,
  'https://www.taalime.ma/examen-national-svt-bac-sciences-math-2023-normale-rattrapage-avec-correction-biof/',
  TRUE,
  NOW()
);

-- 2022 Normale - SVT Sciences Math
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
VALUES (
  'a1b2c3d4-0005-0000-0000-000000000003',
  2022, 'normale', 'sciences_maths_a',
  (SELECT id FROM subjects WHERE code = 'svt'),
  '2022-06-15',
  180, 20,
  'https://www.taalime.ma/examen-national-svt-bac-sm-mathematique-2022-normale-rattrapage-avec-correction-biof/',
  TRUE,
  NOW()
);

-- ============================================================
-- SVT Stream - SVT Exams (SVT stream)
-- ============================================================

-- 2024 Normale - SVT SVT stream
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
VALUES (
  'a1b2c3d4-0006-0000-0000-000000000001',
  2024, 'normale', 'svt',
  (SELECT id FROM subjects WHERE code = 'svt'),
  '2024-06-14',
  180, 20,
  'https://www.taalime.ma/examen-national-svt-bac-sciences-physique-sp-2024-avec-correction-biof-pdf-maroc/',
  TRUE,
  NOW()
);

-- 2023 Normale - SVT SVT stream
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
VALUES (
  'a1b2c3d4-0006-0000-0000-000000000002',
  2023, 'normale', 'svt',
  (SELECT id FROM subjects WHERE code = 'svt'),
  '2023-06-14',
  180, 20,
  'https://www.taalime.ma/examen-national-svt-bac-sciences-physique-sp-2023-avec-correction-biof/',
  TRUE,
  NOW()
);

-- ============================================================
-- Sciences Physiques - SVT Exams
-- ============================================================

-- 2024 Normale - SVT Sciences Physiques
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
VALUES (
  'a1b2c3d4-0007-0000-0000-000000000001',
  2024, 'normale', 'sciences_physiques',
  (SELECT id FROM subjects WHERE code = 'svt'),
  '2024-06-14',
  180, 20,
  'https://www.taalime.ma/examen-national-svt-bac-sciences-physique-sp-2024-avec-correction-biof-pdf-maroc/',
  TRUE,
  NOW()
);

-- ============================================================
-- Sciences Physiques - Physics/Chemistry SVT stream
-- ============================================================

-- 2024 Normale - Physics SVT stream
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
VALUES (
  'a1b2c3d4-0008-0000-0000-000000000001',
  2024, 'normale', 'svt',
  (SELECT id FROM subjects WHERE code = 'physics'),
  '2024-06-11',
  180, 20,
  'https://www.taalime.ma/examen-national-pc-physique-chimie-bac-sciences-svt-2024-normale-rattrapage-avec-correction-biof/',
  TRUE,
  NOW()
);

-- 2023 Normale - Physics SVT stream
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
VALUES (
  'a1b2c3d4-0008-0000-0000-000000000002',
  2023, 'normale', 'svt',
  (SELECT id FROM subjects WHERE code = 'physics'),
  '2023-06-12',
  180, 20,
  'https://www.taalime.ma/examen-national-pc-physique-bac-sciences-svt-2023-normale-rattrapage-avec-correction-biof/',
  TRUE,
  NOW()
);

-- 2022 Normale - Physics SVT stream
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
VALUES (
  'a1b2c3d4-0008-0000-0000-000000000003',
  2022, 'normale', 'svt',
  (SELECT id FROM subjects WHERE code = 'physics'),
  '2022-06-13',
  180, 20,
  'https://www.taalime.ma/examen-national-pc-physique-bac-sciences-svt-2021-normale-rattrapage-avec-correction-biof/',
  TRUE,
  NOW()
);

-- ============================================================
-- Sciences Physiques - Math SVT stream
-- ============================================================

-- 2024 Normale - Math SVT stream
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
VALUES (
  'a1b2c3d4-0009-0000-0000-000000000001',
  2024, 'normale', 'svt',
  (SELECT id FROM subjects WHERE code = 'math'),
  '2024-06-07',
  180, 20,
  'https://www.taalime.ma/examen-national-math-bac-sciences-physique-svt-avec-correction-biof-pdf-maroc/',
  TRUE,
  NOW()
);
