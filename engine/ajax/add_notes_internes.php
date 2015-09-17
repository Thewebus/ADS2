<?php include_once('../functions.php'); ?>
<?php 
	
	$title 		= $_GET['title'];
	$content 	= "";
	$status 	= $_GET['status'];
	$urlimg 	= $_GET['urlimg'];
	$pstdby 	= $_GET['pstdby'];
	
	$title		= utf8_decode($title);
	$content	= utf8_decode($content);
	$urlimg		= utf8_decode($urlimg);
	$postedBy	= utf8_decode($pstdby);
	
	
	$postingDate	= date("Y-m-d H:i:s");
	
	
	$id = connect_db();
	
	$requete = sprintf("INSERT INTO adm_notes_internes (title_v,url_t,text_t,statut_v,postingDate_d,postedBy_v) values (%s,%s,%s,%s,'%s','%s')",
					GetSQLValueString($title,"text"),
					GetSQLValueString($urlimg,"text"),
					GetSQLValueString($content,"text"),
					GetSQLValueString($status,"text"),
					$postingDate,
					$postedBy);
					
	$resultat = mysql_query($requete) or exit(mysql_error());
	
	echo "DONE";
	
?>