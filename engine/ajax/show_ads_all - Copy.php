<?php
function get_ads_json($url)
{
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept: application/json'));
	$result=curl_exec($ch);
	curl_close($ch);
	
	return $result;
}
?>
<link href="../../css/css.css" rel="stylesheet" type="text/css">
<div class="main_ads_title"> ADMINISTRATION</div>
<div class="main_ads">
<?php
$urlMenu = "http://andro.experts-ci.com:9763/services/androcmsprod.SOAP12Endpoint/cms_get_main_menu?application_id=1";
$json = json_decode(get_ads_json($urlMenu), true);
$json_menu = $json['Entries']['Entry'];
?>
<?php
foreach ($json_menu as $json_elem => $json_value)
{
?>
<!--Affichage des menus principaux ...-->
<div class="ads_cat" id="ads_cat_<?php echo $json_menu[$json_elem]['id']; ?>">
  <div class="ads_cat_title" id="ads_cat_title_<?php echo $json_menu[$json_elem]['id']; ?>"><?php echo $json_menu[$json_elem]['name']; ?> </div>
  
  <!--Affichage des sous-menus ...-->
  <div class="ads_sub_cat_all" id="ads_sub_cat_all_<?php echo $json_menu[$json_elem]['id']; ?>">
    <?php
    $urlSubMenu = "http://andro.experts-ci.com:9763/services/androcmsprod.SOAP12Endpoint/cms_get_sub_menu?menu_id=".$json_menu[$json_elem]['id'];
    $json_sub = json_decode(get_ads_json($urlSubMenu));
    
    if(!isset($json_sub->Entries->Entry))
		echo 'Rien à afficher ...';
	else
	{
		$json_sub_menu = $json_sub->Entries->Entry;
		if(!is_array($json_sub_menu))
		{
		?>
    <div class="ads_sub_cat">
      <table width="100%" border="0">
        <tbody>
          <tr>
            <td width="19%" height="24"><?php echo $json_sub_menu->name; ?></td>
            <td width="13%"><?php echo $json_sub_menu->counter; ?> vue(s)</td>
            <td width="15%"><?php echo $json_sub_menu->avg_rate; ?> / 5</td>
            <td width="42%" align="center">&nbsp;</td>
            <td width="6%" align="center">&nbsp;<!--<button class="ads_answer_request">REPONDRE </button>--></td>
            <td width="5%"><button class="ads_moderate">MODERER</button></td>
          </tr>
        </tbody>
      </table>
      <!--Affichage des commentaires ... sous_menus = 1 -->
      <div class="ads_sub_cat_comment_main">
        <?php
			$urlComments = "http://andro.experts-ci.com:9763/services/androcmsprod.SOAP12Endpoint/cms_get_comments?option_id=".$json_sub_menu->id;
			$json_object_comments = json_decode(get_ads_json($urlComments));
			
			
			if(!isset($json_object_comments->Entries->Entry))
			{
				echo '<div class="ads_empty_zone">Aucun commentaire ...</div>';
				
			}
			else
			{
				$json_comments = $json_object_comments->Entries->Entry;
				
				if(!is_array($json_comments))
				{
		?>
        <div class="ads_sub_cat_comment">
          <table width="100%" border="0">
            <tbody>
              <tr>
                <td width="32%"><?php echo $json_comments->comment; ?></td>
                <td width="14%">De: <?php echo $json_comments->username; ?></td>
                <td width="20%"><?php echo $json_comments->comment_date; ?></td>
                <td width="21%"><button>Afficher/Masquer </button></td>
                <td width="13%" align="right">&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </div>
        <?php
                }
				else
				{
					foreach($json_comments as $json_comments_elem)
					{
					?>
        <div class="ads_sub_cat_comment">
          <table width="100%" border="0">
            <tbody>
              <tr>
                <td width="32%"><?php echo $json_comments_elem->comment; ?></td>
                <td width="14%">De: <?php echo $json_comments_elem->username; ?></td>
                <td width="20%"><?php echo $json_comments_elem->comment_date; ?></td>
                <td width="21%"><input name="ads_comm_on_off" type="checkbox" id="ads_comm_on_off_0" value="off" checked="checked">
                  Masqué
                  <input type="checkbox" name="ads_comm_on_off_" value="on" id="ads_comm_on_off_1">
                  Affiché </td>
                <td width="13%" align="right">&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </div>
        <?php
					}
				}				
			}
				
			
		?>
      </div >
      <!--Affichage des questions ...sous_menus = 1 -->
      <div class="ads_sub_cat_requests_main">
        <?php
			$urlRequests  = "http://andro.experts-ci.com:9763/services/androcmsprod.SOAP12Endpoint/cms_get_requests?option_id=".$json_sub_menu->id;
			$json_object_requests  = json_decode(get_ads_json($urlRequests));
			
			
			if(!isset($json_object_requests->Entries->Entry))
				echo '<div class="ads_empty_zone">Aucune question ...</div>';
			else
			{
				$json_requests = $json_object_requests->Entries->Entry;
				
				if(!is_array($json_requests))
				{
		?>
        <div class="ads_sub_cat_requests">
          <table width="100%" border="0">
            <tbody>
              <tr>
                <td width="32%"><?php echo $json_requests->request; ?></td>
                <td width="14%">De: <?php echo $json_requests->username; ?></td>
                <td width="20%">&nbsp;</td>
                <td width="21%">&nbsp;</td>
                <td width="13%" align="right">&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </div>
        <?php
                }
				else
				{
					foreach($json_requests as $json_request_elem)
					{
					?>
        <div class="ads_sub_cat_requests">
          <table width="100%" border="0">
            <tbody>
              <tr>
                <td width="32%"><?php echo $json_request_elem->request; ?></td>
                <td width="14%">De: <?php echo $json_request_elem->username; ?></td>
                <td width="20%">&nbsp;</td>
                <td width="21%">&nbsp;</td>
                <td width="13%" align="right">&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </div>
        <?php
					}
				}				
			}
				
			
		?>
      </div >
    </div>
    <?php				
		}
		else
		{
			foreach ($json_sub_menu as $json_sub_elem)
		 	{
			?>
    <div class="ads_sub_cat">
      <table width="100%" border="0">
        <tbody>
          <tr>
            <td width="19%" height="24"><?php echo $json_sub_elem->name; ?></td>
            <td width="13%"><?php echo $json_sub_elem->counter; ?> vue(s)</td>
            <td width="15%"><?php echo $json_sub_elem->avg_rate; ?> / 5</td>
            <td width="42%" align="center">&nbsp;</td>
            <td width="6%" align="center">&nbsp;<!--<button class="ads_answer_request">REPONDRE </button>--></td>
            <td width="5%"><button>MODERER</button></td>
          </tr>
        </tbody>
      </table>
      <!--Affichage des commentaires ...sous_menus > 1 -->
      <div class="ads_sub_cat_comment_main">
        <?php
			$urlComments = "http://andro.experts-ci.com:9763/services/androcmsprod.SOAP12Endpoint/cms_get_comments?option_id=".$json_sub_elem->id;
			$json_object_comments = json_decode(get_ads_json($urlComments));
			
			
			if(!isset($json_object_comments->Entries->Entry))
			{
				echo '<div class="ads_empty_zone">Aucun commentaire ...</div>';
				
			}
			else
			{
				$json_comments = $json_object_comments->Entries->Entry;
				
				if(!is_array($json_comments))
				{
		?>
        <div class="ads_sub_cat_comment">
          <table width="100%" border="0">
            <tbody>
              <tr>
                <td width="32%"><?php echo $json_comments->comment; ?></td>
                <td width="14%">De: <?php echo $json_comments->username; ?></td>
                <td width="20%"><?php echo $json_comments->comment_date; ?></td>
                <td width="21%"><button>Afficher/Masquer </button></td>
                <td width="13%" align="right">&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </div>
        <?php
                }
				else
				{
					foreach($json_comments as $json_comments_elem)
					{
					?>
        <div class="ads_sub_cat_comment">
          <table width="100%" border="0">
            <tbody>
              <tr>
                <td width="32%"><?php echo $json_comments_elem->comment; ?></td>
                <td width="14%">De: <?php echo $json_comments_elem->username; ?></td>
                <td width="20%"><?php echo $json_comments_elem->comment_date; ?></td>
                <td width="21%"><input name="ads_comm_on_off" type="checkbox" id="ads_comm_on_off_0" value="off" checked="checked">
                  Masqué
                  <input type="checkbox" name="ads_comm_on_off_" value="on" id="ads_comm_on_off_1">
                  Affiché </td>
                <td width="13%" align="right">&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </div>
        <?php
					}
				}				
			}
				
			
		?>
      </div >
      <!--Affichage des questions ...sous_menus > 1 -->
      <div class="ads_sub_cat_requests_main">
        <?php
			$urlRequests  = "http://andro.experts-ci.com:9763/services/androcmsprod.SOAP12Endpoint/cms_get_requests?option_id=".$json_sub_elem->id;
			$json_object_requests  = json_decode(get_ads_json($urlRequests));
			
			
			if(!isset($json_object_requests->Entries->Entry))
				echo '<div class="ads_empty_zone">Aucune question ...</div>';
			else
			{
				$json_requests = $json_object_requests->Entries->Entry;
				
				if(!is_array($json_requests))
				{
		?>
        <div class="ads_sub_cat_requests">
          <table width="100%" border="0">
            <tbody>
              <tr>
                <td width="32%"><?php echo $json_requests->request; ?></td>
                <td width="14%">De: <?php echo $json_requests->username; ?></td>
                <td width="20%">&nbsp;</td>
                <td width="21%">&nbsp;</td>
                <td width="13%" align="right">&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </div>
        <?php
                }
				else
				{
					foreach($json_requests as $json_request_elem)
					{
					?>
        <div class="ads_sub_cat_requests">
          <table width="100%" border="0">
            <tbody>
              <tr>
                <td width="32%"><?php echo $json_request_elem->request; ?></td>
                <td width="14%">De: <?php echo $json_request_elem->username; ?></td>
                <td width="20%">&nbsp;</td>
                <td width="21%">&nbsp;</td>
                <td width="13%" align="right">&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </div>
        <?php
					}
				}				
			}
				
			
		?>
      </div >
    </div>
    <?php				
			}
		}
	}	
    ?>
  </div>
</div>
<?php
}  
?>
