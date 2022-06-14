//D - Diamond; H - Heart, C - Club, S - Spade
var cards = ["D2","D3","D4","D5","D6","D7","D8","D9","DT","DJ","DQ","DK","DA",
"H2","H3","H4","H5","H6","H7","H8","H9","HT","HJ","HQ","HK","HA",
"C2","C3","C4","C5","C6","C7","C8","C9","CT","CJ","CQ","CK","CA",
"S2","S3","S4","S5","S6","S7","S8","S9","ST","SJ","SQ","SK","SA",
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

var straight1 = ["2","3","4","5","6"]
var straight2 = ["3","4","5","6","7"]
var straight3 = ["4","5","6","7","8"]
var straight4 = ["5","6","7","8","9"]
var straight5 = ["6","7","8","9","T"]
var straight6 = ["7","8","9","T","J"]
var straight7 = ["8","9","T","J","Q"]
var straight8 = ["9","T","J","Q","K"]
var straight9 = ["T","J","Q","K","A"]

let myMoney = 500;
let firstOpponentMoney=500;
let secondOpponentMoney=500;
let thirdOpponentMoney=500;
let smallBlind = 10;
let bigBlind = 20;
let currentSmallBlind=1;
let currentBigBlind=2;
let hasAnyoneRaised = false;

let myScore = 0
let firstPLayerScore = 0
let secondPlayerScore = 0
let thirdPlayerScore = 0

let pot = 0

function getNumbers(array){
    numbers = []
    for(let i = 0; i < array.length;i++){
        numbers.push(array[i][1])
    }
    return numbers;
}



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

function calculateScoreMine(){
    if(myFold){
        return -1;
    }
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

function fold_command(){
    document.getElementById('firstCard').style.display = 'none';
    document.getElementById('secondCard').style.display = 'none';
    document.getElementById('myMoney').style.display = 'none';
    myFold = true;
    myScore = -1;
    myHand = '';
}

function fold(player){
    if(player == 'me'){
        document.getElementById('firstCard').style.display = 'none';
        document.getElementById('secondCard').style.display = 'none';
        myFold = true;
        myScore = -1;
        myHand = '';
    }else if(player == 'first'){
        document.getElementById('thirdCard').style.display = 'none';
        document.getElementById('fourthCard').style.display = 'none';
        firstPlayerFold = true;
        firstPLayerScore = -1;
        firstPlayerFold = true
        opponent1Hand = '';
    }else if(player == 'second'){
        document.getElementById('fifthCard').style.display = 'none';
        document.getElementById('sixthCard').style.display = 'none';
        secondPlayerFold = true;
        opponent2Hand = '';
        secondPlayerScore = -1;
        secondPlayerFold = true
    }else if(player == 'third'){
        document.getElementById('seventhCard').style.display = 'none';
        document.getElementById('eighthCard').style.display = 'none';
        thirdPlayerFold=true;
        thirdPlayerScore = -1;
        opponent3Hand = '';
        thirdPlayerFold = true
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

function checkPoker(array){
    let numberOf2=0;let numberOf3=0;let numberOf4=0;let numberOf5=0;
    let numberOf6=0;let numberOf7=0;let numberOf8=0;let numberOf9=0; let numberOfT = 0;
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
            case 'T':
                numberOfT++;
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
        
    }if(numberOf2>3|numberOf3>3|numberOf4>3|numberOf5>3|numberOf6>3|numberOf7>3|numberOf8>3|
        numberOf9>3|numberOfT > 3|numberOfJ>3|numberOfQ>3|numberOfK>3|numberOfA>3){
            return true;
        }else{
            return false;
        }
}

function checkThreeOfAKind(array){
    let numberOf2=0;let numberOf3=0;let numberOf4=0;let numberOf5=0;
    let numberOf6=0;let numberOf7=0;let numberOf8=0;let numberOf9=0;let numberOfT = 0;
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
            case 'T':
                numberOfT++;
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
        
    }if(numberOf2>2|numberOf3>2|numberOf4>2|numberOf5>2|numberOf6>2|numberOf7>2|numberOf8>2|
        numberOf9>2|numberOfT > 2|numberOfJ>2|numberOfQ>2|numberOfK>2|numberOfA>2){
            return true;
        }else{
            return false;
        }
}

function checkPair(array){
    let numberOf2=0;let numberOf3=0;let numberOf4=0;let numberOf5=0;
    let numberOf6=0;let numberOf7=0;let numberOf8=0;let numberOf9=0; let numberOfT = 0;
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
            case 'T':
                numberOfT++;
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
        numberOf9>1|numberOfT > 1|numberOfJ>1|numberOfQ>1|numberOfK>1|numberOfA>1){
            return true;
        }else{
            return false;
        }
}

function checkTwoPair(array){
    let numberOf2=0;let numberOf3=0;let numberOf4=0;let numberOf5=0;
    let numberOf6=0;let numberOf7=0;let numberOf8=0;let numberOf9=0; let numberOfT = 0;
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
            case 'T':
                numberOfT++;
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
    }
    twoPair = [numberOf2,numberOf3,numberOf4,numberOf5,numberOf6,numberOf7,numberOf8,numberOf9,numberOfT,numberOfJ,numberOfQ,numberOfK,numberOfA]
    count = 0
    for(i = 0; i < twoPair.length;i++){
        if(twoPair[i]===2)
            count++;
    }
    if(count == 2){
        return true;
    }
    return false;
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
    }
    if(countOfC>4 || countOfD > 4 || countOfH > 4 || countOfS >4){
        return true;
    }else{
        return false;
    }
}

