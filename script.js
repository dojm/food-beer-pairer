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
      let output = '';
      console.log(data);

      // food pairing array nested within 

      data.map((beer) => {
       
        output += `
          <ul>
            <li><img src="${beer.image_url}"></li>
            <li>${beer.name}</li>
            <li>ABV: ${beer.abv}</li>
            <li>This beer is great with:
              <ul class="food-list">
                <li>${beer.food_pairing[0]}</li>
                <li>${beer.food_pairing[1]}</li>
                <li>${beer.food_pairing[2]}</li>
              </ul>
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
