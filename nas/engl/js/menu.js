$(function () {
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 10) {
            $('.navbar').addClass('active');
        } else {
            $('.navbar').removeClass('active');
        }
    });
});

// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// LOGIN ===============================
// =====================================
// =====================================
// =====================================
// =====================================
let modal1 = document.getElementById('id01');


window.onclick = function (event) {
    if (event.target == modal1) {
        modal1.style.display = "none";
    }
}

// REGISTRACIJA ========================
// =====================================
// =====================================
// =====================================
// =====================================

let modal2 = document.getElementById('id02');


window.onclick = function (event) {
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
}

// ===========================================
// ===========================================
// ===========================================
// ===========================================
// ===========================================

if (!localStorage.getItem("usersEn")) {
    localStorage.setItem("usersEn", JSON.stringify(JSON.parse(dataUsers)));
}

function checkUser(username, password) {
    let users = JSON.parse(localStorage.getItem("usersEn"));
    let exists = false;
    for (let item in users) {
        if (username === users[item].username && password === users[item].password) {
            exists = true;
        }
    }

    return exists;
}

$(".odjaviSe").click(function (event) {
    localStorage.removeItem("usernameEn");
    location.href = 'home.html';
});

$("#registrujSe").click(function (event) {
    event.preventDefault();

    let userData = {};
    let un = $("#usernameReg");
    let username = un.val();
    let pwd = $("#passwordReg");
    let password = pwd.val();


    if (username === "") {
        alert("Username required.");
    }

    if (password === "") {
        alert("Password required.");
    }

    if (!checkUser(username, password)) {
        userData.username = username;
        userData.password = password;

        let users = JSON.parse(localStorage.getItem("usersEn"));
        users.push(userData);
        localStorage.setItem("usersEn", JSON.stringify(users));

        alert("Thanks for registration. \nTry to login Now");

        un.val("");
        pwd.val("");
    } else {
        alert("User already exists!");
    }
});
$("#ulogujSe").click(function (event) {
    event.preventDefault();

    let username = $("#username").val();
    let password = $("#password").val();

    if (checkUser(username, password)) {
        localStorage.removeItem("usernameEn");
        localStorage.setItem("usernameEn", username);
        location.href = 'home-user.html';
    } else {
        alert("User does not exist!");
    }
});

$(document).ready(function () {
    let text = [];
    let namirnicaID = [];
    let clicked = false;
    let prviID = "";
    let drugiID = "";
    $(".cardNamirnice").on({
        click: function () {
            if (prviID == "") {
                prviID = $(this).attr("id");
                $(".namirnicaText").html($(this).text());
                $("#descriptionNamirnice").css("display", "inherit");

                clicked = true;
                return false;
            } else {
                drugiID = $(this).attr("id");
                if (drugiID == prviID) {
                    $("#descriptionNamirnice").css("display", "none");
                    prviID = "";
                    drugiID = "";
                } else {
                    prviID = drugiID;
                    $(".namirnicaText").html($(this).text());
                    $("#descriptionNamirnice").css("display", "inherit");
                    clicked = true;

                }
                return false;
            }
        },
    });
})


