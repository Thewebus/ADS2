-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le: Mar 25 Juin 2013 à 11:50
-- Version du serveur: 5.5.24-log
-- Version de PHP: 5.3.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `greenn_intranet_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `adm_docs`
--

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=17 ;

--
-- Contenu de la table `adm_docs`
--

INSERT INTO `adm_docs` (`id_n`, `nm_v`, `ext_v`, `cat_n`, `typ_n`, `url_t`, `status_v`, `origi_nm_v`, `upl_by_v`, `upl_the_d`) VALUES
(10, 'Rapports_astreintes', 'xlsx', 3, 1, 'uploads/docs/3/Template_rapport astreinte.xlsx', 'on', 'Template_rapport astreinte.xlsx', 'unknow', '2013-06-22 22:19:55'),
(11, 'Gestion_des_demandes', 'docx', 3, 2, 'uploads/docs/3/PROCEDURE DE GESTION DES DEMANDES.docx', 'on', 'PROCEDURE DE GESTION DES DEMANDES.docx', 'unknow', '2013-06-23 14:55:37'),
(12, 'Changements', 'docx', 3, 4, 'uploads/docs/3/PROCEDURE DE GESTION DES CHANGEMENTS.docx', 'on', 'PROCEDURE DE GESTION DES CHANGEMENTS.docx', 'unknow', '2013-06-24 08:50:57'),
(13, 'Fiche_de_controle', 'docx', 3, 1, 'uploads/docs/3/FICHE CONTRÔLE.docx', 'on', 'FICHE CONTRÃ”LE.docx', 'unknow', '2013-06-24 08:51:22'),
(14, 'GreenN_newsletter', 'pdf', 3, 1, 'uploads/docs/3/GreenN newsletter - April 2013 En .pdf', 'on', 'GreenN newsletter - April 2013 En .pdf', 'unknow', '2013-06-24 09:26:11'),
(15, 'PV_Elections_2013', 'pdf', 4, 2, 'uploads/docs/4/PV DEPOUILLEMENT ELECTIONS SOCIALES 2013.pdf', 'on', 'PV DEPOUILLEMENT ELECTIONS SOCIALES 2013.pdf', 'unknow', '2013-06-25 11:39:35'),
(16, 'DCM_réorganisation', 'pdf', 4, 3, 'uploads/docs/4/Réorganisation DCM.pdf', 'on', 'RÃ©organisation DCM.pdf', 'unknow', '2013-06-25 11:40:49');

-- --------------------------------------------------------

--
-- Structure de la table `adm_docs_cat`
--

CREATE TABLE IF NOT EXISTS `adm_docs_cat` (
  `id_n` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cat_nm_v` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_n`),
  KEY `cat_nm_v` (`cat_nm_v`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Contenu de la table `adm_docs_cat`
--

INSERT INTO `adm_docs_cat` (`id_n`, `cat_nm_v`) VALUES
(3, 'Audit et Qualité'),
(2, 'Notes internes'),
(1, 'Organisation'),
(4, 'Ressources humaines');

-- --------------------------------------------------------

--
-- Structure de la table `adm_docs_typ`
--

CREATE TABLE IF NOT EXISTS `adm_docs_typ` (
  `id_n` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `typ_nm_v` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_n`),
  KEY `typ_nm_v` (`typ_nm_v`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Contenu de la table `adm_docs_typ`
--

INSERT INTO `adm_docs_typ` (`id_n`, `typ_nm_v`) VALUES
(4, 'Modes Opératoires'),
(3, 'Organigramme'),
(2, 'Procédures'),
(1, 'Templates');

-- --------------------------------------------------------

--
-- Structure de la table `adm_entreprise`
--

CREATE TABLE IF NOT EXISTS `adm_entreprise` (
  `id_n` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title_v` varchar(255) DEFAULT NULL,
  `text_t` text,
  `url_t` text,
  `postingDate_d` datetime DEFAULT NULL,
  `postedBy_v` varchar(200) DEFAULT NULL,
  `statut_v` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id_n`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=30 ;

--
-- Contenu de la table `adm_entreprise`
--

INSERT INTO `adm_entreprise` (`id_n`, `title_v`, `text_t`, `url_t`, `postingDate_d`, `postedBy_v`, `statut_v`) VALUES
(27, 'NEWS FROM IVORY COAST', 'Over the course of two days, the senior management team met to recap on successes and improvements during 2012, and to think, discuss and create the new strategy for 2013.  \nAlthough LAP GreenN CI has had some fantastic success stories during the year, which of course came together with many challenges - one thing is for sure:  GreenN CI wants more! \nWe want more satisfaction for customers, more customers, better quality networks, and better days for our inspiring brand and company! \nFollowing these two days of brainstorming and discuss- ing strategy, senior managers from all departments shared exciting findings for the coming months with the staff at a one-day workshop. Staff members were encouraged to participate in developing GreenN CI?s new vision and values, and when the day came to an end, everyone was engaged in a fruitful team effort that resulted in an exciting vision.  We are very enthusi- astic, and more than ready to move forward with this new and intriguing approach.', 'uploads/ie/files/dsidays.jpg', '2013-06-25 10:43:53', 'unknow', 'on'),
(29, 'One Group, One Office !', 'In a first initiative of its kind, Group members and top management across all operations gathered in Enteb- be for a three-day meeting. The key objective of the meeting was the presentation of the new group strate- gy that sets the direction for the future of the compa- ny. Beyond this agenda was jam-packed with country reviews, partner and vendor presentations, and team assignments. All aspects of our business were discussed - from the current situation to opportunities, potential drawbacks and future positioning in the market. \nThe event also included surprises, such as the unveil- ing of the new group logo and branded cocktail party for everyone involved. The workshop ended on a very positive note, and participants went away excited with the new direction of our Group and happy to have met with colleagues in a friendly informal environment, and to share ideas and exchange opinions. \nThe next such event will take place in dubai in May.', 'uploads/ie/files/group.jpg', '2013-06-25 10:57:00', 'unknow', 'on');

-- --------------------------------------------------------

--
-- Structure de la table `adm_logs`
--

CREATE TABLE IF NOT EXISTS `adm_logs` (
  `id_n` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `action_v` varchar(200) DEFAULT NULL,
  `made_by_v` varchar(200) DEFAULT NULL,
  `made_the_d` datetime DEFAULT NULL,
  PRIMARY KEY (`id_n`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `adm_motdg`
--

CREATE TABLE IF NOT EXISTS `adm_motdg` (
  `id_n` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title_v` varchar(255) DEFAULT NULL,
  `text_t` text,
  `url_t` text,
  `postingDate_d` datetime DEFAULT NULL,
  `postedBy_v` varchar(200) DEFAULT NULL,
  `statut_v` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id_n`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Contenu de la table `adm_motdg`
--

INSERT INTO `adm_motdg` (`id_n`, `title_v`, `text_t`, `url_t`, `postingDate_d`, `postedBy_v`, `statut_v`) VALUES
(1, 'STRATEGY WORKSHOP', 'In a first initiative of its kind, Group members and top management across all operations gathered in Enteb- be for a three-day meeting. The key objective of the meeting was the presentation of the new group strate- gy that sets the direction for the future of the compa- ny. Beyond this agenda was jam-packed with country reviews, partner and vendor presentations, and team assignments. All aspects of our business were discussed - from the current situation to opportunities, potential drawbacks and future positioning in the market. \nThe event also included surprises, such as the unveil- ing of the new group logo and branded cocktail party for everyone involved. The workshop ended on a very positive note, and participants went away excited with the new direction of our Group and happy to have met with colleagues in a friendly informal environment, and to share ideas and exchange opinions.', 'uploads/mdg/files/dgpict1.jpg', '2013-06-12 17:17:59', 'unknow', 'on');

-- --------------------------------------------------------

--
-- Structure de la table `adm_textdefil`
--

CREATE TABLE IF NOT EXISTS `adm_textdefil` (
  `id_n` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `text_t` text,
  `postingDate_d` datetime DEFAULT NULL,
  `postedBy_v` varchar(200) DEFAULT NULL,
  `statut_v` varchar(5) DEFAULT NULL,
  `spotlight_v` varchar(3) NOT NULL,
  PRIMARY KEY (`id_n`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=33 ;

--
-- Contenu de la table `adm_textdefil`
--

INSERT INTO `adm_textdefil` (`id_n`, `text_t`, `postingDate_d`, `postedBy_v`, `statut_v`, `spotlight_v`) VALUES
(1, 'Bienvenue sur l''intranet de GreenN CÃ´te d''Ivoire ...', '2013-06-12 17:33:18', 'unknow', 'on', 'off'),
(2, 'Ce texte dÃ©filant possÃ¨de des fonctionnalitÃ©s particuliÃ¨res: vous pouvez positionner la souris dessus pour le stopper, ou cliquer-glisser de la gauche vers la droite ou inversement, si vous souhaitez lire plus vite ou plus lentement.', '2013-06-12 17:39:39', 'unknow', 'on', 'off'),
(3, 'Powered entierly by Project & Integration Service - DSI', '2013-06-12 17:41:02', 'unknow', 'on', 'off'),
(5, 'Cette zone servira Ã  l''affichage des informations "spotlight": les visiteurs les verront plus rapidement, du premier coup d''oeil sur l''Intranet.', '2013-06-12 17:44:48', 'unknow', 'on', 'on'),
(6, 'Chers GreenNers, nous avons le plaisir de vous informer que les virements sont effectuÃ©s ce jour.', '2013-06-12 17:50:09', 'unknow', 'on', 'on'),
(14, 'GreenN Intranet 1.0', '2013-06-14 09:56:10', 'unknow', 'off', 'off');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
