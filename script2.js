const translation={
    en:{
        weather:"Today's weather",
        todo:"To-do list",
        exchange:"Exchange rate",
        news:"Last news"
    },
    ro:{
        weather:"Vremea de azi",
        todo:"Lista cu sarcini",
        exchange:"Cursul valutar",
        news:"Ultimele stiri"
    },
    es:{
        weather:"El tiempo de hoy",
        todo:"Lista de tareas pendientes",
        exchange:"Divisa",
        news:"Últimas noticias"
    },
    de:{
        weather:"Das heutige Wetter",
        todo:"Aufgabenliste",
        exchange:"Wechselkurs",
        news:"Letzte Nachrichten"
    }
}
function detectBrowserLanguage(){
    const browserLanguage=navigator.language.split("-")[0];
    document.querySelector(".weather").innerHTML=translation[browserLanguage].weather;
    document.querySelector(".todo").innerHTML=translation[browserLanguage].todo;
    document.querySelector(".exchange").innerHTML=translation[browserLanguage].exchange;
    document.querySelector(".news").innerHTML=translation[browserLanguage].news;
}
detectBrowserLanguage();
