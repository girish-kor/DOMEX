class DOMSimulation {
  constructor() {
    this.demoArea = document.getElementById('demo-output');
    this.setupControlPanel();
    this.setupLogContainer();
    this.history = [];
    this.undoStack = [];
    this.redoStack = [];
    this.activeElement = null;
  }

  setupControlPanel() {
    const controls = document.createElement('div');
    controls.className = 'control-panel';

    // Method selection group
    const methodGroup = document.createElement('div');
    methodGroup.className = 'method-group';

    const methodSelect = document.createElement('select');
    methodSelect.className = 'demo-select';

    const methodCategories = {
      'Selection Methods': [
        'getElementById',
        'querySelector',
        'querySelectorAll',
        'getElementsByClassName',
        'getElementsByTagName',
      ],
      'Creation Methods': ['createElement', 'createTextNode'],
      'Manipulation Methods': ['appendChild', 'insertBefore', 'replaceChild', 'removeChild'],
      'Attribute Methods': [
        'setAttribute',
        'getAttribute',
        'removeAttribute',
        'classList.add',
        'classList.remove',
      ],
      'Content Methods': ['innerHTML', 'textContent'],
    };

    Object.entries(methodCategories).forEach(([category, methods]) => {
      const group = document.createElement('optgroup');
      group.label = category;

      methods.forEach((method) => {
        const option = document.createElement('option');
        option.value = method;
        option.textContent = method;
        group.appendChild(option);
      });

      methodSelect.appendChild(group);
    });

    // Parameter input group
    const inputGroup = document.createElement('div');
    inputGroup.className = 'method-group';

    const paramInput = document.createElement('input');
    paramInput.className = 'demo-input';
    paramInput.placeholder = 'Enter parameters...';

    // Action buttons group
    const actionGroup = document.createElement('div');
    actionGroup.className = 'action-buttons';

    // Create buttons with icons or emojis
    const executeBtn = this.createButton('Execute ▶️', () =>
      this.executeMethod(methodSelect.value, paramInput.value),
    );
    const undoBtn = this.createButton('Undo ↩', () => this.undo());
    const redoBtn = this.createButton('Redo ↪', () => this.redo());
    const resetBtn = this.createButton('Reset', () => this.reset());

    // Sandbox area with label
    const sandboxLabel = document.createElement('div');
    sandboxLabel.textContent = 'Sandbox Area';
    sandboxLabel.className = 'sandbox-label';

    const sandbox = document.createElement('div');
    sandbox.id = 'sandbox';
    sandbox.className = 'sandbox-area';
    sandbox.innerHTML = '<div id="sample">Sample Element</div>';

    // DOM Tree viewer with label
    const treeLabel = document.createElement('div');
    treeLabel.textContent = ' DOM Tree';
    treeLabel.className = 'sandbox-label';

    const treeViewer = document.createElement('div');
    treeViewer.className = 'dom-tree-viewer';
    this.treeViewer = treeViewer;

    // Assemble the control panel
    methodGroup.appendChild(methodSelect);
    inputGroup.appendChild(paramInput);
    actionGroup.append(executeBtn, undoBtn, redoBtn, resetBtn);

    controls.append(methodGroup, inputGroup, actionGroup);
    this.demoArea.append(controls, sandboxLabel, sandbox, treeLabel, treeViewer);
  }

  createButton(text, onClick) {
    const button = document.createElement('button');
    button.className = 'demo-button';
    button.innerHTML = text;
    button.onclick = onClick;
    return button;
  }

  setupLogContainer() {
    const logContainer = document.createElement('div');
    logContainer.className = 'log-container';
    this.demoArea.appendChild(logContainer);
    this.logContainer = logContainer;
  }

  log(message, status = 'info') {
    const entry = document.createElement('div');
    entry.className = `log-entry ${status}`;

    const time = document.createElement('span');
    time.className = 'log-time';
    time.textContent = new Date().toLocaleTimeString();

    const msg = document.createElement('span');
    msg.className = 'log-message';
    msg.textContent = message;

    entry.appendChild(time);
    entry.appendChild(msg);
    this.logContainer.appendChild(entry);
    this.logContainer.scrollTop = this.logContainer.scrollHeight;
  }

  executeMethod(method, params) {
    try {
      const sandbox = document.getElementById('sandbox');
      let result;
      const prevState = sandbox.cloneNode(true);

      switch (method) {
        case 'getElementById':
          result = document.getElementById(params);
          if (result) this.highlightElement(result);
          break;

        case 'querySelector':
          result = sandbox.querySelector(params);
          if (result) this.highlightElement(result);
          break;

        case 'querySelectorAll':
          result = Array.from(sandbox.querySelectorAll(params));
          result.forEach((el) => this.highlightElement(el));
          break;

        case 'getElementsByClassName':
          result = Array.from(sandbox.getElementsByClassName(params));
          result.forEach((el) => this.highlightElement(el));
          break;

        case 'getElementsByTagName':
          result = Array.from(sandbox.getElementsByTagName(params));
          result.forEach((el) => this.highlightElement(el));
          break;

        case 'createElement':
          result = document.createElement(params);
          result.textContent = `New ${params} Element`;
          result.classList.add('element-created');
          sandbox.appendChild(result);
          break;

        case 'createTextNode':
          result = document.createTextNode(params);
          sandbox.appendChild(result);
          this.highlightElement(result.parentNode);
          break;

        case 'appendChild':
          const newChild = document.createElement('div');
          newChild.textContent = params || 'New Child';
          sandbox.appendChild(newChild);
          this.highlightElement(newChild);
          break;

        case 'insertBefore':
          const [newNode, refNode] = params.split(',').map((p) => p.trim());
          const reference = sandbox.querySelector(refNode);
          const node = document.createElement('div');
          node.textContent = newNode;
          if (reference) {
            sandbox.insertBefore(node, reference);
            this.highlightElement(node);
          }
          break;

        case 'replaceChild':
          const [newChild2, oldChild] = params.split(',').map((p) => p.trim());
          const oldNode = sandbox.querySelector(oldChild);
          const newNode2 = document.createElement('div');
          newNode2.textContent = newChild2;
          if (oldNode) {
            sandbox.replaceChild(newNode2, oldNode);
            this.highlightElement(newNode2);
          }
          break;

        case 'removeChild':
          const child = sandbox.querySelector(params);
          if (child) {
            child.classList.add('element-removed');
            setTimeout(() => sandbox.removeChild(child), 500);
          }
          break;

        case 'setAttribute':
          const [attr, value] = params.split(',').map((p) => p.trim());
          const target = sandbox.firstElementChild;
          target.classList.add('element-modified');
          target.setAttribute(attr, value);
          setTimeout(() => target.classList.remove('element-modified'), 1000);
          break;

        case 'classList.add':
        case 'classList.remove':
          const [selector, className] = params.split(',').map((p) => p.trim());
          const element = sandbox.querySelector(selector);
          if (element) {
            method === 'classList.add'
              ? element.classList.add(className)
              : element.classList.remove(className);
            this.highlightElement(element);
          }
          break;
      }

      this.undoStack.push({ method, params, prevState });
      this.redoStack = [];
      this.updateDOMTree();
      this.log(`Successfully executed ${method}(${params})`);
      this.history.push({ method, params });
    } catch (error) {
      this.log(`Error: ${error.message}`, 'error');
      this.highlightError(error);
    }
  }

  highlightElement(element) {
    element.classList.add('pulse');
    setTimeout(() => element.classList.remove('pulse'), 300);
  }

  reset() {
    const sandbox = document.getElementById('sandbox');
    sandbox.innerHTML = '<div id="sample">Sample Element</div>';
    this.history = [];
    this.log('Simulation reset');
  }

  updateDOMTree() {
    const sandbox = document.getElementById('sandbox');
    this.treeViewer.innerHTML = '';
    this.treeViewer.appendChild(this.createTreeNode(sandbox));
  }

  createTreeNode(element) {
    const node = document.createElement('div');
    node.className = 'tree-node';

    const content = document.createElement('span');
    content.textContent = this.getElementDescription(element);
    content.onclick = () => this.inspectElement(element);

    node.appendChild(content);

    Array.from(element.children).forEach((child) => {
      node.appendChild(this.createTreeNode(child));
    });

    return node;
  }

  getElementDescription(element) {
    return `<${element.tagName.toLowerCase()}${element.id ? ` id="${element.id}"` : ''}${
      element.className ? ` class="${element.className}"` : ''
    }>`;
  }

  inspectElement(element) {
    if (this.activeElement) {
      this.activeElement.classList.remove('inspected');
    }
    this.activeElement = element;
    element.classList.add('inspected');
    this.log(`Inspecting: ${this.getElementDescription(element)}`);
  }

  undo() {
    if (this.undoStack.length) {
      const state = this.undoStack.pop();
      const sandbox = document.getElementById('sandbox');
      this.redoStack.push({
        method: state.method,
        params: state.params,
        prevState: sandbox.cloneNode(true),
      });
      sandbox.replaceWith(state.prevState);
      this.updateDOMTree();
      this.log(`Undid ${state.method}`);
    }
  }

  redo() {
    if (this.redoStack.length) {
      const state = this.redoStack.pop();
      const sandbox = document.getElementById('sandbox');
      this.undoStack.push({
        method: state.method,
        params: state.params,
        prevState: sandbox.cloneNode(true),
      });
      this.executeMethod(state.method, state.params);
    }
  }

  highlightError(error) {
    const errorDisplay = document.createElement('div');
    errorDisplay.className = 'error-display';
    errorDisplay.textContent = error.message;
    this.demoArea.appendChild(errorDisplay);
    setTimeout(() => errorDisplay.remove(), 3000);
  }
}

// Initialize simulation when document is ready
document.addEventListener('DOMContentLoaded', () => {
  window.domSimulation = new DOMSimulation();
});
