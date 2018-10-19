/***********************************************/
//EVENT LISTENER
/***********************************************/
var submitbutton = document.getElementById("form_submit");
submitbutton.addEventListener("click", function(){ SendData(); });


/***********************************************/
//FUNCTION INIT - SENDING PLACE ORDER
/***********************************************/
function SendData()
{
    var check = CheckErrors();
    if(check)
    {
        submitbutton.classList.add("is-loading");
        if(document.getElementById("form_turnaus_ei").checked)
        {
            var SentData = 
            {
                "nimi": document.getElementById("form_etunimi").value,
                "sukumimi": document.getElementById("form_sukunimi").value,
                "luokka": document.getElementById("form_luokka").value,
                "paikka": document.getElementById("form_istumapaikka").value,
                "turnaus": false,
                "info": document.getElementById("form_info").value
            };
        }
        else
        {
            var SentData = 
            {
                "nimi": document.getElementById("form_etunimi").value,
                "sukumimi": document.getElementById("form_sukunimi").value,
                "luokka": document.getElementById("form_luokka").value,
                "paikka": document.getElementById("form_istumapaikka").value,
                "turnaus": true,
                "turnausnimi": document.getElementById("form_tiiminimi").value,
                "turnauspeli": [document.getElementById("form_tiimi_1").checked, document.getElementById("form_tiimi_2").checked],
                "info": document.getElementById("form_info").value,
            };
        }
        $.ajax({
            type: "POST",
            url: ajax_reqpaik,
            data: SentData,
            success: function(){
                $.notify("Varasit paikan!", "success");
                submitbutton.classList.remove("is-loading");
                setTimeout(function(){
                    location.reload();
                }, 1500); 
            },
            error: function(){
                submitbutton.classList.remove("is-loading");
                $.notify("Server error. Koita uudestaan kymmenen minuutin päästä. Jos virhe ei ole lähtenyt, ota yhteyttä kiltamestariin.", "error");
            }
          });
    }
}


/***********************************************/
//ERROR CHECKING / ILLEGAL CHARS
/***********************************************/
function CheckErrors()
{
    var format = /[ !@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]/;
    var xssCounter = /<(.*)>/;
    var iNimi = document.getElementById("form_etunimi");
    var iSukunimi = document.getElementById("form_sukunimi");
    var iLuokka = document.getElementById("form_luokka");
    var iPaikka = document.getElementById("form_istumapaikka");
    var iTurnaus_Osallistuu = document.getElementById("form_turnaus_kylla");
    var iTurnaus_Nimi = document.getElementById("form_tiiminimi");
    var iTurnaus_Peli = [document.getElementById("form_tiimi_1").checked, document.getElementById("form_tiimi_2").checked];
    var iInfo = document.getElementById("form_info");
    
    //Nimi
    if(iNimi.value === "" || iNimi.value === " " || iNimi.value === null)
    {
        $.notify("Nimi on tyhjä", "error");
        iNimi.classList.add("is-danger");
        return false;
    }
    if(format.test(iNimi.value))
    {
        $.notify("Nimesi on viallinen", "error");
        iNimi.classList.add("is-danger");
        return false;
    }
    iNimi.classList.remove("is-danger");
    iNimi.classList.add("is-success");

    //Sukunimi
    if(iSukunimi.value === "" || iSukunimi.value === " " || iSukunimi.value === null)
    {
        $.notify("Sukunimi on tyhjä", "error");
        iSukunimi.classList.add("is-danger");
        return false;
    }
    if(format.test(iSukunimi.value))
    {
        $.notify("Sukunimesi on viallinen", "error");
        iSukunimi.classList.add("is-danger");
        return false;
    }
    iSukunimi.classList.remove("is-danger");
    iSukunimi.classList.add("is-success");

    //Luokka
    if(iLuokka.value === "" || iLuokka.value === " " || iLuokka.value === null)
    {
        $.notify("Luokkasi on tyhjä", "error");
        iLuokka.classList.add("is-danger");
        return false;
    }
    if(format.test(iLuokka.value))
    {
        $.notify("Luokkasi on viallinen", "error");
        iLuokka.classList.add("is-danger");
        return false;
    }
    if(!isNumber(iLuokka.value.charAt(0)) && !isNumber(iLuokka.value.charAt(1)))
    {
        $.notify("Luokkasi on väärä", "error");
        iLuokka.classList.add("is-danger");
        return false;
    }
    iLuokka.classList.remove("is-danger");
    iLuokka.classList.add("is-success");

    //Paikka
    if(iPaikka.value === "" || iPaikka.value === " " || iPaikka.value === null)
    {
        $.notify("Et ole valinnut paikkaasi. Valitse paikka kartasta", "error");
        iPaikka.classList.add("is-danger");
        return false;
    }
    if(format.test(iPaikka.value))
    {
        $.notify("wnb hacker", "error");
        iPaikka.classList.add("is-danger");
        return false;
    }
    iPaikka.classList.remove("is-danger");
    iPaikka.classList.add("is-success");

    //Info
    if(xssCounter.test(iInfo.value))
    {
        $.notify("Lisätieto osassa on viallisia merkkejä. (<(.*)>)", "error");
        iInfo.classList.add("is-danger");
        return false;
    }
    iInfo.classList.remove("is-danger");
    iInfo.classList.add("is-success");

    //Turnaus
    if(iTurnaus_Osallistuu.checked)
    {
        if(iTurnaus_Nimi.value === "" || iTurnaus_Nimi.value === " " || iTurnaus_Nimi.value === null)
        {
            $.notify("Tiimin nimi on tyhjä", "error");
            iTurnaus_Nimi.classList.add("is-danger");
            return false;
        }
        if(xssCounter.test(iTurnaus_Nimi.value))
        {
            $.notify("Tiimisi nimessä on viallisia merkkejä.", "error");
            iTurnaus_Nimi.classList.add("is-danger");
            return false;
        }
        iTurnaus_Nimi.classList.remove("is-danger");
        iTurnaus_Nimi.classList.add("is-success");

        if(iTurnaus_Peli[0]===false &&iTurnaus_Peli[1] ===false)
        {
            $.notify("Tiimisi täytyy osallistua jompaankumpaan turnaukseen.", "error");
            return false;
        }
    }
    return true;
}


/***********************************************/
//COPY PASTE FUNC
/***********************************************/
function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }
