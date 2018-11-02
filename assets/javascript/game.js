$(document).ready(function() {
  var pokemons = [
    {
      name: "Pikachu",
      hp: 150,
      atkPower: 10,
      defAtkPower: 10,
      counterPower: 30,
      imgSrc: 'assets/images/pikachu.png'
    },
    {
      name: "Bulbasaur",
      hp: 180,
      atkPower: 8,
      defAtkPower: 8,
      counterPower: 10,
      imgSrc: 'assets/images/bulbasaur.png'
    },
    {
      name: "Charmander",
      hp: 150,
      atkPower: 9,
      defAtkPower: 9,
      counterPower: 30,
      imgSrc: 'assets/images/charmander.png'
    },
    {
      name: "Squirtle",
      hp: 200,
      atkPower: 2,
      defAtkPower: 2,
      counterPower: 9,
      imgSrc: 'assets/images/squirtle.png'
    }
  ];


  // Declared variables
  var choosePokemon = [];
  var chosenPokemon = {};
  var enemyPokemon = {};
  var pokemonSelected = false;
  var enemySelected = false;

  // Start a new game
  function newGame() {

    choosePokemon = [...pokemons];
    generatePokemon(pokemons);
    console.log(pokemons);
    console.log(choosePokemon);
  };

  // Generate pokemon images
  function generatePokemon(pokemonList) {
    for (var i=0; i < pokemonList.length; i++) {
      var pokeCard = $("<div>").addClass("pokemon");
      pokeCard.attr({
        "id": pokemonList[i].name,
        "key": i
      });
      var sprite = $("<img>");
      sprite.attr("src", pokemonList[i].imgSrc);
      pokeCard.append($("<h2>" + pokemonList[i].name + "</h2>")).append(sprite).append($("<p>" + pokemonList[i].hp + "</p>"));
      $("#pokemons").append(pokeCard);
    }
  }
  newGame();


  // Choose pokemon
  $(document).on("click", ".pokemon", function() {
    var pokemonId = $(this).attr("key");
    // User picks pokemon
    if (!pokemonSelected && !enemySelected) {
      // Sets chosen pokemon
      chosenPokemon = choosePokemon[pokemonId];
      console.log(choosePokemon);
      pokemonSelected = true;
      // Testing
      var pokemonCard = ($("<div>")).addClass("playerPokemon");
      var pokeImg = $("<img>");
      var pokeHp = $("<p>" + chosenPokemon.hp + "</p>")
      var pokeName = $("<p>" + chosenPokemon.name + "</p>")
      pokeHp.attr("id", "pokeHp");
      pokeImg.attr("src", chosenPokemon.imgSrc);
      pokemonCard.append(pokeName).append(pokeImg).append(pokeHp);
      pokemonCard.appendTo("#selectedPokemon");
      $("#pokemons").contents().appendTo("#otherPokemons");

      // Remove Pokemon from array
      $("#" + chosenPokemon.name).remove();

    } else if (pokemonSelected && !enemySelected) {
      // Sets enemy pokemon and moves to enemy div
      enemyPokemon = choosePokemon[pokemonId];
      // $("#" + enemyPokemon.name).appendTo("#enemyPokemon");
      enemySelected = true;
      var enemyCard = ($("<div>")).addClass("enemyPokemon");
      var enemyImg = $("<img>");
      var enemyName = $("<p>" + enemyPokemon.name + "</p>")
      var enemyHp = $("<p>" + enemyPokemon.hp + "</p>")
      enemyHp.attr("id", "enemyHp");
      enemyImg.attr("src", enemyPokemon.imgSrc);
      enemyCard.append(enemyName).append(enemyImg).append(enemyHp);
      enemyCard.appendTo("#enemyPokemon");
      $("#" + enemyPokemon.name).remove();
    }
  })


  // Attack pokemon
  $("#attackBtn").on("click", function() {
    if (pokemonSelected && enemySelected) {
      // When user attacks, decrease enemyPokemon hp and increase atk power
      enemyPokemon.hp -= chosenPokemon.atkPower
      chosenPokemon.hp -= enemyPokemon.counterPower;
      chosenPokemon.atkPower += chosenPokemon.defAtkPower;
      // Update hp of pokemon
      $("#pokeHp").text(chosenPokemon.hp);
      $("#enemyHp").text(enemyPokemon.hp);
      checkHp();
      console.log(pokemons);
      console.log(choosePokemon);
    }
  });

  function checkHp() {
    if (chosenPokemon.hp <= 0) {
      alert("Your pokemon has fainted! Refresh page to try again")
    } else if (enemyPokemon.hp <= 0) {
      $("#enemyPokemon").empty();
      // Allows user to select new enemy and resets enemy
      enemyPokemon = {};
      enemySelected = false;
    }
  };
});
