class EventSimulation {
    constructor() {
        this.demoArea = document.getElementById('event-demo-output');
        this.activeListeners = new Map();
        this.setupSimulation();
    }

    setupSimulation() {
        this.createControlPanel();
        this.createEventPlayground();
        this.createEventFlowVisualizer();
        this.createLogContainer();
    }

    createControlPanel() {
        const controls = document.createElement('div');
        controls.className = 'control-panel';

        // Event selector
        const eventSelect = document.createElement('select');
        eventSelect.className = 'demo-select';
        ['click', 'mouseover', 'mouseout', 'keydown', 'input', 'submit', 'custom'].forEach(type => {
            const option = document.createElement('option');
            option.value = option.textContent = type;
            eventSelect.appendChild(option);
        });

        // Element selector
        const elementSelect = document.createElement('select');
        elementSelect.className = 'demo-select';
        ['button', 'div', 'input', 'form'].forEach(type => {
            const option = document.createElement('option');
            option.value = option.textContent = type;
            elementSelect.appendChild(option);
        });

        // Event options
        const useCapture = document.createElement('input');
        useCapture.type = 'checkbox';
        useCapture.id = 'useCapture';
        const captureLabel = document.createElement('label');
        captureLabel.htmlFor = 'useCapture';
        captureLabel.textContent = 'Use Capture Phase';

        // Handler code input
        const handlerInput = document.createElement('textarea');
        handlerInput.className = 'handler-input';
        handlerInput.placeholder = 'event => {\n  // Your handler code\n}';

        // Action buttons
        const addBtn = document.createElement('button');
        addBtn.className = 'demo-button';
        addBtn.textContent = 'Add Listener';
        addBtn.onclick = () => this.addEventHandler(
            eventSelect.value,
            elementSelect.value,
            handlerInput.value,
            useCapture.checked
        );

        const removeBtn = document.createElement('button');
        removeBtn.className = 'demo-button';
        removeBtn.textContent = 'Remove Listener';
        removeBtn.onclick = () => this.removeEventHandler(
            eventSelect.value,
            elementSelect.value
        );

        const triggerBtn = document.createElement('button');
        triggerBtn.className = 'demo-button';
        triggerBtn.textContent = 'Trigger Event';
        triggerBtn.onclick = () => this.triggerEvent(eventSelect.value);

        const resetBtn = document.createElement('button');
        resetBtn.className = 'demo-button';
        resetBtn.textContent = 'End Simulation';
        resetBtn.onclick = () => this.reset();

        [eventSelect, elementSelect, useCapture, captureLabel,
         handlerInput, addBtn, removeBtn, triggerBtn, resetBtn].forEach(el =>
            controls.appendChild(el));


        this.demoArea.appendChild(controls);
    }

    createEventPlayground() {
        const playground = document.createElement('div');
        playground.className = 'event-playground';

        const elements = {
            button: 'Click Me',
            div: 'Interactive Div',
            input: '',
            form: '<input type="text"><button type="submit">Submit</button>'
        };

        Object.entries(elements).forEach(([type, content]) => {
            const element = type === 'form'
                ? document.createElement('form')
                : document.createElement(type);

            element.className = 'demo-element';
            if (type === 'form') {
                element.innerHTML = content;
            } else if (type === 'input') {
                element.placeholder = 'Test Input';
            } else {
                element.textContent = content;
            }

            element.addEventListener('click', e => this.handleEvent(e));
            playground.appendChild(element);
        });

        this.playground = playground;
        this.demoArea.appendChild(playground);
    }

    createEventFlowVisualizer() {
        const visualizer = document.createElement('div');
        visualizer.className = 'event-flow-visualizer';
        this.visualizer = visualizer;
        this.demoArea.appendChild(visualizer);
    }

    addEventHandler(eventType, elementType, handlerCode, useCapture) {
        try {
            const element = this.playground.querySelector(elementType);
            if (!element) throw new Error(`Element ${elementType} not found`);

            const handler = new Function('event', handlerCode);
            const wrappedHandler = (event) => {
                this.visualizeEventFlow(event);
                handler(event);
            };

            element.addEventListener(eventType, wrappedHandler, useCapture);

            const key = `${eventType}-${elementType}-${useCapture}`;
            this.activeListeners.set(key, wrappedHandler);

            this.log(`Added ${eventType} listener to ${elementType}`);
        } catch (error) {
            this.log(`Error: ${error.message}`, 'error');
        }
    }

    removeEventHandler(eventType, elementType) {
        const key = `${eventType}-${elementType}`;
        const handler = this.activeListeners.get(key);

        if (handler) {
            const element = this.playground.querySelector(elementType);
            element.removeEventListener(eventType, handler);
            this.activeListeners.delete(key);
            this.log(`Removed ${eventType} listener from ${elementType}`);
        }
    }

    handleEvent(event) {
        event.stopPropagation();
        this.visualizeEventFlow(event);
        this.log(`${event.type} event on ${event.target.tagName}`);
    }

    visualizeEventFlow(event) {
        const phase = event.eventPhase === 1 ? 'Capture'
                   : event.eventPhase === 2 ? 'Target'
                   : 'Bubble';

        const flowEntry = document.createElement('div');
        flowEntry.className = `flow-entry phase-${phase.toLowerCase()}`;
        flowEntry.textContent = `${phase}: ${event.type} on ${event.target.tagName}`;

        this.visualizer.appendChild(flowEntry);
        setTimeout(() => this.visualizer.removeChild(flowEntry), 2000);
    }

    triggerEvent(eventType) {
        try {
            const event = eventType === 'custom'
                ? new CustomEvent('custom', { detail: { time: new Date() } })
                : new Event(eventType);

            this.playground.firstElementChild.dispatchEvent(event);
            this.log(`Triggered ${eventType} event programmatically`);
        } catch (error) {
            this.log(`Error: ${error.message}`, 'error');
        }
    }

    reset() {
        this.activeListeners.forEach((handler, key) => {
            const [eventType, elementType] = key.split('-');
            this.removeEventHandler(eventType, elementType);
        });

        this.playground.innerHTML = '';
        this.visualizer.innerHTML = '';
        this.createEventPlayground();
        this.log('Simulation reset');
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
}

// Initialize simulation when document is ready
document.addEventListener('DOMContentLoaded', () => {
    window.eventSimulation = new EventSimulation();
});

