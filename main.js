const url = "https://opentdb.com/api.php?amount=10";
const box = document.querySelectorAll(".boxes");
const first = document.querySelector(".container");
const second = document.querySelector(".question_cont");
const buttons = document.querySelectorAll(".btn");
const show_score = document.getElementById('score');
const last_page = document.querySelector('.end-game-screen');
let used_Nums = [];
let question = [];
let user_answers=[];
let correct_answers=[];
let score = 0;
box_choice();


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

  play();
}
function answerCheck(question) {
  
  for (let index = 0; index < 4; index++) {
    if (buttons[index].innerText == question.answer) {
      buttons[index].classList.add("correct"); 
      correct_answers.push(index+1);
    } else {
      buttons[index].classList.add("incorrect"); 
    }
  }
}

function play() {
  let counter = 0;

  showQuestion(counter);

  buttons.forEach((point, index) => {
    point.addEventListener('click', function () {
      let choice_id = this.children[0].id;
      
      user_answers.push(choice_id.slice(4,5));
      answerCheck(question[counter]);

      setTimeout(() => {
        buttons.forEach((btn) => {
          btn.classList.remove("correct", "incorrect");
        });

        counter++;

        
        if (counter < question.length) {
          used_Nums=[];
          showQuestion(counter);
        } else {
          console.log('Quiz complete. User answers:', user_answers);
          endQuiz(); 
        }
      }, 2000); 
    });
  });
}


function rand_generator(maxNr) {
  let random = Math.trunc(Math.random() * maxNr) + 1;

  if (!used_Nums.includes(random)) {
    used_Nums.push(random);
    return random;
  } else {
    if (used_Nums.length < maxNr) {
      return rand_generator(maxNr);
    } else {
      console.log("No more numbers available.");
      return false;
    }
  }
}

function showQuestion(questionNumber) {
  const questi = question[questionNumber];
  document.getElementById("quiz").innerText = questi.quest;
  let array_answ = [...questi.wrong];
  array_answ.push(questi.answer);

  for (let index = 0; index < 4; index++) {
    rand_generator(4);
    console.log(used_Nums);

    document.getElementById(`answ${used_Nums[index]}`).innerText =
      array_answ[index];
  }
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


function endQuiz(){
  console.log(user_answers);
  console.log(correct_answers);
  for(let index = 0; index<9 ; index++){
    if(user_answers[index]==correct_answers[index]){
      score+=200;
    }
    else
    {
      if(score>100){
        score-=50;
      }
    }
  }

}

document.addEventListener('DOMContentLoaded', () => {
      const load = document.querySelector(".loading");

  function reload() {
show_score.innerText=`you scored ${score}`;
 load.addEventListener('click', function() {
  load.classList.add("loader");
  setTimeout(() => {
   last_page.classList.add('hide');
   last_page.classList.remove('show');
    first.classList.add('show');
    first.classList.remove('hide');
     used_Nums = [];
     question = [];
     user_answers=[];
     correct_answers=[];
     score = 0;
   }, 4000);
   });
   }

 reload();
});