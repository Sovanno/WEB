const queueContainer = document.getElementById('queue-container');
const enqueueBtn = document.getElementById('enqueue-btn');
const dequeueBtn = document.getElementById('dequeue-btn');
const inputValue = document.getElementById('input-value');

let queue = [];

function renderQueue() {
    queueContainer.innerHTML = '';
    queue.forEach((item) => {
        const queueItem = document.createElement('div');
        queueItem.classList.add('queue-item');
        queueItem.textContent = item;
        queueContainer.appendChild(queueItem);
    });
}

enqueueBtn.addEventListener('click', () => {
    const value = inputValue.value.trim();
    if (value !== '') {
        queue.push(value);
        inputValue.value = '';
        renderQueue();
    }
});

dequeueBtn.addEventListener('click', () => {
    if (queue.length > 0) {
        queue.shift();
        renderQueue();
    } else {
        alert('Очередь пуста!');
    }
});
