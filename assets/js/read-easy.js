// class that creates a toolbar and adds it to the document
class ReadEasy {
    constructor(toolbar_element_id, content_element_id, options) {
        this.toolbar_element_id = toolbar_element_id;
        this.content_element_id = content_element_id;
        this.options = options;
        this.magnificationEnabled = false; // Flag to track magnification state
        this.text_to_speech_enabled = false; // Flag to track text-to-speech state
        this.text_to_speech_voice = "US English Male"; // The voice to use for text-to-speech
        this.magnification_font_color = "#000000"; // the font color of the magnified text
        this.manginfication_background_color = "#ffffff"; // the background color of the magnified text
        this.magnification_factor = 1.2; // the factor by which the text is magnified
        this.magnifyBound = this.magnify.bind(this); // Store bound function
        this.restoreFontSizeBound = this.restoreFontSize.bind(this); // Store bound function
        this.enableMagnificationBound = this.enableMagnification.bind(this); // Store bound function
        this.disableMagnificationBound = this.disableMagnification.bind(this); // Store bound function
        this.getSelectionTextBound = this.getSelectionText.bind(this); // Store bound function
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

        if (this.options.show_url_field) {
            // append the input to the toolbar
            toolbar.innerHTML += `
                <input type="text" id="url-field" placeholder="Enter URL">
            `;
        } else {
            // If the URL field is not shown, reduce the height of the toolbar
            let read_easy_element = document.getElementById("read-easy");
            read_easy_element.style.height = '70px';
            toolbar.style.height = '60px';
        }

        if (this.options.show_magnifying_glass) {
            // append the span to the toolbar
            toolbar.innerHTML += `
                <span id="magnification-panel">
                    <span id="magnifying-glass"><i class="fa-solid fa-magnifying-glass"></i></span>
                    <span id="magninification-font-color-selector">Text: <input onchange="read_easy.changeMagnificationFontColor(this)" type="color" id="font-color" value="#000000"></span>
                    <span id="magninification-background-color-selector">Background: <input onchange="read_easy.changeMagnificationBackgroundColor(this)" type="color" id="background-color" value="#ffffff"></span>
                    <span id="magnification-factor-selector">
                        <select id="magnification-factor" onchange="read_easy.changeMagnificationFactor(this)">
                            <optgroup>
                                <option value="1.2">Select Magnification Factor</option>
                                <option value="1.3">1.3x</option>
                                <option value="1.5">1.5x</option>
                                <option value="2">2x</option>
                            </optgroup>
                        </select>
                    </span>
                </span>
            `;
        }
        if (this.options.show_text_to_speech) {
            // append the input button to the toolbar
            toolbar.innerHTML += `
                <span id="text-to-speech-panel">
                    <button id="text-to-speech-button" title="Toggle Text to Speech" onclick="read_easy.toggleTextToSpeech()">
                        <i class="fa-solid fa-volume-xmark"></i>
                    </button>
                    <span id="text-to-speech-voice-selector">
                        <select id="text-to-speech-voice" onchange="read_easy.setTextToSpeechVoice(this)">
                            <optgroup>
                                <option value="US English Male">US English Female 1</option>
                                <option value="US English Female">US English Female 2</option>
                                <option value="UK English Male">UK English Male</option>
                                <option value="UK English Female">UK English Female</option>
                            </optgroup>
                        </select>
                </span>
            `;
        }
        this.toolbar = toolbar;
    }

    addToolbar() {
        document.body.appendChild(this.toolbar);
    }

