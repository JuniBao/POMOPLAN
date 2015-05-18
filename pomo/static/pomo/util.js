/**
* Created by tongtongbao on 5/16/15.
*/
function isEmpty(val){
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}

function adAlert(text) {
    // console.log(text);
    console.log($("#error_message"));
    var a = $("#error_message")[0];
    console.log(a);
    $("#error_message")[0].innerText = text;
    $("#error_message")[0].style.visibility = "visible";
    //document.getElementById("error_message").style.visibility = "visible";
    setTimeout(function() {document.getElementById('error_message').style.visibility = "hidden";},2000);
}


function addCookie(username, password) {
    $.cookie("username", username, { expires: 7, path: '/pomo'});
    $.cookie("password", password, { expires: 7, path: '/pomo'});
}

function removeCookie() {
    $.removeCookie("username");
    $.removeCookie("password");
}

function checkCookie() {
    if ($.cookie('username') && $.cookie("password")) {
        // TODO: there is bug here. We need to check whether
        // password match username by querying the database
        return true;
    } else {
        return false;
    }
};

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};

