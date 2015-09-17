<?php include_once('core.php'); ?>
<?php 
/******************************** Empecher les injections SQL **********************************************************/ 
if (!function_exists("GetSQLValueString")) {
	function GetSQLValueString($theValue, $theType, $theDefinedValue = "", $theNotDefinedValue = "") 
	{
	  if (PHP_VERSION < 6) {
		$theValue = get_magic_quotes_gpc() ? stripslashes($theValue) : $theValue;
	  }
	
	  $theValue = function_exists("mysql_real_escape_string") ? mysql_real_escape_string($theValue) : mysql_escape_string($theValue);
	
	  switch ($theType) {
		case "text":
		  $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
		  break;    
		case "long":
		case "int":
		  $theValue = ($theValue != "") ? intval($theValue) : "NULL";
		  break;
		case "double":
		  $theValue = ($theValue != "") ? doubleval($theValue) : "NULL";
		  break;
		case "date":
		  $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
		  break;
		case "defined":
		  $theValue = ($theValue != "") ? $theDefinedValue : $theNotDefinedValue;
		  break;
	  }
	  return $theValue;
	}
}

/******************************** Mots de passe **********************************************************/ 
if (!function_exists("encrypt_mdp")) {
	function encrypt_mdp($mdp) 
	{
		return md5($mdp);
	}
}

/******************************** Historiques des actions **********************************************************/ 
if (!function_exists("recup_session")) 
{
	function recup_session() 
	{
		if (!isset($_SESSION)) 
		{
		  session_start();
		  session_regenerate_id(true);
		}
		
		if(isset($_SESSION['usr_nm_intranet_greenn']))
		{
			return $_SESSION['usr_nm_intranet_greenn'];
		}
		else
		{
			return FALSE;
		}
		
	}
}

/******************************** Formattage de chaines de caractères **********************************************************/ 
if (!function_exists("ucfirst_no_space_no_accents")) {
	function ucfirst_no_space_no_accents($value) 
	{
		//$value = strstr($value,"àâéèêïç","aaeeeic");		
		$value = ucfirst($value);
		$value = str_replace(" ","_",$value);
		
		return $value;
	}
}

/******************************** Selection des categories **********************************************************/ 
if (!function_exists("show_docs_categories")) {
	function show_docs_categories() 
	{
		$id = connect_db();
		$requete = 	"
						SELECT DISTINCT c.cat_nm_v, c.id_n
						FROM adm_docs d, adm_docs_cat c
						WHERE d.cat_n = c.id_n
						AND d.status_v = 'on'						
					";
					
		$resultat = mysql_query($requete) or exit(mysql_error());	
		
		return $resultat;
		
		mysql_free_result($resultat);									
	}
}

if (!function_exists("show_docs_cat")) {
	function show_docs_cat($cat_id_n) 
	{
		$id = connect_db();
		$requete = 	"
						SELECT  *
						FROM adm_docs_cat 
						WHERE id_n = '$cat_id_n'						
					";
					
		$resultat = mysql_query($requete) or exit(mysql_error());
		
		$ligne = mysql_fetch_array($resultat) or exit("DB Error !!!");
			
		return $ligne['id_n'];
		
		mysql_free_result($resultat);									
	}
}
/******************************** Selection des types **********************************************************/ 
if (!function_exists("show_docs_types")) {
	function show_docs_types($cat_value) 
	{
		$id = connect_db();
		$requete = 	"
						SELECT DISTINCT t.typ_nm_v, t.id_n
						FROM adm_docs d, adm_docs_typ t
						WHERE d.typ_n = t.id_n
						AND d.cat_n = '$cat_value'
						AND d.status_v = 'on'
					";
					
		$resultat = mysql_query($requete) or exit(mysql_error());	
		
		return $resultat;
		
		mysql_free_result($resultat);									
	}
}
/******************************** Selection des documents par categorie et par type **********************************************************/ 
if (!function_exists("show_docs_by_cat_and_types")) {
	function show_docs_by_cat_and_types($cat_value,$type_value) 
	{
		$id = connect_db();
		$requete = 	"
						SELECT *
						FROM adm_docs 
						WHERE cat_n = '$cat_value'
						AND typ_n = '$type_value'
						AND status_v = 'on'
						ORDER BY id_n DESC 
					";
					
		$resultat = mysql_query($requete) or exit(mysql_error());	
		
		return $resultat;
		
		mysql_free_result($resultat);									
	}
}