    addEventListeners() {
        // The URL field is only available if the option is enabled
        var url_field = document.querySelector('#url-field');
        if (url_field) {
            url_field.removeEventListener('change', this.urlFieldChangedBound); // Remove existing listener
        }
        this.urlFieldChangedBound = (event) => {
            this.fetchURL(url_field.value);
        };
        if (url_field) { url_field.addEventListener('change', this.urlFieldChangedBound); }



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

    toggleTextToSpeech() {
        var textToSpeechButton = document.getElementById('text-to-speech-button');
        if (this.text_to_speech_enabled) {
            textToSpeechButton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
            textToSpeechButton.classList.remove('active');
            this.textToSpeech('Text to speech deactivated.');
        } else {
            textToSpeechButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
            textToSpeechButton.classList.add('active');
            this.textToSpeech('Text to speech activated.');
        }
        this.addToggleTextToSpeechEventListeners();
        this.text_to_speech_enabled = !this.text_to_speech_enabled;
    }

    addToggleTextToSpeechEventListeners() {
        // The speech synthesis is only available if the option is enabled        
        // Add event listener for selection text on mouseup in the content
        var content = document.getElementById(this.content_element_id);
        let content_document = null;

        // if content is an iframe, get the document inside the iframe        
        // This is necessary because the content of the iframe is a separate document
        if (content.tagName === 'IFRAME') {
            content_document = content.contentDocument || content.contentWindow.document;
        }
        if (content_document !== null) {
            // It is an iframe
            content_document.body.removeEventListener('mouseup', this.getSelectionTextBound); // Remove existing listener
            this.getSelectionTextBound = (event) => {
                const selectedText = this.getSelectionText(content_document);
                if (selectedText) {
                    this.textToSpeech(selectedText);
                }
            };
            content_document.body.addEventListener('mouseup', this.getSelectionTextBound); // Add new listener
        } else if (content !== null && content !== undefined && content.tagName === 'DIV') {
            // This is a div element
            content.removeEventListener('mouseup', this.getSelectionTextBound); // Remove existing listener
            this.getSelectionTextBound = (event) => {
                const selectedText = this.getSelectionText(document); // Use the main document
                if (selectedText) {
                    this.textToSpeech(selectedText);
                }
            };
            content.addEventListener('mouseup', this.getSelectionTextBound); // Add new listener
        }
        else {
            console.error('Content element not found');
        }
    }

    setTextToSpeechVoice(voice) {
        this.text_to_speech_voice = voice.value;
    }

    getSelectionText(doc = document) {
        var text = "";
        if (doc.getSelection) {
            text = doc.getSelection().toString();
            // for Internet Explorer 8 and below. For Blogger, you should use &amp;&amp; instead of &&.
        } else if (doc.selection && doc.selection.type != "Control") {
            text = doc.selection.createRange().text;
        }
        return text;
    }

    // fetch the url and display it in the div with id content
    fetchURL(url) {
        const proxyUrl = `https://readeasy-b281a909ec0b.herokuapp.com/proxy?url=${encodeURIComponent(url)}`;
        // const proxyUrl = `http://localhost:3000/proxy?url=${encodeURIComponent(url)}`;
        fetch(proxyUrl)
            .then(response => response.text())
            .then(data => {
                var content = document.getElementById(this.content_element_id);
                // the content element is an iframe
                let content_document = content.contentDocument || content.contentWindow.document;
                content_document.body.innerHTML = data;
                // Re-apply event listeners to new content
                this.addEventListeners();
            }).catch(error => {
                console.error('Error:', error);
            });
    }

    changeMagnificationFactor(selectElement) {
        this.magnification_factor = parseFloat(selectElement.value);
    }

    changeMagnificationFontColor(inputElement) {
        this.magnification_font_color = inputElement.value;
    }

    changeMagnificationBackgroundColor(inputElement) {
        this.manginfication_background_color = inputElement.value;
    }

    enableMagnification() {
        this.textToSpeech('Magnification activated. Hover over text to magnify.');        
        const content = document.getElementById(this.content_element_id);
        if (content.tagName === 'IFRAME') {
            const contentDocument = content.contentDocument || content.contentWindow.document;
            contentDocument.addEventListener('mousemove', this.magnifyBound);
            contentDocument.addEventListener('mouseleave', this.restoreFontSizeBound);
        } else {
            content.addEventListener('mousemove', this.magnifyBound);
            content.addEventListener('mouseleave', this.restoreFontSizeBound);
        }

        // Swap the event listener to enable magnification
        var magnifyingGlass = document.getElementById('magnifying-glass');
        // Add active class to the magnifying glass
        magnifyingGlass.classList.add('active');
        magnifyingGlass.removeEventListener('click', this.enableMagnificationBound);
        magnifyingGlass.addEventListener('click', this.disableMagnificationBound);
    }

    disableMagnification() {
        this.textToSpeech('Magnification deactivated.');
        const content = document.getElementById(this.content_element_id);
        if (content.tagName === 'IFRAME') {
            const contentDocument = content.contentDocument || content.contentWindow.document;
            contentDocument.removeEventListener('mousemove', this.magnifyBound);
            contentDocument.removeEventListener('mouseleave', this.restoreFontSizeBound);
        } else {
            content.removeEventListener('mousemove', this.magnifyBound);
            content.removeEventListener('mouseleave', this.restoreFontSizeBound);
        }
        this.restoreFontSize();

        // Swap the event listener to disable magnification
        var magnifyingGlass = document.getElementById('magnifying-glass');
        // Remove active class from the magnifying glass
        magnifyingGlass.classList.remove('active');
        magnifyingGlass.removeEventListener('click', this.disableMagnificationBound);
        magnifyingGlass.addEventListener('click', this.enableMagnificationBound);        
    }

    magnify(event) {
        console.log('Magnifying');
        const content = document.getElementById(this.content_element_id);
        const magnificationFactor = this.magnification_factor;

        let element;
        if (content.tagName === 'IFRAME') {
            const contentDocument = content.contentDocument || content.contentWindow.document;
            element = contentDocument.elementFromPoint(event.clientX, event.clientY);
        } else {
            element = document.elementFromPoint(event.clientX, event.clientY);
        }

        if (element) {
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
                element.style.color = this.magnification_font_color;
                element.style.backgroundColor = this.manginfication_background_color;
            }
        }
    }

    restoreFontSize() {
        const content = document.getElementById(this.content_element_id);
        let elements;
        if (content.tagName === 'IFRAME') {
            const contentDocument = content.contentDocument || content.contentWindow.document;
            elements = contentDocument.querySelectorAll('[data-original-font-size], [data-original-width]');
        } else {
            elements = content.querySelectorAll('[data-original-font-size], [data-original-width]');
        }
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
        // Reset the cursor to default
        document.body.style.cursor = 'default';
    }

    textToSpeech(text) {
        if (typeof responsiveVoice !== 'undefined') {
            responsiveVoice.cancel(); // stop anything currently being spoken
            responsiveVoice.setDefaultVoice(this.text_to_speech_voice);
            responsiveVoice.speak(text);
        } else {
            console.error('ResponsiveVoice is not available.');
        }
    }
}
