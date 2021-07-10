if (!localStorage.getItem("recipes")) {
    localStorage.setItem("recipes", JSON.stringify(JSON.parse(dataRecipes)));
}

if (!localStorage.getItem("ratings")) {
    localStorage.setItem("ratings", JSON.stringify(JSON.parse(dataRatings)));
}

function showMyComments() {
    let ratings = JSON.parse(localStorage.getItem("ratings"));
    let recipes = JSON.parse(localStorage.getItem("recipes"));
    let username = localStorage.getItem('username');
    for (let ratingItem in ratings) {
        for (let recipeItem in recipes) {
            if (ratings[ratingItem].recipeId == recipes[recipeItem].id && ratings[ratingItem].username == username) {
                let content = `<div class="komentar-cont">
                                <a onclick="showRecipe(${recipes[recipeItem].id});"><img src="images/${recipes[recipeItem].images[0]}" alt="${recipes[recipeItem].title}" 
                                style="width:90px; height:90px; object-fit: cover;"></a>
                                <p><span>${ratings[ratingItem].username}</span> Ocena: 
                                <span style="ratingItem:200%;color:yellow; margin-right:0px;">&starf;
                                </span>${ratings[ratingItem].rate}</p>
                                <p>${ratings[ratingItem].comment}</p>
                            </div>`;
                $(".comments").append(content);
            }
        }
    }
}

function showMyRecipes() {
    let recipes = JSON.parse(localStorage.getItem("recipes"));
    let username = localStorage.getItem('username');
    for (let recipeItem in recipes) {
        if (recipes[recipeItem].username == username) {
            let content = `<div class="col-lg-4 col-md-6  mojRecept">
                            <div class="gallery-single fix">
                                <img src="images/${recipes[recipeItem].images[0]}" class="img-fluid" alt="${recipes[recipeItem].title}">
                                    <div class="why-text">
                                        <h4>${recipes[recipeItem].title}</h4>
                                    </div>
                            </div>
                            <div style="text-align: right;">
                                <a class="obrisi" onclick="deleteRecipe(${recipes[recipeItem].id});">Obrisi</a>
                            </div>
                        </div>`;
            $(".recipes").append(content);
        }
    }
}

showMyRecipes();
showMyComments();

function deleteRecipe(id) {
    console.log(id);
    let ratings = JSON.parse(localStorage.getItem("ratings"));
    let recipes = JSON.parse(localStorage.getItem("recipes"));
    let username = localStorage.getItem("username");
    let newRecipes = [];
    let newRatings = [];
    for (let item in recipes) {
        if (id != recipes[item].id) {
            newRecipes.push(recipes[item]);
        }
    }
    for (let item in ratings) {
        if (id != ratings[item].recipeId) {
            newRatings.push(ratings[item]);
        }
    }
    localStorage.setItem("recipes", JSON.stringify(newRecipes));
    localStorage.setItem("ratings", JSON.stringify(newRatings));
    location.reload();
}

function showRecipe(id) {
    localStorage.setItem('recipeId', id);
    if (localStorage.getItem('username')==null){
    location.href = 'konkretanRecept.html';
    }else {
        location.href = 'konkretan-recept-user.html';
    }
}

