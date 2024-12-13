function demonstrateGetElementById() {
    var element = document.getElementById('targetElement');
    element.textContent = 'Text has been changed!';
}

function demonstrateQuerySelector() {
    var firstParagraph = document.querySelector('.demo-paragraph');
    firstParagraph.style.backgroundColor = '#bb86fc';
}

function demonstrateGetElementByClassName() {
    var paragraphs = document.getElementsByClassName('demo-paragraph');
    for (var i = 0; i < paragraphs.length; i++) {
        paragraphs[i].style.color = '#ff9800';
    }
}

function demonstrateGetElementsByTagName() {
    var paragraphs = document.getElementsByTagName('p');
    for (var i = 0; i < paragraphs.length; i++) {
        paragraphs[i].textContent = 'Paragraph ' + (i + 1) + ' - Text has been changed!';
    }
}

function demonstrateQuerySelectorAll() {
    var allParagraphs = document.querySelectorAll('.demo-paragraph');
    allParagraphs.forEach(function (paragraph) {
        paragraph.style.backgroundColor = '#bb86fc';
    });
}

function demonstrateCreateElement() {
    var newParagraph = document.createElement('p');
    newParagraph.textContent = 'This is a new dynamically added paragraph!';
    var container = document.getElementById('newParagraphContainer');
    container.appendChild(newParagraph);
}

function demonstrateInnerHTML() {
    var element = document.getElementById('innerHtmlTarget');
    element.innerHTML = '<strong>New content using innerHTML!</strong>';
}

function demonstrateTextContent() {
    var element = document.getElementById('textContentTarget');
    element.textContent = 'This content was changed using textContent!';
}
