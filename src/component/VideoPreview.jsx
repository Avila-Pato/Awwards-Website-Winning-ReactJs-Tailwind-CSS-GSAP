import { gsap } from "gsap";
import { useState, useRef, useEffect } from "react";

 const VideoPreview = ({ children }) => {
  const [isHovering, setIsHovering] = useState(false);

  const sectionRef = useRef(null); // referncia a la seccion
  const contentRef = useRef(null); // referncia al contenido

  // manejando los movimientos del mouse sobre el contenedor

  const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
    const rect = currentTarget.getBoundingClientRect(); // obteniendo las dimensiones del contenedor

    const XOffset = clientX - (rect.left + rect.width / 2); // calculando la posicion del mouse en X
    const YOffset = clientY - (rect.top + rect.height / 2); // calculando la posicion del mouse en Y

    if (isHovering) {
      // Moviendo el contenido en direccion al cursor
      gsap.to(sectionRef.current, {
        x: xOffset,
        y: yOffset,
        rotationY: xOffset / 2, // Add  3d efecto de rotacion
        rotationX: -yOffset / 2,
        transformPerspective: 500, // Perspectiva del 3d
        duration: 1,
        ease: "power1.out",
      });

      //  moviendo el contenido en direccion opuesta al cursor
      gsap.to(contentRef.current, {
        x: -xOffset,
        y: -yOffset,
        duration: 1,
        ease: "power1.out",
      });
    }
  };

  useEffect(() => {
    // reseta la posicion del contenido cuando el mouse deja de estar sobre el contenedor
    if (!isHovering) {
      gsap.to(sectionRef.current, {
        x: 0,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        duration: 1,
        ease: "power1.out",
      });

      gsap.to(contentRef.current, {
        x: 0,
        y: 0,
        duration: 1,
        ease: "power1.out",
      });
    }
  }, [isHovering]);

  return (
    <section
      ref={sectionRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
      className="absolute z-50 size-full overflow-hidden rounded-lg"
      style={{ perspective: "500px" }}
    >
      <div
        ref={contentRef}
        className="origin-center rounded-lg"
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </section>
  );
};

export default VideoPreview;