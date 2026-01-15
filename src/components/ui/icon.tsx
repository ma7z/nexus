"use client";

import { Icon as IconifyIcon } from "@iconify/react";

type IconProps = {
  name: string;
  size?: number;
  className?: string;
};

export default function Icon({ name, size = 20, className }: IconProps) {
  return (
    <IconifyIcon icon={name} width={size} height={size} className={className} />
  );
}
