<?php include_once('../functions.php'); ?>
<?php

$doc_nm 	= $_GET['doc_nm'];

try
{
	check_characters($doc_nm);		
	//check_name_availability($doc_nm);	
	echo "TRUE";
}
catch(Exception $e)
{
	echo trim($e->getMessage());
}

?>