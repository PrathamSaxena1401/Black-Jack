let game = {
    "you":{'scorespan':'#uscore','div':'#yb','score':0},
    "dealer":{'scorespan':'#dscore','div':'#db','score':0},
    "cards":['2','3','4','5','6','7','8','9','10','A','K','Q','J'],
    "cardsmap":{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'A':11,'K':10,'Q':10,'J':10},
    "wins": 0,
    "loss": 0,
    "draws":0,
    "isstand":false,
    "turnover":false,

};
const YOU =game['you'];
const DEALER =game['dealer'];
const CARDS=game['cards'];
const hitsound =new Audio('sounds/swish.m4a')
const winsound =new Audio('sounds/cash.mp3')
const losssound =new Audio('sounds/aww.mp3')
const CM= game['cardsmap'];


document.querySelector('#hitbt').addEventListener("click",hitbt);
document.querySelector('#hitdeal').addEventListener("click",deal);
document.querySelector('#hitstand').addEventListener("click",stand);

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function stand(){
    game['isstand']=true;
   while(DEALER['score']<16 && game['isstand']===true){
    let card =randomcard();
    showcard(card,DEALER);
    scorecount(card,DEALER);
 showscore(DEALER);
 await sleep(1000);
}
    let winner =computewinner();
    showresult(winner);
    game['turnover'] =true;
 };

 function hitbt(){
  if(game['isstand']===false){
    let card =randomcard();
  showcard(card,YOU);
  scorecount(card,YOU);
  showscore(YOU);
  }
};

function deal(){
    if(game['turnover'] ===true){removecard(YOU);
    removecard(DEALER);
    document.querySelector('#top').innerHTML="Let's play with Computer";
    document.querySelector('#top').style.color="white";
    game['isstand']=false;
    game['turnover']=false;
    }
  };

function showcard(card,player){
    if(player['score']<=21){
    let cardimg=document.createElement('img');
    cardimg.src='images/'+card+'.png';
    document.querySelector(player['div']).appendChild(cardimg);
    hitsound.play();
    }
};
function randomcard(){
    let randomindex=Math.floor(Math.random()*13);
    return CARDS[randomindex];
}



function removecard(player){
    let yourimage =document.querySelector(player['div']).querySelectorAll('img');
   
    for(let i=0;i<yourimage.length;i++){
        yourimage[i].remove();
    };   
    player['score']=0;
    document.querySelector(player['scorespan']).innerHTML=player['score'];
    document.querySelector(player['scorespan']).style.color='white'; 
    
}
function scorecount(card,player){
  if(card==='A'){
      if(player['score']<=21){
        player['score']  += 11;  
      }
      else{
        player['score']  += 1;
      }
  }
  else{
    player['score']  += CM[card];
  }
}
  
function showscore(player){
    if(player['score'] >21){
    document.querySelector(player['scorespan']).innerHTML="BUST!";
    document.querySelector(player['scorespan']).style.color='red'; 
    }
    else{
    document.querySelector(player['scorespan']).innerHTML=player['score'];
    }
}


function computewinner(){
    let winner;

if(YOU['score'] <=21){
    if(YOU['score']>DEALER['score'] || DEALER['score']>21){
    winner = YOU;
    game['wins']++;
    document.querySelector('#win').innerHTML=game['wins'];
    }
   else if(YOU['score'] < DEALER['score']){
       winner = DEALER;
       game['loss']++;
       document.querySelector('#loss').innerHTML=game['loss'];
   }
   else if(YOU['score'] === DEALER['score']){
       game['draws']++;
       document.querySelector('#draw').innerHTML=game['draws'];
   }
}
else if(YOU['score']>21 && DEALER['score']<=21){
    winner = DEALER;
    game['loss']++;
    document.querySelector('#loss').innerHTML=game['loss'];

}
else if(YOU['score']>21 && DEALER['score']>21){
    game['draws']++;
    document.querySelector('#draw').innerHTML=game['draws'];
    
}
console.log('winner is',winner);
return winner;
}

function showresult(winner){
    let message , messagecolor;
    if (winner === YOU){
        message = "YOU WON!";
        messagecolor= "green";
        winsound.play();
    }
    else if(winner === DEALER){
        message ="YOU LOST!"
        messagecolor="red";
        losssound.play();
    }
    else{
        message ="YOU DREW!";
        messagecolor ="white";
    }

    document.querySelector('#top').innerHTML=message;
    document.querySelector('#top').style.color=messagecolor;
}