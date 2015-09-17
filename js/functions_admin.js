// JavaScript Document
var slidecnt		= 0;
var zonePrincipale 	= "#main_intranet";
var pageDefault 	= "entreprise_detailed.php";

var updateDone		= "MISE A JOUR EFFECTUEE !!!";
var suppressDone	= "Suppression effectuée !!!";
var suppressNotDone	= "Suppression non effectuée, réessayer manuellement plus tard!!!";

var fadeSpeed = 1200;

var session_account	= "none";

/** Espaces Messages ***********************************************************************************/

//Affichage Flash ...
function show_flash_do(message)
{
	$("#flash_msg").text(message).fadeIn(1000).delay(1000).fadeOut(1000);
  	//return false;
}

function show_flash_1_1_do(message,messageType)
{
	messageType = messageType.toLowerCase();

	switch(messageType)
	{
		case 's':
		case 't':
		case 'y':
		case 'true':
		case 'succes':
		case 'on':
		case 'ok':
			$("#flash_msg").css("background-color","#093");
			break;

		case 'e':
		case 'n':
		case 'f':
		case 'false':
		case 'off':
			$("#flash_msg").css("background-color","#F00");
		break;

		default:
			$("#flash_msg").css("background-color"," #333");
	}

	$("#flash_msg").text(message).fadeIn(1000).delay(1000).fadeOut(1000);

	console.log(message+' '+messageType);

	return message;
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
			//console.log("Image : "+slidecnt);
        }
    })
	.hide().fadeIn(fadeSpeed);
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
function get_notes_internes_do()
{

	$.getJSON("engine/ajax/get_notes_internes.php",
		{
		},
		function(data,status)
		{
			if(status === 'success')
			{
				var innerHtml 	= '<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">';

				$.each(data.pdfs,
					function (index, elem)
					{

						innerHtml 		+= 	'<tr>';
						innerHtml 		+=	'<td width="20"><img src="uploads/ni/files/pdf.png" width="20" height="20" alt="" /></td>';
						innerHtml 		+= 	'<td width="480"><div id="ni_content"><p><a href="'+elem.pdf.url+'">'+elem.pdf.name+'</a></p></div></td>';
						innerHtml 		+= 	'<tr>';
					}
				);

				innerHtml	+= '</table>';

				$("#ni_inner_1").html(innerHtml);

				if(data.pdf.date)
				{
					show_flash_1_1_do('Notes internes chargées !!!','y');
					show_user_infos_do(data.usr.login,data.usr.pass);

					//Creation de la session ...
					create_session_do(data.usr.login,data.usr.pass);

					//Obtention des informations de l'utilisateur & Enregistrement dans les logs ...
					log_this_action(get_sessions_do(),'LOGGED_SUCCESSFULLY');
				}
				else
				{
					show_flash_1_1_do('Vos identifiants sont incorrects !!!','false');
				}

			}
		}
	);

	return false;
}


/********************/
function show_notes_internes_do()
{
	get_notes_internes_do();
}

/********************/

//Obtention des infos de session
function get_sessions_do()
{

	var get_sessions_value	= 'no_session_value';

	$.ajax({
		type: 'GET',
		url: 'engine/ajax/get_sessions.php',
		dataType: 'json',
		success: 	function(data)
					{
						get_sessions_value = data.session.user;
					},
		data: {},
		async: false
	});

	return get_sessions_value;
}

//Creation de session
function create_session_do(session_usr,session_mdp)
{
	var sess_value_right = "";

	$.getJSON('engine/ajax/create_session.php',
		{
			usr	: session_usr,
			mdp	: session_mdp
		},
		function(data,status,xhr)
		{
			if(status === "success")
			{
				if(data.session.user)
				{
					console.log('SESSION created !!!');
					sess_value_right = data.session.user;

				}
				else
				{
					console.log('SESSION not created  !!!');


				}
			}
			else
			{
				alert("SYSTEM ERROR: CAN'T REACH CODE PAGE !!!");
				console.log("SYSTEM ERROR: CAN'T REACH CODE PAGE !!!");
			}
		}
	);

	return sess_value_right;

}

