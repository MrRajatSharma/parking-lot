#!/usr/bin/env node
const fs = require('fs');
const chalk = require('chalk');
const readLine = require('readline');

// processing command line inputs
let	commandLineInputs = process.argv; 
let interactiveMode = false;
require('events').EventEmitter.defaultMaxListeners = 0;

/**
 * @description importing the parkingLot class
 */
let Parking = require('./modules/parkingLot.js'),
	parkingLot = new Parking();

if (commandLineInputs[commandLineInputs.length - 1].endsWith('.txt')) {
    interactiveMode = false;
    fs.readFile(commandLineInputs[2], 'utf-8', function (err, data) {
        if (err) {
            console.log('Error in reading file');
        }
        var arr = data.split('\n');
        for (var i = 0; i < arr.length; i++) {
            processUserCommands(arr[i]);
        }

        // returning to console once all the inputs are processed
        process.exit(1);
    });
}
else {
    interactiveMode = true;
    openInteractiveConsole();
}

/**
 * @description called when users want to interact via console
 * it process one command at a time
 */
function openInteractiveConsole () {

    var prompts = readLine.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    // option for user to enter commands
    if (interactiveMode) {
        prompts.question('Input: ', function (data) {
            processUserCommands(data);
        });
    }
}

/**
 *
 * @param {String} input entered via console
 * @description driver function for different commands for entered by users
 * calls respective functions of ParkingLot class based on commands
 */
function processUserCommands (input) {
	var userCommand = input.split(' ')[0],
		totalParkingSlots,
		parkingSlotNumber,
        registerationNumber,
        charge;
        console.log(userCommand);
    switch (userCommand) {
        case 'create_parking_lot':
            try {
                totalParkingSlots = parkingLot.createParkingLot(input);
                console.log(chalk.yellow.bold('Created parking lot with ' + totalParkingSlots + ' slots'));
            }
            catch (err) {
                console.log(chalk.red.bold(err.message));
            }

            break;
        case 'park':
            try {
                parkingSlotNumber = parkingLot.parkCar(input);
                console.log(chalk.green('Allocated slot number: ' + parkingSlotNumber));
            }
            catch (err) {
                console.log(chalk.red.bold(err.message));
            }
            break;
        case 'leave':
            try {
                registerationNumber = input.split(' ')[1];
                parkingSlotNumber = parkingLot.leave(input);
                charge = parkingLot.getCharges(input);
                console.log(chalk.blue('Registeration number ' + registerationNumber + ' with Slot Number ' + parkingSlotNumber + ' is free with Charge ' + charge));
            }
            catch (err) {
                console.log(chalk.red(err.message));
            }
            break;
        case 'status':
            try {
                var parkingSlotStatus = parkingLot.getParkingStatus();
                if (parkingSlotStatus.length > 1) {
                    console.log(parkingSlotStatus.join('\n'));
                }
                else {
                    console.log(chalk.yellow('Sorry, parking lot is empty')); // what if it's empty
                }
            }
            catch (err) {
                console.log(chalk.red.bold(err.message));
            }
            break;
        case 'exit':
			process.exit(0);
			break;
        default:
            console.log(chalk.red.bold(input, 'is an invalid command'));
            break;
    }
    openInteractiveConsole();
}
