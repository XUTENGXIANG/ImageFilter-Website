import type { ReactElement } from "react";

export interface NeumorphicDownloadButtonProps {
  href: string;
  filename?: string;
  label: string;
  downloadingLabel: string;
  doneLabel: string;
  external?: boolean;
  className?: string;
}

export default function NeumorphicDownloadButton(
  props: NeumorphicDownloadButtonProps,
): ReactElement;
