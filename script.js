document.addEventListener('DOMContentLoaded', () => {
    // Add more stars dynamically
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        starsContainer.appendChild(star);
    }

    // Button hover effect
    const enterBtn = document.querySelector('.enter-btn');
    enterBtn.addEventListener('mouseover', () => {
        enterBtn.style.transform = 'scale(1.05)';
    });
    enterBtn.addEventListener('mouseout', () => {
        enterBtn.style.transform = 'scale(1)';
    });
});
