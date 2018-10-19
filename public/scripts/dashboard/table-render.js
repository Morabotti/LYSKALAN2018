/***********************************************/
//FUNCTION INIT (MAIN TABLE)
/***********************************************/
function CreateTable()
{
$.post(ajax_kayttajat, function(data, status){
    var render_target = document.getElementById("table-render");
    var LIST_LENGHT = data.push();

    var table =  document.createElement("table"); table.classList.add("table", "is-bordered", "is-striped", "is-narrow", "is-hoverable", "is-fullwidth"); table.id="qtable"
    var thead = document.createElement("thead"); thead.classList.add("fTabbleHead");
    var tr_head = document.createElement("tr");
    var th1_1 = document.createElement("th"); th1_1.setAttribute("colspan", "3"); th1_1.innerHTML = "Tiedot";
    var th1_2 = document.createElement("th"); th1_2.setAttribute("colspan", "3"); th1_2.innerHTML = "Tiedot";
    var th1_3 = document.createElement("th"); th1_3.setAttribute("colspan", "4"); th1_3.innerHTML = "Toiminnot";
    tr_head.appendChild(th1_1); tr_head.appendChild(th1_2); tr_head.appendChild(th1_3);
    thead.appendChild(tr_head);

    var tr_head2 = document.createElement("tr");
    var th2_1 = document.createElement("th"); th2_1.innerHTML = "Nimi"; th2_1.classList.add("width-200");
    var th2_2 = document.createElement("th"); th2_2.classList.add("text-center"); th2_2.innerHTML = "Luokka";
    var th2_3 = document.createElement("th"); th2_3.classList.add("text-center"); th2_3.innerHTML = "Paikka";
    var th2_4 = document.createElement("th"); th2_4.setAttribute("colspan", "3");
    var th2_5 = document.createElement("th"); th2_5.setAttribute("colspan", "3");
    tr_head2.appendChild(th2_1); tr_head2.appendChild(th2_2); tr_head2.appendChild(th2_3); tr_head2.appendChild(th2_4); tr_head2.appendChild(th2_5);
    thead.appendChild(tr_head2);
    table.appendChild(thead);
    var tbody = document.createElement("tbody");
    for(var i = 0; i < LIST_LENGHT; i++)
    {
        var tr_body = document.createElement("tr"); tr_body.classList.add("fkayttaja");
        var td_1 = document.createElement("td"); td_1.classList.add("is-fmiddle"); td_1.innerHTML = data[i].Etunimi +" "+ data[i].Sukunimi;
        var td_2 = document.createElement("td"); td_2.classList.add("is-hmiddle"); td_2.innerHTML = data[i].Luokka;
        var td_3 = document.createElement("td"); td_3.classList.add("is-hmiddle"); td_3.innerHTML = data[i].Istumapaikka;
        var td_4 = document.createElement("td"); td_4.classList.add("is-hmiddle");
            if(data[i].Turnaus === false)
            {
                var span4 = document.createElement("span"); span4.classList.add("icon", "has-text-grey-light","tooltip");
                var span4tooltip = document.createElement("span"); span4tooltip.classList.add("tooltiptext"); span4tooltip.innerHTML = "Ei ole tiimiä";
                var i4 = document.createElement("i"); i4.classList.add("fas", "fa-users"); span4.appendChild(i4);span4.appendChild(span4tooltip); td_4.appendChild(span4);
            }
            else
            {
                var span4 = document.createElement("span"); span4.classList.add("icon", "has-text-success", "tooltip");
                var span4tooltip = document.createElement("span"); span4tooltip.classList.add("tooltiptext"); span4tooltip.innerHTML = "On Tiimi";
                var i4 = document.createElement("i"); i4.classList.add("fas", "fa-users"); span4.appendChild(i4);span4.appendChild(span4tooltip); td_4.appendChild(span4);
            }
        var td_5 = document.createElement("td"); td_5.classList.add("is-hmiddle");
            if(data[i].ExtraInfo === '' || data[i].ExtraInfo === ' ')
            {
                var span5 = document.createElement("span"); span5.classList.add("icon", "has-text-danger", "tooltip");
                var span5tooltip = document.createElement("span"); span5tooltip.classList.add("tooltiptext"); span5tooltip.innerHTML = "Ei ole lisätietoa"
                var i5 = document.createElement("i"); i5.classList.add("fas", "fa-info-circle"); span5.appendChild(i5); span5.appendChild(span5tooltip); td_5.appendChild(span5);
            }
            else
            {
                var span5 = document.createElement("span"); span5.classList.add("icon", "has-text-success", "tooltip");
                var span5tooltip = document.createElement("span"); span5tooltip.classList.add("tooltiptext"); span5tooltip.innerHTML = "On lisätietoa";
                var i5 = document.createElement("i"); i5.classList.add("fas", "fa-info-circle"); span5.appendChild(i5); span5.appendChild(span5tooltip); td_5.appendChild(span5);
            }
        var td_6 = document.createElement("td"); td_6.classList.add("is-hmiddle");
            if(data[i].Confirmed)
            {
                var span6 = document.createElement("span"); span6.classList.add("icon", "has-text-success", "tooltip");
                var span6tooltip = document.createElement("span"); span6tooltip.classList.add("tooltiptext"); span6tooltip.innerHTML = "Varmistettu";
                var i6 = document.createElement("i"); i6.classList.add("fas", "fa-check-circle"); span6.appendChild(i6);span6.appendChild(span6tooltip); td_6.appendChild(span6);
            }
            else
            {
                var span6 = document.createElement("span"); span6.classList.add("icon", "has-text-warning", "tooltip");
                var span6tooltip = document.createElement("span"); span6tooltip.classList.add("tooltiptext"); span6tooltip.innerHTML = "Ei ole varmistettu";
                var i6 = document.createElement("i"); i6.classList.add("fas", "fa-check-circle"); span6.appendChild(i6);span6.appendChild(span6tooltip); td_6.appendChild(span6);
            }
        var td_7 = document.createElement("td"); td_7.setAttribute("colspan", "3");
            if(data[i].Confirmed)
            {
                var a1 = document.createElement("a"); a1.classList.add("button", "is-success", "margin-right-5"); a1.id = "button_0_"+ i; 
                    a1.addEventListener("click", function(ev){
                        Testing(ev);
                    });
                    var a1span1 = document.createElement("span"); a1span1.classList.add("icon", "is-small");
                    var a1span1i = document.createElement("i"); a1span1i.classList.add("fas", "fa-check");
                    a1span1.appendChild(a1span1i);
                    var a1span2 = document.createElement("span"); a1span2.innerHTML = "Poista varmistus";
                    a1.appendChild(a1span1); a1.appendChild(a1span2);
            }
            else
            {
                var a1 = document.createElement("a"); a1.classList.add("button", "is-warning", "margin-right-5"); a1.innerHTML = "Varmista paikka"; a1.id = "button_0_"+ i;
                a1.addEventListener("click", function(ev){
                    Testing(ev);
                });
            }
            var a2 = document.createElement("a"); a2.classList.add("button", "is-primary", "margin-right-5"); a2.innerHTML = "Näytä tiedot"; a2.id = "button_1_"+ i;
            a2.addEventListener("click", function(ev){
                Testing(ev);
            });
            var a3 = document.createElement("a"); a3.classList.add("button", "is-info", "margin-right-5"); a3.innerHTML = "Muokkaa tietoja"; a3.id = "button_2_"+ i;
            a3.addEventListener("click", function(ev){
                Testing(ev);
            });
            var a4 = document.createElement("a"); a4.classList.add("button", "is-danger", "is-outlined"); a4.id = "button_3_"+ i;
                a4.addEventListener("click", function(ev){
                    Testing(ev);
                });
                var a4span1 = document.createElement("span"); a4span1.innerHTML = "Poista";
                var a4span2 = document.createElement("span"); a4span2.classList.add("icon", "is-small");
                var a4span2i = document.createElement("i"); a4span2i.classList.add("fas", "fa-times"); a4span2.appendChild(a4span2i);
                a4.appendChild(a4span1); a4.appendChild(a4span2);
            td_7.appendChild(a1); td_7.appendChild(a2); td_7.appendChild(a3); td_7.appendChild(a4);
        tr_body.appendChild(td_1); tr_body.appendChild(td_2); tr_body.appendChild(td_3); tr_body.appendChild(td_4); tr_body.appendChild(td_5);
        tr_body.appendChild(td_6); tr_body.appendChild(td_7);
        
        tbody.appendChild(tr_body); 
    }
    table.appendChild(tbody);
    render_target.appendChild(table);
});
}
CreateTable();


