# Aritra Biswas — UI/UX Portfolio

An editorial, motion-led portfolio exploring interaction, visual rhythm and interface thinking. Built with HTML, CSS and JavaScript.

## Run locally
1. Download or clone this repository.
2. Keep `index.html`, `style.css`, `script.js` and the `assets` folder together.
3. Open `index.html` in a modern browser. A local development server (such as VS Code Live Server) is recommended.

## Project structure
- `index.html` — page content and portfolio sections
- `style.css` — layout, typography, responsive styles and color system
- `script.js` — scroll interactions, canvas grid and motion effects
- `assets/photo.jpg` — profile photograph

## Design direction
The warm paper background, ink-like typography, muted botanical green and restrained vermilion accent create an editorial feel rather than a conventional dark, neon-heavy tech aesthetic. Color is used with intention: green supports calm interface states, vermilion highlights key moments, and the ochre tone adds warmth. Large serif headlines are balanced with compact sans-serif labels to create hierarchy.

## Personalise
Edit the profile details, project copy and social links in `index.html`. Replace `assets/photo.jpg` with your own image using the same filename. Update the color variables at the top of `style.css` to adjust the palette.

## Notes
The VoiceGuard AI section describes my contribution as UI/UX design only. AI, voice-processing, electronics and backend work are not claimed as my individual work. Google Fonts and the Three.js library are loaded from CDNs, so an internet connection is needed for those enhancements. The page remains readable if the external 3D library is unavailable.

### Performance and smooth motion
The portfolio uses a lighter animation workload on smaller screens, capped device-pixel rendering for the canvas and 3D scene, frame-rate-aware easing, and pauses animation work when the browser tab is hidden. Smooth scrolling respects the operating system's reduced-motion preference.
