<?php include_once('../functions.php'); ?>
<?php 
	
	$html			= "";
	
	
	$id = connect_db();
	$requete = "
					SELECT * 
					FROM adm_textdefil
					ORDER BY id_n DESC
				";
					
	$resultat 	= mysql_query($requete) or exit(mysql_error());
	
	if(mysql_num_rows($resultat))
	{
		$nbr	= 0;
		
		$html			.= '<fieldset>';
		$html			.= '<legend>Edition des infos d&eacute;filantes & spotlight</legend>';
		$html			.= '<table width="100%" border="0" cellspacing="0" cellpadding="0" >';
		
		while($ligne=mysql_fetch_array($resultat))
		{
			$nbr++;
			$class = (($nbr%2) == 1)?('class="tr_class_even"'):('class="tr_class_odd"');
			
			$selected_on	= ($ligne['statut_v'] == 'on')?('selected= "selected"'):('');
			$selected_off	= ($ligne['statut_v'] == 'off')?('selected= "selected"'):('');
			
			$spot_or_not	= ($ligne['spotlight_v'] == 'on')?('<img src="imgs/spotlight.png" width="32" height="32" alt="texte spotlight" />'):('<img src="imgs/defil.png" width="32" height="32" alt="texte défilant" />');
			
			$html			.= '<tr '.$class.'>';
			
			$html			.= 	'<td style="padding-left:5px;padding-top:5px;" width="60%" valign="top">'.utf8_encode($ligne['text_t']).'</td>';
			
			$html			.= 	'<td style="padding-left:5px;padding-top:5px;" width="10%" valign="top">'.$spot_or_not.'</td>';
			
			$html			.= 	'<td width="20%" align="right" valign="top">';
			$html			.= 		'<input name="textdefil_id" type="hidden" class="textdefil_id" value="'.$ligne['id_n'].'" />';
			$html			.= 		'<select name="statut_info_defil_lateral" class="statut_info_defil_lateral">';
			$html			.= 			'<option value="on" '.$selected_on.'>Affich&eacute;</option>';
			$html			.= 			'<option value="off" '.$selected_off.'>Archiv&eacute;</option>';
			$html			.= 		'</select>';			
			$html			.= 	'</td>';
			
			$html			.= '<td width="10%" align="right" valign="top">'; 
			$html			.= '<button class="suppress_info_defil_lateral">Supprimer</button>'; 
			$html			.= '</td>';
			
			      
			$html			.= '</tr>'; 	
		}
		
		$html			.= '</table>'; 
		$html			.= '</fieldset>'; 
	}
	
	echo utf8_decode($html);
	
	
?>