CREATE TABLE IF NOT EXISTS `adm_textDefil` (
	id_n int(10) unsigned NOT NULL AUTO_INCREMENT,
	text_t text,
	postingDate_d datetime DEFAULT NULL,
	postedBy_v varchar(200) DEFAULT NULL,
	statut_v varchar(5) DEFAULT NULL,
	PRIMARY KEY (`id_n`)
)ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `adm_infosEntrep` (
	id_n int(10) unsigned NOT NULL AUTO_INCREMENT,
	title_v varchar(255),
	text_t text,
	url_t text,
	postingDate_d datetime DEFAULT NULL,
	postedBy_v varchar(200),
	statut_v varchar(5),
	PRIMARY KEY (`id_n`)
)ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `adm_infosentrep` (
  `id_n` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title_v` varchar(255) DEFAULT NULL,
  `text_t` text,
  `url_t` text,
  `postingDate_d` datetime DEFAULT NULL,
  `postedBy_v` varchar(200) DEFAULT NULL,
  `statut_v` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id_n`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `adm_logs` (
  `id_n` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `action_v` varchar(200) DEFAULT NULL, 
  `made_by_v` varchar(200) DEFAULT NULL,  
  `made_the_d` datetime DEFAULT NULL,
  PRIMARY KEY (`id_n`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `adm_docs` (
  `id_n` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nm_v` varchar(200) DEFAULT NULL,
  `ext_v` varchar(5) DEFAULT NULL,
  `cat_n` int(10) DEFAULT NULL,
  `typ_n` int(10) DEFAULT NULL,
  `url_t` text,
  `status_v` varchar(5) DEFAULT NULL,
  `origi_nm_v` varchar(255) NOT NULL,
  `upl_by_v` varchar(200) DEFAULT NULL,
  `upl_the_d` datetime DEFAULT NULL,
  PRIMARY KEY (`id_n`),
  KEY `cat_n` (`cat_n`),
  KEY `typ_n` (`typ_n`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 ;



CREATE TABLE IF NOT EXISTS `adm_docs_cat` (
  `id_n` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cat_nm_v` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_n`),
  KEY `cat_nm_v` (`cat_nm_v`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
INSERT INTO `adm_docs_cat` (`cat_nm_v`) VALUES
('Organisation'),
('Notes internes'),
('Audit et Qualité'),
('Ressources humaines');

INSERT INTO `adm_docs_cat` (`cat_nm_v`) VALUES
('');


CREATE TABLE IF NOT EXISTS `adm_docs_typ` (
  `id_n` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `typ_nm_v` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_n`),
  KEY `typ_nm_v` (`typ_nm_v`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
INSERT INTO `adm_docs_typ` (`typ_nm_v`) VALUES
('Templates'),
('Procédures'),
('Organigramme'),
('Modes Opératoires');

