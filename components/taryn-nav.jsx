"use client";

import { useState } from "react";

const COLORS = {
  pageBg:    "#FFFAF4",
  dotColor:  "#D2C4A3",
  green:     "#1B4F4A",
  cream:     "#F5EFE0",
  orange:    "#D5694A",
  gray:      "#666666",
  divider:   "#E0D8CC",
  toggleOff: "#D2C4A3",
};

const LINKS = ["Work", "About", "Contact"];

function TFLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width="44"
      height="44"
      aria-label="Taryn Fukuji logo"
    >
      <g fill="#1B4F4A">
        <path d="M56.5,86.2c5.3-0.9,10.7-1.4,16.1-1.7c9.7-0.5,19.4-0.2,29.2,0.2c8.4,0.4,17.5-1.2,25.7-3.2c5.5-1.4,10.8-3.3,15.6-5.9c4.7-2.6,10.5-6.7,12.5-11.1c1.6,7.2-2.7,14.9-9.5,20c-9.8,7.2-23.5,9.1-36,10c-16.5,1.2-33.5,1.1-49.9,0.7c-7.2-0.2-14.4,0.8-21.3,2.9c-2.7,0.8-5.5,1.8-8.1,3c-1.1,0.5-2.1,1.1-3.2,1.7c-0.5,0.3-2.7,1.8-3.3,1.5c-0.8-0.4,2.4-4.6,3-5.2c5.2-6.2,12.5-8.9,20.2-10.8C50.3,87.4,53.4,86.7,56.5,86.2z"/>
        <path d="M74.1,168.9c-5.9-2.9-10.5-7-13.7-12.1c-3.2-5.1-4.8-10.9-4.8-17.4c0-0.4,0-0.9,0-1.3c0-2.3,0-4.6,0-7c0-14.5,0-29,0-43.5c0-5.7-0.2-11.5-0.2-17.2c0-4.2,0-8.4,0.1-12.6c0-2.1,0.1-4.2,0.1-6.3c0-1,0-2.1,0.1-3.1c0-0.6-0.2-2.4,0.2-2.9c0.9,1.2,1.5,2.5,2.6,3.6c1,1,2.2,2,3.4,2.7c1.8,1,3.7,1.6,5.7,1.9c1.9,0.2,3.7,0.2,5.6,0.5c0.9,0.1,1.7,0.2,2.6,0.5c1.7,0.5,3.3,1.4,4.6,2.7c0.4,0.4,0.8,0.8,1.1,1.2c0.7,0.9,1.3,1.9,1.8,2.9c0.2,0.5,0.4,0.9,0.5,1.4c1.1,3.8,1.1,7.9,1.2,11.9c0,4.2,0,8.4,0,12.6c0,14.5-0.1,29-0.1,43.5c0,2.8,0,5.7,0,8.5c0,9.5-1.8,22.7,8.3,28.3c0.7,0.4,1.4,0.7,2.2,0.9c3.6,1.1,7.7,1.4,11.4,0.1c3.3-1.1,6.2-3.6,7.5-6.8c1.2-3,1.2-7.4-1.2-9.8c0.1,2.8-1,5.4-3.7,6.7c-2.4,1.1-5.4,0.6-7.5-1s-3.4-4.2-3.6-6.8c-0.5-6.2,4-11,9.6-12.9c3.5-1.2,7.4-1.1,10.9,0.3c-2,0.1-4,0.1-6,0.3c-2,0.2-4,0.6-5.7,1.6c-1.7,1-3.2,2.6-3.5,4.6c0.6-0.7,1.8-1.2,2.6-1.7c3.4-1.8,7.7-2.5,11.4-1c3.8,1.6,6.9,5.1,7.2,9.3c0.3,4.4-1.5,8.8-4.4,12.2s-6.8,5.7-11,7.1c-5.8,2-12.5,2.8-18.6,2.4C84.9,172.7,79.2,171.4,74.1,168.9z"/>
        <path d="M92.6,160.5c-2.1-2.5-3.3-5.7-3.6-9c-0.1-0.8-0.1-1.7-0.1-2.5c0.1-1.9,0.4-3.8,1.2-5.5c0.8-1.7,2.1-3.3,3.8-4.1c-2.5,2.7-3.8,6.5-3.7,10.2c0.1,3.7,1.6,7.3,4.1,10c1.1,1.3,2.5,2.3,4,3.2c1.7,1,3.5,1.3,5.3,1.8c-0.3-0.1-0.9,0.1-1.2,0.2c-0.5,0-0.9,0-1.4,0c-0.9,0-1.8-0.2-2.7-0.5c-1.7-0.5-3.3-1.4-4.7-2.6C93.3,161.3,93,160.9,92.6,160.5z"/>
        <path d="M131.6,15.5c6.1-0.4,12.8,0.4,18.6,2.4c4.2,1.4,8.1,3.8,11,7.1s4.7,7.8,4.4,12.2c-0.3,4.2-3.4,7.7-7.2,9.3c-3.7,1.6-7.9,0.8-11.4-1c-0.8-0.4-2-0.9-2.6-1.7c0.3,2,1.8,3.6,3.5,4.6c1.7,1,3.7,1.4,5.7,1.6c2,0.2,4,0.1,6,0.3c-3.5,1.3-7.4,1.4-10.9,0.3c-5.6-1.9-10.1-6.7-9.6-12.9c0.2-2.6,1.5-5.2,3.6-6.8c2.1-1.6,5.1-2,7.5-1c2.8,1.2,3.8,3.9,3.7,6.7c2.4-2.4,2.4-6.9,1.2-9.8c-1.3-3.2-4.2-5.7-7.5-6.8c-3.6-1.3-7.7-0.9-11.4,0.1c-0.7,0.2-1.5,0.5-2.2,0.9c-10.1,5.6-8.3,18.8-8.3,28.3c0,2.8,0,5.7,0,8.5c0,28.6,0.5,57.2-0.4,85.7c-1.5-3-4-5.5-7.1-7c-5.6-2.7-11.6-0.2-16.8-4.3c-4-3.2-5.2-8.4-5.2-13.3c0-22.8,0-45.6,0-68.4c0-0.4,0-0.9,0-1.3c0-6.5,1.6-12.3,4.8-17.4c3.2-5.1,7.7-9.2,13.7-12.1C120.2,17.2,125.9,15.9,131.6,15.5z"/>
        <path d="M133.6,28.1c-2.1,2.5-3.3,5.7-3.6,9c-0.1,0.8-0.1,1.7-0.1,2.5c0.1,1.9,0.4,3.8,1.2,5.5c0.8,1.7,2.1,3.3,3.8,4.1c-2.5-2.7-3.8-6.5-3.7-10.2c0.1-3.7,1.6-7.3,4.1-10c1.1-1.3,2.5-2.3,4-3.2c1.7-1,3.5-1.3,5.3-1.8c-0.3,0.1-0.9-0.1-1.2-0.2c-0.5,0-0.9,0-1.4,0c-0.9,0-1.8,0.2-2.7,0.5c-1.7,0.5-3.3,1.4-4.7,2.6C134.3,27.3,133.9,27.7,133.6,28.1z"/>
      </g>
    </svg>
  );
}

