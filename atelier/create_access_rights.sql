CREATE TABLE IF NOT EXISTS `adm_access_rights` (
  `id` int(11) NOT NULL auto_increment,
  `usr_profile` enum('RH','AUDIT','COM') NOT NULL,
  `rights` text NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Contenu de la table `adm_access_rights`
--

INSERT INTO `adm_access_rights` (`id`, `usr_profile`, `rights`) VALUES
(1, 'RH', '<span id="admin_docs_rh"> <a href="javascript:void()"> Docs RH </a> </span><br />'),
(2, 'AUDIT', '<span id="admin_docs_aq"> <a href="javascript:void()"> Docs Audit/Qualit&eacute; </a> </span><br />'),
(3, 'COM', '<span id="admin_entreprise"> <a href="javascript:void()"> Infos Entreprise </a> </span><br />'),
(4, 'RH', '<span id="admin_motdg"> <a href="javascript:void()"> Le Mot du DG </a> </span><br />'),
(5, 'RH', '<span id="admin_notes_internes"> <a href="javascript:void()"> Notes Internes</a> </span><br />'),
(6, 'COM', '<span id="admin_infos_defil_lateral"> <a href="javascript:void()"> Infos d&eacute;filantes/lat&eacute;rales</a> </span><br />');
