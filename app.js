const form = document.querySelector("form");
const input = document.querySelector("input");
const cardContainer = document.querySelector(".card-container");
const url = "https://restcountries.com/v3.1/name/";
const template = document.querySelector("template");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const countryName = input.value.trim();
  if (countryName !== "") {
    fetchData(countryName)
      .then((data) => {
        updateUI(data);
      })
      .catch((error) => {
        error;
      });
  }
});

async function fetchData(countryName) {
  const response = await fetch(url + countryName);
  const data = await response.json();
  return data;
}

function updateUI(data) {
  cardContainer.innerHTML = "";
  const country = data[0];

  const card = template.content.cloneNode(true);
  const image = card.querySelector("img");
  image.src = country.flags.svg;
  image.alt = country.name.common;

  const details = card.querySelector(".details");
  details.innerHTML = `
    <h1>${country.name.common}</h1>
    <p>Aholi soni: ${country.population.toLocaleString()}</p>
    <p>Mintaqasi: ${country.region}</p>
    <p>Poytaxti: ${country.capital}</p>
    <p>Maydoni: ${country.area.toLocaleString()} km<sup>2</sup></p>
    <p>Chegaradosh davlatlar: ${country.borders.join(", ")}</p>
    <p>TLD: ${country.tld.join(", ")}</p>
  `;

  cardContainer.appendChild(card);
  input.value = "";
}
