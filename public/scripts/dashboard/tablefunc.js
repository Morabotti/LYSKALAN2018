/***********************************************/
//EVENT LISTENING - MAIN TABLE FUNCTIONS(TOP BAR)
/***********************************************/
document.getElementById("function-force-refresh").addEventListener("click",function(){
    ForceRefresh();
});

document.getElementById("form_turnaus_ei").addEventListener("click", function(){
    document.getElementById("team-form").setAttribute("style", "display:none");
});

document.getElementById("form_turnaus_kylla").addEventListener("click", function(){
    document.getElementById("team-form").setAttribute("style", "display:visible");
});


/***********************************************/
//REFRESH TABLE
/***********************************************/
function ForceRefresh()
{
    var felement = document.getElementById("qtable");
    felement.remove();
    CreateTable();
}


/***********************************************/
//SEARCH TABLE - COPY/PASTE
/***********************************************/
function searchTable() {
    var input, filter, found, table, tr, td, i, j;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("qtable");
    tr = table.getElementsByClassName("fkayttaja");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++) {
            if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                found = true;
            }
        }
        if (found) {
            tr[i].style.display = "";
            found = false;
        } else {
            tr[i].style.display = "none";
        }
    }
}


/***********************************************/
//ADDING EVENTLISTENERS TO EVERY TABLE FUNC
/***********************************************/
var classname = document.getElementsByClassName("deletefunc");
for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', function()
    {
        CloseWarning();
    });
}

var classname2 = document.getElementsByClassName("removefunc");
for (var i = 0; i < classname2.length; i++) {
    classname2[i].addEventListener('click', function()
    {
        CloseInfoModal();
    });
}

var classname3 = document.getElementsByClassName("exitfunc");
for (var i = 0; i < classname3.length; i++) {
    classname3[i].addEventListener('click', function()
    {
        CloseEditModal();
    });
}


/***********************************************/
//STYLE STUFF
/***********************************************/
function OpenWarning()
{
    document.getElementById("DeleteConfirm").classList.add("is-active");
}

function CloseWarning()
{
    document.getElementById("DeleteConfirm").classList.remove("is-active");
    document.getElementById("fPoisto").removeAttribute("onclick");
}


function OpenInfoModal()
{
    document.getElementById("ShowInfo").classList.add("is-active");
}

function CloseInfoModal()
{
    document.getElementById("ShowInfo").classList.remove("is-active");
}

function OpenEditModal()
{
    document.getElementById("EditInfo").classList.add("is-active");
}

function CloseEditModal()
{
    document.getElementById("EditInfo").classList.remove("is-active");
}