document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const progressBar = document.getElementById('progress-bar');
    const dateDisplay = document.getElementById('date-display');
    const resetBtn = document.getElementById('reset-btn');

    // Display Date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateDisplay.innerText = new Date().toLocaleDateString(undefined, options);

    // Update Progress
    const updateProgress = () => {
        const total = checkboxes.length;
        const checked = document.querySelectorAll('input[type="checkbox"]:checked').length;
        const percentage = (checked / total) * 100;
        progressBar.style.width = `${percentage}%`;
        
        // Save state to local storage
        const state = Array.from(checkboxes).map(cb => cb.checked);
        localStorage.setItem('resetRoutine', JSON.stringify(state));
    };

    // Load state
    const savedState = JSON.parse(localStorage.getItem('resetRoutine'));
    if (savedState) {
        checkboxes.forEach((cb, i) => cb.checked = savedState[i]);
        updateProgress();
    }

    checkboxes.forEach(cb => cb.addEventListener('change', updateProgress));

    resetBtn.addEventListener('click', () => {
        checkboxes.forEach(cb => cb.checked = false);
        updateProgress();
    });
});