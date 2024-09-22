const stackContainer = document.getElementById('stack-container');
const pushBtn = document.getElementById('push-btn');
const popBtn = document.getElementById('pop-btn');
const inputValue = document.getElementById('input-value');

let stack = [];

function renderStack() {
    stackContainer.innerHTML = '';
    stack.forEach((item) => {
        const stackItem = document.createElement('div');
        stackItem.classList.add('stack-item');
        stackItem.textContent = item;
        stackContainer.appendChild(stackItem);
    });
}

pushBtn.addEventListener('click', () => {
    const value = inputValue.value.trim();
    if (value !== '') {
        stack.push(value);
        inputValue.value = '';
        renderStack();
    }
});

popBtn.addEventListener('click', () => {
    if (stack.length > 0) {
        stack.pop();
        renderStack();
    } else {
        alert('Стек пуст!');
    }
});
