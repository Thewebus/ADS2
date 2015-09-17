<?php
//initialize the session
if (!isset($_SESSION)) {
  session_start();
}
	
if(isset($_SESSION['usr_intranet_greenn']) && isset($_SESSION['mdp_intranet_greenn']))
{
	$_SESSION['usr_intranet_greenn'] = NULL;
	$_SESSION['mdp_intranet_greenn'] = NULL;	
	
  	unset($_SESSION['usr_intranet_greenn']);
	unset($_SESSION['mdp_intranet_greenn']);
}

?>