/***********************************************/
//"INFO" -TAB RENDER
/***********************************************/
var info_output = document.getElementById("info-output");
$.ajax({
    type: "GET",
    url: ajax_info,
    success: function(obj){
        info_output.innerHTML = obj.content;
    },
    error: function(){
        info_output.innerHTML = "Tietokanta virhe. Tietoa ei saatu.";
    }
});