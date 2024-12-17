// Task array to store tasks
let tasks = [];
let editIndex = -1;  // Track which task is being edited

// Get DOM elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const searchInput = document.getElementById('search-input');

// Modal elements
const editModal = document.getElementById('edit-modal');
const editTaskInput = document.getElementById('edit-task-input');
const saveEditBtn = document.getElementById('save-edit-btn');
const cancelEditBtn = document.getElementById('cancel-edit-btn');

// Load tasks from local storage
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
    renderTasks();
}

// Save tasks to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add task function
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText) {
        const newTask = {
            name: taskText,
            isComplete: false,
        };
        tasks.push(newTask);
        taskInput.value = '';  // Clear input
        saveTasks();  // Save tasks
        renderTasks();  // Update task list
    }
}

// Render tasks
function renderTasks() {
    taskList.innerHTML = '';  // Clear task list

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.toggle('completed', task.isComplete);
        li.innerHTML = `
            <input type="checkbox" onclick="toggleComplete(${index})" ${task.isComplete ? 'checked' : ''}>
            <span>${task.name}</span>
            <button onclick="openEditModal(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// Toggle task completion
function toggleComplete(index) {
    tasks[index].isComplete = !tasks[index].isComplete;
    saveTasks();
    renderTasks();
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);  // Remove task
    saveTasks();
    renderTasks();
}

// Open Edit Modal
function openEditModal(index) {
    editIndex = index;
    editTaskInput.value = tasks[index].name;
    editModal.style.display = 'flex';
}

// Close Edit Modal
function closeEditModal() {
    editModal.style.display = 'none';
}

// Save edited task
saveEditBtn.addEventListener('click', () => {
    const newTaskName = editTaskInput.value.trim();
    if (newTaskName) {
        tasks[editIndex].name = newTaskName;
        saveTasks();
        renderTasks();
        closeEditModal();
    }
});

// Cancel editing
cancelEditBtn.addEventListener('click', closeEditModal);

// Search tasks
function searchTasks() {
    const query = searchInput.value.toLowerCase();
    const filteredTasks = tasks.filter(task => task.name.toLowerCase().includes(query));
    renderFilteredTasks(filteredTasks);
}

// Render filtered tasks
function renderFilteredTasks(filteredTasks) {
    taskList.innerHTML = '';
    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.toggle('completed', task.isComplete);
        li.innerHTML = `
            <input type="checkbox" onclick="toggleComplete(${index})" ${task.isComplete ? 'checked' : ''}>
            <span>${task.name}</span>
            <button onclick="openEditModal(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// Event Listeners
addTaskBtn.addEventListener('click', addTask);
searchInput.addEventListener('input', searchTasks);

// Initial rendering of tasks
loadTasks();
