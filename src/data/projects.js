/**
 * PROJECT DATA
 * ---------------------------------------------------------------------------
 * Single source of truth for every project. Pages render from this file — no
 * project content lives in JSX.
 *
 * CONTENT RULES
 *  - CONTENT-TODO.md is the hand-edited source of facts. Read its rules first.
 *  - Nothing has been invented. Where information is missing it is either
 *    `null` or listed in `needs[]`, and the UI surfaces it rather than hiding it.
 *  - `status: 'placeholder'` renders a clearly-marked stub page.
 *
 * SCHEMA
 *  id            url slug (/projects/:id)
 *  title         display name
 *  category      short discipline string, shown on the card
 *  tagline       one line. Cards show this and nothing longer.
 *  technologies  chips on the card + "At a glance"
 *  hero          key into media.json
 *  gallery       [{ media | video, caption, alt }]
 *  summary       1–2 sentences, project page only
 *  glance        [{ label, value }] — "At a glance" table
 *  sections      [{ heading, body[] }] — the case study
 *  links         [{ label, href }]
 *  featured      appears in the main grid
 *  status        'complete' | 'placeholder'
 *  needs         outstanding information, rendered as a visible TODO in dev
 */

export const projects = [
  /* ---------------------------------------------------------------- 01 --- */
  {
    id: 'pcb',
    title: 'FM Radio Receiver',
    category: 'Electronics · PCB Design',
    tagline: 'My first PCB design, made in a PCB design class at MIT.',
    technologies: ['Altium', 'LTspice'],
    hero: 'fm-board-front',
    gallery: [
      { media: 'fm-layout', caption: 'My PCB layout in Altium.', alt: '3D render of the FM radio PCB layout in Altium' },
      { media: 'fm-top-level', caption: 'Top-level schematic of my design.', alt: 'Top-level block schematic of the FM radio' },
      { media: 'fm-antenna-sch', caption: 'Antenna schematic sheet.', alt: 'Schematic sheet for the antenna input' },
      { media: 'fm-lna-sch', caption: 'Low noise amplifier schematic sheet.', alt: 'Schematic sheet for the low noise amplifier' },
      { media: 'fm-receiver-sch', caption: 'FM receiver schematic sheet.', alt: 'Schematic sheet for the FM receiver chip' },
      { media: 'fm-micro-sch', caption: 'Microcontroller schematic sheet.', alt: 'Schematic sheet for the ESP32 microcontroller' },
      { media: 'fm-audio-amps-sch', caption: 'Audio amplifier schematic sheet.', alt: 'Schematic sheet for the audio amplifiers' },
      { media: 'fm-board-front', caption: 'The board I assembled. The PCB itself is a grad student’s design.', alt: 'Assembled FM radio board with the display reading 87.0' },
      { media: 'fm-board-back', caption: 'Back of the assembled board.', alt: 'Back of the assembled FM radio board' },
    ],
    summary:
      'I designed a custom FM radio PCB in Altium during IAP 2026, as part of 6.S089, a PCB design class at MIT. I wanted to explore RF systems, signal processing, and embedded hardware debugging. It was my first PCB design.',
    glance: [
      { label: 'Class', value: '6.S089, MIT' },
      { label: 'Dates', value: 'Jan 2026 – Present' },
      { label: 'Tools', value: 'Altium, LTspice' },
      { label: 'Board', value: 'RF signal path, audio amplifier stage' },
    ],
    sections: [
      {
        heading: 'Design',
        body: [
          'My schematic and PCB layout covered an RF signal path and an audio amplifier stage.',
          'I designed a custom audio amplifier. I tested it in LTspice, then assembled it.',
          'I simulated amplifier gain and filter behavior to choose capacitor and inductor values.',
        ],
      },
      {
        heading: 'Building it',
        body: [
          'We were unable to complete our own PCBs in class. After the class ended, we were required to assemble and debug a pre-made PCB from a grad student’s design.',
          'I soldered the components by hand. We used solder paste for the smaller parts. We checked each section with a voltmeter before moving on, so we would not damage the board.',
          'The board I assembled picked up local radio stations, mainly from the Prudential Tower.',
        ],
      },
      {
        heading: 'Next time',
        body: [
          'I would redo the routing of my original PCB. Right now it is very messy. I need to add vias and arrange the parts on the board better.',
        ],
      },
    ],
    links: [],
    featured: true,
    status: 'complete',
    needs: [
      'LTspice plots (lost; recreate later if you want them on the site)',
    ],
  },

  /* ---------------------------------------------------------------- 02 --- */
  {
    id: 'electrospinning',
    title: 'Electrospinning Robotics',
    category: 'UROP · Robotics · Research',
    tagline: 'Making thin fibers with a 19 kV needle and two robot arms.',
    technologies: ['UR20', 'xArm 6', 'Onshape', 'Fusion 360', 'ESP32', 'NEMA 17 stepper', 'Python', 'NumPy', 'SciPy', 'matplotlib'],
    hero: 'es-spinning',
    gallery: [
      { media: 'es-spinning', caption: 'Electrospinning onto a 3D printed scaffold.', alt: 'Needle tip on the left, with fibers webbing across a spiky 3D printed scaffold on the right' },
      { media: 'es-end-effector-drawing', caption: 'My drawing of the end effector.', alt: 'Dimensioned CAD drawing of the tapered end effector and its round base' },
      { media: 'es-end-effector-open', caption: 'The printed end effector, opened to show the needle channel.', alt: 'Printed end effector split in half, with the metal needle and its hub in the channel' },
      { media: 'es-pump-schematic', caption: 'Syringe pump wiring: NEMA 17 stepper, STSPIN220 driver, XIAO ESP32-C3, and a 5 V supply.', alt: 'Wiring diagram linking a NEMA 17 stepper, an STSPIN220 driver board, a XIAO ESP32-C3 and a 5 V power bus' },
      { media: 'es-syringe-pump', caption: 'The syringe pump, in front of the high voltage supply.', alt: 'Lead screw syringe pump on a table, with a high voltage power supply behind it' },
      { media: 'es-pump-controller', caption: 'My early concept: a manual pump controller with an LCD showing direction and rate. The project moved to an app that monitors the syringe instead.', alt: 'Breadboard with a microcontroller and an LCD reading Dir:CW R:1.0 PAUSED' },
      { media: 'es-table-nozzle', caption: 'The single nozzle holder I designed for the test table.', alt: 'Yellow printed nozzle holder on an aluminum frame, with tubing, fittings and a needle' },
      { media: 'es-table-nozzle-cap', caption: 'The nozzle holder with its cap on.', alt: 'Nozzle holder with a black printed cap, mounted on the aluminum frame' },
      { media: 'es-table-render', caption: 'My CAD render of the nozzle holder and cap.', alt: 'CAD render of the nozzle holder with the cap beside it' },
      { media: 'es-nozzle-drawing', caption: 'My drawing of the single nozzle for the test table. PLA.', alt: 'Dimensioned CAD drawing of the single nozzle holder' },
      { media: 'es-cap-drawing', caption: 'My drawing of the cap for the test table. PLA.', alt: 'Dimensioned CAD drawing of the nozzle holder cap' },
    ],
    summary:
      'The system creates thin fibers by dispensing liquid through a needle connected to a 19 kV wire. It runs autonomously with a UR20 and an xArm 6. For my UROP in the Critical Matter Group at the MIT Media Lab, I built the end effector and the syringe pump system, and I modeled the electric field.',
    glance: [
      { label: 'Group', value: 'Critical Matter Group, MIT Media Lab' },
      { label: 'Supervisors', value: 'Behnaz Farahi, Yuxiang Cheng' },
      { label: 'Dates', value: 'Jun 2026 – Sep 2026' },
      { label: 'Robots', value: 'UR20, xArm 6' },
      { label: 'CAD', value: 'Onshape, Fusion 360' },
      { label: 'Hardware', value: 'ESP32, NEMA 17 stepper motor' },
      { label: 'Modeling', value: 'Python, NumPy, SciPy, matplotlib' },
    ],
    sections: [
      {
        heading: 'End effector',
        body: [
          'I designed the robotic electrospinning end effector in Onshape and Fusion 360, and built it.',
          'I compared different needle lengths and plastic covers that I 3D printed. From those comparisons, I estimate it cut electric field arcing by about 10%.',
        ],
      },
      {
        heading: 'Syringe pump',
        body: [
          'I helped develop the concept for the new syringe pump.',
          'I built the fluid delivery system with an ESP32 and a NEMA 17 stepper motor, for automated polymer dispensing.',
          'I built an early concept that made the pump a manual device, with a breadboard controller and an LCD. The project moved to an app that monitors the syringe instead. A grad student made the app.',
        ],
      },
      {
        heading: 'Test table',
        body: [
          'I designed a single nozzle holder and a cap for an experimental electrospinning test table.',
          'Both parts are printed in PLA.',
        ],
      },
      {
        heading: 'Electric field model',
        body: [
          'I wrote Python tools to analyze the electric field distribution of the system. I used NumPy, SciPy, and matplotlib.',
          'The analysis guided where to place the high voltage needle.',
        ],
      },
      {
        heading: 'Open source',
        body: ['The project is open source. The code and files are on the Critical Matter Group GitHub.'],
      },
    ],
    links: [
      { label: 'GitHub repo', href: 'https://github.com/Critical-Matter-MIT-Media-Lab/Custom-3D-Electrospinning' },
    ],
    featured: true,
    status: 'complete',
    needs: [
    ],
  },

  /* ---------------------------------------------------------------- 03 --- */
  {
    id: 'smart-frother',
    title: 'Smart Beverage Frother',
    category: 'Embedded · Product Design',
    tagline: 'A frother with a moon that floats while your drink is frothed.',
    technologies: ['ESP32', 'C++', 'I2C'],
    hero: 'frother-prototype',
    gallery: [
      { media: 'frother-cad', caption: 'CAD.', alt: 'CAD model of the frother with the moon on top' },
      { media: 'frother-moon-test', caption: 'Testing the floating moon on the breadboard.', alt: 'Breadboard electronics next to the moon above its base' },
      { media: 'frother-breadboard', caption: 'Breadboard electronics.', alt: 'Top view of the frother breadboard wiring' },
      { media: 'frother-wiring', caption: 'Wiring inside the enclosure.', alt: 'Wiring inside the frother enclosure under red light' },
      { media: 'frother-prototype', caption: 'The prototype.', alt: 'The frother prototype with the moon on top' },
    ],
    summary:
      'A drink frother with an ESP32 as the main controller. It reuses an existing floating moon PCB template, so a moon floats while a drink is frothed.',
    glance: [
      { label: 'Controller', value: 'ESP32' },
      { label: 'Dates', value: 'Dec 2025 – Present' },
      { label: 'Code', value: 'C++, I2C' },
      { label: 'Materials', value: 'SLS nylon, aluminum, acrylic, resin, laser cut metal' },
      { label: 'Role', value: 'Architecture lead (first version)' },
      { label: 'Event', value: 'Formlabs hackathon (first version)' },
    ],
    sections: [
      {
        heading: 'How it works',
        body: [
          'I call it the Moon Frother. I reused an existing floating moon PCB template, so a moon floats while a drink is frothed.',
          'An ESP32 is the main controller. Two DC motors spin gears that adjust based on the cup height.',
          'I built the ESP32 control for temperature regulation and motor driving, with a TFT display and potentiometer input.',
        ],
      },
      {
        heading: 'Materials',
        body: [
          'The plate and gears are SLS nylon. The drink passes through aluminum at the bottom of the plate.',
          'The electronics enclosure is acrylic. The cabinets are resin, and their tolerance was slightly tight.',
          'I designed custom parts for Formlabs SLA and SLS printing, and for laser cut metal.',
        ],
      },
      {
        heading: 'Team and redesign',
        body: [
          'The first version was a two day team build at a Formlabs hackathon, with Dana, Ryan, Jason, and Detch. I was the architecture lead, and I made sure all the parts worked together.',
          'I now work on it alone. The goal of the redesign is to make the morning drink process autonomous.',
          'I want to control it from an app. I have not built the app yet, and I still need to work out the new electronics.',
        ],
      },
    ],
    links: [],
    featured: true,
    status: 'complete',
    needs: [
    ],
  },

  /* ---------------------------------------------------------------- 04 --- */
  {
    id: 'cube',
    title: 'The CUBE',
    category: 'Product Design · Fabrication',
    tagline: 'A wooden puzzle piece that sets up as a table, a shelf, or a bench.',
    technologies: ['Onshape', 'Plywood', 'CNC', 'Laser cutting'],
    hero: 'maincube',
    gallery: [
      { media: 'sketchchair', caption: 'First prototype, sketched.', alt: 'Hand sketch of the modular furniture concept' },
      { media: 'chairprot', caption: 'Styrofoam laser-cut study model.', alt: 'Laser-cut styrofoam prototype of the CUBE' },
      { media: 'genlayout', caption: 'General layout.', alt: 'Layout drawing showing the CUBE configurations' },
      { media: 'maincube', caption: 'The finished piece.', alt: 'The completed CUBE furniture prototype' },
    ],
    summary:
      'A personal project. The CUBE is a versatile puzzle piece made of plywood, 24 by 24 inches. You can set it up as a table, a shelf, or a bench.',
    glance: [
      { label: 'Type', value: 'Personal project' },
      { label: 'Size', value: '24 × 24 in' },
      { label: 'CAD', value: 'Onshape' },
      { label: 'Material', value: 'Plywood' },
      { label: 'Fabrication', value: 'CNC machine, Universal Laser Systems laser cutter' },
    ],
    sections: [
      {
        heading: 'The idea',
        body: [
          'The CUBE is one wooden piece that works like a puzzle. How you set it up decides what it is: a table, a shelf, or a bench.',
        ],
      },
      {
        heading: 'Design and fabrication',
        body: [
          'I designed it in Onshape and built it from plywood.',
          'The structure was cut on a CNC machine. I used a Universal Laser Systems laser cutter for the rest.',
          'Before the real build, I made a laser-cut styrofoam study model.',
        ],
      },
    ],
    links: [],
    featured: true,
    status: 'complete',
    needs: [
      'Year made',
      'Confirm "stryphone" (styrofoam?) and "protening" in your notes: what was made with each?',
    ],
  },

  /* ---------------------------------------------------------------- 05 --- */
  {
    id: 'gurt',
    title: 'Walking Robot',
    category: 'Robotics · AI · Embedded',
    tagline: 'A walking, voice-driven assistant robot.',
    technologies: ['Raspberry Pi 4B', 'Arduino Nano', 'OpenAI API', 'Servos', 'TFT display', 'Python'],
    hero: 'gurt-poster',
    gallery: [
      { media: 'innernan0', caption: 'Simulation.', alt: 'Simulation view of the TARS assembly' },
      { media: 'inner', caption: 'Servo motor layout — excludes the Raspberry Pi and TFT.', alt: 'Internal servo motor arrangement' },
      { media: 'GURT', caption: 'Controller tests.', alt: 'TARS during controller testing' },
      { video: '/media/gurt-720.mp4', poster: 'gurt-poster', caption: 'TARS in action — voice demo.' },
    ],
    summary:
      'A walking personal assistant robot. It has a two-layer control system with coordinated servo control and conversation through the OpenAI API.',
    glance: [
      { label: 'Compute', value: 'Raspberry Pi 4B, Arduino Nano' },
      { label: 'Language model', value: 'OpenAI API' },
      { label: 'Actuation', value: 'Two servos for the legs' },
      { label: 'Input', value: 'Microphone' },
      { label: 'Display', value: 'TFT' },
      { label: 'Code', value: 'Python' },
      { label: 'Team', value: 'Small team' },
      { label: 'Built', value: 'Jun 2025 – Jul 2025' },
    ],
    sections: [
      {
        heading: 'The idea',
        body: [
          'I wanted to explore what a personal assistant feels like when it has a body.',
          'Its formal name is TARS. Our team called it GURT.',
          'I built it with a small team in June and July 2025.',
        ],
      },
      {
        heading: 'Hardware',
        body: [
          'A Raspberry Pi 4B and an Arduino Nano run the robot. Two servos move the legs.',
          'A microphone takes in speech, and a TFT display gives TARS a face.',
          'We simulated the internal layout before assembly, to work out how to fit the servos around the Pi and the display.',
        ],
      },
      {
        heading: 'Software',
        body: [
          'The code is in Python. I built a two-layer control system with coordinated servo control and conversation through the OpenAI API.',
        ],
      },
    ],
    links: [
      { label: 'GitHub repo', href: 'https://github.com/mini-debug/TARS-Summer-2025' },
    ],
    featured: true,
    status: 'complete',
    needs: [],
  },

  /* ------------------------------------------------ secondary / archive --- */
  {
    id: 'trash-sorting-robot',
    title: 'Trash Sorting Robot',
    category: 'Robotics · Computer Vision',
    tagline: 'Two robots — Toby pushes, Terresa sorts.',
    technologies: ['Raspberry Pi 3B+', 'OpenCV', 'YOLO', 'Supervised ML', 'Servos'],
    hero: 'finaltrabot',
    gallery: [
      { media: 'failedshovel', caption: 'The original shovel. Too heavy — it failed.', alt: 'First shovel design that proved too heavy' },
      { media: 'terresabot', caption: 'Terresa, with the Pi camera and ML detection.', alt: 'Side view of the Terresa robot' },
      { media: 'testtony', caption: 'Tony — a simpler flat shovel test build.', alt: 'Test robot with a flat shovel design' },
      { video: '/media/trashbot.mp4', poster: 'finaltrabot', caption: 'Both robots running.' },
    ],
    summary:
      'An autonomous recycling robot from the Tufts Engineering Design Lab, July 2023. Two robots split the work: Toby pushes waste toward Terresa, which finds cans and separates them from other material.',
    glance: [
      { label: 'Compute', value: 'Raspberry Pi 3B+' },
      { label: 'Vision', value: 'OpenCV, YOLO, supervised machine learning' },
      { label: 'Actuation', value: 'Servo mechanism' },
      { label: 'Robots', value: 'Toby (pusher), Terresa (sorter)' },
      { label: 'Where', value: 'Tufts Engineering Design Lab' },
      { label: 'When', value: 'Jul 2023' },
    ],
    sections: [
      {
        heading: 'How it works',
        body: [
          'Two robots split the job. Toby, the smaller one, pushes waste into range. Terresa, the larger one with the shovel, runs real-time object detection to find cans and separate them from everything else.',
          'Detection runs on a Raspberry Pi 3B+ with OpenCV and YOLO, using supervised machine learning. A camera and a servo mechanism do the physical sorting.',
        ],
      },
      {
        heading: 'What went wrong first',
        body: [
          'The first shovel was built to lift trash. It was too heavy for the robot to drive, and it failed.',
          'The fix was to stop lifting. A simpler flat shovel, tested on a build called Tony, pushed material instead. The drivetrain could handle that.',
          'The original codebase was lost.',
        ],
      },
    ],
    links: [
      { label: 'GitHub repo', href: 'https://github.com/mini-debug/Draft-trash-robot-' },
    ],
    featured: false,
    status: 'complete',
    needs: [],
  },
];

/** Projects shown in the main /projects grid. */
export const featuredProjects = projects.filter((p) => p.featured);

/** Projects shown in the secondary "Also built" strip. */
export const secondaryProjects = projects.filter((p) => !p.featured);

export function getProject(id) {
  return projects.find((p) => p.id === id) ?? null;
}

export function getProjectIndex(id) {
  return featuredProjects.findIndex((p) => p.id === id);
}
