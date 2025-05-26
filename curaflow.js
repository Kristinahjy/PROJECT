document.addEventListener('DOMContentLoaded', () => {
    // Module click handlers
    const modules = document.querySelectorAll('.module');
    modules.forEach(module => {
        module.addEventListener('click', () => {
            const moduleTitle = module.querySelector('h2').textContent;
            // TODO: Implement modal or detail page
            console.log(`Selected module: ${moduleTitle}`);
        });
    });

    // Show Luma container by default on this page
    const lumaContainer = document.getElementById('luma-container');
    if (lumaContainer) {
        lumaContainer.style.display = 'block';
    }

    // Luma specific messages for CuraFlow page
    const curaflowMessages = [
        "Would you like to explore a specific formulation module?",
        "I can guide you through the drug delivery formulation process.",
        "Let me know which aspect of formulation you'd like to focus on.",
        "I can provide insights and suggestions for each module."
    ];

    // Override the default welcome message for this page
    const chatMessages = document.querySelector('.chat-messages');
    if (chatMessages && chatMessages.children.length === 0) {
        const welcomeDiv = document.createElement('div');
        welcomeDiv.className = 'message luma';
        welcomeDiv.textContent = "Welcome to CuraFlow! I can guide you through the drug delivery formulation process. Which module would you like to explore?";
        chatMessages.appendChild(welcomeDiv);
    }

    // Enhanced chat functionality for CuraFlow-specific queries
    function handleCuraflowQuery(message) {
        const lowerMessage = message.toLowerCase();
        let response = "";

        // Basic keyword matching for demonstration
        if (lowerMessage.includes('therapeutic') || lowerMessage.includes('context')) {
            response = "The Therapeutic Context module helps define the disease target and product type. It's the foundation of your formulation strategy.";
        } else if (lowerMessage.includes('drug') || lowerMessage.includes('molecule')) {
            response = "The Drug Molecule module focuses on understanding the structure and properties of your active pharmaceutical ingredient.";
        } else if (lowerMessage.includes('composition')) {
            response = "The Nanocarrier Composition module helps you select and optimize materials and components for your delivery system.";
        } else if (lowerMessage.includes('formulation') || lowerMessage.includes('process')) {
            response = "The Formulation Process module guides you through method selection and parameter optimization.";
        } else if (lowerMessage.includes('characterization')) {
            response = "The Characterization module focuses on particle analysis and stability assessment.";
        } else {
            response = "I can provide detailed information about any CuraFlow module. Which one would you like to learn more about?";
        }

        return response;
    }

    // Override the default message handler
    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.chat-input button');

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            const userDiv = document.createElement('div');
            userDiv.className = 'message user';
            userDiv.textContent = message;
            chatMessages.appendChild(userDiv);

            // Get and add Luma's response
            const response = handleCuraflowQuery(message);
            setTimeout(() => {
                const lumaDiv = document.createElement('div');
                lumaDiv.className = 'message luma';
                lumaDiv.textContent = response;
                chatMessages.appendChild(lumaDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 500);

            chatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Add scroll reveal animation for modules
    const revealModules = () => {
        const modules = document.querySelectorAll('.module');
        modules.forEach((module, index) => {
            module.style.opacity = '0';
            module.style.transform = 'translateY(20px)';
            setTimeout(() => {
                module.style.transition = 'all 0.5s ease';
                module.style.opacity = '1';
                module.style.transform = 'translateY(0)';
            }, index * 100);
        });
    };

    // Call reveal animation when page loads
    revealModules();
});
