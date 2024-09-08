const url = "https://opentdb.com/api.php?amount=10";
const box = document.querySelectorAll('.boxes');

box_choice();
// from 9 to 32;

function fetch_data(api_url) {
  fetch(api_url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json(); 
    })
    .then(data => {
      console.log('Trivia Questions:', data.results);
      data.results.forEach((question, index) => {
        console.log(`${index + 1}. ${question.question} (Category: ${question.category})`);
      });
    })
    .catch(error => {
      console.error('Error fetching the trivia questions:', error);
    });
}



function box_choice(){
  const boxes = document.querySelectorAll('.boxes');  
  boxes.forEach((box) => {
    box.addEventListener('click' , function(){
      let info = ID(this.id);
      url_code =`${url}&category=${info}`;
      console.log(url_code);
      fetch_data(url_code);
      })
  });    
  
}  

function ID(data){
  let x = data.slice(1,data.lenght);
  x=parseInt(x)+8;
  return x;
}  


