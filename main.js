const url = "https://opentdb.com/api.php?amount=10";
const box = document.querySelectorAll(".boxes");
const first = document.querySelector(".container");
const second = document.querySelector(".question_cont");

const question = [];
let current = 0;
box_choice();
// from 9 to 32;
async function fetch_dat(api_url) {
  const response = await fetch(api_url);
  const data = await response.json();
  console.log(data);
  for (let index = 0; index < 10; index++) {
    question[index] = {
      id: index + 1,
      quest: data.results[index].question,
      answer: data.results[index].correct_answer,
      wrong: data.results[index].incorrect_answers,
    };
  }
  console.log(question[2].id);
  console.log(question[2].quest);
  console.log(question[2].wrong[1]);

  // showQuestion();
}

// function rando_ans(){

// }
// function showQuestion(){
//   const questi = question[index];
//   let que = document.getElementById("question").textContent = questi.quest;
//   let an1 = document.getElementById("answ1");
//   let an2 = document.getElementById("answ2");
//   let an3 = document.getElementById("answ3");
//   let an4 = document.getElementById("answ4");
// }
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
