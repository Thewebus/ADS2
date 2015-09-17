<?php 
//++++++++++++++++ Connexions des fonctions à la BDD  ++++++++++++++++ */
if (!function_exists("connect_db")) {
	function connect_db(){
		
		//BDD GREENN
		$hostname 	= 'localhost';
		$username 	= 'spi_web_user';
		$password 	= 'spi_web_user';		
		$database 	= 'greenn_intranet_db';			
		
		$conn		= mysql_connect($hostname, $username, $password) or trigger_error(mysql_error(),E_USER_ERROR);	
		$conn_db	= mysql_select_db($database, $conn);
		
		return $conn;
		
	}
}
?>