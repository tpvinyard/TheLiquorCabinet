$(document).ready(function() {
  let returnedDrinks = [];
  let returnedDetails = [];
  let returnedDrinksArray;
  let searchValue = "";
  // for testing purposes
  let additionalIngredientsArray = [];
  let YouTubeLink = '';
  let count = 0;

  $(function () {
    $('#main-form').parsley().on('form:submit', function() {
      clearSearch();
      return false;
    });
  });
  
 
  $("#submit-button").on("click", function() {

    let inputAlcohol = $("#searchAlcohol").val();

    let ingredientArrayToText = additionalIngredientsArray.join(",");

    if (!inputAlcohol == "") {
      ingredientArrayToText = "," + ingredientArrayToText;
    }

    let queryURL = "https://www.thecocktaildb.com/api/json/v2/8673533/filter.php?i=" + inputAlcohol + ingredientArrayToText;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
    console.log(queryURL);
    returnedDrinks = response;
    returnedDrinksArray = getDrinkIDArray(returnedDrinks);
    if(returnedDrinks.drinks == "None Found") {
      $('#drink-page').html('<h1>No results</h1>');
    }
    console.log(returnedDrinks)
    for (let i = 0; i < returnedDrinksArray.length; i++) {
        let queryDrinksUrl = "https://www.thecocktaildb.com/api/json/v2/8673533/lookup.php?i=" + returnedDrinksArray[i];
                $.ajax({
                    url: queryDrinksUrl,
                    method: "GET"
                })
                .then(function(response){
                    returnedDetails.push(response);
                    loadResults(count);
                    count++;
                    
                     //returns full array for parsing ingredients
                })
            }
        });
        $('#results-container').empty();
        $('#drink-page').empty();
      });
 
  
    function getDrinkIDArray(response) {
        let drinkIDArray = [];
        for (let i = 0; i < response.drinks.length; i++) {
            drinkIDArray.push(response.drinks[i].idDrink);
        }
        return drinkIDArray;
    }


  function addIngredient() {
    let additionalIngredients = $("<button>");
    additionalIngredients.text(searchValue);
    additionalIngredients.attr("class", "ingredient");
    additionalIngredients.addClass("btn");
    additionalIngredients.addClass("btn-secondary");
    additionalIngredients.addClass("ingredient-button");
    additionalIngredientsArray.push(searchValue);
    $("#ingredientContainer").append(additionalIngredients);
    
  }

    $("#add-ingredients").on("click", function() { 
      searchValue = $("#searchAlcohol")
        .val()
        .trim();

      if (!searchValue == "") {
        addIngredient();

      }

      updateLocalStorage();
    });
    
    $(document).on('click', '.ingredient', function(){
        event.preventDefault();
        additionalIngredientsArray.splice(additionalIngredientsArray.indexOf($(this).text()), 1);
        $(this).remove();
        console.log(additionalIngredientsArray);

        updateLocalStorage();
    })

    function clearSearch() {
        $('#searchAlcohol').val('');
    }

    function updateLocalStorage() {
        let stringAdditionalIngredientsArray = JSON.stringify(additionalIngredientsArray);
        localStorage.setItem('userIngredientArray', stringAdditionalIngredientsArray);
    }

    function parseIngredient(selectedDrink) {
      let ingredientArray = []; //make this global once merged
      for (let i = 0; i < 14; i++) { //API returns a fixed 15 ingredients for every drink
        if (selectedDrink.drinks[0][`strIngredient${i}`] !== " ") {
          
          let tempIngredient = selectedDrink.drinks[0][`strIngredient${i}`];
          ingredientArray.push(tempIngredient);
        }
      }
      ingredientArray = jQuery.grep(ingredientArray, function (n) { return (n); }); //trims empty fields from array
      
      return ingredientArray;
  }
  
  function parseMeasurement(selectedDrink) {
      let measurementArray = []; //make this global once merged
      for (let i = 0; i < 14; i++) { //API returns a fixed 15 ingredients for every drink
        if (selectedDrink.drinks[0][`strMeasure${i}`] !== " ") {
          let tempMeasurement = selectedDrink.drinks[0][`strMeasure${i}`];
          measurementArray.push(tempMeasurement);
        }
      }
      measurementArray = jQuery.grep(measurementArray, function (n) { return (n); }); //trims empty fields from array
      return measurementArray;
  }
    
    function drinkDetailDOM(selectedDrink, ingredients, measurements){ //ingredients and measurements are arrays
        const newIng = $("<div class='ingredients'>");
        const newMes = $("<div class='measurements'>");
        const newPic = $("<a>");
        let id = selectedDrink.drinks.idDrink; // assign responses to respective variables
        let name = selectedDrink.drinks.strDrink;
        let category = selectedDrink.drinks.strCategory;
        let instructions = selectedDrink.drinks.strInstructions;
        let picURL = selectedDrink.drinks.strDrinkThumb; //API returns URL to picture     
        for (let i=0; i< ingredients.length; i++){  // loop through corrected length ingredient array
            newIng.append(ingredients[i]);
            newMes.append(measurements[i]);
        }
        newPic.attr("href", picURL); //appends href attribute to "a" tag
        $(".drinks").append(name); // push divs to DOM
        $(".drinks").append(id);
        $(".drinks").append(category);
        $(".drinks").append(instructions);
        $(".drinks").append(newIng);
        $(".drinks").append(newMes);
        $(".drinks").append(newPic);
    }
       

    $(searchValue).empty();

    
    function loadResults(n) {
      let newCard = $('<div>');
      newCard.addClass('card');
      newCard.attr('style', 'width: 18rem;');
      newCard.addClass('bg-light');
      newCard.addClass('float-left');
      let fullObjectData = JSON.stringify(returnedDetails[n]);
      newCard.attr('data-object', fullObjectData);
      let drinkTitle = $('<h4>');
      let drinkIngredients = $('<p>');
      let drinkImage = $('<img>');
      drinkTitle.addClass('card-title').text(returnedDetails[n].drinks[0].strDrink);
      drinkTitle.addClass('text-center');
      drinkIngredients.addClass('card-text').text(returnedDetails[n].drinks[0].strIngredient1 + ', ' + returnedDetails[n].drinks[0].strIngredient2 + ', ' + returnedDetails[n].drinks[0].strIngredient3);
      drinkImage.addClass('card-img-top').attr('src', returnedDetails[n].drinks[0].strDrinkThumb);
      drinkIngredients.addClass('text-center');
      newCard.append(drinkImage);
      newCard.append(drinkTitle);
      newCard.append(drinkIngredients);

      $('#results-container').append(newCard);
        let cocktailNameFormatted = returnedDetails[n].drinks[0].strDrink.split(' ').join('+');
        let youtubeURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + cocktailNameFormatted + '+cocktail&key=AIzaSyCjQwnb9DvJGTtKqWC01knY7JqSiW-mu1M';
          $.ajax({
            url: youtubeURL,
            method: 'GET'
          }).then(function(response){
            YouTubeLink = response.items[0].id.videoId;
            newCard.attr('data-video', ('https://www.youtube.com/embed/' + YouTubeLink));
          })


    }

    $(document).on('click', '.card', function() {
      let objectData = $(this).data('object');
      let videoSrc = $(this).data('video');

      console.log(objectData);
      
      let resultCard = $('<div class="card">');

      $('#results-container').empty();
      let title = $('<h1>');
      let ingredients = $('<p>Ingredients: </p>');
      let measures = $('<p>Measurements: </p>');
      let instructions = $('<p>Mixing Instructions:');
      let images = $('<img>');
      let video = $('<div>');
      video.html(`<iframe width="560" height="315" src="${videoSrc}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`)
      instructions.text(objectData.drinks[0].strInstructions); //Instructions added 18Sep Kirk
      instructions.addClass('offset-md-3 col-md-6');
      instructions.attr('style', 'clear: both;');
      title.text(objectData.drinks[0].strDrink);
      title.addClass('title-detail');
      images.attr('src', objectData.drinks[0].strDrinkThumb);
      images.attr('height', '350px').attr('width', '350px').attr('style', 'margin-bottom: 15px;');
      let ingredientArray = parseIngredient(objectData);
      ingredients.text(ingredientArray);
      let measurementArray = parseMeasurement(objectData);
      measures.text(measurementArray);
      
      $('#drink-page').append(title);
      let list = $('<div style= "text-align: center;">');
      let left = $('<div style="display: inline-block; text-align: left; width: 35%;">');
      let right = $('<div style="display: inline-block; text-align: left; width: 15%;">');
      left.append('<ul>');
      right.append('<ul>');
      for (i = 0; i < ingredientArray.length; i++) {
        left.append('<li>' + ingredientArray[i] + '</li>');
        right.append('<li>' + measurementArray[i] + '</li>');
      }
      left.append('</ul>');
      right.append('</ul>');
      left.append('</div>');
      right.append('</div>');
      // left.addClass('offset-md-3 col-md-6');
      // right.addClass('offset-md-3 col-md-6');
      list.append(left);
      list.append(right);
      $('#drink-page').append(list);
      $('#drink-page').append('<br>');
      // $('#drink-page').append(ingredients);
      // $('#drink-page').append(measures);
      $('#drink-page').append(instructions);
      $('#drink-page').append(images);
      $('#drink-page').append(video);
    })
  });