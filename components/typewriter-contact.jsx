"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const FIELDS = [
  { key: "name",  label: "NAME",    placeholder: "e.g. Jamie Chen",                  type: "input"    },
  { key: "email", label: "EMAIL",   placeholder: "hello@studio.com",                 type: "input"    },
  { key: "msg",   label: "MESSAGE", placeholder: "Let's build something together...", type: "textarea" },
];

const CHARS = 34;

const COLORS = {
  pageBg:       "#EDE8DF",
  /* Typewriter body - vintage Olivetti style */
  twBody:       "#DEDAD0",
  twBodyFront:  "#D0CAC0",
  twBodyBorder: "#C4BEB4",
  twBodyShadow: "0 4px 0 #D0CAC0, 0 8px 0 #C4BEB0, 0 12px 0 #B8B2A8, 0 16px 0 #ACA6A0, 0 20px 0 #A09A94, 0 24px 0 #948E88",
  keyWell:      "#2C2820",
  keyWellVent:  "#3A3630",
  /* Platen - thick rubber roller */
  platenRubber: "#3A3632",
  platenRubberHighlight: "#4A4642",
  /* Metal carriage/paper bail */
  metalRod:     "#707068",
  metalRodLight:"#909088",
  metalRodDark: "#505048",
  paperClip:    "#606058",
  /* Large side knobs */
  knobBody:     "#D8D4CC",
  knobRidge:    "#C4C0B8",
  knobShadow:   "#B0ACA4",
  /* Typehammer fan */
  hammerFan:    "#2C2820",
  hammerArm:    "#888078",
  hammerTip:    "#A8A098",
  /* Guide buttons */
  guideBtn:     "#D0CAC0",
  guideBtnHi:   "#E0DAD0",
  paper:        "#FEFCF4",
  paperBorder:  "#E0DAD0",
  paperMargin:  "rgba(200,90,70,0.15)",
  paperHeader:  "#B0A898",
  ruled:        "rgba(160,150,140,0.15)",
  curlTop:      "#F0EBE0",
  curlBot:      "#D8D2C6",
  curlBorder:   "#CEC8BE",
  /* Keys - round domed button style */
  keyFace:      "#EDEAE4",
  keyRing:      "#D8D4CC",
  keyBorder:    "#C8C2B8",
  keyShadow:    "0 3px 0 #B0A898",
  keyText:      "#4A4640",
  keyPressed:   "#D8D4CC",
  keyPressedSh: "0 1px 0 #B0A898",
  enterBg:      "#1B4F4A",
  enterRing:    "#143D39",
  enterBorder:  "#0F2D2A",
  enterText:    "#E8F4F3",
  enterShadow:  "0 3px 0 #0F2D2A",
  enterPressed: "#143D39",
  spaceBar:     "#EDEAE4",
  spaceRing:    "#D8D4CC",
  fnKey:        "#DEDAD2",
  fnBorder:     "#C0BAB0",
  fnText:       "#8A8478",
  sendLocked:   "#C8C2B8",
  sendLockedTx: "#8A8478",
  sendLockedSh: "0 3px 0 #B4AEA4",
  sendReady:    "#2C2820",
  sendReadyTx:  "#F0EBE1",
  sendReadySh:  "0 3px 0 #1A1610",
  textDark:     "#2C2820",
  textMuted:    "#9A9080",
  textHint:     "#B0A898",
  textFaint:    "#A8A098",
  inputPlaceh:  "#CEC8BE",
  guideTick:    "#B4AEA4",
  guideTickLg:  "#9A9488",
  soundBars:    "#8A8070",
  soundBg:      "#E4DFD6",
  soundBorder:  "#CEC8BE",
};

