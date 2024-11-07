let browserLanguage=navigator.language.split("-")[0];


async function fetchNews2() {
    let location;
    if(browserLanguage=="en")
        location="US"
    else{
        location=browserLanguage.toUpperCase();
    }
    const url = `https://real-time-news-data.p.rapidapi.com/topic-news-by-section?topic=TECHNOLOGY&section=CAQiW0NCQVNQZ29JTDIwdk1EZGpNWFlTQW1WdUdnSlZVeUlQQ0FRYUN3b0pMMjB2TURKdFpqRnVLaGtLRndvVFIwRkVSMFZVWDFORlExUkpUMDVmVGtGTlJTQUJLQUEqKggAKiYICiIgQ0JBU0Vnb0lMMjB2TURkak1YWVNBbVZ1R2dKVlV5Z0FQAVAB&limit=3&country=${location}&lang=${browserLanguage}`;
    const options = {
	method: 'GET',
	    headers: {
		    'x-rapidapi-key': '07fcfdc303mshbc4884495c168afp1775d8jsna94b6380cc9a',
		    'x-rapidapi-host': 'real-time-news-data.p.rapidapi.com'
	    }
    }
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result.data);
        console.log("aici");
        const dataToStore = {
            data: result.data,                         
            last_update: new Date()
        }
        localStorage.setItem(browserLanguage,JSON.stringify(dataToStore));
    } catch (error) {
        console.error(error);
    }
};

async function needToFetchNews(){
    if(!localStorage.getItem(browserLanguage))//daca nu exista datele in local storage le luam
    {
        await fetchNews2();
    }
    else{
        const last_update=new Date(JSON.parse(localStorage.getItem(browserLanguage)).last_update);
        const now=new Date();
        const difference=now-last_update;
        if(difference>1000*60*60*12)//daca trec 12 ore de la ultimul update luam din nou datele
        {
            await fetchNews2();
        }
    }
    addNewsToPage();
}
function addNewsToPage(){
    const data=JSON.parse(localStorage.getItem(browserLanguage)).data;
    if(data)
    {
        const news=document.querySelectorAll("#news-list li");
        data.forEach((element,index)=> {
            console.log(element);
            news[index].innerHTML=`<strong>`+element.title+`</strong>`+`<br>`+element.snippet+ `<br> <br>`;
            news[index].addEventListener("click",()=>{
                window.open(element.link);
            });
        });
    }
    
}
let tasks=[];
//initializam lista cu taskuri
function getTasks()
{
    tasks=JSON.parse(localStorage.getItem("tasks"));
    if(tasks==null)
    {
        tasks=[];
    }
    renderTasks();
}
//adaugam un task
function addTask(task)
{
    tasks.push(task);
    localStorage.setItem("tasks",JSON.stringify(tasks));
    renderTasks();
}
//setergem un task
function removeTask(task)
{
    tasks=tasks.filter(element=>element!=task);
    localStorage.setItem("tasks",JSON.stringify(tasks));
    renderTasks();
}
//refresh la lista cand schimbam ceva la ea
function renderTasks()
{
    const taskList=document.getElementById("task-list");
    taskList.innerHTML="";
    tasks.forEach(task=>{
        const listItem=document.createElement("li");
        listItem.textContent=task;

        const deleteButton=document.createElement("button");
        deleteButton.id = "delete-button";
        deleteButton.textContent="Delete";

        deleteButton.onclick=()=>{removeTask(task)};

        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);    
    });
}

//event listener pt button
const addTaskButton=document.getElementById("add-task");
addTaskButton.onclick=()=>{
    addTask(document.getElementById("task").value);
    document.getElementById("task").value="";
}

getTasks();
needToFetchNews();
let button1=document.querySelector("#ro")
button1.onclick=async()=>{
    browserLanguage="ro"
    await needToFetchNews();
    detectBrowserLanguage(browserLanguage);
    
}
let button2=document.querySelector("#es")
button2.onclick=async()=>{
    browserLanguage="es"
    await needToFetchNews();
    detectBrowserLanguage(browserLanguage);
    
}

let button3=document.querySelector("#en")
button3.onclick=async()=>{
    browserLanguage="en"
    await needToFetchNews();
    detectBrowserLanguage(browserLanguage);
    
}

let button4=document.querySelector("#de")
button4.onclick=async()=>{
    browserLanguage="de"
    await needToFetchNews();
    detectBrowserLanguage(browserLanguage);
    
}
