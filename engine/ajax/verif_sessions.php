<?php
if (!isset($_SESSION)) 
{
  session_start();
}
	
if(isset($_SESSION['usr_intranet_greenn']) && isset($_SESSION['mdp_intranet_greenn']))
{
	
	$JSONObject	=	'
						{
							"usr":
								{
									"name":"'	.$_SESSION['usr_intranet_greenn'].'",									
									"mdp":"'	.$_SESSION['mdp_intranet_greenn'].'"							
								}
						}
					';
	echo $JSONObject;
	
	
}
else
{
	$JSONObject	=	'
						{
							"usr":
								{
									"name":"none",									
									"mdp":"none"							
								}
						}
					';
	echo $JSONObject;
}
?>