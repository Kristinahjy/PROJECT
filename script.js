document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const landingPage = document.getElementById('landing-page');
    const welcomePage = document.getElementById('welcome-page');
    const enterBtn = document.getElementById('enter-btn');
    const startBtn = document.getElementById('start-btn');
    const lumaContainer = document.getElementById('luma-container');
    const lumaIcon = document.querySelector('.luma-icon');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.querySelector('.close-chat');
    const chatInput = document.querySelector('.chat-input input');
    const chatSendBtn = document.querySelector('.chat-input button');
    const chatMessages = document.querySelector('.chat-messages');

    // Add stars dynamically
    const starsContainer = document.querySelector('.stars');
    if (starsContainer) {
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            starsContainer.appendChild(star);
        }
    }

    // Page Transitions
    if (enterBtn) {
        enterBtn.addEventListener('click', () => {
            landingPage.classList.remove('active');
            setTimeout(() => {
                welcomePage.classList.add('active');
            }, 500);
        });
    }

    if (startBtn) {
        startBtn.addEventListener('click', () => {
            // Fade out welcome page
            welcomePage.style.opacity = '0';
            welcomePage.style.transition = 'opacity 0.5s ease';

            // Navigate to nanocarrier grid page
            setTimeout(() => {
                window.location.href = 'nanocarrier-grid.html';
            }, 500);

            // Navigation handled by onclick attribute
        });
    }

    // Make Luma draggable
    let isDragging = false;
    let offsetX, offsetY;

    lumaIcon.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - lumaContainer.offsetLeft;
        offsetY = e.clientY - lumaContainer.offsetTop;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            lumaContainer.style.left = `${e.clientX - offsetX}px`;
            lumaContainer.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Make Luma resizable
    let isResizing = false;
    const minSize = 80;
    const maxSize = 250;

    lumaIcon.addEventListener('mousedown', (e) => {
        if (e.offsetX > lumaIcon.offsetWidth - 10 && e.offsetY > lumaIcon.offsetHeight - 10) {
            isResizing = true;
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (isResizing) {
            const newSize = Math.min(maxSize, Math.max(minSize, e.clientX - lumaContainer.offsetLeft));
            lumaIcon.style.width = `${newSize}px`;
            lumaIcon.style.height = `${newSize}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isResizing = false;
    });

    // Luma Chatbot Functionality
    if (lumaIcon) {
        lumaIcon.addEventListener('click', () => {
            chatWindow.classList.add('active');
        });
    }

    if (closeChat) {
        closeChat.addEventListener('click', () => {
            chatWindow.classList.remove('active');
        });
    }

    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'luma'}`;
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleUserMessage(message) {
        addMessage(message, true);
        
        // Basic response logic based on current page
        let response = "";
        const currentPage = window.location.pathname.split('/').pop();
        
        if (currentPage === 'nanocarrier-grid.html') {
            response = "I can help you understand different nanocarrier systems and their applications. What would you like to know?";
        } else if (currentPage === 'curaflow.html') {
            response = "I can guide you through the CuraFlow modules and help you design your drug delivery system. What aspect would you like to explore?";
        } else {
            response = "I'm here to help you design the perfect drug delivery system. What would you like to know?";
        }

        setTimeout(() => {
            addMessage(response);
        }, 500);
    }

    if (chatSendBtn) {
        chatSendBtn.addEventListener('click', () => {
            const message = chatInput.value.trim();
            if (message) {
                handleUserMessage(message);
                chatInput.value = '';
            }
        });
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const message = chatInput.value.trim();
                if (message) {
                    handleUserMessage(message);
                    chatInput.value = '';
                }
            }
        });
    }

    // Add welcome message when chat is first opened
    if (chatMessages && chatMessages.children.length === 0) {
        const welcomeMessage = `
            Hi, I'm Luma.
            You don't have to know everything to begin.
            I'm here to help you explore, shape, and gently refine your formulation journey—step by step.

            Ready to unlock a new idea?
            Ask me anything—I'm listening. Really.
        `;
        addMessage(welcomeMessage);
    }

    // Make chat window draggable
    let isChatDragging = false;
    let chatOffsetX, chatOffsetY;

    chatWindow.addEventListener('mousedown', (e) => {
        if (e.target === chatWindow || e.target.closest('.chat-header')) {
            isChatDragging = true;
            chatOffsetX = e.clientX - chatWindow.offsetLeft;
            chatOffsetY = e.clientY - chatWindow.offsetTop;
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (isChatDragging) {
            chatWindow.style.left = `${e.clientX - chatOffsetX}px`;
            chatWindow.style.top = `${e.clientY - chatOffsetY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isChatDragging = false;
    });

    // Handle chat window resize
    const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            if (entry.target === chatWindow) {
                // Adjust message container height when window is resized
                const headerHeight = document.querySelector('.chat-header').offsetHeight;
                const inputHeight = document.querySelector('.chat-input').offsetHeight;
                const newHeight = entry.contentRect.height - headerHeight - inputHeight;
                chatMessages.style.height = `${newHeight}px`;
            }
        }
    });

    resizeObserver.observe(chatWindow);

    // Handle navigation between pages
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link) {
            e.preventDefault();
            const href = link.getAttribute('href');
            
            // Fade out current page
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            
            // Navigate to new page
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        }
    });

    // Fade in page on load
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});
