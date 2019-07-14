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
Mit Y-Piano können Sie musikalische Kompositionen kreieren. 
Dazu stellt Y-Piano unterschiedliche Funktionen zur Verfügung:

Der Nutzer hat die Möglichkeit die Tasten eines virtuellen Pianos durch Mausklick oder Computertastaturinputs in Echtzeit zu spielen. Buttons über dem virtuellen Piano können genutzt werden, um zwischen den gewünschten Oktaven des Pianos zu wählen.
Darüber hinaus kann das virtuelle Piano durch ein MIDI-Gerät bedient werden. Dieses kann im Settingsmenü, welches durch Anklicken des Zahnrad Icons erscheint, mit der Anwendung verknüpft werden.
Im besagten Settingsmenü besteht außerdem die Möglichkeit durch einen Toggle-Switch die Anzeige der Computertastaturbelegung wahlweise anzuzeigen. 

Es ist möglich 4 individuelle Akkorde festzulegen. Hierzu müssen die jeweiligen Rechtecke anklicken, um dann in einem Overlay-Menü die gewünschten Akkorde auszuwählen.
Ihre Auswahl kann nun, durch Klicken des Play- Buttons, in einem Loop gleichzeitig abgespielt werden oder als Arpeggios nacheinander.

Drums können Ihren Loop ergänzen. Hierzu aktivieren Sie die Checkboxen ("Kit","Snare","Hi-Hat") der entsprechenden Drums.

Ein BPM-Regler ermöglicht es das Tempo zu beeinflussen, welcher durch das Mausrad bedienbar ist.

Sollten Sie eine zufällige Auswahl der eben bennanten Funktionen wünschen, klicken Sie den "Try It"-Button.

Schließlich können Sie Ihre Einstellungen als MIDI-Sequenz exportieren durch Klicken des "MIDI-Export"-Buttons oder Sie generieren einen Share Link mit Hilfe des "Share"-Buttons. 
## Tastenbelegung 
Als Midi-Controller kann jedes beliebiges Midi-Gerät verwendet werden welches "noteon" und "noteoff" events unterstützt. Wir verwendeten ein Microbrute Red zum testen.
### Tastatur und Mausrad
Mittels Mausrad kann der BPM-Regler auf das gewünschte Tempo eingestellt werden.
Die Tastatur ermöglicht es die schwarzen(0-9) und weißen Tasten(q,w,e,r,t,z,u,i,o,p,ü,a,s,d) des Pianos zu spielen.
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
	 - ermöglicht es die Tastaturbelegung anzuzeigen mittels eines Switch-Toggles
 - Share
	 - Generiert den Share-Link für die momentane Akkord- und BPM-Auswahl
	 - Verwaltet die dementsprechende UI

