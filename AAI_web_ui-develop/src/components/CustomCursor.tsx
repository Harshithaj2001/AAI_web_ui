import { useEffect, useState, useCallback } from "react";

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -40, y: -40 });
  const [trail, setTrail] = useState({ x: -40, y: -40 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const onMove = useCallback((e: MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
    if (!visible) setVisible(true);
  }, [visible]);

  useEffect(() => {
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", () => setVisible(false));
    window.addEventListener("mouseenter", () => setVisible(true));
    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, [onMove]);

  // Smooth trail follower
  useEffect(() => {
    let raf: number;
    const follow = () => {
      setTrail((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.15,
        y: prev.y + (pos.y - prev.y) * 0.15,
      }));
      raf = requestAnimationFrame(follow);
    };
    raf = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(raf);
  }, [pos]);

  // Detect hoverable elements
  useEffect(() => {
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [role='button'], input, textarea, select, [data-hoverable]")) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };
    window.addEventListener("mouseover", onOver);
    return () => window.removeEventListener("mouseover", onOver);
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Dot */}
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: pos.x,
          top: pos.y,
          transform: "translate(-50%, -50%)",
          width: hovering ? 8 : 5,
          height: hovering ? 8 : 5,
          borderRadius: "50%",
          backgroundColor: "hsl(201 100% 36%)",
          transition: "width 0.2s, height 0.2s",
        }}
      />
      {/* Ring */}
      <div
        className="fixed pointer-events-none z-[9998]"
        style={{
          left: trail.x,
          top: trail.y,
          transform: "translate(-50%, -50%)",
          width: hovering ? 48 : 32,
          height: hovering ? 48 : 32,
          borderRadius: "50%",
          border: `1.5px solid hsl(201 100% 36% / ${hovering ? 0.6 : 0.3})`,
          backgroundColor: hovering ? "hsl(201 100% 36% / 0.05)" : "transparent",
          transition: "width 0.3s cubic-bezier(.4,0,.2,1), height 0.3s cubic-bezier(.4,0,.2,1), border-color 0.3s, background-color 0.3s",
        }}
      />
    </>
  );
};

export default CustomCursor;
