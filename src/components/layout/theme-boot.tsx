"use client";

import { useEffect, useState } from "react";

/** Where the choice is kept. Read by the inline script and by the toggle. */
export const THEME_KEY = "silka-mode";

/**
 * Resolves and applies the mode before the body is parsed.
 *
 * The order is: an explicit choice the visitor made, then their system
 * setting, then dark. Only an explicit choice is stored — so someone who has
 * never touched the toggle keeps following their OS, including when it flips
 * at sunset, and someone who has chosen keeps their choice on every device
 * where they chose it.
 *
 * This has to run from the HTML rather than from an effect. An effect runs
 * after hydration, which on a slow connection is a second or more of the wrong
 * theme followed by a flash — the one bug every theme switcher ships with.
 *
 * `data-mode` is only ever written for light. Dark is the absence of the
 * attribute, which keeps the default path in the stylesheet free of an extra
 * selector and means a failed script leaves the site exactly as it was.
 */
const BOOT = `(function(){
try{
var stored=null;
try{stored=localStorage.getItem("${THEME_KEY}")}catch(e){}
var mode=stored==="light"||stored==="dark"?stored:
(window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");
if(mode==="light")document.documentElement.setAttribute("data-mode","light");
else document.documentElement.removeAttribute("data-mode");
}catch(e){}
})();`;

/**
 * Emitted into the initial document exactly once — see `RevealBoot` for why
 * the latch is module scope and why re-emitting on a client navigation would
 * do nothing useful.
 */
let booted = false;

export function ThemeBoot() {
  const [emit] = useState(() => typeof window === "undefined" || !booted);

  useEffect(() => {
    booted = true;
  }, []);

  return emit ? <script dangerouslySetInnerHTML={{ __html: BOOT }} /> : null;
}
