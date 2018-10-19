/***********************************************/
//FROALA EDITOR INIT
/***********************************************/
$(function() {
    $('#myEditor_table')
          .froalaEditor({
            // Set the save param.
            saveParam: 'content',
            toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'embedly', 'insertFile', 'insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'spellChecker', 'help', 'html', '|', 'undo', 'redo'],
            placeholderText: '',
            fontSizeDefaultSelection: '18',
            // Set the save URL.
            saveURL: ajax_timetableupdate,
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
            InitTableArea();
});

$('#saveButtonTimetable').click (function () {
    $('#myEditor_table').froalaEditor('save.save')
});


/***********************************************/
//AUTOFILLING TEXT WITH OLD DATA
/***********************************************/
function InitTableArea()
{
    var savebutton2 = document.getElementById("saveButtonTimetable");
    savebutton2.classList.add("is-loading");
    var target =  document.getElementById("table_text");
    $.ajax({
        type: "GET",
        url: ajax_timetable,
        success: function(obj){
            savebutton2.classList.remove("is-loading");
            target.innerHTML = obj.content;
        },
        error: function(){
            savebutton2.classList.remove("is-loading");
            target.innerHTML = "Aikaisempia tietoja ei saatu tietokannasta.";
        }
    });
}