/***********************************************/
//EVENT LISTENER FOR BUTTONS IN TABLE(DELETE,EDIT tms)(GETTING THE DATA FROM ID)
/***********************************************/
function Testing(ev)
{
    $.post(ajax_kayttajat, function(data, status){
        if(ev.target.id === "")
        {
            var buttontype = (ev.target.parentNode.id).substr(7,1);
            var id = (ev.target.parentNode.id).substr(9,2);
            if(id === "")
            {
                var buttontype = ev.target.parentNode.parentNode.id.substr(7,1);
                var id = ev.target.parentNode.parentNode.id.substr(9,2);
                if(id === "" || buttontype == "")
                {
                    var id = ev.target.parentNode.parentNode.parentNode.id.substr(9,2);
                    var buttontype = ev.target.parentNode.parentNode.parentNode.id.substr(7,1);
                }
            }
            console.log(buttontype, data[id]._id, id);
            PainettuNappula(buttontype, data[id]._id, id);
        } 
        else
        {
            var buttontype = (ev.target.id).substr(7,1);
            var id = (ev.target.id).substr(9,2);
            console.log(buttontype, data[id]._id, id);
            PainettuNappula(buttontype, data[id]._id, id);
        }
    });
}


/***********************************************/
//DETECTING WHICH BUTTON IS PRESSED
/***********************************************/
function PainettuNappula(fbutton, fid)
{
    if(fbutton === "0")
    {   
        ConfirmButton(fbutton, fid);
    }
    else if(fbutton === "1")
    {
        GetData(fid);
    }
    else if(fbutton === "2")
    {
        GetEditData(fid);
    }
    else if(fbutton === "3")
    {
        SendConfirm(fbutton, fid);
    }
}


