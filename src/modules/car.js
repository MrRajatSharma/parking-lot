/**
 * @description a basic object Number
 * @assumption the registration number for two cars can never be same
 */
class Car {
    constructor (NUMBER) {
        this.NUMBER = NUMBER; // unique property of an instance of car class
    }

    /**
     *
     * @param {Object} carA an instance of Car class
     * @param {Object} carB an instance of Car class
     * @description returns true if two Car Objects are equal, false if both are not equal
     */
    isCarEqual (carA, carB) {
        return carA.NUMBER.toLowerCase() === carB.NUMBER.toLowerCase();
    }
}

module.exports = Car;
