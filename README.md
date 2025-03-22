# The World's Largest Hackathon Landing Page

A visually stunning, modern, and dynamic landing page for "The World's Largest Hackathon" featuring an impressive Three.js lightning animation.

## Features

- Eye-catching Three.js lightning bolt animation that dynamically strikes on page load
- Smooth scrolling and section animations
- Fully responsive design for all devices
- Interactive elements with hover effects
- Modern, futuristic aesthetic with electric blue theme

## Technologies Used

- HTML5
- SCSS
- JavaScript
- Three.js (for 3D animations)
- GSAP (for smooth animations)
- SplitType (for text animations)

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
├── public/                 # Public assets folder
│   ├── host/               # Host/event branding images
│   ├── judges/             # Judge profile images
│   └── sponsors/           # Sponsor logo images
├── src/
│   ├── styles/
│   │   └── main.scss       # Main stylesheet (SCSS)
│   ├── js/
│   │   ├── main.js         # Main JavaScript file
│   │   └── lib/
│   │       └── LightningEffect.js # Three.js lightning animation
```

## Image Guidelines

### Sponsors
Place sponsor logos in the `public/sponsors/` directory. Use transparent PNG files with white logos for best visibility against the dark background. See the README in that directory for specific filename requirements.

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