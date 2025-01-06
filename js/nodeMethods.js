class NodeSimulation {
    constructor() {

        this.demoArea = document.getElementById('node-demo-output');
        this.selectedNode = null;
        this.history = [];
        this.setupSimulation();
    }

    setupSimulation() {
        // Create control panel
        const controls = document.createElement('div');
        controls.className = 'control-panel';

        // Method selector
        const methodSelect = document.createElement('select');
        methodSelect.className = 'demo-select';
        ['cloneNode', 'appendChild', 'insertBefore', 'removeChild',
         'replaceChild', 'hasChildNodes'].forEach(method => {
            const option = document.createElement('option');
            option.value = option.textContent = method;
            methodSelect.appendChild(option);
        });

        // Parameter inputs
        const paramInput = document.createElement('input');
        paramInput.className = 'demo-input';
        paramInput.placeholder = 'Enter node content...';

        // Action buttons
        const executeBtn = document.createElement('button');
        executeBtn.className = 'demo-button';
        executeBtn.textContent = 'Execute';
        executeBtn.onclick = () => this.executeNodeMethod(methodSelect.value, paramInput.value);

        const undoBtn = document.createElement('button');
        undoBtn.className = 'demo-button';
        undoBtn.textContent = 'Undo';
        undoBtn.onclick = () => this.undo();

        const resetBtn = document.createElement('button');
        resetBtn.className = 'demo-button';
        resetBtn.textContent = 'End Simulation';
        resetBtn.onclick = () => this.reset();

        // Tree visualization area
        const treeView = document.createElement('div');
        treeView.className = 'tree-view';
        this.treeView = treeView;

        // Create initial DOM tree
        this.createInitialTree();

        // Add components to control panel
        [methodSelect, paramInput, executeBtn, undoBtn, resetBtn].forEach(el =>
            controls.appendChild(el));

        // Setup log container
        const logContainer = document.createElement('div');
        logContainer.className = 'log-container';
        this.logContainer = logContainer;

        // Append all elements
        this.demoArea.appendChild(controls);
        this.demoArea.appendChild(treeView);
        this.demoArea.appendChild(logContainer);
    }

    createInitialTree() {
        const root = this.createNode('div', 'root');
        const child1 = this.createNode('div', 'child-1');
        const child2 = this.createNode('div', 'child-2');
        const grandchild = this.createNode('div', 'grandchild');

        child1.appendChild(grandchild);
        root.appendChild(child1);
        root.appendChild(child2);

        this.treeView.appendChild(root);
        this.updateTreeView();
    }

    createNode(type, text) {
        const node = document.createElement(type);
        node.textContent = text;
        node.className = 'tree-node';
        node.onclick = (e) => {
            e.stopPropagation();
            this.selectNode(node);
        };
        return node;
    }

    selectNode(node) {
        if (this.selectedNode) {
            this.selectedNode.classList.remove('selected');
        }
        this.selectedNode = node;
        node.classList.add('selected');
        this.log(`Selected node: ${node.textContent}`);
    }

    executeNodeMethod(method, params) {
        if (!this.selectedNode) {
            this.log('Please select a node first', 'error');
            return;
        }

        try {
            switch(method) {
                case 'cloneNode':
                    const clone = this.selectedNode.cloneNode(params === 'true');
                    clone.onclick = (e) => {
                        e.stopPropagation();
                        this.selectNode(clone);
                    };
                    this.selectedNode.parentNode.appendChild(clone);
                    break;

                case 'appendChild':
                    const newNode = this.createNode('div', params || 'New Node');
                    this.selectedNode.appendChild(newNode);
                    break;

                case 'insertBefore':
                    const reference = this.selectedNode.nextSibling;
                    if (reference) {
                        const insertNode = this.createNode('div', params || 'Inserted Node');
                        this.selectedNode.parentNode.insertBefore(insertNode, reference);
                    }
                    break;

                case 'removeChild':
                    if (this.selectedNode.parentNode) {
                        this.selectedNode.parentNode.removeChild(this.selectedNode);
                    }
                    break;

                case 'replaceChild':
                    if (this.selectedNode.parentNode) {
                        const replacement = this.createNode('div', params || 'Replacement Node');
                        this.selectedNode.parentNode.replaceChild(replacement, this.selectedNode);
                    }
                    break;

                case 'hasChildNodes':
                    const hasChildren = this.selectedNode.hasChildNodes();
                    this.log(`Node has children: ${hasChildren}`);
                    break;
            }

            this.history.push({
                method,
                params,
                node: this.selectedNode.cloneNode(true)
            });

            this.updateTreeView();
            this.log(`Executed ${method}() successfully`);
        } catch (error) {
            this.log(`Error: ${error.message}`, 'error');
        }
    }

    updateTreeView() {
        const nodes = this.treeView.getElementsByClassName('tree-node');
        Array.from(nodes).forEach(node => {
            node.style.marginLeft = `${this.getNodeLevel(node) * 20}px`;
        });
    }

    getNodeLevel(node) {
        let level = 0;
        let current = node;
        while (current.parentElement && !current.parentElement.classList.contains('tree-view')) {
            level++;
            current = current.parentElement;
        }
        return level;
    }

    undo() {
        if (this.history.length > 0) {
            this.history.pop();
            this.treeView.innerHTML = '';
            this.createInitialTree();
            this.log('Undid last action');
        }
    }

    reset() {
        this.treeView.innerHTML = '';
        this.createInitialTree();
        this.history = [];
        this.selectedNode = null;
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
    window.nodeSimulation = new NodeSimulation();
});

