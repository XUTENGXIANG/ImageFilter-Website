import { useState } from "react";
import SplitFlapText from "./SplitFlapText";

export function useFlapTrigger() {
  const [state, setState] = useState({ intro: false, flipKey: 0 });

  const trigger = () => {
    setState((previous) => ({
      intro: true,
      flipKey: previous.flipKey + 1,
    }));
  };

  return { intro: state.intro, flipKey: state.flipKey, trigger };
}

interface FlapLabelProps {
  label: string;
  intro: boolean;
  flipKey: number;
  className?: string;
}

export default function FlapLabel({ label, intro, flipKey, className }: FlapLabelProps) {
  return (
    <SplitFlapText
      key={`${label}-${flipKey}`}
      as="span"
      text={label}
      intro={intro}
      tileStyle="minimal"
      textColor="currentColor"
      fontSize="inherit"
      gap={0.5}
      padTo={label.length}
      align="left"
      flipDuration={0.08}
      stagger={0.025}
      flipsPerChar={3}
      className={`flap-button-label${className ? ` ${className}` : ""}`}
    />
  );
}
