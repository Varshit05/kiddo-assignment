# Kiddo - Server-Driven UI (SDUI) Mobile Homepage Renderer

Kiddo is a high-performance, production-ready, configuration-driven React Native homepage renderer built with Expo. The project is designed with a Server-Driven UI (SDUI) architecture to allow live campaign hot-swapping and layout styling shifts with zero App Store / Play Store release cycles.

---

## Key Features

*   **Server-Driven UI (SDUI) Engine**: Ingests JSON layout configurations dynamically and maps them securely using a registry mapping (Factory Pattern) to native layout components.
*   **Live Campaign Hot-Swaps**: Supports instant switching between distinct campaigns (Default, Back to School, Summer Playhouse, Mystery Gift) each with its own remote theme configuration, layout blocks, and overlays.
*   **Virtualization & High Performance**: Utilizes `@shopify/flash-list` for the vertical homepage feed, featuring React.memo boundaries, stable key extractors, and optimized horizontal carousel virtualization boundaries to maintain high frame-rate rendering.
*   **Defensive Structural Resilience**: Gracefully drops unsupported component nodes and handles rendering exceptions locally to prevent app crashes and maintain total layout feed stability.
*   **Universal Action Dispatcher**: Decouples presentation blocks from business logic via a centralized `handleAction` coordinator supporting deep links, cart additions, and campaign events.
*   **OTA Theme Context Provider**: Maps incoming server theme configurations explicitly into a React Context Provider to dynamically shifts styling (buttons, margins, backgrounds) globally or locally.
*   **Local State Collocation**: Leverages Zustand to support real-time cart mutations. Subscribes granularly to state updates to ensure adding/removing items only re-renders the specific product card, leaving other 30+ blocks untouched.
*   **Screen-Level Campaign Overlays**: Renders full-screen Lottie/WebP visual assets using `pointerEvents="none"`, allowing users to fully interact, slide, and click elements underneath without input occlusion.

---

## Project Structure

```text
kiddo/
├── App.tsx                   # Main Entrypoint containing Developer Telemetry Console
├── app.json                  # Expo App configuration
├── index.ts                  # App registry registration
├── tsconfig.json             # TypeScript config (Strict Mode Enabled)
├── package.json              # App dependency configuration
└── src/
    ├── api/
    │   └── mockData.ts       # Mock payloads for multiple campaign environments
    ├── types/
    │   └── sdui.types.ts     # TypeScript interface definitions for SDUI actions, components & themes
    ├── context/
    │   └── ThemeContext.tsx  # Dynamic OTA structural theme context provider
    ├── store/
    │   └── useCartStore.ts   # Zustand store for decoupled cart state management
    ├── overlays/
    │   └── CampaignOverlay.tsx# Click-through full-screen Lottie/WebP animation overlay
    ├── engine/
    │   ├── ComponentRegistry.tsx # Component Factory Registry & Defensive Resilience Handler
    │   ├── SDUIFeedRenderer.tsx  # High Frame-Rate FlashList renderer
    │   └── ActionDispatcher.ts   # Centralized action router (Add to Cart, Deep links, coupons)
    └── components/
        ├── BannerHero.tsx        # Fluid promotional banner hero component
        ├── ProductGrid2x2.tsx    # Balanced 2x2 grid layout block
        ├── DynamicCollection.tsx # Horizontal scrolling carousel with local theming context
        ├── SpecialEventBooking.tsx# Campaign event ticketing component
        └── common/
            ├── ProductCard.tsx   # Granularly subscribed product card component
            └── SectionHeader.tsx # Semantic title & subtitle component
```

---


## Performance Telemetry & Inspection

To verify the strict engineering constraints during evaluations, the app features a **Developer Telemetry Console** at the bottom of the interface along with live **Render Count Badges**:
1.  **Feed Renders**: Displays the render count of the master vertical layout feed.
2.  **Carousel / Grid Renders**: Shows render counts for layout rows.
3.  **Renders (Product Card)**: Shows render count for each specific card instance.
*   *Validation Check*: Mutating the quantity on a single card (via ADD / +/- controllers) will increment **only** that specific product card's badge. Parent lists and surrounding cards will bypass rendering entirely and remain at `Renders: 1`.

---

## Getting Started

### Prerequisites
Ensure you have Node.js and npm installed on your system.

### Installation
1.  Clone the repository and navigate to the project directory:
    ```bash
    cd kiddo
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Project
Start the Expo development server:
```bash
npm start
```
From the interactive terminal interface:
*   Press **`a`** to launch on an Android emulator or device.
*   Press **`i`** to launch on an iOS simulator or device.
*   Press **`w`** to open and run in a web browser.
*   Scan the QR code with the Expo Go app on iOS/Android to run on a physical device.

