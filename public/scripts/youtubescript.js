/***********************************************/
//URL LISTENER
/***********************************************/
var YoutubeButtonQ = document.getElementById("buttonQAct")
YoutubeButtonQ.addEventListener("click", function(){
    YoutubeButtonQ.classList.add("is-loading");
    YoutubeInit();
});


/***********************************************/
//FUNCTION INIT - SENDING SONG REQUEST
/***********************************************/
function YoutubeInit()
{
    var Url = document.getElementById("youtubeurl").value;
    if(ValidURL(Url))
    {
        var pID = youtube_parser(Url);
        $.ajax({
            type: "POST",
            url: ajax_youtube,
            data: {"youtubeId": pID},
            success: function(obj){
                YoutubeButtonQ.classList.remove("is-loading");
                fDisplayReq(obj);
            },
            error: function(){
                $.notify("Server API error. Olet joko lähettänyt liian monta pyyntöä tai serveri on ohjelmoitu huonosti :)", "error");
                YoutubeButtonQ.classList.remove("is-loading");
            }
        });
    }
    else
    {
        $.notify("Virhe! Laatikossa ei ole linkkiä.", "error");
        YoutubeButtonQ.classList.remove("is-loading");
    }
}


/***********************************************/
//DISPLAY INIT
/***********************************************/
function fDisplayReq(fObj)
{
    $.notify("Ehdotus lähetetty! "+ fObj.yt_title, "success");
    $( "#outputid" ).slideDown( "slow", function() {
        document.getElementById("youtubeurl").value = "";
        setTimeout(function(){ 
            $( "#outputid" ).slideUp( "slow", function() {
            });
         }, 5000);
    });
    document.getElementById("yt_otsikko").textContent = fObj.yt_title;
    document.getElementById("yt_img").setAttribute("src", fObj.yt_thumbnail);
    document.getElementById("yt_url").textContent = fObj.yt_url;
    document.getElementById("yt_omistaja").textContent = fObj.yt_owner;
    document.getElementById("yt_kesto").textContent = fObj.yt_duration + "s";
}


/***********************************************/
//REGEXP URL PARSE
/***********************************************/
function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

function ValidURL(str) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if(!regex .test(str)) {
      return false;
    } else {
      return true;
    }
}