//hangman game

//requires
var request = require('ajax-request');
var readline = require('readline-sync');
var fs = require('fs');

//My own module to remove array elements :)
var remove = require('remove-function');

//basic variables
var word = [];
var finished = false;
var numOfGuesses = 0;
var guess = '';

//Start and Clear Text
Clear();
GenerateWord();
Clear();

//hide the word
var hiddenWord = [];
var hiddenWordLength = '';
HideWord();

//character guess array
var characterArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 
'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 
't', 'u', 'v', 'w', 'x', 'y', 'z'];

Guess();

function Guess() {
  while(!finished) {

    console.log("Hidden Word: " + hiddenWord.join(''));

    console.log("Available Words: " + characterArray.join(','));

    guess = readline.question("What letter would you like to guess?: ");

    while(guess.length != 1) {
        guess = readline.question("What letter would you like to guess?: ");
    }

    //clear text
    Clear();

    numOfGuesses++;

    if (word.includes(guess)) {
      for (var i = 0; i < word.length; i++)
      {
        if (word[i] == guess) {
          hiddenWord[i] = word[i];
        }
      }

      console.log("yes, the word contains: " + guess);

      if (!hiddenWord.includes('*')) {
        finished = true;
      }
    } else {
      console.log("Sorry, " + guess + " was not in the word.");
    }

    var num = characterArray.indexOf(guess)

    if (num >= 0)
      characterArray.removeAt(num);
  }

  console.log("congrats the word was: " + word.join('') + "\r\nIt only took you: "
   + numOfGuesses + " attempts to get it right.");

  RestartGame();
}

function GenerateWord() {
  //Generate
  var generate = readline.question("Would you like it auto generated?: ");
  generate.toLowerCase();

  //Logic
  if (generate == 'y' || generate == 'yes') {
    var obj = JSON.parse(fs.readFileSync('SampleWords.txt', 'utf8'));
    var rand = obj[Math.floor(Math.random() * obj.length)];
    testWord = rand;
  } else {
    //input word
    var testWord = readline.question("What is the word?: ");
    var holder = testWord.toLowerCase().trim();

    //check word 
    while (!holder.match(/^[a-zA-Z]+$/)) {

      console.log("letters only please no spaces or special characters");

      testWord = readline.question("What is the word?: ");    
    }
  }
  //make into array
  word = testWord.split('');
}

function HideWord() {
  for (var i = 0; i < word.length; i++) {
    hiddenWord.push('*');
    hiddenWordLength += "*";
  }
}

function RestartGame() {
  var input = readline.question('Play again?');
  //Restarting the game
  if (input.toLowerCase() == 'y' || input.toLowerCase() == 'yes')
  {
    Clear();
    characterArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 
        'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 
        't', 'u', 'v', 'w', 'x', 'y', 'z'];
    hiddenWord = [];
    hiddenWordLength = '';
    GenerateWord();
    HideWord();
    finished = false;
    //StartGameAgain
    Guess();
  } else
  {
    //Finished
    console.log("Exited");
  }

}

function Clear() {
  console.log('\x1Bc');
}