/******************************** Infos Utilisateur **********************************************************/ 
if (!function_exists("show_user_infos")) {
	function show_user_infos($login,$pass) 
	{
		$JSONObject	= "";
		$pass 		= encrypt_mdp($pass);		
		
		$id = connect_db();
		$requete = 	"
						SELECT DISTINCT usr_name, usr_pname
						FROM adm_accounts acc
						WHERE acc.login = '$login'
						AND acc.mdp = '$pass' 
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
											"pname":"'.$ligne['usr_pname'].'"							
										}
								}
							';
			//Enregistrement de la session ...				
			$_SESSION['usr_intranet_greenn']	= $login;	
			$_SESSION['mdp_intranet_greenn']	= $pass;	
							
		}	
		return $JSONObject;
		mysql_free_result($resultat);									
	}
}

/******************************** Infos Utilisateur **********************************************************/ 
if (!function_exists("json_encode_2")) {
	function json_encode_2($data)
	{            
	    if( is_array($data) || is_object($data) ) { 
		   $islist = is_array($data) && ( empty($data) || array_keys($data) === range(0,count($data)-1) ); 
		   
		   if( $islist ) { 
			  $json = '[' . implode(',', array_map('__json_encode', $data) ) . ']'; 
		   } else { 
			  $items = Array(); 
			  foreach( $data as $key => $value ) { 
				 $items[] = __json_encode("$key") . ':' . __json_encode($value); 
			  } 
			  $json = '{' . implode(',', $items) . '}'; 
		   } 
	    } elseif( is_string($data) ) { 
		   # Escape non-printable or Non-ASCII characters. 
		   # I also put the \\ character first, as suggested in comments on the 'addclashes' page. 
		   $string = '"' . addcslashes($data, "\\\"\n\r\t/" . chr(8) . chr(12)) . '"'; 
		   $json    = ''; 
		   $len    = strlen($string); 
		   # Convert UTF-8 to Hexadecimal Codepoints. 
		   for( $i = 0; $i < $len; $i++ ) { 
			  
			  $char = $string[$i]; 
			  $c1 = ord($char); 
			  
			  # Single byte; 
			  if( $c1 <128 ) { 
				 $json .= ($c1 > 31) ? $char : sprintf("\\u%04x", $c1); 
				 continue; 
			  } 
			  
			  # Double byte 
			  $c2 = ord($string[++$i]); 
			  if ( ($c1 & 32) === 0 ) { 
				 $json .= sprintf("\\u%04x", ($c1 - 192) * 64 + $c2 - 128); 
				 continue; 
			  } 
			  
			  # Triple 
			  $c3 = ord($string[++$i]); 
			  if( ($c1 & 16) === 0 ) { 
				 $json .= sprintf("\\u%04x", (($c1 - 224) <<12) + (($c2 - 128) << 6) + ($c3 - 128)); 
				 continue; 
			  } 
				 
			  # Quadruple 
			  $c4 = ord($string[++$i]); 
			  if( ($c1 & 8 ) === 0 ) { 
				 $u = (($c1 & 15) << 2) + (($c2>>4) & 3) - 1; 
			  
				 $w1 = (54<<10) + ($u<<6) + (($c2 & 15) << 2) + (($c3>>4) & 3); 
				 $w2 = (55<<10) + (($c3 & 15)<<6) + ($c4-128); 
				 $json .= sprintf("\\u%04x\\u%04x", $w1, $w2); 
			  } 
		   } 
	    } else { 
		   # int, floats, bools, null 
		   $json = strtolower(var_export( $data, true )); 
	    } 
	    return $json; 
	} 
}

/******************************** ***************** **********************************************************/ 
if(!function_exists("check_characters")) 
{
	function check_characters($string)
	{            
			if(!preg_match('`^[[:alnum:]]{3,8}$`',$string)) 
				throw new Exception("CARACTERES_INTERDITS");
	}
}

/******************************** ***************** **********************************************************/ 
if(!function_exists("check_name_availability")) 
{
	function check_name_availability($string)
	{            
		$id = connect_db();
		$requete = 	"
									SELECT *
									FROM adm_docs
									WHERE nm_v = '$string'						 
								";
		$resultat = mysql_query($requete) or exit(mysql_error());									
								
		if(mysql_num_rows($resultat))
		{
			throw new Exception("USED_CHARACTERS");				
		}
	}
}
?>











