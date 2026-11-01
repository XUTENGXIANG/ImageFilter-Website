import TechText from "./components/TechText";

export default function TechTextBand() {
  return (
    <section className="relative px-6 py-8 max-hero:px-[18px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-28 bg-gradient-to-b from-black to-transparent"
      />
      <div className="relative z-10 mx-auto h-[clamp(180px,18vw,260px)] max-w-6xl">
        <TechText
          text="ImageFilter"
          fontFamily="Poppins"
          fontWeight={600}
          fontSize={170}
          letterSpacing={-0.02}
          align="center"
          color="#fafafa"
          accentColor="#10b981"
          reveal="area"
          reach={260}
          softness={0.9}
          lineStyle="solid"
          strokeWidth={1}
          specks={0}
          selection={false}
          labels={false}
          intro="none"
          guides={false}
          sweep={false}
          draggable={false}
          clickKick={false}
        />
      </div>
    </section>
  );
}
