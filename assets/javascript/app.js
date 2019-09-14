$(document).ready(function() {
  let returnedDrinks = {};
  let returnedDrinksArray;
  let searchValue = "";
  // for testing purposes
  let additionalIngredientsArray = [];
  

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
    console.log(returnedDrinksArray)
    for (let i = 0; i < returnedDrinksArray.length; i++) {
        let queryDrinksUrl = "https://www.thecocktaildb.com/api/json/v2/8673533/lookup.php?i=" + returnedDrinksArray[i];
<<<<<<< HEAD
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          returnedDrinks = response;
          returnedDrinksArray = getDrinkIDArray(returnedDrinks);
          console.log(queryURL);
          for (let i = 0; i < returnedDrinksArray.length; i++) {
            let queryDrinksUrl = "https://www.thecocktaildb.com/api/json/v2/8673533/lookup.php?i=" + returnedDrinksArray[i];
            $.ajax({
              url: queryDrinksUrl,
              method: "GET"
            }).then(function(response) {
              console.log(queryDrinksUrl);
              console.log(response);
            });
          }
        });
      }
    });
  });

  function getDrinkIDArray(response) {
    let drinkIDArray = [];
    for (let i = 0; i < response.drinks.length; i++) {
      drinkIDArray.push(response.drinks[i].idDrink);
    }
    return drinkIDArray;
  }
=======
                $.ajax({
                    url: queryDrinksUrl,
                    method: "GET"
                })
                .then(function(response){
                    console.log(queryDrinksUrl)
                    console.log(response)
                })
            }
        });
      });
 
  
    function getDrinkIDArray(response) {
        let drinkIDArray = [];
        for (let i = 0; i < response.drinks.length; i++) {
            drinkIDArray.push(response.drinks[i].idDrink);
        }
        return drinkIDArray;
    }



   
  

>>>>>>> 563c587dd63d1056178761b42ddf838241e68cb6
  function addIngredient() {
    let additionalIngredients = $("<button>");
    additionalIngredients.text(searchValue);
    additionalIngredients.attr("class", "ingredient");
    additionalIngredients.addClass("btn");
    additionalIngredients.addClass("btn-secondary");
    additionalIngredientsArray.push(searchValue);
    $("#ingredientContainer").append(additionalIngredients);
    
  }
<<<<<<< HEAD
  $("#add-ingredients").on("click", function() {
    //
    searchValue = $("#searchAlcohol")
      .val()
      .trim();

    if (!searchValue == "") {
      addIngredient();
    }
  });

  $(document).on("click", ".ingredient", function() {
    event.preventDefault();
    let position = $(this).data("position");
    additionalIngredientsArray.splice(position, 1);
    $(this).remove();
    console.log(additionalIngredientsArray);
  });
=======

    $("#add-ingredients").on("click", function() {   
      searchValue = $("#searchAlcohol")
        .val()
        .trim();

      if (!searchValue == "") {
        addIngredient();
      }
    });
    
    $(document).on('click', '.ingredient', function(){
        event.preventDefault();
        additionalIngredientsArray.splice(additionalIngredientsArray.indexOf($(this).text()), 1);
        $(this).remove();
        console.log(additionalIngredientsArray);
    })
       
    
    
>>>>>>> 563c587dd63d1056178761b42ddf838241e68cb6

  $(searchValue).empty();
});
