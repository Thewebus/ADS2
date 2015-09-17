<div>
   <fieldset>
      <legend>Ajouter un nouveau message du DG</legend>
      <table border="0" cellspacing="0" cellpadding="0" >
         <tr>
            <td valign="top">Image :</td>
            <td>
               <div id="fu">
                  <div class="container">
                     <!-- Button to select & upload files --> 
                     <span class="btn btn-success fileinput-button"> <span>Choisir ...</span> 
                     <!-- The file input field used as target for the file upload widget -->
                     <input id="fileupload" type="file" name="files[]" >
                     </span>
                     <!-- The global progress bar -->
                     <div id="mdg_upload_status">
                     </div>
                     <div id="progress" class="progress progress-success progress-striped">
                        <div class="bar">
                        </div>
                     </div>
                     <span>(Aide: seules les images JPG de taille 2Mo maximum,et de dimensions 700px de large sur 200px de hauteur seront chargées)</span> 
                  </div>
               </div>
            </td>
         </tr>
         <tr>
            <td valign="top">Titre : </td>
            <td>
               <label for="titre_motdg"></label>
               <input type="text" name="titre_motdg" id="titre_motdg" />
            </td>
         </tr>
         <tr>
            <td valign="top">Texte : </td>
            <td>
               <textarea name="texte_motdg" id="texte_motdg" cols="45" rows="5"></textarea>
            </td>
         </tr>
         <tr>
            <td valign="top">Afficher ? :</td>
            <td>
               <select name="statut_motdg" id="statut_motdg">
                  <option value="on" selected="selected">OUI</option>
                  <option value="off">NON</option>
               </select>
            </td>
         </tr>
         <tr>
            <td>&nbsp;</td>
            <td>
               <button id="add_motdg">Ajouter le message</button>
            </td>
         </tr>
      </table>
   </fieldset>
</div>
<div id="show_motdg_edit">
</div>
<div>
   <button id="close_administration">Sortir de l'administration</button>
</div>
