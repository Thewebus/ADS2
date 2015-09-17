<?php include_once('../functions.php'); ?>
<?php 
	
	$id = connect_db();
	$requete = "
					SELECT * 
					FROM adm_entreprise
					WHERE statut_v = 'ON'
					ORDER BY id_n DESC
				";
					
	$resultat = mysql_query($requete) or exit(mysql_error());
	
	$html = "";
	if(mysql_num_rows($resultat))
	{
	
		$html 	= '<div id="big_title">';
		$html 	.= 'Welcome to our world';
		$html 	.= '</div>';			
		
		while($ligne=mysql_fetch_array($resultat))
		{
			$html 	.= '<div id="company_elem">';
			$html 	.= '<div id="title">';
			$html 	.= utf8_encode($ligne['title_v']);
			$html 	.= '</div>';
			$html 	.= '<div id="post_infos">';
			$html 	.= $ligne['postingDate_d'];
			$html 	.= '</div>';
			$html 	.= '<div id="media">';
			$html 	.= '<img name="" src="'.$ligne['url_t'].'" width="348" height="100" alt="" />';
			$html 	.= '</div>';
			$html 	.= '<div id="text">';
			$html 	.= utf8_encode(substr($ligne['text_t'],0,300))." ...";
			$html 	.= '</div>';
			$html 	.= '<div id="details">';
			$html 	.= '<button id="show_entreprise_details">Afficher</button>';
			$html 	.= '<input type="hidden" name="id_infos_company" id="id_infos_company" value="'.$ligne['id_n'].'" />';
			$html 	.= '</div>';
			$html 	.= '</div>';
		}		
		
	}
	
	if($html == "")
		$html = "Aucune information pour l'instant ...";
	
	echo $html;
	
	mysql_close($id);
	
?>