/**
 * Created by tongtongbao on 5/16/15.
 */

function authenticate() {
    if (checkCookie()) {
        return true;
    } else {
        window.location = '/pomo/login';
    }
};

function onclick_logout() {
    removeCookie();
}

authenticate();

