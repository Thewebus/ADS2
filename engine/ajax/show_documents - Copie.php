<?php include_once('../functions.php'); ?>
<?php 

	$html 			= "";
	$resultat 	= show_docs_categories();	
	
	if(mysql_num_rows($resultat))
	{	
		while($line = mysql_fetch_array($resultat))
		{
			$cat_nm	= $line['cat_nm_v'];
			$cat_id	= $line['id_n'];
			
			$html 	.=	'<div id="documents_elem">';
			$html 	.=	'<div id="cat_zone">';
			$html 	.= 		'<div id="cat_title">';		
			$html 	.= 			utf8_encode($cat_nm);
			$html 	.= 		'</div>';			
			
			$rsltyp	= show_docs_types($cat_id);
			while($line_type = mysql_fetch_array($rsltyp))
			{
				$typ_nm = $line_type['typ_nm_v'];
				$typ_id = $line_type['id_n'];
				
				$html 	.= 	'<div id="type_zone">';
				$html 	.= 	'<br />';
				$html 	.= 		'<div id="type_title">';
				$html 	.= 			($typ_nm);
				$html 	.= 		'</div>';
				
				$rsldoc	= show_docs_by_cat_and_types($cat_id,$typ_id);
				while($line_doc = mysql_fetch_array($rsldoc))
				{
					$html 	.= 		'<div id="type_elem">';
					$html 	.= 			'<a href="'.$line_doc['url_t'].'">'.($line_doc['nm_v']).'.'.$line_doc['ext_v'].'</a>';	
					$html 	.= 		'</div>';
				}
				
				$html 	.= 	'</div>';				
			}
			
			$html 	.= 	'<br />';
			$html 	.= 	'</div>';
			$html 	.= 	'</div>';
						
		}
		
	}
	
	if($html == "")
		$html = "Aucun fichier ...";
	
	echo $html;
	
?>