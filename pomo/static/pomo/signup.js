/**
 * Created by tongtongbao on 5/16/15.
 */


    function signup() {
        var name = $("#login_name")[0].value;
        var password = $("#password")[0].value;

        if(isEmpty(name) || isEmpty(password)) {

            adAlert("Fill in both username and password")
            $("#login_name").val("");
            $("#password").val("");
        } else {
            var encryp_password = CryptoJS.MD5(password, {outputlength:512}).toString()

            $.ajax({
                url: '/pomo/signup',
                type: 'POST',
                data: {username: name, password: encryp_password, csrfmiddlewaretoken: $.cookie('csrftoken')}
            }).done(function (data) {

                console.log("succeed");
                console.log(data);

                if(data['existed']) {
                    adAlert("Username Already Existed!")
                } else {
                    addCookie(name, encryp_password);
                    window.location = "/pomo/home";
                }
            }).fail(function (err) {
                console.log("failed")
                console.log(err);
            });
        }
    };