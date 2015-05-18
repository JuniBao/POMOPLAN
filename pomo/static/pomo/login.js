/**
* Created by tongtongbao on 5/16/15.
*/

$( document ).ready(function() {
    if(checkCookie()) {
        window.location = ('/pomo/home');
    } else {
    }
});

function login() {
    var name = $("#login_name")[0].value;
    var password = $("#password")[0].value;

    if(isEmpty(name) || isEmpty(password)) {

        adAlert("Fill in both username and password")
        $("#login_name").val("");
        $("#password").val("");
    } else {
        var encryp_password = CryptoJS.MD5(password, {outputlength:512}).toString()

        $.ajax({
            url: '/pomo/login_validation',
            type: 'GET',
            data: {username: name, password: encryp_password}
        }).done(function (data) {

            if(data['existed']){
                if(data['valid']) {
                    addCookie(name, encryp_password);
                    window.location = "/pomo/home";
                } else {
                    adAlert("Invalid Password!");
                }
            } else {
                adAlert("Invalid Username! New User? SIGN UP!")
            }
        }).fail(function (err) {
            console.log(err);
        });
    }
};