//D - Diamond; H - Heart, C - Club, S - Spade
var cards = ["D2","D3","D4","D5","D6","D7","D8","D9","DJ","DQ","DK","DA",
"H2","H3","H4","H5","H6","H7","H8","H9","HJ","HQ","HK","HA",
"C2","C3","C4","C5","C6","C7","C8","C9","CJ","CQ","CK","CA",
"S2","S3","S4","S5","S6","S7","S8","S9","SJ","SQ","SK","SA",
            ]

//when someone fold it should change to true
var myFold=false;
var firstPlayerFold=false;
var secondPlayerFold=false;
var thirdPlayerFold=false;

var myFinalCombination = new Array(7);
var firstOpponentFinalCombination = new Array(7);
var secondOpponentFinalCombination = new Array(7);
var thirdOpponentFinalCombination = new Array(7);

let myMoney = 500;
let firstOpponentMoney=500;
let secondOpponentMoney=500;
let thirdOpponentMoney=500;
let smallBlind = 10;
let bigBlind = 20;
let currentSmallBlind=1;
let currentBigBlind=2;
let hasAnyoneRaised = false;

function showMoney(player){
    if(player == 'me'){
        document.getElementById('myMoney').innerHTML = myMoney;
    }else if(player == 'first'){
        document.getElementById('firstOpponentMoney').innerHTML=firstOpponentMoney;
    }else if(player == 'second'){
        document.getElementById('secondOpponentMoney').innerHTML=secondOpponentMoney;
    }else if(player == 'third'){
        document.getElementById('thirdOpponentMoney').innerHTML = thirdOpponentMoney;
    }
}


function generateHands(cards){
    let hands;
    let hands1Number = Math.floor(Math.random() * cards.length);
    let card1 = cards[hands1Number];
    cards.splice(hands1Number, 1); 
    //console.log(cards);

    let hands2Number = Math.floor(Math.random() * cards.length);
    let card2 = cards[hands2Number];
    cards.splice(hands2Number, 1); 
    //console.log(cards);
    return card1 + card2;    
}
function generateFlop(cards){
    let flop1Number = Math.floor(Math.random() * cards.length);
    
    let flop1= cards[flop1Number];
    cards.splice(flop1Number, 1);
    
    let flop2Number = Math.floor(Math.random() * cards.length);
    let flop2= cards[flop2Number];
    cards.splice(flop2Number, 1); 

    
    let flop3Number = Math.floor(Math.random() * cards.length);
    let flop3= cards[flop3Number];
    cards.splice(flop3Number, 1);

    //first,second third Card of the flopp should be in a finalcombination
    myFinalCombination[2] = flop1; myFinalCombination[3] = flop2; myFinalCombination[4] = flop3; 
    firstOpponentFinalCombination[2] = flop1; firstOpponentFinalCombination[3] = flop2; firstOpponentFinalCombination[4] = flop3; 
    secondOpponentFinalCombination[2] = flop1; secondOpponentFinalCombination[3] = flop2; secondOpponentFinalCombination[4] = flop3; 
    thirdOpponentFinalCombination[2] = flop1; thirdOpponentFinalCombination[3] = flop2; thirdOpponentFinalCombination[4] = flop3; 

    return flop1+flop2+flop3;
}

function generateTurn(cards){
    let turnNumber = Math.floor(Math.random() * cards.length);

    let turn = cards[turnNumber];
    cards.splice(turnNumber,1);

    myFinalCombination[5] = turn;
    firstOpponentFinalCombination[5] = turn;
    secondOpponentFinalCombination[5] = turn;
    thirdOpponentFinalCombination[5] = turn;
    return turn;
}

function generateRiver(cards){
    let riverNumber = Math.floor(Math.random() * cards.length);

    let river = cards[riverNumber];
    cards.splice(riverNumber,1);

    myFinalCombination[6] = river;
    firstOpponentFinalCombination[6] = river;
    secondOpponentFinalCombination[6] = river;
    thirdOpponentFinalCombination[6] = river;

    return river;
}
function showFlop(){
    let flop = generateFlop(cards);
    flop1Card = flop.substring(0, 2);
    flop2Card = flop.substring(2, 4);
    flop3Card = flop.substring(4, 6);

    document.getElementById('flop1Card').innerHTML = flop1Card;
    document.getElementById('flop2Card').innerHTML = flop2Card;
    document.getElementById('flop3Card').innerHTML = flop3Card;
}

function showTurn(){
    let turnCard = generateTurn(cards);
    document.getElementById('turnCard').innerHTML = turnCard;
}

function showRiver(){
    let riverCard =  generateRiver(cards);
    document.getElementById('riverCard').innerHTML = riverCard;
}

function showMyCards (hand){
    let card1 = hand.substring(0, 2);
    let card2 = hand.substring(2,4);

    myFinalCombination[0] = card1;
    myFinalCombination[1] = card2;

    document.getElementById('firstCard').innerHTML = card1;
    document.getElementById('secondCard').innerHTML = card2;
}

function showFirstOpponentCards (hand){
    let card1 = hand.substring(0, 2);
    let card2 = hand.substring(2,4);

    firstOpponentFinalCombination[0] = card1;
    firstOpponentFinalCombination[1] = card2;

    document.getElementById('thirdCard').innerHTML = card1;
    document.getElementById('fourthCard').innerHTML = card2;
}

function showSecondOpponentCards (hand){
    let card1 = hand.substring(0, 2);
    let card2 = hand.substring(2,4);

    secondOpponentFinalCombination[0] = card1;
    secondOpponentFinalCombination[1] = card2;

    document.getElementById('fifthCard').innerHTML = card1;
    document.getElementById('sixthCard').innerHTML = card2;
}

