export type NavLink = {
  label: string;
  href: string;
};

export type DeviceScreenId =
  | "now-playing"
  | "lyrics"
  | "equalizer"
  | "library"
  | "room";

export type Listener = {
  id: string;
  name: string;
  initials: string;
  hue: number;
  /** Position on the cinematic stage, in percent */
  x: number;
  y: number;
};
