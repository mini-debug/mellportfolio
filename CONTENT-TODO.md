# Rules for Claude Code

Read this whole file before editing anything in `src/data/` or any page copy.

- Only use facts under FACTS. Never invent a metric, date, award, title, tool, URL, or outcome.
- If something is missing, do not fill it in. Leave a `needs[]` note in `src/data/` and keep it listed under OPEN here.
- Write in first person, plain words, short sentences. No hype.
- Fix spelling and grammar in my notes, but never change the meaning. If a note is unclear, it is listed under UNCLEAR. Ask me, do not guess.
- When I answer an OPEN item: move it into FACTS, tick the box, then update `src/data/`.
- Do not publish my phone number anywhere on the site.
- Do not publish lab photos or diagrams until I confirm they are approved (see each project).
- Before finishing any task, list what you changed and what is still blocked.
- If a script generates a CONTENT TODO from `needs[]` arrays, treat this file as the hand-edited source from now on. Ask me before changing or removing that script.

## Status key

BLOCKED = no usable copy yet. PARTIAL = copy exists, gaps remain. READY = nothing missing.

## Work order

1. FM Radio, Electrospinning, Smart Frother (all BLOCKED)
2. Resolve CONFLICTS (bottom of file)
3. Cube, GURT, Trash Sorting Robot (PARTIAL)
4. Art archive, About

---

# BLOCKED PROJECTS

## FM Radio Receiver

Route: `/projects/pcb` | Status: PARTIAL | Tools: Altium, LTspice

### FACTS

- Built during IAP as part of a PCB design class at MIT (6.S089).
- I designed a custom audio amplifier, tested it in LTspice, then assembled it.
- Schematic and PCB layout covered an RF signal path and an audio amplifier stage.
- I simulated amplifier gain and filter behavior to choose capacitor and inductor values.
- It picked up local radio stations, mainly from the Prudential Tower.
- This was my first PCB design.
- Dates: IAP 2026 (January).
- I would change the routing of my original PCB. It is very messy right now. I need to add vias and arrange the parts on the board better.
- After the class ended we were required to assemble and debug a PCB from a grad student's design.
- (Slide deck) Custom FM radio PCB designed in Altium to explore RF systems, signal processing, and embedded hardware debugging.
- (Slide deck) We were unable to complete our PCBs in class (through Altium), so we used pre-made boards that required manual component soldering, applying solder paste for smaller parts and verifying each section with a voltmeter before proceeding to avoid damaging the board.
- The design in Altium is mine. I assembled the physical board, but that PCB was designed by the grad student. That board picked up the stations.

### OPEN

