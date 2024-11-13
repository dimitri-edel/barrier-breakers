// class that creates a toolbar and adds it to the document
class ReadEasy {
    constructor(toolbar_element_id, content_element_id, options) {
        this.toolbar_element_id = toolbar_element_id;
        this.content_element_id = content_element_id;
        this.options = options;
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
        button.addEventListener('click', this.toggleReadEasy.bind(this));
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
       
}

var read_easy = new ReadEasy('read-easy', "content", {show_magnifying_glass: true, show_url_field: true});