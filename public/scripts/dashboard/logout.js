/***********************************************/
//LOGOUT REQUEST HANDLER
/***********************************************/
function Logout()
{
    var logoutbutton = document.getElementById("logoutbutton");
    logoutbutton.classList.add("is-loading");
    $.ajax({
        type: "POST",
        url: ajax_logout,
        success: function(res){
            logoutbutton.classList.remove("is-loading");
            window.location.replace(res);
        },
        error: function(){
            logoutbutton.classList.remove("is-loading");
            $.notify("Error", "error");
        }
    });
}