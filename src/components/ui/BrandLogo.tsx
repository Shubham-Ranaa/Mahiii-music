import Image from "next/image";

/**
 * The official MAHII mark, copied from the Android app's
 * `ic_mahii_logo.xml` vector drawable.
 */
export function BrandLogo({
  size = 32,
  className,
  priority = false,
}: {
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/mahii-logo.svg"
      alt=""
      width={size}
      height={size}
      priority={priority}
      unoptimized
      draggable={false}
      aria-hidden
      className={className}
    />
  );
}
