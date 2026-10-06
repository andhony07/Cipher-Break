# 🎮 CIPHERBREAK

> **CRACK THE CODE. BEAT THE CLOCK. BREAK THE SYSTEM.**

CIPHERBREAK is a browser-based cyber-themed puzzle game where you enter a fictional security terminal and attempt to break through a series of digital locks.

Solve puzzles, manage your lives, use hints wisely, and complete the final system override before the terminal locks you out.

---

## ⚡ GAME STATUS

```text
╔══════════════════════════════════════════╗
║             CIPHERBREAK                  ║
╠══════════════════════════════════════════╣
║  🔐 SECURITY SYSTEM       ONLINE         ║
║  🧩 PUZZLES              8 LEVELS        ║
║  ❤️ LIVES                 3              ║
║  ⏱️ TIME                  LIMITED         ║
║  💀 FAILURE              LOCKOUT         ║
╚══════════════════════════════════════════╝

🕹️ GAMEPLAY
You are inside a fictional cyber-security terminal.
Your objective:
Break through all 8 security levels and complete the final system override.
Every level introduces a different challenge.
🔓 Levels
Level	Challenge
01	🔐 Caesar Cipher
02	💻 Binary Decoder
03	🔢 Number Pattern
04	🧠 Logic Deduction
05	#️⃣ Hash Matching
06	🚪 Port Sequence
07	🧠 Memory Challenge
08	☠️ Final Breach


❤️ LIVES
You start with:
❤️ ❤️ ❤️

Wrong answers cost a life.
Running out of lives results in:
╔══════════════════════════╗
║       SYSTEM LOCKED      ║
║                          ║
║   ACCESS DENIED          ║
║   CONNECTION TERMINATED  ║
╚══════════════════════════╝

⏱️ THE CLOCK IS TICKING
Every level has its own time limit.
When the timer reaches zero:
TIME EXPIRED
     ↓
LIFE LOST
     ↓
TIMER RESET

Lose all your lives and the terminal locks you out.
💡 HINT SYSTEM
Stuck?
Use a hint.
But there is a price.
HINT USED
    ↓
-50 SCORE

Use hints strategically if you're chasing a high score.
🏆 SCORING
Your score is based on:
- ⚡ Speed
- 🔓 Successful level completion
- 💡 Hint usage
- ❤️ Remaining lives
The faster you solve a level, the more points you earn.
🎮 CONTROLS
Keyboard
Key	Action
ENTER	Submit answer
1 - 4	Select choices
TAB	Navigate controls
SHIFT + TAB	Navigate backwards


Mouse/touch controls are also supported through the UI.
🖥️ INTERFACE
CIPHERBREAK uses a dark terminal-inspired interface featuring:
┌─────────────────────────────────────────┐
│ CIPHERBREAK                             │
├─────────────────────────────────────────┤
│ LEVEL        SCORE        TIME           │
│ 03           850          42s            │
├─────────────────────────────────────────┤
│                                         │
│ > SECURITY CHALLENGE DETECTED            │
│                                         │
│       2, 6, 12, 20, 30, ?                │
│                                         │
│ > ENTER RESPONSE                         │
│                                         │
│ [____________________]                   │
│                                         │
│       [ SUBMIT ]   [ HINT ]              │
│                                         │
└─────────────────────────────────────────┘

🧩 PUZZLE TYPES
🔐 Caesar Cipher
Decode encrypted text by discovering the character shift.
Example:
KHOOR

↓
HELLO

💻 Binary Decoder
Convert binary ASCII values into readable text.
01001111 01010000 01000101 01001110

↓
OPEN

🔢 Pattern Recognition
Find the missing value.
2 → 6 → 12 → 20 → 30 → ?

🧠 Logic
Determine which statement or server is inconsistent with the evidence.
#️⃣ Hash Matching
Match strings against a deterministic checksum.
🚪 Port Sequence
Use the provided clues to determine the correct sequence.
🧠 Memory Challenge
Memorize a sequence before it disappears.
Then reproduce it correctly.
☠️ FINAL BREACH
The final level combines multiple puzzle mechanics.
Three stages.
One objective.
[ CAESAR ]
    ↓
[ BINARY ]
    ↓
[ PATTERN ]
    ↓
[ SYSTEM OVERRIDE ]

🛠️ TECH STACK
HTML5
CSS3
JavaScript

No backend.
No database.
No external API.
No AI services.
No frameworks.
CIPHERBREAK is intentionally lightweight and runs directly in the browser.
📁 PROJECT STRUCTURE
CipherBreak/
│
├── index.html      # Game interface
├── style.css       # Visual design
├── game.js         # Game logic & puzzles
│
└── assets/         # Optional game assets

🚀 RUN THE GAME
No server is required.
Clone the repository:
git clone https://github.com/YOUR_USERNAME/CipherBreak.git

Enter the project:
cd CipherBreak

Then open:
index.html

in your browser.
Windows
You can also run:
start index.html

🎯 OBJECTIVE
Your mission is simple:
        FIND THE CODE
              ↓
        BREAK THE LOCK
              ↓
        SURVIVE THE CLOCK
              ↓
        REACH LEVEL 8
              ↓
       OVERRIDE THE SYSTEM

🏴‍☠️ GAME OVER
Three failed attempts.
One locked terminal.
████████████████████████████

       ACCESS DENIED

     SYSTEM LOCKED

████████████████████████████

Try again.
🏆 VICTORY
Complete all eight levels:
╔════════════════════════════════╗
║                                ║
║        SYSTEM OVERRIDE         ║
║             COMPLETE           ║
║                                ║
║       ALL LOCKS BROKEN         ║
║                                ║
║          YOU'RE IN.            ║
║                                ║
╚════════════════════════════════╝

🔒 SECURITY NOTE
CIPHERBREAK is a fictional cyber-themed game.
It does not perform real hacking, network attacks, system exploitation, port scanning, credential attacks, or unauthorized access.
All puzzles are local and deterministic.
🧪 PROJECT GOALS
CIPHERBREAK was created as a small experimental game project to explore:
- Browser game development
- JavaScript game-state management
- Interactive UI design
- Timer-based gameplay
- Puzzle mechanics
- Keyboard interaction
- Score systems
- Game progression
- Responsive web design
📌 ROADMAP
Future versions may include:
- [ ] 🔊 Sound effects
- [ ] 🎵 Background music
- [ ] 🏆 High-score system
- [ ] 🎲 Randomized puzzles
- [ ] 🌑 More visual effects
- [ ] ⚡ Difficulty modes
- [ ] 🧩 More puzzle types
- [ ] 👑 Endless mode
- [ ] 🏅 Achievements
- [ ] 📱 Improved mobile controls
👨‍💻 AUTHOR
Andhony
Built as an experimental browser game project.
⚡ CIPHERBREAK
      ▄████████████████████▄
     █                      █
     █    C I P H E R       █
     █       B R E A K      █
     █                      █
      ▀████████████████████▀

        CRACK THE SYSTEM.
        BEAT THE CLOCK.
        BREAK THE CODE.


One correction I'd make before committing: **don't claim keyboard controls that the current JavaScript doesn't actually implement**. The current code handles `1–4` for choices and normal form submission, but `ENTER` is only naturally handled when the input form has focus. So the README above is slightly generous there.

If you want the README to be **strictly accurate to the current implementation**, remove the `ENTER`/`TAB` claims and just say mouse/touch + normal keyboard input.
