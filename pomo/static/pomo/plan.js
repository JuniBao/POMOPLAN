/**
 * Created by tongtongbao on 5/17/15.
 */

$(document).ready(function() {
    //console.log($.cookie('username'));
    $.ajax({
        url: '/pomo/plan_data?username=' + $.cookie('username'),
        type: 'GET'
    }).done(function(data) {
        $("#plan_table tbody tr").remove();
        data["tags"].forEach(function (tag) {
            console.log(tag);
            $("#plan_table tbody").append(
                "<tr><td>" + tag.content + "</td>" + "<td>1</td>" +
                "<td>" + tag.plan + "</td></tr>"
            );
        });
    }).fail(function(data) {
        console.log(data);
    });
});