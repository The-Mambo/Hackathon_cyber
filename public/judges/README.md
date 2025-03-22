# Judge Profile Images

Place judge profile images in this directory. The recommended format is:

- JPG format
- Square aspect ratio (1:1)
- Minimum dimensions: 300x300px (recommended: 500x500px)
- Filenames should match the HTML references (all lowercase):
  - pieter.jpg
  - logan.jpg
  - sarah.jpg
  - theo.jpg
  - evan.jpg
  - kp.jpg
  - alex.jpg
  - ben.jpg

**Note**: When referencing these files in HTML, use paths starting with "/" (e.g., "/judges/theo.jpg") as Vite serves the public directory at the root path.

Images will be displayed in a circular crop with a green pixel border. 