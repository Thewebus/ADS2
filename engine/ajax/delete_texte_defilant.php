<?php include_once('../functions.php'); ?>
<?php 
	
	$id_item = $_GET['id_item'];
	
	$id = connect_db();
	
	$requete = "DELETE FROM adm_textdefil WHERE id_n = '$id_item' ";
					
	$resultat = mysql_query($requete) or exit(mysql_error());
	
	echo "DONE";
	
?>