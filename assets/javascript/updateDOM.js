// flow:
// 1. Setup loop for length returned from API returned array of objects
// 2. From API response for individual drink
// 	get idDrink
// 	get strDrink
// 	get strCategory
// 	get strInstructions
// 	get strDrinkThumb (string url to the picture" 700x700 pixels
// 	get strIngredients & measurements in to arrays
// 		loop through ingredients returns until you encounter first empty string
// 			determine length to use for measurements array
// 			push strIndregient1 to ingredientsArray
// 			push strIndregient2 to ingredientsArray
// 			push strIndregientN to ingredientsArray
// 		create loop with length determined in ingredients search 
// 			push strMeasure1 to measureArray
// 			push strMeasure2 to measureArray
// 			push strMeasureN to measureArray

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