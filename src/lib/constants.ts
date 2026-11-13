/**
 * Central content + configuration for the MAHII site.
 * Download URL is intentionally configurable: it points at the bundled APK in
 * `public/` by default and can be overridden with an env var (Play Store,
 * a CDN, a release asset, ...).
 */

export const SITE = {
  name: "MAHII",
  tagline: "Music. Memories. Together.",
  description:
    "MAHII is a modern Android music experience built around discovery, beautiful lyrics, personalized sound and listening together.",
  url: "https://mahii.app",
} as const;

/**
 * The APK shipped inside `public/`. Every download CTA points straight at it
 * so pressing a button downloads the app instead of jumping to a section.
 */
export const DOWNLOAD_FILE_NAME = "mahii-latest.apk";

/**
 * Set NEXT_PUBLIC_MAHII_DOWNLOAD_URL to a Play Store / CDN / release link to
 * override the bundled APK. Defaults to the local APK in `public/`.
 */
export const DOWNLOAD_URL: string =
  process.env.NEXT_PUBLIC_MAHII_DOWNLOAD_URL?.trim() || `/${DOWNLOAD_FILE_NAME}`;

export const DOWNLOAD_SECTION_ID = "#download";

export const IS_EXTERNAL_DOWNLOAD = DOWNLOAD_URL.startsWith("http");

/**
 * `download` attribute value for the download CTAs. Ignored by browsers for
 * cross-origin links, so it stays safe when DOWNLOAD_URL points elsewhere.
 */
export const DOWNLOAD_ATTR = DOWNLOAD_FILE_NAME;

export const NAV_LINKS = [
  { label: "Experience", href: "#experience" },
  { label: "Features", href: "#features" },
  { label: "Listen Together", href: "#listen-together" },
  { label: "About", href: "#about" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "FAQ", href: "#faq" },
] as const;

export const SOCIALS = {
  instagram: "https://instagram.com/jhaharsh604",
  github: "https://github.com/jhaharsh604",
  contact: "mailto:jhaharsh604@gmail.com",
} as const;

export type CreatorLink = {
  label: "Instagram" | "GitHub" | "LinkedIn";
  handle: string;
  href: string;
};

export type Creator = {
  name: string;
  role: string;
  blurb: string;
  email: string;
  links: CreatorLink[];
};

/**
 * The two people behind MAHII. Both are credited equally everywhere they
 * appear (creator section, footer, page loader).
 */
export const CREATORS: Creator[] = [
  {
    name: "Harsh Jha",
    role: "Founder & Android Audio Engineer",
    blurb: "Passionate about Kotlin, Jetpack Compose and shared music rooms",
    email: "jhaharsh604@gmail.com",
    links: [
      {
        label: "Instagram",
        handle: "@jhaharsh604",
        href: "https://instagram.com/jhaharsh604",
      },
      {
        label: "GitHub",
        handle: "github.com/jhaharsh604",
        href: "https://github.com/jhaharsh604",
      },
    ],
  },
  {
    name: "Shubham Rana",
    role: "Co-Creator & Full-Stack Engineer",
    blurb: "Building the web experience that puts the music first",
    email: "shubhammranaa@gmail.com",
    links: [
      {
        label: "LinkedIn",
        handle: "linkedin.com/in/shubham-rana",
        href: "https://www.linkedin.com/in/shubham-rana-a00ba4317/",
      },
      {
        label: "GitHub",
        handle: "github.com/Shubham-Ranaa",
        href: "https://github.com/Shubham-Ranaa",
      },
      {
        label: "Instagram",
        handle: "@shubhammm_rana",
        href: "https://www.instagram.com/shubhammm_rana?obrf=azBhNTN6ZzVtd283",
      },
    ],
  },
];

export type Feature = {
  id: string;
  index: string;
  title: string;
  description: string;
  /** Short label shown in the mockup chrome */
  mockLabel: string;
};

export const FEATURES: Feature[] = [
  {
    id: "discovery",
    index: "01",
    title: "Music Discovery",
    description:
      "Explore songs, artists, albums and personalized music recommendations. Discover something new every day.",
    mockLabel: "Discover",
  },
  {
    id: "together",
    index: "02",
    title: "Listen Together",
    description:
      "Create listening rooms, invite friends and enjoy synchronized music playback together.",
    mockLabel: "Room · Live",
  },
  {
    id: "lyrics",
    index: "03",
    title: "Beautiful Lyrics",
    description:
      "Follow synchronized lyrics while listening to your favourite tracks.",
    mockLabel: "Lyrics",
  },
  {
    id: "audio",
    index: "04",
    title: "Premium Audio Experience",
    description:
      "Customize your sound with advanced equalizer controls, bass enhancement and audio effects.",
    mockLabel: "Equalizer",
  },
  {
    id: "library",
    index: "05",
    title: "Your Personal Library",
    description:
      "Organize your favourites, playlists, listening history and music collection.",
    mockLabel: "Library",
  },
  {
    id: "offline",
    index: "06",
    title: "Offline Experience",
    description:
      "Access supported downloaded tracks and cached content when you need them.",
    mockLabel: "Downloads",
  },
  {
    id: "personal",
    index: "07",
    title: "Personalized Experience",
    description:
      "Enjoy a customizable interface with beautiful themes and modern visual elements.",
    mockLabel: "Appearance",
  },
  {
    id: "spotify",
    index: "08",
    title: "Connect Your Spotify",
    description:
      "Connect your Spotify account and pull your playlists straight into MAHII. Everything you love, ready to play — even offline.",
    mockLabel: "Spotify",
  },
];

