<?php include_once('../functions.php'); ?>
<?php 
	
	$texteSpotlight = NULL;
	
	$id = connect_db();
	$requete = "
					SELECT * 
					FROM adm_textdefil
					WHERE statut_v = 'on'
					AND spotlight_v = 'on'
					ORDER BY id_n DESC
				";
					
	$resultat = mysql_query($requete) or exit(mysql_error());
	
	while($ligne=mysql_fetch_array($resultat))
	{
		$texteSpotlight .= '<div class="spotlight_date">'.$ligne['postingDate_d'].'<div>';
		$texteSpotlight .= "<blockquote>";
		$texteSpotlight .= '<div class="spotlight_text">'.($ligne['text_t']).'<div>';
		$texteSpotlight .= "</blockquote>";		
	}
	
	if($texteSpotlight == NULL)
	{		
		$texteSpotlight .= "<blockquote>";
		$texteSpotlight .= "Aucun message pour l'instant ...";
		$texteSpotlight .= "<blockquote>";
		
	}
	
	$texteSpotlight .= "</br>";
	$texteSpotlight .= "</br>";
	
	echo utf8_decode($texteSpotlight);
	
	
?>