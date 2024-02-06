// app.js
document.addEventListener('DOMContentLoaded', function () {
    const tasks = [];

    const upcomingTasks = document.getElementById("upcoming-tasks");
    const overdueTasks = document.getElementById("overdue-tasks");
    const completedTasks = document.getElementById("completed-tasks");
    const searchForm = document.getElementById("search-form");

    // Add task event listener
    const addTaskForm = document.getElementById("add-task-form");
    addTaskForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const taskId = document.getElementById("task-id").value;
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const dueDate = document.getElementById("due-date").value;
        const priority = document.getElementById("priority").value;

        if (taskId) {
            // Edit existing task
            editTask(taskId, title, description, dueDate, priority);
        } else {
            // Add new task
            addTask(title, description, dueDate, priority);
        }

        // Clear the form
        clearTaskForm();
    });

    // Search form event listener
    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const searchQuery = document.getElementById("search-input").value;
        searchTasks(searchQuery);
    });

    function addTask(title, description, dueDate, priority) {
        const newTask = {
            id: tasks.length + 1,
            title,
            description,
            dueDate,
            priority,
            completed: false
        };
        tasks.push(newTask);
        updateTaskLists();
    }

    function editTask(taskId, title, description, dueDate, priority) {
        const taskIndex = tasks.findIndex(task => task.id == taskId);
        if (taskIndex !== -1) {
            tasks[taskIndex] = {
                ...tasks[taskIndex],
                title,
                description,
                dueDate,
                priority
            };
            updateTaskLists();
        }
    }

    function deleteTask(taskId) {
        const taskIndex = tasks.findIndex(task => task.id == taskId);
        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1);
            updateTaskLists();
        }
    }

    function completeTask(taskId) {
        const taskIndex = tasks.findIndex(task => task.id == taskId);
        if (taskIndex !== -1) {
            tasks[taskIndex].completed = true;
            updateTaskLists();
        }
    }

    function updateTaskLists() {
        upcomingTasks.innerHTML = "";
        overdueTasks.innerHTML = "";
        completedTasks.innerHTML = "";

        tasks.forEach(task => {
            const li = addTaskToDOM(task);

            if (task.completed) {
                completedTasks.appendChild(li);
            } else {
                const currentDate = new Date();
                const dueDate = new Date(task.dueDate);

                if (dueDate < currentDate) {
                    overdueTasks.appendChild(li);
                } else {
                    upcomingTasks.appendChild(li);
                }
            }
        });
    }

    function searchTasks(query) {
        const filteredTasks = tasks.filter(task => {
            const lowerCaseQuery = query.toLowerCase();
            return task.title.toLowerCase().includes(lowerCaseQuery) ||
                task.description.toLowerCase().includes(lowerCaseQuery);
        });

        // Display only the searched tasks
        upcomingTasks.innerHTML = "";
        overdueTasks.innerHTML = "";
        completedTasks.innerHTML = "";

        filteredTasks.forEach(task => {
            const li = addTaskToDOM(task);

            if (task.completed) {
                completedTasks.appendChild(li);
            } else {
                const currentDate = new Date();
                const dueDate = new Date(task.dueDate);

                if (dueDate < currentDate) {
                    overdueTasks.appendChild(li);
                } else {
                    upcomingTasks.appendChild(li);
                }
            }
        });
    }

    function addTaskToDOM(task) {
        const li = document.createElement("li");
        li.dataset.taskId = task.id;

        const titleSpan = document.createElement("div");
        titleSpan.textContent = task.title;
        li.appendChild(titleSpan);

        const descriptionSpan = document.createElement("div");
        descriptionSpan.textContent = task.description;
        li.appendChild(descriptionSpan);

        const dueDateSpan = document.createElement("div");
        dueDateSpan.textContent = task.dueDate;
        li.appendChild(dueDateSpan);

        const prioritySpan = document.createElement("div");
        prioritySpan.textContent = task.priority;
        li.appendChild(prioritySpan);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
            deleteTask(task.id);
        });

        const completeButton = document.createElement("button");
        completeButton.textContent = "Complete";
        completeButton.addEventListener("click", function () {
            completeTask(task.id);
        });

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", function () {
            editTaskForm(task);
        });

        const actions = document.createElement("div");
        actions.classList.add("actions");
        actions.appendChild(deleteButton);
        actions.appendChild(completeButton);
        actions.appendChild(editButton);
        li.appendChild(actions);

        return li;
    }

    function editTaskForm(task) {
        document.getElementById("task-id").value = task.id;
        document.getElementById("title").value = task.title;
        document.getElementById("description").value = task.description;
        document.getElementById("due-date").value = task.dueDate;
        document.getElementById("priority").value = task.priority;
    }

    function clearTaskForm() {
        document.getElementById("task-id").value = "";
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        document.getElementById("due-date").value = "";
        document.getElementById("priority").value = "High";
        // Default priority
    }

    // Initial rendering of the dashboard
    updateTaskLists();
});
