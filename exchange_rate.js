const apiUrl = `https://v6.exchangerate-api.com/v6/441249c85fc66312efc9c473/latest/RON`;

// Function to fetch and display exchange rates
async function fetchExchangeRates() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch exchange rates");
    }
    const data = await response.json();

    // Get rates for RON for USD,EUR and GBP
    const usdRate = (1 / data.conversion_rates.USD).toFixed(2);
    const eurRate = (1 / data.conversion_rates.EUR).toFixed(2);
    const gbpRate = (1 / data.conversion_rates.GBP).toFixed(2);

    // Display rates in RON
    document.getElementById("currency-list").innerHTML = `
            <li>1 EUR = ${eurRate} RON</li>
            <li>1 USD = ${usdRate} RON</li>
            <li>1 GBP = ${gbpRate} RON</li>
        `;
  } catch (error) {
    console.error(error);
    document.getElementById("currency-list").innerHTML =
      "<li>Error loading exchange rates. Please try again later.</li>";
  }
}

fetchExchangeRates();

//Should I make it with local storage also?
