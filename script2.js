const translation={
    en:{
        weather:"Today's weather",
        weather_p1:"Celsius Degrees",
        weather_p2:"Weather forecast for the next few days",
        todo:"To-do list",
        exchange:"Exchange rate",
        news:"Last news",
        button_todo:"Add",
        delete_todo:"Delete",
        forecast:"Weather forecast for the next few days"
    },
    ro:{
        weather:"Vremea de azi",
        weather_p1:"Grade Celsius",
        weather_p2:"Prognoza meteo pentru următoarele zile",
        todo:"Lista cu sarcini",
        exchange:"Cursul valutar",
        news:"Ultimele stiri",
        button_todo:"Adauga",
        delete_todo:"Sterge",
        forecast:"Prognoza meteo pentru următoarele zile"
    },
    es:{
        weather:"El tiempo de hoy",
        weather_p1:"Grados Celsius",
        weather_p2: "Previsión meteorológica para los próximos días",
        todo:"Lista de tareas pendientes",
        exchange:"Divisa",
        news:"Últimas noticias",
        button_todo:"Agregar",
        delete_todo:"Delete",
        eliminar_todo:"Eliminar",
        forecast:"Previsión meteorológica para los próximos días"
    },
    de:{
        weather:"Das heutige Wetter",
        weather_p1:"Grad Celsius",
        weather_p2: "Wettervorhersage für die nächsten Tage",
        todo:"Aufgabenliste",
        exchange:"Wechselkurs",
        news:"Letzte Nachrichten",
        button_todo:"Hinzufügen",
        delete_todo:"Löschen",
        forecast:"Wettervorhersage für die nächsten Tage"
    }
}
const browser=navigator.language.split("-")[0];
function detectBrowserLanguage(browserLanguage){
    document.querySelector(".weather h2").innerHTML=translation[browserLanguage].weather;
    document.querySelector(".todo h3").innerHTML=translation[browserLanguage].todo;
    document.querySelector(".exchange h3").innerHTML=translation[browserLanguage].exchange;
    document.querySelector(".news h3").innerHTML=translation[browserLanguage].news;
    document.querySelector("#add-task").innerHTML=translation[browserLanguage].button_todo;
    document.querySelector("#forecast").innerHTML=translation[browserLanguage].forecast;
    document.querySelector("#delete-button").innerHTML=translation[browserLanguage].delete_todo;
}
detectBrowserLanguage(browser);