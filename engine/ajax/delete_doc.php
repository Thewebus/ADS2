<?php include_once('../functions.php'); ?>
<?php 
	
	$id_item 	= 	$_GET['id_item'];	
		
	$id = connect_db();	
	
	//Recuperation du lien du document ...
	$file_url		=	"";
		
	$requete = "
					SELECT * 
					FROM adm_docs
					WHERE  id_n = '$id_item'
				";
	$resultat = mysql_query($requete) or exit(mysql_error());
	
	if($ligne=mysql_fetch_array($resultat))
	{
		$file_url 	= $ligne['url_t'];
	}
	else
		exit(mysql_error());
		
		
	
	//Suppression dans la BDD, si réussie, suppression du ficher ...						
	if($resultat = mysql_query("DELETE FROM adm_docs WHERE id_n = '$id_item' "))
	{
		//if(!unlink($file_url)) exit("FILE_NOT_DELETED");
		if(!unlink('../../'.$file_url)) exit($file_url);
		
	} else exit(mysql_error());
			
	echo "DONE";
	
?>