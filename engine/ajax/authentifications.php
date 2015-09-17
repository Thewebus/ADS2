<?php
//initialize the session
if (!isset($_SESSION)) {
  session_start();
}
?>
<?php include_once('../functions.php'); ?>
<?php 
	
	$usr 	= $_GET['usergreenn'];
	$mdp 	= $_GET['passgreenn'];
	
	$mdp 	= encrypt_mdp($mdp);
	
	$id 		= connect_db();	
	$requete 	= 	"
					SELECT DISTINCT usr_name, usr_pname
					FROM adm_accounts
					WHERE login 	= '$usr'
					AND mdp	 		= '$mdp'
				";
	
	$resultat = mysql_query($requete) or exit(mysql_error());
	
	if(mysql_num_rows($resultat))
	{				
		$ligne = mysql_fetch_array($resultat);					
		
		$JSONObject	=	'
							{
								"usr":
									{
										"name":"'.$ligne['usr_name'].'",
										"pname":"'.$ligne['usr_pname'].'",
										"login":"'.$usr.'",
										"pass":"'.$mdp.'"					
									}
							}
						';
				
		echo $JSONObject;
		mysql_free_result($resultat);					
	}
	else
	{
		$JSONObject	=	'
							{
								"usr":
									{
										"name":"",
										"pname":""							
									}
							}
						';
						
		echo $JSONObject;
	}	
	
		
	
?>