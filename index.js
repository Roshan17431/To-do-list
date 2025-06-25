const clock = document.getElementById('clock');
const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

// Live Clock
function updateDateTime() {
  const now = new Date();

  const date = now.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  const time = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  clock.textContent = `${date} ${time}`;
}
updateDateTime();
setInterval(updateDateTime, 60000); // update every minute

// Task Counters
let count1 = 0; // Total
let count2 = 0; // Completed
let count3 = 0; // Active

// Add new task
function addTask() {
  if (inputBox.value.trim() === '') {
    alert('Please enter a task');
    return;
  }

  const li = document.createElement('li');
  const p = document.createElement('p');
  p.innerHTML = inputBox.value;

  const span = document.createElement('span');
  span.innerHTML = '\u00D7';
  span.classList.add('delete-btn');

  p.appendChild(span);
  li.appendChild(p);
  listContainer.appendChild(li);

  inputBox.value = '';
  saveData();
  all(); // Refresh view
}

// Clear all tasks
function clearTask() {
  listContainer.innerHTML = '';
  localStorage.removeItem('data');
  count1 = count2 = count3 = 0;
  showCount();
}

// Show all tasks
function all() {
  const items = document.querySelectorAll('li');
  count1 = items.length;
  count2 = count3 = 0;

  items.forEach(item => {
    item.style.display = 'flex';
    if (item.classList.contains('checked')) {
      count2++;
    } else {
      count3++;
    }
  });

  setActiveButton('all');
  showCount();
}

// Show only completed tasks
function completed() {
  const items = document.querySelectorAll('li');
  count2 = 0;

  items.forEach(item => {
    if (item.classList.contains('checked')) {
      item.style.display = 'flex';
      count2++;
    } else {
      item.style.display = 'none';
    }
  });

  count1 = items.length;
  count3 = count1 - count2;

  setActiveButton('completed');
  showCount();
}

// Show only active tasks
function active() {
  const items = document.querySelectorAll('li');
  count3 = 0;

  items.forEach(item => {
    if (!item.classList.contains('checked')) {
      item.style.display = 'flex';
      count3++;
    } else {
      item.style.display = 'none';
    }
  });

  count1 = items.length;
  count2 = count1 - count3;

  setActiveButton('active');
  showCount();
}

// Highlight active tab
function setActiveButton(type) {
  const buttons = document.querySelectorAll('.line');
  buttons.forEach(btn => btn.classList.remove('active'));

  const selectorMap = {
    all: 'button[onclick="show()"]',
    active: 'button[onclick="active()"]',
    completed: 'button[onclick="completed()"]'
  };

  const targetBtn = document.querySelector(selectorMap[type]);
  if (targetBtn) {
    targetBtn.classList.add('active');
  }
}

// Task complete or delete actions
listContainer.addEventListener('click', function (e) {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('checked');
    saveData();
    all(); // Refresh after toggle
  } else if (e.target.tagName === 'SPAN') {
    e.target.closest('li').remove();
    saveData();
    all(); // Refresh after delete
  }
}, false);

// Save to localStorage
function saveData() {
  localStorage.setItem('data', listContainer.innerHTML);
}

// Load from localStorage and show all tasks
function showTask() {
  const savedData = localStorage.getItem('data');
  if (savedData) {
    listContainer.innerHTML = savedData;
  }
  all(); // Ensure all tasks shown on load
}

// Show counters
function showCount() {
  document.getElementById('cnt1').textContent = `${count1} Total`;
  document.getElementById('cnt2').textContent = `${count2} Completed`;
  document.getElementById('cnt3').textContent = `${count3} Active`;
}

function show() {
  all();
}

// Initialize
showTask();
