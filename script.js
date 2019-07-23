const form = document.getElementById('form');
const outputField = document.getElementById('output').firstElementChild;
let foodQuery = document.getElementById('food-input');
const messageField = document.getElementById('message');
const validationOutput = document.getElementById('validation-output');

const validate = () => {
  const regex = /^[A-Z]+$/i;
  let regexResult = regex.test(foodQuery.value);
  if (regexResult === false || foodQuery.value === '') {
    validationMessage('Please enter only alphabetical characters');
    outputField.innerHTML = '';
    messageField.innerHTML = '';
    return false;

  } else {
    validationMessage('');
    resultsMessage('');
    return true;
  }
}

const getBeer = (e) => {
  e.preventDefault();

  if(validate()) {
    fetch(`https://api.punkapi.com/v2/beers?food=${foodQuery.value}`)
    .then(
      res => {
        return res.json()
      }
    )
    .then(
      data => {
        let output = '';
  
        if (data.length === 0) {
          return resultsMessage('No results found');

        } else {
          data.map((beer) => {

            console.log(data);

            if(beer.image_url === null) {
              console.log('no image')
            }
           
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
    
          outputField.innerHTML = output;
        }
      }
    )
    .catch(
      error => console.log(error)
    )
  }
}

const loader = (e) => {
  e.preventDefault();

  outputField.innerHTML = 
    `<div class="spinner">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>`

    setTimeout(getBeer, 1500);
}

const resultsMessage = (message) => {
  output = `<h4 class="message">${message}</h4>`;

  messageField.innerHTML = output;
  outputField.innerHTML = '';
}

const validationMessage = (message) => {
  output = `<span class="validation-message">${message}</span>`;
        
  validationOutput.innerHTML = output;
}

form.addEventListener('submit', getBeer);
