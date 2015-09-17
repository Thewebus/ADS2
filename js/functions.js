// JavaScript Document

var slidecnt		= 0;
var zonePrincipale 	= "#main_intranet";
var pageDefault 	= "entreprise_detailed.php";

var updateDone		= "MISE A JOUR EFFECTUEE !!!";
var suppressDone	= "Suppression effectuée !!!";
var suppressNotDone	= "Suppression non effectuée, réessayer manuellement plus tard!!!";


var fadeSpeed = 1200;

/** Espaces Messages ***********************************************************************************/

//Affichage Flash ...
function show_flash_do(message)
{
	$("#flash_msg").text(message).fadeIn(1000).delay(1000).fadeOut(1000);
  	//return false;
}

//Affichage pub ...
function show_slideShow_do()
{
	$("#offers_slideshow").html('');
	slidecnt++;
	
	if(slidecnt>2) slidecnt =1;
		
	var img = $("<img />").attr('src', 'images/pubs/pub'+slidecnt+'.png')
    .load(function() {
        if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
            //alert('broken image!');
		   $("#offers_slideshow").append(img);
        } else {
            $("#offers_slideshow").append(img);
			console.log("Image : "+slidecnt);
        }
    })
	.hide().fadeIn(fadeSpeed);
	;
}

/** Informations utilisateur ********************************************************************************/
//Affichage des infos de l'utilisateur ...
function show_infos_user_do()
{
	$.get("engine/ajax/show_infos_user.php",
		function(data,status){
			if(status == 'success')		
			{
				$("#intranet_user_infos").html(data);
			}
	});
}

/** Texte défilant ********************************************************************************/
//Initialisation des fonctionnalités du texte défilant ...
function marquee_do()
{
	$(function () {
        $('div.demo marquee').marquee('pointer').mouseover(function () {
            $(this).trigger('stop');
        }).mouseout(function () {
            $(this).trigger('start');
        }).mousemove(function (event) {
            if ($(this).data('drag') == true) {
                this.scrollLeft = $(this).data('scrollX') + ($(this).data('x') - event.clientX);
            }
        }).mousedown(function (event) {
            $(this).data('drag', true).data('x', event.clientX).data('scrollX', this.scrollLeft);
        }).mouseup(function () {
            $(this).data('drag', false);
        });
    });
}

//Affichage du texte défilant ...
function show_texte_defilant_do()
{
	$.get("engine/ajax/show_texte_defilant.php",
		function(data,status){
			if(status == 'success')		
			{
				$("#texte_defilant_content").html(data);
			}
	});
}

//Affichage du texte spotlight ...
function show_texte_spotlight_do()
{
	$.get("engine/ajax/show_texte_spotlight.php",
		function(data,status){
			if(status == 'success')		
			{
				$("#texte_spotlight_content").html(data);
			}
	});
}

/** Menu latéral gauche ***************************************************************************/
//Initialisation ...
function tabs_left_do()
{
	$(function() {
    	$( "#tabs" ).tabs();
		return false;
  	});
}

//Affichage des Notes Internes ...
function ni_zone_do()
{
	$("#ni_inner_1").load("uploads/ni/show_dir.php",function(responseTxt,statusTxt){
		if(statusTxt=="success"){
			/*	
				$("#ni_content:[href]").click(function(){
					alert("COOL !!");
					return false;
				});*/
				
			}	
	})
	.hide().fadeIn(fadeSpeed);
}
/** Affichages des pages ***************************************************************************/

//Affichage du message du DG ...
function show_motdg_do()
{
	$(zonePrincipale).load("mot_DG.php",function(response,status){
		if(status == 'success')
		{
			$.get("engine/ajax/show_motdg.php",function(data,status)
			{
				if(status == 'success')		
				{
					$("#message_dg").html(data);	
				}
			});					
		}
	})
	.hide().fadeIn(fadeSpeed);
	return false;
}

