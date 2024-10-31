const translation={
    en:{
        weather:"Today's weather",
        weather_p1:"Celsius Degrees",
        weather_p2:"Weather forecast for the next few days",
        todo:"To-do list",
        exchange:"Exchange rate",
        news:"Last news"
    },
    ro:{
        weather:"Vremea de azi",
        weather_p1:"Grade Celsius",
        weather_p2:"Prognoza meteo pentru următoarele zile",
        todo:"Lista cu sarcini",
        exchange:"Cursul valutar",
        news:"Ultimele stiri"
    },
    es:{
        weather:"El tiempo de hoy",
        weather_p1:"Grados Celsius",
        weather_p2: "Previsión meteorológica para los próximos días",
        todo:"Lista de tareas pendientes",
        exchange:"Divisa",
        news:"Últimas noticias"
    },
    de:{
        weather:"Das heutige Wetter",
        weather_p1:"Grad Celsius",
        weather_p2: "Wettervorhersage für die nächsten Tage",
        todo:"Aufgabenliste",
        exchange:"Wechselkurs",
        news:"Letzte Nachrichten"
    }
}
function detectBrowserLanguage(){
    const browserLanguage=navigator.language.split("-")[0];
    document.querySelector(".weather h2").innerHTML=translation[browserLanguage].weather;
    document.querySelector(".todo h3").innerHTML=translation[browserLanguage].todo;
    document.querySelector(".exchange h3").innerHTML=translation[browserLanguage].exchange;
    document.querySelector(".news h3").innerHTML=translation[browserLanguage].news;
}
detectBrowserLanguage();
