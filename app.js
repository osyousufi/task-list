//define ui vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load event listeners
loadEventListeners();

function loadEventListeners() {
  //DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  //add task event
  form.addEventListener('submit', addTask);
  //remove task event
  taskList.addEventListener('click', removeTask);
  //clear tasks event
  clearBtn.addEventListener('click', clearTasks);
  //filter taks event
  filter.addEventListener('keyup', filterTasks)
}

//get tasks from LS
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    //create li element
    const li = document.createElement('li');
    // add class
    li.className = 'collection-item';
    //create text node & append to li
    li.appendChild(document.createTextNode(task));
    //create link element
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>'
    //append link to li
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);
  });
}

//add task function
function addTask(e) {
  //handle empty case
  if (taskInput.value === '') {
    alert('Add a task')
    return null
  }
  //create li element
  const li = document.createElement('li');
  // add class
  li.className = 'collection-item'
  //create text node & append to li
  li.appendChild(document.createTextNode(taskInput.value));
  //create link element
  const link = document.createElement('a')
  //add class
  link.className = 'delete-item secondary-content';
  //add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>'
  //append link to li
  li.appendChild(link);
  //append li to ul
  taskList.appendChild(li);

  //store in LS
  storeTaskInLocalStorage(taskInput.value);

  taskInput.value = '';

  e.preventDefault();
}

//store task function
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}


//remove task function
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      //remove from ls
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }

}

function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    console.log(index);
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks() {

  if (confirm("Are you sure?")) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);

      //clear tasks from LS
      clearTasksFromLocalStorage();
    }
  }

}

function clearTasksFromLocalStorage(){
  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(
    function(task) {
      const item = task.firstChild.textContent.toLowerCase();
      if (item.indexOf(text) != -1) {
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    });
}
