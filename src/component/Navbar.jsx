import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

import Button from "./Button";

const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

const Navbar = () => {
    // estados para alternar audio y indicadores visuales
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isIndicatorActive, setIsIndicatorActive] = useState(false);

    // referencias para audio contenedores de navegacion
    const audioElementRef = useRef(null);
    const navContainerRef = useRef(null);

    const { y: currentScrollY } = useWindowScroll();
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    //indicador de audio y indicador visual
    const toggleAudioIndicator = () => {
        setIsAudioPlaying((prev) = !prev);
        setIsIndicatorActive((prev) = !prev);
    };

    //manejando audio playback

    useEffect(() => {
        if (isAudioPlaying) {
            audioElementRef.current.play();
        } else {
            audioElementRef.current.pause();
        }
    }, [isAudioPlaying]);

    useEffect(() => {
        if(currentScrollY === 0 ) {
            // si el scroll esta en la parte superior de la pagina 
            setIsNavVisible(true);
            // muestra el indicador visual
            navContainerRef.current.classList.remove("nav-hidden");
        }else if (currentScrollY > lastScrollY) {
            // si el scroll esta hacia abajo
            setIsNavVisible(false);
            // oculta el indicador visual
            navContainerRef.current.classList.add("nav-hidden");
        }else if (currentScrollY < lastScrollY) {
            // si el scroll esta hacia arriba
            setIsNavVisible(true);
            // muestra el indicador visual
            navContainerRef.current.classList.remove("nav-hidden");
        }
     // actualiza el ultimo scroll
        setLastScrollY(currentScrollY);
    }, [currentScrollY, lastScrollY]);

    // animacion de navegacion
    useEffect(() => {
        gsap.to(navContainerRef.current, {
          y: isNavVisible ? 0 : -100,
          opacity: isNavVisible ? 1 : 0,
          duration: 0.2,
        });
      }, [isNavVisible]);

      return (
        <div
          ref={navContainerRef}
          className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
        >
          <header className="absolute top-1/2 w-full -translate-y-1/2">
            <nav className="flex size-full items-center justify-between p-4">
              {/* Logo and Product button */}
              <div className="flex items-center gap-7">
                <img src="/img/logo.png" alt="logo" className="w-10" />
    
                <Button
                  id="product-button"
                  title="Products"
                  rightIcon={<TiLocationArrow />}
                  containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
                />
              </div>
    
              {/* Navigation Links and Audio Button */}
              <div className="flex h-full items-center">
                <div className="hidden md:block">
                  {navItems.map((item, index) => (
                    <a
                      key={index}
                      href={`#${item.toLowerCase()}`}
                      className="nav-hover-btn"
                    >
                      {item}
                    </a>
                  ))}
                </div>
    
                <button
                  onClick={toggleAudioIndicator}
                  className="ml-10 flex items-center space-x-0.5"
                >
                  <audio
                    ref={audioElementRef}
                    className="hidden"
                    src="/audio/loop.mp3"
                    loop
                  />
                  {[1, 2, 3, 4].map((bar) => (
                    <div
                      key={bar}
                      className={clsx("indicator-line", {
                        active: isIndicatorActive,
                      })}
                      style={{
                        animationDelay: `${bar * 0.1}s`,
                      }}
                    />
                  ))}
                </button>
              </div>
            </nav>
          </header>
        </div>
      );
}

export default Navbar;