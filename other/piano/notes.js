const speed = 1;


// Plays a single note based on noteId (doesn't wait for it to finish)
function playAudioFor(noteId) {
    const audio = new Audio(`audio/${noteId}.mp3`);
    audio.play();
}

// Utility function that returns a Promise resolved after N ms
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Load and parse notes from embedded script tag
async function loadNotes() {
    try {
        const text = document.getElementById('notes-data').textContent;
        
        // Parse each line into noteId and length
        const noteArray = text
            .trim()
            .split('\n')
            .map(line => {
                const [noteId, length] = line.trim().split(/\s+/);
                return {
                    noteId: noteId,
                    length: parseInt(length, 10)
                };
            })
            .filter(note => note.noteId && !isNaN(note.length));
        
        return noteArray;
    } catch (error) {
        console.error('Error loading notes:', error);
        return [];
    }
}

// Plays the note array in sequence
async function playNotes() {
    console.log("Loading notes...");
    const noteArray = await loadNotes();
    
    if (noteArray.length === 0) {
        console.log("No notes to play!");
        return;
    }
    
    console.log("Start playing!");
    for (let note of noteArray) {
        console.log("Playing:", note.noteId, "for", note.length, "ms");
        playAudioFor(note.noteId);  // Start playing (don't wait)
        await wait(note.length * speed);    // Wait specified duration before next note
    }
    console.log("Done!");
}

document.querySelector('button').addEventListener('click', playNotes);