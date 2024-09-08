const url = "https://opentdb.com/api.php?amount=10";
const box = document.querySelectorAll('.boxes');

box_choice();
// from 9 to 32;


async function fetch_dat(api_url){
  const response = await fetch(api_url);
  const data = await response.json();
  console.log(data);
}



function box_choice(){
  const boxes = document.querySelectorAll('.boxes');  
  boxes.forEach((box) => {
    box.addEventListener('click' , function(){
      let info = ID(this.id);
      url_code =`${url}&category=${info}&type=multiple`;
      console.log(url_code);
      // fetch_data(url_code);
      fetch_dat(url_code);  
    })
  });    
  
}  

function ID(data){
  let x = data.slice(1,data.lenght);
  x=parseInt(x)+8;
  return x;
}  

