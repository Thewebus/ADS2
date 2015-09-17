
<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
   <?php

$url= './files';
if ($dir = opendir("$url")) {

$num = 0;
while($file = readdir($dir)) {
	if ($file != "." && $file != ".." && $file != "_notes" && $file != "pdf.png"  && $file != "thumbnail") {
	$num++;
?>
   <tr>
      <td width="20"><img src="uploads/ni/files/pdf.png" width="20" height="20" alt="" /></td>
      <td width="240">
         <div id="ni_content">
            <p><a <?php echo 'id="ni_id_'.$num.'"'; ?> href="uploads/ni/files/<?php echo $file;?>"><?php echo substr(str_replace(" ","_",$file),0,25).'...'; ?></a> </p>
         </div>
      </td>
      <td width="240"><a href="javascript:void()">Supprimer</a></td>
   </tr>
   <?php	
  }
  }
  closedir($dir);
}
?>