function checkFullHouse(array){
    let numberOf2=0;let numberOf3=0;let numberOf4=0;let numberOf5=0;
    let numberOf6=0;let numberOf7=0;let numberOf8=0;let numberOf9=0; let numberOfT = 0;
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
            case 'T':
                numberOfT++;
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
        
    }if((numberOf2===2|numberOf3===2|numberOf4===2|numberOf5===2|numberOf6===2|numberOf7===2|numberOf8===2|
        numberOf9===2|numberOfT ===2|numberOfJ===2|numberOfQ===2|numberOfK===2|numberOfA===2)&&(numberOf2===3|numberOf3===3|numberOf4===3|numberOf5===3|numberOf6===3|numberOf7===3|numberOf8===3|
            numberOf9===3|numberOfT ===3|numberOfJ===3|numberOfQ===3|numberOfK===3|numberOfA===3)){
            return true;
        }else{
            return false;
        }
}

function isSameValue(array1,array2){
    if(array1.sort().join(',')=== array2.sort().join(',')){
        return true
    }
    return false
}

function checkStraight(array){
    justNumber = getNumbers(array)
    if(isSameValue(justNumber,straight1)|| isSameValue(justNumber,straight2)|| isSameValue(justNumber,straight3)
        || isSameValue(justNumber,straight3)||isSameValue(justNumber,straight4)||isSameValue(justNumber,straight5)
        || isSameValue(justNumber,straight6) || isSameValue(justNumber,straight7)|| isSameValue(justNumber,straight8)
        || isSameValue(justNumber,straight9)){
            return true;
        }
    return false;
}


