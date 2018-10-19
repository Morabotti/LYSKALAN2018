/***********************************************/
//STYLE VARIABLES
/***********************************************/
var fElements = document.getElementsByClassName("PVaraus");
var style_vapaa = "Pvapaa"; var style_varattu = "PVaraus";


/***********************************************/
//EVENTLISTENING - FORM CONTROL
/***********************************************/
document.getElementById("form_turnaus_ei").addEventListener("click", function(){
    document.getElementById("team-form").setAttribute("style", "display:none")
});

document.getElementById("form_turnaus_kylla").addEventListener("click", function(){
    document.getElementById("team-form").setAttribute("style", "display:visible")
});


/***********************************************/
//BRAIN BEHIND SELECTING PLACE
/***********************************************/
window.addEventListener("click", function(ev){
    if(ev.target.className === "unselectable")
    {
        if(ev.target.parentNode.className === style_vapaa)
        {
            Selected(ev.target.innerHTML, ev.target.parentNode);
        }
        else if(ev.target.parentNode.className === style_varattu)
        {
            UnSelected();
        }
    }
    else if(ev.target.className === style_vapaa)
    {
        Selected(ev.target.children[0].innerHTML, ev.target)
    }
    else if(ev.target.className === style_varattu)
    {
        UnSelected();
    }
});

function Selected(FPaikka, FObject)
{
    for(var i = 0; i < fElements.length; i++)
    {
        fElements[i].className = style_vapaa;
    }
    FObject.className = style_varattu;
    document.getElementById("form_istumapaikka").value = FPaikka;
    document.getElementById("form_istumapaikka").classList.add("is-success");
}

function UnSelected()
{
    for(var i = 0; i < fElements.length; i++)
    {
        fElements[i].className = style_vapaa;
    }
    document.getElementById("form_istumapaikka").value = "";
    document.getElementById("form_istumapaikka").classList.remove("is-success");
}

