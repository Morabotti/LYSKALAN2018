/***********************************************/
//TAB-CONTROLLER FOR DASHBOARD
/***********************************************/
var classname = document.getElementsByClassName("tb");
function ChangeTab(NextTab)
{
    for(var i = 1; i < classname.length+1; i++)
    {
        document.getElementById("link-"+ i).classList.remove("is-active");
        document.getElementById("tab-"+ i).setAttribute("style", "display:none");
    }

    document.getElementById("link-"+ NextTab).classList.add("is-active");
    document.getElementById("tab-"+ NextTab).setAttribute("style", "display:block");
}
