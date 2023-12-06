const container = document.querySelector(".data-container");

// function to generate bars 
function generatebars(num = 30) {

    for (let i = 0; i < num; i += 1) {

        // To generate random values from 1 to 100 
        const value = Math.floor(Math.random() * 100) + 1;

        // To create element "div" 
        const bar = document.createElement("div");

        // To add class "bar" to "div" 
        bar.classList.add("bar");

        // Provide height to the bar 
        bar.style.height = `${value * 3}px`;

        // Translate the bar towards positive X axis 
        bar.style.transform = `translateX(${i * 30}px)`;

        // To create element "label" 
        const barLabel = document.createElement("label");

        // To add class "bar_id" to "label" 
        barLabel.classList.add("bar_id");

        // Assign value to "label" 
        barLabel.innerHTML = value;

        function updateLabelPosition(bar) {
            const barLabel = bar.childNodes[0];
            const labelTop = 5; // Adjust the offset as needed
            const labelLeft = parseInt(bar.style.transform.replace("translateX(", "").replace("px)", ""));

            barLabel.style.position = "absolute";
            barLabel.style.top = `${labelTop}px`;
            barLabel.style.left = `${labelLeft}px`;
            barLabel.style.transform = "translateX(-50%)";
            barLabel.style.color = "blue";
            barLabel.style.fontSize = "14px";
        }

        // const labelTop = value*3 +10; // You can adjust this value as needed

        // // Set the position of the label
        // barLabel.style.position = "absolute";
        // barLabel.style.top = `${labelTop}px`;
        // barLabel.style.left = "50%"; // Center the label under the bar
        // barLabel.style.transform = "translateX(-50%)";
        // barLabel.style.color = "blue";
        // barLabel.style.fontSize = "14px";

        // Append "Label" to "div" 
        bar.appendChild(barLabel);

        // Append "div" to "data-container div" 
        container.appendChild(bar);
    }
}


// Call "generatebars" function 
generatebars();

// function to generate new random array 
function generate() {
    window.location.reload();
}

function changeContainerSize() {
    const widthInput = document.getElementById("widthInput");
    const heightInput = document.getElementById("heightInput");
    const container = document.querySelector(".data-container");

    const newWidth = parseInt(widthInput.value)  // Default width if input is not a number
    const newHeight = parseInt(heightInput.value) // Default height if input is not a number

    container.style.width = `${newWidth}px`;
    container.style.height = `${newHeight}px`;
}



// function to disable the button 
function disable() {
    // To disable the button "Generate New Array" 
    document.getElementById("Button1").disabled = false;
    document.getElementById("Button1");

    // To disable the button "Selection Sort" 
    document.getElementById("Button2").disabled = true;
    document.getElementById("Button2").style.backgroundColor = "#d8b6ff";
}

function enableRandomizeButton() {
    document.getElementById("Button1").disabled = false;
    document.getElementById("Button1").style.backgroundColor = "#6f459e";
}
// Initial delay for animation speed

let isPaused = false;

// Function to pause and resume the sort
function pauseResumeSort() {
    isPaused = !isPaused;
}
let delay = 300;
// Function to change the animation speed based on the slider value
function changeSpeed(value) {
    delay = 9999 - parseInt(value); // Adjust the range of delay based on your requirements
    document.getElementById("speedLabel").innerText = `Speed: ${value}`;
}

