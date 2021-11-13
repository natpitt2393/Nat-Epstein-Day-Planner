function setTime() {
    // We want to grab the div id of currentDay and then display it right under the description of the app. We can acheive this using jQuery to select the html div id and then using the moment library to capture what day it is
    //$("#currentDay").text(moment().format('MMMM Do YYYY'));-this is the jQuery method to access the currentDay id and then display it on screen
    let currentDay = document.getElementById('currentDay');
    currentDay.textContent = moment().format('MMMM Do YYYY');

    // We are calling the function changeTimeBlocksColor (this function allows the program to change each of the time block colors depending on whether the time block is in the past, present or future relative to the current time). We also want the program to be able to update the blocks every minute so we must set the interval to 60000 miliseconds, which is equivalent to 1 minute
    changeTimeBlocksColor();
    setInterval(changeTimeBlocksColor, 60000);

    // This loops through the time-block class
    $(".time-block").each(function () {
        let blockId = $(this).attr("id");
        //console.log(blockId);
        // This line of code allows us to retrieve any of the stored data within the text box for each hour
        $("#" + blockId + " textarea").text(localStorage.getItem(moment().format("MMMM Do YYYY") + blockId));
    });

    // This is the event listener when we click the save button
    $(".saveBtn").on("click", clickSave);
}
// Calling the setTime function so that the code will execute 
setTime();

// This will allow the save button, when clicked, to store data to local storage
function clickSave(event) {
    let hourId = $(this).parent().attr("id");
    localStorage.setItem(moment().format("MMMM Do YYYY") + hourId, $("#" + hourId + " textarea").val());
};

function changeTimeBlocksColor() {
    // This line of code allows us to loop through the time-block classes 
    $(".time-block").each(function () {
        let blockHour = parseInt($(this).attr("id").replace("hour-", ""));
        //console.log(blockHour);
        //We only want the number (integer) to be parsed through so we have to get make sure that any letters or characters that aren't intergers are not included
        let currentHour = parseInt(moment().format("H"));
        //console.log(currentHour);
        // We need to remove the classes from the time blocks so that they can change according to the current time
        $(this).removeClass("past present future");
        // We need these conditional statements to know what each time block color is going to be
        // for all future hours relative to current hour the block will appear green
        if (blockHour > currentHour) {
            $(this).addClass("future");
            // for all future hours relative to the current hour the block will appear green
        } else if (blockHour < currentHour) {
            $(this).addClass("past");
            // Otherwise it means the hour is present and the block will appear red
        } else {
            $(this).addClass("present");
        }
    });
};


