# TODO — AI OS 3D Portfolio Redesign

## Phase 1 — App composition & shell

- [x] Update `app/page.tsx` to remove the current section stack and replace the hero entry with a new AI Command Center wrapper (using `components/three/AICoreScene.tsx`).
- [ ] Add AI Command Center overlay UI inside the hero (headline, typing effect, holographic panels) by rewriting `components/sections/Hero.tsx` next.
- [x] Ensure section IDs exist for navigation during Phase 2 (likely reintroduce rewritten sections with matching ids).

## Phase 2 — Hero (AI Command Center)

- [ ] Delete/replace `components/sections/Hero.tsx` with a new AI Command Center experience (no reuse of existing hero layout).
- [ ] Implement headline **SAKTHIVEL R** + subtitle roles with animated typing effect.
- [ ] Add floating holographic UI windows, rings, scan lines UI overlays, cursor light effect.
- [ ] Integrate scene mouse-reactivity with overlay interaction.

## Phase 3 — Background & global visuals

- [ ] Rewrite `components/background/AnimatedBackground.tsx` to match the AI-OS aesthetic.
- [ ] Ensure custom cursor + scroll progress still work; replace if they clash.

## Phase 4 — Sections rewrite (all new)

- [ ] Rewrite `components/sections/About.tsx` (AI identity system)
- [ ] Rewrite `components/sections/Skills.tsx` (3D skill universe; clickable orbs; neural connections)
- [ ] Rewrite `components/sections/Experience.tsx` (holographic journey; scroll-driven)
- [ ] Rewrite `components/sections/Education.tsx` (knowledge graph)
- [ ] Rewrite `components/sections/Projects.tsx` (3D project islands + cinematic transitions + preview)
- [ ] Rewrite `components/sections/Certifications.tsx` (certificate vault)
- [ ] Rewrite `components/sections/Achievements.tsx` (trophy vault + unlock animations)
- [ ] Rewrite `components/sections/Resume.tsx` (AI resume terminal)
- [ ] Rewrite `components/sections/Contact.tsx` (futuristic communication terminal)
- [ ] Rewrite `components/sections/Footer.tsx` (constellation footer)

## Phase 5 — UI primitives & navigation

- [ ] Rewrite `components/ui/Navbar.tsx` into floating glass navigation with magnetic hover + liquid underline + section preview.

## Phase 6 — Quality gates

- [ ] Run `npm run lint`
- [ ] Run `npm run build`
- [ ] Validate responsive + reduced-motion
- [ ] Fix TypeScript/ESLint issues until clean
