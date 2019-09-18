$(document).ready(function() {
  let returnedDrinks = [];
  let returnedDetails = [];
  let returnedDrinksArray;
  let searchValue = "";
  // for testing purposes
  let additionalIngredientsArray = [];
  let count = 0;
  let YouTubeLink = [];
  

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
    console.log(returnedDrinks)
    for (let i = 0; i < returnedDrinksArray.length; i++) {
        let queryDrinksUrl = "https://www.thecocktaildb.com/api/json/v2/8673533/lookup.php?i=" + returnedDrinksArray[i];
                $.ajax({
                    url: queryDrinksUrl,
                    method: "GET"
                })
                .then(function(response){
                    returnedDetails.push(response);
                    returnYouTubeLink('margarita');
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
    additionalIngredientsArray.push(searchValue);
    $("#ingredientContainer").append(additionalIngredients);
    
  }

    $("#add-ingredients").on("click", function() {   
      searchValue = $("#searchAlcohol")
        .val()
        .trim();

      if (!searchValue == "") {
        addIngredient();
        clearSearch();
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
           
            ingredientArray.push(tempIngredient);
        }
        ingredientArray = jQuery.grep(arr, function (n) { return (n); }); //trims empty fields from array
        return ingredientArray;
    }
    
    function parseMeasurement(selectedDrink) {
        let measurementArray = []; //make this global once merged
        for (let i = 0; i < 14; i++) { //API returns a fixed 15 ingredients for every drink
            let tempMeasurement = selectedDrink.drinks.strMeasure[i];
            measurementArray.push(tempMeasurement);
        }
        measurementArray = jQuery.grep(arr, function (n) { return (n); }); //trims empty fields from array
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

    function returnYouTubeLink(drinkName) {
      let cocktailName = drinkName;
      let cocktailNameFormatted = cocktailName.split(' ').join('+');
      let youtubeURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + cocktailNameFormatted + '&order=viewCount&type=video&videoEmbeddable=true&key=AIzaSyAsSIrxTBBk81EiuwwXluOFKR6_xNKm--A';
      $.ajax({
        url: youtubeURL,
        method: 'GET'
      }).then(function(response){
        // console.log(youtubeURL);
        // console.log(response);
        // console.log(response.items[0].id.videoId);
        // console.log('www.youtube.com/watch?v=' + response.items[0].id.videoId);
        YouTubeLink.push(response.items[0].id.videoId);
      })
    };

    

    function loadResults(n) {
        //returnYouTubeLink('margarita');
        console.log(YouTubeLink);
        let newCard = $('<div>');
        newCard.addClass('card');
        newCard.attr('style', 'width: 18rem;');
        newCard.addClass('bg-light');
        newCard.addClass('float-left');
        let drinkTitle = $('<h3>');
        let drinkIngredients = $('<p>');
        let drinkImage = $('<img>');
        drinkTitle.addClass('card-title').text(returnedDetails[n].drinks[0].strDrink);
        drinkIngredients.addClass('card-text').text(returnedDetails[n].drinks[0].strIngredient1 + ', ' + returnedDetails[n].drinks[0].strIngredient2 + ', ' + returnedDetails[n].drinks[0].strIngredient3);
        drinkImage.addClass('card-img-top').attr('src', returnedDetails[n].drinks[0].strDrinkThumb);
        drinkImage.attr('data-video', ('www.youtube.com/watch?v=' + YouTubeLink[n]));
        newCard.append(drinkImage);
        newCard.append(drinkTitle);
        newCard.append(drinkIngredients);
        $('#results-container').append(newCard);
    }

    $(document).on('click', '.card', function() {
        $('#results-container').empty();
        populateChoice();
    })
    
    
    function populateChoice() {
      let title = $('<h1>');
      let ingredients = $('<p>');
      let measures = $('<p>');
      let images = $('<img>');
      let video = $('<img>');
      
      title.text("Title");
      ingredients.text("Ingredients");
      measures.text("Measurements");
      images.attr('src', 'https://via.placeholder.com/150');
      video.attr('src', 'https://via.placeholder.com/300');

      $('#drink-page').append(title);
      $('#drink-page').append(ingredients);
      $('#drink-page').append(measures);
      $('#drink-page').append(images);
      $('#drink-page').append(video);
      
    }
  });