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
      count1 = 0;
      count2 = 0;
      count3 = 0;
      showCount();
    }

    // Filter tasks
    let count1 = 0;
    let count2 = 0;
    let count3 = 0;

    function all(){
      const items = document.querySelectorAll('li');
      count1 = items.length;
      count2 = document.querySelectorAll('li.checked').length;
      count3 = count1 - count2
      items.forEach(item => {
        item.style.display = 'flex'; 
      });
      setActiveButton('all');
      showCount();
    }
    function completed(){
      const items = document.querySelectorAll('li');
      count2 = 0;
      items.forEach(item => {
        if(!item.classList.contains('checked')) {
          item.style.display = 'none';
        }
        else {
          item.style.display = 'flex';
          count2++;
        }
      });
      count1 = items.length;
      count3 = count1 - count2;
      setActiveButton('completed');
      showCount();
    }
    function active(){
      const items = document.querySelectorAll('li');
      count3 = 0;
      items.forEach(item => {
        if(item.classList.contains('checked')) {
          item.style.display = 'none';
        }
        else {
          item.style.display = 'flex';
          count3++;
        }
      });
      count1 = items.length;
      count2 = count1 - count3;
      
      setActiveButton('active');
      showCount();
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
          all(); // Refresh the task list
        }
        else if(e.target.tagName === 'SPAN') {
          e.target.parentElement.parentElement.remove(); 
          saveData();
          all(); // Refresh the task list
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
    // Show count of tasks
    
    function showCount() {
      document.getElementById('cnt1').textContent = `${count1} Total`;
      document.getElementById('cnt2').textContent = `${count2} Completed`;
      document.getElementById('cnt3').textContent = `${count3} Active`;
    }
