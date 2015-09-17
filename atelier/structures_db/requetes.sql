insert into adm_textdefil (text_t) values ('Bienvenue sur notre intranet !!!');
SELECT * 
					FROM adm_textdefil
					WHERE statut_v = 'ON'
					ORDER BY id_n DESC;


drop table sections;