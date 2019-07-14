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

Voraussetzungen:
	- [Node.js](https://nodejs.org/)
	- [React.js](https://reactjs.org/)

### Node.js Installation

#### Windows
Den Windows Installer kann man über die [Nodejs.org](https://nodejs.org/en/download/) Webseite runterladen.

#### macOS
Den macOS Installer kann man ebenfalls über die [Nodejs.org](https://nodejs.org/en/download/) Webseite runterladen.
Oder Folgendes in der Kommandozeile ausführen um die Installation durchzuführen:
```
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

#### Ubuntuu
Die Installation von Node.js auf Ubuntuu erfolgt über folgendes Kommando:
```
sudo apt-get install nodejs
```
Dann npm (node package manager) installieren:
```
sudo apt-get install npm
```

### React.js Installation
Im Terminal:
```
npm install -g create-react-app
```
ausführen.

### Projektausführung
Im Projektordner, wo sich die package.json befindet, wird durch folgendes Kommando alle benötigten Abhängigkeiten heruntergeladen und installiert:
```
npm install
```

Das Projekt wird durch folgendes Kommando initialisiert:
```
npm start
```

Nun kann das Projekt unter der URL _http://localhost:3000/_ im Browser aufgerufen werden.

## Benutzeranleitung
## Tastenbelegung 
Als Midi-Controller kann jedes beliebiges Midi-Gerät verwendet werden welches "noteon" und "noteoff" events unterstützt. Wir verwendeten ein Microbrute Red zum testen.
### Tastatur und Mausrad
### Midi Controller
## Verwendete Technologien
- Web-Technologien
	 - [JavaScript](https://www.javascript.com/)
	 - HTML
	 - CSS
 - Frameworks
	 - [React.js](https://reactjs.org/)
	 - [Tone.js](https://tonejs.github.io/)
	 - [WebMidi.js](http://djipco.github.io/webmidi/latest/classes/WebMidi.html)
	 - [MidiWriterJS](https://www.npmjs.com/package/midi-writer-js)
 - Schnittstellen
	 - Musical Instrument Digital Interface (MIDI)
 - Bibliotheken
	 - [UIkit](https://getuikit.com/)

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

