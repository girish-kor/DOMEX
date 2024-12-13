function logClickEvent() {
    const eventLog = document.getElementById('eventLog');
    const logItem = document.createElement('p');
    logItem.textContent = 'Button clicked!';
    eventLog.appendChild(logItem);
}

function logMouseOverEvent() {
    const eventLog = document.getElementById('eventLog');
    const logItem = document.createElement('p');
    logItem.textContent = 'Mouse hovered over the area!';
    eventLog.appendChild(logItem);
}

function logKeyPressEvent(event) {
    const eventLog = document.getElementById('eventLog');
    const logItem = document.createElement('p');
    logItem.textContent = `Key pressed: ${event.key}`;
    eventLog.appendChild(logItem);
}

function addDynamicEventListener() {
    const targetButton = document.getElementById('targetButton');
    targetButton.addEventListener('click', function () {
        const eventLog = document.getElementById('eventLog');
        const logItem = document.createElement('p');
        logItem.textContent = 'Dynamic event listener triggered!';
        eventLog.appendChild(logItem);
    });

    const eventLog = document.getElementById('eventLog');
    const logItem = document.createElement('p');
    logItem.textContent = 'Event listener added to the target button.';
    eventLog.appendChild(logItem);
}

function removeDynamicEventListener() {
    const targetButton = document.getElementById('targetButton');
    const eventLog = document.getElementById('eventLog');

    const logItem = document.createElement('p');
    logItem.textContent = 'Dynamic event listener removed.';
    eventLog.appendChild(logItem);
}

document.getElementById('dynamicEventButton').addEventListener('click', addDynamicEventListener);

document.getElementById('hoverArea').addEventListener('mouseover', logMouseOverEvent);

document.getElementById('keypressInput').addEventListener('keypress', logKeyPressEvent);

document.getElementById('eventDemo').addEventListener('click', function (event) {
    if (event.target && event.target.tagName === 'BUTTON') {
        logClickEvent();
    }
});

document.querySelector('#eventDemo button').addEventListener('click', logClickEvent);

function addEventListenersForDynamicButtons() {
    const dynamicEventButton = document.getElementById('dynamicEventButton');
    dynamicEventButton.addEventListener('click', () => {
        const eventLog = document.getElementById('eventLog');
        const logItem = document.createElement('p');
        logItem.textContent = 'Dynamic Event Button Clicked!';
        eventLog.appendChild(logItem);
    });
}
