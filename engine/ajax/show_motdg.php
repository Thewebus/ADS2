<?php include_once('../functions.php'); ?>
<?php 
		
	$id = connect_db();
	$requete = "
					SELECT * 
					FROM adm_motdg
					WHERE statut_v = 'ON'
					ORDER BY id_n DESC 
				";
					
	$resultat = mysql_query($requete) or exit(mysql_error());
	
	$html = "";

	if($ligne=mysql_fetch_array($resultat))
	{
		$html 	= '<div id="motdg_elem">';
		$html 	.= '<div id="title">';
		$html 	.= utf8_encode($ligne['title_v']);
		$html 	.= '</div>';
		$html 	.= '<div id="post_infos">';
		$html 	.= utf8_encode($ligne['postingDate_d']);
		$html 	.= '</div>';
		$html 	.= '<div id="media">';
		$html 	.= '<img name="" src="'.($ligne['url_t']).'" width="100%" height="200" alt="Tous droits reservés - GreenN CI" style="background-color: #009900" />';
		$html 	.= '</div>';
		$html 	.= '<div id="text">';
		$html 	.= ($ligne['text_t']);
		$html 	.= '</div>';
		$html 	.= '<div id="details_back">';
		$html 	.= '<button id="close_motdg">Retour</button>';
		$html 	.= '<input type="hidden" name="id_motdg" id="id_motdg" />';
		$html 	.= '</div>';
		$html 	.= '<div id="no_content">';
		$html 	.= '</div>';
		$html 	.= '</div>';
	}

	
	if($html == "")
		$html = "Aucun message du DG pour l'instant ...";
	
	
	echo $html;
	
	mysql_close($id);
	
?>