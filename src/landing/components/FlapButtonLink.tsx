import type { AnchorHTMLAttributes } from "react";
import FlapLabel, { useFlapTrigger } from "./FlapLabel";
import { buttonStyles, type ButtonSize, type ButtonVariant } from "./buttonStyles";

interface FlapButtonLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  external?: boolean;
}

export default function FlapButtonLink({
  label,
  variant,
  size,
  external,
  className,
  onMouseEnter,
  onFocus,
  ...props
}: FlapButtonLinkProps) {
  const flap = useFlapTrigger();

  return (
    <a
      className={buttonStyles({ variant, size, className })}
      onMouseEnter={(event) => {
        flap.trigger();
        onMouseEnter?.(event);
      }}
      onFocus={(event) => {
        flap.trigger();
        onFocus?.(event);
      }}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      {...props}
    >
      <FlapLabel label={label} intro={flap.intro} flipKey={flap.flipKey} />
    </a>
  );
}
