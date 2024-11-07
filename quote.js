
async function getapi()
{
    const url = 'https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote?token=ipworld.info';
    const options = {
	    method: 'GET',
    	headers: {
		'x-rapidapi-key': '07fcfdc303mshbc4884495c168afp1775d8jsna94b6380cc9a',
		'x-rapidapi-host': 'quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com'
	    }
    };
    try {
	    const response = await fetch(url, options);
	    const result = await response.json();
	    return result;
    } 
    catch (error) {
	    console.error(error);
    }
}


async function quoteOfTheDay()
{
    const data=await getapi();
    let footer=document.querySelector(".quote");
    let quote=document.querySelector("#quote");
    const authorName=document.createElement("p");
    authorName.innerHTML=data.author;
    footer.appendChild(authorName);
    quote.innerHTML=`\" ${data.text} \"`;

    authorName.style.color="white";
    quote.style.color="white";
}
quoteOfTheDay()