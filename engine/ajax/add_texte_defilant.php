<?php include_once('../functions.php'); ?>
<?php 
	
	$textDefilant 			= $_GET['textDefilant'];
	$spotlightTexteDefilant = $_GET['spotlightTexteDefilant'];
	$statutTexteDefilant 	= "on";
	
	
	$postingDate			= date("Y-m-d H:i:s");
	$postedBy				= "unknow";
	
	$id = connect_db();
	
	$requete = sprintf("INSERT INTO adm_textdefil (text_t,statut_v,spotlight_v,postingDate_d,postedBy_v) values (%s,%s,'%s','%s','%s')",
					GetSQLValueString($textDefilant,"text"),
					GetSQLValueString($statutTexteDefilant,"text"),
					$spotlightTexteDefilant,
					$postingDate,
					$postedBy);
					
	$resultat = mysql_query($requete) or exit(mysql_error());
	
	echo "DONE";
	
?>