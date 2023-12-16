//https://www.w3schools.com/css/css3_animations.asp
let cards;
let category = ["Animals", "Movies","Riddles","Candies","Disney","Fun Fact"];
let categories = [animals,movies,riddles,Candies,Disney,Fun_Facts];
let build=""; 
let build2="";
let scores = 0;
let someone_has_pressed = false;
let key;
let timer = 10;
let play = false;
let num = 0;
let players = [
  {"player":1,"score":0,"name":""},
  {"player":2,"score":0,"name":""},
  {"player":3,"score":0,"name":""},
  {"player":4,"score":0,"name":""}
]
let count;
let total = 0;
let winner;

let sound = new Howl({
  src: ['correct.mp3'],
  volume: 0.13
});

let incorrect = new Howl({
  src: ['wrong.mp3'],
  volume: 0.13
});

let song = new Howl({
  src: ['jeopardy.mp3'],
  loop:true,
  volume: 0.01
});

let ding = new Howl({
  src: ['ding.mp3'],
  volume: 0.13
}); 

function init(){
  song.play();
  count = localStorage.getItem("count");
  let op = document.getElementById("output");
  const card = document.getElementById("card");
  document.getElementById("output2").innerHTML = updateScoreBoard();
  window.addEventListener("keypress",function(e){
    if( !someone_has_pressed  && play){
      if(e.key == "a"){
        document.getElementById("h1").classList.toggle("glow2");
        console.log("Player 1");
        ding.play();
        someone_has_pressed = true;
      }
      if(e.key == "p"){
        console.log("Player 2");
        ding.play();
        document.getElementById("h2").classList.toggle("glow2");
        someone_has_pressed = true;
      }
      if(e.key == "n"){
        console.log("Player 3");
        ding.play();
        document.getElementById("h3").classList.toggle("glow2");
        someone_has_pressed = true;
      }
      if(e.key == "t"){
        console.log("Player 4");
        ding.play();
        document.getElementById("h4").classList.toggle("glow2");
        someone_has_pressed = true;
      }
      key = e.key;
    }
  })

  
  for(let i=0; i <=5; i++){
    build += `<div class="category">`;
    build +=    `<h3>${category[i]}</h3>`;
    build += `</div>`;
  }
point = 0;
for(let i=0; i <=4 ; i++){
  point += 100;

  for(let j=0; j <=5 ; j++){
    let order = [0,1,2,3];
    order.sort(() => Math.random() - 0.5);
    let x = order[0];
    let y = order[1];
    let z = order[2];
    let p = order[3];
    build +=`<div class="card" id="card${j}_${i}">`;
    build +=    `<div class="front">`
    build +=      `<h3>${point}</h3>`;
    build +=    `</div>`
    build +=    `<div class="back">`
    build +=      `<h4>${categories[j][i].q}</h4>`;
    if(categories[j][i].boo==0){
      build +=      `<img src=${categories[j][i].img} height= "100" width= "100">`;
    }

    if(categories[j][i].boo == 2){
      build +=      `<audio controls>`;
      build +=        `<source src=${categories[j][i].quote} type="audio/mpeg">`;
      build +=      `</audio>`;
    }
    build +=      `<br>`;
    build +=      `<input type="radio"  name="q${j}_${i}" value="${categories[j][i]["a"][x]}">
         <label for="ca" >${categories[j][i]["a"][x]}</label><br>`
    build +=      `<input type="radio"  name="q${j}_${i}" value="${categories[j][i]["a"][y]}">
         <label for="ca" >${categories[j][i]["a"][y]}</label><br>`
    build +=      `<input type="radio"  name="q${j}_${i}" value="${categories[j][i]["a"][z]}">
         <label for="ca" >${categories[j][i]["a"][z]}</label><br>`
    build +=      `<input type="radio"  name="q${j}_${i}" value="${categories[j][i]["a"][p]}">
         <label for="ca" >${categories[j][i]["a"][p]}</label><br>`
    build += `<input type="button" onclick="checkAnswer(${j},${i})" value="Check">`
    build +=    `</div>`
    build +=`</div>`;
  }
}
  op.innerHTML=build;
  cards = document.querySelectorAll(".card .front");
  for(let i = 0; i < cards.length; i++){
    cards[i].addEventListener("click", function(){
      if(!this.parentElement.classList.contains("flipCard") && someone_has_pressed){
        this.parentElement.classList.toggle("flipCard");
      } 
    });
  }
updateTime();
}


function checkAnswer(j,i){
  let user_answer = document.querySelector(`input[name="q${j}_${i}"]:checked`).value;
  if(categories[j][i]["a"][0] == user_answer){
    scores = categories[j][i]["score"];
    if(key == "a"){
      players[0].score += scores;
    }else if(key == "p"){
      players[1].score += scores;
    }else if(key == "n"){
      players[2].score += scores;
    }else if(key == "t"){
      players[3].score += scores;
    }
    sound.play();
  }else{
    incorrect.play();
    document.getElementById(`card${j}_${i}`).classList.toggle("flipCard");
  }
  document.getElementById("output2").innerHTML = updateScoreBoard();
  total = players[0].score + players[1].score + players[2].score + players[3].score;
  if(total == 9000){
    if((players[0].score > players[1].score) && (players[0].score > players[2].score) && (players[0].score > players[3].score)){
      localStorage.setItem("winner", "Player 1 Wins!!!");
    }else if((players[1].score > players[0].score) && (players[1].score > players[2].score) && (players[1].score > players[3].score)){
      localStorage.setItem("winner", "Player 2 Wins!!!");
    }else if((players[2].score > players[0].score) && (players[2].score > players[1].score) && (players[2].score > players[3].score)){
      localStorage.setItem("winner", "Player 3 Wins!!!");
    }else if((players[3].score > players[0].score) && (players[3].score > players[1].score) && (players[3].score > players[2].score)){
      localStorage.setItem("winner", "Player 4 Wins!!!");
    }
    window.location.href = "end.html";
  }
  someone_has_pressed = false;
  timer = 10;
  play = false;
  key = "";
}
function setPlayers(amt){
  localStorage.setItem("count", amt);
  window.location.href = "play.html";
}

function updateScoreBoard(){
  build2 = "";
  for(let t=0; t<count; t++){
    build2 += `<h3 id="h${t+1}">Player ${players[t]["player"]}:${players[t]["score"]}</h3>`;
  }
  return build2;
}

function updateTime(){
  if(timer > 0){
    timer--;
  }else{
    play = true;
  }

  if(timer > 6){
    document.getElementById("output3").style.color = "#f23a50";
  }else if(timer > 3){
    document.getElementById("output3").style.color = "#fafa69";
  }else{
    document.getElementById("output3").style.color = "#bdfab9";
  }
  
  document.getElementById("output3").innerHTML = timer;
  setTimeout(updateTime,1000);
  
}



