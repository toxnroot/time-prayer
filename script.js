/*
=========================
    GEt Element From Html
=========================
*/

let sel = document.getElementById("sel");
let title = document.getElementById("title");
let fajr = document.getElementById("fajr");
let sunrise = document.getElementById("sunrise");
let duhr = document.getElementById("duhr");
let asr = document.getElementById("asr");
let moghreb = document.getElementById("moghreb");
let aisha = document.getElementById("aisha");
let errorE = document.getElementById("error");

/* 
=======End GEt Html======
*/
getApi("Al Qāhirah");

// Make a request for a pryer time with a given time
function getApi(city = "") {
  axios
    .get("https://api.aladhan.com/v1/timingsByCity", {
      params: {
        city: city,
        country: "EG",
      },
    })
    .then(function (response) {
      // handle success
      let time = response.data.data.timings;

      getTime(time);
      
    })
    .catch(function (error) {
      // handle error
      console.log(error.message);
      
    })
    .finally(function () {
      // always executed
    });
}

function getTime(time) {
  fajr.textContent = time.Fajr;
  sunrise.textContent = time.Sunrise;
  duhr.textContent = time.Dhuhr;
  asr.textContent = time.Asr;
  moghreb.textContent = time.Maghrib;
  aisha.textContent = time.Isha;
}

let listOp = [
  {
    cityy: "القاهرة",
    cityName: "Al Qāhirah",
  },
  {
    cityy: "الشرقية",
    cityName: "Ash Sharqīyah",
  },
  {
    cityy: "الجيزة",
    cityName: "Al Jīzah",
  },
  {
    cityy: "الاسكندرية",
    cityName: "Al Iskandarīyah",
  },
  {
    cityy: "الأقصر",
    cityName: "Luxor",
  },
  {
    cityy: "اسوان",
    cityName: "Aswān",
  },
  {
    cityy: "سيناء",
    cityName: "Shamāl Sīnā",
  },
];
listOp.forEach((element) => {
  let option = document.createElement("option");
  option.setAttribute("value", element.cityName);
  option.textContent = element.cityy;
  sel.append(option);
});

/* =============================================
   effict get value and text from Element Option
   =============================================
   */
sel.addEventListener("change", () => {
  let opsValue = sel.options[sel.selectedIndex].value;
  let opsText = sel.options[sel.selectedIndex].text;
  getApi(opsValue);
  title.textContent = opsText;
});
