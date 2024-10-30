const apiUrl = `https://v6.exchangerate-api.com/v6/441249c85fc66312efc9c473/latest/RON`;

// Function to fetch and display exchange rates
async function fetchExchangeRates() {
  try {
    // Check if online, then fetch data from the API
    if (navigator.onLine) {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch exchange rates");
      }
      const data = await response.json();

      // Get rates for RON per USD, EUR, and GBP
      const usdRate = (1 / data.conversion_rates.USD).toFixed(2);
      const eurRate = (1 / data.conversion_rates.EUR).toFixed(2);
      const gbpRate = (1 / data.conversion_rates.GBP).toFixed(2);

      // Display rates in RON
      displayRates(eurRate, usdRate, gbpRate);

      // Save rates to localStorage
      localStorage.setItem("exchangeRates", JSON.stringify({ usdRate, eurRate, gbpRate, timestamp: Date.now() }));
    } else {
      // Offline: Load rates from localStorage
      loadRatesFromStorage();
    }
  } catch (error) {
    console.error(error);
    document.getElementById("currency-list").innerHTML =
      "<li>Error loading exchange rates. Please try again later.</li>";
    loadRatesFromStorage(); // Attempt to load from storage if an error occurs
  }
}

// Function to display the exchange rates in the HTML
function displayRates(eurRate, usdRate, gbpRate) {
  document.getElementById("currency-list").innerHTML = `
      <li>1 EUR = ${eurRate} RON</li>
      <li>1 USD = ${usdRate} RON</li>
      <li>1 GBP = ${gbpRate} RON</li>
  `;
}

// Function to load rates from localStorage when offline or on error
function loadRatesFromStorage() {
  const savedRates = JSON.parse(localStorage.getItem("exchangeRates"));
  if (savedRates) {
    // Check if the data is recent (e.g., fetched within the last 24 hours)
    const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    if (Date.now() - savedRates.timestamp < oneDay) {
      displayRates(savedRates.eurRate, savedRates.usdRate, savedRates.gbpRate);
    } else {
      document.getElementById("currency-list").innerHTML =
        "<li>Saved exchange rates are outdated. Please connect to the internet to refresh.</li>";
    }
  } else {
    document.getElementById("currency-list").innerHTML =
      "<li>No exchange rates available offline. Please connect to the internet.</li>";
  }
}

// Fetch exchange rates on page load
fetchExchangeRates();
