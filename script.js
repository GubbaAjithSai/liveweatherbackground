const time=document.getElementById('time');
//showTime
function showTime(){
    let d=new Date(),
    hour=d.getHours(),
    min=d.getMinutes(),
    sec=d.getSeconds();
    const amPm=hour>=12 ? " PM":" AM";
    hour=hour%12 ||12;
    time.textContent=addZero(hour)+":"+addZero(min)+":"+addZero(sec)+amPm;
    setTimeout(showTime,1000);
}
function addZero(n){
    return n<10 ? "0"+n : n;
}
showTime();

// set greeting

let d=new Date();
if(d.getHours()<12){
    document.getElementById("greeting").textContent="GOOD MORNING"
}
else if(d.getHours()<18){
    document.getElementById("greeting").textContent="GOOD AFTERNOON"
}
else{
    document.getElementById("greeting").textContent="GOOD EVENING"
}

//api setup

let cityName="Hyderabad",
apiKey="fb9eb80a828aa9ec15f92dcdc683f40a";
function get(cityName,apiKey) {
    let api="https://api.openweathermap.org/data/2.5/weather?q=" +cityName +"&units=metric&appid=" +apiKey;
    fetch(api).then((Response)=>Response.json())
    .then((data)=>{
        let city=data.name,
        temp=data.main.temp,
        pressure=data.main.pressure,
        humidity=data.main.humidity,
        description=data.weather[0].description,
        wind=data.wind.speed,
        icon=data.weather[0].icon,
        main=data.weather[0].main;
        document.getElementById("city").textContent=city;
        document.getElementById("description").textContent=description;
        document.getElementById("tem").textContent=temp+" °c";
        document.getElementById("pressure").textContent="Pressure  : "+pressure+" hPa";
        document.getElementById("humidity").textContent="Humidity  : "+humidity+" %";
        document.getElementById("wind").textContent="Wind speed  : "+wind+" m/s";
        document.querySelector(".icon").src="https://openweathermap.org/img/wn/" + icon + ".png";
        
        //background image
        switch (main) {
            case "Clouds":
                document.body.style.backgroundImage="url(clouds.gif)";
                document.body.style.backgroundSize="cover";
                break;
            case "Thunderstorm":
                document.body.style.backgroundImage="url(thunderstorm.gif)";
                document.body.style.backgroundSize="cover";
                document.getElementById("greeting").style.color="white";
                document.getElementById("name").style.color="white";
                break;
            case "Rain":
                document.body.style.backgroundImage="url(rain.gif)";
                document.body.style.backgroundSize="cover";
                break;
            case "Snow":
                document.body.style.backgroundImage="url(snow.gif)";
                document.body.style.backgroundSize="cover";
                document.getElementById("greeting").style.color="white";
                document.getElementById("name").style.color="white";
                document.getElementById("time").style.color="white";
                break;

            case "Clear":
                document.body.style.backgroundImage="url(clear.gif)";
                document.body.style.backgroundSize="cover";
                break;
        default:
                document.body.style.backgroundImage="url(fog.gif)";
                document.body.style.backgroundSize="cover";
                break;
        }   
    })
}
get(cityName,apiKey);

// setting search button

document.querySelector(".search button").addEventListener("click",function () {
    cityName=document.querySelector(".searchbar").value;
    get(cityName,apiKey);
})

//setting enter in search input box

document.querySelector(".searchbar").addEventListener("keyup",function (event) {
    if(event.key=="Enter"){
        cityName=document.querySelector(".searchbar").value;
        get(cityName,apiKey);
    }
})

//name setup
function getName() {
    if (localStorage.getItem('key') === null) {
        document.getElementById('name').textContent = '[Enter Name]';
    } else {
        document.getElementById('name').textContent = localStorage.getItem('key');
    }
}
getName();
document.getElementById('name').addEventListener("keyup",function (event) {
    if(event.key=="Enter"){
        localStorage.setItem("key",event.target.innerText);
    }
})
document.getElementById('name').addEventListener("blur",function (event) {
    localStorage.setItem("key",event.target.innerText);
})