export type ShowcaseScreen = {
  id: string;
  label: string;
  title: string;
  caption: string;
};

export const SHOWCASE_SCREENS: ShowcaseScreen[] = [
  {
    id: "now-playing",
    label: "Now Playing",
    title: "Now Playing",
    caption: "Full-bleed artwork, transport controls and queue at a glance.",
  },
  {
    id: "lyrics",
    label: "Lyrics",
    title: "Lyrics",
    caption: "Synchronized lines that follow the track as it plays.",
  },
  {
    id: "equalizer",
    label: "Equalizer",
    title: "Equalizer",
    caption: "Shape the low end, the mids and the air to your taste.",
  },
  {
    id: "library",
    label: "Music Library",
    title: "Music Library",
    caption: "Playlists, favourites and history organized in one place.",
  },
  {
    id: "room",
    label: "Listening Room",
    title: "Listening Room",
    caption: "A shared queue with everyone synced to the same second.",
  },
  {
    id: "spotify",
    label: "Spotify",
    title: "Spotify Connect",
    caption:
      "Link your Spotify account and bring your playlists, likes and history straight into MAHII.",
  },
];

export const DESIGN_PRINCIPLES = [
  {
    index: "01",
    title: "Dark by default",
    body: "A deep, low-glare interface that lets album artwork carry the colour. Nothing competes with the music.",
    accent: "#A855F7",
  },
  {
    index: "02",
    title: "Motion with intent",
    body: "Transitions explain where you are going. Nothing moves just to look busy.",
    accent: "#C4B5FD",
  },
  {
    index: "03",
    title: "Artwork first",
    body: "Large covers, generous spacing and typography that steps back so the record can speak.",
    accent: "#7C3AED",
  },
  {
    index: "04",
    title: "Minimal navigation",
    body: "Fewer taps between you and the next song. Controls sit where your thumb already is.",
    accent: "#A855F7",
  },
  {
    index: "05",
    title: "Yours to tune",
    body: "Equalizer, themes and layout preferences are part of the product, not an afterthought.",
    accent: "#C4B5FD",
  },
] as const;

export type RoadmapItem = {
  title: string;
  body: string;
  status: "available" | "next";
};

export const ROADMAP: RoadmapItem[] = [
  {
    title: "Android music application",
    body: "The core MAHII app, built and running on Android.",
    status: "available",
  },
  {
    title: "Music discovery and playback",
    body: "Browse, search and play across your library and beyond.",
    status: "available",
  },
  {
    title: "Lyrics and equalizer",
    body: "Synchronized lyrics plus hands-on sound controls.",
    status: "available",
  },
  {
    title: "Personal music library",
    body: "Favourites, playlists and listening history in one place.",
    status: "available",
  },
  {
    title: "Listen Together",
    body: "Synchronized listening rooms for you and your people.",
    status: "available",
  },
  {
    title: "MAHII self-hosted backend",
    body: "An owned backend to make the experience independent and reliable.",
    status: "next",
  },
  {
    title: "Improved social listening",
    body: "Richer shared sessions and more ways to listen as a group.",
    status: "next",
  },
  {
    title: "User profiles",
    body: "Identity, taste and history that travel with you.",
    status: "next",
  },
  {
    title: "Private listening rooms",
    body: "Invite-only rooms for the people you actually listen with.",
    status: "next",
  },
  {
    title: "Enhanced personalization",
    body: "Recommendations and surfaces that adapt to how you listen.",
    status: "next",
  },
  {
    title: "More customization options",
    body: "Deeper themes, layouts and control over the interface.",
    status: "next",
  },
];

export const FAQS = [
  {
    q: "What is MAHII?",
    a: "MAHII is a customized Android music application built on an open-source music player foundation.",
  },
  {
    q: "Is MAHII free?",
    a: "The current personal build is free to use. Future pricing and monetization plans have not been finalized.",
  },
  {
    q: "Can I listen with friends?",
    a: "Yes. MAHII includes a Listen Together feature that supports synchronized listening rooms.",
  },
  {
    q: "Which devices are supported?",
    a: "MAHII currently targets Android devices running Android 8.0 and above.",
  },
  {
    q: "Is MAHII available on iOS?",
    a: "Currently, MAHII is an Android-focused project.",
  },
] as const;

export const CREDITS = {
  summary:
    "MAHII is a modified derivative of Echo Music and incorporates upstream open-source work from Echo Music, Metrolist, Vivi Music and other credited contributors.",
  license: "Licensed under GNU General Public License v3.0 (GPL-3.0).",
  retention:
    "Original copyright notices, attribution and applicable open-source license terms are retained.",
  thirdParty:
    "Third-party music services and content remain subject to their respective terms, policies and rights.",
  projects: [
    { name: "Echo Music", note: "Upstream foundation" },
    { name: "Metrolist", note: "Upstream open-source work" },
    { name: "Vivi Music", note: "Upstream open-source work" },
    { name: "GPL-3.0", note: "License" },
  ],
} as const;
