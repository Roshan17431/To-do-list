const clock = document.getElementById('clock');
const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

    function updateDateTime() {
      const now = new Date();

      const date = now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });

      const time = now.toLocaleTimeString('en-US', {
        hour: 'numeric',      // leading 0 illathathinu
        minute: '2-digit',
        hour12: true          // AM/PM
      });

      clock.textContent = `${date} ${time}`; // Eg: Fri, Jun 20 10:52 AM
    }

    updateDateTime();                 // initial display
    setInterval(updateDateTime, 60000)
  
    function addTask(){
      if(inputBox.value === '') {
        alert('Please enter a task');
      }
      else{
        let li = document.createElement('li');
        let p = document.createElement('p');
        p.innerHTML = inputBox.value;
    
        let span = document.createElement('span');
        span.innerHTML = '\u00D7'; // × delete icon
        span.classList.add('delete-btn'); // Optional class for styling
    
        p.appendChild(span);   // Add span to <p>
        li.appendChild(p);     // Add <p> to <li>
        listContainer.appendChild(li); 
      }
      inputBox.value = ''; // Clear input box after adding task
      saveData();
    }

    function clearTask(){
      listContainer.remove();
      localStorage.removeItem('data'); // Clear saved tasks from localStorage
    }
    function all(){
      const tasks = listContainer.querySelectorAll('li');
      tasks.forEach(task => {
        task.style.display = 'block'; // Show all tasks
      });
    }
    

    function active(){
      const tasks = listContainer.querySelectorAll('li');
      tasks.forEach(task => {
        if (!task.classList.contains('checked')) {
          task.style.display = 'block'; // Show active tasks
        } else {
          task.style.display = 'none'; // Hide completed tasks
        }
      });
    }
    function completed(){
      const tasks = listContainer.querySelectorAll('li');
      tasks.forEach(task => {
        if (task.classList.contains('checked')) {
          task.style.display = 'block'; // Show completed tasks
        } else {
          task.style.display = 'none'; // Hide active tasks
        }
      });
    }

    listContainer.addEventListener('click', function(e) {
        if(e.target.tagName === 'LI' ){
          e.target.classList.toggle('checked');
          saveData();
        }
        else if(e.target.tagName === 'SPAN') {
          e.target.parentElement.parentElement.remove(); 
          saveData();
        }
    },false);

    function saveData() {
      localStorage.setItem('data', listContainer.innerHTML);
    }

    function showTask() {
      const savedData = localStorage.getItem('data');
      if (savedData) {
        listContainer.innerHTML = savedData; // Load saved tasks
      }
      else{

      }
    }
    showTask();
