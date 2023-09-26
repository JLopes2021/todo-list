document.addEventListener('DOMContentLoaded', function() {
    const newTaskInput = document.getElementById('newTask');
    const taskList = document.getElementById('taskList');
    const inProgressList = document.getElementById('inProgressList');
    const completedList = document.getElementById('completedList');

    function addTask(taskText) {
        const tasks = taskText.split(';');

        tasks.forEach(task => {
            if (task.trim() !== '') {
                const li = document.createElement('li');
                const now = new Date(); 
                const timestamp = now.toLocaleString(); 

                const taskElement = document.createElement('span');
                taskElement.classList.add('task');
                taskElement.textContent = task.trim(); 

                const timestampElement = document.createElement('span');
                timestampElement.classList.add('timestamp');
                timestampElement.textContent = ` - Adicionado em ${timestamp}`;

                li.appendChild(taskElement);
                li.appendChild(timestampElement);

                li.innerHTML += `
                    <button class="remove">Remover</button>
                    <button class="completeButton">Concluído</button>
                    <button class="inProgressButton">Em Andamento</button>
                `;

                taskList.appendChild(li);

                li.querySelector('.remove').addEventListener('click', removeTask);
                li.querySelector('.completeButton').addEventListener('click', completeTask);
                li.querySelector('.inProgressButton').addEventListener('click', moveInProgress);
            }
        });

        newTaskInput.value = '';
    }
    function removeTask() {
        this.parentElement.remove();
    }

    function completeTask() {
        const now = new Date(); 
        const timestamp = now.toLocaleString(); 

        this.parentElement.children[0].classList.toggle('complete');
        completedList.appendChild(this.parentElement);

        // Remove todos os botões de ação
        const actionButtons = this.parentElement.querySelectorAll('.remove, .completeButton, .inProgressButton');
        actionButtons.forEach(button => button.remove());

        const timestampElement = document.createElement('span');
        timestampElement.classList.add('timestamp');
        timestampElement.textContent = ` - Concluído em ${timestamp}`;
        this.parentElement.appendChild(timestampElement);
    }

    function moveInProgress() {
        inProgressList.appendChild(this.parentElement);

        // Remove o botão "Em Andamento"
        this.parentElement.querySelector('.inProgressButton').remove();

        // Remove os botões de ação da lista concluída
        const completedButtons = this.parentElement.querySelectorAll('.completeButton, .remove');
        completedButtons.forEach(button => button.remove());

        const now = new Date(); 
        const timestamp = now.toLocaleString(); 

        const timestampElement = document.createElement('span');
        timestampElement.classList.add('timestamp');
        timestampElement.textContent = ` - Em Andamento em ${timestamp}`;
        this.parentElement.appendChild(timestampElement);
    }

    function clearAllTasks() {
        const senha = prompt('Digite a senha para apagar todas as tarefas:');

        if(senha === 'senha'){
            alert('Ok, apagamos todas as tarefas');
            taskList.innerHTML = '';
            inProgressList.innerHTML = '';
            completedList.innerHTML = '';
        } else {
            alert('Senha Incorreta');
        }
    }

    document.getElementById('addTask').addEventListener('click', function() {
        const taskText = newTaskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            newTaskInput.value = '';
        }
    });

    newTaskInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            const taskText = newTaskInput.value.trim();
            if (taskText !== '') {
                addTask(taskText);
                newTaskInput.value = '';
            }
        }
    });

    document.getElementById('clearAll').addEventListener('click', clearAllTasks);

    function getCurrentTimestamp() {
        const now = new Date(); 
        return now.toLocaleString(); 
    }

    function updateClock() {
        const clockElement = document.getElementById('clock');
        clockElement.textContent = getCurrentTimestamp();
        setTimeout(updateClock, 1000);
    }

    updateClock();
});
