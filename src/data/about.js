/**
 * ABOUT / EXPERIENCE
 *
 * Inkbit and MIT Lincoln Laboratory were previously presented as portfolio
 * projects. They read as experience rather than as built projects, so they
 * live here as a timeline instead.
 *
 * Wording matches the resume (Mellanie_s_Resume.pdf, Oct 2026), plus details
 * from the previous site. Dates are confirmed in CONTENT-TODO.md.
 */

export const experience = [
  {
    id: 'auto-id',
    org: 'Auto-ID Labs @ MIT',
    role: 'Incoming Firmware Undergraduate Intern',
    period: 'Oct 2026',
    summary: 'Incoming firmware internship at the Auto-ID Labs at MIT, starting October 2026.',
    gallery: [],
  },
  {
    id: 'media-lab',
    org: 'MIT Media Lab',
    role: 'Mechatronics Engineering Researcher',
    period: 'Jun 2026 – Sep 2026',
    summary:
      'UROP in the Critical Matter Group, supervised by Behnaz Farahi and Yuxiang Cheng. The system creates thin fibers by dispensing liquid through a needle connected to a 19 kV wire, autonomously, with a UR20 and an xArm 6.',
    detail: [
      'Designed a robotic electrospinning end effector in Onshape and Fusion 360, cutting electric field arcing by an estimated 10%.',
      'Built an ESP32 and NEMA 17 stepper motor fluid delivery system for automated polymer dispensing.',
      'Wrote Python tools to analyze electric field distributions and guide high-voltage needle placement.',
    ],
    link: { to: '/projects/electrospinning', label: 'Read the full project' },
    gallery: [],
  },
  {
    id: 'inkbit',
    org: 'Inkbit',
    role: 'Manufacturing Intern',
    period: 'Apr 2025 – May 2025',
    media: 'frontWater',
    summary:
      'I reverse engineered damaged aircraft parts through CAD reconstruction and ran CFD to improve the design. I also worked on 3D printer calibration and the user experience of resin-based printing, with hands-on CAD modeling and print validation.',
    detail: [
      'Printed and validated parts in TEPU30A and Titan Tough Epoxy 85.',
      'I prototyped a couple of VR headset concepts.',
    ],
    gallery: [
      { media: 'frontWater', caption: 'Front view — Titan Tough Epoxy 85.', alt: 'Front view of a printed part' },
      { media: 'sideviewwater', caption: 'Side view.', alt: 'Side view of a printed part' },
      { media: 'topviewwater', caption: 'Top view.', alt: 'Top view of a printed part' },
      { media: 'wr', caption: 'Weird Chair — top view. TEPU30A.', alt: 'Top view of the Weird Chair print' },
      { media: 'wrside', caption: 'Weird Chair — side view.', alt: 'Side view of the Weird Chair print' },
    ],
  },
  {
    id: 'mit-ll',
    org: 'MIT Lincoln Laboratory',
    role: 'Mechanical Engineering Intern',
    period: 'Jun 2024 – Aug 2024',
    media: 'LLmain',
    summary:
      'Selected as one of three high-school students from roughly 250 applicants for a summer research internship.',
    detail: [
      'Designed and built a vibration simulator in SolidWorks using aluminium 6061, demonstrating how frequency, material and mass affect motion in satellite vibration testing.',
      'Applied finite element analysis, Hooke’s Law and Young’s Modulus to study stress and deformation under dynamic loading.',
      'Also designed a self playing xylophone in SolidWorks that plays “Mary Had a Little Lamb”. Used Young’s modulus and density to choose aluminum 6061 and predict each bar’s resonant frequency, then tuned bar length and thickness to hit the target pitches.',
    ],
    gallery: [
      { media: 'll-vibration-test', caption: 'Vibration table concept test.', alt: 'Vibration table concept test setup' },
      { media: 'LLmain', caption: 'Final build.', alt: 'The completed vibration simulator' },
    ],
  },
  {
    id: 'tufts',
    org: 'Tufts Engineering Design Lab',
    role: 'Robotics Intern',
    period: 'Jul 2023',
    summary: 'Designed an autonomous recycling robot using a Raspberry Pi 3B+ and supervised machine learning.',
    link: { to: '/projects/trash-sorting-robot', label: 'Read the full project' },
    gallery: [],
  },
];

/**
 * Bio. Kept short by design — the About page is not an autobiography.
 * `MELLANIE / 29` on the homepage: class of 2029, confirmed in CONTENT-TODO.md.
 */
export const bio = {
  name: 'Mellanie Rodriguez',
  school: 'MIT',
  course: 'EECS + Design',
  lede: 'I build physical things across electronics, robotics, software, manufacturing and design.',
  paragraphs: [
    'I study EECS and Design at MIT. I have never been especially interested in picking one lane — the work I like most sits at the seam between disciplines, where a circuit board, a fabrication method and a visual decision all have to agree with each other.',
    'In practice that means I move between electronics and PCB design, robotics and embedded systems, software, physical product development, and art. A technical artist, if that needs a title: the point is turning an idea into something that exists and works.',
  ],
  skills: [
    { label: 'Languages', items: ['Python', 'C/C++'] },
    { label: 'Hardware', items: ['ESP32', 'Arduino', 'Raspberry Pi', 'I2C'] },
    { label: 'Tools', items: ['Altium', 'LTspice', 'SolidWorks', 'Fusion 360', 'Onshape', 'Git', 'PlatformIO'] },
  ],
  coursework: [
    'Circuits and Electronics (6.200)',
    'C and Assembly (6.1903)',
    'Discrete Math (6.1200)',
    'E&M (8.02)',
    'Classical Mechanics (8.01)',
    'Multivariable Calculus (18.02)',
    'PCB Design (6.S089)',
  ],
  activities: [
    {
      role: 'Project Mentor',
      org: 'MIT Edgerton Center and Metropolis',
      period: 'Dec 2025 – Present',
      detail: [
        'Mentor 100+ students per semester at two makerspaces.',
        'Teach power supplies, laser cutting, FDM and SLA fabrication basics, and iterating on projects.',
      ],
    },
    {
      role: 'Member',
      org: 'Society of Hispanic Professional Engineers (SHPE)',
      period: 'Sep 2025 – Present',
      detail: ['Attend chapter events and volunteer in STEM classes for 20+ Hispanic students in Boston Public Schools.'],
    },
  ],
  honors: [
    'Amazon Future Engineer Scholar',
    'Microsoft Disability Scholar',
    'U.S. Presidential Scholar Nominee',
    '2nd Place, MakeMIT',
    '1st Place, Design Museum Everywhere',
  ],
  interests: {
    engineering: ['Electronics & PCB design', 'Robotics', 'Embedded systems', 'Computer vision', 'Manufacturing & fabrication'],
    design: ['Physical product design', 'CAD & prototyping', 'Painting & sculpture', 'Visual & interface design'],
  },
  needs: [
  ],
};
