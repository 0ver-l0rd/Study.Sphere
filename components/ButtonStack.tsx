import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ButtonData {
  label: string;
  route: string;
}

const buttonData: ButtonData[] = [
  { label: "Metaverce", route: "https://studyspheremv.netlify.app" },
  { label: "Interview", route: "https://studysphereinterview.netlify.app" },
  { label: "Chat", route: "https://ss-chat.onrender.com" },
  { label: "Button 4", route: "/route4" },
  { label: "Button 5", route: "" },
];

const ButtonStack: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const styles = `
      @keyframes slideIn {
        0% {
          opacity: 0;
          transform: translateY(30px);
        }
        100% {
          opacity: 1;
          transform: translateY(0px);
        }
      }

      @keyframes slideOut {
        0% {
          opacity: 1;
          transform: translateY(0px);
        }
        100% {
          opacity: 0;
          transform: translateY(30px);
        }
      }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const toggleStack = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      ref={containerRef}
      style={{ position: "fixed", bottom: "50px", right: "75px" }}
    >
      {isOpen &&
        buttonData.map((button, index) => {
          const sway = (mousePosition.x / window.innerWidth) * 50 - 25;
          const swayFactor = 1 + index * 0.5;

          return (
            <div
              key={button.label}
              className={cn(
                "shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
              )}
              style={{
                position: "absolute",
                bottom: `${(index + 1) * 70}px`,
                transform: `translateX(${sway * swayFactor}px) translateY(0px)`,
                width: "250px",
                height: "60px",
                backdropFilter: "blur(16px) saturate(180%)",
                backgroundColor: "rgba(17, 25, 40, 0.75)",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.125)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "transform 0.2s ease-out, opacity 0.2s ease-out", // Smooth transitions
                opacity: isOpen ? 1 : 0,
                zIndex: 10000,
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
                animation: isOpen
                  ? `slideIn 0.3s ease-out forwards ${index * 0.1}s`
                  : `slideOut 0.3s ease-in forwards ${index * 0.1}s`, // Slide in/out animation
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = `translateX(${sway * swayFactor}px) translateY(2px) scale(0.95)`;
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = `translateX(${sway * swayFactor}px) translateY(0px) scale(1)`;
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = `translateX(${sway * swayFactor}px) translateY(-5px) scale(1.05)`; // Hover effect
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = `translateX(${sway * swayFactor}px) translateY(0px) scale(1)`; // Reset on leave
              }}
              onClick={() => alert(`Navigating to ${button.route}`)}
            >
              {button.label}
            </div>
          );
        })}
      <div
        onClick={toggleStack}
        className={cn(
          "shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
        )}
        style={{
          width: "250px",
          height: "60px",
          backdropFilter: "blur(16px) saturate(180%)",
          backgroundColor: "rgba(17, 25, 40, 0.75)",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.125)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 10000,
          position: "relative",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
        }}
      >
        Menu
      </div>
    </div>
  );
};

export default ButtonStack;
