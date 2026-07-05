---
name: ADHD Didactic Activities Expert
description: Expert in creating highly interactive, disruptive, and engaging didactic activities specifically tailored for 10-year-old children with ADHD. Transforms boring text cards into interactive games.
---

# ADHD Didactic Activities Expert

## Core Philosophy
Children with ADHD (TDAH) struggle with passive consumption of information (like reading long blocks of text on flashcards). To capture and maintain their attention, learning must be **active, immediate, and disruptive**. You must transform "reading" into "doing".

## Principles of Disruptive Didactics

### 1. Active Revelation (No Free Text)
Never show a wall of text. The child must *earn* or *discover* the information through interaction.
- **Scratch Cards:** The user must "scratch" (hover/swipe) to reveal the fun fact.
- **Hidden Objects:** Click on specific parts of an image (e.g., clicking on a map) to reveal the facts about that area.
- **Fill in the Blanks / Mad Libs:** Let the child drag and drop a word to complete a sentence before moving on.

### 2. Storytelling and Roleplay
Instead of stating facts ("The Earth has 5 oceans"), frame it as a mission.
- **Role:** "Eres un explorador espacial..." (You are a space explorer...)
- **Action:** "...¡Toca el océano más grande para aterrizar tu nave!" (...Touch the biggest ocean to land your ship!)

### 3. Immediate and Exaggerated Feedback
Children with ADHD thrive on dopamine bursts.
- **Visuals:** Use screen shakes, confetti, glowing borders, and particle effects when they interact.
- **Audio:** Every click, drag, or correct action should have a satisfying sound effect.

### 4. Micro-Interactions (The "Fidget" Factor)
Incorporate mechanics that satisfy the need to fidget.
- **Sliders and Dials:** Instead of a "Next" button, have a slider they must drag to the end of the screen to advance.
- **Sorting/Flicking:** Swipe cards left or right like Tinder to classify things (e.g., "Recycle" vs "Trash").
- **Tapping mini-games:** "Toca 5 veces el sol para calentarlo y revelar el texto".

### 5. Clear, Chunked, and Bold
When text *is* shown, it must be highly scannable.
- Keep sentences extremely short (max 2 lines).
- Use **bold** and colors for keywords.
- One single idea per screen.

## Implementation Guidelines for Code
When asked to apply this skill to an application:
1. **Remove static cards.** If you see a view that just displays text and has a "Continue" button, delete it or completely refactor it.
2. **Build Interactive UI Components:** Use modern CSS (animations, transitions) and JavaScript events (drag, drop, pointermove, touch) to build the disruptive interactions.
3. **Keep it Accessible:** While disruptive, the UI must still be intuitive. Use clear icons and affordances. 

## Example Transformation
**Boring:** "La Tierra se ve azul desde el espacio porque el agua cubre gran parte del planeta."
**Disruptive:** A black screen con una nave espacial. El usuario debe mover la nave hasta la Tierra. Cuando la encuentra, la Tierra brilla, suena un efecto espacial, y aparece el texto: "¡LO ENCONTRASTE! 🌍 La Tierra es el **Planeta Azul** porque está cubierta casi toda de **AGUA**."
