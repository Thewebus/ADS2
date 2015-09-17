// JavaScript Document

$(function() {
    $( "#tabs" ).tabs({ active: <?php echo $_SESSION['tabid']; ?> }, {
      beforeLoad: function( event, ui ) {
        ui.jqXHR.error(function() {
          ui.panel.html(
            "Contenu Introuvable " +
            "Merci d'actualiser la page" );
        });
      }
    });
    
    $(document)
    .delegate("tabs", "active: value",function(){
	 beforeLoad: function( event, ui ) {
        ui.jqXHR.error(function() {
          ui.panel.html(
            "Contenu Introuvable " +
            "Merci d'actualiser la page" );
        });
      }   
	    
    });
    
  });