- [x] Which board actually received stations: the one I assembled (grad student's PCB design). Now in FACTS.
- [x] Routing changes: messy now, needs vias and a better layout. Now in FACTS.
- [ ] LTspice plots: lost. Maybe recreate later. Not needed for launch.
- Board photos: HEIC files ignored (not relevant). The site keeps the slide deck copies. Schematics are the original Altium exports; the layout render is from the slide deck.
- [x] Dates: IAP 2026 (January). Now in FACTS.

## Electrospinning Robotics

Route: `/projects/electrospinning` | Status: READY

### FACTS

- Group: Critical Matter Group at MIT Media Lab.
- Supervisors: Behnaz Farahi and Yuxiang Cheng.
- I built the end effector (designed in Onshape and Fusion 360). I estimate it cut electric field arcing by about 10%. The number comes from my own comparisons of different needle lengths and 3D printed plastic covers, not a formal measurement.
- I helped develop the concept for the new syringe pump.
- I built the syringe pump system with an ESP32 and a NEMA 17 stepper motor for automated polymer dispensing.
- I modeled the electric field of the system in Python (NumPy, SciPy, matplotlib) to guide high voltage needle placement.
- Dates on resume: Jun 2026 to Sep 2026.
- (Slide deck) It is a UROP.
- (Slide deck) The system creates thin fibers by dispensing liquid through a needle connected to a 19 kV wire, autonomously, with a UR20 and an xArm 6. (19 kV confirmed; the +15 kV on the lab figure is not used.)
- (Slide deck) Slides also show an experimental electrospinning table design (single nozzle and cap drawings, PLA) and the electronic design of the liquid dispensing pump.
- I designed the experimental test table parts: the single nozzle holder and the cap (PLA).
- The project is open source. Repo: https://github.com/Critical-Matter-MIT-Media-Lab/Custom-3D-Electrospinning (public, checked Oct 17).
- I built the manual breadboard controller concept myself.
- Photos and drawings from the "Pics electrospinning" folder are OK to publish. My supervisor does not mind (my answer, Oct 17). The lab setup figure is shown cropped to the syringe firmware schematic only.
- The breadboard controller with the LCD was part of an early idea to make the pump a manual device. The project moved to an app that monitors the syringe instead. The app is open source too, and a grad student made it, not me.

### OPEN

- [x] One plain sentence on what the whole system does (answered by slide deck, now in FACTS)
- [x] Python libraries: NumPy, SciPy, matplotlib. Now in FACTS.
- [x] 10% arcing: my estimate from my own comparisons. Now in FACTS.
- [x] Supervisor OK for the photos and drawings. Now in FACTS.
- [x] Test table nozzle and cap are my design. Now in FACTS.
- [x] Breadboard photo: early manual device idea. Now in FACTS.
- [x] Open source repo link. Now in FACTS.
- [x] I built the manual breadboard controller concept. Now in FACTS.

## Moon Frother

Route: `/projects/smart-frother` | Status: READY | Tools: ESP32, C++, I2C

### FACTS

- Frother that reuses an existing floating moon PCB template, so a moon floats while a drink is frothed.
- ESP32 is the main controller.
- Two DC motors spin gears that adjust based on the cup height.
- Resume also lists: temperature regulation, motor driving, TFT display, potentiometer input.
- Parts: SLS nylon for the plate and gears. Aluminum for the drink pass-through at the bottom of the plate. Acrylic for the electronics enclosure. Resin for the cabinets (slightly tight tolerance). Resume also says laser cut metal and Formlabs SLA/SLS.
- First version was a two day team build at a Formlabs hackathon. Teammates: Dana, Ryan, Jason, and Detch. I was architecture lead and made sure all parts worked together.
- I now work on it alone.
- Redesign goal: make the morning drink process autonomous.
- I want to control it with an app. The app is not built yet, and I still need to figure out the new electronics.
- Site title: Moon Frother. (Route stays `/projects/smart-frother` so old links keep working.)
- (Slide deck) Slide title: Moon Frother.

### OPEN

- [x] "Smart": planned app control, not built yet. Now in FACTS.
- [x] Event: Formlabs hackathon. Now in FACTS.
- [x] Images: the slide deck copies (slides 8-9) are fine. Keep them.
- [x] Title: Moon Frother. Now in FACTS.

### UNCLEAR

- [x] Fourth teammate: Detch (confirmed). Now in FACTS.
- [x] Same version: the temperature regulation, TFT display, potentiometer input, laser cut metal and Formlabs SLA/SLS belong with the moon and cup height version. Now on the site.

---

# PARTIAL PROJECTS

## The CUBE

Route: `/projects/cube` | Status: PARTIAL

### FACTS

- Personal project, 24 inches by 24 inches.
- Designed in Onshape, built from plywood.
- Structure cut on a CNC machine.
- A Universal Laser Systems laser cutter was used for the rest.
- It is a versatile puzzle piece made of wood. You can set it up as a table, a shelf, or a bench. No metal fittings.

### OPEN

- [x] What it is for or what it does. Now in FACTS.
- [ ] Year made
- [x] Photos: the ones from the original site are already on the page.

### UNCLEAR

- "stryphone" = styrofoam (the laser cut study model, already on the site). "protening" = printing, per my answer on Oct 18, with a question mark. Not on the site yet: what was printed?

## GURT

Route: `/projects/gurt` | Status: PARTIAL

### FACTS

- Repo: https://github.com/mini-debug/TARS-Summer-2025 (public, checked Oct 18). Linked on the page.
- Formal name: TARS, or the Walking Robot. GURT was our team's name for it.
- Hardware: Arduino Nano, two servos for the legs, microphone, Raspberry Pi 4B, TFT display.
- Keep the old site's description too (small team, voice-driven, simulated internal layout), combined with the facts above.
- On resume as "Walking Robot": two layer control system with coordinated servo control and OpenAI API conversation. Python. Jun 2025 to Jul 2025.

### OPEN

- [x] Repo is public and the TARS name is intentional. Now in FACTS.

## Trash Sorting Robot

Route: `/projects/trash-sorting-robot` | Status: PARTIAL | Shown only in the "Also built" strip

### FACTS

- Made in 2023. The original codebase was lost.
- Keep the old site's story (Toby, Terresa, Tony, the failed shovel, OpenCV and YOLO).
- Resume: autonomous recycling robot, Raspberry Pi 3B+, supervised machine learning, Tufts Engineering Design Lab, Jul 2023.

### OPEN

- [x] URL: https://github.com/mini-debug/Draft-trash-robot- (public, checked Oct 18). Linked on the page.

---

# OTHER SECTIONS

## Art archive

### FACTS

- Titles: La Muerte tiene Vida (the old site said "La Muerte Vivio"), I Spy With My Little Eye, Dragon (a painting), Water Monster (a mask).
- No medium on the site. Not important.

### OPEN

- [x] Water Monster: keep it. It is the mask. Now in FACTS.
- [ ] Dimensions for each piece (optional)
- [x] Years: I Spy With My Little Eye 2022, Dragon 2023, Water Monster 2024, La Muerte tiene Vida 2025. Now on the site.
- [ ] Any more pieces to add (only four carried over)

## About

### FACTS

- Resume PDF on the About page: `public/files/Mellanie-Rodriguez-Resume.pdf`. It is a copy of my resume with the phone number removed. If I update my resume, the phone number has to be removed again before it goes on the site.

- Name: Mellanie Rodriguez. Email: mxrodrig@mit.edu. Site: mini-debug.github.io/mellportfolio. GitHub: github.com/mini-debug
- MIT, B.S. Electrical Engineering and Computer Science, minor in Design. Expected May 2029.
- Coursework: 6.200, 6.1903, 6.1200, 8.02, 8.01, 18.02, 6.S089
- Skills. Languages: Python, C/C++. Tools: Altium, LTspice, SolidWorks, Fusion 360, Onshape, Git, PlatformIO. Hardware: ESP32, Arduino, Raspberry Pi, I2C.
- Class of 2029 (slide deck: MIT'29).
- Honors: Amazon Future Engineer Scholar, Microsoft Disability Scholar, U.S. Presidential Scholar Nominee, 2nd Place MakeMIT, 1st Place Design Museum Everywhere

### TIMELINE (newest first)

- Oct 2026: Incoming Firmware Undergraduate Intern, Auto-ID Labs at MIT
- Jun 2026 to Sep 2026: Mechatronics Engineering Researcher, MIT Media Lab
- Apr 2025 to May 2025: Manufacturing Intern, Inkbit. Reverse engineered damaged aircraft parts through CAD reconstruction and ran CFD to improve the design. Keep the old site's description too (printer calibration, resin printing UX, TEPU30A and Titan Tough Epoxy 85 prints, VR headset concepts).
- Jun 2024 to Aug 2024: Mechanical Engineering Intern, MIT Lincoln Laboratory. Designed a self playing xylophone in SolidWorks that plays "Mary Had a Little Lamb". Used Young's modulus and density to choose Aluminum 6061 and predict each bar's resonant frequency. Tuned bar length and thickness to hit target pitches. Selected as one of three high-school students from roughly 250 applicants.
- Jul 2023: Robotics Intern, Tufts Engineering Design Lab

### ACTIVITIES

- Project Mentor, MIT Edgerton Center and Metropolis (Dec 2025 to present). Mentor 100+ students per semester at two makerspaces. Teach power supplies, laser cutting, FDM and SLA basics, and iterating on projects.
- Member, SHPE (Sep 2025 to present). Attend chapter events and volunteer in STEM classes for 20+ Hispanic students in Boston Public Schools.

### OPEN

- [x] Confirm class of 2029 on the homepage (slide deck says MIT'29, now in FACTS)

---

# CONFLICTS

The original CONFLICTS section was not in the pasted file. Rebuilt from your answers and from differences between FACTS and the current site.

## Resolved

- [x] Project Mentor dates: Dec 2025 to present.
- [x] Inkbit dates: Apr 2025 to May 2025. Lincoln Laboratory dates: Jun 2024 to Aug 2024. Both now shown on the About page.
- [x] Lincoln Laboratory role: Mechanical Engineering Intern. Selection claim (one of three from about 250) is true.
- [x] Inkbit: combine both descriptions. Role: Manufacturing Intern.
- [x] GURT: combine both. The TFT display is real; it was left out of the new notes by mistake.
- [x] Trash Sorting Robot: keep the story. Use Raspberry Pi 3B+ and supervised machine learning from FACTS.
- [x] CUBE: yes, a table, shelf, or bench. No metal fittings. It is a versatile wooden puzzle piece.
- [x] FM Radio dates: IAP 2026 (January).

## Open

- [x] Lincoln Laboratory project: both. The vibration simulator and the xylophone were both part of the internship. Both are on the About page now. (Original question: the site describes a vibration simulator (FEA, Hooke's Law, Young's Modulus). FACTS describe a self playing xylophone. Which is right, or were both part of the internship? The two remaining photos are captioned as the vibration rig.)

---

# Decisions already made (do not redo)

- `crot1.jpg`, `el3.jpg`, `skectchp5.jpg` deleted
- Inkbit and MIT Lincoln Laboratory moved to the About timeline
- "Miscellaneous Projects" cut
- Trash Sorting Robot demoted to the "Also built" strip on /projects
- Lincoln Laboratory "Post-test inspection" photo removed from the About page
- MIT Media Lab added to the About experience timeline, linking to the Electrospinning project page
- Self-Balancing Robot and WORMS 2026 (from the slide deck) left off the site: half finished
