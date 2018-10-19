/***********************************************/
//MUSIC REQUEST TABLE RENDER
/***********************************************/
function CreateMusicTable()
{
    $.getJSON(ajax_music, function(data) {
    var render_target = document.getElementById("music-render");
    var MUSIC_LIST_LENGHT = data.push();

    var mtable =  document.createElement("table"); mtable.classList.add("table", "is-bordered", "is-striped", "is-narrow", "is-hoverable", "is-fullwidth"); mtable.id="mtable"
    var tmhead = document.createElement("thead"); tmhead.classList.add("fTabbleHead");
    var trm_head = document.createElement("tr");
    var thm2_1 = document.createElement("th"); thm2_1.innerHTML = "Index";
    var thm2_2 = document.createElement("th"); thm2_2.innerHTML = "Nimi";
    var thm2_3 = document.createElement("th"); thm2_3.innerHTML = "Tekijä";
    var thm2_4 = document.createElement("th"); thm2_4.innerHTML = "Pituus";
    var thm2_5 = document.createElement("th"); thm2_5.innerHTML = "Linkki";
    var thm2_6 = document.createElement("th"); thm2_6.innerHTML = "Poista";
    var thm2_7 = document.createElement("th"); thm2_7.innerHTML = "Kärkeen";
    trm_head.appendChild(thm2_1); trm_head.appendChild(thm2_2); trm_head.appendChild(thm2_3); trm_head.appendChild(thm2_4); trm_head.appendChild(thm2_5); trm_head.appendChild(thm2_6); trm_head.appendChild(thm2_7);
    tmhead.appendChild(trm_head);
    mtable.appendChild(tmhead);
    var tmbody = document.createElement("tbody");
    for(var i = 0; i < MUSIC_LIST_LENGHT; i++)
    {
        var trm_body = document.createElement("tr"); trm_body.classList.add("fmusiikki");
        var td2_1 = document.createElement("td"); td2_1.innerHTML = i; td2_1.classList.add("is-hmiddle")
        var td2_2 = document.createElement("td"); td2_2.innerHTML = data[i].yt_title; td2_2.classList.add("is-fmiddle");
        var td2_3 = document.createElement("td"); td2_3.innerHTML = data[i].yt_owner; td2_3.classList.add("is-fmiddle");
        var td2_4 = document.createElement("td"); td2_4.innerHTML = data[i].yt_duration; td2_4.classList.add("is-fmiddle");
        var td2_5 = document.createElement("td"); td2_5.classList.add("is-hmiddle");
        var td2_5_a = document.createElement("a"); td2_5_a.setAttribute("href", data[i].yt_url); td2_5_a.setAttribute("target", "_blank"); 
        var td2_5_ai = document.createElement("i"); td2_5_ai.classList.add("fas", "fa-link");td2_5_ai.classList.add("icenter"); td2_5_a.append(td2_5_ai); td2_5.appendChild(td2_5_a);
        var td2_6 = document.createElement("td");
        var td2_6_check = document.createElement("input"); td2_6_check.setAttribute("type", "checkbox"); td2_6.classList.add("is-hmiddle"); td2_6_check.classList.add("fcenter", "deletecheck");td2_6_check.id=data[i].yt_id; td2_6.appendChild(td2_6_check);
        var td2_7 = document.createElement("td"); td2_7.classList.add("is-hmiddle");
        var td2_7_a = document.createElement("a"); td2_7_a.classList.add("button"); td2_7_a.setAttribute("onclick", "music_bump('"+data[i].yt_id+"');");td2_7_a.innerHTML="BUMP"; td2_7.appendChild(td2_7_a);
        trm_body.appendChild(td2_1); trm_body.appendChild(td2_2); trm_body.appendChild(td2_3); trm_body.appendChild(td2_4); trm_body.appendChild(td2_5);
        trm_body.appendChild(td2_6); trm_body.appendChild(td2_7);
        
        tmbody.appendChild(trm_body); 
    }
    mtable.appendChild(tmbody);
    render_target.appendChild(mtable);
});
}
CreateMusicTable();

