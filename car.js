const TURN = {
    OFF: false,
    ON: true
}

class Car {
    #brand;
    #model;
    #yearOfManufacturing;
    #maxSpeed;
    #maxFuelVolume;
    #fuelConsumption;
    #currentFuelVolume = 0;
    #isStarted = TURN.OFF;
    #mileage = 0;

    constructor (brand, 
                model,
                yearOfManufacturing,
                maxSpeed,
                maxFuelVolume,
                fuelConsumption) {
        this.#brand = brand;
        this.#model = model;
        this.#yearOfManufacturing = yearOfManufacturing;
        this.#maxSpeed = maxSpeed;
        this.#maxFuelVolume = maxFuelVolume;
        this.#fuelConsumption = fuelConsumption;
    }

    get brand () {
        return this.#brand;
    }

    set brand (carBrand) {
        if (typeof carBrand !== 'string') {
            throw new Error (`Incorrect brand name.`);
        }

        if (carBrand.length < 1) {
            throw new Error (`Brand name is too short.`);
        }

        if (carBrand.length > 50) {
            throw new Error (`Brand name is too long.`);
        }

        this.#brand = carBrand;
    }

    get model () {
        return this.#model;
    }

    set model (carModel) {
        if (typeof carModel !== 'string') {
            throw new Error (`Incorrect model name.`);
        }

        if (carModel.length < 1) {
            throw new Error (`Model name is too short.`);
        }

        if (carModel.length > 50) {
            throw new Error (`Model name is too long.`);
        }

        this.#model = carModel;
    }

    get yearOfManufacturing () {
        return this.#yearOfManufacturing;
    }

    set yearOfManufacturing (carYear) {
        const currentYear = (new Date()).getFullYear();

        if (!Number.isInteger(carYear) || carYear <= 0) {
            throw new Error (`Incorrect year.`);
        }

        if (carYear < 1900) {
            throw new Error (`Year of manufacturing cannot be earlier than 1900.`);
        }

        if (carYear > currentYear) {
            throw new Error (`Year of manufacturing cannot be later than the current year.`);
        }

        this.#yearOfManufacturing = carYear;
    }

    get maxSpeed() {
        return this.#maxSpeed;
    }
    
    set maxSpeed(carMaxSpeed) {
        if (!Number.isInteger(carMaxSpeed) || carMaxSpeed < 0) {
            throw new Error (`Incorrect max speed.`);
        }

        if (carMaxSpeed < 100) {
            throw new Error (`Max speed cannot be less than 100 km/h.`);
        }

        if (carMaxSpeed > 300) {
            throw new Error (`Max speed cannot be more than 300 km/h.`);
        }

        this.#maxSpeed = carMaxSpeed;
    }

    get maxFuelVolume() {
        return this.#maxFuelVolume;
    }

    set maxFuelVolume(carMaxFuel) {
        if (!Number.isInteger(carMaxFuel) || carMaxFuel < 0) {
            throw new Error (`Incorrect max fuel volume.`);
        }

        if (carMaxFuel < 5) {
            throw new Error (`Max fuel volume cannot be less than 5 l.`);
        }

        if (carMaxFuel > 20) {
            throw new Error (`Max fuel volume cannot be more than 20 l.`);
        }

        this.#maxFuelVolume = carMaxFuel;
    }

    get fuelConsumption() {
        return this.#fuelConsumption;
    }

    set fuelConsumption(carFuelConsumption) {
        if (!Number.isInteger(carFuelConsumption) || carFuelConsumption <= 0) {
            throw new Error (`Incorrect fuel consumption.`);
        }

        this.#fuelConsumption = carFuelConsumption;
    }

    get currentFuelVolume() {
        return this.#currentFuelVolume;
    }

    get isStarted() {
        return this.#isStarted;
    }

    get mileage() {
        return this.#mileage;
    }

    start() {
        if (this.#isStarted === TURN.ON) {
            throw new Error (`Car is already started.`);
        } else {
            this.#isStarted = TURN.ON;

            return this.#isStarted;
        }
    }

    shutDownEngine() {
        if (this.#isStarted === TURN.ON) {
            throw new Error (`Car hasn't been started yet.`);
        } else {
            this.#isStarted = TURN.OFF;

            return this.#isStarted;
        }
    }

    fillUpGasTank(fuel) {
        if (!Number.isInteger(fuel) || fuel <= 0) {
            throw new Error (`Incorrect amount of fuel to fill up.`);
        } else if (this.#currentFuelVolume >= this.#maxFuelVolume 
                || fuel >= this.#maxFuelVolume) {
            throw new Error (`Fuel tank is full.`);
        } else {
            this.#currentFuelVolume += fuel;

            return this.#currentFuelVolume;
        }
    }

    drive(speed, time) {
        const distance = speed * time;

        const fuel = (distance / 100) * this.#fuelConsumption;

        if (!Number.isInteger(speed) || speed <= 0) {
            throw new Error (`Incorrect speed.`);
        } else if (!Number.isInteger(time) || time <= 0) {
            throw new Error (`Wrong number of hours.`);
        } else if (speed > this.#maxSpeed) {
            throw new Error (`Car can't go that fast.`);
        } else if (this.#isStarted === TURN.OFF) {
            throw new Error (`To move, you need to start the car.`);
        } else if (this.#currentFuelVolume <= fuel 
                || this.#currentFuelVolume === 0) {
            throw new Error (`Not enough fuel.`);
        } else if (this.#currentFuelVolume > fuel) {
            this.#currentFuelVolume -= fuel;

            this.#mileage += distance;
        }

        console.log(`Car has just been driven for ${distance} km.`);

        return this.#mileage;
    }
}