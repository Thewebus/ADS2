<?php
if (!isset($_SESSION)) 
{
  session_start();
}

if(isset($_GET['usr']) && isset($_GET['mdp']))
{
	//session_regenerate_id(true);
	$usr	= $_SESSION['usr_intranet_greenn'] = $_GET['usr'];
	$mdp	= $_SESSION['mdp_intranet_greenn'] = $_GET['mdp'];	


	
	$JSONObject	=	'
						{
							"session":
								{
									"user":"'	.$_SESSION['usr_intranet_greenn'].'",									
									"mdp":"'	.$_SESSION['mdp_intranet_greenn'].'"							
								}
						}
					';				
	
	
}
else
{
	$JSONObject	=	'
						{
							"session":
								{
									"user":"",									
									"mdp":""							
								}
						}
					';
}

echo $JSONObject;

?>