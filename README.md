# Luxury Christian Wedding Invitation Website
### Chi. Sow. Sravanthi (Vissakoti Family) & Chi. John Wesley

An elegant, mobile-first, responsive luxury wedding invitation website designed for the Christian Holy Matrimony of **Chi. Sow. Sravanthi** and **Chi. John Wesley** on **November 26, 2026**.

---

## Features & Design
1. **Cinematic Opening Video & Minimalist Gate**:
   - Opens with a clean, focused gate displaying solely the centered golden **"Tap to Open"** seal.
   - Tapping anywhere on the screen or touching the seal plays the opening video uninterrupted.
2. **High-Resolution Card Background (`wedding_card_bg.jpg`)**:
   - Once the video completes, the site smoothly transitions to the **crisp, authentic high-resolution wedding card background**.
   - Includes real draped lilac velvet curtains, lace valance with tassel accents, soft bokeh lighting, and delicate lavender & ivory roses framing the screen.
   - **Zero Blur**: The blur effect was completely removed per instructions, so every lace and floral detail is 100% sharp, vivid, and pristine.
   - **Zoomed for Full-Bleed Edge Framing**: Scaled up slightly (`scale(1.06)`) to eliminate letterboxing and frame the screen.
3. **First Page ("Vissakoti's Invite" & Golden Heart Connection)**:
   - When the video finishes, the first screen enters with a majestic **pull from bottom** animation (`@keyframes pullUpFromBottom`).
   - Clean, minimalist, high-impact layout:
     - The Holy Cross `✝`
     - **"Vissakoti's Invite"**: Main large display title rendered in metallic golden shine and shimmering reflection.
     - Filigree diamond crest accent
     - **Chi. Sow. Sravanthi & Chi. John Wesley**: Rendered in the rich imperial plum color with a continuous crystalline royal shine sweep animation across both names.
     - **Golden Heart Symbol**: Gentle beating golden heart icon connecting the couple
     - **Ambient Romantic Backdrop Behind Text (`couple_bouquet.webp`)**: Positioned in the Z-axis directly behind the first page text and above the wedding card background. Softly blurred (`blur(3.5px)`), blended with feathered edges and multiply opacity so the golden title and calligraphy names sit crisply in the foreground while the couple and red rose bouquet subtly illuminate the parchment behind them.
     - Bouncing indicator at the bottom: *"Scroll for Celebration Details ⌄"*
4. **Scrolled Details Experience (Continuous Vertical Scroll)**:
   - Scrolling down smoothly unlocks the rest of the celebration experience:
     - **Section 2**: Wedding Date (Thursday, Nov 26, 2026), Time (10:00 AM IST onwards), Lunch Feast, Live Real-Time Countdown Timer & Add to Calendar.
     - **Section 3**: Holy Scripture (*Ecclesiastes 4:9, 12* and *Mark 10:9*) and **Interactive Heart Scratch Card**:
       - Romantic heart-shaped photo frame underneath the Holy Scripture featuring the couple portrait (`couple_heart.webp`).
       - Overlaid with an interactive HTML5 Canvas champagne-gold scratch foil adorned with `✝`, *"SCRATCH TO REVEAL"*, and *"The Couple"*.
       - Guests scratch with finger (touch on mobile) or cursor (mouse drag on desktop) to reveal the portrait.
       - Crossing ~36% scratch threshold smoothly dissolves the remaining foil, fires celebratory confetti, and illuminates the couple's names with a *"Revealed with Love ✦"* badge.
     - **Section 4**: Wedding Venue at Bride's Home (Vissakoti Residence) & Open in Google Maps.
     - **Section 5**: Numbers 6:24-25 Benediction, Vissakoti Family signature, **Oreo's Special Invitation** (square shiny gold frame with caption: *"-A cute and special invitation from Oreo 🐾🤍"*), and Back to Top button.
   - Each section glides up and fades in cleanly with scroll-driven reveal animations (`IntersectionObserver`).
5. **Zero-Card Blended Typography (Stationery Card Integration)**:
   - **Zero cards, boxes, or white containers**.
   - Text is set in deep imperial plum (`#361044`) and warm antique gold (`#8c5d18`) with soft pearl highlights, matching the royal Christian stationery look.
   - Text is centered in the open parchment corridor (`max-width: 380px`), keeping the lace at the top and floral clusters at the sides and bottom unobstructed.
5. **Bride's Family Perspective**:
   - Specially framed as an invitation from the **Vissakoti Family** for their beloved daughter.
6. **Christian Wedding Theme**:
   - Biblical verses (*Ecclesiastes 4:9, 12* and *Mark 10:9*), Christian crosses `✝`, and holy matrimony blessings.
   - Strictly zero emojis — classical typography only.
   - Aesthetic matched with the video: royal lavender, deep plum, soft lilac, ivory, and champagne gold.
8. **Wedding Date & Time**:
   - Thursday, November 26, 2026 from 10:00 AM onwards, followed by celebratory lunch.
9. **Venue & Google Maps Integration**:
   - Set at Bride's Residence, ready for the Google Maps link to be dropped in.
10. **Live Floating Countdown Timer & Add to Calendar**:
    - Real-time countdown to Nov 26, 2026 10:00 AM with floating gold numerals (zero boxes).
    - Instant "Add to Google Calendar" button.
11. **Background Music & Sound Effects**:
    - Built-in elegant wedding melodies / ambient sound toggle with SVG controls.
12. **Continuous Falling Lavender Petals & Toggle Control**:
    - Delicate, realistic lavender flower petals gently tumbling, swaying, and drifting down across the screen with natural 3D tilt physics and soft lavender hues.
    - Floating circular toggle button in the control panel allows guests to easily pause or resume the falling petals effect.

---

## 📁 Project Structure
```
WeddingInvite/
├── index.html                 # Main website
├── README.md                  # Project documentation & editing guide
├── css/
│   └── style.css              # Luxury lavender & gold styles
├── js/
│   └── main.js                # Video controller, countdown, RSVP, music
├── assets/
│   ├── images/
│   │   ├── wedding_card_bg.jpg # High-resolution revealed background image
│   │   ├── couple_heart.webp   # Couple portrait for heart scratch card
│   │   ├── couple_bouquet.webp # First page romantic blurred bouquet vignette
│   │   └── oreo.webp           # Oreo's special invitation photo
│   └── fonts/                 # Custom typography (if offline)
├── couple_bouquet.webp        # First page vignette (root copy)
├── couple_heart.webp          # Couple portrait (root copy)
├── oreo.webp                  # Oreo photo (root copy)
├── wedding_card_bg.jpg        # Root copy of background image
└── weddinginvitecard.mp4      # Background opening video asset
```

---

## 🛠️ How to Customize

### 1. Google Maps Venue Location
Connected to the Vissakoti Residence at coordinates `16.9538734, 81.8224046`:
```html
<a href="https://www.google.com/maps?q=16.9538734,81.8224046&amp;z=17&amp;hl=en" target="_blank" class="btn-royal-gold">Open in Google Maps</a>
```

### 2. Updating Photos & Family Details
- Replace placeholder avatars or add photos to `assets/images/`.
- Edit the parent names or family members in the **Vissakoti Family Invitation Message** section in `index.html`.

