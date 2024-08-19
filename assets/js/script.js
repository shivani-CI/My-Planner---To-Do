document.addEventListener('DOMContentLoaded', () => {
    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const taskList = document.getElementById('taskList');
    const taskInput = document.getElementById('taskInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const categoryInput = document.getElementById('categoryInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const searchInput = document.getElementById('searchInput');
    const sidebarLinks = document.querySelectorAll('#sidebar .nav-links');

    let filteredTasks = [...tasks];

    // Save tasks to local storage
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Render tasks to the list
    const renderTasks = () => {
        taskList.innerHTML = '';
        filteredTasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = `list-group-item d-flex justify-content-between align-items-center${task.completed ? ' completed' : ''}`;
            taskItem.innerHTML = `
                <div>
                    <input type="checkbox" class="form-check-input me-2" ${task.completed ? 'checked' : ''}>
                    <span class="task-desc">${task.description}</span>
                    ${task.dueDate ? `<small class="due-date ms-2 ${new Date(task.dueDate) < new Date() ? 'overdue' : ''}">(${task.dueDate})</small>` : ''}
                </div>
                <div>
                    <button class="edit-btn btn btn-primary btn-sm me-2">Edit</button>
                    <button class="delete-btn btn btn-danger btn-sm">Delete</button>
                    <i class="important-btn fa${task.important ? 's' : 'r'} fa-star me-3"></i>
                    <i class="flag-btn fa${task.flagged ? 's' : 'r'} fa-flag"></i>
                </div>
                `;

            // Mark task as completed
            taskItem.querySelector('input[type="checkbox"]').addEventListener('click', () => {
                task.completed = !task.completed;
                saveTasks();
                renderTasks();
            });

            // Toggle important status
            taskItem.querySelector('.important-btn').addEventListener('click', () => {
                task.important = !task.important;
                saveTasks();
                renderTasks();
            });

            // Toggle flagged status
            taskItem.querySelector('.flag-btn').addEventListener('click', () => {
                task.flagged = !task.flagged;
                saveTasks();
                renderTasks();
            });

            // Delete task
            taskItem.querySelector('.delete-btn').addEventListener('click', () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });

            // Edit task
            taskItem.querySelector('.edit-btn').addEventListener('click', () => {
                const newDescription = prompt('Edit task description:', task.description);
                if (newDescription) {
                task.description = newDescription;
                saveTasks();
                renderTasks();
                }
            });

            taskList.appendChild(taskItem);
        });
    };

    // Filter tasks based on sidebar selection
    const filterTasks = (filter) => {
        switch (filter) {
            case 'all':
                filteredTasks = [...tasks];
                break;
            case 'important':
                filteredTasks = tasks.filter(task => task.important);
                break;
            case 'planned':
                filteredTasks = tasks.filter(task => task.category === 'Planned');
                break;
            case 'flagged':
                filteredTasks = tasks.filter(task => task.flagged);
                break;
            default:
                filteredTasks = [...tasks];
        }
        renderTasks();
    };

    // Sidebar link click events
    sidebarLinks.forEach(link =>) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            sidebarLinks.forEach(link => link.classList.remove('active'));
            e.target.classList.add('active');
            const filter = e.target.getAttribute('data-filter');
            filterTasks(filter);
        })
    });

    



    // Initial render
    filterTasks('all');
});