async function SelectionSort(delay = 300) {
    // Disable buttons at the beginning
    disable();

    let bars = document.querySelectorAll(".bar");
    var min_idx = 0;
    for (var i = 0; i < bars.length; i += 1) {
        min_idx = i;
        bars[i].style.backgroundColor = "darkblue";

        for (var j = i + 1; j < bars.length; j += 1) {
            if (isPaused) {
                // Pause the execution until resumed
                await new Promise((resolve) => {
                    const checkPause = () => {
                        if (!isPaused) {
                            resolve();
                        } else {
                            setTimeout(checkPause, 50);
                        }
                    };
                    checkPause();
                });
            }

            bars[j].style.backgroundColor = "red";

            // Pause the execution of code for a specified delay
            await new Promise((resolve) => setTimeout(resolve, delay));

            var val1 = parseInt(bars[j].childNodes[0].innerHTML);
            var val2 = parseInt(bars[min_idx].childNodes[0].innerHTML);

            if (val1 < val2) {
                if (min_idx !== i) {
                    bars[min_idx].style.backgroundColor = "rgb(24, 190, 255)";
                }
                min_idx = j;
            } else {
                bars[j].style.backgroundColor = "rgb(24, 190, 255)";
            }
        }

        var temp1 = bars[min_idx].style.height;
        var temp2 = bars[min_idx].childNodes[0].innerText;
        bars[min_idx].style.height = bars[i].style.height;
        bars[i].style.height = temp1;
        bars[min_idx].childNodes[0].innerText = bars[i].childNodes[0].innerText;
        bars[i].childNodes[0].innerText = temp2;

        // Pause the execution of code for a specified delay
        await new Promise((resolve) => setTimeout(resolve, delay));

        bars[min_idx].style.backgroundColor = "rgb(24, 190, 255)";
        bars[i].style.backgroundColor = "rgb(49, 226, 13)";
    }

    enableRandomizeButton();
    document.getElementById("Button2").disabled = false;
    document.getElementById("Button2").style.backgroundColor = "#6f459e";
    // Enable buttons after the final (sorted) state
    enableButtons();
}


function disable1() {
    // To disable the button "Generate New Array" 
    document.getElementById("Button1").disabled = false;
    document.getElementById("Button1");

    // To disable the button "Selection Sort" 
    document.getElementById("Button3").disabled = false;
    document.getElementById("Button3").style.backgroundColor = "#d8b6ff";
}


let insertionSortInProgress = false;

document.getElementById("stopButton").addEventListener("click", stopSorting);

function stopSorting() {
    isPaused = true; // Pause the sorting
    insertionSortInProgress = false; // Reset the sorting flag

    let bars = document.querySelectorAll(".bar");

    // Revert the color of all bars to the original state
    bars.forEach((bar) => {
        bar.style.backgroundColor = "rgb(49, 226, 13)";
    });

    // Enable all buttons
    enableButtons();
}

async function insertionSort(delay = 300) {
    // Check if insertion sort is already in progress
    if (insertionSortInProgress) {
        return;
    }

    // Set the flag to indicate that insertion sort is now in progress
    insertionSortInProgress = true;

    // Disable buttons at the beginning
    disable1();

    let bars = document.querySelectorAll(".bar");

    for (var i = 1; i < bars.length; i++) {
        var key = parseInt(bars[i].childNodes[0].innerHTML);
        var j = i - 1;

        bars[i].style.backgroundColor = "darkblue";

        while (j >= 0 && parseInt(bars[j].childNodes[0].innerHTML) > key) {
            if (isPaused) {
                // Pause the execution until resumed
                await new Promise((resolve) => {
                    const checkPause = () => {
                        if (!isPaused) {
                            resolve();
                        } else {
                            setTimeout(checkPause, 50);
                        }
                    };
                    checkPause();
                });
            }

            // Check if sorting is requested to stop
            if (!insertionSortInProgress) {
                enableRandomizeButton();
                return; // Exit the function
            }

            bars[j].style.backgroundColor = "red";

            // Pause the execution of code for a specified delay
            await new Promise((resolve) => setTimeout(resolve, delay));

            // Swap the elements
            var temp1 = bars[j + 1].style.height;
            var temp2 = bars[j + 1].childNodes[0].innerText;
            bars[j + 1].style.height = bars[j].style.height;
            bars[j].style.height = temp1;
            bars[j + 1].childNodes[0].innerText = bars[j].childNodes[0].innerText;
            bars[j].childNodes[0].innerText = temp2;

            // Move to the previous element
            j--;

            bars[j + 1].style.backgroundColor = "rgb(24, 190, 255)";
        }

        // Set the current bar to its original color
        bars[j + 1].style.backgroundColor = "rgb(49, 226, 13)";
    }

    // Ensure proper button re-enabling and styling
    enableRandomizeButton();

    // Reset the flag to indicate that insertion sort is now completed
    isPaused = false;
    insertionSortInProgress = false;

    document.getElementById("Button3").disabled = false;
    document.getElementById("Button3").style.backgroundColor = "#6f459e";
    // Enable buttons after the final (sorted) state
    enableButtons();
}


