#  Y-Piano

## Inhalt
1. [Idee](#idee)
2. [Installationsanleitung](#installationsanleitung)
3. [Benutzeranleitung](#benutzeranleitung)
4. [Tastenbelegung ](#tastenbelegung )
5. [Verwendeten Technologien](#verwendete-technologien)
6. [Technische Projektbeschreibung](#technische-projektbeschreibung)
## Idee
## Installationsanleitung
## Benutzeranleitung
## Tastenbelegung 
Als Midi-Controller kann jedes beliebiges Midi-Gerät verwendet werden welches "noteon" und "noteoff" events unterstützt. Wir verwendeten ein Microbrute Red zum testen.
### Tastatur und Mausrad
### Midi Controller
## Verwendete Technologien
- Web-Technologien
	 - JavaScript
	 - HTML
	 - CSS
 - Frameworks
	 - React
	 - Tone.js
	 - WebMidi.js
	 - MidiWriterJS
 - Schnittstellen
	 - Musical Instrument Digital Interface (MIDI)
 - Bibliotheken
	 - UIkit

## Technische Projektbeschreibung
Es wird eine Hauptkomponente (App) Verwendet, die alle States verwaltet. Von dieser gehen alle anderen Komponenten ab.
### Komponenten:
 - App
	 - Hauptkomponente, die die Unterkomponenten enthält.
	 - Verwaltet alle States
 - Arpeggios
	 - Verwaltet die Auswahl der Arpeggios
 - ChordSelect
	 - Verwaltet die die Auswahl der Akkorde
 - index
	 - Ruft "App", beim Aufrufen der Seite auf.
 - Keyboard
	 - Verwaltet die UI der Klaviatur
	 - Reagiert auf Input beim klicken auf die Klaviatur
 - LocalStorageHelper
	 - Eine Hilfskomponente welche beim speichern der aktuellen Auswahl im Local Storage hilft
 - MidiExporter
	 - Generiert und handelt den Download der Mididatei
 - OctaveSelector
	 - Verwaltet die UI zum Auswählen der Oktave auf der Klaviatur
 - Progressbar
	 - Verwaltet die UI zum Anzeigen/Auswählen der BPM
 - RandomGenerator
	 - Wählt zufällig die Akkorde, BPM und den Arpeggio aus.
	 - Verwaltet die dementsprechende UI
 - Settings
	 - Auswahlmöglichkeit für den MIDI-Controller
	 - Verwaltet die Einstellungen-UI 
 - Share
	 - Generiert den Share-Link für die momentane Akkord- und BPM-Auswahl
	 - Verwaltet die dementsprechende UI

