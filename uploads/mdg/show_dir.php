<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>show_dir</title>
</head>

<body>
<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
   <?php

$url= './files';
if ($dir = opendir("$url")) {
//echo "Pointeur: ".$dir."<br>\n";
//echo "Chemin: ".getcwd()."<br>\n";
$num = 0;
while($file = readdir($dir)) {
	if ($file != "." && $file != ".." && $file != "_notes" && $file != "pdf.png"  && $file != "thumbnail") {
	$num++;
?>
   <tr>
      <td width="20"><img src="uploads/ni/files/pdf.png" width="20" height="20" alt="" /></td>
      <td width="480">
         <div id="ni_content">
            <p><a <?php echo 'id="ni_id_'.$num.'"'; ?> href="uploads/ni/files/<?php echo $file;?>"><?php echo substr(str_replace(" ","_",$file),0,25).'...'; ?></a> </p>
         </div>
      </td>
   </tr>
   <?php	
  }
  }
  closedir($dir);
}
?>
</table>
</body>
</html>