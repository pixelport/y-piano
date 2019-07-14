#  Y-Piano
Im Rahmen des Moduls "Audio- und Videotechnik" ist [Y-Piano](https://y-piano.netlify.com/) entstanden. Ein älteres Design kann [hier](https://y-piano-blue.netlify.com/) ausprobiert werden.

## Inhalt
1. [Idee](#idee)
2. [Installationsanleitung](#installationsanleitung)
3. [Benutzeranleitung](#benutzeranleitung)
4. [Tastenbelegung ](#tastenbelegung )
5. [Verwendeten Technologien](#verwendete-technologien)
6. [Technische Projektbeschreibung](#technische-projektbeschreibung)

## Idee
Viele Songs bauen auf dem gleichen Schema auf. Meist besteht der typische [Pop-Song](https://www.youtube.com/watch?v=5pidokakU4I) aus vier sich wiederholende Akkorde mit einer Melodie. 
Die richtigen 4-Akorde zu finden ist ein wichtiger Teil des Kompositionsprozesses. Unsere Idee war es ein Tool zu entwickeln um bei diesem Prozess zu helfen.

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
Mit Y-Piano können musikalische Kompositionen kreiert werden. 
Dazu stellt Y-Piano unterschiedliche Funktionen zur Verfügung:

Der Nutzer hat die Möglichkeit die Tasten eines virtuellen Pianos durch Mausklick oder Computertastaturinputs in Echtzeit zu spielen. Die Schaltflächen über dem virtuellen Piano können genutzt werden, um zwischen den gewünschten Oktaven des Pianos zu wählen.
Darüber hinaus kann das virtuelle Piano durch ein MIDI-Gerät bedient werden. Dieses kann im Settingsmenü, welches durch Anklicken des Zahnradsymbols erscheint, mit der Anwendung verknüpft werden.
Im besagten Settingsmenü besteht außerdem die Möglichkeit durch einen Schalter die Anzeige der Computertastaturbelegung wahlweise anzuzeigen. 

Es ist möglich vier individuelle Akkorde festzulegen. Hierzu müssen die jeweiligen Rechtecke angeklickt werden, um dann in einem Overlay-Menü die gewünschten Akkorde auszuwählen.
Die durch den Benutzer getroffene Auswahl kann nun, durch Klicken der Play-Schaltfläche, in einer Schleife gleichzeitig abgespielt werden oder als Arpeggios nacheinander.

Drums können in der Schleife ergänzt werden. Hierzu aktivieren Sie die Checkboxen ("Kit","Snare","Hi-Hat") der entsprechenden Drums.

Ein BPM-Regler ermöglicht es das Tempo zu beeinflussen, welcher durch das Mausrad bedienbar ist.

Sollten Sie eine zufällige Auswahl der eben bennanten Funktionen wünschen, klicken Sie den "Random"-Button.

Schließlich können Sie Ihre Einstellungen als MIDI-Sequenz exportieren indem Sie die "MIDI-Export"-Schaltfläche betätigen, oder Sie generieren einen Share-Link mit Hilfe des "Share"-Buttons. 
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
	 - Wählt zufällig die Akkorde, BPM, Drums und den Arpeggio aus.
	 - Verwaltet die dementsprechende UI
 - Settings
	 - Auswahlmöglichkeit für den MIDI-Controller
	 - Verwaltet die Einstellungen-UI 
	 - ermöglicht es die Tastaturbelegung anzuzeigen mittels eines Switch-Toggles
 - Share
	 - Generiert den Share-Link für die momentane Akkord- und BPM-Auswahl
	 - Verwaltet die dementsprechende UI

