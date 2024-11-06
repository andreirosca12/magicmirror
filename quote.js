
async function getapi()
{
  const api_url ="https://zenquotes.io/api/quotes/";
  const response = await fetch(api_url);
  var data = await response.json();
  console.log(data);
}

getapi();