function showRecipeDetail() {
    let id = localStorage.getItem('recipeId');
    if (id) {
        $('#addComment').data('id', id);
        let ratings = JSON.parse(localStorage.getItem("ratings"));
        let recipes = JSON.parse(localStorage.getItem("recipes"));
        for (let recipeItem in recipes) {
            if (id == recipes[recipeItem].id) {
                $("#recipeTime").text(`${recipes[recipeItem].time}`);
                $("#recipeTitle").text(`${recipes[recipeItem].title}`);
                $("#recipeContent").html(`${recipes[recipeItem].content}`);
                $("#recipeVideo").attr("src", recipes[recipeItem].video);
                $("#img1").attr("src", "images/" + recipes[recipeItem].images[0]);
                $("#img2").attr("src", "images/" + recipes[recipeItem].images[1]);
                $("#img3").attr("src", "images/" + recipes[recipeItem].images[2]);
                $("#img4").attr("src", "images/" + recipes[recipeItem].images[3]);
                $("#img5").attr("src", "images/" + recipes[recipeItem].images[4]);
            }
        }
        let counter = 0;
        let rates = 0;
        for (let ratingItem in ratings) {
            if (id == ratings[ratingItem].recipeId) {
                counter++;
                rates += parseInt(ratings[ratingItem].rate);
                let comment = `<div class="komentar-cont">
                                <img src="images/avatarTrans.png" alt="Avatar" style="width:90px">
                                <p><span>${ratings[ratingItem].username}</span> Ocena: <span
                                        style="font-size:200%;color:yellow; margin-right:0px;">&starf;</span>
                                    ${ratings[ratingItem].rate}</p>
                                <p>${ratings[ratingItem].comment}</p>
                            </div>`;
                $(".recipeComments").append(comment);
            }
        }
        let avg = rates / counter;
        if (rates == 0 || counter == 0) {
            avg = 0;
        }
        $("#recipeRate").text(`${avg}`);
    }
}

showRecipeDetail();

function addRecipe() {
    let recipeData = {};
    let recipes = JSON.parse(localStorage.getItem("recipes"));
    recipeData.id = recipes.length + 1;
    recipeData.username = localStorage.getItem('username');
    recipeData.category = $("#kategorijaRecepta").find(":selected").text();
    recipeData.type = $('input[name="typeRecipe"]:checked').val();
    recipeData.title = $("#titleRecipe").val();
    recipeData.time = $("#timeRecipe").val();
    recipeData.content = $("#contentRecipe").val();
    recipeData.video = $("#videoRecipe").val();
    let img1 = $("#fileInput1").val().split("\\")[2];
    let img2 = $("#fileInput2").val().split("\\")[2];
    let img3 = $("#fileInput3").val().split("\\")[2];
    let img4 = $("#fileInput4").val().split("\\")[2];
    let img5 = $("#fileInput5").val().split("\\")[2];
    recipeData.images = [img1, img2, img3, img4, img5];

    recipes.push(recipeData);
    localStorage.setItem("recipes", JSON.stringify(recipes));
}

function addRating(id) {
    if (localStorage.getItem("username")) {
        let ratingData = {};
        ratingData.recipeId = id;
        ratingData.rate = $('input[name="rating1"]:checked').val();
        ratingData.comment = $("#commentText").val();
        ratingData.username = localStorage.getItem("username");

        let ratings = JSON.parse(localStorage.getItem("ratings"));
        ratings.push(ratingData);
        localStorage.setItem("ratings", JSON.stringify(ratings));
    } else {
        alert("You must be logged in!");
    }
}

$("#addComment").click(function (event) {
    event.preventDefault();
    addRating($(this).data('id'));
    location.reload();
});

$("#addRecipe").click(function (event) {
    event.preventDefault();
    addRecipe();
    location.reload();
});

$("#biftekNaZaru").click(function (event) {
    event.preventDefault();
    addRecipe();
    location.reload();
});

function showRecipes() {
    $("#mySearch").val("");
    let recipes = JSON.parse(localStorage.getItem("recipes"));
    $(".recipesContent").html('');
    for (let recipeItem in recipes) {
        let content = `<a onclick="showRecipe(${recipes[recipeItem].id});"><div class="col-lg-4 col-md-6 special-grid ">
                                            <div class="gallery-single fix">
                                                <img src="images/${recipes[recipeItem].images[0]}" class="img-fluid" alt="${recipes[recipeItem].title}">
                                                <div class="why-text">
                                        <h4>${recipes[recipeItem].title}</h4>\                                               </div>
                                            </div>
                                        </div></a>`;
        $(".recipesContent").append(content);
    }
}

