const addBtn = document.getElementById("add-btn");
const Modal = document.getElementById("modal");
const cancelModal = document.getElementById("cancel-modal");
const taskName = document.getElementById("task-name");
const taskPriority = document.getElementById("task-priority");
const taskStatus = document.getElementById("task-status");
const taskDeadline = document.getElementById("task-deadline");
const toDoList = document.getElementById("todo-list");
const modalBox = document.getElementById("modal-box");
let loading = false;
const body = document.getElementById("body")
let tasks = [];
const saveBtn = document.getElementById("save-btn");
const modalDetails = document.getElementById("modal-details");
const taskNameError = document.getElementById("taskName-error");


// const priority = taskPriority.value;
// const status = taskStatus.value;
// const deadline = taskDeadline.value;
// const name = taskName.value;

// save to local storage

function saveToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));    
}

// get data from local storage

function getDataFromLocalStorage() {
    const stored =localStorage.getItem("tasks");
    if(stored){
        tasks = JSON.parse(stored);
    }
    renderTable();
}


// add new tasks

function saveTask() {
    if (taskName.value.trim() ==="") {
        taskNameError.style.display = "block";
        return;
    }else{
        taskNameError.style.display = "none";
    }

        if (!loading) {
            loading = true;
        loadingHandler();
            setTimeout(()=>{
                const task = {
                    id: Date.now(), 
                    name: taskName.value,
                    priority: taskPriority.value,
                    status: taskStatus.value,
                    deadline: taskDeadline.value,
                }
                tasks.push(task);
                saveToLocalStorage();
                renderTable();
        
            taskName.value="";
            taskPriority.value="Please choose an option";
            taskStatus.value ="Please choose an option";
            taskDeadline.value="";
            closeModal();
            loading =false; 
            loadingHandler();
        },2000)
    
        
    }
}

function renderTable() {
    toDoList.innerHTML = "";
    tasks.forEach((item)=>{
        const backgroundColorPriority = getPriorityClass(item.priority);
        const backgroundColorStatus = getStatusClass(item.status);
        const newRow = document.createElement("tr")
        newRow.innerHTML = `
        <td class="p-0.5 text-center border border-gray-400">${item.name}</td>
        <td class="p-0.5 text-center border border-gray-400 "><p class=" border rounded-3xl m-1.5 p-0.5 max-w-[50%] mx-auto
        ${backgroundColorPriority}">${item.priority}</p>
        </td>
        <td class="p-0.5 text-center border border-gray-400"> 
        <p class=" border rounded-3xl m-1.5 p-0.5 max-w-[50%] mx-auto
        ${backgroundColorStatus}">${item.status}</p>
        </td>
        <td id="div-deadline" class="p-2 text-center border border-gray-400">
          <div id="deadline" class="border rounded-md border-blue-500 mx-auto max-w-[50%] ">${item.deadline}</div>
        </td>
        <td class="p-2 text-center border border-gray-400">
           <div class="flex flex-row gap-3 justify-center items-center">
              <button class="bg-red-600 w-6  bg-blue-400 hover:bg-green-700 rounded" onclick="deleteTasks(${item.id})"><img src="./assets/trash.svg"></button>
              <button class="bg-blue-500 w-6  bg-blue-400 hover:bg-green-700 rounded"  onclick="editTask(${item.id})"><img src="./assets/edit-3-svgrepo-com.svg" alt=""></button>
              <button class="bg-gray-600 w-6  bg-blue-400 hover:bg-green-700 rounded" onclick="modalView(${item.id})"><img src="./assets/eye-see-show-svgrepo-com.svg" alt=""></button>
           </div>
       </td>
        `;
        toDoList.appendChild(newRow)
    })  

}
// 🤷‍♂️🤷‍♂️
window.onload = function() {
    getDataFromLocalStorage();
    }
    
// about open && close modal

function openModal() {
    Modal.style.display = "block";
    body.style.backgroundColor = "#d8d5d5";
  }
  function closeModal() {
    Modal.style.display = "none";
    body.style.backgroundColor = "";
  }

function loadingHandler() {
  if (loading) {
    modalBox.style.display = "flex";
  } else {
    modalBox.style.display = "none";
  }
}

// delete tasks

function deleteTasks(id) {
    tasks = tasks.filter((item) => item.id !== id);
    saveToLocalStorage();
    renderTable();
}

// edit tasks 

function editTask(id) {
    const task = tasks.find(item => item.id === id);

    taskName.value = task.name;
    taskPriority.value = task.priority;
    taskStatus.value = task.status;
    taskDeadline.value = task.deadline;
    saveBtn.innerHTML = "Edit";
    saveBtn.onclick = function () {
        updateTask(id)
    };
    openModal();
}

function updateTask(id) {
    const task = tasks.find(item => item.id === id);
    task.name = taskName.value;
    task.priority = taskPriority.value;
    task.status = taskStatus.value;
    task.deadline = taskDeadline.value;
    saveToLocalStorage();
    renderTable();

    taskName.value = "";
    taskPriority.value = "" ;
    taskStatus.value = "";
    taskDeadline.value = "";
    closeModal();
    resetSaveButton();
}

function modalView(id) {
    const task = tasks.find(item => item.id === id);
    modalDetails.style.display = "flex";
    modalDetails.innerHTML = `
    <h2>Task Details</h2>
        <p>Task Name: ${task.name}</p>
        <p>Priority: ${task.priority}</p>
        <p>Status: ${task.status}</p>
        <p>Deadline: ${task.deadline}</p>
        <button class="border-2 border-gray-400 hover:bg-white rounded" onclick="closeViewModal()">Close</button>
    `;
    // openModal();
}
function closeViewModal() {
    modalDetails.style.display = "none";
}
// reset savebtn

function resetSaveButton() {
    saveBtn.innerHTML = "Save"; 
    saveBtn.onclick = saveTask;
}

// select background color

function getPriorityClass(priority) {
    switch (priority) {
        case "High":
            return "bg-red-500 text-white"
        case "Medium":
            return "bg-yellow-400 text-black"
        case "Low":
            return "bg-gray-200 text-black"        
        default:
            return "bg-gray-200 text-black"
    };
    
}

function getStatusClass(status) {
    switch (status) {
        case "To do":
            return "bg-red-500 text-white"
        case "Doing":
            return "bg-yellow-400 text-black"
        case "Done":
            return "bg-green-500 text-white"        
        default:
            return "bg-gray-200 text-black"
    }
    
}

