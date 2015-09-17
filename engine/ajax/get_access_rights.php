<?php
//initialize the session
if (!isset($_SESSION)) {
  session_start();
}
?>
<?php include('../functions.php'); ?>
<?php 
	
	
	$login 	= $_GET['usergreenn'];
	$mdp 	= $_GET['passgreenn'];
		
	echo	 3($login,$mdp);
	
?>