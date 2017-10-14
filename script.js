/* Books flights for the user. User can choose first-class or economy, program will notify them if a section is full. Users can book as many seats
as they want until the flight is full. Bookings are not logged in an external file but user receives feedback based on their input and the
status of the seats.

Version 1.0 Dylan Nichols 2017 */

// This blocks connects the HTML objects to variables and sets up an array to hold booking information
let input = document.querySelector("#input")
let submit = document.querySelector("#submit")
let instruct = document.querySelector("#instruct")
let form = document.querySelector("#form")
let stop = false
let step = 1
let seats = new Array(10)
for (var i = 0; i < seats.length; i++) {
    Array[i] = false
}

// check if any seats are available for the chosen input, and if so, book a seat
let checkSeats = () => {
    let seatNumber = 0
    if (input.value == "1") { // if the user wants first class, iterate through first five seats, and book if one is available
        for (let i = 0; i < 5; i++) {
            if (seats[i] != true) {
                seats[i] = true
                seatNumber = i + 1
                break
            }
        }
    } else if (input.value == "2") { // same for economy
        for (let i = 5; i < 10; i++) {
            if (seats[i] != true) {
                seats[i] = true
                seatNumber = i + 1
                break
            }
        }
    } else {
        seatNumber = -1; // if input was invalid, return -1
    }
    return seatNumber
}

// Checks if one section or all seats are full, if one section is full, asks if they want to book for the other section
let seatsFull = () => {
    let emptySeat = -1
    for (let i = 0; i < seats.length; i++) {
        if (!seats[i]) {
            emptySeat = i
            break
        }
    }

    if (emptySeat < 5) {
        instruct.innerHTML = "No economy seats are available. Would you like to book first class?"
        step = 3
    } else if (emptySeat > 4) {
        instruct.innerHTML = "No first-class seats are available. Would you like to book economy?"
        step = 3
    } else {
        form.outerHTML = ""
        instruct.innerHTML = "All seats are booked. Thank you for booking with Rotovegas Airways, your flight leaves in three hours."
    }
}

// responds to user input if one section is full, if user selects yes, books a seat in the other section
let sectionFull = () => {
    if (input.value == "Y" || input.value == "y") {
        let seatNumber = 0;
        for (let i = 0; i < seats.length; i++) {
            if (seats[i] != true) {
                seats[i] = true
                seatNumber = i + 1
                break
            }
        }
        if (seatNumber == 0) {
            form.outerHTML = ""
            instruct.innerHTML = "All seats are booked. Thank you for booking with Rotovegas airlines, your flight leaves in three hours."
        } else {
            instruct.innerHTML = `You have booked seat ${seatNumber}, would you like to book another?`
        }
    } else if (input.value == "N" || input.value == "n") {
        form.outerHTML = ""
        instruct.innerHTML = "Thank you for booking with Rotovegas Airways, your flight leaves in three hours."
    } else {
        instruct.innerHTML = "Invalid input. Please enter Y if you want to book another seat or N if you do not."
    }
}

// this function occurs when submit button is clicked
let submitForm = () => {
    if (step == 1) {
        let seatNumber = checkSeats()
        if (seatNumber == -1) {
            instruct.innerHTML = "Invalid input. Please enter 1 for first-class or 2 for economy"
        } else if (seatNumber == 0) {
            seatsFull() // input was valid but no seat was booked, check what happened
        } else {
            instruct.innerHTML = `You have booked seat ${seatNumber}, would you like to book another? Enter Y for yes or N for no.`
            step = 2
        }
    } else if (step == 2) { // asks user if they want to book another seat
        if (input.value == "Y" || input.value == "y") {
            instruct.innerHTML = "Use the box below to book a seat, enter 1 for for first-class or 2 for economy"
            step = 1
        } else if (input.value == "N" || input.value == "n") {
            form.outerHTML = ""
            instruct.innerHTML = "Thank you for booking with Rotovegas Airways, your flight leaves in three hours."
        } else {
            instruct.innerHTML = "Invalid input. Please enter Y if you want to book another seat or N if you do not."
        }
    } else {
        sectionFull()
    }
}

submit.addEventListener('click', (e) => {
        submitForm();
        e.preventDefault()
    }) // if user clicks submit, call the above function