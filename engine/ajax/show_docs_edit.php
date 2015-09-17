<?php include_once('../functions.php'); ?>
<?php 
	
	$html = "";	
	
	$cat_value	= $_GET['categorie'];
		
	$id = connect_db();
	$requete = "
					SELECT d.id_n, d.nm_v, d.ext_v,  d.typ_n, t.typ_nm_v, c.cat_nm_v, d.status_v
					FROM adm_docs d, adm_docs_cat c, adm_docs_typ t 
					WHERE c.id_n = '$cat_value'
					AND d.cat_n = c.id_n
					AND d.typ_n = t.id_n
					ORDER BY d.typ_n ASC
				";
					
	$resultat 	= mysql_query($requete) or exit(mysql_error());
	
	if(mysql_num_rows($resultat))
	{
		$nbr	= 0;
		
		$html			.= '<fieldset>';
		$html			.= '<legend>Edition des Documents:</legend>';
		$html			.= '<table width="100%" border="0" cellspacing="0" cellpadding="0" >';
		
		while($ligne=mysql_fetch_array($resultat))
		{
			$nbr++;
			$class = (($nbr%2) == 1)?('class="tr_class_even"'):('class="tr_class_odd"');
			
			$selected_on	= ($ligne['status_v'] == 'on')?('selected= "selected"'):('');
			$selected_off	= ($ligne['status_v'] == 'off')?('selected= "selected"'):('');
			
			$doc_icon		=	"";
			
			switch($ligne['ext_v'])
			{
				case 'doc':				
				case 'docx':
					$doc_icon	= "imgs/docs/docx.png";
				break;
				
				case 'pdf':
					$doc_icon	= "imgs/docs/pdf.png";
				break;
				
				case 'vsd':
					$doc_icon	= "imgs/docs/vsd.png";
				break;
				
				case 'xls':
				case 'xlsx':
					$doc_icon	= "imgs/docs/xlsx.png";
				break;
				
				default:
					$doc_icon	= $doc_icon;
			}		
			
			$html			.= '<tr '.$class.'>';
			
			$html			.= '<td style="padding-left:5px;padding-top:5px;" width="50%" valign="top"><b>'.substr($ligne['nm_v'],0,30).'.'.$ligne['ext_v'].'</b> </td>';
			
			$html			.= '<td width="20%" align="left" valign="top">';
			$html			.= '<img name="doc_img" src="'.$doc_icon.'" width="50" height="50" alt="" />';
			$html			.= '</td>';
			
			$html			.= '<td width="20%" align="right" valign="top">';
			$html			.= '<input name="id_doc" type="hidden" id="id_doc" class="id_doc"  value="'.$ligne['id_n'].'" />';
			
			$html			.= '<select name="statut_doc" id="statut_doc">';
			$html			.= '<option value="on" '.$selected_on.'>Affiché</option>';
			$html			.= '<option value="off" '.$selected_off.'>Masqué</option>';
			$html			.= '</select>';
					
			$html			.= '</td>';
			
			$html			.= '<td width="10%" align="right" valign="top">'; 
			$html			.= '<button class="suppress_doc">Supprimer</button>'; 
			$html			.= '</td>';
			      
			$html			.= '</tr>'; 	
		}
		
		$html			.= '</table>'; 
		$html			.= '</fieldset>'; 
	}
	
	echo $html;
	
?>