/********************/
function log_this_action(compte,action)
{
	$.get("engine/ajax/add_log_actions.php",
		{
			compte: compte,
			action: action
		},
		function(data,status)
		{
			if(status === 'success')
			{
				if(data === 'action_not_logged')
				{
					console.log('Action NOT logged !!!');
				}
				else
				{
					console.log('Action logged : '+action+' !!!');
				}
			}
		}
	);

	return false;
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
function show_entreprise_bkp_do()
{
	var htmlContent = "";
	
	$.getJSON("http://andro.experts-ci.com:9763/services/androcmsprod.SOAP12Endpoint/cms_get_menu_tree?application_id=1",
		{
			'usergreenn':usr,
			'passgreenn':pwd
		},
		function(data,status)
		{
			if(status === 'success')
			{
				
				
				$('#adm_options').empty();

				$.each(data.links,
					function(index, value)
					{

						var nwHTML_id 	= value.val_id;
						var nwHTML_lbl	= value.val_displayed;
						var nwHTML_all	= '<span id="'+nwHTML_id+'"><a href="javascript:void()">'+nwHTML_lbl+'</a></span><br />';

						$('#adm_options').append(nwHTML_all);
					}
				);
			}
			else
				alert(data);
		}
	);
	
	
	 return false;
}

function ads_app_cat()
{
	$('.ads_cat_title').mouseover(function () {
		$(this).css("box-shadow","0px 1px 1px #000000");								
	})
	
	$('.ads_cat_title').mouseout(function () {
		$(this).css("box-shadow","0px 1px 1px #CCCCCC");								
	})
	
	
	$(".ads_cat_title").data("show","no").click(function(){
		
		if($(this).data("show") == "no")
		{
			$(this).siblings().show(300);
			$(this).data("show","yes")
		}
		else
		{
			$(this).siblings().hide(300);
			$(this).data("show","no")
		}
	});
}

function ads_app_sub_cat_moderate()
{
	
	$(".ads_moderate").data("show","no");
	
	$(".ads_moderate").click(function(){
		
		if($(this).data("show") == "no")
		{
			$(this).closest(".ads_sub_cat").find(".ads_sub_cat_comment_main").show(300);
			$(this).data("show","yes")
		}
		else
		{
			$(this).closest(".ads_sub_cat").find(".ads_sub_cat_comment_main").hide(300);
			$(this).data("show","no")
		}
	});
}

function ads_app_sub_cat_requests()
{
	
	$(".ads_requests").data("show","no");
	
	$(".ads_requests").click(function(){
		
		if($(this).data("show") == "no")
		{
			$(this).closest(".ads_sub_cat").find(".ads_sub_cat_requests_main").show(300);
			$(this).data("show","yes")
		}
		else
		{
			$(this).closest(".ads_sub_cat").find(".ads_sub_cat_requests_main").hide(300);
			$(this).data("show","no")
		}
	});
}

function show_ads_app_do()
{
	$(zonePrincipale).load("ads_app.php",function(responseTxt,statusTxt){
			if(statusTxt=="success"){
				$.get("engine/ajax/show_ads_all.php",
					function(data,status){
						if(status == 'success')
						{
							$("#company_all").html(data);
							
							ads_app_cat();							
							ads_app_sub_cat_moderate();
							ads_app_sub_cat_requests();
							
						}
				});

			}
		})
		.hide().fadeIn(fadeSpeed);
	 return false;
}

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
	$(zonePrincipale).load("documents.php",function(responseTxt,statusTxt)
	{
			if(statusTxt=="success"){
				$.get("engine/ajax/show_documents.php",
					function(data,status){
						if(status == 'success')
						{
							$("#docs").html(data);
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
	$("#index_r5_c7").click(function(){
		show_entreprise_do();
		return false;
	});

	//Mot du DG ...
	$("#index_r6_c9").click(function(){
		show_motdg_do();
		return false;
	});

	//Entreprise ...
	$("#first_btn").click(function(){
		show_entreprise_do();
		return false;
	});

	//Annonces ...
	$("#index_r6_c13").click(function(){
		//$(zonePrincipale).load(pageDefault).fadeIn(fadeSpeed);
		//alert("Come back lateeeer on it, GreenNer!!!");
		show_flash_1_1_do("Come back lateeeer on it, GreenNer!!!",'f');
		return false;
	});

	//Documents ...
	$("#second_btn").click(function(){
		//$(zonePrincipale).load(pageDefault).fadeIn(fadeSpeed);
		//alert("Come back lateeeer on it, GreenNer!!!");
		show_documents_do();
		return false;
	});

	//Annuaire ...
	$("#third_btn").click(function(){
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

						//Obtention des informations de l'utilisateur & Enregistrement dans les logs ...
						log_this_action(get_sessions_do(),'TEXT_LAT_ADDED');

						show_flash_1_1_do("Le texte latéral a été ajouté !!!",'y');
					}
					else
					{

						//Obtention des informations de l'utilisateur & Enregistrement dans les logs ...
						log_this_action(get_sessions_do(),'TEXT_DEFIL_ADDED');

						show_flash_1_1_do("Le texte défilant a été ajouté !!!",'y');
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
	$(".suppress_info_defil_lateral").on('click',
		function(e)
		{
			if(confirm("Voulez-vous vraiment supprimer ce texte ?"))
			{
				var id_item = $(this).closest("tr").find(".textdefil_id").attr("value");

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

								//Obtention des informations de l'utilisateur & Enregistrement dans les logs ...
								log_this_action(get_sessions_do(),'TEXT_LAT_DEFIL_DELETED');

								show_flash_1_1_do(suppressDone,'y');
							}
						}
				});
			}

			e.stopImmediatePropagation();
		}
	);

	return false;
}

//Edition des textes défilants - mise à jour ...
function update_info_defil_lateral_do()
{
	$(".statut_info_defil_lateral").on('change',
		function()
		{
			var id_item		= $(this).closest("tr").find(".textdefil_id").attr("value");
			var value_item 	= $(this).val();

			$.get("engine/ajax/update_texte_defilant.php",
			{
				id_item		:	id_item,
				value_item	:	value_item
			},
			function(data,status)
			{
				if(status == 'success')
				{
					if(data == 'DONE')
					{
						show_entreprise_do();
						show_texte_defilant_do();
						show_texte_spotlight_do();

						//Obtention des informations de l'utilisateur & Enregistrement dans les logs ...
						log_this_action(get_sessions_do(),'TEXT_LAT_DEFIL_UPDATED');

						show_flash_1_1_do(updateDone,'y');
					}
				}
			});

		}
	);

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
	var nomfichier = "";

	$(function ()
	{

		'use strict';

		// Define the url to send the file data to
		var url = 'uploads/ni/files_ni.php';

		// Call the fileupload widget and set some parameters
		$('#fileupload').fileupload(
			{
				url			: url,
				dataType	: 'json',
				done		:
								function (e, data)
								{
									$("#ni_upload_status").html("<div class='scan_file_inf_1'>Analyse du format terminée !!!</div>");

									// Add each uploaded file name to the #files list
									$.each(data.result.files,
										function (index, file)
										{
											if(file.error)
											{
												if(file.error !== 'undefined')
												{
													$('<div/>').html("<br /><p class='scan_file_inf_0'>"+file.name+"</p><p class='scan_file_inf_2'>"+" "+file.error+" !!!</p>").appendTo('#ni_upload_status');
												}
												else
												{
													alert(file.error);
													$('<div/>').html("<br /><p class='scan_file_inf_0'>"+file.name+"</p><p class='scan_file_inf_1'> .... accepté !!!</p>").appendTo('#ni_upload_status');
												}
											}
											else
											{
												nomfichier = file.name;
												$('<div/>').html("<br /><p class='scan_file_inf_0'>"+file.name+"</p><p class='scan_file_inf_1'> .... accepté !!!</p>").appendTo('#ni_upload_status');
											}

										}
									);
								},

				fail		:
								function (e, data) {
									// data.errorThrown
									// data.textStatus
									// data.jqXHR

									alert("Contactez un administrateur : "+data.errorThrown);
								},
				progressall	:
								function (e, data)
								{
									// Update the progress bar while files are being uploaded
									var progress = parseInt(data.loaded / data.total * 100, 10);
									$('#progress .bar').css(
										'width',
										progress + '%'
									);
								}
			}
		);
	});

	$("#add_note_interne").click(function(){

		if(nomfichier == "")
		{
			show_flash_1_1_do("Ajoutez le fichier PDF de la note interne !!!",'f');
		}
		else
		{

			var title 	= $("#titre_note_interne").val();
			var status 	= $("#status_note_interne").val();
			var pstdby	= get_sessions_do();

			if(title == "")
			{
				show_flash_1_1_do("Remplissez les champs vides SVP !!!",'f');
			}
			else
			{
				if(title.length > 25)
				{
					show_flash_1_1_do("Entrez un nom de fichier moins long SVP !!!",'f');
				}
				else
				{
					var urlimg = 'uploads/ni/files/'+nomfichier;
					$.get("engine/ajax/add_notes_internes.php",
					{
						title	: title,
						status	: status,
						urlimg	: urlimg,
						pstdby	: pstdby
					},
					function(data,status){

						if(status == 'success')
						{
							if(data == 'DONE')
							{
								show_entreprise_do();
								show_notes_internes_do();

								//Obtention des informations de l'utilisateur & Enregistrement dans les logs ...
								log_this_action(get_sessions_do(),'NOTE_INTERNE_ADDED');

								show_flash_1_1_do("La note interne a été ajoutée !!!",'y');
							}
						}
					});
				}
			}
		}
	});

	return false;
}

//Edition des notes internes - suppression...
function suppress_note_interne_do()
{
	$("#suppress_note_interne").click(function () {

		if(confirm("Voulez-vous vraiment supprimer cette note interne ?"))
		{
			var id_item = $(this).closest("tr").find("#id_note_interne").attr("value");

			$.get("engine/ajax/delete_note_interne.php",
			{
				id_item:id_item
			},
			function(data,status){

				if(status == 'success')
				{
						if(data == 'DONE')
						{
							show_entreprise_do();
							show_notes_internes_do();

							//Obtention des informations de l'utilisateur & Enregistrement dans les logs ...
							log_this_action(get_sessions_do(),'NOTE_INTERNE_DELETED');

							show_flash_1_1_do(suppressDone,'y');
						}
						else
						{
							show_entreprise_do();
							show_flash_1_1_do(suppressNotDone,'n');
						}
				}
				else
					alert(status);
			});
		}
	});
}

//Edition des notes internes - mise à jour ...
function update_note_interne_do()
{
	$("#statut_note_interne").change(function () {

		var id_item		= $(this).closest("tr").find("#id_note_interne").attr("value");
		var value_item 	= $(this).val();

		$.get("engine/ajax/update_note_interne.php",
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
						show_notes_internes_do();

						//location.reload();

						//Obtention des informations de l'utilisateur & Enregistrement dans les logs ...
						log_this_action(get_sessions_do(),'NOTE_INTERNE_UPDATED');

						show_flash_1_1_do(updateDone,'y');
					}
				}
		});

	});
}

//Affichage de la zone d'édition des NOTES INTERNES ...
function show_notes_internes_edit_zone_do()
{
	$.get("engine/ajax/show_notes_internes_edit.php",
			function(data,status){
				if(status == 'success')
				{
					$("#show_notes_internes_edit_zone").html(data);
					add_note_interne_do();
					suppress_note_interne_do();
					update_info_entreprise_do();
				}
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
			show_flash_1_1_do("Ajoutez une photo illustrative du DG SVP !!!",'f');
		}
		else
		{

			var title 	= $("#titre_motdg").val();
			var content	= $("#texte_motdg").val();
			var status 	= $("#statut_motdg").val();

			if((title == "") ||(content == ""))
			{
				//alert("Remplissez les champs vides SVP !!!");
				show_flash_1_1_do("Remplissez les champs vides SVP !!!",'f');
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
							show_flash_1_1_do("Le message du DG est en ligne !!!",'y');
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

	$(function ()
	{

		'use strict';

		// Define the url to send the file data to
		var url = 'uploads/ie/files_ie.php';

		// Call the fileupload widget and set some parameters
		$('#fileupload').fileupload(
			{
				url			: url,
				dataType	: 'json',
				done		:
								function (e, data)
								{
									$("#ie_upload_status").html("<div class='scan_file_inf_1'>Analyse du format terminée !!!</div>");

									// Add each uploaded file name to the #files list
									$.each(data.result.files,
										function (index, file)
										{
											if(file.error)
											{
												if(file.error !== 'undefined')
												{
													$('<div/>').html("<br /><p class='scan_file_inf_0'>"+file.name+"</p><p class='scan_file_inf_2'>"+" "+file.error+" !!!</p>").appendTo('#ie_upload_status');
												}
												else
												{
													alert(file.error);
													$('<div/>').html("<br /><p class='scan_file_inf_0'>"+file.name+"</p><p class='scan_file_inf_1'> .... accepté !!!</p>").appendTo('#ie_upload_status');
												}

											}
											else
											{
												nomfichier = file.name;
												$('<div/>').html("<br /><p class='scan_file_inf_0'>"+file.name+"</p><p class='scan_file_inf_1'> .... accepté !!!</p>").appendTo('#ie_upload_status');
											}

										}
									);
								},

				fail		:
								function (e, data) {
									// data.errorThrown
									// data.textStatus
									// data.jqXHR

									alert("Contactez un administrateur : "+data.errorThrown);
								},
				progressall	:
								function (e, data)
								{
									// Update the progress bar while files are being uploaded
									var progress = parseInt(data.loaded / data.total * 100, 10);
									$('#progress .bar').css(
										'width',
										progress + '%'
									);
								}
			}
		);
	});

	$("#add_info_entreprise").click(function(){

		if(nomfichier == "")
		{
			//alert("Ajoutez une image illustrant l'info SVP !!!");
			show_flash_1_1_do("Ajoutez une image illustrant l'info SVP !!!",'f');
		}
		else
		{
			var title 	= $("#titre_info_entreprise").val();
			var content	= $("#texte_info_entreprise").val();
			var status 	= $("#statut_info_entreprise").val();

			var pstdby	= get_sessions_do();


			if((title == "") ||(content == ""))
			{
				//alert("Remplissez les champs vides SVP !!!");
				show_flash_1_1_do("Remplissez les champs vides SVP !!!",'f');
			}
			else
			{
				var urlimg = 'uploads/ie/files/'+nomfichier;
				$.get("engine/ajax/add_info_entreprise.php",
				{
					title	: title ,
					content	: content,
					status	: status,
					urlimg	: urlimg,
					pstdby	: pstdby
				},
				function(data,status){

					if(status == 'success')
					{
						if(data == 'DONE')
						{
							show_entreprise_do();

							//Obtention des informations de l'utilisateur & Enregistrement dans les logs ...
							log_this_action(get_sessions_do(),'INFO_ENTREPRISE_ADDED');

							show_flash_1_1_do("L'information a été ajoutée !!!",'y');
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

							//Obtention des informations de l'utilisateur & Enregistrement dans les logs ...
							log_this_action(get_sessions_do(),'INFO_ENTREPRISE_DELETED');

							show_flash_1_1_do(suppressDone,'y');
						}
						else
						{
							show_entreprise_do();
							show_flash_1_1_do(suppressNotDone,'f');
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
						show_entreprise_do();

						//Obtention des informations de l'utilisateur & Enregistrement dans les logs ...
						log_this_action(get_sessions_do(),'INFO_ENTREPRISE_UPDATED');

						show_flash_1_1_do(updateDone,'y');
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
function add_doc_do_v2(cat_id_n)
{
	var fu_error 	= 0;
	var nomfichier 	= "";	
	
	$("#add_doc").click(function()
	{				
		var doc_name 	= $("#doc_name").val();
		var doc_cat		= $("#doc_cat").val();
		var doc_type	= $("#doc_type").val();
		var status 		= $("#statut_doc").val();

		if((doc_name == "") ||(doc_type == 0))
		{
			show_flash_1_1_do("Remplissez les champs vides SVP !!!",'f');
		}
		else
		{
			//Traitement du nom du document ...
			$.get('engine/ajax/verif_doc.php',
			{
				doc_nm		: doc_name
			},
			function(data,status){

				if(status == 'success')
				{
					if(data == 'TRUE')
					{
						show_flash_1_1_do("NOM DE FICHER CORRECT !!!","t");
					}
					else
						show_flash_1_1_do("Erreur DATAS: "+data, "f");
				}
				else
				{
					show_flash_1_1_do("Erreur AJAX: "+data, "f");
				}
			});			
			
			var urldoc = 'uploads/docs/'+cat_id_n+'/'+nomfichier;
			
			/*
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
						show_flash_1_1_do("Le document '"+doc_name+"' a été ajouté !!!",'y');
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
			*/
			
		}		
	});
	
	return false;
}

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
			show_flash_1_1_do("Erreur: aucun fichier n'a été sélectionné !!!",'f');
		}
		else
		{
			var doc_name 	= $("#doc_name").val();
			var doc_cat		= $("#doc_cat").val();
			var doc_type	= $("#doc_type").val();
			var status 		= $("#statut_doc").val();

			if((doc_name == "") ||(doc_type == 0))
			{
				show_flash_1_1_do("Remplissez les champs vides SVP !!!",'f');
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
							show_flash_1_1_do("Le document '"+doc_name+"' a été ajouté !!!",'y');
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
	.delegate('.suppress_doc', "click", function () {

		if(confirm("Voulez-vous vraiment supprimer ce document ?"))
		{
			var id_item = $(this).closest("tr").find(".id_doc").attr("value");

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
							show_flash_1_1_do(suppressDone,'y');
						}
						else
						{
							show_documents_do();
							show_flash_1_1_do(suppressNotDone,'f');
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

		var id_item 		= $(this).closest("tr").find("#id_doc").attr("value");
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
					show_flash_1_1_do(updateDone,'y');
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
					//add_doc_do(cat);
					add_doc_do_v2(cat);
					suppress_doc_do(cat);
					update_doc_do(cat);
				}
	});
}

//Authentifications ...

function disconnect_do()
{
	$.get('engine/ajax/disconnect.php',
		function(data,status)
		{
			if(status === 'success')
			{
				show_flash_1_1_do("Vous êtes maintenant déconnecté(e) !!!",'y');

				show_disconnected_do();
				show_entreprise_do();
			}
		}
	);
}


function show_connected_do(name,pname)
{
	$('#intranet_user_infos')
	.empty()
	.load("admin_connected.php",
		function(data,status)
		{
			$('#adm_name').html(name);
			$('#adm_pname').html(pname);

			$('#adm_btn_disconnect').click(
				function()
				{
					if(confirm("Vous êtes sur le point de vous déconnecter. Continuer ?"))
					{
						$('#adm_options').empty().html('Vous devez vous connecter pour voir les options d\'administration !!!');
						disconnect_do();
					}

				}
			);
		}
	);
}


function show_user_infos_do(usr,pwd)
{
	$.getJSON("engine/ajax/show_user_infos.php",
		{
			'usergreenn':usr,
			'passgreenn':pwd
		},
		function(data,status)
		{
			if(status === 'success')
			{
				show_entreprise_do();
				show_connected_do(data.usr.name,data.usr.pname);

				var htmlContent = "";

				$('#adm_options').empty();

				$.each(data.links,
					function(index, value)
					{

						var nwHTML_id 	= value.val_id;
						var nwHTML_lbl	= value.val_displayed;
						var nwHTML_all	= '<span id="'+nwHTML_id+'"><a href="javascript:void()">'+nwHTML_lbl+'</a></span><br />';

						$('#adm_options').append(nwHTML_all);
					}
				);
			}
			else
				alert("SYSTEM ERROR: CAN'T REACH CODE PAGE !!!");
		}
	);

	return false;
}


function authentification_do(user,pass)
{
	$.getJSON("engine/ajax/authentifications.php",
		{
			usergreenn:user,
			passgreenn:pass
		},
		function(data,status)
		{
			if(status === 'success')
			{
				if(data.usr.name)
				{
					show_flash_1_1_do('Connexion réussie ... Options ADMINISTRATEUR chargées !!!','s');
					show_user_infos_do(data.usr.login,data.usr.pass);

					//Creation de la session ...
					create_session_do(data.usr.login,data.usr.pass);

					//Obtention des informations de l'utilisateur & Enregistrement dans les logs ...
					log_this_action(get_sessions_do(),'LOGGED_SUCCESSFULLY');
				}
				else
				{

					show_flash_1_1_do('Vos identifiants sont incorrects !!!','e');
				}

			}
		}
	);

	return false;
}

function login_do()
{
	$(zonePrincipale).load("admin_login.php",
		function(responseTxt,statusTxt)
		{
			if(statusTxt === "success")
			{
				$('#authentif_intranet_admin').on('submit', function(e)
					{
						var usergreenn 	= $('#user_greenn').val();
						var passgreenn 	= $('#pass_greenn').val();

						if(usergreenn === '' || passgreenn === '')
						{
							show_flash_1_1_do('Tous les champs doivent êtres remplis !!!','n');
						}
						else
						{
							authentification_do(usergreenn,passgreenn);
				   		}

			   			return false;
		    			}

				);

			}
		})
		.hide()
		.fadeIn(fadeSpeed);
	 return false;
}

function show_disconnected_do()
{
	$('#intranet_user_infos')
	.empty()
	.load("admin_not_connected.php",
		function(data,status)
		{
			$('#adm_btn_connect').click(
				function()
				{
					login_do();
				}
			);
		}
	);
}

/********************/
function verif_session_do()
{
	$.getJSON('engine/ajax/verif_sessions.php',
		function(data,status,xhr)
		{
			if(status === "success")
			{
				if((data.usr.name === 'none') && (data.usr.mdp === 'none'))
				{
					show_disconnected_do();
					show_entreprise_do();
				}
				else
				{
					show_user_infos_do(data.usr.name,data.usr.mdp);
				}
			}
			else
				alert("SYSTEM ERROR: CAN'T REACH CODE PAGE !!!");
		}
	);

	return false;
}

/** Accès aux fonctions d'administration ************************************************************/
function administration_do()
{

	//Affichage des zones d'administration principales ...
	$(document)
	.delegate("#admin_infos_defil_lateral", "click", function ()
	{
		$(zonePrincipale).load("admin_infos_defil_lateral.php",function(responseTxt,statusTxt){
			if(statusTxt=="success"){
				show_texte_defilant_edit_zone_do();
			}
		})
		.hide().fadeIn(fadeSpeed);
		return false;
	})

	.delegate("#admin_notes_internes", "click", function ()
	{
		$(zonePrincipale).load("admin_notes_internes.php",function(responseTxt,statusTxt){
			if(statusTxt=="success"){
				show_notes_internes_edit_zone_do();
			}
		})
		.hide().fadeIn(fadeSpeed);
		return false;
	})

	/*.delegate("#admin_motdg", "click", function ()
	{
		$(zonePrincipale).load("admin_motdg.php",function(responseTxt,statusTxt){
			if(statusTxt=="success"){
				add_motdg_do();
			}
		})
		.hide().fadeIn(fadeSpeed);
		return false;
	})*/


	.delegate("#admin_entreprise", "click", function ()
	{
		$(zonePrincipale).load("admin_entreprise.php",function(responseTxt,statusTxt){
			if(statusTxt=="success"){
				show_infos_entreprise_edit_zone_do();
			}
		})
		.hide().fadeIn(fadeSpeed);
		return false;
	})


	.delegate("#admin_docs_aq", "click", function ()
	{
		var cat_id_n = 3;
		$(zonePrincipale).load('admin_docs.php?cat='+cat_id_n+'',function(responseTxt,statusTxt){
			if(statusTxt=="success"){
				show_docs_edit_zone_do(cat_id_n);
			}
		})
		.hide().fadeIn(fadeSpeed);
		return false;

	})

	.delegate("#admin_docs_rh", "click", function ()
	{
		var cat_id_n = 4;
		$(zonePrincipale).load('admin_docs.php?cat='+cat_id_n+'',function(responseTxt,statusTxt){
			if(statusTxt=="success"){
				show_docs_edit_zone_do(cat_id_n);
			}
		})
		.hide().fadeIn(fadeSpeed);
		return false;
     })

	.delegate("#admin_docs_adv", "click", function ()
	{
		var cat_id_n = 5;
		$(zonePrincipale).load('admin_docs.php?cat='+cat_id_n+'',function(responseTxt,statusTxt){
			if(statusTxt=="success"){
				show_docs_edit_zone_do(cat_id_n);
			}
		})
		.hide().fadeIn(fadeSpeed);
		return false;
     })

	.delegate("#admin_docs_amg", "click", function ()
	{
		var cat_id_n = 6;
		$(zonePrincipale).load('admin_docs.php?cat='+cat_id_n+'',function(responseTxt,statusTxt){
			if(statusTxt=="success"){
				show_docs_edit_zone_do(cat_id_n);
			}
		})
		.hide().fadeIn(fadeSpeed);
		return false;
     })

}

/** Chargements initiaux ****************************************************************************/

$(document).ready(function()
{
	$.ajaxSetup({ cache: false });

	function execute_intranet()
	{
		//Menus & boutons ...
		menus_behaviors_do();
		buttons_actions_do();

		//Texte défilant ...
		//marquee_do();
		//show_texte_defilant_do();

		//Ménu latéral gauche ...
		//tabs_left_do();
		//show_notes_internes_do();
		//show_texte_spotlight_do();

		//Administration ...
		//administration_do();

		//Affichage par défaut ...
		//verif_session_do();
		//show_entreprise_do();
		show_ads_app_do();


		//show_slideShow_do();
		//setInterval('show_slideShow_do()',5000);
	}

	execute_intranet();

});

