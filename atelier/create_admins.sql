CREATE TABLE IF NOT EXISTS `adm_accounts` (
  `id` int(11) NOT NULL auto_increment,
  `login` varchar(100) NOT NULL,
  `mdp` varchar(100) NOT NULL,
  `usr_profile` varchar(50) NOT NULL,
  `usr_pname` varchar(100) NOT NULL,
  `usr_name` varchar(100) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Contenu de la table `adm_accounts`
--

INSERT INTO `adm_accounts` (`id`, `login`, `mdp`, `usr_profile`, `usr_pname`, `usr_name`) VALUES
(1, '60000710', '60000710', 'RH', 'Jacques Hermann', 'GOUDE'),
(2, '60000710', '60000710', 'COM', 'Jacques Hermann', 'GOUDE'),
(3, '60000710', '60000710', 'AUDIT', 'Jacques Hermann', 'GOUDE');