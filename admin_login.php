<div id="admin_connect_zone">
<fieldset>
  <legend>
  <div id="adm_title_zone">
    Veuillez vous authentifier SVP !!!
  </div>
  </legend>
  <div id="adm_content_zone">
    <form id="authentif_intranet_admin"  action="engine/ajax/get_access_rights.php" method="post">
      <table border="0" cellspacing="0" cellpadding="0" >
        <tr>
          <td width="46" valign="top">
            Login :
          </td>
          <td width="144">
            <input type="text" name="user_greenn" id="user_greenn">
        <tr>
          <td width="46" valign="top">
            Mot de passe:
          </td>
          <td width="144">
            <input type="password" name="pass_greenn"  id="pass_greenn">
          </td>
        </tr>
        <tr>
          <td>&nbsp;
          </td>
          <td>
            <button id="admin_connect">Connexion</button>
          </td>
        </tr>
      </table>
    </form>
  </div>
</fieldset>
<div>
  <button id="close_administration">Sortir de l'administration</button>
</div>
