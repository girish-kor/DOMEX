function changeStyle() {
    const box = document.getElementById('box');
    box.style.backgroundColor = '#bb86fc';
    box.style.width = '300px';
    box.style.height = '300px';
    box.style.transition = 'all 0.5s ease';
    box.style.color = '#121212';
    box.style.fontSize = '20px';
    box.style.padding = '20px';
    box.style.borderRadius = '15px';
}

function toggleVisibility() {
    const box = document.getElementById('box');
    if (box.style.display === 'none') {
        box.style.display = 'block';
    } else {
        box.style.display = 'none';
    }
}

function changeBackgroundColor() {
    const box = document.getElementById('box');
    box.style.backgroundColor = getRandomColor();
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function toggleBoxShadow() {
    const box = document.getElementById('box');
    if (box.style.boxShadow) {
        box.style.boxShadow = '';
    } else {
        box.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
    }
}

function setInlineStyles() {
    const box = document.getElementById('box');
    box.setAttribute(
        'style',
        'background-color: #FF5722; width: 250px; height: 250px; border-radius: 20px; color: #fff; font-size: 18px; text-align: center; padding: 20px; box-shadow: 0 8px 25px rgba(0, 0, 0, 0.6);'
    );
}

function resetStyles() {
    const box = document.getElementById('box');
    box.removeAttribute('style');
    box.textContent = 'Hover and click me!';
}

document.getElementById('hoverBox').addEventListener('mouseover', function () {
    this.style.backgroundColor = '#6200ea';
    this.style.transform = 'scale(1.05)';
    this.style.transition = 'transform 0.3s ease-in-out';
});

document.getElementById('hoverBox').addEventListener('mouseout', function () {
    this.style.backgroundColor = '#121212';
    this.style.transform = 'scale(1)';
});

document.getElementById('box').addEventListener('click', toggleVisibility);
