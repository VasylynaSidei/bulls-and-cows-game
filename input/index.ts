console.clear();

interface BullsAndCows {
  bulls: number;
  cows: number;
}

import promptSync from "prompt-sync";
import chalk from "chalk";
// import align from "align-text";
import center from "center-align";

const prompt = promptSync({ sigint: true });

// Prints the game name
console.log(`${chalk.cyanBright.underline("BULLS AND COWS") + "\n"}`);

const playerName: string = prompt(
  chalk.cyanBright.bgGreenBright.bold("Enter your name?") + " "
);

const name: string = playerName.trim() || "Stranger";

// Function which greets the player using random greetings
const greet = (name: string): string => {
  const greetings: string[] = ["Hi", "Hey", "Hello", "Yo"];
  const randomIndex: number = Math.floor(Math.random() * greetings.length);
  const randomGreetings: string = greetings[randomIndex];
  return `${randomGreetings}, ${chalk.greenBright(name)}!`;
};

// Function which creates a secret number with 4 unique digits
const createSecretNumber = (): string => {
  const possibleDigits: string = "0123456789";
  let secretNumber: string = "";

  while (secretNumber.length < 4) {
    const randomIndex: number = Math.floor(
      Math.random() * possibleDigits.length
    );
    const randomDigit: string = possibleDigits[randomIndex];
    if (!secretNumber.includes(randomDigit)) {
      secretNumber += randomDigit;
    }
  }
  console.log(secretNumber);
  return secretNumber;
};

// Function which checks the input for repeated characters
const hasRepeatedChars = (input: string): boolean => {
  for (let i: number = 0; i < input.length; i++) {
    const char: string = input[i];
    if (input.includes(char, i + 1)) {
      return true;
    }
  }
  return false;
};

// Function which checks if the input is a repeated guess
const isRepeatedGuess = (gameGuesses: string[], input: string): boolean =>
  gameGuesses.includes(input);

// Function which counts bulls and cows in the player's input
const countBullsAndCows = (
  input: string,
  secretNumber: string
): BullsAndCows => {
  let result: BullsAndCows = { bulls: 0, cows: 0 };
  for (let i: number = 0; i < 4; i++) {
    if (secretNumber[i] === input[i]) {
      result.bulls++;
    } else if (secretNumber.includes(input[i])) {
      result.cows++;
    }
  }
  return result;
};