/*********************************/
//EVENT LISTENERS
/*********************************/
document.getElementById("function-music-force-refresh").addEventListener("click", function(){ ForceMusicRefresh(); });
document.getElementById("function-music-open").addEventListener("click", function(){ setTimeout(ForceMusicRefresh, 1000); });
document.getElementById("function-music-delete").addEventListener("click", function(){ DeleteSongs(); });
document.getElementById("music_play").addEventListener("click", function(){ Player_Play(); });
document.getElementById("music_pause").addEventListener("click", function(){ Player_Pause(); });
document.getElementById("music_refresh").addEventListener("click", function(){ Player_Refresh(); });
document.getElementById("music_skip").addEventListener("click", function(){ Player_Skip(); });




/*********************************/
//BUTTON FUNCTIONS
/*********************************/
function ForceMusicRefresh()
{
    var melement = document.getElementById("mtable");
    melement.remove();
    CreateMusicTable();
}

function music_bump(MUSIC_ID)
{
    $.ajax({
        type: "POST",
        data: {ytid: MUSIC_ID},
        url: ajax_player_bump,
        success: function(res){
            setTimeout(ForceMusicRefresh, 200);
            $.notify("Valittu biisi tulee seuraavaksi.", "success");
        },
        error: function(){
            $.notify("Error", "error");
        }
    });
}

function DeleteSongs()
{
    var DeleteChoose = document.getElementsByClassName("deletecheck");
    var ChosenOnes = [];
    for(var i = 0; i < DeleteChoose.length; i++)
    {
        if(DeleteChoose[i].checked)
        {
            ChosenOnes.push(DeleteChoose[i].id)
        }
    }    
    if(ChosenOnes.length === 0)
    {
        $.notify("Et ole valinnut mitään poistettavaksi", "error");
    }
    else if(ChosenOnes.length === DeleteChoose.length)
    {
        $.notify("Et voi poistaa kaikkia biisejä", "error");
    }
    else
    {
        var m_del = document.getElementById("function-music-delete");
        m_del.classList.add("is-loading");
        $.ajax({
            type: "POST",
            data: {ChDel: ChosenOnes},
            url: ajax_player_delete,
            success: function(res){
                m_del.classList.remove("is-loading");
                setTimeout(ForceMusicRefresh, 200);
                $.notify("Valitut biisit on poistettu", "success");
            },
            error: function(){
                m_del.classList.remove("is-loading");
                $.notify("Error", "error");
            }
        });
    }

}

function Player_Play()
{
    var m_play = document.getElementById("music_play");
    m_play.classList.add("is-loading");
    $.ajax({
        type: "POST",
        url: ajax_player_play,
        success: function(res){
            m_play.classList.remove("is-loading");
            $.notify("Musiikki käynnistetty.", "success");
        },
        error: function(){
            m_play.classList.remove("is-loading");
            $.notify("Error", "error");
        }
    });
}

function Player_Pause()
{
    var m_pause = document.getElementById("music_pause");
    m_pause.classList.add("is-loading");
    $.ajax({
        type: "POST",
        url: ajax_player_pause,
        success: function(res){
            m_pause.classList.remove("is-loading");
            $.notify("Musiikki pysäytetty.", "success");
        },
        error: function(){
            m_pause.classList.remove("is-loading");
            $.notify("Error", "error");
        }
    });
}

function Player_Refresh()
{
    var m_refresh = document.getElementById("music_refresh");
    m_refresh.classList.add("is-loading");
    $.ajax({
        type: "POST",
        url: ajax_player_refresh,
        success: function(res){
            m_refresh.classList.remove("is-loading");
            setTimeout(ForceMusicRefresh, 1000);
            $.notify("Media-player päivitetty lokaalisti", "success");
        },
        error: function(){
            m_refresh.classList.remove("is-loading");
            $.notify("Error", "error");
        }
    });
}

function Player_Skip()
{
    var m_skip = document.getElementById("music_skip");
    m_skip.classList.add("is-loading");
    $.ajax({
        type: "POST",
        url: ajax_player_skip,
        success: function(res){
            m_skip.classList.remove("is-loading");
            setTimeout(ForceMusicRefresh, 200);
            $.notify("Musiikki ohitettu", "success");
        },
        error: function(){
            m_skip.classList.remove("is-loading");
            $.notify("Error", "error");
        }
    });
}

/***********************************************/
//TABLE SEARCH / COPY/PASTE FROM INTERNET
/***********************************************/
function searchMusicTable() {
    var input, filter, found, table, tr, td, i, j;
    input = document.getElementById("music-search");
    filter = input.value.toUpperCase();
    table = document.getElementById("mtable");
    tr = table.getElementsByClassName("fmusiikki");
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

