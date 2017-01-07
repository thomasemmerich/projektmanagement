$(document).ready(function (event) {
    var dialogLogin, form ,logoutConfirm;
    var loginText =
        '<p class="lead">Bitte loggen Sie sich ein:</p>' +
        '<button id="loginScreen" class="btn btn-default">Login</button> ';
    checkCookie();

    function checkCookie() {
        if(Cookies.get("Login") == "true") {
            $("#container").show();
            $("#login").text("Logout");
            $("#noLogin").hide();
            $("#backlogNav").show();
            $("#sprintNav").show();
            if(Cookies.get("Role") == "admin") {
                $("#userNav").show();
            }
            else {
                $("#userNav").hide();
            }
        }
        else{
            $("#container").after("<div id='noLogin' class='noLogin center'>" + loginText + "</div>");
            $("#container").hide();
            $("#userNav").hide();
            $("#backlogNav").hide();
            $("#sprintNav").hide();
        }
    }

    dialogLogin = $( "#dialog-form" ).dialog({
        autoOpen: false,
        height: "auto",
        width: 450,
        modal: true,
        buttons: {
            "Login": function () {
                login();
            },
            "Schließen": function () {
                dialogLogin.dialog("close");
            }
        },
        close: function () {
            loginReset();
        }
    });

    logoutConfirm = $( "#dialog-logout-confirm" ).dialog({
        autoOpen: false,
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: {
            "Ja": function() {
                logout()
            },
            "Nein": function() {
                $( this ).dialog( "close" );
            }
        }
    });

    $("#login").click(function () {
        var text = $("#login").text();
        if( text == "Login") {
            dialogLogin.dialog( "open" );
        }
        else {
            //logout();
            logoutConfirm.dialog( "open" );
        }
    });

    function login() {
        var email = $("#emailLogin").val();
        var password = $("#passwordLogin").val();
        $.ajax(
            {
                type: "POST",
                url: "/users/rest/login",
                contentType: "application/json; charset=utf-8",
                dataType : 'json',
                data: JSON.stringify(
                    {
                        "email" : email,
                        "password" : password
                    }),
                statusCode: {
                    900: function (response) {
                        loginfailed();
                    },
                    910: function (response) {
                        loginsuccess("employee");
                    },
                    920: function (response) {
                        loginsuccess("scrum");
                    },
                    930: function (response) {
                        loginsuccess("admin");
                    }
                },
                success: function (data) {
                    alert(data.getResponseHeader());
                }
            }
        );
    }



    function loginsuccess(role) {
        $("#login").text("Logout");
        Cookies.set('Login', 'true');
        Cookies.set('Role', role);
        dialogLogin.dialog("close");
        checkCookie();
    }
    function loginfailed() {
        alert("Login nicht Erfolgreich");
    }
    
    function logout() {
        $("#login").text("Login");
        Cookies.remove('Login');
        Cookies.remove('Role');
        logoutConfirm.dialog("close");
        checkCookie()
    }

    $('body').on('click', '#loginScreen', function () {
        dialogLogin.dialog( "open" );
    });


    function loginReset() {
        $("#emailLogin").val("");
        $("#passwordLogin").val("");
    }
});