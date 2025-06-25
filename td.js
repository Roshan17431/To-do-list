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
        span.classList.add('delete-btn'); 
    
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
      const items = document.querySelectorAll('li');
      items.forEach(item => {
        if(item.classList.contains('checked')) {
          item.classList.remove('checked');
        }
      });
      setActiveButton('all');
    }
    function completed(){
      const items = document.querySelectorAll('li');
      items.forEach(item => {
        if(!item.classList.contains('checked')) {
          item.style.display = 'none';
        }
        else {
          item.style.display = 'block';
        }
      });
      setActiveButton('completed');
    }
    function active(){
      const items = document.querySelectorAll('li');
      items.forEach(item => {
        if(item.classList.contains('checked')) {
          item.style.display = 'none';
        }
        else {
          item.style.display = 'block';
        }
      });
      setActiveButton('active');
    }
    function setActiveButton(type) {
      const buttons = document.querySelectorAll('.line');
      buttons.forEach(btn => btn.classList.remove('active'));
    
      if (type === 'all'){
         document.querySelector('button[onclick="all()"]').classList.add('active');
      }
      else if (type === 'active'){
        document.querySelector('button[onclick="active()"]').classList.add('active');
      }
      else if (type === 'completed'){
        document.querySelector('button[onclick="completed()"]').classList.add('active');
      }
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
