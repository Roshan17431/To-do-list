const clock = document.getElementById('clock');

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