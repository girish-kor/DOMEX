// Ensure all DOM elements are loaded before executing the code
document.addEventListener('DOMContentLoaded', function () {
    // Cache DOM elements for performance
    const dynamicEventButton = document.getElementById('dynamicEventButton');
    const targetButton = document.getElementById('targetButton');
    const eventLog = document.getElementById('eventLog');
    const form = document.getElementById('domExplorerForm');
    const formOutput = document.getElementById('formOutput');
    const usernameInput = form.username;
    const emailInput = form.email;

    // Event listener for the dynamic event button that adds an event listener to the targetButton
    dynamicEventButton.addEventListener('click', function () {
        targetButton.addEventListener('click', function () {
            eventLog.innerText = 'Target Button Clicked';
        });
    });

    // Form Methods - Function to validate the form
    window.validateForm = function () {
        if (!usernameInput.value || !emailInput.value) {
            alert('Please fill out all fields');
        } else {
            alert('Form is valid!');
        }
    };

    // Reset Form - Function to reset the form fields
    window.resetForm = function () {
        form.reset();
    };

    // Submit Form - Function to submit form data and display it
    window.submitForm = function () {
        const formData = new FormData(form);
        let output = '';
        formData.forEach((value, key) => {
            output += `${key}: ${value}\n`;
        });
        formOutput.innerText = output;
    };

    // Show Form Data - Function to display form data in an alert box
    window.showFormData = function () {
        const formData = new FormData(form);
        let output = '';
        formData.forEach((value, key) => {
            output += `${key}: ${value}\n`;
        });
        alert(output);
    };

    // Disable Form Elements - Function to disable all form elements
    window.disableFormElements = function () {
        Array.from(form.elements).forEach((element) => {
            element.disabled = true;
        });
    };

    // Enable Form Elements - Function to enable all form elements
    window.enableFormElements = function () {
        Array.from(form.elements).forEach((element) => {
            element.disabled = false;
        });
    };
});

// Async Loading of JavaScript Files
(function () {
    // List of external JavaScript files to load
    const scripts = ['docMethods.js', 'formMethods.js', 'nodeMethods.js', 'styleManipulation.js', 'eventHandling.js'];

    // Loop through each script and dynamically load it asynchronously
    scripts.forEach((src) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true; // Ensure scripts are loaded asynchronously
        document.body.appendChild(script);
    });
})();

// Function to load more information when the "Learn More" button is clicked
function loadMoreInfo() {
    const additionalInfo = document.getElementById('additionalInfo');
    const loadMoreButton = document.getElementById('loadMoreButton');

    // Check if the additional info is already displayed
    if (additionalInfo.style.display === 'none') {
        additionalInfo.style.display = 'block'; // Show more information
        loadMoreButton.textContent = 'Show Less'; // Change button text
    } else {
        additionalInfo.style.display = 'none'; // Hide additional information
        loadMoreButton.textContent = 'Learn More'; // Reset button text
    }
}
// scripts.js

function sendMessage() {
    const message = document.getElementById('whatsappMessage').value;
    const messageContainer = document.getElementById('messageContainer');

    if (message.trim() !== "") {
        // Append message to the chat window
        const messageElement = document.createElement('div');
        messageElement.classList.add('user-message');
        messageElement.textContent = `You: ${message}`;
        messageContainer.appendChild(messageElement);

        // Scroll to the latest message
        messageContainer.scrollTop = messageContainer.scrollHeight;

        // Send message to WhatsApp
        window.open(`https://wa.me/917798668882?text=${encodeURIComponent(message)}`, '_blank');

        // Clear the input field
        document.getElementById('whatsappMessage').value = "";
    }
}

// Simulate message receiving (this part requires actual WhatsApp Business API integration for real-time message receiving)
function simulateReceivedMessage(message) {
    const messageContainer = document.getElementById('messageContainer');
    const messageElement = document.createElement('div');
    messageElement.classList.add('whatsapp-message');
    messageElement.textContent = `WhatsApp: ${message}`;
    messageContainer.appendChild(messageElement);

    // Scroll to the latest message
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

// Simulate message received after 5 seconds (for demonstration)
setTimeout(() => {
    simulateReceivedMessage("Hello! How can I help you?");
}, 5000);


// WhatsApp Section

function sendMessage() {
    const message = document.getElementById('whatsappMessage').value;
    const messageContainer = document.getElementById('messageContainer');

    if (message.trim() !== "") {
        // Append message to the chat window
        const messageElement = document.createElement('div');
        messageElement.classList.add('user-message');
        messageElement.textContent = `You: ${message}`;
        messageContainer.appendChild(messageElement);

        // Scroll to the latest message
        messageContainer.scrollTop = messageContainer.scrollHeight;

        // Send message to WhatsApp
        window.open(`https://wa.me/917798668882?text=${encodeURIComponent(message)}`, '_blank');

        // Clear the input field
        document.getElementById('whatsappMessage').value = "";
    }
}

// scripts.js

// Function to send a message to WhatsApp
function sendMessage() {
    const message = document.getElementById('whatsappMessage').value.trim();
    const messageContainer = document.getElementById('messageContainer');

    if (message !== "") {
        // Display the sent message in the chat window
        const messageElement = document.createElement('div');
        messageElement.classList.add('user-message');
        messageElement.textContent = `You: ${message}`;
        messageContainer.appendChild(messageElement);

        // Scroll to the latest message
        messageContainer.scrollTop = messageContainer.scrollHeight;

        // Send the message to WhatsApp using the WA URL
        window.open(`https://wa.me/917798668882?text=${encodeURIComponent(message)}`, '_blank');

        // Clear the input field
        document.getElementById('whatsappMessage').value = "";
    }
}

// Simulate receiving a message from WhatsApp (this part is for demonstration)
function simulateReceivedMessage(message) {
    const messageContainer = document.getElementById('messageContainer');
    const messageElement = document.createElement('div');
    messageElement.classList.add('whatsapp-message');
    messageElement.textContent = `${message}`;
    messageContainer.appendChild(messageElement);

    // Scroll to the latest message
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

// Simulate message received after 5 seconds (for demo purposes)
// setTimeout(() => {
//     simulateReceivedMessage("Hello! How can I help you?");
// }, 5000);

// Simulate another message received after 10 seconds
setTimeout(() => {
    simulateReceivedMessage("Please let me know if you need assistance.");
}, 10000);

