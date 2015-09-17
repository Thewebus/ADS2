<?php include_once('../functions.php'); ?>
<?php 
	
	$texteDefilant = "";
	
	$id = connect_db();
	$requete = "
					SELECT * 
					FROM adm_textdefil
					WHERE statut_v = 'on'
					AND spotlight_v = 'off'
					ORDER BY id_n ASC
				";
					
	$resultat = mysql_query($requete) or exit(mysql_error());
	
	while($ligne=mysql_fetch_array($resultat))
	{
		
		$texteDefilant .= '&nbsp;&nbsp;&nbsp;&nbsp;***&nbsp;&nbsp;&nbsp;&nbsp;';
		$texteDefilant = $texteDefilant.$ligne['text_t'];
		
	}
	
	if($texteDefilant == "")
		$texteDefilant = "&nbsp;&nbsp;&nbsp;&nbsp;*** Aucun message pour l'instant ...";
	
	
	echo ($texteDefilant);
	
	mysql_close($id);
?>