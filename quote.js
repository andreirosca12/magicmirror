async function fetchQuote(){
    const apiUrl='https://zenquotes.io/api/today';
    const response=await fetch(apiUrl);
    const data=await response.json();
    console.log(data);
}
fetchQuote();