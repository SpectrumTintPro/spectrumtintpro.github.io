// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Document is ready!');
    
    // Get the button element
    const button = document.getElementById('clickMe');
    
    // Add click event listener to the button
    button.addEventListener('click', function() {
        alert('Button was clicked!');
        
        // Change button text
        this.textContent = 'Clicked!';
        
        // Change button color
        this.style.backgroundColor = '#2196F3';
        
        // Reset after 2 seconds
        setTimeout(() => {
            this.textContent = 'Click Me';
            this.style.backgroundColor = '#4CAF50';
        }, 2000);
    });
    
    // Add current year to footer copyright
    const footerYear = document.querySelector('footer p');
    const currentYear = new Date().getFullYear();
    footerYear.innerHTML = footerYear.innerHTML.replace('2025', currentYear);
});
