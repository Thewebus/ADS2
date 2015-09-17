<?php include_once('../functions.php'); ?>
<?php 
	
	$title 		= $_GET['title'];
	$content 	= $_GET['content'];
	$status 	= $_GET['status'];
	$urlimg 	= $_GET['urlimg'];
	
	$title		= utf8_decode($title);
	$content	= utf8_decode($content);
	$urlimg		= utf8_decode($urlimg);
	
	$postingDate		= date("Y-m-d H:i:s");
	$postedBy			= "unknow";
	
	$id = connect_db();
	
	$requete = sprintf("INSERT INTO adm_motdg (title_v,url_t,text_t,statut_v,postingDate_d,postedBy_v) values (%s,%s,%s,%s,'%s','%s')",
					GetSQLValueString($title,"text"),
					GetSQLValueString($urlimg,"text"),
					GetSQLValueString($content,"text"),
					GetSQLValueString($status,"text"),
					$postingDate,
					$postedBy);
					
	$resultat = mysql_query($requete) or exit(mysql_error());
	
	echo "DONE";
	
?>