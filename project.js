// 1. Deposit money
// 2. Collect a bet amount
// 3. Determine the number of lines to bet
// 4. Spin the machine
// 5. Check if the user won
// 6. Give the winner his reward
// 7. Play again


// function deposit(){
//     return 1
// }

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "@": 2,
    "$": 4,
    "&": 6,
    "#": 8
}

const SYMBOL_VALUES = {
    "@": 5,
    "$": 4,
    "&": 3,
    "#": 2
}






const amountDeposit = () => {
    while (true){
        const depositAmount = prompt("Enter Amount: ");
        const numberDeposit = parseFloat(depositAmount);

        if (isNaN(numberDeposit) || numberDeposit <= 0){
            console.log("Invalid Amount Entered");
        }
        else{
            return numberDeposit;
        }
    }
};

const getNumberOfLines = () => {
    while(true) {
        const lines = prompt("Enter the number of lines: ");
        const numberOfLines = parseFloat(lines);

        if (isNaN(numberOfLines) || numberOfLines <=0 || numberOfLines >3){
            console.log("Invalid number of lines, try again");
        }
        else{
            return numberOfLines;
        }
    }
}

const getBetAmount = (balance, line) => {
    while(true) {
        const bet = prompt("Enter the bet: ");
        const betAmount = parseFloat(bet);

        if (isNaN(betAmount) || betAmount <=0 || betAmount > balance/line){
            console.log("Invalid Bet, try again");
        }
        else{
            return betAmount;
        }
    }
}


const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for (let i =0; i < count; i++){
            symbols.push(symbol); // insert
        }
    }
    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1)
        }
    }
    return reels;
};

const transpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++){
        rows.push([]);
        for (let j = 0; j< COLS; j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows;
};

const printRows = (rows) => {
    for (const row of rows){
        let rowString = "";
        for (const [i, symbol] of row.entries()){
            rowString += symbol
            if (i != row.length -1){
                rowString += " | "
            }
        }
        console.log(rowString)
    }
};

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
    for (let row = 0; row < lines; row++){
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols){
            if (symbol != symbols[0]){
                allSame = false;
                break;
            }
        }

        if (allSame){
            winnings += bet * SYMBOL_VALUES[symbols[0]];
        }
    }


    return winnings;
};

const addWinnings = (balance, winnings) => {
    return balance+winnings;
}

const game = () => {
    let balance = amountDeposit();
    while (true){
        console.log("You have a balance of $" + balance);
        const numberOfLines = getNumberOfLines();
        const bet = getBetAmount(balance,numberOfLines);
        balance = balance - (bet*numberOfLines);
        const reels = spin();
        console.log(reels)
        const rows = transpose(reels)
        console.log(rows)
        printRows(rows)
        const prize = getWinnings(rows,bet,numberOfLines)
        console.log("You won $" + prize.toString())
        balance = addWinnings(balance, prize)
        if (balance <= 0){
            console.log("You're Broke!!!")
            break;
        }
        const playAgain = prompt("Do you wnat to play again (y/n)?");
        if (playAgain != "y") break;

    }
}

game()