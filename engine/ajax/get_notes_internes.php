<?php
//initialize the session
if (!isset($_SESSION)) {
  session_start();
}
?>
<?php include_once('../functions.php'); ?>
<?php 
	
	$JSONObject = "";
	
	$id 		= connect_db();	
	$requete 	= 	"
						SELECT postingDate_d, title_v,url_t 
						FROM adm_notes_internes
						ORDER BY postingDate_d DESC
					";
	
	$resultat = mysql_query($requete) or exit(mysql_error());
	
	if(mysql_num_rows($resultat))
	{				
		
		$JSONObject	= 	'
							{
								"pdfs":
									[
						';
		$tampon = "";
		while($ligne = mysql_fetch_array($resultat))
		{
			$tampon	.=	'
								
								{
									"pdf":
										{
											"date":"'.$ligne['postingDate_d'].'",
											"name":"'.strtoupper($ligne['title_v']).'",
											"url":"'.$ligne['url_t'].'"					
										}
								},
							';
		}					
		
		$tampon		= trim($tampon);
		$tampon 	= substr($tampon, 0, -1);
		$JSONObject	.= $tampon;
			
		$JSONObject	.= 	'
									]
							}
							
						';
				
		mysql_free_result($resultat);					
	}
	else
	{
		$JSONObject	=	'
							{
								{
									"pdf":
										{
											"date":"none",
											"name":"none",
											"url":"none"					
										}
								}
							}
						';
						
		
	}	
	
	echo $JSONObject;		
	
?>