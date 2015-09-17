<?php include_once('../functions.php'); ?>
<?php 
	
	$id_item 		= $_GET['id_item'];
	$value_item 	= $_GET['value_item'];
	
	$id = connect_db();
	
	$requete = "UPDATE adm_notes_internes SET statut_v = '$value_item' WHERE id_n = '$id_item' ";
					
	$resultat = mysql_query($requete) or exit(mysql_error());
	
	echo "DONE";
	
?>