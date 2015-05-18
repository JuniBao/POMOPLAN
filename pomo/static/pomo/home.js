/**
 * Created by tongtongbao on 5/16/15.
 */

    var STATE_WORK = 1;

    var WORK_TIME;
    var BREAK_TIME;
    var TotalSeconds;

    var TimerType;

    function CreateTimer(Time, Type) {
        $("#countdown").removeAttr("onclick");

        TimerType = Type;

        Timer.onclick = false;

        TotalSeconds = Time;
        console.log(TotalSeconds);

        if(TimerType == 1) {
            $('#select-work').css("background-color","lightgrey");
            $('#select-break').css("background-color","white");
            $('#slogan').text("Focus!!!");

        } else {
            $('#select-break').css("background-color","lightgrey");
            $('#select-work').css("background-color","white");
            $('#slogan').text("Relax...");
        }
        DisplayTimer();
        setTimeout(Tick, 1000);
    }

    function DisplayTimer() {
        var Seconds = TotalSeconds;

        var Days = Math.floor(Seconds / 86400);
        Seconds -= Days * 86400;

        var Hours = Math.floor(Seconds / 3600);
        Seconds -= Hours * (3600);

        var Minutes = Math.floor(Seconds / 60);
        Seconds -= Minutes * (60);


        var TimeStr = ((Days > 0) ? Days + " days " : "") + LeadingZero(Hours) + ":" + LeadingZero(Minutes) + ":"
            + LeadingZero(Seconds)

        if(TimerType == 1) {
            console.log("work_countdown -->  " + TimeStr);
        } else {
            console.log("Relax_countdown -->  " + TimeStr);
        }

        $("#countdown").text(TimeStr);
    }


    function LeadingZero(Time) {
        return (Time < 10) ? "0" + Time : + Time;
    }

    function Tick() {
        if (TotalSeconds <= 0) {
            if(TimerType == STATE_WORK) {
                // create tag object
                create_tag();
                console.log("tagid after creating the tag object");

                // create pomo object
                // create_pomo(Tag_ID);
                // start the break timer
                CreateTimer(BREAK_TIME, 0);
            } else {
                console.log("bind click event");
                $("#countdown").click(count_begin);
            }
            return;
        }
        TotalSeconds -= 1;
        DisplayTimer();
        setTimeout(Tick, 1000);
    };

    function count_begin (){
        CreateTimer(WORK_TIME, 1);
    };

    function create_tag() {
        var tag_content = $("#tag").val();
        //console.log(tag_content);
        $.ajax({
            url: '/pomo/create_tag',
            type: 'POST',
            data: {
                content: tag_content,
                plan: 0,
                username: $.cookie('username'),
                csrfmiddlewaretoken: $.cookie('csrftoken')
            }
        }).done(function(data){
            console.log("create tag successfully");
            var tag_id = data['tag_id'];
            console.log("the id of tag I created is: " + tag_id);
            //callback(tag_id);
            create_pomo(tag_id);
        }).fail(function(data){
            console.log(data);
            return ;
        });
    };

    function create_pomo(tag_id) {
        console.log("tagid in creating pomo: " + tag_id);
        var date_split = (new Date()).toString().split(" ");
        var pomo_date = date_split[1] + ", " + date_split[2] + ", " + date_split[3];
        var pomo_time = date_split[4];
        var memo_content = $("#memo").val();

        $.ajax({
            url: '/pomo/create_pomo',
            type: 'POST',
            data: {
                pomodate:pomo_date,
                pomotime: pomo_time,
                memo: memo_content,
                tagid: tag_id,
                username: $.cookie('username'),
                csrfmiddlewaretoken: $.cookie('csrftoken')
            }
        }).done(function(data) {
            console.log("create pomo successfully");
            console.log(data);
        }).fail(function(data) {
            console.log(data);
        })
    }

    $( document ).ready(function() {
        $.ajax({
            url: '/pomo/get_user_info',
            type: 'GET',
            data: {username: $.cookie('username')}
        }).done(function(data) {
            console.log("get_user_info succeeds");
            console.log(data);
            TotalSeconds = data['worktime'];
            WORK_TIME = TotalSeconds;

            BREAK_TIME = data['breaktime'];
            Timer = $("#countdown");
            DisplayTimer();
        }).fail(function(data) {
            console.log(data);
        })
    });