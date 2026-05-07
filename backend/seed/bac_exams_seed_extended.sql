-- ============================================================
-- Bac Exam Seed Data - Extended (2008-2015)
-- Sciences Math A - Mathematics
-- ============================================================

BEGIN;

-- 2015 Normale - Math Sciences Maths A
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-mat-2015-n', 
  2015, 
  'normale', 
  'sciences_maths_a',
  s.id,
  '2015-06-09',
  180, 
  20,
  'https://drive.google.com/file/d/1BR790_J5YCPcIbzyt_JqiAiwry5L_i_3/view',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'math';

-- 2015 Rattrapage - Math Sciences Maths A
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-mat-2015-r', 
  2015, 
  'rattrapage', 
  'sciences_maths_a',
  s.id,
  '2015-07-07',
  180, 
  20,
  'https://drive.google.com/file/d/1ze-tOEhZ5s_4iX_NNR_scRimejPoOdEh/view',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'math';

-- 2014 Normale - Math Sciences Maths A
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-mat-2014-n', 
  2014, 
  'normale', 
  'sciences_maths_a',
  s.id,
  '2014-06-04',
  180, 
  20,
  'https://drive.google.com/file/d/1YOm8FuDEpNIplBl8ciF-u_EEvbj80qWU/view',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'math';

-- 2013 Normale - Math Sciences Maths A
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-mat-2013-n', 
  2013, 
  'normale', 
  'sciences_maths_a',
  s.id,
  '2013-06-05',
  180, 
  20,
  'https://drive.google.com/file/d/1ubRp7VTreYybKT3-PIy2y8xM7bzSUz44/view',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'math';

-- 2013 Rattrapage - Math Sciences Maths A
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-mat-2013-r', 
  2013, 
  'rattrapage', 
  'sciences_maths_a',
  s.id,
  '2013-07-03',
  180, 
  20,
  'https://drive.google.com/file/d/1-Xsk4Zw7-65MLH_h0amsyNNzIAqmWf71/view',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'math';

-- 2012 Normale - Math Sciences Maths A
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-mat-2012-n', 
  2012, 
  'normale', 
  'sciences_maths_a',
  s.id,
  '2012-06-06',
  180, 
  20,
  'https://drive.google.com/file/d/1WLXct_ViMOtma_sTbKMcqJ1msmNFV-Dk/view',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'math';

-- 2012 Rattrapage - Math Sciences Maths A
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-mat-2012-r', 
  2012, 
  'rattrapage', 
  'sciences_maths_a',
  s.id,
  '2012-07-04',
  180, 
  20,
  'https://drive.google.com/file/d/127tD89vwJlX5py2lHxgDJBDsxXWxn-3X/view',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'math';

-- 2011 Normale - Math Sciences Maths A
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-mat-2011-n', 
  2011, 
  'normale', 
  'sciences_maths_a',
  s.id,
  '2011-06-08',
  180, 
  20,
  'https://drive.google.com/file/d/1mTy_rAJIehx_YdXg0Plckg9-OXVxGA64/view',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'math';

-- 2011 Rattrapage - Math Sciences Maths A
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-mat-2011-r', 
  2011, 
  'rattrapage', 
  'sciences_maths_a',
  s.id,
  '2011-07-06',
  180, 
  20,
  'https://drive.google.com/file/d/1_XnpbbQBlt47F4s6g-6O0dIkDlYF8y_M/view',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'math';

-- 2010 Normale - Math Sciences Maths A
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-mat-2010-n', 
  2010, 
  'normale', 
  'sciences_maths_a',
  s.id,
  '2010-06-09',
  180, 
  20,
  'https://drive.google.com/file/d/116tCa8pedc0VPnS8dqXiyDvDPjj6cdjh/view',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'math';

-- 2010 Rattrapage - Math Sciences Maths A
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-mat-2010-r', 
  2010, 
  'rattrapage', 
  'sciences_maths_a',
  s.id,
  '2010-07-07',
  180, 
  20,
  'https://drive.google.com/file/d/1ncq_OrI7RTZynYIcWvPCwTB6930F6ovv/view',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'math';

