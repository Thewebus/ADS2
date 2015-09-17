<?php include_once('../functions.php'); ?>
<?php 

if(isset($_GET['compte']) && isset($_GET['action']))
{	
		$compte				= $_GET['compte'];
		$action 			= $_GET['action'];
		
		$id = connect_db();
		
		$requete = sprintf("INSERT INTO adm_logs (action_v,made_by_v) values ('%s','%s')",						
							$action,
							$compte);
						
		$resultat = mysql_query($requete) or exit(mysql_error());	
			
		echo $action;
		
}
else
{
	echo "action_not_logged";
}

?>