//Affichage de la page Entreprise ...
function show_entreprise_do()
{
	$(zonePrincipale).load("entreprise.php",function(responseTxt,statusTxt){
			if(statusTxt=="success"){
				$.get("engine/ajax/show_entreprise.php",
					function(data,status){
						if(status == 'success')		
						{
							$("#company_all").html(data);
						}
				});	
				
			}
		})
		.hide().fadeIn(fadeSpeed);
	 return false;
}

//Affichage de la page Entreprise détaillée rélative ...
function show_entreprise_details_do(id_trans)
{
	$(zonePrincipale).load("entreprise_detailed.php",function(response,status){
		if(status == 'success')
		{				
			$.get("engine/ajax/show_entreprise_detailed.php",
			{
				id_item:id_trans			
			},
			function(data,status)
			{
				if(status == 'success')		
				{
					$("#company_detailed").html(data);	
				}
			});
		}
	})
	.hide().fadeIn(fadeSpeed);
	return false;
}

//Affichage de la page Documents ...
function show_documents_do()
{
	$(zonePrincipale).load("documents.php",function(responseTxt,statusTxt){
			if(statusTxt=="success"){
				$.get("engine/ajax/show_documents.php",
					function(data,status){
						if(status == 'success')		
						{
							$("#documents_elem").html(data);
						}
				});	
				
			}
		})
		.hide().fadeIn(fadeSpeed);
	 return false;
}

/** Gestion des clics sur les boutons ***************************************************************/

//Clic sur les boutons du menu ...
function menus_behaviors_do()
{		
	//Home ...
	$("#bt_entreprise").click(function(){
		show_entreprise_do();
		return false;
	});
	
	//Mot du DG ...
	$("#index_r6_c9").click(function(){
		show_motdg_do();
		return false;
	});
	
	//Entreprise ...
	$("#index_r6_c11").click(function(){
		show_entreprise_do();
		return false;
	});
	
	//Annonces ...
	$("#index_r6_c13").click(function(){
		
		show_flash_do("Come back lateeeer on it, GreenNer!!!");
		return false;
	});
	
	//Documents ...
	$("#bt_documents").click(function(){
		
		show_documents_do();
		return false;
	});
	
	//Annuaire ...
	$("#bt_applications").click(function(){
		$(zonePrincipale).load("annuaire.php").hide().fadeIn(fadeSpeed);
		return false;
	});
}

//Clic sur les boutons autres que ceux du menu ...
function buttons_actions_do()
{
	$(document)
	
	.delegate("#bt_return", "click", function () {
		$(zonePrincipale).load(pageDefault).hide().fadeIn(fadeSpeed);
     })
	 
	 .delegate("#close_motdg", "click", function () {
		show_entreprise_do();
     })	
		 
	 .delegate("#show_entreprise_details", "click", function () {
		var id_n = $(this).closest("#details").find("#id_infos_company").attr("value");
		//alert("Nous y sommes :"+ id_n );
		show_entreprise_details_do(id_n);
     })
	 
	 .delegate("#close_entreprise_details", "click", function () {
		show_entreprise_do();
     })
	 
	.delegate("#close_annuaire", "click", function () {
		show_entreprise_do();
     })	
	 
	 .delegate("#close_administration", "click", function () {
		show_entreprise_do();
     })	 
	 ;
	  
	 return false;
}

/** Fonctions d'administration *********************************************************************/

//Ajout de texte défilant ou messages latéraux ...
function add_info_defil_lateral_do()
{
	$("#submit_info_defil_lateral").click(function () {
				
		var textDefilant 			=  $("#textDefilant").val();
		var spotlightTexteDefilant 	=  $("#spotlightTexteDefilant").val();
		
		$.get("engine/ajax/add_texte_defilant.php",
		{
			textDefilant			: textDefilant,
			spotlightTexteDefilant 	: spotlightTexteDefilant
		},
		function(data,status){
				
			if(status == 'success')		
			{
				if(data == 'DONE')		
				{
					show_entreprise_do();
					if(spotlightTexteDefilant == "on")
					{
						show_texte_spotlight_do();
						show_flash_do("Le texte latéral a été ajouté !!!");
					}
					else
					{
						show_texte_defilant_do();
						show_flash_do("Le texte défilant a été ajouté !!!");
					}
				}
				else
					alert("Erreur: "+data);
			}
			else
				alert("Erreur: "+status);
		});
     });
	 return false;
}