function showThirdOpponentCards (hand){
    let card1 = hand.substring(0, 2);
    let card2 = hand.substring(2,4);

    thirdOpponentFinalCombination[0] = card1;
    thirdOpponentFinalCombination[1] = card2;

    document.getElementById('seventhCard').innerHTML = card1;
    document.getElementById('eighthCard').innerHTML = card2;
}

function nextTurn(){
    smallBlind++;
    bigBlind++;
}

function fold(player){
    if(player == 'me'){
        document.getElementById('firstCard').style.display = 'none';
        document.getElementById('secondCard').style.display = 'none';
        myFold = true;
        myHand = '';
    }else if(player == 'first'){
        document.getElementById('thirdCard').style.display = 'none';
        document.getElementById('fourthCard').style.display = 'none';
        firstPlayerFold = true;
        opponent1Hand = '';
    }else if(player == 'second'){
        document.getElementById('fifthCard').style.display = 'none';
        document.getElementById('sixthCard').style.display = 'none';
        secondPlayerFold = true;
        opponent2Hand = '';
    }else if(player == 'third'){
        document.getElementById('seventhCard').style.display = 'none';
        document.getElementById('eighthCard').style.display = 'none';
        thirdPlayerFold=true;
        opponent3Hand = '';
    } 
}

function call(player,amountOfMoney){
    if(player=='me'){
        myMoney -= amountOfMoney;
    }else if(player =='first'){
        firstOpponentMoney -= amountOfMoney;
    }else if(player == 'second'){
        secondOpponentMoney -= amountOfMoney;
    }else if(player == 'third'){
        thirdOpponentMoney -= amountOfMoney;
    } 
    
}



function raise(player,amountOfMoney){

}

function requireCall(player){
    
}

function calculateWinner(){

}

function checkPair(array){
    let numberOf2=0;let numberOf3=0;let numberOf4=0;let numberOf5=0;
    let numberOf6=0;let numberOf7=0;let numberOf8=0;let numberOf9=0;
    let numberOfJ=0;let numberOfQ=0;let numberOfK=0;let numberOfA=0;
    for(let i = 0; i < array.length; i++){
        switch(array[i][1]){
            case '2':
                numberOf2++;
                break;
            case '3':
                numberOf3++;
                break;
            case '4':
                numberOf4++;
                break;
            case '5':
                numberOf5++;
                break;
            case '6':
                numberOf6++;
                break;
            case '7':
                numberOf7++;
                break;
            case '8':
                numberOf8++;
                break;
            case '9':
                numberOf9++;
                break;
            case 'J':
                numberOfJ++;
                break;
            case 'Q':
                numberOfQ++;
                break;
            case 'K':
                numberOfK++;
                break;
            case 'A':
                numberOfA++;
                break;

        }
        
    }if(numberOf2>1|numberOf3>1|numberOf4>1|numberOf5>1|numberOf6>1|numberOf7>1|numberOf8>1|
        numberOf9>1|numberOfJ>1|numberOfQ>1|numberOfK>1|numberOfA>1){
            return true;
        }else{
            return false;
        }
}

function checkFlush(array){
    countOfC = 0;
    countOfD = 0;
    countOfH = 0;
    countOfS = 0;
    for (let i = 0; i <array.length;i++){
        if(array[i][0] === 'C')countOfC++;
        if(array[i][0] === 'D')countOfD++;
        if(array[i][0] === 'H')countOfH++;
        if(array[i][0] === 'S')countOfS++;
    }console.log(countOfC);
    console.log(countOfD);
    console.log(countOfH);
    console.log(countOfS);
    if(countOfC>4 || countOfD > 4 || countOfH > 4 || countOfS >4){
        return true;
    }else{
        return false;
    }
}

function isPair(user){
    if(user == 'me'){
        return checkPair(myFinalCombination);
    }else if(user == 'first'){
        return checkPair(firstOpponentFinalCombination);
    }else if(user == 'second'){
        return checkPair(secondOpponentFinalCombination);
    }else if(user == 'third'){
        return checkPair(thirdOpponentFinalCombination);
    }
}

function isThreeOfAKind(){

}


function isFlush(user){
    if(user == 'me'){
        return checkFlush(myFinalCombination);
    }else if(user == 'first'){
        return checkFlush(firstOpponentFinalCombination);
    }else if(user == 'second'){
        return checkFlush(secondOpponentFinalCombination);
    }else if(user == 'third'){
        return checkFlush(thirdOpponentFinalCombination);
    }
}

function isStraight(){

}

function isFullHouse(){

}

function isFourOfAKind(){

}

function isStraightFlush(){

}

function isRoyalFlush(){

}

function addPotToWinner(player){
    if('me'){
        myMoney += pot;
    }else if(player =='first'){
        firstOpponentMoney += pot;
    }else if(player == 'second'){
        secondOpponentMoney += pot;
    }else if(player == 'third'){
        thirdOpponentMoney += pot;
    } 
}


function gameOver(){
    let gameOverButton = document.getElementById('gameOver');
    gameOverButton.style.display = "block";
}

let myHand = generateHands(cards);
let opponent1Hand = generateHands(cards);
let opponent2Hand = generateHands(cards);
let opponent3Hand = generateHands(cards);

//console.log(myHand);
showMyCards(myHand);
showFirstOpponentCards(opponent1Hand);
showSecondOpponentCards(opponent2Hand);
showThirdOpponentCards(opponent3Hand);
showMoney('me');
showMoney('first');
showMoney('second');
showMoney('third');
showFlop();
showTurn();
showRiver();
console.log(isFlush('first'));
console.log(isPair('me'));
console.log(myFinalCombination);
console.log(firstOpponentFinalCombination);
console.log(secondOpponentFinalCombination);
console.log(thirdOpponentFinalCombination);