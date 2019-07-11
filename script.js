const form = document.getElementById('form');

const getBeer = (e) => {
  const foodQuery = document.getElementById('food-input').value;

  fetch(`https://api.punkapi.com/v2/beers?food=${foodQuery}`)
  .then(
    res => {
      return res.json()
    }
  )
  .then(
    data => {
      console.log(data);
      let output = '';
      let foodList = '';
      data.map((beer) => {
        beer.food_pairing.map(food => {
          foodList += `<li>${food}</li>`;
        });
        output += `
          <ul>
            <li><img src="${beer.image_url}"></li>
            <li>${beer.name}</li>
            <li>ABV: ${beer.abv}</li>
            <li>This beer is great with:
              <ul>${foodList}</ul>
            </li>
          </ul>
        `;
      });
      document.getElementById('output').innerHTML = output;
    }
  )
  e.preventDefault();
}

form.addEventListener('submit', getBeer);