function showRecipesCategory(category) {
    $("#mySearch").val("");
    let recipes = JSON.parse(localStorage.getItem("recipes"));
    $(".recipesContent").html('');
    for (let recipeItem in recipes) {
        if (category == recipes[recipeItem].category) {
            let content = `<a onclick="showRecipe(${recipes[recipeItem].id});"><div class="col-lg-4 col-md-6 special-grid ">
                                             <div class="gallery-single fix">
                                                 <img src="images/${recipes[recipeItem].images[0]}" class="img-fluid" alt="${recipes[recipeItem].title}">
                                                <div class="why-text">
                                         <h4>${recipes[recipeItem].title}</h4>\                                               </div>
                                             </div>
                                         </div></a>`;
            $(".recipesContent").append(content);
        }
    }
}

function showRecipesType(type) {
    let recipes = JSON.parse(localStorage.getItem("recipes"));
    $(".recipesContent").html('');
    for (let recipeItem in recipes) {
        if (type == recipes[recipeItem].type.toLowerCase()) {
            let content = `<a onclick="showRecipe(${recipes[recipeItem].id});"><div class="col-lg-4 col-md-6 special-grid ">
                                             <div class="gallery-single fix">
                                                 <img src="images/${recipes[recipeItem].images[0]}" class="img-fluid" alt="${recipes[recipeItem].title}">
                                                <div class="why-text">
                                         <h4>${recipes[recipeItem].title}</h4>\                                               </div>
                                             </div>
                                         </div></a>`;
            $(".recipesContent").append(content);
        }
    }
}

showRecipes();

$("#search").click(function () {
    let keyword = $("#mySearch").val().toLowerCase();
    if (keyword == 'lako' || keyword == 'srednje' || keyword == 'teško') {
        showRecipesType(keyword);
    } else {
        let recipes = JSON.parse(localStorage.getItem("recipes"));
        $(".recipesContent").html('');
        for (let recipeItem in recipes) {
            let title = recipes[recipeItem].title;
            let content = recipes[recipeItem].content;
            if (title != undefined && content != undefined) {
                if (title.includes(keyword) || content.includes(keyword)) {
                    let content = `<a onclick="showRecipe(${recipes[recipeItem].id});"><div class="col-lg-4 col-md-6 special-grid ">
                                             <div class="gallery-single fix">
                                                 <img src="images/${recipes[recipeItem].images[0]}" class="img-fluid" alt="${recipes[recipeItem].title}">
                                                <div class="why-text">
                                         <h4>${recipes[recipeItem].title}</h4>\                                               </div>
                                             </div>
                                         </div></a>`;
                    $(".recipesContent").append(content);
                }
            }
        }
    }
});

function getRecipes() {
    let recipes = JSON.parse(localStorage.getItem("recipes"));
    let numbers = [];
    for (let i = 0; i < recipes.length; i++) {
        let number = Math.floor(Math.random() * recipes.length);
        if (number > 0) {
            numbers.push(number);
        }
    }
    let counter = 0;
    for (let recipeItem in recipes) {
        counter++;
        if (counter <= 3) {
            for (let i = 0; i < numbers.length; i++) {
                if (numbers[i] == recipes[recipeItem].id) {
                    $(`#indexImg${counter}`).attr("src", "images/" + recipes[recipeItem].images[0]);
                    $(`#indexTitle${counter}`).text(recipes[recipeItem].title);
                    $(`#indexTime${counter}`).text(recipes[recipeItem].time);
                }
            }
        }
    }
}

getRecipes();

function genPDF() {
	
	var doc = new jsPDF();
	
    var specialElementHandlers = {
        '#hidediv' : function(element,render) {return true;}
    };
    
    doc.fromHTML($('.testdiv').get(0), 20,20,{
                 'width':500,
        		'elementHandlers': specialElementHandlers
    });
    doc.fromHTML($('.testdiv').get(1), 20,30,{
        'width':500,
       'elementHandlers': specialElementHandlers
    });
       doc.fromHTML($('.testdiv').get(2), 20,0,{
        'width':500,
       'elementHandlers': specialElementHandlers
    });
	
	doc.save('Test.pdf');
	
}