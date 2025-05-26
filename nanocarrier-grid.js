document.addEventListener('DOMContentLoaded', () => {
    // Initialize grid items
    const gridItems = document.querySelectorAll('.nanocarrier-item');
    gridItems.forEach(item => {
        // Set initial opacity
        item.style.opacity = '1';
        
        // Add click handler
        item.addEventListener('click', () => {
            const nanocarrierName = item.querySelector('span').textContent;
            // TODO: Implement modal or detail page
            console.log(`Selected nanocarrier: ${nanocarrierName}`);
        });
    });

    // Initialize Luma container with corner icon
    const lumaContainer = document.getElementById('luma-container');
    const lumaIcon = document.querySelector('.luma-icon');
    if (lumaContainer && lumaIcon) {
        lumaContainer.style.display = 'block';
        lumaContainer.style.position = 'fixed';
        lumaContainer.style.bottom = '30px';
        lumaContainer.style.right = '30px';
        lumaIcon.src = 'images/UI/LUma_icon-removebg-preview.png';
        lumaIcon.style.width = '80px';  // Set corner icon size
        lumaIcon.style.height = '80px';
    }

    // Luma specific messages for nanocarrier page
    const nanocarrierMessages = [
        "Would you like to learn more about a specific nanocarrier type?",
        "I can help you understand the properties and applications of different nanocarriers.",
        "Feel free to ask about formulation strategies for any nanocarrier system.",
        "I can provide guidance on selecting the right nanocarrier for your drug delivery needs."
    ];

    // Override the default welcome message for this page
    const chatMessages = document.querySelector('.chat-messages');
    if (chatMessages && chatMessages.children.length === 0) {
        const welcomeDiv = document.createElement('div');
        welcomeDiv.className = 'message luma';
        welcomeDiv.textContent = "Welcome to the Nanocarrier Explorer! I can help you understand different nanocarrier systems and their applications. What would you like to know?";
        chatMessages.appendChild(welcomeDiv);
    }

    // Enhanced chat functionality for nanocarrier-specific queries
    function handleNanocarrierQuery(message) {
        const lowerMessage = message.toLowerCase();
        let response = "";

        // Basic keyword matching for demonstration
        if (lowerMessage.includes('lipid')) {
            response = "Lipid-based nanocarriers are excellent for delivering both hydrophilic and hydrophobic drugs. They offer good biocompatibility and can be designed for targeted delivery.";
        } else if (lowerMessage.includes('polymer')) {
            response = "Polymer-based nanocarriers provide controlled release properties and can be modified for specific targeting. They're particularly useful for sustained drug delivery.";
        } else if (lowerMessage.includes('inorganic')) {
            response = "Inorganic nanocarriers often offer unique properties like magnetic targeting (iron oxide) or photothermal effects (gold). They're useful for theranostic applications.";
        } else if (lowerMessage.includes('hybrid')) {
            response = "Hybrid nanocarriers combine the benefits of multiple types of materials, offering enhanced functionality and improved drug delivery capabilities.";
        } else {
            response = "I'd be happy to explain more about any specific nanocarrier type or help you choose the right system for your needs.";
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
            const response = handleNanocarrierQuery(message);
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

});