function checkRoyalFlush(array){
    if(cards.includes("DT")&& cards.includes("DJ")&&cards.includes("DQ")
        &&cards.includes("DK")&&cards.includes("DA"))
        return true;
    if(cards.includes("HT")&& cards.includes("HJ")&&cards.includes("HQ")
        &&cards.includes("HK")&&cards.includes("HA"))
        return true;
    if(cards.includes("CT")&& cards.includes("CJ")&&cards.includes("CQ")
        &&cards.includes("CK")&&cards.includes("CA"))
        return true;
    if(cards.includes("ST")&& cards.includes("SJ")&&cards.includes("SQ")
        &&cards.includes("SK")&&cards.includes("SA"))
        return true;
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

function isTwoPair(user){
    if(user == 'me'){
        return checkTwoPair(myFinalCombination);
    }else if(user == 'first'){
        return checkTwoPair(firstOpponentFinalCombination);
    }else if(user == 'second'){
        return checkTwoPair(secondOpponentFinalCombination);
    }else if(user == 'third'){
        return checkTwoPair(thirdOpponentFinalCombination);
    }
}

function isThreeOfAKind(user){
    if(user == 'me'){
        return checkThreeOfAKind(myFinalCombination);
    }else if(user == 'first'){
        return checkThreeOfAKind(firstOpponentFinalCombination);
    }else if(user == 'second'){
        return checkThreeOfAKind(secondOpponentFinalCombination);
    }else if(user == 'third'){
        return checheckThreeOfAKind(thirdOpponentFinalCombination);
    }
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

function isStraight(user){
    if(user == 'me'){
        return checkStraight(myFinalCombination);
    }else if(user == 'first'){
        return checkStraight(firstOpponentFinalCombination);
    }else if(user == 'second'){
        return checkStraight(secondOpponentFinalCombination);
    }else if(user == 'third'){
        return checkStraight(thirdOpponentFinalCombination);
    }
}

function isFullHouse(user){
    if(user == 'me'){
        return checkFullHouse(myFinalCombination);
    }else if(user == 'first'){
        return checkFullHouse(firstOpponentFinalCombination);
    }else if(user == 'second'){
        return checkFullHouse(secondOpponentFinalCombination);
    }else if(user == 'third'){
        return checkFullHouse(thirdOpponentFinalCombination);
    }
}

function isPoker(user){
    if(user == 'me'){
        return checkPoker(myFinalCombination);
    }else if(user == 'first'){
        return checkPoker(firstOpponentFinalCombination);
    }else if(user == 'second'){
        return checkPoker(secondOpponentFinalCombination);
    }else if(user == 'third'){
        return checkPoker(thirdOpponentFinalCombination);
    }
}

function isStraightFlush(){

}

function isRoyalFlush(user){
    if(user == 'me'){
        return checkRoyalFlush(myFinalCombination);
    }else if(user == 'first'){
        return checkRoyalFlush(firstOpponentFinalCombination);
    }else if(user == 'second'){
        return checkRoyalFlush(secondOpponentFinalCombination);
    }else if(user == 'third'){
        return checkRoyalFlush(thirdOpponentFinalCombination);
    }
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
console.log("fullhouse me: " ,isFullHouse('me'));
console.log("fullhouse 1: ",isFullHouse('first'));
console.log("fullhouse 2: ",isFullHouse('second'));
console.log("fullhouse 3: ",isFullHouse('third'));

// console.log(myFinalCombination);
// console.log(firstOpponentFinalCombination);
// console.log(secondOpponentFinalCombination);
// console.log(thirdOpponentFinalCombination);

//flush is working
//poker maybe working
//three is working
//pair is working
//sor maybe working
//two pair is working
//full house is working


function is_low_pair(num1,num2){
    return num1 == num2 && num1 <=8;
}

function is_low_card(num1){
    return num1 <7;
}

function is_mix_card(num1,num2){
    return (num1 == "A" && num2 < 9) || (num2 == "A" && num1 < 9)
    && (num1 == "K" && num2 < 9) || (num2 == "K" && num1 < 9)
    && (num1 == "Q" && num2 < 9) || (num2 == "Q" && num1 < 9)
}

function is_big_pair(num1,num2){
    return num1 == num2 && (num2 == "T" || num2 =="J" || num2 == "Q"|| num2 == "K" || num2 == "A" || num2 == "9") ;
}

function is_big_card(num1,num2){
    console.log("method in big_card: ", num1, " ", num2);
    return (num1 == "T" || num1 =="J" || num1 == "Q" ||num1 == "K" ||num1 == "A") && (num2 == "T" || num2 == "J" ||num2 == "Q" || num2 == "K"|| num2 =="A") 
}

function is_enemy_call(num1,num2){
    return is_low_pair(num1,num2) || is_mix_card(num1,num2)
}

function is_enemy_raise(num1,num2){
    return is_big_card(num1,num2) || is_big_pair(num1,num2)
}

function gameLogic(){
    
}

function preFlopUser1(){
    card1 =opponent1Hand.substring(0,2)
    card2 = opponent1Hand.substring(2,4)

    if(is_enemy_raise(card1[1],card2[1])){
        return "r"
    }
    else if(is_enemy_call(card1[1],card2[1])){
        return "c"
    }else{
        return "f"
    }
}

function preFlopUser2(){
    card1 =opponent2Hand.substring(0,2)
    card2 = opponent2Hand.substring(2,4)

    if(is_enemy_raise(card1[1],card2[1])){
        return "r"
    }
    else if(is_enemy_call(card1[1],card2[1])){
        return "c"
    }else{
        return "f"
    }
}

function preFlopUser3(){
    card1 =opponent3Hand.substring(0,2)
    card2 = opponent3Hand.substring(2,4)

    if(is_enemy_raise(card1[1],card2[1])){
        return "r"
    }
    else if(is_enemy_call(card1[1],card2[1])){
        return "c"
    }else{
        return "f"
    }
}

function showPot(amount){
    document.getElementById("pot").innerHTML = amount

}

function calculateRaise(){
    return Math.floor(Math.random() * 20) + 40 
}

function getSBMoney(user){
    if(user == "me"){
        myMoney -=10
    }
    if(user == "first"){
        firstOpponentMoney -=10
    }
    if(user == "second"){
        secondOpponentMoney -=10
    }
    if(user == "third"){
        thirdOpponentMoney -=10
    }
}

function getBBMoney(user){
    if(user == "me"){
        myMoney -=20
    }
    if(user == "first"){
        firstOpponentMoney -=20
    }
    if(user == "second"){
        secondOpponentMoney -=20
    }
    if(user == "third"){
        thirdOpponentMoney -=20
    }
}

function isLowPairFlop(array){
    count2 = 0; count3 = 0; count4 = 0; count5 = 0; count6 = 0; count7 = 0; count8 = 0; count9 = 0;

    for(let i = 0;i<=5;i++){
            switch(array[i][1]){
                case '2':
                    count2++;
                    break;
                case '3':
                    count3++;
                    break;
                case '4':
                    count4++;
                    break;
                case '5':
                    count5++;
                    break;
                case '6':
                    numberOf6++;
                    break;
                case '7':
                    count7++;
                    break;
                case '8':
                    count8++;
                    break;
                case '9':
                    count9++;
                    break;
        }
    }
    return count2 == 2 || count3 == 2 || count4 ==2 || count5 == 2 || count6 == 2 || count7 == 2 
    || count8 == 2 || count9 == 2;
}

function isThree(array){
    count2 = 0; count3 = 0; count4 = 0; count5 = 0; count6 = 0; count7 = 0; count8 = 0; count9 = 0;
    countT = 0; countJ = 0; countQ = 0; countK= 0; countA = 0;
    for(let i = 0;i<=5;i++){
            switch(array[i][1]){
                case '2':
                    count2++;
                    break;
                case '3':
                    count3++;
                    break;
                case '4':
                    count4++;
                    break;
                case '5':
                    count5++;
                    break;
                case '6':
                    numberOf6++;
                    break;
                case '7':
                    count7++;
                    break;
                case '8':
                    count8++;
                    break;
                case '9':
                    count9++;
                    break;
                case 'T':
                    countT++;
                    break;
                case 'J':
                    countJ++;
                    break;
                case 'Q':
                    countQ++;
                    break;
                case 'K':
                    countK++;
                    break;
                case 'A':
                    countA++;
                    break;
            
        }
    }
    return count2 == 3 || count3 == 3 || count4 == 3 || count5 == 3 || count6 == 3 || count7 == 3 || count8 == 3 || count9 == 3 || countT == 3 || countJ == 3 || countQ == 3 || countK == 3 || countA == 3
}

function isFourSameColour(array){
    countS = 0; countD = 0; countH = 0; countC = 0;
    for(let i = 0; i <= 5;i++){
        switch(array[i][0]){
            case 'S':
                countS++;
                break;
            case 'D':
                countD++;
                break;
            case 'H':
                countH++;
                break;
            case 'C':
                countC++;
                break;
        }
    }
    return countS == 4 || countD == 4 || countH == 4 || countC == 4;
}

function isHighPairFlop(array){
    countT = 0; countJ = 0; countQ = 0; countK = 0; countA = 0;
    for(let i = 0;i<=5;i++){
        switch(array[i][1]){
            case 'T':
                countT++;
                break;
            case 'J':
                countJ++;
                break;
            case 'Q':
                countQ++;
                break;
            case 'K':
                countK++;
                break;
            case 'A':
                countA++;
                break;
        }
    }
    return countT == 2 || countJ == 2 || countQ == 2 || countK == 2 ||countA == 2
}

//first,second,third(SB),me(BB)
pot = 0
var raise = 0
var pot1=0
var pot2=0
var pot3 = 0
var potme = 0

function isPreFlopFinished(){
    return(myFold && !firstPlayerFold&&!secondPlayerFold&&!thirdPlayerFold)||(!myFold && firstPlayerFold && !secondPlayerFold&&!thirdPlayerFold)||(!myFold && !firstPlayerFold && secondPlayerFold&&!thirdPlayerFold )||(!myFold&&!firstPlayerFold&&!secondPlayerFold&&thirdPlayerFold)
}

function preFlop(){
    
    //BB = 20; SB = 10
    getBBMoney("me")
    getSBMoney("third")
    showMoney("me")
    showMoney("third")
    potme = 20
    pot3 = 10

    pot = 30
    showPot(pot)
    setTimeout(function() {
    //first player
    if(preFlopUser1()=="f"){
        fold("first")
    }
    else if(preFlopUser1()=="c"){
        pot1 = 20
        pot += 20
        firstOpponentMoney -=20
        showPot(pot)
        showMoney("first")
    }
    else if(preFlopUser1()=="r"){
        raise = calculateRaise()
        pot1 += 20 + raise
        pot+= raise +20
        firstOpponentMoney -= (raise + 20)
        showPot(pot)
        showMoney("first")
    }
       }, 1000);
    
    setTimeout(function() {
    //second player
    if(preFlopUser2()=="f"){
        fold("second")
    }
    if(preFlopUser2()=="c" && (preFlopUser1()=="c" || preFlopUser1()=="f")){
        pot += 20
        pot2 += 20
        secondOpponentMoney -=20
        showPot(pot)
        showMoney("second")
    }

    if(preFlopUser2()=="c"&& preFlopUser1()=="r"){
        pot += raise + 20
        pot2 += raise + 20
        secondOpponentMoney -= (raise +20)
        showPot(pot)
        showMoney("second")
    }
    if(preFlopUser2()=="r"&&(preFlopUser1()=="c" || preFlopUser1()=="f")){
        pot += raise + 20
        secondOpponentMoney -= (raise +20)
        pot2 += raise + 20

        raise = calculateRaise()
        pot += raise
        pot2 += raise 
        secondOpponentMoney -= raise 
        showPot(pot)
        showMoney("second")
    }
       }, 3000);
    

    setTimeout(function() {
    //3player
    if(preFlopUser3()=="f"){
        fold("third")
    }
    if(preFlopUser3()=="c" && Math.max(pot1, pot2,potme)==20){
        pot += 10
        pot3 += 10
        thirdOpponentMoney -=10
        showPot(pot)
        showMoney("third")
    }

    if(preFlopUser3()=="c"&& Math.max(pot1, pot2,potme)>20){
        let max = Math.max(pot1, pot2)
        let call = max -10
        pot3 += call
        pot += call
        thirdOpponentMoney -= call
        showPot(pot)
        showMoney("third")
    }

    if(preFlopUser3()=="r"){
        let max = Math.max(pot1, pot2,potme)
        let call = max -10
        pot3 += call
        pot += call
        thirdOpponentMoney -= call

        raise = calculateRaise()
        pot3 += raise
        pot += raise
        thirdOpponentMoney -= call
        showPot(pot)
        showMoney("third")
    }
       }, 5000);
    
    
    setTimeout(function() {
    //me
    decision = prompt("fold/call/raise")
    if(decision == "f"){
        fold("me")
    }
    if(decision == "c" && Math.max(pot1, pot2,pot3)> 20){
        let max = Math.max(pot1, pot,pot3)
        let call = max -20
        potme += call
        pot+= call
        myMoney -= call
        showPot(pot)
        showMoney("me")
        
    }

    if(decision=="r"){
        let max = Math.max(pot1, pot2,pot3)
        let call = max -20
        potme += call
        pot+= call
        myMoney -= call

        howmuch = prompt("how much want to raise")
        pot += howmuch
        potme += howmuch
        myMoney -= howmuch
        showPot(pot)
        showMoney("me")
        }
       }, 10000);

       setTimeout(function() {
        if(!firstPlayerFold && (decision == "c" || decision == "r")){
            let max = Math.max(potme,pot1, pot2,pot3)
            if(max != pot1){
                let call = max-pot1
                pot += call
                firstOpponentMoney -= call
            }
        }
        if(!secondPlayerFold && decision == "c"){
            let max = Math.max(potme,pot1,pot2,pot3)
            if(max != pot2){
                let call = max-pot2
                pot += call
                secondOpponentMoney -= call
            }
        }
        if(!thirdPlayerFold && decision == "c"){
            let max = Math.max(potme,pot1,pot2,pot3) 
            if(max != pot3){
                let call = max - pot3
                pot += call
                thirdOpponentMoney -= call
           }
        }
       }, 13000);
    
}





preFlop()
