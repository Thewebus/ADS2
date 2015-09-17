<?php
//initialize the session
if (!isset($_SESSION)) {
  session_start();
}

$_SESSION['usr_nm_intranet_greenn']	= $_GET['user'];	
$_SESSION['mdp_intranet_greenn']		= $_GET['pass'];

	
if(isset($_SESSION['usr_nm_intranet_greenn']) && isset($_SESSION['mdp_intranet_greenn']))
{
	echo "SESSION_EXISTS";
}
else
{
	echo "SESSION_DOES_NOT_EXIST";
}
?>