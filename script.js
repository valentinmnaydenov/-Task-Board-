const form = document.querySelector('.tasks');
const todoColumn = document.querySelector('.todo');
const inProgressColumn = document.querySelector('.in-progress');
const doneColumn = document.querySelector('.done');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = form.querySelector('input').value;
  const description = form.querySelector('textarea').value;

  const task = document.createElement('li');
  task.classList.add('task');
  task.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
  todoColumn.appendChild(task);
  task.addEventListener('click', () => {
    task.classList.toggle('selected');
  });

  form.reset();
});

inProgressButton.addEventListener('click', function () {
  const selectedTask = document.querySelector('.todo .selected');

  if (selectedTask) {
    todoColumn.removeChild(selectedTask);
    inProgressColumn.appendChild(selectedTask);

    updateCardInProgress(selectedTask);
  }
});

doneButton.addEventListener('click', function () {
  const selectedTask = document.querySelector('.in-progress .selected');

  if (selectedTask) {
    inProgressColumn.removeChild(selectedTask);
    doneColumn.appendChild(selectedTask);

    updateCardDone(selectedTask);
  }
});

function updateCardInProgress(card) {
  const body = {
    title: card.children[0].textContent,
    description: card.children[1].textContent,
    isInProgress: true,
    completed: false,
  };
  fetch(`http://localhost:3000/tasks/${card.getAttribute('data-task-id')}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      moveTodoInProgress(card);
    });
  const taskClickHandler = (event) => {
    let thisTask = event.target.closest('.taskBox');

    if (selectedTask) {
      selectedTask.style.background = 'white';
    }

    if (selectedTask === thisTask) {
      selectedTask = undefined;
      thisTask.style.background = 'white';
    } else {
      thisTask.style.background = '#7749f8';
      selectedTask = thisTask;
    }
  };

  document
    .getElementById('todoColumn')
    .addEventListener('click', taskClickHandler);
  document
    .getElementById('inProgressColumn')
    .addEventListener('click', taskClickHandler);
}
