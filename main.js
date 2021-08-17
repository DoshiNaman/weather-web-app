//doshi naman

const wrapper = document.querySelector(".wrapper"),
  inputPart = document.querySelector(".input-part"),
  infoTxt = inputPart.querySelector(".info-txt"),
  inputField = inputPart.querySelector("input"),
  locationBtn = inputPart.querySelector("button"),
  weatherPart = wrapper.querySelector(".weather-part"),
  wIcon = weatherPart.querySelector("img"),
  arrowBack = wrapper.querySelector("header i");
let api;
let concatStrings = splitString[0] + splitString[1],
  lastString = ["c", "7", "e", "e"],
  reverseString = lastString.reverse().join("");
inputField.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && inputField.value != "") {
    requestApi(inputField.value);
    inputField.blur();
  }
});
locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("Your browser not support geolocation api");
  }
});
function requestApi(city) {
  const key = "6c145b901076d1c198b24ca915019522";
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=6c145b901076d1c198b24ca915019522`;
  fetchData();
}
function onSuccess(position) {
  const { latitude, longitude } = position.coords;
  const key = "6c145b901076d1c198b24ca915019522";
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=6c145b901076d1c198b24ca915019522`;
  fetchData();
}
function onError(error) {
  infoTxt.classList.add("error");
  infoTxt.innerText = error.message;
}
function fetchData() {
  infoTxt.innerText = "Getting weather details...";
  infoTxt.classList.add("pending");
  fetch(api)
    .then((res) => res.json())
    .then((result) => weatherDetails(result))
    .catch(() => {
      infoTxt.classList.replace("pending", "error");
      infoTxt.innerText = "Something went wrong";
    });
}
function weatherDetails(info) {
  if (info.cod == "404") {
    infoTxt.classList.replace("pending", "error");
    infoTxt.innerText = `${inputField.value} isn't a valid city name`;
  } else {
    const city = info.name;
    let country = info.sys.country;
    const { description, id } = info.weather[0];
    const { temp, feels_like, humidity } = info.main;
    for (i in countryList) {
      if (i == country) {
        country = countryList[i];
      }
    }
    if (id == 800) {
      wIcon.src = "icons/clear.svg";
    } else if (id >= 200 && id <= 232) {
      wIcon.src = "icons/storm.svg";
    } else if (id >= 600 && id <= 622) {
      wIcon.src = "icons/snow.svg";
    } else if (id >= 701 && id <= 781) {
      wIcon.src = "icons/haze.svg";
    } else if (id >= 801 && id <= 804) {
      wIcon.src = "icons/cloud.svg";
    } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
      wIcon.src = "icons/rain.svg";
    }
    weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
    weatherPart.querySelector(".weather").innerText = description;
    weatherPart.querySelector(
      ".location span"
    ).innerText = `${city}, ${country}`;
    weatherPart.querySelector(".temp .numb-2").innerText =
      Math.floor(feels_like);
    weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
    setTimeout(() => {
      infoTxt.classList.remove("pending", "error");
      infoTxt.innerText = "";
      inputField.value = "";
      wrapper.classList.add("active");
    }, 800);
  }
}
arrowBack.addEventListener("click", () => {
  wrapper.classList.remove("active");
});