-- 2009 Normale - Math Sciences Maths A
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-mat-2009-n', 
  2009, 
  'normale', 
  'sciences_maths_a',
  s.id,
  '2009-06-10',
  180, 
  20,
  'https://www.taalime.ma/الامتحان-الوطني-2009-الرياضيات-الدورة-العادية-علوم-رياضية/',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'math';

-- 2008 Normale - Math Sciences Maths A
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-mat-2008-n', 
  2008, 
  'normale', 
  'sciences_maths_a',
  s.id,
  '2008-06-11',
  180, 
  20,
  'https://www.taalime.ma/الامتحان-الوطني-2008-الرياضيات-الدورة-العادية-علوم-رياضية/',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'math';

-- 2008 Rattrapage - Math Sciences Maths A
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-mat-2008-r', 
  2008, 
  'rattrapage', 
  'sciences_maths_a',
  s.id,
  '2008-07-09',
  180, 
  20,
  'https://www.taalime.ma/الامتحان-الوطني-2008-الرياضيات-إستدراكية/',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'math';

-- ============================================================
-- Sciences Physiques - Math & Physics (2008-2021)
-- ============================================================

-- 2021 Normale - Math Sciences Physiques
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sp-mat-2021-n', 
  2021, 
  'normale', 
  'sciences_physiques',
  s.id,
  '2021-06-08',
  180, 
  20,
  'https://www.taalime.ma/examen-national-math-bac-sciences-physique-svt-avec-correction-biof-pdf-maroc/',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'math';

-- 2021 Normale - Physics Sciences Physiques
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sp-pc-2021-n', 
  2021, 
  'normale', 
  'sciences_physiques',
  s.id,
  '2021-06-14',
  180, 
  20,
  'https://www.taalime.ma/examen-national-pc-physique-chimie-bac-sciences-sp-physique-2021-normale-rattrapage-avec-correction-biof/',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'physics';

-- 2020 Normale - Physics Sciences Physiques
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sp-pc-2020-n', 
  2020, 
  'normale', 
  'sciences_physiques',
  s.id,
  '2020-06-15',
  180, 
  20,
  'https://www.taalime.ma/examen-national-pc-physique-chimie-bac-sciences-sp-physique-2020-normale-rattrapage-avec-correction-biof/',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'physics';

-- 2019 Normale - Physics Sciences Physiques
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sp-pc-2019-n', 
  2019, 
  'normale', 
  'sciences_physiques',
  s.id,
  '2019-06-17',
  180, 
  20,
  'https://www.taalime.ma/examen-national-pc-physique-chimie-bac-sciences-sp-physique-2019-normale-rattrapage-avec-correction-biof/',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'physics';

-- 2018 Normale - Physics Sciences Physiques
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sp-pc-2018-n', 
  2018, 
  'normale', 
  'sciences_physiques',
  s.id,
  '2018-06-18',
  180, 
  20,
  'https://www.taalime.ma/examen-national-pc-physique-chimie-bac-sciences-sp-physique-2018-normale-rattrapage-avec-correction-biof/',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'physics';

-- 2017 Normale - Physics Sciences Physiques
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sp-pc-2017-n', 
  2017, 
  'normale', 
  'sciences_physiques',
  s.id,
  '2017-06-19',
  180, 
  20,
  'https://www.taalime.ma/examen-national-pc-physique-chimie-bac-sciences-sp-physique-2017-normale-rattrapage-avec-correction-biof/',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'physics';

-- 2016 Normale - Physics Sciences Physiques
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sp-pc-2016-n', 
  2016, 
  'normale', 
  'sciences_physiques',
  s.id,
  '2016-06-20',
  180, 
  20,
  'https://www.taalime.ma/examen-national-pc-physique-chimie-bac-sciences-sp-physique-2016-normale-rattrapage-avec-correction-biof/',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'physics';

