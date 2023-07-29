// const { json } = require("stream/consumers");

// api
const API = "https://randomuser.me/api/?results=15";

const loaderToggle = (toggle) => {
  if (toggle) {
    overlay.classList.remove("hidden");
  } else {
    overlay.classList.add("hidden");
  }
};

// for leader
const overlay = document.getElementById("overlay");

const getData = (resource) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.addEventListener("readystatechange", () => {
      if (request.readyState < 4) {
        loaderToggle(true);
      } else if (request.readyState == 4 && request.status == 200) {
        const data = JSON.parse(request.responseText)
        loaderToggle(false);
        resolve(data.results)
      } else if (request.request == 4) {
        reject('Error')
        loaderToggle(false);
      }
    });
    request.open("GET", resource);
    request.send();
  });
};
const reload = () => {
  getData(API)
    .then((data) => {
      updateUI(data);
    })
    .catch((err) => {
      console.log(err);
    });
};
document.addEventListener("DOMContentLoaded", reload);
