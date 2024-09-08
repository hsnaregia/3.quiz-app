const url = "https://opentdb.com/api.php?amount=10";
const box = document.querySelectorAll(".boxes");
const first = document.querySelector(".container");
const second = document.querySelector(".question_cont");
let que = document.getElementById("question");
let an1 = document.getElementById("answ1");
let an2 = document.getElementById("answ2");
let an3 = document.getElementById("answ3");
let an4 = document.getElementById("answ4");

let questions = [];
let right_answ = [];
let wrng_answr = [];
box_choice();
// from 9 to 32;
async function fetch_dat(api_url) {
  const response = await fetch(api_url);
  const data = await response.json();
  console.log(data);
  for (let index = 0; index < 10; index++) {
    questions[index] = data.results[index].question;

    right_answ[index] = data.results[index].correct_answer;

    wrng_answr[index] = data.results[index].incorrect_answers;
  }
  console.log(questions);
  console.log(right_answ);
  console.log(wrng_answr);

  question_maker();
}

function box_choice() {
  const boxes = document.querySelectorAll(".boxes");
  boxes.forEach((box) => {
    box.addEventListener("click", function () {
      let info = ID(this.id);
      url_code = `${url}&category=${info}&type=multiple`;
      console.log(url_code);
      setTimeout(() => {
        first.classList.add("hide");
        first.classList.remove("show");
        second.classList.add("show");
        second.classList.remove("hide");
      }, 1000);
      fetch_dat(url_code);
    });
  });
}

function ID(data) {
  let x = data.slice(1, data.lenght);
  x = parseInt(x) + 8;
  return x;
}

function question_maker() {}
