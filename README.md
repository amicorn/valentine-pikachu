# Will you be my Valentine? ft. Pikachu ⚡️💖
**TLDR;** Cute game to ask your crush to be your Valentine, lots of fun things happen when they try to click No (No button runs away from them, Yes button gets bigger, no button says funny text, a system error alert triggers saying the No button is broken (wink wink), etc. happi gifs and music ensure if they click Yes.

By Amy Ouyang. Coded in february 2025, modified to be compatible with github in march 2026.

A high-fidelity, interactive React application featuring a non-deterministic "No" Button Chase mechanic, custom typography, and multi-stage state transitions. This project demonstrates a "No-Build" architecture, leveraging browser-native ESM and standalone Babel transformation for high portability and rapid deployment.

## 🖼 Project gallery & game user flow

| Application Preview | Process & Logic |
| :--- | :--- |
| **Start Screen** <br> ![Start Screen](./screenshots/start%20screen%20desktop.png) | **Step 0: Launch** <br> ![Step 0](./screenshots/step%200%20showing%20app%20start.jpeg) |
| **Question Screen** <br> ![Question Screen](./screenshots/question%20screen%20desktop.png) | **Step 1: Interaction** <br> ![Step 1](./screenshots/step%201%20with%20caption.jpeg) |
| **"Naur" State** <br> ![Naur State](./screenshots/naur%20don't%20click%20me%20desktop.png) | **Step 2: Engagement** <br> ![Step 2](./screenshots/step%202%20with%20caption.jpeg) |
| **Final Error Alert** <br> ![Error Alert](./screenshots/trick%20error%20alert%20desktop.png) | **Step 3: Escalation** <br> ![Step 3](./screenshots/step%203%20with%20caption.jpeg) |
| **Step 4: Persistence** <br> ![Step 4](./screenshots/step%204%20with%20caption.jpeg) | **Step 5: Almost There** <br> ![Step 5](./screenshots/step%205%20with%20caption.jpeg) |
| **Step 6: The Pivot** <br> ![Step 6](./screenshots/step%206%20with%20caption.jpeg) | **Step 7: Completion** <br> ![Step 7](./screenshots/step%207%20with%20caption.jpeg) |

### 🎨 Design & animation process

| Phase | Visualization |
| :--- | :--- |
| **Initial Concept** | ![6 Things Made](./screenshots/6%20things%20i%20made%20for%20valentine's.jpeg) |
| **Drawing Process** | ![Drawing Process](./screenshots/drawing%20process.jpeg) |
| **Frame Animation** | ![Drawing Frames](./screenshots/drawing%20frames%20with%20caption.jpeg) |
| **Animation Workflow** | ![Animation Process](./screenshots/animation%20process.jpeg) |
| **First Animation Draft** | ![First Attempt](./screenshots/first%20attempt%20animation%20with%20caption.jpeg) |
| **Typography Design** | ![Design Font](./screenshots/design%20font%20with%20caption.jpeg) |
| **Loop Engineering** | ![Loop Logic](./screenshots/code%20to%20loop%20animation.jpeg) |


## 🏗 System Architecture

The application is built on a decoupled, modular architecture to ensure a clear separation of concerns without the overhead of heavy bundling tools or complex dependency graphs.

| Layer | Responsibility | Implementation |
| :--- | :--- | :--- |
| **Logic** | Component State & Event Handling | `script.js` (React 18) |
| **Presentation** | Design Tokens & Layout | `styles.css` (CSS3) |
| **Structure** | Dependency Injection & DOM Entry | `index.html` |
| **Assets** | Media & Typography Resources | `/assets` Directory |



## 🧠 Engineering Challenges & Technical Solutions

### 1. Dynamic Stacking Contexts (Z-Index Management)
**Challenge:** As the "Yes" button scales exponentially—reaching scales of up to $3.5x$—it threatened to occlude the "No" button, preventing user interaction and breaking the core game loop.
**Solution:** Implemented a fixed stacking context ($z-index: 999$) for the `noButton` class. This ensures the target remains on the top layer of the rendering engine's paint tree, regardless of the scale or transform applied to adjacent nodes.



### 2. Viewport-Constrained Randomization Algorithm
**Challenge:** Standard `Math.random()` distributions can result in buttons moving off-screen or clipping behind fixed UI headers on varying mobile viewports.
**Solution:** Developed a constrained coordinate generator. The logic restricts movement to a "safe zone" defined by a $15\%$ to $75\%$ range of the container dimensions. This mathematical constraint ensures the button remains within the interactive hit-box of the viewport at all times.

### 3. Asynchronous Audio Synchronization
**Challenge:** Concurrent event triggers (rapid hovering + clicking) can lead to audio clipping, race conditions, or blocked execution in modern browser engines due to strict autoplay policies.
**Solution:** Encapsulated audio playback in a singleton-pattern helper function. By utilizing a `.catch()` block, we gracefully handle "Autoplay Policy" rejections, ensuring the app remains silent rather than throwing unhandled exceptions if the user hasn't interacted with the DOM yet.



## 🛠 Technical Features

* **Reactive Scaling**: The "Yes" button utilizes a linear growth algorithm: 
  $$S_n = S_0 + (n \times 0.35)$$ 
  where $S_n$ is the current scale, $S_0$ is the initial scale (1.0), and $n$ represents the cumulative avoidance count ($moveCount$).
* **Non-Deterministic Movement**: Utilizes `all 0.15s ease-out` transitions to create a responsive, "fleeing" effect that mimics high-performance physics engines.
* **State-Locked Narrative**: The "No" button transition from "fleeing mode" to "dialogue mode" is locked behind a state threshold ($moveCount \ge 9$). Once reached, the CSS transition is set to `none` to permit instantaneous click-handling.
* **System-Level Interrupts**: Integrates native `window.alert` modals to simulate a "System Error" once the narrative cycle ($clickIndex$) is complete, effectively intercepting the main thread for dramatic effect.

## ⚡️ Quick Start

1.  **Clone the Repository**:
    ```bash
    git clone [https://github.com/amicorn/pikachu-valentine.git](https://github.com/amicorn/pikachu-valentine.git)
    ```
2.  **Launch**: Open `index.html` using any static file server (e.g., VS Code Live Server or Python's `http.server`).
3.  **Requirements**: An active internet connection is required to resolve React, ReactDOM, and Babel via the Unpkg CDN at runtime.



## 📉 Performance & Optimization

* **Hardware Acceleration**: Used `transform: translate()` for movement logic to offload rendering to the GPU (Compositor thread), ensuring $60fps$ performance even on low-power mobile devices by avoiding Layout/Paint recalculations.
* **Font Rendering**: Implemented `font-display: swap;` to ensure text remains legible during the asynchronous loading of the custom OTF file.
* **State Batching**: React 18's automatic batching is leveraged to minimize layout thrashing and re-renders during rapid button displacement.
* **Coordinate Calculations**: Used viewport units ($vw/vh$) combined with percentage-based offsets to ensure the mathematical "Safe Zone" is responsive across all aspect ratios ($16:9, 4:3, 21:9$).

---

## 📂 Project Structure

```text
/root
├── index.html          # HTML5 entry point & library initialization
├── styles.css          # UI/UX design tokens & @font-face loading
├── script.js           # React lifecycle & business logic
└── assets/
    ├── fonts/          # AmiCustomFont (OTF)
    ├── audio/          # Swish, Pop, Error, and Yay SFX (MP3)
    └── images/         # Optimized GIF and static assets
