<?php include ("engine/functions.php");?>
<?php 
	$cat = $_GET['cat'];
?>

<div>
		<fieldset>
				<legend>Ajouter un nouveau document</legend>
				<table border="0" cellspacing="0" cellpadding="0" >
						
						<tr>
								<td colspan="2" valign="top"><div>
										</div></td>
						</tr>
						<tr>
								<td valign="top">Nom du fichier : </td>
								<td><label for="doc_name"></label>
										<input name="doc_name" type="text" id="doc_name" maxlength="20" />
										<br />
										<p>(Aide: 20 caractères max ... il s'agit du nom du document qui sera affiché sur l'intranet !!!)</p></td>
						</tr>
						<tr>
								<td valign="top">Type du fichier : </td>
								<td><label for="doc_type"></label>
										<select name="doc_type" id="doc_type">
												<option value="0" selected="selected">Sélectionnez ...</option>
												<option value="1">Template</option>
												<option value="2">Procédure</option>
												<option value="3">Organigramme</option>
												<option value="4">Mode opératoire</option>
										</select>
										<input name="doc_cat" type="hidden" id="doc_cat" value="<?php echo show_docs_cat($cat);?>" /></td>
						</tr>
						<tr>
								<td valign="top">Afficher ? :</td>
								<td><select name="statut_doc" id="statut_doc">
												<option value="on" selected="selected">OUI</option>
												<option value="off">NON</option>
										</select></td>
						</tr>
						<tr id="fu_tr">
								<td valign="top">Fichier :</td>
								<td><div id="fu">
												<div class="container">
														<!-- Button to select & upload files -->
														<span class="btn btn-success fileinput-button">
														<span>Télécharger ...</span>
														<!-- The file input field used as target for the file upload widget -->
														<input id="fileupload" type="file" name="files[]" >
														</span>
														
														<!-- The global progress bar -->
														<div id="upload_status">
														</div>
														<div id="progress" class="progress progress-success progress-striped">
																<div class="bar">
																</div>
														</div>
														<span>(Aide: seules les formats WORD, EXCEL, XML, MPP, PPT,VSD, SQL, PDF, JPG,  PNG ou ZIP, de taille 2 Mo maximum seront chargés)</span>
												</div>
										</div></td>
						</tr>
						<tr>
								<td>&nbsp;</td>
								<td>
								<div id="fx_add_doc_zone">
												<button id="add_doc">Ajouter le document</button>
								</div></td>
						</tr>
						
				</table>
		</fieldset>
</div>
<div id="show_docs_edit_zone">
</div>
<div>
		<button id="close_administration">Sortir de l'administration</button>
</div>
