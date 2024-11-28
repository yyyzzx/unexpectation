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
    let colors1 = ["#00ad77", "#7ee79c", "#adebd7"];
    let colors2 = ["#2d9ebb", "#c0f1f4", "#81defc"];
    let colors3 = ["#c881b3", "#ffbbde", "#f9a6c5"];
    let colors4 = ["#9e51aa", "#9e66d7", "#c2a6da"];
    let boxImgs = document.querySelectorAll("img");
    let letters = document.querySelectorAll(".heading div");
    let heading = document.querySelector(".heading");
    let colorGroups = [colors1, colors2, colors3, colors4];
    let selectedGroup = colorGroups[Math.floor(Math.random() * colorGroups.length)];
    
    for (let box of boxesJP) {

        let randomColor = selectedGroup[Math.floor(Math.random() * selectedGroup.length)];
        box.dataset.originalColor = randomColor; // Store the color for later use
        

        let randomTop = 6 + Math.random() * (68 - 6);
        let randomLeft = 5 + Math.random() * (87 - 5);
        let randomWidth = 5 + Math.random() * (10 - 5);
        let randomZIndex = Math.random() * 1;
    
        box.style.backgroundColor = randomColor;
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

    let randomTop = -8 + Math.random() * (82 - (-8));
    heading.style.top = randomTop + "vh";
    heading.style.transition = "2s";

    for (let letter of letters) {
        let randomWeight = 200 + Math.random() * (700 - 200); 
        let randomSize = 0.8 + Math.random() * (3.2 - 0.8);

        letter.style.fontVariationSettings = "'wght'" + randomWeight;
        letter.style.transform = "scale(" + randomSize + ")";
        letter.style.transition = "2s";
    }
}

// Add event listeners to each box
let boxesJP = document.querySelectorAll(".img-box");
let boxImgs = document.querySelectorAll("img");
let letters = document.querySelectorAll(".heading div");

boxesJP.forEach(box => {
    // Store the original background color using a data attribute
    let originalColor = box.style.backgroundColor || getComputedStyle(box).backgroundColor;
    box.dataset.originalColor = originalColor; // Save it to a data attribute

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
            number.style.fontSize = "7pt"; 
            number.style.padding = "0";
            number.style.transition = "0.8s";
        });

        letters.forEach(letter => {
            letter.style.opacity = "0";
            letter.style.transition = "0.8s";
        });

        // Set opacity to 0 for numbers in all other boxes
        boxesJP.forEach(otherBox => {
            if (otherBox !== box) { // Skip the hovered box
                let otherNumbers = otherBox.querySelectorAll(".number p");
                otherNumbers.forEach(otherNumber => {
                    otherNumber.style.opacity = "0"; // Hide numbers in other boxes
                });
                otherBox.style.opacity = "0.5";
                otherBox.style.transition = "0.8s";
            }
        });
    });

    box.addEventListener("mouseout", () => {
        startInterval(); 
    
        box.style.backgroundColor = box.dataset.originalColor; // Restore the original color
        box.style.zIndex = ""; 

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
            number.style.fontSize = "13pt"; 
            number.style.padding = "5px 3px";
            number.style.transition = "0.8s";
        });

        letters.forEach(letter => {
            letter.style.color = "black";
            letter.style.opacity = "1";
            letter.style.transition = "0.8s";
        });

        // Restore opacity for numbers in all other boxes
        boxesJP.forEach(otherBox => {
            if (otherBox !== box) { // Skip the hovered box
                let otherNumbers = otherBox.querySelectorAll(".number p");
                otherNumbers.forEach(otherNumber => {
                    otherNumber.style.opacity = "1"; // Restore numbers in other boxes
                });
                otherBox.style.opacity = "1";
                otherBox.style.transition = "0.8s";
            }
        });
    });
});

startInterval();