//Edition des textes défilants - suppression...
function suppress_info_defil_lateral_do()
{
	$("#suppress_info_defil_lateral").click(function () {
		
		if(confirm("Voulez-vous vraiment supprimer ce texte ?"))
		{
			var id_item = $(this).closest("tr").find("#textdefil_id").attr("value");	
			
			$.get("engine/ajax/delete_texte_defilant.php",
			{
				id_item:id_item
			},
			function(data,status){
					
				if(status == 'success')		
					{
						if(data == 'DONE')		
						{
							show_entreprise_do();
							show_texte_defilant_do();
							show_texte_spotlight_do();
							
							show_flash_do(suppressDone);
						}
					}
			});	
		}
	});
}

//Edition des textes défilants - mise à jour ...
function update_info_defil_lateral_do()
{
	$("#statut_info_defil_lateral").change(function () {
		
		var id_item		= $(this).closest("tr").find("#textdefil_id").attr("value");
		var value_item 	= $(this).val();	
			
		$.get("engine/ajax/update_texte_defilant.php",
		{
			id_item:id_item,
			value_item:value_item
		},
		function(data,status){
				
			if(status == 'success')		
				{
					if(data == 'DONE')		
					{
						show_entreprise_do();
						show_texte_defilant_do();
						show_texte_spotlight_do();
						
						show_flash_do(updateDone);
					}
				}
		});	
		
	});
}

//Affichage de la zone d'édition des textes défilants ...
function show_texte_defilant_edit_zone_do()
{
	$.get("engine/ajax/show_texte_defilant_elements.php",
			function(data,status){
				if(status == 'success')		
				{
					$("#show_texte_defilant_edit").html(data);
					add_info_defil_lateral_do();
					suppress_info_defil_lateral_do();
					update_info_defil_lateral_do();
				}
	});
}

//Ajout d'une note interne ...
function add_note_interne_do()
{
	$(function () {
		'use strict';
		
		// Define the url to send the image data to
		var url = 'uploads/ni/files_ni.php';
		
		// Call the fileupload widget and set some parameters
		$('#fileupload').fileupload({
			url: url,
			dataType: 'json',
			done: function (e, data) {
				$("#ni_upload_status").html("<p>Analyse terminée !!!</p>");
				/*$("#ni_upload_status").html("<p>Notes internes téléchargées:</p><ul id='files'></ul>");
				// Add each uploaded file name to the #files list
				$.each(data.result.files, function (index, file) {
					$('<li/>').text(file.name).appendTo('#files');
				});*/
				ni_zone_do();
			},
			progressall: function (e, data) {
				// Update the progress bar while files are being uploaded
				var progress = parseInt(data.loaded / data.total * 100, 10);
				$('#progress .bar').css(
					'width',
					progress + '%'
				);
			}
		});
	});
}

//Ajout d'un message du DG ...
function add_motdg_do()
{
	var nomfichier = "";
		
	$(function () {
				
		'use strict';
		
		// Define the url to send the image data to
		var url = 'uploads/mdg/files_mdg.php';
		
		// Call the fileupload widget and set some parameters
		$('#fileupload').fileupload({
			url: url,
			dataType: 'json',
			done: function (e, data) {
				$("#mdg_upload_status").html("<p>Analyse terminée !!!</p>");
				// Add each uploaded file name to the #files list
				$.each(data.result.files, function (index, file) {
					//$('<li/>').text(file.name).appendTo('#files');
					nomfichier = file.name;
					//alert("Statut: "+e);
				});
			},
			progressall: function (e, data) {
				// Update the progress bar while files are being uploaded
				var progress = parseInt(data.loaded / data.total * 100, 10);
				$('#progress .bar').css('width',progress + '%');
			}
		});
	});			
		
	$("#add_motdg").click(function(){
		
		if(nomfichier == "")
		{
			//alert("Ajoutez une photo illustrative du DG SVP !!!");
			show_flash_do("Ajoutez une photo illustrative du DG SVP !!!");
		}
		else
		{	
			
			var title 	= $("#titre_motdg").val();
			var content	= $("#texte_motdg").val();
			var status 	= $("#statut_motdg").val();
			
			if((title == "") ||(content == ""))
			{
				//alert("Remplissez les champs vides SVP !!!");
				show_flash_do("Remplissez les champs vides SVP !!!");
			}
			else
			{
				var urlimg = 'uploads/mdg/files/'+nomfichier;
				$.get("engine/ajax/add_motdg.php",
				{
					title	: title,
					content	: content,
					status	: status,
					urlimg	: urlimg
				},
				function(data,status){
						
					if(status == 'success')		
					{
						if(data == 'DONE')		
						{
							show_motdg_do();
							show_flash_do("Le message du DG est en ligne !!!");
						}
					}
				});
				
			}
		}
	});	
	return false;
}

