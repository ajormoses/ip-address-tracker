const ipBtn = document.getElementById("form");
const ipSearch = document.getElementById("submit");
const ipForm = document.querySelector("#input");
const ipAddress = document.querySelector(".address");
const ipLocation = document.querySelector(".location");
const ipTimezone = document.querySelector(".timezone");
const ipIsp = document.querySelector(".isp");

// Map Init
let displayMap = (lat, long) => {
  var container = L.DomUtil.get("map");
  if (container != null) {
    container._leaflet_id = null;
  }

  let map = L.map("map", {
    zoomControl: true,
  });
  map.zoomControl.setPosition("bottomright");
  map.setView([lat, long], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  let myIcon = L.icon({
    iconUrl: "./images/icon-location.svg",
    iconAnchor: [lat, long],
  });

  let marker = L.marker([lat, long], { icon: myIcon }).addTo(map);
};

// Fetch
let getIpDetails = (ip) => {
  fetch(
    `https://geo.ipify.org/api/v1?apiKey=at_LluZaWTFBybtezVOvix1Qa20F8BDz&ipAddress=${ip}`
  )
    .then((res) => res.json())
    .then((data) => {
      ipAddress.innerText = data.ip;
      ipLocation.innerText = `${data.location.city}, ${data.location.country}`;
      ipTimezone.innerText = `UTC ${data.location.timezone}`;
      ipIsp.innerText = data.isp;
      displayMap(data.location.lat, data.location.lng);
    });
};

// Event
ipBtn.addEventListener("submit", (e) => {
  e.preventDefault();
  getIpDetails(ipForm.value);
  ipForm.value = "";
});

ipSearch.addEventListener("click", getIpDetails(ipForm.value));
