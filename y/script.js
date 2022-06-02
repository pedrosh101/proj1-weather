/* 1 key e 3 funcoes dentro desse objeto
1-ouve o click e pega o input 
2-acessa o api e busca data 
3-printa/displaya o resultado na pág  */


let weather = {
    apiKey: "3b1479447d5bb60a635b772e939c638e",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city 
        + "&units=metric&appid=" 
        + this.apiKey)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data){
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Temperatura em " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Umidade: " + humidity + "%";
        document.querySelector(".wind").innerText = "Vento: " + speed + "km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

// dispara a ultima funcao do obj acima a func 3
document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

// só faz o enter disparar a ultima funcao do obj
document.querySelector(".search-bar").addEventListener("keyup", function (e) {
    if (e.key == "Enter"){
        weather.search();
    }
})

// n deixa o init vazio
weather.fetchWeather("São Paulo");