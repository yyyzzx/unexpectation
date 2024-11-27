let intervalId;

// Function to start the interval
function startInterval() {
    intervalId = setInterval(updateTime, 2000);
}

// Function to stop the interval
function stopInterval() {
    clearInterval(intervalId);
}

// Update time function
function updateTime() {
    let boxesJP = document.querySelectorAll(".img-box");
    let colorsJP = ["#00ad77", "#7ee79c", "#adebd7"];
    let boxImgs = document.querySelectorAll("img");
    
    for (let box of boxesJP) {
        let randomColor = Math.floor(Math.random() * colorsJP.length);
        let randomTop = 6 + Math.random() * (68 - 6);
        let randomLeft = 5 + Math.random() * (87 - 5);
        let randomWidth = 5 + Math.random() * (10 - 5);
        let randomZIndex = Math.random() * 1;
        
        box.style.backgroundColor = colorsJP[randomColor];
        box.style.transition = "1.5s";
        box.style.top = randomTop + "vh";
        box.style.left = randomLeft + "vw";
        box.style.width = randomWidth + "vw";
        box.style.width = randomZIndex;
        
        // Adjust the width for all images
        for (let img of boxImgs) {
            img.style.width = `calc(${randomWidth}vw - 10px)`;
        }
    }
    
}

// Add event listeners to each box
let boxesJP = document.querySelectorAll(".img-box");
let boxImgs = document.querySelectorAll("img");


boxesJP.forEach(box => {
    box.addEventListener("mouseover", () => {
        stopInterval(); // Stop interval on hover
        box.style.backgroundColor = "transparent"; // Make background color transparent
        box.style.zIndex = "100"; // Bring hovered box to the front
    
        // Set opacity to 1 for the hovered box's content
        let paragraphs = box.querySelectorAll("p");
        let images = box.querySelectorAll("img");
        let numbers = box.querySelectorAll(".number p");

        paragraphs.forEach(p => {
            p.style.opacity = "1"; // Make <p> visible
        });

        images.forEach(img => {
            img.style.opacity = "1"; // Make <img> visible
            img.style.borderRadius = "0";
            img.style.transition = "0.8s";
        });

        numbers.forEach(number => {
            number.style.opacity = "1"; // Make numbers visible
            number.style.fontSize = "0.45vw"; 
            number.style.padding = "0";
            number.style.transition = "0.8s";
        });

        // Set opacity to 0 for numbers in all other boxes
        boxesJP.forEach(otherBox => {
            if (otherBox !== box) { // Skip the hovered box
                let otherNumbers = otherBox.querySelectorAll(".number p");
                otherNumbers.forEach(otherNumber => {
                    otherNumber.style.opacity = "0"; // Hide numbers in other boxes
                });
                otherBox.style.opacity = "0.5";
            }
        });
        
    });

    box.addEventListener("mouseout", () => {
        startInterval(); // Restart interval on mouse out
    
        // Restore random color for the box
        let colorsJP = ["#00ad77", "#7ee79c", "#adebd7"];
        let randomColor = Math.floor(Math.random() * colorsJP.length);
        box.style.backgroundColor = colorsJP[randomColor];
        box.style.zIndex = ""; // Reset zIndex after mouse out

        // Reset opacity for content in the hovered box
        let paragraphs = box.querySelectorAll("p");
        let images = box.querySelectorAll("img");
        let numbers = box.querySelectorAll(".number p");

        paragraphs.forEach(p => {
            p.style.opacity = "0"; // Hide <p>
        });

        images.forEach(img => {
            img.style.opacity = "0"; // Hide <img>
            img.style.borderRadius = "";
        });

        numbers.forEach(number => {
            number.style.opacity = "1"; // Ensure opacity is set back to 1
            number.style.fontSize = "1vw"; 
            number.style.padding = "5px 3px";
            number.style.transition = "0.8s";
        });

        // Restore opacity for numbers in all other boxes
        boxesJP.forEach(otherBox => {
            if (otherBox !== box) { // Skip the hovered box
                let otherNumbers = otherBox.querySelectorAll(".number p");
                otherNumbers.forEach(otherNumber => {
                    otherNumber.style.opacity = "1"; // Restore numbers in other boxes
                });
                otherBox.style.opacity = "1";
            }
        });
    });
});

// Start the interval initially
startInterval();





