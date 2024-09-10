const url = "https://opentdb.com/api.php?amount=10";
const box = document.querySelectorAll(".boxes");
const first = document.querySelector(".container");
const second = document.querySelector(".question_cont");
let used_Nums=[];
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
      id: (index + 1),
      quest: data.results[index].question,
      answer: data.results[index].correct_answer+','+data.results[index].incorrect_answers,
      wrong: data.results[index].incorrect_answers,
    };
  }
  let x = 2;
  showQuestion(x+1);
}

function rand_generator(maxNr)
{
  let random = (Math.random() * maxNr).toFixed();

  //Coerce to number by boxing
  random = Number(random)+1;

  if(!used_Nums.includes(random)) {
      used_Nums.push(random);
      return random;
  } else {
      if(used_Nums < maxNr) {
        //Recursively generate number
       return  rand_generator(maxNr);
      } else {
        console.log('No more numbers available.')
        return false;
      }
  }
}


function showQuestion(questionNumber){
  const questi = question;
  document.getElementById("quiz").innerText = questi[questionNumber].quest;
  
 for(let index=0 ; index <4 ; index++)
  {
  
  rand_generator(4);
  console.log(used_Nums);
  document.getElementById(`answ${used_Nums[index]}`).textContent= questi[questionNumber].answer;

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
