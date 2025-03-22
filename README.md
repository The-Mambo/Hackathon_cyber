# The World's Largest Hackathon Landing Page - Retro Computing Edition

A visually stunning, retro-computing themed landing page for "The World's Largest Hackathon" featuring vintage CRT effects and a nostalgic 8-bit aesthetic.

## Features

- Authentic CRT screen effects with scan lines and color distortion
- Retro computing aesthetic with pixel fonts and 8-bit design elements
- Fully responsive design for all devices
- Interactive elements with hover effects
- Nostalgic aesthetic with classic computing color palette

## Technologies Used

- HTML5
- SCSS
- JavaScript
- Three.js (for 3D animations)
- GSAP (for smooth animations)
- SplitType (for text animations)
- Vite (for development and build)

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher recommended)
- npm (v6.0.0 or higher recommended)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/worlds-largest-hackathon.git
cd worlds-largest-hackathon
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173/`

## Project Structure

```
/
├── index.html              # Main HTML file
├── package.json            # Project dependencies and scripts
├── vite.config.js          # Vite configuration
├── public/                 # Public assets folder
│   ├── host/               # Host/event branding images
│   ├── judges/             # Judge profile images
│   └── sponsors/           # Sponsor logo images
├── src/
│   ├── assets/             # Additional assets
│   ├── styles/
│   │   └── main.scss       # Main stylesheet (SCSS)
│   ├── js/
│   │   ├── main.js         # Main JavaScript file
│   │   └── lib/
│   │       └── LightningEffect.js # Three.js animation effects
```

## Image Guidelines

### Sponsors
Place sponsor logos in the `public/sponsors/` directory. Use transparent PNG files with logos that match the retro computing theme for best visibility. See the README in that directory for specific filename requirements.

### Judges
Place judge profile images in the `public/judges/` directory. Use square aspect ratio images (1:1) with minimum dimensions of 300x300px. See the README in that directory for specific filename requirements.

### Host/Event Branding
Place event branding images in the `public/host/` directory. This includes the main logo, favicon, and social sharing images. See the README in that directory for specific requirements.

## Building for Production

To build the project for production, run:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Customization

- Edit the event details in the `index.html` file
- Modify colors and styles in the `src/styles/main.scss` file
- Adjust animations and effects in the `src/js/main.js` file

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
