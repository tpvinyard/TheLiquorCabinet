$(document).ready(function() {
    
    // for testing purposes
    let ingredients = 'vodka';

    $("#submit-button").on("click", function() {
        console.log('made it');

        let queryURL = "https://www.thecocktaildb.com/api/json/v2/8673533/filter.php?i=" + ingredients;

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