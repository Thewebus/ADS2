<?php include_once('../functions.php'); ?>
<?php

$doc_nm 	= $_GET['doc_nm'];
$doc_cat = $_GET['doc_cat'];
$doc_type = $_GET['doc_type'];
$status = $_GET['status'];
$urldoc = $_GET['urldoc'];

$cat = $_GET['cat'];

$url_mini = 'uploads/docs/' . $cat . '/files/';

$originame = $_GET['originame'];
$doc_ext = substr(strrchr($originame, "."), 1);

$doc_nm = ucfirst_no_space_no_accents($doc_nm);
$doc_nm = utf8_decode($doc_nm);

$urldoc = utf8_decode($urldoc);


$postingDate = date("Y-m-d H:i:s");
$postedBy = "unknow";

$id = connect_db();

$requete = sprintf("INSERT INTO adm_docs (
												nm_v,
												ext_v,
												cat_n,
												typ_n,
												url_t,
												status_v,
												origi_nm_v,
												upl_by_v,
												upl_the_d
											) values (%s,%s,%s,%s,%s,%s,%s,'%s','%s')", GetSQLValueString($doc_nm, "text"), GetSQLValueString($doc_ext, "text"), GetSQLValueString($doc_cat, "int"), GetSQLValueString($doc_type, "int"), GetSQLValueString($urldoc, "text"), GetSQLValueString($status, "text"), GetSQLValueString($originame, "text"), $postedBy, $postingDate);

$resultat = mysql_query($requete) or exit(mysql_error());

echo "DONE";
?>