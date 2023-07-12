
// Constants & Variables
// ---------------------------

// html query selectors 
const toDoText = document.querySelector("#to-do-text");
const toDoBox = document.querySelector("#to-do-box");
const completedBox = document.querySelector("#completed-box");


// new variables 
let toDoList = []; 
let completedList = [];
let archiveList = [];


// Functions
// ---------------------------

// 5. archive completed tasks
const deleteLine = (e) => {
    // remove line from completed 
    let lineToRemove2 = e.target.parentNode;
    lineToRemove2.remove()
        // remove value from completedList & add to archiveList
        let valueToMove2 = e.target.parentNode.textContent
        let indexOfVTM2 = completedList.indexOf(valueToMove2)
        completedList.splice(indexOfVTM2, 1)
        archiveList.push(valueToMove2)

        console.log(`todolist: ${toDoList}`)
        console.log(`completed: ${completedList}`);
        console.log(`archived: ${archiveList}`);
        //**** NOTE : the array doesn't really work if there's duplicates. 
        // i think i might be able to write more efficient code with the arrays. 
        // but at the moment, i'm not using the arrays. :/

}

// 4. deleting to do from to do list 
const xLine = (e) => {
    let lineToRemove3 = e.target.parentNode;
        // remove line from todo 
        lineToRemove3.remove()
            // remove value from toDoList array 
            let valueToMove3 = e.target.parentNode.textContent
            let indexOfVTM3 = toDoList.indexOf(valueToMove3)
            let indexOfVTM4 = completedList.indexOf(valueToMove3)
            toDoList.splice(indexOfVTM3, 1)
            completedList.splice(indexOfVTM4, 1)
}

// 3. ticking to do, transferring to completed
const tickLine = (e) => {
    let lineToRemove = e.target.parentNode;
        // remove line from todo 
        lineToRemove.remove()
            // remove value from toDoList array & add to completed array
            let valueToMove = e.target.parentNode.textContent
            let indexOfVTM = toDoList.indexOf(valueToMove)
            toDoList.splice(indexOfVTM, 1)
            completedList.push(valueToMove)

        // append to completed
        completedBox.appendChild(lineToRemove)
            // remove circle button 
            let removeCircle = lineToRemove.querySelector(".circle-button")
            removeCircle.remove()
            // create delete button
            const deleteButton = document.createElement("img");
            deleteButton.src = "images-tdl/delete-bin-grey.png";
            deleteButton.classList.add("delete-button")
            // append the delete button 
            lineToRemove.appendChild(deleteButton)
            // add a click listener to delete button 
            deleteButton.addEventListener("click", deleteLine)    
}

// 2. adding to do 
const addToDo = (e) => {
    if (e.keyCode === 13){
    let inputValue = toDoText.value;
    // create an array of todothings. 
    toDoList.push(inputValue);

    // create a new container to store each todo. 
    const toDoLine = document.createElement("div")
    toDoLine.classList.add("to-do-line")
    toDoLine.textContent = inputValue

        //create circle button
        const circleButton = document.createElement("img")
        circleButton.src = "images-tdl/circle.png"
        circleButton.classList.add("circle-button")
        // add a click listener to tick button 
        circleButton.addEventListener("click", tickLine)
            //create x button
            const xButton = document.createElement("img")
            xButton.src = "images-tdl/delete-x-grey.png"
            xButton.classList.add("x-button")
            // add a click listener to x button 
            xButton.addEventListener("click", xLine)
    
    // append to the todobox. 
    toDoBox.appendChild(toDoLine)
    toDoLine.appendChild(circleButton)
    let firstChild = toDoLine.firstChild;
    toDoLine.insertBefore(xButton,firstChild)
    
    // reset text value
    toDoText.value = "";
    }
}

// 1. Add to todo everytime you click enter
toDoText.addEventListener("keyup", addToDo); 


// MediaQuery
// ---------------------------

const updateMaxLength = () => {
    if (window.innerWidth <= 768) {
        toDoText.setAttribute('maxlength', '18');
      } 
}

window.addEventListener('resize', updateMaxLength);

updateMaxLength();

// *** NOTE - length of text for different screens not very useable yet.