export default function TypewriterContact({ onSubmit, soundOn = true }) {
  const [values, setValues]           = useState({ name: "", email: "", msg: "", honeypot: "" });
  const [activeField, setActiveField] = useState(0);
  const [submitted, setSubmitted]     = useState(false);
  const [status, setStatus]           = useState("idle"); // idle | sending | error
  const [pressedKey, setPressedKey]   = useState(null);
  const [carriageLeft, setCarriageLeft] = useState(2);
  const [returning, setReturning]     = useState(false);

  const inputRefs  = useRef({});
  const audioCtx   = useRef(null);
  const prevLeft   = useRef(2);
  const pressTimer = useRef({});

  /* ── Audio ── */
  const getCtx = useCallback(() => {
    if (!audioCtx.current)
      audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx.current;
  }, []);

  const playClick = useCallback(() => {
    if (!soundOn) return;
    try {
      const ctx = getCtx();
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.04, ctx.sampleRate);
      const d   = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++)
        d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.008));
      const src  = ctx.createBufferSource(); src.buffer = buf;
      const gain = ctx.createGain(); gain.gain.value = 0.18;
      src.connect(gain); gain.connect(ctx.destination); src.start();
    } catch (_) {}
  }, [soundOn, getCtx]);

  const playBackspace = useCallback(() => {
    if (!soundOn) return;
    try {
      const ctx = getCtx();
      const dur = 0.05;
      const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
      const d   = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) {
        const t = i / ctx.sampleRate;
        d[i] = (Math.random() * 2 - 1) * Math.exp(-t / 0.012);
      }
      const src    = ctx.createBufferSource(); src.buffer = buf;
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 700;
      const gain = ctx.createGain(); gain.gain.value = 0.11;
      src.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
      src.start();
    } catch (_) {}
  }, [soundOn, getCtx]);

  const playReturn = useCallback(() => {
    if (!soundOn) return;
    try {
      const ctx = getCtx();
      const dur = 0.18;
      const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
      const d   = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) {
        const t = i / ctx.sampleRate;
        d[i] = Math.sin(2 * Math.PI * 220 * t) * Math.exp(-t / 0.04) * 0.3
             + (Math.random() * 2 - 1) * Math.exp(-t / 0.02) * 0.15;
      }
      const src  = ctx.createBufferSource(); src.buffer = buf;
      const gain = ctx.createGain(); gain.gain.value = 0.4;
      src.connect(gain); gain.connect(ctx.destination); src.start();
    } catch (_) {}
  }, [soundOn, getCtx]);

  /* ── Carriage position ── */
  const updateCarriage = useCallback((forcePct) => {
    const f   = FIELDS[activeField];
    const val = forcePct !== undefined ? "" : (values[f?.key] || "");
    const pct = forcePct !== undefined
      ? forcePct
      : (() => {
          const lines = val.split("\n");
          const last  = lines[lines.length - 1];
          return (last.length % CHARS) / CHARS;
        })();

    // Rod width approximated — will be recalculated on mount via ref if needed
    const rodW = 380;
    const newLeft = Math.max(2, Math.min(rodW - 34, pct * (rodW - 34)));

    if (newLeft < prevLeft.current - 8) {
      setReturning(true);
      playReturn();
      setTimeout(() => setReturning(false), 300);
    }
    prevLeft.current = newLeft;
    setCarriageLeft(newLeft);
  }, [activeField, values, playReturn]);

  useEffect(() => { updateCarriage(); }, [values, activeField]);

  /* ── Key flash ── */
  const flashKey = useCallback((key) => {
    const map = { Backspace: "⌫", Enter: "↵", Tab: "TAB", " ": "SPACE" };
    const k   = map[key] || key.toUpperCase();
    setPressedKey(k);
    if (key === "Backspace") playBackspace();
    else playClick();
    clearTimeout(pressTimer.current[k]);
    pressTimer.current[k] = setTimeout(() => setPressedKey(null), 130);
  }, [playClick, playBackspace]);

  /* ── Field handlers ── */
  const handleInput = (key) => (e) => {
    setValues((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleKeyDown = (idx) => (e) => {
    flashKey(e.key);
    if (e.key === "Tab") {
      e.preventDefault();
      const next = e.shiftKey ? idx - 1 : idx + 1;
      if (next >= 0 && next < FIELDS.length) focusField(next);
    }
    if (e.key === "Enter" && FIELDS[idx].type === "input") {
      e.preventDefault();
      if (idx + 1 < FIELDS.length) focusField(idx + 1);
    }
  };

  const focusField = (idx) => {
    setActiveField(idx);
    setTimeout(() => {
      const el = inputRefs.current[FIELDS[idx].key];
      if (el) {
        el.focus();
        try { el.selectionStart = el.value.length; el.selectionEnd = el.value.length; } catch (_) {}
      }
    }, 20);
  };

  const handleSend = async () => {
    if (!values.name.trim() || !values.email.trim() || !values.msg.trim()) return;
    if (status === "sending") return;
    playReturn();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Failed to send.");
      setStatus("idle");
      setSubmitted(true);
      if (onSubmit) onSubmit(values);
    } catch (_) {
      setStatus("error");
    }
  };

  const handleReset = () => {
    setValues({ name: "", email: "", msg: "", honeypot: "" });
    setStatus("idle");
    setSubmitted(false);
    setActiveField(0);
    updateCarriage(0);
  };

  const isReady = values.name.trim() && values.email.trim() && values.msg.trim();
  const isSending = status === "sending";

  /* ── Key rows ── */
  const keyRows = [
    ["Q","W","E","R","T","Y","U","I","O","P"],
    ["A","S","D","F","G","H","J","K","L"],
    ["Z","X","C","V","B","N","M","⌫","↵"],
  ];

  /* ── Styles ── */
  const s = {
    page: {
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "40px 16px 8px", fontFamily: "'Jost', sans-serif",
    },
    headingSub: {
      fontFamily: "'Fraunces', serif", fontStyle: "italic",
      fontSize: 11, color: COLORS.textMuted,
      letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 4,
    },
    headingTitle: {
      fontFamily: "'Fraunces', serif", fontStyle: "italic", fontWeight: 400,
      fontSize: 30, color: COLORS.textDark, lineHeight: 1.1,
    },
    scene: { width: "100%", maxWidth: 570, display: "flex", flexDirection: "column", alignItems: "center" },
    paperWrap: { width: "76%", position: "relative", zIndex: 2, marginBottom: -12 },
    paper: {
      background: COLORS.paper,
      borderLeft: `1px solid ${COLORS.paperBorder}`,
      borderRight: `1px solid ${COLORS.paperBorder}`,
      borderTop: `1px solid ${COLORS.paperBorder}`,
      minHeight: 170, padding: "12px 20px 8px 28px",
      position: "relative", fontFamily: "'Jost', sans-serif",
      /* Paper shadow where it emerges from platen */
      borderBottom: "2px solid rgba(0,0,0,0.08)",
    },
    ruledLines: {
      position: "absolute", inset: 0, pointerEvents: "none",
      backgroundImage: `repeating-linear-gradient(to bottom, transparent, transparent 27px, ${COLORS.ruled} 27px, ${COLORS.ruled} 28px)`,
    },
    marginLine: {
      position: "absolute", top: 0, bottom: 0, left: 36, width: 1,
      background: COLORS.paperMargin, pointerEvents: "none",
    },
    paperHeader: {
      display: "flex", justifyContent: "space-between", alignItems: "center",
      marginBottom: 12, paddingBottom: 8,
      borderBottom: `0.5px solid rgba(160,150,140,0.3)`,
      fontSize: 9, letterSpacing: "0.1em",
      color: COLORS.paperHeader, textTransform: "uppercase",
    },
    paperCurl: {
      width: "76%",
      height: 14,
      background: `linear-gradient(to bottom, ${COLORS.curlTop}, ${COLORS.curlBot})`,
      borderLeft: `1px solid ${COLORS.curlBorder}`,
      borderRight: `1px solid ${COLORS.curlBorder}`,
      position: "relative", zIndex: 2,
      marginBottom: -6,
    },
    /* Typewriter body - wide rounded Olivetti style with chunky depth */
    twBody: {
      width: "100%", background: COLORS.twBody,
      borderRadius: "16px 16px 20px 20px",
      border: `1px solid ${COLORS.twBodyBorder}`,
      boxShadow: COLORS.twBodyShadow,
      position: "relative", zIndex: 5, padding: "0 0 0",
      overflow: "visible",
      marginBottom: 10,
      transform: "scale(0.94)",
      transformOrigin: "center top",
    },
    /* Curved front lip with brand area */
    twBodyFront: {
      background: "linear-gradient(to bottom, #D8D4CC 0%, #C8C4BC 100%)",
      padding: "10px 20px 12px",
      borderTop: `1px solid ${COLORS.twBodyBorder}`,
      borderRadius: "0 0 20px 20px",
      position: "relative",
    },
    /* Side knobs - large cylindrical with ridges */
    sideKnobWrap: {
      position: "absolute", top: 8, display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
    },
    sideKnob: {
      width: 36, height: 44,
      background: "linear-gradient(90deg, #B8B4AC 0%, #E8E4DC 25%, #D8D4CC 50%, #C8C4BC 75%, #B0ACA4 100%)",
      borderRadius: 6, 
      boxShadow: "0 3px 0 #A09890, inset 0 1px 0 rgba(255,255,255,0.3)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2,
    },
    sideKnobRidge: {
      width: 28, height: 2, background: COLORS.knobRidge, borderRadius: 1,
    },
    /* Platen assembly area */
    platenArea: {
      background: COLORS.twBody,
      padding: "10px 56px 8px", display: "flex", alignItems: "center", gap: 0,
      position: "relative",
    },
    /* Thick rubber platen roller */
    platenRoller: {
      flex: 1, height: 28, 
      background: `linear-gradient(to bottom, ${COLORS.platenRubberHighlight} 0%, ${COLORS.platenRubber} 30%, #2A2622 70%, ${COLORS.platenRubber} 100%)`,
      borderRadius: 14, position: "relative", zIndex: 3,
      boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
    },
    /* Metal paper bail/rod across the top */
    paperBail: {
      position: "absolute", top: -6, left: 30, right: 30, height: 6,
      background: `linear-gradient(to bottom, ${COLORS.metalRodLight} 0%, ${COLORS.metalRod} 50%, ${COLORS.metalRodDark} 100%)`,
      borderRadius: 3, zIndex: 4,
      boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
    },
    /* Paper clips/guides on bail */
    paperBailClip: {
      position: "absolute", top: -2, width: 10, height: 14,
      background: `linear-gradient(to bottom, ${COLORS.metalRodLight}, ${COLORS.paperClip})`,
      borderRadius: "2px 2px 4px 4px",
      boxShadow: "0 1px 1px rgba(0,0,0,0.15)",
    },
    /* Carriage indicator */
    carriage: (left, ret) => ({
      position: "absolute", top: -14, height: 10, width: 24,
      background: `linear-gradient(to bottom, ${COLORS.metalRodLight}, ${COLORS.metalRod})`,
      borderRadius: "2px 2px 0 0",
      left: left + 30,
      transition: ret ? "left 0.25s cubic-bezier(0.16,1,0.3,1)" : "left 0.07s ease-out",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 5,
      boxShadow: "0 -1px 2px rgba(0,0,0,0.1)",
    }),
    carriageMark: { width: 2, height: 4, background: "#E8DFD0", borderRadius: 1 },
    /* Typehammer fan - semi-circular array */
    hammerFanWrap: {
      position: "relative", width: "100%", height: 46, marginTop: 4,
      display: "flex", justifyContent: "center", overflow: "hidden",
    },
    hammerFanBg: {
      position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
      width: 280, height: 90, 
      background: `radial-gradient(ellipse 140px 90px at 50% 100%, ${COLORS.hammerFan} 0%, ${COLORS.hammerFan} 60%, transparent 61%)`,
    },
    hammerArm: (angle) => ({
      position: "absolute", bottom: 0, left: "50%",
      width: 2, height: 44, 
      background: `linear-gradient(to top, ${COLORS.hammerArm}, ${COLORS.hammerTip})`,
      transformOrigin: "bottom center",
      transform: `translateX(-50%) rotate(${angle}deg)`,
      borderRadius: "1px 1px 0 0",
    }),
    hammerTip: {
      position: "absolute", top: -3, left: "50%", transform: "translateX(-50%)",
      width: 6, height: 6, background: COLORS.hammerTip, borderRadius: 1,
    },
    /* Raised guide buttons above hammers */
    guideButtonRow: {
      display: "flex", justifyContent: "center", gap: 8, marginBottom: 4,
    },
    guideButton: {
      width: 10, height: 10, borderRadius: "50%",
      background: `radial-gradient(circle at 35% 35%, ${COLORS.guideBtnHi}, ${COLORS.guideBtn})`,
      boxShadow: "0 2px 0 #B0A898, inset 0 1px 0 rgba(255,255,255,0.4)",
    },
    /* Dark recessed key well with inset shadow */
    keyWell: {
      background: COLORS.keyWell,
      margin: "0", padding: "10px 16px 12px",
      position: "relative",
      boxShadow: "inset 0 6px 12px rgba(0,0,0,0.4), inset 0 2px 4px rgba(0,0,0,0.3)",
      borderRadius: "0 0 4px 4px",
    },
    /* Round domed keys - staggered rows */
    keyRow: (ri) => ({
      display: "flex", justifyContent: "center", gap: 6, marginBottom: 4,
      marginLeft: ri === 1 ? 12 : ri === 2 ? 24 : 0,
    }),
    /* Round domed key - outer ring + inner dome */
    keyOuter: (k, pressed) => ({
      width: 30, height: 30, borderRadius: "50%",
      background: k === "↵" ? COLORS.enterRing : COLORS.keyRing,
      border: `1px solid ${k === "↵" ? COLORS.enterBorder : COLORS.keyBorder}`,
      boxShadow: pressed 
        ? (k === "↵" ? "0 1px 0 #0F2D2A" : COLORS.keyPressedSh)
        : (k === "↵" ? COLORS.enterShadow : COLORS.keyShadow),
      transform: pressed ? "translateY(2px)" : "translateY(0)",
      transition: "transform 0.07s, box-shadow 0.07s",
      display: "flex", alignItems: "center", justifyContent: "center",
      cursor: "default",
      ...(k === "↵" ? { width: 44 } : {}),
      ...(k === "⌫" ? { width: 36 } : {}),
    }),
    keyInner: (k, pressed) => ({
      width: 22, height: 22, borderRadius: "50%",
      background: pressed 
        ? (k === "↵" ? COLORS.enterPressed : COLORS.keyPressed)
        : (k === "↵" ? COLORS.enterBg : "radial-gradient(circle at 35% 35%, #F5F2EC, #DEDAD0)"),
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 9, fontWeight: 500, color: k === "↵" ? COLORS.enterText : COLORS.keyText,
      fontFamily: "'Jost', sans-serif", userSelect: "none",
      transition: "background 0.07s",
      ...(k === "↵" ? { width: 34, fontSize: 11, background: pressed ? COLORS.enterPressed : "radial-gradient(circle at 35% 35%, #1B5F5A, #143D39)" } : {}),
      ...(k === "⌫" ? { width: 28, fontSize: 8 } : {}),
    }),
    /* Spacebar row */
    spacebarRow: { display: "flex", justifyContent: "center", gap: 8, marginTop: 4 },
    /* Long wide spacebar */
    spacebarOuter: (pressed) => ({
      width: 120, height: 24, borderRadius: 12,
      background: COLORS.spaceRing,
      border: `1px solid ${COLORS.keyBorder}`,
      boxShadow: pressed ? COLORS.keyPressedSh : COLORS.keyShadow,
      transform: pressed ? "translateY(2px)" : "translateY(0)",
      transition: "transform 0.07s, box-shadow 0.07s",
      display: "flex", alignItems: "center", justifyContent: "center",
      cursor: "default",
    }),
    spacebarInner: (pressed) => ({
      width: 110, height: 16, borderRadius: 8,
      background: pressed ? COLORS.keyPressed : COLORS.spaceBar,
      transition: "background 0.07s",
    }),
    fnKey: {
      width: 28, height: 28, borderRadius: "50%",
      background: COLORS.fnKey, border: `1px solid ${COLORS.fnBorder}`,
      boxShadow: "0 2px 0 #B0A898",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 7, color: COLORS.fnText, cursor: "default",
      fontFamily: "'Jost', sans-serif", letterSpacing: "0.04em", textTransform: "uppercase",
    },
    sendRow: { marginTop: 8, display: "flex", justifyContent: "center" },
    sendBtn: (ready) => ({
      background: ready ? COLORS.sendReady : COLORS.sendLocked,
      color: ready ? COLORS.sendReadyTx : COLORS.sendLockedTx,
      border: "none", borderRadius: 4, padding: "9px 32px",
      fontFamily: "'Jost', sans-serif", fontSize: 10, fontWeight: 500,
      letterSpacing: "0.16em", textTransform: "uppercase",
      cursor: ready ? "pointer" : "default",
      boxShadow: ready ? COLORS.sendReadySh : COLORS.sendLockedSh,
      transition: "all 0.2s",
    }),
    fieldBlock: { marginBottom: 7, cursor: "text" },
    fieldLabel: (active) => ({
      fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase",
      fontWeight: 500, marginBottom: 3,
      color: active ? COLORS.textDark : COLORS.textHint,
      transition: "color 0.2s", fontFamily: "'Jost', sans-serif",
    }),
    fieldInput: {
      width: "100%", background: "transparent", border: "none", outline: "none",
      fontFamily: "'Jost', sans-serif", fontSize: 13, fontWeight: 300,
      color: COLORS.textDark, lineHeight: "27px", padding: 0,
      caretColor: COLORS.textDark, resize: "none", display: "block",
    },
    fieldRule: (active) => ({
      height: active ? 1.5 : 1,
      background: active ? COLORS.textDark : COLORS.paperBorder,
      marginTop: 1, transition: "all 0.2s",
    }),
    footerNote: {
      marginTop: 5, fontSize: 10, color: COLORS.textFaint,
      letterSpacing: "0.07em", textAlign: "center",
    },
    errorNote: {
      marginTop: 8, fontSize: 10, color: "#B0392C",
      textAlign: "center", letterSpacing: "0.04em",
    },
    sentTitle: {
      fontFamily: "'Fraunces', serif", fontStyle: "italic", fontWeight: 400,
      fontSize: 20, color: COLORS.textDark, marginBottom: 7,
    },
    sentBody: { fontSize: 12, color: COLORS.textMuted, lineHeight: 1.9, fontWeight: 300 },
    sentMark: { marginTop: 14, fontSize: 8, color: COLORS.textHint, letterSpacing: "0.1em", textTransform: "uppercase" },
    resetLink: {
      marginTop: 18, background: "none", border: "none", padding: 0,
      fontFamily: "'Jost', sans-serif", fontSize: 10, fontStyle: "italic",
      color: COLORS.textMuted, letterSpacing: "0.04em", cursor: "pointer",
      textDecoration: "underline", textUnderlineOffset: 3,
    },
  };

  const today = new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }).toUpperCase();

  return (
    <>
      <style>{`
        .tw-field-input::placeholder { color: ${COLORS.inputPlaceh}; font-style: italic; }
        .tw-send-btn:hover { transform: translateY(1px) !important; }
        .tw-send-btn:active { transform: translateY(3px) !important; box-shadow: none !important; }
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;1,400;1,600&family=Jost:wght@300;400;500&display=swap');

        .tw-layout-row {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: center;
          gap: 32px;
          width: 100%;
          max-width: 830px;
        }
        .tw-heading-side {
          text-align: left;
          padding-top: 8px;
          flex-shrink: 0;
          width: 190px;
        }
        @media (max-width: 640px) {
          .tw-layout-row { flex-direction: column; align-items: center; }
          .tw-heading-side { text-align: center; width: auto; padding-top: 0; margin-bottom: 10px; }
        }
      `}</style>

      <div style={s.page}>
        <div className="tw-layout-row">
          {/* Heading — beside the typewriter, top-aligned */}
          <div className="tw-heading-side">
            <div style={s.headingSub}>send a letter</div>
            <div style={s.headingTitle}>Let's get in touch</div>
          </div>

          <div style={s.scene}>
          {/* Paper */}
          <div style={s.paperWrap}>
            <div style={s.paper}>
              <div style={s.ruledLines} />
              <div style={s.marginLine} />
              <div style={s.paperHeader}>
                <span>taryn fukuji</span>
                <span>{today}</span>
              </div>

              {submitted ? (
                <div style={{ paddingBottom: 12 }}>
                  <div style={s.sentTitle}>Letter sent ✦</div>
                  <div style={s.sentBody}>Thank you, {values.name || "friend"}.<br />I'll write back soon.</div>
                  <div style={s.sentMark}>— {today} · TARYN FUKUJI</div>
                  <button className="tw-reset-btn" style={s.resetLink} onClick={handleReset}>
                    send another letter
                  </button>
                </div>
              ) : (
                <>
                <input
                  type="text"
                  name="company"
                  autoComplete="off"
                  tabIndex={-1}
                  value={values.honeypot}
                  onChange={handleInput("honeypot")}
                  style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
                  aria-hidden="true"
                />
                {FIELDS.map((field, idx) => {
                  const isActive = activeField === idx;
                  const val = values[field.key];
                  return (
                    <div key={field.key} style={s.fieldBlock} onClick={() => focusField(idx)}>
                      <div style={s.fieldLabel(isActive)}>{field.label}</div>
                      {field.type === "textarea" ? (
                        <textarea
                          ref={el => inputRefs.current[field.key] = el}
                          className="tw-field-input"
                          style={s.fieldInput}
                          value={val}
                          rows={3}
                          placeholder={isActive ? "" : field.placeholder}
                          onChange={handleInput(field.key)}
                          onKeyDown={handleKeyDown(idx)}
                          onFocus={() => setActiveField(idx)}
                        />
                      ) : (
                        <input
                          ref={el => inputRefs.current[field.key] = el}
                          className="tw-field-input"
                          style={s.fieldInput}
                          type={field.key === "email" ? "email" : "text"}
                          value={val}
                          placeholder={isActive ? "" : field.placeholder}
                          onChange={handleInput(field.key)}
                          onKeyDown={handleKeyDown(idx)}
                          onFocus={() => setActiveField(idx)}
                        />
                      )}
                      <div style={s.fieldRule(isActive)} />
                    </div>
                  );
                })}
                </>
              )}
            </div>
          </div>

          {/* Paper curl into body */}
          <div style={s.paperCurl} />

          {/* Typewriter body */}
          <div style={s.twBody}>
            {/* Left side knob */}
            <div style={{ ...s.sideKnobWrap, left: -44 }}>
              <div style={s.sideKnob}>
                {[0,1,2,3,4,5].map(i => <div key={i} style={s.sideKnobRidge} />)}
              </div>
            </div>
            {/* Right side knob */}
            <div style={{ ...s.sideKnobWrap, right: -44 }}>
              <div style={s.sideKnob}>
                {[0,1,2,3,4,5].map(i => <div key={i} style={s.sideKnobRidge} />)}
              </div>
            </div>

            {/* Platen area with rubber roller and paper bail */}
            <div style={s.platenArea}>
              {/* Metal paper bail across the top */}
              <div style={s.paperBail}>
                <div style={{ ...s.paperBailClip, left: 30 }} />
                <div style={{ ...s.paperBailClip, left: "50%", transform: "translateX(-50%)" }} />
                <div style={{ ...s.paperBailClip, right: 30 }} />
                {/* Carriage indicator on bail */}
                <div style={s.carriage(carriageLeft, returning)}>
                  <div style={s.carriageMark} />
                </div>
              </div>
              {/* Thick rubber platen roller */}
              <div style={s.platenRoller} />
            </div>

            {/* Typehammer fan - semi-circular array of type arms */}
            <div style={s.hammerFanWrap}>
              <div style={s.hammerFanBg} />
              {Array.from({ length: 21 }, (_, i) => {
                const angle = -50 + (i * 5);
                return (
                  <div key={i} style={s.hammerArm(angle)}>
                    <div style={s.hammerTip} />
                  </div>
                );
              })}
            </div>

            {/* Raised guide buttons above key well */}
            <div style={s.guideButtonRow}>
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} style={s.guideButton} />
              ))}
            </div>

            {/* Dark recessed key well */}
            <div style={s.keyWell}>
              {/* Key rows - round domed buttons, staggered */}
              {!submitted && (
                <div>
                  {keyRows.map((row, ri) => (
                    <div key={ri} style={s.keyRow(ri)}>
                      {row.map(k => {
                        const isPressed = pressedKey === k || (k === "⌫" && pressedKey === "BACKSPACE");
                        return (
                          <div key={k} style={s.keyOuter(k, isPressed)}>
                            <div style={s.keyInner(k, isPressed)}>{k}</div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                  {/* Spacebar row */}
                  <div style={s.spacebarRow}>
                    <div style={s.fnKey}>tab</div>
                    <div style={s.spacebarOuter(pressedKey === "SPACE")}>
                      <div style={s.spacebarInner(pressedKey === "SPACE")} />
                    </div>
                    <div style={s.fnKey}>{"↵"}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Curved front lip with send button */}
            <div style={s.twBodyFront}>
              {!submitted && (
                <div style={s.sendRow}>
                  <button
                    className={isReady && !isSending ? "tw-send-btn" : ""}
                    style={s.sendBtn(isReady && !isSending)}
                    onClick={handleSend}
                    disabled={isSending}
                  >
                    {isSending ? "sending…" : "send letter ✈"}
                  </button>
                </div>
              )}
              {status === "error" && (
                <div style={s.errorNote}>Couldn't send — please try again.</div>
              )}
            </div>
          </div>
          <div style={s.footerNote}>tab · shift+tab between fields &nbsp;·&nbsp; all corrections welcome</div>
          </div>
        </div>
      </div>
    </>
  );
}
