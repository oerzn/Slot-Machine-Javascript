// deposit money from user
// bet on number of rows
// collect the bet ammount
// spin the slot machine
// check if user won
// give the user amount
// play again

// write function in javascript

const prompt = require("prompt-sync")();


const ROWS = 3;
const COLS = 3;
//in each colum there are 2 As, 4 Bs, 6Cs,8Ds
//keys values pair, akind of object in javascript
//You don't need quotationmarks with key value pair A : 2
const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8,
};
//If i  get a line of As, bet is to be multipled by 5, simlar for others
const SYMBOL_VALUES = {
    A : 5,
    B : 4,
    C : 3,
    D : 2,
};



const deposit = () => {
    while(true){
        const depositAmount = prompt("Enter a deposit amount ");
        const numberDepositAmount = parseFloat(depositAmount);
    
        if(isNaN(numberDepositAmount)|| numberDepositAmount<=0){

            console.log("Invalid deposit amount,try again")
        } else{
            return numberDepositAmount;
        }


    }
    


};


const getNumberOfLines = () => {
    while(true){
        const lines = prompt("Enter the numbers of lines to bet on[1-3]: ");
        const numberrOfLines = parseFloat(lines);
    
        if(isNaN(numberrOfLines) || numberrOfLines<=0 || numberrOfLines>3 ){

            console.log("Invalid Number opf lines, try again")
        } else{
            return numberrOfLines;
        }


    }


};

const getBet= (balance, lines) =>{
    while(true){
        const bet = prompt("Enter the total bet per line: ");
        const numberBet = parseFloat(bet);
    
        if(isNaN(numberBet) || numberBet<=0 || numberBet > (balance / lines)){

            console.log("Invalid Bet, try again")
        } else{
            return numberBet;
        }


    }
    

};

// const spin = () => {
//     const symbols = []; //Why?In JavaScript, when you declare an array as const, it means that the reference to the array itself is constant and cannot be reassigned to a different array. However, it does not make the elements of the array immutable. This can sometimes lead to confusion.
//     for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
//         for (let i = 0; i< count; i++){
//             symbols.push(symbol); // push is used to insert an element inside an array, where as in python append is used to insert in list/array
            

//         }
       
//     }
//     const reels = [];
//     for (let i = 0; i < COLS; i++){
//         reels.push([]);
//         const reelSymbols = [...symbols];
//         for ( let j = 0; j < ROWS; j++){
//             // Generate a random index within the valid range of the reelsymbols array
//             const randomIndex = Math.floor(Math.random() * reelSymbols.lenght);
//             const selectedsymbol =  reelSymbols[randomIndex];
//             reels[i].push(selectedsymbol);
//             reelSymbols.splice(randomIndex,1);

//         }

//     }
//     return reels;
// };

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
      for (let i = 0; i < count; i++) {
        symbols.push(symbol);
      }
    }
  
    const reels = [];
    for (let i = 0; i < COLS; i++) {
      reels.push([]);
      const reelSymbols = [...symbols];
      for (let j = 0; j < ROWS; j++) {
        const randomIndex = Math.floor(Math.random() * reelSymbols.length);
        const selectedSymbol = reelSymbols[randomIndex];
        reels[i].push(selectedSymbol);
        reelSymbols.splice(randomIndex, 1);
      }
    }
  
    return reels;
  };

  const transpose = (reels) => {
    const rows = [];
  
    for (let i = 0; i < ROWS; i++) {
      rows.push([]);
      for (let j = 0; j < COLS; j++) {
        rows[i].push(reels[j][i]);
      }
    }
  
    return rows;
  };
// const transpose = (reels) => {
//     const rows = [];
//     for (let i=0;i<ROWS;i++){
//         rows.push = [[]];
//         for (let j=0; j<COLS;j++){
//             rows[i].push(reels[j][i]);


//         }

//     }
//     return rows;
// };

const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

const getWinnings = (rows, bet, lines) => {
  let winnings = 0;

  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;
//any symbmol did not match
    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }

    if (allSame) {
      winnings += bet * SYMBOL_VALUES[symbols[0]];
    }
  }

  return winnings;
};

const game = () => {
  let balance = deposit();

  while (true) {
    console.log("You have a balance of $" + balance);
    const numberOfLines = getNumberOfLines();
    const bet = getBet(balance, numberOfLines);
    balance -= bet * numberOfLines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows, bet, numberOfLines);
    balance += winnings;
    console.log("You won, $" + winnings.toString());

    if (balance <= 0) {
      console.log("You ran out of money!");
      break;
    }

    const playAgain = prompt("Do you want to play again (y/n)? ");

    if (playAgain != "y") break;
  }
};

game();