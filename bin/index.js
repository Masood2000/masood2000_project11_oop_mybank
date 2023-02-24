#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import { exit } from "process";
class BankAccount {
    accountBalance = 0;
    constructor() {
        this.accountBalance = 1000000;
    }
    async withdraw() {
        await inquirer.prompt([{
                type: "number",
                message: "Enter the Amount",
                name: "amount"
            }]).then((answers) => {
            if (answers.amount > this.accountBalance) {
                console.log("You don't have Enough Balance.......");
            }
            else {
                this.accountBalance = this.accountBalance - answers.amount;
                console.log("................ Withdraw Successful ....................");
                console.log(`........... Your Remaining Balance is : ${this.accountBalance}`);
            }
        });
        startFunctionality();
    }
    async credit() {
        await inquirer.prompt([{
                type: "number",
                message: "Enter the Amount",
                name: "amount"
            }]).then((answers) => {
            if (answers.amount > 0) {
                if (answers.amount > 100) {
                    this.accountBalance = this.accountBalance + answers.amount;
                    this.accountBalance = this.accountBalance - 1;
                    console.log("................ Deposit Successful ....................");
                    console.log(`........... Your Current Balance is : ${this.accountBalance} and 1 $ is Deducted from your Account......`);
                }
                else {
                    this.accountBalance = this.accountBalance + answers.amount;
                    console.log("................ Deposit Successful ....................");
                    console.log(`........... Your Current Balance is : ${this.accountBalance}`);
                }
            }
            else {
                console.log("Deposit Amount should be Greater then 0");
            }
        });
        startFunctionality();
    }
    chkBalance() {
        console.log(`........... Your Current Balance is : ${this.accountBalance}`);
        startFunctionality();
    }
}
class Customer {
    firstName = "Masood";
    lastName = "Ur Rehman";
    gender = "Male";
    age = 23;
    mobileNumber = 3125255694;
    bankAccount = new BankAccount();
    customerInfo() {
        let str = "";
        str = `Name : ${this.firstName} ${this.lastName}\nAge : ${this.age}\nGender : ${this.gender}\nMobile : 0${this.mobileNumber}\nBank Account : ${this.bankAccount.accountBalance}\n\n`;
        console.log(str);
        startFunctionality();
    }
}
console.log(chalk.green(".............. Wellcome to My Bank ................."));
let userId = "masood";
let userPin = 1234;
start();
async function start() {
    console.log("Enter your Credentials to Login : ");
    await inquirer.prompt([{
            type: "input",
            message: "Enter Your ID : //Defualt is masood",
            name: "id"
        }, {
            type: "number",
            message: "Enter Your Password : //Default in 1234",
            name: "pass"
        }]).then((answers) => {
        if (login(answers.id, answers.pass)) {
            console.log("Login Successfull");
            //againPlayMatch()
            startFunctionality();
        }
        else {
            console.log("Login Failed");
        }
    });
}
let customerOne = new Customer();
async function startFunctionality() {
    await inquirer.prompt([{
            type: "list",
            message: "......... Select any Options .......",
            name: "option",
            choices: ["Customer Info", "Balance Check", "WithDraw Cash", "Deposit Cash", "Exit"]
        }])
        .then((answers) => {
        if (answers.option == "Customer Info") {
            customerOne.customerInfo();
        }
        else if (answers.option == "Balance Check") {
            customerOne.bankAccount.chkBalance();
        }
        else if (answers.option == "WithDraw Cash") {
            customerOne.bankAccount.withdraw();
        }
        else if (answers.option == "Deposit Cash") {
            customerOne.bankAccount.credit();
        }
        else if (answers.option == "Exit") {
            exit();
        }
    });
}
function login(user, pin) {
    if (user == userId && pin == userPin) {
        return true;
    }
    else {
        return false;
    }
}