export default function TarynNav({
  activePage    = "Contact",
  soundOn: soundProp,
  onSoundToggle,
}) {
  const [activeInternal, setActiveInternal] = useState(activePage);
  const [soundInternal,  setSoundInternal]  = useState(true);

  const soundOn  = soundProp !== undefined ? soundProp : soundInternal;
  const setSound = onSoundToggle ?? setSoundInternal;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&display=swap');

        .tf-root {
          width: 100%;
          font-family: 'Jost', sans-serif;
        }
        .tf-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          height: 72px;
          padding: 0 40px;
          max-width: 1400px;
          margin: 0 auto;
          border-bottom: 1px solid rgba(210,196,163,0.4);
        }

        /* Site name */
        .tf-site-name {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: ${COLORS.green};
          white-space: nowrap;
          flex-shrink: 0;
          text-decoration: none;
        }

        /* Logo — absolutely centered so unequal side widths don't skew it */
        .tf-logo-wrap {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
        }
        .tf-logo-link {
          display: flex;
          align-items: center;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .tf-logo-link:hover { opacity: 0.7; }

        /* Links cluster */
        .tf-links {
          display: flex;
          align-items: center;
          gap: 2px;
          flex-shrink: 0;
        }

        /* Individual nav link */
        .tf-link {
          display: inline-flex;
          align-items: center;
          padding: 6px 10px;
          cursor: pointer;
          background: none;
          border: none;
          outline: none;
          text-decoration: none;
        }

        /* Brackets — 500 weight, 15px */
        .tf-bracket {
          font-family: 'Jost', sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: ${COLORS.orange};
          display: inline-block;
          line-height: 1;
          transition: opacity 0.16s ease, transform 0.16s ease;
        }
        .tf-bl { opacity: 0; transform: translateX(5px);  margin-right: 2px; }
        .tf-br { opacity: 0; transform: translateX(-5px); margin-left:  2px; }

        .tf-link:hover .tf-bl,
        .tf-link-active .tf-bl { opacity: 1; transform: translateX(0); }
        .tf-link:hover .tf-br,
        .tf-link-active .tf-br { opacity: 1; transform: translateX(0); }

        .tf-link-text {
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: ${COLORS.gray};
          transition: color 0.16s ease;
        }
        .tf-link:hover .tf-link-text,
        .tf-link-active .tf-link-text { color: ${COLORS.orange}; }

        /* Resume — fill wipes right→left on hover */
        .tf-resume {
          position: relative;
          display: inline-flex;
          align-items: center;
          padding: 9px 20px;
          border-radius: 99px;
          border: 1.5px solid ${COLORS.green};
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          cursor: pointer;
          margin-left: 12px;
          flex-shrink: 0;
          overflow: hidden;
          text-decoration: none;
          color: ${COLORS.cream};
          background: transparent;
          transition: color 0.32s ease;
        }
        .tf-resume::before {
          content: '';
          position: absolute;
          inset: 0;
          background: ${COLORS.green};
          border-radius: 99px;
          transform-origin: right center;
          transform: scaleX(1);
          transition: transform 0.38s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 0;
        }
        .tf-resume:hover::before { transform: scaleX(0); }
        .tf-resume:hover         { color: ${COLORS.green}; }

        .tf-resume-inner {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          gap: 7px;
        }
        .tf-resume-icon                  { transition: transform 0.2s ease; }
        .tf-resume:hover .tf-resume-icon { transform: translateY(1.5px); }

        /* Divider */
        .tf-divider {
          width: 1px;
          height: 18px;
          background: ${COLORS.divider};
          margin: 0 12px;
          flex-shrink: 0;
        }

        /* Sound */
        .tf-sound {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          flex-shrink: 0;
        }
        .tf-sound-icon {
          width: 19px;
          height: 15px;
          color: #A09890;
          flex-shrink: 0;
          transition: color 0.2s;
        }
        .tf-sound:hover .tf-sound-icon { color: ${COLORS.green}; }

        .tf-toggle-track {
          width: 34px;
          height: 18px;
          border-radius: 99px;
          position: relative;
          transition: background 0.25s ease;
          flex-shrink: 0;
        }
        .tf-toggle-thumb {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 14px;
          height: 14px;
          background: ${COLORS.pageBg};
          border-radius: 50%;
          transition: transform 0.25s ease;
          box-shadow: 0 1px 3px rgba(0,0,0,0.15);
        }

        /* Responsive: reflow into a compact wrapped layout instead of overflowing */
        @media (max-width: 860px) {
          .tf-nav {
            flex-wrap: wrap;
            row-gap: 10px;
            height: auto;
            padding: 14px 20px;
          }
          .tf-logo-wrap {
            position: static;
            transform: none;
            order: -1;
            width: 100%;
            justify-content: center;
          }
          .tf-links {
            flex-wrap: wrap;
            justify-content: center;
            row-gap: 8px;
          }
        }
        @media (max-width: 480px) {
          .tf-nav { padding: 12px 14px; }
          .tf-site-name { font-size: 9px; letter-spacing: 0.14em; }
          .tf-links { gap: 0; column-gap: 2px; }
          .tf-link { padding: 6px 6px; }
          .tf-resume { padding: 7px 10px; margin-left: 2px; }
          .tf-resume-text { display: none; }
          .tf-divider { margin: 0 6px; }
        }
      `}</style>

      <div className="tf-root">
        <nav className="tf-nav">

          {/* Left — site name */}
          <a href="/" className="tf-site-name">Taryn Fukuji</a>

          {/* Center — real TF SVG logo */}
          <div className="tf-logo-wrap">
            <a href="/" className="tf-logo-link">
              <TFLogo />
            </a>
          </div>

          {/* Right — links + resume + sound */}
          <div className="tf-links">
            {LINKS.map(link => (
              <button
                key={link}
                className={`tf-link${activeInternal === link ? " tf-link-active" : ""}`}
                onClick={() => setActiveInternal(link)}
              >
                <span className="tf-bracket tf-bl">[</span>
                <span className="tf-link-text">{link}</span>
                <span className="tf-bracket tf-br">]</span>
              </button>
            ))}

            <a href="/resume.pdf" className="tf-resume" target="_blank" rel="noreferrer">
              <span className="tf-resume-inner">
                <svg
                  className="tf-resume-icon"
                  width="13"
                  height="13"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 1v8M4 6.5l3 3 3-3M1.5 12.5h11" />
                </svg>
                <span className="tf-resume-text">Resume</span>
              </span>
            </a>

            <div className="tf-divider" />

            <div className="tf-sound" onClick={() => setSound(v => !v)}>
              <svg
                className="tf-sound-icon"
                viewBox="0 0 20 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M3 6H1v4h2l4 3V3L3 6z" />
                <path
                  d="M11 5a3 3 0 0 1 0 6"
                  style={{ opacity: soundOn ? 1 : 0.2, transition: "opacity 0.2s" }}
                />
                <path
                  d="M13.5 3a6 6 0 0 1 0 10"
                  style={{ opacity: soundOn ? 1 : 0.2, transition: "opacity 0.2s" }}
                />
              </svg>
              <div
                className="tf-toggle-track"
                style={{ background: soundOn ? COLORS.green : COLORS.toggleOff }}
              >
                <div
                  className="tf-toggle-thumb"
                  style={{ transform: soundOn ? "translateX(16px)" : "translateX(0)" }}
                />
              </div>
            </div>
          </div>

        </nav>
      </div>
    </>
  );
}