//Ajout d'une info entreprise ...
function add_info_entreprise_do()
{
	var nomfichier = "";
		
	$(function () {
				
		'use strict';
		
		// Define the url to send the file data to
		var url = 'uploads/ie/files_ie.php';
		
		// Call the fileupload widget and set some parameters
		$('#fileupload').fileupload({
			url: url,
			dataType: 'json',
			done: function (e, data) {
				$("#ie_upload_status").html("<p>Analyse terminée !!!</p>");
				// Add each uploaded file name to the #files list
				$.each(data.result.files, function (index, file) {
					//$('<li/>').text(file.name).appendTo('#files');
					nomfichier = file.name;
					//alert("Statut: "+e);
				});
			},
			progressall: function (e, data) {
				// Update the progress bar while files are being uploaded
				var progress = parseInt(data.loaded / data.total * 100, 10);
				$('#progress .bar').css(
					'width',
					progress + '%'
				);
			}
		});
	});			
		
	$("#add_info_entreprise").click(function(){
		
		if(nomfichier == "")
		{
			//alert("Ajoutez une image illustrant l'info SVP !!!");
			show_flash_do("Ajoutez une image illustrant l'info SVP !!!");
		}
		else
		{	
			var title 	= $("#titre_info_entreprise").val();
			var content	= $("#texte_info_entreprise").val();
			var status 	= $("#statut_info_entreprise").val();
			
			if((title == "") ||(content == ""))
			{
				//alert("Remplissez les champs vides SVP !!!");
				show_flash_do("Remplissez les champs vides SVP !!!");
			}
			else
			{
				var urlimg = 'uploads/ie/files/'+nomfichier;
				$.get("engine/ajax/add_info_entreprise.php",
				{
					title	: title ,
					content	: content,
					status	: status,
					urlimg	: urlimg
				},
				function(data,status){
						
					if(status == 'success')		
					{
						if(data == 'DONE')		
						{
							show_entreprise_do();
							show_flash_do("L'information a été ajoutée !!!");
						}
					}
				});
				
			}
		}
	});	
	return false;
}

//Edition des infos entreprise - suppression...
function suppress_info_entreprise_do()
{
	$("#suppress_info_entreprise").click(function () {
		
		if(confirm("Voulez-vous vraiment supprimer cette information ?"))
		{
			var id_item = $(this).closest("tr").find("#id_info_entreprise").attr("value");	
			
			$.get("engine/ajax/delete_info_entreprise.php",
			{
				id_item:id_item
			},
			function(data,status){
					
				if(status == 'success')		
				{
						if(data == 'DONE')		
						{
							show_entreprise_do();
							show_flash_do(suppressDone);
						}
						else
						{
							show_entreprise_do();
							show_flash_do(suppressNotDone);
						}
				}
				else
					alert(status);
			});	
		}
	});
}

