<div>
  <fieldset>
    <legend>Ajouter une note interne</legend>
    <table border="0" cellspacing="0" cellpadding="0" >
      <tr>
        <td valign="top">Fichier :</td>
        <td>
          <div id="fu">
            <div class="container">
              <!-- Button to select & upload files --> 
              <span class="btn btn-success fileinput-button"> <span>Choisir...</span> 
              <!-- The file input field used as target for the file upload widget -->
              <input id="fileupload" type="file" name="files[]" multiple>
              </span><br /><br /> 
              
              <!-- The global progress bar -->
              <div id="ni_upload_status">
              </div>
              <div id="progress" class="progress progress-success progress-striped">
                <div class="bar">
                </div>
              </div>
              <span>(Aide: seuls les fichiers PDF de taille 2Mo maximum seront chargés)</span> 
              <!-- The list of files uploaded -->
              
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td valign="top">Nom de <br />
        la Note : </td>
        <td>
          <label for="titre_info_entreprise"></label>
          <input type="text" name="titre_note_interne" id="titre_note_interne" /> 
          (25 caractères maximum)
        </td>
      </tr>
      
      <tr>
        <td valign="top">Afficher ? :</td>
        <td>
          <select name="status_note_interne" id="status_note_interne">
            <option value="on" selected="selected">OUI</option>
            <option value="off">NON</option>
          </select>
        </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>
          <button id="add_note_interne">Ajouter la note interne</button>
        </td>
      </tr>
    </table>
  </fieldset>
</div>
<div id="show_notes_internes_edit_zone">
</div>
<div>
  <button id="close_administration">Sortir de l'administration</button>
</div>
