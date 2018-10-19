/***********************************************/
//"KILTA" -TAB RENDER
/***********************************************/
var info_output3 = document.getElementById("kilta-cont");
$.ajax({
    type: "GET",
    url: ajax_kilta,
    success: function(obj){
        info_output3.innerHTML = obj.content;
    },
    error: function(){
        info_output3.innerHTML = "Tietokanta virhe. Tietoa ei saatu.";
    }
});