// Main function
const main = (): void => {
  let playAgain: string = "y";
  let showAttempt: boolean = true;
  let totalGames: number = 0;
  let totalWinnings: number = 0;

  // welcome message
  console.log(
    chalk.cyanBright(
      `\n${greet(
        name
      )} Welcome to Bulls and Cows! 👋 It's like being a secret agent on a code-cracking mission. 🕵️‍♂️ \nThe computer has a ${chalk.greenBright(
        "secret number"
      )} with ${chalk.greenBright(
        "4 unique digits"
      )}. Your goal is to figure it out! \nYou get 🐂 ${chalk.greenBright(
        "Bulls"
      )} for the right digits in the right spots and 🐄 ${chalk.greenBright(
        "Cows"
      )} for the right digits in the wrong spots.\n`
    )
  );

  // game level message
  console.log(
    chalk.cyanBright(
      "Before we jump right into your mission, lets's set up its level."
    )
  );

  // main loop
  while (playAgain.trim().toLowerCase() === "y") {
    let chosenMode: string = "";
    let gameMode: string = "";
    let attempts: number = 0;
    const gameGuesses: string[] = [];

    // message explaining game modes
    console.log(
      chalk.cyanBright(
        `\nFor the ${chalk.greenBright(
          "easy mode"
        )}, with a maximum of 20 attempts, type ${chalk.rgb(
          245,
          252,
          205
        )("1")}. \nFor the ${chalk.greenBright(
          "hard mode"
        )}, with a maximum of 10 attempts, type ${chalk.rgb(
          245,
          252,
          205
        )("2")}.\n`
      )
    );

    while (chosenMode === "") {
      gameMode = prompt(
        chalk.cyanBright.bgGreenBright.bold("Choose game mode (1/2):") + " "
      );

      if (gameMode.trim() === "1") {
        chosenMode = "Easy mode";
        break;
      } else if (gameMode.trim() === "2") {
        chosenMode = "Hard mode";
        break;
      } else {
        console.log(
          chalk.redBright(`\n📢 Entry is invalid. It has to be "1" or "2".\n`)
        );
      }
    }

    // prints the chosen mode
    console.log(chalk.rgb(255, 136, 0)(`\nNice! ${chosenMode} it is!`));

    const maxAttempts: number = chosenMode === "Easy mode" ? 20 : 10;

    totalGames++;

    const secretNumber: string = createSecretNumber();

    // message first guess
    console.log(
      chalk.cyanBright(
        chalk.greenBright("\n▶️ Ready for Bulls and Cows? ") +
          "🎮 Great! Now, give us your best shot.\n"
      )
    );

    while (attempts < maxAttempts) {
      // message attempts left
      if (attempts > 0 && showAttempt) {
        console.log(
          chalk.yellow(`You have ${maxAttempts - attempts} attempts left.\n`)
        );
      }

      // reset showAttempt
      showAttempt = true;

      // get player's guess
      let input: string = prompt(
        chalk.cyanBright.bgGreenBright.bold("Enter your guess:") + " "
      );
      input = input.trim();

      if (input.length !== 4) {
        // error message
        console.log(
          chalk.redBright(
            `\n📢 Oops! Your entry should be a 4-digit number. Try again, Agent ${name}!\n`
          )
        );
        showAttempt = false;
        continue;
      }

      // check if input has no numeric character
      if (!/^\d+$/.test(input)) {
        // error message
        console.log(
          chalk.redBright(
            `\n📢 Be alert! Your entry should contain only numeric digits, no secret symbols or letters. Try again!\n`
          )
        );
        showAttempt = false;
        continue;
      }

      if (hasRepeatedChars(input)) {
        // error message
        console.log(
          chalk.redBright(
            `\n📢 Remember, the code should have four unique numbers. No repeats allowed. Try again with distinct digits!\n`
          )
        );
        showAttempt = false;
        continue;
      }

      if (isRepeatedGuess(gameGuesses, input)) {
        console.log(
          chalk.redBright(
            `\n📢 You already tried this number. Try a different one.\n`
          )
        );
        showAttempt = false;
        continue;
      } else {
        // push a valid input into gameGuesses array
        gameGuesses.push(input);
      }

      attempts++;

      const { bulls, cows } = countBullsAndCows(secretNumber, input);

      // winning case
      if (bulls === 4) {
        const congratulationsMessage = center(
          `🎉 Congratulations, Agent ${name}! 🎉`,
          120
        );
        const messagePart2 = center(
          `You cracked the secret code in ${attempts} attempts!`,
          120
        );
        const messagePart3 = center(`You're a code-cracking genius.`, 120);
        const messagePart4 = center(
          `You've earned your stripes as the ultimate Bulls and Cows champion!`,
          120
        );
        const messagePart5 = center(`🎯🏆`, 120);
        const styledMessage = chalk.rgb(
          245,
          252,
          205
        )(
          `\n${congratulationsMessage}\n\n${messagePart2}\n${messagePart3}\n${messagePart4}\n\n${messagePart5}\n`
        );

        console.log(styledMessage);
        totalWinnings++;
        break;
      }

      // no bulls and no cows message || hint message
      if (bulls === 0 && cows === 0 && attempts < maxAttempts) {
        const noBullsNoCowsMessages = [
          "keep trying, you'll get it!",
          "don't give up, you can make it!",
          "you can do it, try just a little more!",
        ];
        console.log(
          chalk.white(
            `\n${
              chalk.greenBright("So far: ") +
              "you got " +
              chalk.greenBright(bulls) +
              " bulls and " +
              chalk.greenBright(cows) +
              " cows. But"
            } ${
              noBullsNoCowsMessages[
                Math.floor(Math.random() * noBullsNoCowsMessages.length)
              ]
            }`
          )
        );
      } else if (attempts < maxAttempts) {
        console.log(
          chalk.greenBright(
            `\nHere is a hint: ${chalk.white(
              "you got " +
                chalk.greenBright(bulls) +
                " bulls and " +
                chalk.greenBright(cows) +
                " cows. Cool! Keep going... "
            )}`
          )
        );
      }

      // losing case
      if (attempts === maxAttempts) {
        const losingMessagePart1 = center(
          `💥 You've reached the maximum number of attempts. 💥`,
          120
        );
        const losingMessagePart2 = center(
          `                        The secret code was ${chalk.rgb(
            245,
            252,
            205
          )(secretNumber)}.`,
          120
        );
        const losingMessagePart3 = center(`Better luck next time!`, 120);
        const losingMessagePart4 = center(`🍀`, 120);

        console.log(
          chalk.redBright(
            `\n${losingMessagePart1}\n\n${losingMessagePart2}\n${losingMessagePart3}\n\n${losingMessagePart4}\n`
          )
        );
      }
    }

    // prints total games played
    console.log(
      chalk.greenBright(
        `Total games played: ${chalk.rgb(245, 252, 205)(totalGames)}`
      )
    );

    const winningRate: number = Math.floor((totalWinnings / totalGames) * 100);
    console.log(
      // prints winning rate
      chalk.greenBright(
        `Winning rate: ${chalk.rgb(245, 252, 205)(winningRate + "%\n")}`
      )
    );

    // reset playAgain
    playAgain = "";

    while (playAgain === "") {
      playAgain = prompt(
        chalk.cyanBright.bgGreenBright.bold("Play again? (y/n):") + " "
      );

      if (playAgain.toLowerCase().trim() === "y") {
        playAgain = "y";
        console.clear();
      } else if (playAgain.toLowerCase().trim() === "n") {
        playAgain = "n";
        break;
      } else {
        // error message
        console.log(
          chalk.redBright(`\n📢 Entry is invalid. It has to be "y" or "n".\n`)
        );
        playAgain = "";
      }
    }
  }

  // goodbye message
  console.log(
    chalk.cyanBright("\n👋 Bye! Thanks for playing Bulls and Cows! \n")
  );
};

main();