/***********************************************/
//BUTTON FUNCTIONS, VERY BAD CODE BUT WORKS
/***********************************************/
function ConfirmButton(fbutton, fid)
{
    $.ajax({
        type: "POST",
        url: ajax_confirm,
        data: {"userid": fid},
        success: function(){
            ForceRefresh();
        },
        error: function(){
            $.notify("Virhe tapahtui", "error");
        }
    });
}

function SendConfirm(fbutton, fid, rawid)
{
    OpenWarning()
    document.getElementById("fPoisto").setAttribute("onclick", "DeleteButton("+ fbutton + ", '"+ fid+ "');");
}

function DeleteButton(fbutton, fid, rawid)
{
    $.ajax({
        type: "POST",
        url: ajax_delete,
        data: {"userid": fid},
        success: function(){
            $.notify("Varaus poistettu!", "success");
            ForceRefresh();
        },
        error: function(){
            $.notify("Virhe tapahtui", "error");
        }
    });
    CloseWarning();
}

function GetData(fid)
{
    $.ajax({
        type: "POST",
        url: ajax_specificdata,
        data: {"userid": fid},
        success: function(data){
            InitInfoModal(data);
        },
        error: function(){
            $.notify("Virhe tapahtui", "error");
        }
    });
}

function GetEditData(fid)
{
    $.ajax({
        type: "POST",
        url: ajax_specificdata,
        data: {"userid": fid},
        success: function(data){
            initEditModal(data);
        },
        error: function(){
            $.notify("Virhe tapahtui", "error");
        }
    });
}


function InitInfoModal(data)
{
    document.getElementById("info_tnimi").innerHTML = "";
    document.getElementById("info_nimi").innerHTML = data.Etunimi + " " + data.Sukunimi;
    document.getElementById("info_luokka").innerHTML = data.Luokka;
    document.getElementById("info_paikka").innerHTML = data.Istumapaikka;
    if(data.Turnaus)
    {
        document.getElementById("info_tiimi").innerHTML = data.Turnaus;
        var Pelit = [data.Turnauspelit.substr(0,data.Turnauspelit.indexOf(",")), data.Turnauspelit.substr(data.Turnauspelit.indexOf(",") + 1, data.Turnaus.lenght)];
        if(Pelit[0] === 'true' && Pelit[1] === 'true')
        {
            document.getElementById("info_tpelit").innerHTML = "CSGO ja LOL";
        }
        else if(Pelit[0] === 'false' && Pelit[1] === 'true')
        {
            document.getElementById("info_tpelit").innerHTML = "LOL";
        }
        else if(Pelit[0] === 'true' && Pelit[1] === 'false')
        {
            document.getElementById("info_tpelit").innerHTML = "CSGO";
        }
        else if(Pelit[0] === 'false' && Pelit[1] === 'false')
        {
            document.getElementById("info_tpelit").innerHTML = "Ei kumpikaan";
        }
        document.getElementById("info_tnimi").innerHTML = data.Tiiminimi;
    }
    else
    {
        document.getElementById("info_tpelit").innerHTML = "";
        document.getElementById("info_tiimi").innerHTML = data.Turnaus;
    }
    document.getElementById("info_info").innerHTML = data.ExtraInfo;
    document.getElementById("info_confirmed").innerHTML = data.Confirmed;
    document.getElementById("info_aika").innerHTML = data.create_date;
    if(data.IP == undefined)
    {
        document.getElementById("info_ip").innerHTML = "";
    }
    else
    {
        document.getElementById("info_ip").innerHTML = data.IP.clientIp;
    }
    OpenInfoModal();
}

