function validateForm() {
    const form = document.getElementById('domExplorerForm');
    const username = form.username.value;
    const email = form.email.value;
    const message = form.message.value;

    if (username === '' || email === '' || message === '') {
        alert('All fields must be filled out.');
        return false;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    alert('Form is valid!');
    return true;
}

function resetForm() {
    const form = document.getElementById('domExplorerForm');
    form.reset();
    alert('Form has been reset.');
}

function submitForm() {
    const form = document.getElementById('domExplorerForm');
    const username = form.username.value;
    const email = form.email.value;
    const message = form.message.value;

    if (validateForm()) {
        console.log('Form Submitted!');
        console.log('Username:', username);
        console.log('Email:', email);
        console.log('Message:', message);

        alert('Form Submitted Successfully!');
        form.reset();
    }
}

function showFormData() {
    const form = document.getElementById('domExplorerForm');
    const username = form.username.value;
    const email = form.email.value;
    const message = form.message.value;

    const outputDiv = document.getElementById('formOutput');
    outputDiv.innerHTML = `
        <h3>Form Data</h3>
        <p><strong>Username:</strong> ${username}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
    `;
}

function disableFormElements() {
    const form = document.getElementById('domExplorerForm');
    const elements = form.elements;

    for (let i = 0; i < elements.length; i++) {
        elements[i].disabled = true;
    }

    alert('Form elements have been disabled.');
}

function enableFormElements() {
    const form = document.getElementById('domExplorerForm');
    const elements = form.elements;

    for (let i = 0; i < elements.length; i++) {
        elements[i].disabled = false;
    }

    alert('Form elements have been enabled.');
}

function resetSpecificFields() {
    const form = document.getElementById('domExplorerForm');
    form.username.value = '';
    form.email.value = '';
    form.message.value = '';
    alert('Specific fields have been reset.');
}

function checkRequiredFields() {
    const form = document.getElementById('domExplorerForm');
    const username = form.username;
    const email = form.email;
    const message = form.message;

    if (username.value === '') {
        alert('Username is required.');
    } else if (email.value === '') {
        alert('Email is required.');
    } else if (message.value === '') {
        alert('Message is required.');
    } else {
        alert('All required fields are filled.');
    }
}

document.querySelector('[type="button"][onclick="submitForm()"]').addEventListener('click', function (event) {
    event.preventDefault();
    submitForm();
});

document.querySelector('[onclick="showFormData()"]').addEventListener('click', showFormData);
document.querySelector('[onclick="disableFormElements()"]').addEventListener('click', disableFormElements);
document.querySelector('[onclick="enableFormElements()"]').addEventListener('click', enableFormElements);

const form = document.getElementById('domExplorerForm');
const inputs = form.querySelectorAll('input, textarea');

inputs.forEach((input) => {
    input.addEventListener('input', function () {
        if (input.value === '') {
            input.style.borderColor = 'red';
        } else {
            input.style.borderColor = '';
        }
    });
});
