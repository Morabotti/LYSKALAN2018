/***********************************************/
//FROALA EDITOR INIT
/***********************************************/
$(function() {
    $('#myEditor_kilta')
          .froalaEditor({
            // Set the save param.
            saveParam: 'content',
            toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'embedly', 'insertFile', 'insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'spellChecker', 'help', 'html', '|', 'undo', 'redo'],
            placeholderText: '',
            fontSizeDefaultSelection: '18',
            // Set the save URL.

            saveURL: ajax_kiltaupdate,
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
                $.notify("Kilta päivitetty!", "success");
            })
            .on('froalaEditor.save.error', function (e, editor, error) {
                $.notify("Server error.", "error");
            })
            InitKiltaArea();
});

$('#saveButtonKilta').click (function () {
    $('#myEditor_kilta').froalaEditor('save.save')
});


/***********************************************/
//AUTOFILLING TEXT WITH OLD DATA
/***********************************************/
function InitKiltaArea()
{
    var savebutton1 = document.getElementById("saveButtonKilta");
    savebutton1.classList.add("is-loading");
    var target =  document.getElementById("kilta_text");
    $.ajax({
        type: "GET",
        url: ajax_kilta,
        success: function(obj){
            savebutton1.classList.remove("is-loading");
            target.innerHTML = obj.content;
        },
        error: function(){
            savebutton1.classList.remove("is-loading");
            target.innerHTML = "Aikaisempia tietoja ei saatu tietokannasta.";
        }
    });
}


