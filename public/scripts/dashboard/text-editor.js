/***********************************************/
//FROALA EDITOR INIT
/***********************************************/
$(function() {
    $('#myEditor')
          .froalaEditor({
            // Set the save param.
            saveParam: 'content',
            toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'embedly', 'insertFile', 'insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'spellChecker', 'help', 'html', '|', 'undo', 'redo'],
            placeholderText: '',
            fontSizeDefaultSelection: '18',
            // Set the save URL.
            saveURL: ajax_infoupdate,
            saveInterval: 0,
            tableResizerOffset: 10,
            tableResizingLimit: 50,
     
            // HTTP request type.
            saveMethod: 'POST',
     
            // Additional save params.
            saveParams: {id: 'my_editor'}
            })
            .on('froalaEditor.save.before', function (e, editor) {
            // Before save request is made.
            })
            .on('froalaEditor.save.after', function (e, editor, response) {
                $.notify("Tiedot päivitetty!", "success");
            })
            .on('froalaEditor.save.error', function (e, editor, error) {
                $.notify("Server error.", "error");
            })
            InitTextArea();
});

$('#saveButton').click (function () {
    $('#myEditor').froalaEditor('save.save')
});


/***********************************************/
//AUTOFILLING TEXT WITH OLD DATA
/***********************************************/
function InitTextArea()
{
    var savebutton3 = document.getElementById("saveButton");
    savebutton3.classList.add("is-loading");
    var target =  document.getElementById("editor_text");
    $.ajax({
        type: "GET",
        url: ajax_info,
        success: function(obj){
            savebutton3.classList.remove("is-loading");
            target.innerHTML = obj.content;
        },
        error: function(){
            savebutton3.classList.remove("is-loading");
            target.innerHTML = "Aikaisempia tietoja ei saatu tietokannasta.";
        }
    });
}


