<?php
if (!isset($_SESSION)) 
{
  session_start();
}

if(isset($_SESSION['usr_intranet_greenn']) && isset($_SESSION['mdp_intranet_greenn']))
{
	//session_regenerate_id(true);
	
	$usr	= $_SESSION['usr_intranet_greenn'];
	$mdp	= $_SESSION['mdp_intranet_greenn'];	
	
	$JSONObject	=	'
						{
							"session":
								{
									"user":"'	.$usr.'",									
									"mdp":"'	.$mdp.'"							
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