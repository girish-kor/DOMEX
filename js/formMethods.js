class FormMethodsSimulation {
  constructor() {
    this.form = document.getElementById('demoForm');
    this.logContainer = document.getElementById('formLog');
    this.validationInput = document.getElementById('validationCode');
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
    document.getElementById('resetForm').addEventListener('click', this.handleReset.bind(this));
    document
      .getElementById('checkValidity')
      .addEventListener('click', this.checkFormValidity.bind(this));
    document
      .getElementById('applyValidation')
      .addEventListener('click', this.applyCustomValidation.bind(this));
    document
      .getElementById('resetSimulation')
      .addEventListener('click', this.resetSimulation.bind(this));

    // Add input event listeners for real-time validation
    Array.from(this.form.elements).forEach((element) => {
      if (element.tagName !== 'BUTTON') {
        element.addEventListener('input', () => this.validateElement(element));
      }
    });
  }

  log(message, type = 'info') {
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.innerHTML = `
            <span class="log-time">${new Date().toLocaleTimeString()}</span>
            <span class="log-message">${message}</span>
        `;
    this.logContainer.insertBefore(entry, this.logContainer.firstChild);
  }

  validateElement(element) {
    element.classList.remove('invalid');
    if (!element.checkValidity()) {
      element.classList.add('invalid');
      this.log(`Validation failed for ${element.name}: ${element.validationMessage}`, 'error');
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.form.checkValidity()) {
      const formData = new FormData(this.form);
      const data = Object.fromEntries(formData.entries());
      this.log(`Form submitted with data: ${JSON.stringify(data)}`);
    } else {
      this.log('Form validation failed', 'error');
      Array.from(this.form.elements).forEach(this.validateElement.bind(this));
    }
  }

  handleReset() {
    this.form.reset();
    Array.from(this.form.elements).forEach((element) => {
      element.classList.remove('invalid');
    });
    this.log('Form reset');
  }

  checkFormValidity() {
    const isValid = this.form.checkValidity();
    this.log(`Form validity check: ${isValid ? 'Valid' : 'Invalid'}`);
    Array.from(this.form.elements).forEach(this.validateElement.bind(this));
  }

  applyCustomValidation() {
    try {
      const validationCode = this.validationInput.value;
      const validationFunc = new Function('value', validationCode);

      Array.from(this.form.elements).forEach((element) => {
        if (element.tagName !== 'BUTTON') {
          element.setCustomValidity('');
          const isValid = validationFunc(element.value);
          if (!isValid) {
            element.setCustomValidity('Custom validation failed');
          }
          this.validateElement(element);
        }
      });

      this.log('Custom validation applied');
    } catch (error) {
      this.log(`Custom validation error: ${error.message}`, 'error');
    }
  }

  resetSimulation() {
    this.handleReset();
    this.validationInput.value = '';
    this.logContainer.innerHTML = '';
    Array.from(this.form.elements).forEach((element) => {
      if (element.tagName !== 'BUTTON') {
        element.setCustomValidity('');
      }
    });
    this.log('Simulation reset');
  }
}

// Initialize the simulation when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new FormMethodsSimulation();
});
