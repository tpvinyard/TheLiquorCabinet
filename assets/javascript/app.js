$(document).ready(function() {
    
    // for testing purposes
    let additionalIngredientsArray = ['vodka', 'lime'];

    $("#submit-button").on("click", function() {
        let inputAlcohol = $('#searchAlcohol').val();

        let ingredientArrayToText = additionalIngredientsArray.join('&i=');
        console.log(additionalIngredientsArray);
        console.log(ingredientArrayToText);

        if (!inputAlcohol == '') {
            console.log('made it')
            ingredientArrayToText = '&i=' + ingredientArrayToText;
        }

        let queryURL = "https://www.thecocktaildb.com/api/json/v2/8673533/filter.php?i=" + inputAlcohol + additionalIngredientsArray;

        console.log(queryURL);

        $.ajax({
        url: queryURL,
        method: "GET"
        })
        .then(function(response) {
            console.log(response.drinks);
        });
    });



    function addIngredient() {
        let additionalIngredients = $(`<div>`);
        additionalIngredients.text(searchValue);
        additionalIngredientsArray.push(searchValue);
        $('#add-ingredient').prepend(additionalIngredients); 
    }
    
    $('#add-ingredient').on('click', function(){
        let searchValue = $('#searchAlcohol').val().trim();

        if (!searchValue == '') {
            addIngredient();
        }
    })
});