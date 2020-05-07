var Car = require('./car.js');

/**
 * @description a base class for Parking lot
 */
class ParkingLot {

	constructor () {
        this.MAX_PARKING_SLOTS = 0; // maximum parking slots allowed
        this.parkingSlots = new Array(); // array for parking slots
    }

	/**
	 *
	 * @param {String} input user's input via terminal
	 * @description creates a parking lot with given maximum slot numbers.
	 * It throws an error if zero or negative input is provided
	 */
	createParkingLot (input) {
		this.MAX_PARKING_SLOTS = parseInt(input.split(' ')[1]);
		if (this.MAX_PARKING_SLOTS <= 0) {
			// minimum: 1 slot
			throw new Error('Minimum one slot is required to create parking slot');
		}
        for (var i = 0; i < this.MAX_PARKING_SLOTS; i++) {
            this.parkingSlots.push(null);
        }
        return this.MAX_PARKING_SLOTS;
	}

	/**
	 *
	 * @param {String} input user's input via terminal
	 * @description allocates nearest slot number to incoming cars.
	 * It throws an error if parking lot is empty or full.
	 * It also throws an error if only one field (either registration number) is provided.
	 */
    parkCar (input) {
        var len = this.parkingSlots.length;
    	if (this.MAX_PARKING_SLOTS > 0) {
			var car, carNumber;
	    	if (this.findNearestAvailableSlot(this.parkingSlots) == true) {
		  		for (var i = 0; i < len; i++) {
		  			if (this.parkingSlots[i] == null) {
						carNumber = input.split(' ')[1];
						if (carNumber) {
							car = new Car(carNumber);
							this.parkingSlots[i] = car;
							i = i + 1;
							return i;
						}
						else {
							throw new Error('Please provide registration number');
						}
		  			}
		  		}
			  }
			else {
		  		throw new Error('Sorry, parking lot is full');
		  	}
          }
          else {
	  		throw new Error('Minimum one slot is required to create parking slot');
	  	}
	}

	/**
	 *
	 * @param {String} input user's input via terminal
	 * @description it makes the slot free for the car of given registration number.
	 * It throws an error if car is not found.
	 */
	leave (input) {
		var carNumber = input.split(' ')[1];
		if (this.MAX_PARKING_SLOTS > 0) {
		    for (let index = 0; index < this.MAX_PARKING_SLOTS; index++) {
				if (this.parkingSlots[index] && this.parkingSlots[index].NUMBER === carNumber) {

					this.parkingSlots[index] = null;
					return index + 1;
				}
			}
		}
		throw new Error('Registeration number ' + carNumber + ' not found');
	}


	/**
	 * @description Returns charges incurs for parking
	*/
	getCharges (input) {
		var hours = parseInt(input.split(' ')[2]);
		let charge = 10 + (hours > 2 ? (hours - 2) * 10 : 0);
		return charge;
	}

	/**
	 * @description Returns an array containing parking details i.e. slot no, registration number
	 */
    getParkingStatus () {
    	var arr = new Array();
    	if (this.MAX_PARKING_SLOTS > 0) {
			arr.push('Slot No. Registration No.');

        	for (var i = 0; i < this.parkingSlots.length; i++) {
        		if (this.parkingSlots[i] != null) {
        			var e = i + 1;
        			arr.push(e + '.  ' + this.parkingSlots[i].NUMBER);
        		}
        	}
        	return arr;
		}
		else {
			throw new Error('Sorry, parking lot is empty');
		}
	}

	/**
	 * @description returns the nearest available slot
	 * used by parkCar() method to find nearest slot
	 */
	findNearestAvailableSlot () {
		var ele = false;
		for (var i = 0; i < this.parkingSlots.length; i++) {
			if (this.parkingSlots[i] == null) {
				ele = true;
			}
		}
		return ele;
	}
}

module.exports = ParkingLot;
