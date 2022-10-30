"use strict"



// ========= Dynamic Options ======== //
function SelectedOptions() {
  regions.sort();
  regions.forEach((e) => {
    let option = document.createElement("option");
    option.setAttribute("value", `${e}`);
    option.innerHTML = e;
    $("#regions").appendChild(option)

  })
}
SelectedOptions();

function SetItems(){
  $("#regions").addEventListener('change', (e)=>{
        localStorage.setItem("Region", e.target.value);
        $(".selectedRegion").innerHTML = e.target.value;
  })
}
 SetItems()

let  region = localStorage.getItem('Region')
$(".selectedRegion").innerHTML = region;
$("#regions").value  = region;


// ================= CURRENT TIME =============== //

function clock() {
   setInterval(() => {
      const date = new Date();
      $(".currentTime").innerHTML = `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`;
   }, 1000);
}

clock();


// =============== weekly Request Api ===================== //

const API_URL = `https://islomapi.uz/api/`; 








async function ReadyToFind(){
    $("#readyToFind").addEventListener('click', (e)=>{
       e.preventDefault();
          fetch(API_URL + "monthly?region=" + $('#regions').value + "&month=" + $("#getMonth").value )
            .then((res) => res.json())

            .then((data) => {
              localStorage.setItem("Times", JSON.stringify(data));
              const times = JSON.parse(localStorage.getItem("Times") ? localStorage.getItem("Times") : []);

              $(".weekly").innerHTML = "";

              times.forEach((e) => {
                let weeklyDay = document.createElement("div");
                  weeklyDay.setAttribute("class", "weekly");
                  weeklyDay.innerHTML = `
                                   <div class="w-100  text-light text-center p-4" id="weekday">${e.month} - oy  ${e.day} - kuni ${e.weekday}</div>
                                   <div class="mainWrapper d-flex justify-content-between flex-wrap m-0">
                                    <div class="card">
                                        <h4 class="cardHeading">Tong</h4>
                                        <img src="./img/tong.svg" alt="">
                                        <span class="actualDate ActualTong">${e.times.tong_saharlik}</span>
                                    </div>
                                    <div class="card">
                                        <h4 class="cardHeading">Quyosh</h4>
                                        <img src="./img/quyosh.svg" alt="">
                                        <span class="actualDate ActualQuyosh">${e.times.quyosh}</span>
                                    </div>
                                    <div class="card">
                                        <h4 class="cardHeading">Peshin</h4>
                                        <img src="./img/peshin.svg" alt="">
                                        <span class="actualDate ActualPeshin">${e.times.peshin}</span>
                                    </div>
                                    <div class="card">
                                        <h4 class="cardHeading">Asr</h4>
                                        <img src="./img/asr.svg" alt="">
                                        <span class="actualDate ActualAsr">${e.times.asr}</span>
                                    </div>
                                    <div class="card">
                                        <h4 class="cardHeading">Shom</h4>
                                        <img src="./img/shom.svg" alt="">
                                        <span class="actualDate actualShom">${e.times.shom_iftor}</span>
                                    </div>
                                    <div class="card">
                                        <h4 class="cardHeading">Xufton</h4>
                                        <img src="./img/xufton.svg" alt="">
                                        <span class="actualDate ActualXufton">${e.times.hufton}</span>
                                    </div>
                            </div>
                        `;
                  $(".weekly").appendChild(weeklyDay);
                  console.log(e);
              })
              
            })
            .catch((err) => console.log(err));

  })

}
ReadyToFind()

function SaveData() {
  const times = JSON.parse(localStorage.getItem("Times") ? localStorage.getItem("Times") : []);

  $(".weekly").innerHTML = "";

  times.forEach((e) => {
    let weeklyDay = document.createElement("div");
    weeklyDay.setAttribute("class", "weekly");
    weeklyDay.innerHTML = `
                                   <div class="w-100  text-light   text-center p-4" id="weekday">${e.month} - oy  ${e.day} - kuni ${e.weekday}</div>
                                <div class="mainWrapper d-flex justify-content-between flex-wrap m-0">
                                    <div class="card">
                                        <h4 class="cardHeading">Tong</h4>
                                        <img src="./img/tong.svg" alt="">
                                        <span class="actualDate ActualTong">${e.times.tong_saharlik}</span>
                                    </div>
                                    <div class="card">
                                        <h4 class="cardHeading">Quyosh</h4>
                                        <img src="./img/quyosh.svg" alt="">
                                        <span class="actualDate ActualQuyosh">${e.times.quyosh}</span>
                                    </div>
                                    <div class="card">
                                        <h4 class="cardHeading">Peshin</h4>
                                        <img src="./img/peshin.svg" alt="">
                                        <span class="actualDate ActualPeshin">${e.times.peshin}</span>
                                    </div>
                                    <div class="card">
                                        <h4 class="cardHeading">Asr</h4>
                                        <img src="./img/asr.svg" alt="">
                                        <span class="actualDate ActualAsr">${e.times.asr}</span>
                                    </div>
                                    <div class="card">
                                        <h4 class="cardHeading">Shom</h4>
                                        <img src="./img/shom.svg" alt="">
                                        <span class="actualDate actualShom">${e.times.shom_iftor}</span>
                                    </div>
                                    <div class="card">
                                        <h4 class="cardHeading">Xufton</h4>
                                        <img src="./img/xufton.svg" alt="">
                                        <span class="actualDate ActualXufton">${e.times.hufton}</span>
                                    </div>
                            </div>
                        `;
    $(".weekly").appendChild(weeklyDay);
    console.log(e);
  });
}

SaveData();





$("#mode").addEventListener("click", (e) => {
  localStorage.setItem("Theme", JSON.stringify(e.target.classList.contains("lightmode") ? "darkmode" : "lightmode"));

  if (e.target.classList.contains("darkmode")) {

    e.target.classList.remove("darkmode");

    let mode = JSON.parse(localStorage.getItem("Theme")); 

    e.target.classList.add(mode);

    switch(mode){
      case 'lightmode':
        $('body').setAttribute('class', 'active');
        break;
      case 'darkmode':
        $('body').setAttribute('class', 'default')
        break;

    }

  } else if (e.target.classList.contains("lightmode")) {

    e.target.classList.remove("lightmode");

    let mode = JSON.parse(localStorage.getItem("Theme"));
    
    e.target.classList.add(mode);

      switch (mode) {
        case "lightmode":
          $("body").setAttribute("class", "active");
          break;
        case "darkmode":
          $("body").setAttribute("class", "default");
          break;
      }
  }


});

function saveData(){

  if ($('#mode').classList.contains("darkmode")) {

    $('#mode').classList.remove("darkmode");

    let mode = JSON.parse(localStorage.getItem("Theme"));

    $('#mode').classList.add(mode);

       switch (mode) {
         case "lightmode":
           $("body").setAttribute("class", "active");
           break;
         case "darkmode":
           $("body").setAttribute("class", "default");
           break;
       }

  } else if ($('#mode').classList.contains("lightmode")) {

    $('#mode').classList.remove("lightmode");

    let mode = JSON.parse(localStorage.getItem("Theme"));

    $('#mode').classList.add(mode);

         switch (mode) {
           case "lightmode":
             $("body").setAttribute("class", "active");
             break;
           case "darkmode":
             $("body").setAttribute("class", "default");
             break;
         }

  }
}

saveData();











