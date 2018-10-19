/***********************************************/
//API REQUEST VARS
/***********************************************/
var IP =  window.location.protocol +"//"+ window.location.host;
var ajax_infoupdate = IP+"/api/article/update";
var ajax_timetableupdate = IP+"/api/timetable/update";
var ajax_kiltaupdate = IP+'/api/article/kilta/update';

var ajax_kilta = IP+"/api/article/kilta";
var ajax_info = IP+"/api/article";
var ajax_timetable = IP+"/api/timetable"

var ajax_getpaik = IP+"/api/kayttajacontrol";
var ajax_reqpaik = IP+"/api/istumapaikka";

var ajax_logout = IP+"/api/login/logout";
var ajax_login = IP+"/api/login";

var ajax_kayttajat = IP+"/api/kayttajat"
var ajax_confirm = IP+"/api/kayttajat/confirm/"
var ajax_delete = IP+"/api/kayttajat/remove/";
var ajax_update = IP+"/api/kayttajat/update/";
var ajax_specificdata = IP+"/api/kayttajat/specific/";

var ajax_music = IP+"/json/song-data.json";
var ajax_player_play = IP+"/api/youtubelist/play";
var ajax_player_pause = IP+"/api/youtubelist/pause";
var ajax_player_refresh = IP+"/api/youtubelist/refresh";
var ajax_player_skip = IP+"/api/youtubelist/skip";
var ajax_player_bump = IP+"/api/youtubelist/bump";
var ajax_player_delete = IP+"/api/youtubelist/delete";