-- 2015 Normale - Physics Sciences Physiques
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sp-pc-2015-n', 
  2015, 
  'normale', 
  'sciences_physiques',
  s.id,
  '2015-06-22',
  180, 
  20,
  'https://www.taalime.ma/examen-national-pc-physique-chimie-bac-sciences-sp-physique-2015-normale-rattrapage-avec-correction-biof/',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'physics';

-- 2014 Normale - Physics Sciences Physiques
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sp-pc-2014-n', 
  2014, 
  'normale', 
  'sciences_physiques',
  s.id,
  '2014-06-23',
  180, 
  20,
  'https://www.taalime.ma/examen-national-pc-physique-chimie-bac-sciences-sp-physique-2014-normale-rattrapage-avec-correction-biof/',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'physics';

-- ============================================================
-- SVT Stream Exams (2008-2021)
-- ============================================================

-- 2021 Normale - SVT Sciences Math
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-svt-2021-n', 
  2021, 
  'normale', 
  'sciences_maths_a',
  s.id,
  '2021-06-16',
  180, 
  20,
  'https://www.taalime.ma/examen-national-svt-bac-sciences-math-2021-normale-rattrapage-avec-correction-biof/',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'svt';

-- 2020 Normale - SVT Sciences Math
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-svt-2020-n', 
  2020, 
  'normale', 
  'sciences_maths_a',
  s.id,
  '2020-06-17',
  180, 
  20,
  'https://www.taalime.ma/examen-national-svt-bac-sciences-math-2020-normale-rattrapage-avec-correction-biof/',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'svt';

-- 2019 Normale - SVT Sciences Math
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-svt-2019-n', 
  2019, 
  'normale', 
  'sciences_maths_a',
  s.id,
  '2019-06-19',
  180, 
  20,
  'https://www.taalime.ma/examen-national-svt-bac-sciences-math-2019-normale-rattrapage-avec-correction-biof/',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'svt';

-- 2018 Normale - SVT Sciences Math
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-svt-2018-n', 
  2018, 
  'normale', 
  'sciences_maths_a',
  s.id,
  '2018-06-20',
  180, 
  20,
  'https://www.taalime.ma/examen-national-svt-bac-sciences-math-2018-normale-rattrapage-avec-correction-biof/',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'svt';

-- 2017 Normale - SVT Sciences Math
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-sm-svt-2017-n', 
  2017, 
  'normale', 
  'sciences_maths_a',
  s.id,
  '2017-06-21',
  180, 
  20,
  'https://www.taalime.ma/examen-national-svt-bac-sciences-math-2017-normale-rattrapage-avec-correction-biof/',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'svt';

-- 2021 Normale - SVT SVT stream
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-svt-2021-n', 
  2021, 
  'normale', 
  'svt',
  s.id,
  '2021-06-16',
  180, 
  20,
  'https://www.taalime.ma/examen-national-svt-bac-sciences-de-la-vie-et-de-la-terre-2021-normale-rattrapage-avec-correction-biof/',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'svt';

-- 2020 Normale - SVT SVT stream
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-svt-2020-n', 
  2020, 
  'normale', 
  'svt',
  s.id,
  '2020-06-17',
  180, 
  20,
  'https://www.taalime.ma/examen-national-svt-bac-sciences-de-la-vie-et-de-la-terre-2020-normale-rattrapage-avec-correction-biof/',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'svt';

-- 2019 Normale - SVT SVT stream
INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
SELECT 
  'bac-svt-2019-n', 
  2019, 
  'normale', 
  'svt',
  s.id,
  '2019-06-19',
  180, 
  20,
  'https://www.taalime.ma/examen-national-svt-bac-sciences-de-la-vie-et-de-la-terre-2019-normale-rattrapage-avec-correction-biof/',
  TRUE,
  NOW()
FROM subjects s WHERE s.code = 'svt';

COMMIT;
