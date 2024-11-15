var read_easy = new ReadEasy('read-easy', "content", {show_magnifying_glass: true, show_url_field: true, show_text_to_speech: true});

// Define the function to handle anchor clicks
window.handleAnchorClick = function (url) {
    read_easy.fetchURL(url);
};