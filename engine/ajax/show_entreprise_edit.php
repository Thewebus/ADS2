<?php include_once('../functions.php'); ?>
<?php 
	
	$html			= "";
	
	$id = connect_db();
	$requete = "
					SELECT * 
					FROM adm_entreprise
					ORDER BY id_n DESC
				";
					
	$resultat 	= mysql_query($requete) or exit(mysql_error());
	
	if(mysql_num_rows($resultat))
	{
		$nbr	= 0;
		
		$html			.= '<fieldset>';
		$html			.= '<legend>Edition des informations Entreprise</legend>';
		$html			.= '<table width="100%" border="0" cellspacing="0" cellpadding="0" >';
		
		while($ligne=mysql_fetch_array($resultat))
		{
			$nbr++;
			$class = (($nbr%2) == 1)?('class="tr_class_even"'):('class="tr_class_odd"');
			
			$selected_on	= ($ligne['statut_v'] == 'on')?('selected= "selected"'):('');
			$selected_off	= ($ligne['statut_v'] == 'off')?('selected= "selected"'):('');
			
			
			$portion 		= substr(strrchr($ligne['url_t'], "/"), 1);
			$thumbnail_url	= str_replace($portion,"",$ligne['url_t']).'thumbnail/'.$portion;
			
			$html			.= '<tr '.$class.'>';
			
			$html			.= '<td style="padding-left:5px;padding-top:5px;" width="50%" valign="top"><b>'.utf8_encode(substr($ligne['title_v'],0,30)).'</b>'.' ...</br>'.utf8_encode(substr($ligne['text_t'],0,100)).' ...'.'</td>';
			
			$html			.= '<td width="20%" align="right" valign="top">';
			$html			.= '<img src="'.$thumbnail_url.'" />';
			$html			.= '</td>';
			
			$html			.= '<td width="20%" align="right" valign="top">';
			$html			.= '<input name="id_info_entreprise" type="hidden" id="id_info_entreprise" value="'.$ligne['id_n'].'" />';
			
			$html			.= '<select name="statut_infos_entreprise" id="statut_infos_entreprise">';
			$html			.= '<option value="on" '.$selected_on.'>Affiché</option>';
			$html			.= '<option value="off" '.$selected_off.'>Masqué</option>';
			$html			.= '</select>';			
			$html			.= '</td>';
			
			$html			.= '<td width="10%" align="right" valign="top">'; 
			$html			.= '<button id="suppress_info_entreprise">Supprimer</button>'; 
			$html			.= '</td>';
			
			      
			$html			.= '</tr>'; 	
		}
		
		$html			.= '</table>'; 
		$html			.= '</fieldset>'; 
	}
	
	echo $html;
	
?>