// Function to disable buttons for the current sort
function disable2() {
    document.getElementById("Button1").disabled = false;
    document.getElementById("Button1");

    document.getElementById("Button4").disabled = false;
    document.getElementById("Button4").style.backgroundColor = "#d8b6ff";
}

// Variable to track if bubble sort is in progress
let bubbleSortInProgress = false;

// Event listener for the "stopButton"
document.getElementById("stopButton").addEventListener("click", stopSorting);

// Function to stop the sorting
function stopSorting() {
    isPaused = true; // Pause the sorting
    bubbleSortInProgress = false; // Reset the sorting flag

    let bars = document.querySelectorAll(".bar");

    // Revert the color of all bars to the original state
    bars.forEach((bar) => {
        bar.style.backgroundColor = "rgb(49, 226, 13)";
    });

    // Enable all buttons
    enableButtons();
}

// Bubble Sort function
async function bubbleSort(delay = 300) {
    // Check if bubble sort is already in progress
    if (bubbleSortInProgress) {
        return;
    }

    // Set the flag to indicate that bubble sort is now in progress
    bubbleSortInProgress = true;

    // Disable buttons at the beginning
    disable2();

    let bars = document.querySelectorAll(".bar");

    for (let i = 0; i < bars.length - 1; i++) {
        for (let j = 0; j < bars.length - i - 1; j++) {
            if (isPaused) {
                // Pause the execution until resumed
                await new Promise((resolve) => {
                    const checkPause = () => {
                        if (!isPaused) {
                            resolve();
                        } else {
                            setTimeout(checkPause, 50);
                        }
                    };
                    checkPause();
                });
            }

            bars[j].style.backgroundColor = "darkblue";
            bars[j + 1].style.backgroundColor = "darkblue";

            // Pause the execution of code for a specified delay
            await new Promise((resolve) => setTimeout(resolve, delay));

            let val1 = parseInt(bars[j].childNodes[0].innerHTML);
            let val2 = parseInt(bars[j + 1].childNodes[0].innerHTML);

            if (val1 > val2) {
                // Swap the elements
                let temp1 = bars[j].style.height;
                let temp2 = bars[j].childNodes[0].innerText;
                bars[j].style.height = bars[j + 1].style.height;
                bars[j + 1].style.height = temp1;
                bars[j].childNodes[0].innerText = bars[j + 1].childNodes[0].innerText;
                bars[j + 1].childNodes[0].innerText = temp2;
            }

            bars[j].style.backgroundColor = "rgb(24, 190, 255)";
            bars[j + 1].style.backgroundColor = "rgb(24, 190, 255)";
        }

        // Set the last bar to its original color as it is in its final position
        bars[bars.length - i - 1].style.backgroundColor = "rgb(49, 226, 13)";
    }

    // Ensure proper button re-enabling and styling
    enableRandomizeButton();

    // Reset the flag to indicate that bubble sort is now completed
    isPaused = false;
    bubbleSortInProgress = false;

    // Enable buttons after the final (sorted) state
    enableButtons();
}

function disable3() {
    // To disable the button "Generate New Array" 
    document.getElementById("Button1").disabled = false;
    document.getElementById("Button1");

    // To disable the button "Selection Sort" 
    document.getElementById("Button5").disabled = false;
    document.getElementById("Button5").style.backgroundColor = "#d8b6ff";
}

document.getElementById("stopButton").addEventListener("click", stopSorting);

