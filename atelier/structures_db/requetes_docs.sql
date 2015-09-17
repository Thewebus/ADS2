SELECT DISTINCT c.cat_nm_v, c.id_n
FROM adm_docs d, adm_docs_cat c
WHERE d.cat_n = c.id_n
;

SELECT DISTINCT t.typ_nm_v, t.id_n
FROM adm_docs d, adm_docs_typ t
WHERE d.typ_n = t.id_n
AND d.cat_n = '3'
;

SELECT *
FROM adm_docs 
WHERE cat_n = '3'
AND typ_n = '2'
ORDER BY id_n DESC
;

SELECT d.id_n, d.nm_v, d.ext_v,  d.typ_n, t.typ_nm_v, c.cat_nm_v, d.status_v
FROM adm_docs d, adm_docs_cat c, adm_docs_typ t 
WHERE c.id_n = '3'
AND d.cat_n = c.id_n
AND d.typ_n = t.id_n
ORDER BY d.typ_n ASC
;