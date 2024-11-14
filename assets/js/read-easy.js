// class that creates a toolbar and adds it to the document
class ReadEasy {
    constructor(toolbar_element_id, content_element_id, options) {
        this.toolbar_element_id = toolbar_element_id;
        this.content_element_id = content_element_id;
        this.options = options;
        this.magnificationEnabled = false; // Flag to track magnification state
        this.magnifyBound = this.magnify.bind(this); // Store bound function
        this.restoreFontSizeBound = this.restoreFontSize.bind(this); // Store bound function
        this.enableMagnificationBound = this.enableMagnification.bind(this); // Store bound function
        this.disableMagnificationBound = this.disableMagnification.bind(this); // Store bound function
        this.init();
    }

    init() {
        this.createToolbar();
        this.addToolbar();
        this.addEventListeners();
    }

    createToolbar() {
        var toolbar = document.createElement('div');
       
        toolbar.id = this.toolbar_element_id;
        toolbar.innerHTML = `
            <button id="read-easy-button" title="Toggle Read Easy">
                Toggle Toolbar
            </button>            
        `;
        if (this.options.show_magnifying_glass) {
            // append the span to the toolbar
            toolbar.innerHTML += `
                <span id="magnifying-glass"><i class="fa-solid fa-magnifying-glass"></i></span>
            `;
        }
        if (this.options.show_url_field) {
            // append the input to the toolbar
            toolbar.innerHTML += `
                <input type="text" id="url-field" placeholder="Enter URL">
            `;
        }

        this.toolbar = toolbar;
    }

    addToolbar() {
        document.body.appendChild(this.toolbar);
    }

    addEventListeners() {
        var button = document.getElementById('read-easy-button');
        button.removeEventListener('click', this.toggleReadEasy.bind(this)); // Remove existing listener
        button.addEventListener('click', this.toggleReadEasy.bind(this));

        var url_field = document.querySelector('#url-field');
        url_field.removeEventListener('keyup', this.urlFieldKeyUpBound); // Remove existing listener
        this.urlFieldKeyUpBound = (event) => {
            if (event.key === 'Enter') {
                this.fetchURL(url_field.value);
            }
        };
        url_field.addEventListener('keyup', this.urlFieldKeyUpBound);

        // Intercept anchor clicks inside the dynamically fetched content
        var content = document.getElementById(this.content_element_id);
        content.removeEventListener('click', this.contentClickBound); // Remove existing listener
        this.contentClickBound = (event) => {
            if (event.target.tagName === 'A' && event.target.href) {
                event.preventDefault();
                this.fetchURL(event.target.href);
            }
        };
        content.addEventListener('click', this.contentClickBound);

        // Add initial event listener for magnifying glass
        var magnifyingGlass = document.getElementById('magnifying-glass');
        magnifyingGlass.removeEventListener('click', this.enableMagnificationBound); // Remove existing listener
        magnifyingGlass.addEventListener('click', this.enableMagnificationBound);
    }

    toggleReadEasy() {
        let magnifying_glass = document.getElementById('magnifying-glass');
        let url_field = document.getElementById('url-field');
        /* hide or show the magnifying glass */
        if (magnifying_glass) {
            magnifying_glass.style.display = magnifying_glass.style.display === 'none' ? 'flex' : 'none';
        }
        /* hide or show the url field */
        if (url_field) {
            url_field.style.display = url_field.style.display === 'none' ? 'block' : 'none';
        }
    }

    // fetch the url and display it in the div with id content
    fetchURL(url) {
        // const proxyUrl = `http://localhost:3000/proxy?url=${encodeURIComponent(url)}`;
        const proxyUrl = `https://readeasy-b281a909ec0b.herokuapp.com/proxy?url=${encodeURIComponent(url)}`;
        fetch(proxyUrl)
            .then(response => response.text())
            .then(data => {
                var content = document.getElementById(this.content_element_id);
                content.innerHTML = data;

                // Re-apply event listeners to new content
                this.addEventListeners();
            }).catch(error => {
                console.error('Error:', error);
            });
    }

    enableMagnification() {
        const content = document.getElementById(this.content_element_id);
        content.addEventListener('mousemove', this.magnifyBound);
        content.addEventListener('mouseleave', this.restoreFontSizeBound);

        // Swap the event listener to disable magnification
        var magnifyingGlass = document.getElementById('magnifying-glass');
        magnifyingGlass.removeEventListener('click', this.enableMagnificationBound);
        magnifyingGlass.addEventListener('click', this.disableMagnificationBound);
    }

    disableMagnification() {
        const content = document.getElementById(this.content_element_id);
        content.removeEventListener('mousemove', this.magnifyBound);
        content.removeEventListener('mouseleave', this.restoreFontSizeBound);
        this.restoreFontSize();

        // Swap the event listener to enable magnification
        var magnifyingGlass = document.getElementById('magnifying-glass');
        magnifyingGlass.removeEventListener('click', this.disableMagnificationBound);
        magnifyingGlass.addEventListener('click', this.enableMagnificationBound);
    }

    magnify(event) {
        const content = document.getElementById(this.content_element_id);
        const magnificationFactor = 1.3;

        const element = document.elementFromPoint(event.clientX, event.clientY);
        if (element && content.contains(element)) {
            if (element.tagName === 'IMG') {
                if (!element.dataset.originalWidth) {
                    element.dataset.originalWidth = element.width;
                    element.dataset.originalHeight = element.height;
                }
                element.style.transition = 'transform 0.1s';
                element.style.transform = `scale(${magnificationFactor})`;
            } else {
                if (!element.dataset.originalFontSize) {
                    element.dataset.originalFontSize = window.getComputedStyle(element).fontSize;
                }
                element.style.transition = 'font-size 0.1s';
                element.style.fontSize = `${parseFloat(element.dataset.originalFontSize) * magnificationFactor}px`;
            }
        }
    }

    restoreFontSize() {
        const content = document.getElementById(this.content_element_id);
        const elements = content.querySelectorAll('[data-original-font-size], [data-original-width]');
        elements.forEach(element => {
            if (element.tagName === 'IMG') {
                element.style.transform = 'scale(1)';
                delete element.dataset.originalWidth;
                delete element.dataset.originalHeight;
            } else {
                element.style.fontSize = element.dataset.originalFontSize;
                delete element.dataset.originalFontSize;
            }
        });
    }
}

// Define the function to handle anchor clicks
function handleAnchorClick(url) {
    read_easy.fetchURL(url);
}

var read_easy = new ReadEasy('read-easy', "content", {show_magnifying_glass: true, show_url_field: true});
// Apply initial event listeners
// read_easy.addEventListeners();