//Edition des infos entreprise - mise à jour ...
function update_info_entreprise_do()
{
	$("#statut_infos_entreprise").change(function () {
		
		var id_item		= $(this).closest("tr").find("#id_info_entreprise").attr("value");
		var value_item 	= $(this).val();	
			
		$.get("engine/ajax/update_info_entreprise.php",
		{
			id_item:id_item,
			value_item:value_item
		},
		function(data,status){
				
			if(status == 'success')		
				{
					if(data == 'DONE')		
					{						
						show_flash_do(updateDone);
						show_entreprise_do();
					}
				}
		});	
		
	});
}

//Affichage de la zone d'édition des infos Entreprise ...
function show_infos_entreprise_edit_zone_do()
{
	$.get("engine/ajax/show_entreprise_edit.php",
			function(data,status){
				if(status == 'success')		
				{
					$("#show_infos_entreprise_edit_zone").html(data);
					add_info_entreprise_do();
					suppress_info_entreprise_do();
					update_info_entreprise_do();
				}
	});
}

//Ajout de documents: Audit Qualité ...
function add_doc_do(cat_id_n)
{
	var nomfichier = "";
		
	$(function () {
				
		'use strict';
		
		// Define the url to send the file data to
		var url = 'uploads/docs/files.php?cat='+cat_id_n;
		
		// Call the fileupload widget and set some parameters
		$('#fileupload').fileupload({
			url: url,
			cache: 'false',
			dataType: 'json',
			done: function (e, data)
			{
				$('#upload_status').html('<p>Analyse terminée !!!</p><div ><ul id="files"></ul></div>');
				// Add each uploaded file name to the #files list
				$.each(data.result.files, function (index, file) {
					$('<li/>').text(file.name).appendTo('#files');
					nomfichier = file.name;
					//alert("Statut: "+e);
				});
			},
			progressall: function (e, data) 
			{
				// Update the progress bar while files are being uploaded
				var progress = parseInt(data.loaded / data.total * 100, 10);
				$('#progress .bar').css(
					'width',
					progress + '%'
				);
			},
			fail: function(e, data)
			{
				alert("Erreur ..."+data.errorThrown);
			}
		});
	});			
		
	$("#add_doc").click(function(){
		
		if(nomfichier == "")
		{
			//alert("Erreur: aucun fichier n'a été sélectionné !!!");
			show_flash_do("Erreur: aucun fichier n'a été sélectionné !!!");
		}
		else
		{	
			var doc_name 	= $("#doc_name").val();
			var doc_cat		= $("#doc_cat").val();
			var doc_type	= $("#doc_type").val();
			var status 		= $("#statut_doc").val();
			
			if((doc_name == "") ||(doc_type == 0))
			{
				//alert("Remplissez les champs vides SVP !!!");
				show_flash_do("Remplissez les champs vides SVP !!!");
			}
			else
			{
				var urldoc = 'uploads/docs/'+cat_id_n+'/'+nomfichier;
				$.get('engine/ajax/add_doc.php',
				{
					doc_nm		: doc_name,
					doc_cat		: doc_cat,
					doc_type	: doc_type,
					status		: status,
					urldoc		: urldoc,					
					originame	: nomfichier,
					
					cat			: cat_id_n				
				},
				function(data,status){
						
					if(status == 'success')		
					{
						if(data == 'DONE')		
						{
							//alert("Le document '"+doc_name+"' a été ajouté !!!");
							show_flash_do("Le document '"+doc_name+"' a été ajouté !!!");													
							show_documents_do();							
						}
						else
							alert("Erreur: "+data);
					}
					else
					{
						alert("Erreur: "+data);
					}
				});
				
			}
		}
	});	
	return false;
}

//Edition des documents - suppression...
function suppress_doc_do(cat)
{
	$(document)
	.delegate('#suppress_doc', "click", function () {
		
		if(confirm("Voulez-vous vraiment supprimer ce document ?"))
		{
			var id_item = $(this).closest("tr").find("#id_doc").attr("value");		
			
			$.get("engine/ajax/delete_doc.php",
			{
				id_item:id_item
			},
			function(data,status){
					
				if(status == 'success')		
				{
						if(data == 'DONE')		
						{
							show_documents_do();
							show_flash_do(suppressDone);
						}
						else
						{
							show_documents_do();
							show_flash_do(suppressNotDone);
						}
				}
				else
					alert(status);
			});	
		}
	});
}

