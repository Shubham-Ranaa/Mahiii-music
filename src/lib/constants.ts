/**
 * Central content + configuration for the MAHII site.
 * Download URL is intentionally configurable: the real APK/distribution link
 * is not published yet, so it falls back to the on-page download section.
 */

export const SITE = {
  name: "MAHII",
  tagline: "Music. Memories. Together.",
  description:
    "MAHII is a modern Android music experience built around discovery, beautiful lyrics, personalized sound and listening together.",
  url: "https://mahii.app",
} as const;

/**
 * Set NEXT_PUBLIC_MAHII_DOWNLOAD_URL to a real APK / Play Store / distribution
 * link when it exists. Until then every download CTA points at #download.
 */
export const DOWNLOAD_URL: string =
  process.env.NEXT_PUBLIC_MAHII_DOWNLOAD_URL?.trim() || "#download";

export const DOWNLOAD_SECTION_ID = "#download";

export const IS_EXTERNAL_DOWNLOAD = DOWNLOAD_URL.startsWith("http");

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