function stopSorting() {
    isPaused = true; // Pause the sorting
    quickSortInProgress = false; // Reset the sorting flag

    let bars = document.querySelectorAll(".bar");

    // Revert the color of all bars to the original state
    bars.forEach((bar) => {
        bar.style.backgroundColor = "rgb(49, 226, 13)";
    });

    // Enable all buttons
    enableButtons();
}
let bars = document.querySelectorAll(".bar");
async function quickSort(start = 0, end = bars.length - 1, delay = 300) {
    if (start < end) {
        let pivotIndex = await partition(start, end, delay);
        await quickSort(start, pivotIndex - 1, delay);
        await quickSort(pivotIndex + 1, end, delay);
    }
}

async function partition(start, end, delay) {
    let pivotIndex = start;
    let pivotValue = parseInt(bars[end].childNodes[0].innerText);
    bars[end].style.backgroundColor = "darkblue";

    for (let i = start; i < end; i++) {
        if (isPaused) {
            await pauseExecution(delay);
            i--; // decrement i to stay at the same position in the next iteration
            continue;
        }

        bars[i].style.backgroundColor = "red";
        await pauseExecution(delay);

        let currentValue = parseInt(bars[i].childNodes[0].innerText);

        if (currentValue < pivotValue) {
            await swap(i, pivotIndex, delay);
            pivotIndex++;
        }

        bars[i].style.backgroundColor = "rgb(24, 190, 255)";
    }

    await swap(pivotIndex, end, delay);

    bars[end].style.backgroundColor = "rgb(24, 190, 255)";

    return pivotIndex;
}

async function pauseExecution(delay) {
    // Pause the execution of code for a specified delay
    return new Promise((resolve) => setTimeout(resolve, delay));
}

async function swap(i, j, delay) {
    let temp1 = bars[i].style.height;
    let temp2 = bars[i].childNodes[0].innerText;

    bars[i].style.height = bars[j].style.height;
    bars[j].style.height = temp1;

    bars[i].childNodes[0].innerText = bars[j].childNodes[0].innerText;
    bars[j].childNodes[0].innerText = temp2;

    await pauseExecution(delay);
}





function disable4() {
    // To disable the button "Generate New Array" 
    document.getElementById("Button1").disabled = false;
    document.getElementById("Button1");

    // To disable the button "Selection Sort" 
    document.getElementById("Button6").disabled = false;
    document.getElementById("Button6").style.backgroundColor = "#d8b6ff";
}

async function mergeSort() {
    const bars = document.querySelectorAll(".bar");
    await performMergeSort(bars, 0, bars.length - 1);
}

async function performMergeSort(bars, start, end, delay = 100) {
    if (start < end) {
        const mid = Math.floor((start + end) / 2);

        await performMergeSort(bars, start, mid, delay);
        await performMergeSort(bars, mid + 1, end, delay);

        await merge(bars, start, mid, end, delay);
    }
}

async function merge(bars, start, mid, end, delay) {
    const leftArray = [];
    const rightArray = [];

    for (let i = start; i <= mid; i++) {
        leftArray.push({ height: bars[i].style.height, id: parseInt(bars[i].childNodes[0].innerText) });
    }

    for (let i = mid + 1; i <= end; i++) {
        rightArray.push({ height: bars[i].style.height, id: parseInt(bars[i].childNodes[0].innerText) });
    }

    let i = 0,
        j = 0,
        k = start;

    while (i < leftArray.length && j < rightArray.length) {
        const value1 = leftArray[i].id;
        const value2 = rightArray[j].id;

        bars[k].style.backgroundColor = "darkblue";
        await new Promise((resolve) => setTimeout(resolve, delay));

        if (value1 <= value2) {
            bars[k].style.height = leftArray[i].height;
            bars[k].childNodes[0].innerText = leftArray[i].id;
            i++;
        } else {
            bars[k].style.height = rightArray[j].height;
            bars[k].childNodes[0].innerText = rightArray[j].id;
            j++;
        }

        k++;
    }

    while (i < leftArray.length) {
        bars[k].style.backgroundColor = "darkblue";
        await new Promise((resolve) => setTimeout(resolve, delay));
        bars[k].style.height = leftArray[i].height;
        bars[k].childNodes[0].innerText = leftArray[i].id;
        i++;
        k++;
    }

    while (j < rightArray.length) {
        bars[k].style.backgroundColor = "darkblue";
        await new Promise((resolve) => setTimeout(resolve, delay));
        bars[k].style.height = rightArray[j].height;
        bars[k].childNodes[0].innerText = rightArray[j].id;
        j++;
        k++;
    }

    updateMergeSortColors(bars, start, mid, end, i, j);
}


