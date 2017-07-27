//  app Functionality full

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
    this.addNoteButton.addEventListener('keyup', () => this.toggleButton());
    
    // Loads notes
    for (let key in localStorage) {
        this.displayNote(key, localStorage[key]);
    }
    
    // Listen for updates on other windows
    window.addEventListener('storage', e => this.displayNote(e.key, e.newValue));
    }
        // Saves note to local storage 
    saveNote() {
        if (this.noteMessageInput.vale) {
            
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
            note = document.createElement('sticky-note')
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
            this.addNoteButton.removeAttribute('disabled')
        } else {
            this.addNoteButton.setAttribute('disabled','true')
    }
   }
  }


class FireNote extends HTMLElement {
    
    // Fires when instance of the element is created 
    createdCallback() {
        
    }
    
    // Fires When an attribute of the element is added 
    attributeChangedCallback(attributeName) {
        
    }
    
    // Sets Note Message
    setMessage(message) {
        
    }
    
    // Deletes the note by removing the element
    deleteNote() {
        
    }
    // Initial content of the element
    FireNote.TEMPLATE = 
    
    // Fire Note elements top level style classes
    FireNote.CLASSES = 
    
    // List of months (Shorthand)
    
    FireNote.MONTHS = 
    
}






document.registerElement('fire-note', FireNote)
// end of file 