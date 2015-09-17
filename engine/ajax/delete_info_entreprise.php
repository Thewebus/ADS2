<?php include_once('../functions.php'); ?>
<?php 
	
	$id_item 	= 	$_GET['id_item'];	
		
	$id = connect_db();	
	
	//Recuperation du lien de l'image ...
	$file_url		=	"";
	$thumbnail_url	= 	"";
	
	$requete = "
					SELECT * 
					FROM adm_entreprise
					WHERE  id_n = '$id_item'
				";
	$resultat = mysql_query($requete) or exit(mysql_error());
	
	if($ligne=mysql_fetch_array($resultat))
	{
		$file_url 		= '../../'.$ligne['url_t'];
		
		$portion 		= substr(strrchr($ligne['url_t'], "/"), 1);
		$thumbnail_url	= '../../'.str_replace($portion,"",$ligne['url_t']).'thumbnail/'.$portion;
	}
	else
		exit(mysql_error());	
	
	
	//Suppression dans la BDD, si réussie, suppression du ficher ...						
	if($resultat = mysql_query("DELETE FROM adm_entreprise WHERE id_n = '$id_item' "))
	{
		if(!unlink($file_url)) exit("FILE_NOT_DELETED");
		if(!unlink($thumbnail_url)) exit("FILE_NOT_DELETED");
		
	} else exit(mysql_error());
			
	echo "DONE";
	
?>