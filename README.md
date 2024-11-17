# ReadEase

## CREDITS
images from www.cleanpng.com
=======
Welcome to ReadEase; a web tool designed to improve the readability of online content, making it more accessible for users with various reading challenges, such as dyslexia, visual impairments, or those who simply prefer a more customizable reading experience.
        
With features like magnification, adjustable text sizes, and the ability to fetch and display content from any URL, ReadEase helps users read web pages with greater comfort and ease. The simple toolbar provides quick access to these features, allowing for a smoother, more personalized reading experience. 


### Live link:

 ReadEase < https://dimitri-edel.github.io/barrier-breakers/ >

![Website mockup]( /assets/images/readease-mockup.jpg )

---


## Features

### Toolbar Creation & Customization:

    - The ReadEasy class dynamically creates a toolbar, which can include features like a URL input field, magnification options, and text-to-speech controls.
    - The toolbar can be customized using the options object passed during instantiation. Options include:
        - show_url_field: Whether to display a URL input field.
        - show_magnifying_glass: Whether to display a magnifying glass for text magnification.
        - show_text_to_speech: Whether to display the text-to-speech button.

### Magnification:

    - The toolbar includes an option to magnify text by a factor (e.g., 1.2x, 1.3x, etc.).
    - Magnification can be applied to both images and text within the content. The magnified content will also be styled with a custom font and background color, which can be modified via the toolbar.
    - Magnification can be toggled on/off using the magnifying glass button.

### Text-to-Speech:

    - The text-to-speech feature allows the user to listen to the selected text on the page.
    - The user can choose between different voices (e.g., US English Male, UK English Female).
    - The text-to-speech functionality is triggered when the user selects text on the page. This behavior can be toggled on and off via the toolbar button.
    
### Content Fetching:

    - The fetchURL function allows fetching external content (e.g., web pages) and displaying them in the specified content container, typically a <div> or <iframe>.
    - This functionality is powered by a proxy server (configured via the proxyUrl).

### ResponsiveVoice Integration:

    - If the responsiveVoice library is available, the class uses it to speak the selected text or provide feedback (e.g., "Magnification activated").
    - The voice selection can be customized via the toolbar.

---


## Existing Features 

### Toolbar Creation:

**Dynamic Toolbar:** The ReadEasy class creates a customizable toolbar that can include multiple features like URL input, magnification controls, and text-to-speech buttons.

**Customization:** The toolbar is customizable based on the options provided during instantiation, such as enabling or disabling the URL field, magnifying glass, and text-to-speech functionality.

### Magnification:

**Text Magnification:** Users can magnify text by hovering over it. The class supports magnification of text by scaling font size dynamically based on a specified magnification factor (e.g., 1.2x, 1.3x, etc.).

**Image Magnification:** Images within the content can also be magnified when the mouse hovers over them.

**Magnification Customization:** Users can adjust the magnification settings, such as:
    - Magnification factor (e.g., 1.2x, 1.3x, 1.5x, 2x).
    - Magnification font color.
    - Magnification background color.

### Text-to-Speech:

**Read Aloud Selected Text:** The class allows users to select text from the content, and it will be read aloud using text-to-speech functionality.

**Voice Selection:** Users can choose from multiple available voices (e.g., "US English Male," "US English Female," etc.).
Toggle Text-to-Speech: Users can enable or disable text-to-speech via a button in the toolbar. When activated, the selected text on the page will be read aloud, and the button will change to reflect the current state.

**ResponsiveVoice Integration:** The class uses the responsiveVoice library for text-to-speech functionality (if available). It allows for voice selection and speaking the selected text.

### URL Input Field:

**Fetch URL:** The toolbar includes an input field where users can enter a URL. When a URL is entered and the user presses "Enter" or the field loses focus, the page content is fetched and displayed in the content container.

**URL Navigation:** The class also intercepts anchor clicks within the content, preventing the default browser navigation. Instead, the content is fetched from the clicked URL and displayed within the content container.

### Event Listeners:

**URL Field:** Event listeners are added to the URL input field to fetch and display content from the entered URL when the user presses "Enter" or leaves the field.

**Anchor Clicks:** The class intercepts anchor link clicks within the content to fetch new content dynamically, instead of following the link.

**Magnifying Glass:** A magnifying glass icon in the toolbar can be clicked to toggle magnification on and off. When enabled, users can hover over content to magnify text and images.

**Text Selection for Text-to-Speech:** When text-to-speech is enabled, the class listens for text selection events (e.g., mouseup and touchend) in the content area to read the selected text aloud.

### Content Fetching:

**Fetch and Display Content:** The fetchURL function fetches content from a given URL using a proxy server and updates the content container (which could be a div or an iframe).

**Cross-Origin Request Handling:** The content is fetched through a proxy server < https://readeasy-b281a909ec0b.herokuapp.com/proxy > to avoid CORS (Cross-Origin Resource Sharing) issues.

### Responsive Voice Feedback:

**Voice Feedback:** The ReadEasy class can provide voice feedback for actions, such as when magnification is activated or deactivated, or when text-to-speech is toggled on or off.

### Content-Type Handling:

**Iframe Support:** If the content is displayed in an iframe, the class ensures that the magnification and text-to-speech functionality work inside the iframe as well. It handles text selection and mouse events within the iframe’s document.
General Content Handling: The class works with both content inside iframes and directly displayed content (e.g., a div), making it versatile for different content types.


## Features Left to Implement


---

## Design

![Color Palette](/assets/images/color-palette-readease.jpg)

    - the palette was chosen due to certain color combinations can significantly improve readability for people with dyslexia.
    - the **soft contrast** between text and background is less straining on the eyes, and avoiding stark combinations like black-on-white or white-on-black.
    - the contrast between text and the background ensures readability without causing visual discomfort.
    - some studies suggest that certain colors, such as blue or yellow, can help reduce visual stress and improve reading speed and accuracy. 

![Font] - Lexend

    - In addition to color, using clear, sans-serif fonts like Arial or Verdana, and ensuring proper spacing between lines and letters can also enhance readability.
    - The Lexend font is a font designed for people with dyslexia and struggling readers.
    - If the font does not load, the back-up font is sans-serif.

---

## Technologies Used

- HTML: used to create the basis of the website.
- CSS: used to style and edit the layout of the website.
- JavaScript: used to create scripts for the functionality of the website. 
- Balsamiq: used to create wireframes of what the website was envisioned to look like.
- Git: used for version control.
- Github: used to host the website.

---


# Manual Tests

## Homepage
**TEST** | **ACTION** | **EXPECTATION** | **RESULT** 
----------|----------|----------|----------
**Get started** Link | User clicks on the **Get started** link | The  **site-viewer** page opens | **SUCCESS** |


### W3C HTML Validation


### W3C CSS Validation


### Lighthouse

---

## Responsiveness


---


## Bugs 


---


## Deployment
 


### Live link:

ReadEase < https://dimitri-edel.github.io/barrier-breakers/ >

---


## Credits 

### Content

- Informative Content


- Outside Code



### Media 
    - Color Palette: Color Hunt < https://colorhunt.co/palette/78b3cec9e6f0fbf8eff96e2a >