function updateMergeSortColors(bars, start, mid, end, i, j) {
    for (let k = start; k <= end; k++) {
        if (k >= start && k <= mid) {
            bars[k].style.backgroundColor = "rgb(24, 190, 255)";
        } else if (k >= mid + 1 && k <= end) {
            bars[k].style.backgroundColor = "rgb(24, 190, 255)";
        }

        if (i > 0) {
            bars[start + i - 1].style.backgroundColor = "rgb(49, 226, 13)";
        }

        if (j > 0) {
            bars[mid + j].style.backgroundColor = "rgb(49, 226, 13)";
        }
    }
}




// Function to disable buttons for the current sort
function disable5() {
    document.getElementById("Button1").disabled = false;
    document.getElementById("Button7").disabled = false;
    document.getElementById("Button7").style.backgroundColor = "#d8b6ff";
}

// Variable to track if shell sort is in progress
let shellSortInProgress = false;

// Event listener for the "stopButton"
document.getElementById("stopButton").addEventListener("click", stopSorting);

// Function to stop the sorting
function stopSorting() {
    isPaused = true; // Pause the sorting
    shellSortInProgress = false; // Reset the sorting flag
}

// Shell Sort function
async function shellSort(delay = 300) {
    // Check if shell sort is already in progress
    if (shellSortInProgress) {
        return;
    }

    // Set the flag to indicate that shell sort is now in progress
    shellSortInProgress = true;

    // Disable buttons at the beginning
    disable5();

    let bars = document.querySelectorAll(".bar");
    let n = bars.length;

    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < n; i += 1) {
            let temp1 = bars[i].style.height;
            let temp2 = bars[i].childNodes[0].innerText;
            let j;

            for (j = i; j >= gap && parseInt(bars[j - gap].childNodes[0].innerText) > parseInt(temp2); j -= gap) {
                if (isPaused) {
                    // Pause the execution until resumed
                    await new Promise((resolve) => {
                        const checkPause = () => {
                            if (!isPaused) {
                                resolve();
                            } else {
                                setTimeout(checkPause, 50);
                            }
                        };
                        checkPause();
                    });
                }

                bars[j].style.backgroundColor = "darkblue";
                bars[j - gap].style.backgroundColor = "red";

                // Pause the execution of code for a specified delay
                await new Promise((resolve) => setTimeout(resolve, delay));

                bars[j].style.height = bars[j - gap].style.height;
                bars[j].childNodes[0].innerText = bars[j - gap].childNodes[0].innerText;
            }

            bars[j].style.backgroundColor = "rgb(24, 190, 255)";
            bars[i].style.backgroundColor = "rgb(49, 226, 13)";

            bars[j].style.height = temp1;
            bars[j].childNodes[0].innerText = temp2;

            if (isPaused) {
                // Pause the execution until resumed
                await new Promise((resolve) => {
                    const checkPause = () => {
                        if (!isPaused) {
                            resolve();
                        } else {
                            setTimeout(checkPause, 50);
                        }
                    };
                    checkPause();
                });
            }
        }
    }

    // Ensure proper button re-enabling and styling
    enableRandomizeButton();

    // Reset the flag to indicate that shell sort is now completed
    isPaused = false;
    shellSortInProgress = false;

    // Enable buttons after the final (sorted) state
    enableButtons();
}



function changeSize(sizeFactor) {
    const bars = document.querySelectorAll(".bar");

    bars.forEach((bar) => {
        const currentHeight = parseInt(bar.style.height);
        const newSize = Math.max(currentHeight * sizeFactor, 5); // Ensure a minimum size

        bar.style.height = `${newSize}px`;
    });
}
