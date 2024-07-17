#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const randomNumber = Math.floor(10000 + Math.random() * 90000);
let myBalance = 0;
let answer = await inquirer.prompt([
    {
        name: "student",
        type: "input",
        message: chalk.blue.bold("Enter student name: "),
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return "please enter a non-empty value";
        },
    },
    {
        name: "courses",
        type: "list",
        message: chalk.blue.bold("Select the course to enroll: "),
        choices: ["Javascript", "Typescript", "Python", "Web 3.0", "Meta AI"],
    },
]);
const tutionFee = {
    "Javascript": 2000,
    "Typescript": 3000,
    "Python": 4000,
    "Web 3.0": 6000,
    "Meta AI": 10000,
};
console.log(chalk.green.bold(`\nTuition Fees: ${tutionFee[answer.courses]}/-\n`));
console.log(chalk.yellow.bold(`\nBalance: ${myBalance}\n`));
let paymentType = await inquirer.prompt([
    {
        name: "payment",
        type: "list",
        message: chalk.blue.bold("Select payment method: "),
        choices: ["Bank Transfer", "Jazzcash", "Easypaisa"],
    },
    {
        name: "amount",
        type: "input",
        message: chalk.blue.bold("Enter payment amount: "),
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return "please enter a non-empty value";
        },
    },
]);
console.log(chalk.cyan.bold(`\nYou selected payment method: ${paymentType.payment}\n`));
const tutionFees = tutionFee[answer.courses];
const paymentAmount = parseFloat(paymentType.amount);
if (tutionFees === paymentAmount) {
    console.log(chalk.green.bold(`Congratulations, you have successfully enrolled in ${answer.courses}\n`));
    let ans = await inquirer.prompt([
        {
            name: "select",
            type: "list",
            message: chalk.blue.bold("What would you like to do next?"),
            choices: ["View Status", "Exit"],
        },
    ]);
    if (ans.select === "View Status") {
        console.log(chalk.yellow.italic(`\n**********Status**********\n`));
        console.log(chalk.yellow.italic(`Student Name: ${answer.student}`));
        console.log(chalk.yellow.italic(`Student ID: ${randomNumber}`));
        console.log(chalk.yellow.italic(`Course: ${answer.courses}`));
        console.log(chalk.yellow.italic(`Tuition Fees Paid: ${paymentAmount}`));
        console.log(chalk.yellow.italic(`Balance: ${(myBalance += paymentAmount)}`));
    }
    else {
        console.log(chalk.red.bold(`\nExiting Student Management System....\n`));
    }
}
else {
    console.log(chalk.red.bold("\nInvalid amount due to course\n"));
}
