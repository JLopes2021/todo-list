document.addEventListener('DOMContentLoaded', function() {
    const newTaskInput = document.getElementById('newTask');
    const taskList = document.getElementById('taskList');
    const completedList = document.getElementById('completedList');

    // Adicionando o botão "Apagar Tudo" via JavaScript
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Apagar Tudo';
    clearButton.addEventListener('click', clearAllTasks);
    document.body.appendChild(clearButton);

     function addTask() {
        const taskText = newTaskInput.value.trim();

        if (taskText !== '') {
            const tasks = taskText.split(';');

            tasks.forEach(task => {
                if (task.trim() !== '') {
                    const li = document.createElement('li');
                    const now = new Date(); // Obtém a data e hora atual
                    const timestamp = now.toLocaleString(); // Formata a data e hora

                    const taskElement = document.createElement('span');
                    taskElement.classList.add('task');
                    taskElement.textContent = task;

                    const timestampElement = document.createElement('span');
                    timestampElement.classList.add('timestamp');
                    timestampElement.textContent = ` - ${timestamp}`;

                    li.appendChild(taskElement);
                    li.appendChild(timestampElement);

                    li.innerHTML += `
                        <button class="remove">Remover</button>
                        <button class="completeButton">Concluído</button>
                    `;

                    taskList.appendChild(li);

                    li.querySelector('.remove').addEventListener('click', removeTask);
                    li.querySelector('.completeButton').addEventListener('click', toggleComplete);
                }
            });

            newTaskInput.value = '';
        }
    }

    function removeTask() {
        this.parentElement.remove();
    }

    function toggleComplete() {
        this.parentElement.children[0].classList.toggle('complete');

        if (this.parentElement.parentElement === taskList) {
            // A tarefa está na lista de tarefas
            completedList.appendChild(this.parentElement);
            this.parentElement.querySelector('.remove').remove();
            this.remove();
        } else {
            // A tarefa está na lista de tarefas concluídas
            taskList.appendChild(this.parentElement);
            this.parentElement.querySelector('.completeButton').remove();
            this.remove();
        }
    }

    function clearAllTasks() {
        taskList.innerHTML = '';
        completedList.innerHTML = '';
    }

    newTaskInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
