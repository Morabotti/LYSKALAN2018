/***********************************************/
//"TIMETABLE" -TAB RENDER
/***********************************************/
var info_output2 = document.getElementById("time-table-cont");
$.ajax({
    type: "GET",
    url: ajax_timetable,
    success: function(obj){
        info_output2.innerHTML = obj.content;
    },
    error: function(){
        info_output2.innerHTML = "Tietokanta virhe. Tietoa ei saatu.";
    }
});