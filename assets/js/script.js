currentDateDisplay = $("#currentDay");  // Container to display current date
plannerTimes = $(".container");         // Container to display planner times

// Array of weekdays
var days = ["Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"]

// Array of months
var months = ["January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"]

// Function to get current date in string format
function displayDate() {
    var currentDay = days[dayjs().day()];
    var currentDate = dayjs().date();
    var currentMonth = months[dayjs().month()];

    return currentDay + " " + currentMonth  + " " + currentDate;
}

// Add current date string to HTML element text
currentDateDisplay.text(displayDate());

// Function to generate planner
function generatePlanner() {

    // Loop working hours and use 'i' as an reference for each hour
    for (var i = 9; i < 18; i++) {

        var input = $('<textarea>').addClass('description col-10').attr('data-num', i);
        var block = $('<div>').addClass('time-block');
        var row = $('<div>').addClass('row');
        var saveButton = $('<div>').addClass('saveBtn col-1');
        saveButton.append($('<i class="fa fa-save"></i>')).attr('data-num', i);
        var hour = $('<div>').addClass('hour col-1');

        // Assign hour text to each hour element
        // if hour is less than 12 add AM
        // if hour is 12 or more add PM
        // subtract 12 from any hour after 12PM to get 12 hour version.
        if (i < 12) {
            hour.text(i + "AM");
        } else if (i === 12) {
            hour.text(i + "PM");
        } else {
            hour.text(i-12 + "PM");
        }

        // Assign past, present and future classes to each row 
        // depending on current time.
        if (i === dayjs().hour()) {
            block.addClass('present');
        } else if (i > dayjs().hour()) {
            block.addClass('future');
        } else {
            block.addClass('past');
        }

        // Load any perviously entered events
        if (localStorage.getItem(i) != null) {
            input.text(localStorage.getItem(i));
        }

        // Append all items to the page
        row.append(hour);
        row.append(input);
        row.append(saveButton);
        block.append(row);
        plannerTimes.append(block);

        // Save event to local storage when its save button is clicked
        saveButton.on('click', function() {
            var btn = $(this).attr('data-num');
            localStorage.setItem(btn, $('[data-num='+ btn +']').val());
        });
    }
}

generatePlanner();