function initEditModal(data)
{
    document.getElementById("form_etunimi").value = data.Etunimi;
    document.getElementById("form_sukunimi").value = data.Sukunimi;
    document.getElementById("form_luokka").value = data.Luokka;
    document.getElementById("form_istumapaikka").value = data.Istumapaikka;
    if(data.Turnaus === false)
    {
        document.getElementById("form_turnaus_ei").checked = true;
        document.getElementById("team-form").setAttribute("style", "display:none");
    }
    else
    {
        document.getElementById("form_turnaus_kylla").checked = true;
        document.getElementById("team-form").setAttribute("style", "display:visible");
        document.getElementById("form_tiiminimi").value = data.Tiiminimi;
        var Pelit = [data.Turnauspelit.substr(0,data.Turnauspelit.indexOf(",")), data.Turnauspelit.substr(data.Turnauspelit.indexOf(",") + 1, data.Turnaus.lenght)];
        if(Pelit[0] === 'true' && Pelit[1] === 'true')
        {
            document.getElementById("form_tiimi_1").checked = true;
            document.getElementById("form_tiimi_2").checked = true;
        }
        else if(Pelit[0] === 'false' && Pelit[1] === 'true')
        {
            document.getElementById("form_tiimi_1").checked = false;
            document.getElementById("form_tiimi_2").checked = true;
        }
        else if(Pelit[0] === 'true' && Pelit[1] === 'false')
        {
            document.getElementById("form_tiimi_1").checked = true;
            document.getElementById("form_tiimi_2").checked = false;
        }
        else if(Pelit[0] === 'false' && Pelit[1] === 'false')
        {
            document.getElementById("form_tiimi_1").checked = false;
            document.getElementById("form_tiimi_2").checked = false;
        }
    }
    document.getElementById("form_info").value = data.ExtraInfo;
    document.getElementById("form_submit").setAttribute("onclick", "UpdateUser('"+data._id+"')")
    OpenEditModal();
}

function UpdateUser(fid)
{
    SendData(fid);

    CloseEditModal();
}


function SendData(fid)
{
    var check = CheckErrors();
    if(check)
    {
        if(document.getElementById("form_turnaus_ei").checked)
        {
            var SentData = 
            {
                "userid": fid,
                "nimi": document.getElementById("form_etunimi").value,
                "sukunimi": document.getElementById("form_sukunimi").value,
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
                "userid": fid,
                "nimi": document.getElementById("form_etunimi").value,
                "sukunimi": document.getElementById("form_sukunimi").value,
                "luokka": document.getElementById("form_luokka").value,
                "paikka": document.getElementById("form_istumapaikka").value,
                "turnaus": true,
                "turnausnimi": document.getElementById("form_tiiminimi").value,
                "turnauspeli": [document.getElementById("form_tiimi_1").checked, document.getElementById("form_tiimi_2").checked],
                "info": document.getElementById("form_info").value
            };
        }
        $.ajax({
            type: "POST",
            url: ajax_update,
            data: SentData,
            success: function(){
                $.notify("Varaus muutettu!", "success");
                ForceRefresh();
            },
            error: function(){
                $.notify("Server error.", "error");
            }
          });
    }
}


/***********************************************/
//CHECKING ERROR FOR EDITING DATA / ILLEGAL CHARS
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
//COPY PASTE FUNC FROM INTERNET
/***********************************************/
function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }