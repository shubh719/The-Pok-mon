function render() {
  let number = document.getElementById("number");
  const dropdown = document.getElementById("type");
  const selectedValue = dropdown.value;

  // First fetch the type data
  fetch(`https://pokeapi.co/api/v2/type/${selectedValue}`)
    .then((response) => response.json())
    .then((data) => {
      // Clear previous results
      document.querySelector(".result").innerHTML = "";

      // Check if requested number exceeds available Pokemon
      if (number.value > data.pokemon.length) {
        alert(
          `Error: There are only ${data.pokemon.length} ${selectedValue} type Pokemon available. Please enter a number less than or equal to ${data.pokemon.length}.`
        );
        return;
      }

      // Loop through the requested number of Pokémon
      for (let i = 0; i < number.value; i++) {
        const allPokemon = data.pokemon;
        const pokemonUrl =
          data.pokemon[Math.floor(Math.random() * allPokemon.length)].pokemon
            .url;

        // Fetch each Pokémon's details
        fetch(pokemonUrl)
          .then((response) => response.json())
          .then((pokemonData) => {
            let div = document.createElement("div");
            div.className = "pokemon-card";

            let pn = document.createElement("span");
            pn.className = "pokemon-name";
            pn.textContent = pokemonData.name;

            let img = document.createElement("img");
            img.src = pokemonData.sprites.front_default;
            img.className = "pokemon-image";
            img.height = div.append(pn);
            div.append(img);
            document.querySelector(".result").appendChild(div);
          });
      }
    });
}