//Edition des documents - mise à jour ...
function update_doc_do(cat)
{
	$(document)
	.delegate('#statut_doc', "change", function () {
		
		var id_item 	= $(this).closest("tr").find("#id_doc").attr("value");
		var value_item 	= $(this).val();	
			
		$.get("engine/ajax/update_doc.php",
		{
			id_item:id_item,
			value_item:value_item
		},
		function(data,status){
				
			if(status == 'success')		
			{
				if(data == 'DONE')		
				{						
					show_documents_do();
					show_flash_do(updateDone);
				}
				else
					alert(data);
			}
			else
			alert(status);
			
		});	
		
	});
}

//Affichage de la zone d'édition des documents ...
function show_docs_edit_zone_do(cat)
{
	$.get('engine/ajax/show_docs_edit.php',
			{
				categorie: cat				
			},
			function(data,status){
				if(status == 'success')		
				{
					$("#show_docs_edit_zone").html(data);
					add_doc_do(cat);
					suppress_doc_do(cat);
					update_doc_do(cat);
				}
	});
}

/** Accès aux fonctions d'administration ************************************************************/
function administration_do()
{
	//Initialisation ...	
	//Affichage des zones d'administration principales ...	
	$("#admin_infos_defil_lateral")
	.click(function(){
		$(zonePrincipale).load("admin_infos_defil_lateral.php",function(responseTxt,statusTxt){
			if(statusTxt=="success"){				
				show_texte_defilant_edit_zone_do();	
			}
		})
		.hide().fadeIn(fadeSpeed);
		return false;
	});
	
	$("#admin_notes_internes")
	.click(function(){
		$(zonePrincipale).load("admin_notes_internes.php",function(responseTxt,statusTxt){
			if(statusTxt=="success"){
				add_note_interne_do();
			}
		})
		.hide().fadeIn(fadeSpeed);
		return false;
	});
	
	$("#admin_motdg")
	.click(function(){
		$(zonePrincipale).load("admin_motdg.php",function(responseTxt,statusTxt){
			if(statusTxt=="success"){
				add_motdg_do();
			}
		})
		.hide().fadeIn(fadeSpeed);
		return false;
	});
	
	$("#admin_entreprise")
	.click(function(){
		$(zonePrincipale).load("admin_entreprise.php",function(responseTxt,statusTxt){
			if(statusTxt=="success"){								
				show_infos_entreprise_edit_zone_do();			
			}
		})
		.hide().fadeIn(fadeSpeed);
		return false;
	});
	
	$("#admin_docs_aq")
	.click(function(){
		var cat_id_n = 3;
		$(zonePrincipale).load('admin_docs.php?cat='+cat_id_n+'',function(responseTxt,statusTxt){
			if(statusTxt=="success"){
				show_docs_edit_zone_do(cat_id_n);
			}
		})
		.hide().fadeIn(fadeSpeed);
		return false;
	});
	
	$("#admin_docs_rh")
	.click(function(){
		var cat_id_n = 4;
		$(zonePrincipale).load('admin_docs.php?cat='+cat_id_n+'',function(responseTxt,statusTxt){
			if(statusTxt=="success"){
				show_docs_edit_zone_do(cat_id_n);
			}
		})
		.hide().fadeIn(fadeSpeed);
		return false;
	});
	
/** Chargements initiaux ****************************************************************************/

$(document).ready(function() 
{
	$.ajaxSetup({ cache: false });
	
	//Infos Utilisateur ...
	show_infos_user_do();
	
	//Menus & boutons ...
	menus_behaviors_do();
	buttons_actions_do();
	
	//Texte défilant ...
	marquee_do();
	show_texte_defilant_do();
	
	//Ménu latéral gauche ...
	tabs_left_do();
	ni_zone_do();
	show_texte_spotlight_do();
	
	//Administration ...	
	administration_do();
	
	//Affichage par défaut ...	
	show_entreprise_do();
	show_slideShow_do();
	setInterval('show_slideShow_do();',5000); 
	
});	

