$(document).ready(function() {
    let returnedDrinks = {};
    let returnedDrinksArray = '';
    let searchValue = '';
    // for testing purposes
    let additionalIngredientsArray = [];

    $("#submit-button").on("click", function() {
        let inputAlcohol = $('#searchAlcohol').val();

        let ingredientArrayToText = additionalIngredientsArray.join('&i=');
        

        if (!inputAlcohol == '') {
            ingredientArrayToText = '&i=' + ingredientArrayToText;
            
        }

        let queryURL = "https://www.thecocktaildb.com/api/json/v2/8673533/filter.php?i=" + inputAlcohol + ingredientArrayToText;

        $.ajax({
        url: queryURL,
        method: "GET"
        })
        .then(function(response) {
            returnedDrinks = response;
            returnedDrinksArray = getDrinkIDArray(returnedDrinks);
            for (let i = 0; i<returnedDrinksArray.length; i++) {
                let queryDrinksUrl = "https://www.thecocktaildb.com/api/json/v2/8673533/lookup.php?i=" + returnedDrinksArray[i];
                $.ajax({
                    url: queryDrinksUrl,
                    method: "GET"
                })
                .then(function(response){
                    console.log(returnedDrinks);
                    return returnedDrinks; //returns full array for parsing ingredients
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



    function addIngredient() {
        let additionalIngredients = $('<div>');
        additionalIngredients.text(searchValue);
        additionalIngredientsArray.push(searchValue);
        $('#add-ingredients').prepend(additionalIngredients); 
    }
    
    $('#add-ingredients').on('click', function(){
        searchValue = $('#searchAlcohol').val().trim();

        if (!searchValue == '') {
            addIngredient();
        }
    })

    function parseIngredient(selectedDrink) {
        let ingredientArray = []; //make this global once merged
        for (let i = 0; i < 14; i++) { //API returns a fixed 15 ingredients for every drink
            let tempIngredient = selectedDrink.drinks.strIngredient[i];
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
        let id = selectedDrink.drinks.idDrink; // assign responses to respective variables
        let name = selectedDrink.drinks.strDrink;
        let category = selectedDrink.drinks.strCategory;
        let instructions = selectedDrink.drinks.strInstructions;
        for (let i=0; i< ingredients.length; i++){  // loop through corrected length ingredient array
            newIng.append(ingredients[i]);
            newMes.append(measurements[i]);
        }
        $(".drinks").append(name); // push divs to DOM
        $(".drinks").append(id);
        $(".drinks").append(category);
        $(".drinks").append(instructions);
        $(".drinks").append(newIng);
        $(".drinks").append(newMes);
    }
});

