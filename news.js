let browserLanguage=navigator.language.split("-")[0];


async function fetchNews(){
    console.log("a fost aici");
    const api_url=`https://api.thenewsapi.com/v1/news/top?language=${browserLanguage}&api_token=qZAwHz1pnULtu0Y0UaHJT7oyku2OPiU2bnMU0fQj`;
    const response=await fetch(api_url);
    const data=await response.json();
    console.log(data.data);
    const dataToStore = {
        data: data.data,                         
        last_update: new Date()
    }
    localStorage.setItem(browserLanguage,JSON.stringify(dataToStore));
}

async function needToFetchNews(){
    let shouldAddNews = false;
    if(!localStorage.getItem(browserLanguage))//daca nu exista datele in local storage le luam
    {
        shouldAddNews =await fetchNews();
    }
    else{
        const last_update=new Date(JSON.parse(localStorage.getItem(browserLanguage)).last_update);
        const now=new Date();
        const difference=now-last_update;
        if(difference>1000*60*60*12)//daca trec 12 ore de la ultimul update luam din nou datele
        {
            shouldAddNews =await fetchNews();
        }
        else{
            shouldAddNews =true;
        }
    }
    if (shouldAddNews) {
        addNewsToPage();
    } else {
        console.warn("No news data available to display."); // Debug: no data to show
    }
}
function addNewsToPage(){
    const data=JSON.parse(localStorage.getItem(browserLanguage)).data;
    if(data)
    {
        const news=document.querySelectorAll("#news-list li");
        data.forEach((element,index)=> {
            console.log(element);
            news[index].innerHTML=`<strong>`+element.title+`</strong>`+`<br>`+element.description+ `<br> <br>`;
            news[index].addEventListener("click",()=>{
                window.open(element.url);
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
    detectBrowserLanguage(browserLanguage);
    await needToFetchNews();
}
let button2=document.querySelector("#es")
button2.onclick=async()=>{
    browserLanguage="es"
    detectBrowserLanguage(browserLanguage);
    await needToFetchNews();
}

let button3=document.querySelector("#en")
button3.onclick=async()=>{
    browserLanguage="en"
    detectBrowserLanguage(browserLanguage);
    await needToFetchNews();
}

let button4=document.querySelector("#de")
button4.onclick=async()=>{
    browserLanguage="de"
    detectBrowserLanguage(browserLanguage);
    await needToFetchNews();
}