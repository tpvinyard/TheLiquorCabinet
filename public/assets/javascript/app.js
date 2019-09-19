$(document).ready(function() {
  let returnedDrinks = [];
  let returnedDetails = [];
  let returnedDrinksArray;
  let searchValue = "";
  // for testing purposes
  let additionalIngredientsArray = [];
  let YouTubeLink = '';
  let count = 0;
  
 
  //login function
  $(document).on("click", ".a2", function googleLogin() {
      
    // document.addEventListener("DOMContentLoaded", (event) => {
    //     const app = firebase.app();
    //     console.log(app);
    //   });
    //   const app = firebase.app();
    //     console.log(app);
      // a function that logs the user-in
    //   function googleLogin() {
        //   console.log('google is clicking');
          const app = firebase.app();
        console.log(app);
          
        const provider = new firebase.auth.GoogleAuthProvider();
    
        firebase
          .auth().signInWithPopup(provider)
    
          .then(result => {
            const user = result.user;
            document.write(`Hii, ${user.displayName}`);
            console.log(user);
          })
          .catch(console.log);
      });
      //
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
      let drinkTitle = $('<h3>');
      let drinkIngredients = $('<p>');
      let drinkImage = $('<img>');
      drinkTitle.addClass('card-title').text(returnedDetails[n].drinks[0].strDrink);
      drinkIngredients.addClass('card-text').text(returnedDetails[n].drinks[0].strIngredient1 + ', ' + returnedDetails[n].drinks[0].strIngredient2 + ', ' + returnedDetails[n].drinks[0].strIngredient3);
      drinkImage.addClass('card-img-top').attr('src', returnedDetails[n].drinks[0].strDrinkThumb);
      newCard.append(drinkImage);
      newCard.append(drinkTitle);
      newCard.append(drinkIngredients);

      $('#results-container').append(newCard);
        let cocktailNameFormatted = returnedDetails[n].drinks[0].strDrink.split(' ').join('+');
        let youtubeURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + cocktailNameFormatted + '+cocktail&key=AIzaSyAsSIrxTBBk81EiuwwXluOFKR6_xNKm--A';
          $.ajax({
            url: youtubeURL,
            method: 'GET'
          }).then(function(response){
            YouTubeLink = response.items[0].id.videoId;
            drinkImage.attr('data-video', ('www.youtube.com/watch?v=' + YouTubeLink));
          })


    }

    $(document).on('click', '.card', function() {
      let objectData = $(this).data('object');
      console.log(objectData);
      
      
      $('#results-container').empty();
      let title = $('<h1>');
      let ingredients = $('<p>Ingredients: </p>');
      let measures = $('<p>Measurements: </p>');
      let images = $('<img>');
      let video = $('<iframe>');
      
      title.text(objectData.drinks[0].strDrink);
      images.attr('src', objectData.drinks[0].strDrinkThumb);
      images.attr('height', '200px').attr('width', '200px');
      let videoSrc = $(this).data('video');
      video.attr('src', videoSrc);
      let ingredientArray = parseIngredient(objectData);
      ingredients.text(ingredientArray);
      let measurementArray = parseMeasurement(objectData);
      measures.text(measurementArray);
      

      

      $('#drink-page').append(title);
      $('#drink-page').append(ingredients);
      $('#drink-page').append(measures);
      $('#drink-page').append(images);
      $('#drink-page').append(video);
    })
  });