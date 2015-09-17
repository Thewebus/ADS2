<?php include_once('../../upgradephp/upgrade.php'); ?>
<?php include_once('../functions.php'); ?>
<?php 
	
	$usr 	= $_GET['usergreenn'];
	$mdp 	= $_GET['passgreenn'];
	
	$id 		= connect_db();	
	$requete 	= 	"
					SELECT DISTINCT usr_name, usr_pname
					FROM adm_accounts
					WHERE login 	= '$usr'
					AND mdp	 	= '$mdp'
				";
	
	$resultat = mysql_query($requete) or exit(mysql_error());
	if(mysql_num_rows($resultat))
	{				
		$ligne 		= mysql_fetch_array($resultat);					
		
		$JSONObject	=	'
							{
								"usr"	:
											{
												"name"		:"'.$ligne['usr_name'].'",
												"pname"		:"'.$ligne['usr_pname'].'",
												"login"		:"'.$usr.'",
												"pass"		:"'.$mdp.'"					
											}
								
						';
		
		$requete 		= 	"
							SELECT ar.usr_profile, ar.id_value, ar.displayed_value
							FROM adm_accounts acc, adm_access_rights ar
							WHERE acc.login = '$usr'
							AND acc.mdp = '$mdp'
							AND ar.status = 'on'
							AND acc.usr_profile = ar.usr_profile;
						";
										
		$rslt = mysql_query($requete) or exit(mysql_error());
		if (mysql_num_rows($rslt))
		{
			
			$JSONObject	.= 	',
								"links"	:
									[
							';
								
			$tampon = "";
			while($ligne = mysql_fetch_array($rslt))
			{	
				$tampon	.= 	'			
								{
									"profile"	:"'.$ligne['usr_profile'].'",
									"val_id"		:"'.$ligne['id_value'].'",
									"val_displayed"	:"'.$ligne['displayed_value'].'"														
								}
								,
							';
			}
			
			$tampon	= trim($tampon);
			$tampon 	= substr($tampon, 0, -1);
			$JSONObject	.= $tampon;
			
			
			$JSONObject	.= 	'						
								]	
							';
			
			mysql_free_result($rslt);
		}
		else
		{
			$JSONObject	.=	'
								{
									"usr_profile"	:"none",
									"rights"		:"none"															
								}
							';
		}
		
		$JSONObject	.=	'				
							}
						';
						
		echo $JSONObject;
		mysql_free_result($resultat);
	}
	else
	{
		$JSONObject	=	'
							{
								"usr"	:
											{
												"name":"none",
												"pname":"none"							
											}
							}
						';
						
		echo $JSONObject;
	}	
			
	mysql_close($id);
?>