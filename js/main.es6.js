//  app Functionality full
'use strict';
class FireNotesApp {
    
    // Initializes Fire Notes
    constructor() { 
    
    // Shortcuts the DOM
    this.notesContainer = document.getElementById('notes-container');
    this.noteMessageInput = document.getElementById('message'); 
    this.addNoteButton = document.getElementById('save');
    this.notesSectionTitle = document.getElementById('notes-section-title');
    //End
    
    // Save notes on submit 
    this.addNoteButton.addEventListener('click', () => this.saveNote());
    
    //Toggle for button
    this.noteMessageInput.addEventListener('keyup', () => this.toggleButton());
    
    // Loads notes
    for (let key in localStorage) {
        this.displayNote(key, localStorage[key]);
    }
    
    // Listen for updates on other windows
    window.addEventListener('storage', e => this.displayNote(e.key, e.newValue));
    }
    
    
        // Saves note to local storage 
    saveNote() {
        if (this.noteMessageInput.value) {
            let key = Date.now().toString();
            localStorage.setItem(key, this.noteMessageInput.value);
            this.displayNote(key, this.noteMessageInput.value);
            FireNotesApp.resetMaterialTextField(this.noteMessageInput);
            this.toggleButton();
        }
        
    }
    
    // Resets the given MaterialTextField 
    
    static resetMaterialTextfield(element) {
        element.value = '';
        element.parentNode.MaterialTextField.boundUpdateClassHandler();
        element.blur();
        
    }
    
    // Creates/Updates/Deletes a note via UI 
    
    displayNote(key, message) {
        let note = document.getElementById(key);
        // If no element with key, create a new one 
        if (!note) {
            note = document.createElement('fire-note');
            note.id = key;
            this.notesContainer.insertBefore(note, this.notesSectionTitle.nextSibling);
        }
        // If the message is null delete the note 
        if (!message) {
            return note.deleteNote();
        }
        note.setMessage(message);
    }
    
    // Enables/ Disables Submit button, based on if the input field has a value
    
    toggleButton() {
        if (this.noteMessageInput.value) {
            this.addNoteButton.removeAttribute('disabled');
        } else {
            this.addNoteButton.setAttribute('disabled','true');
    }
   }
  }


// on load and startup
window.addEventListener('load', () => new FireNotesApp());


// Sticky note custom element 
class FireNote extends HTMLElement {
    
    // Fires when instance of the element is created 
    createdCallback() {
        this.classList.add(...FireNote.CLASSES);
        this.innerHTML = FireNote.TEMPLATE;
        this.messageElement = this.querySelector('.messsage');
        this.dateElement = this.querySelector('.date');
        this.deleteButton = this.querySelector('.delete');
        this.deleteButton.addEventListener('click', () => this.deleteNote());

    }
    
    // Fires When an attribute of the element is added 
    attributeChangedCallback(attributeName) {
        // display/update the created date message if the id changes. 
        if (attributeName == 'id') {
            let date;
            if (this.id) {
                date - new Date(parseInt(this.id));
            } else {
                date = new Date();
            }
            
            // Format Date 
            
            let dateFormatterOptions = {day: 'numeric', month: 'short'};
            let shortDate = new intl.DateTimeFormat("en-US", dateFormatterOptions).format(date);
            this.dateElement.textContent = `Created p ${shortDate}`;
        }
    }
    
    // Sets Note Message
    setMessage(message) {
        this.messageElement.textContent = message;
        // Replace all line breaks
        this.messageElement.innerHTML = this.messageElement.innerHTML.replace(/\n/g, '<br>');
        
    }
    
    // Deletes the note by removing the element
    deleteNote() {
        localStorage.removeItem(this.id);
        this.parentNode.removeChild(this);
        }
    }
    // Initial content of the element
    FireNote.TEMPLATE =  `
    <div class="message"></div>
    <div class="date"></div>
    <button class="delete mdl-button mdl-js-button mdl-js-ripple-effect">
      Delete
    </button>`;
    
    // Fire Note elements top level style classes
    FireNote.CLASSES = ['mdl-cell--4-col-desktop', 'mdl-card__supporting-text', 'mdl-cell--12-col',
  'mdl-shadow--2dp', 'mdl-cell--4-col-tablet', 'mdl-card', 'mdl-cell', 'sticky-note'];
    


document.registerElement('fire-note', FireNote);
// end of file 