# CSV Viewer

A simple React app to upload, view, and filter CSV files. Built with Vite, React, PapaParse, and Tailwind CSS.

## Project structure

```
src/
  components/
    Header.jsx      — App title and description
    FileUpload.jsx  — File picker; reads CSV as text
    Filter.jsx      — Per-column search inputs
    DataTable.jsx   — Table display
  App.jsx           — State, parsing, filtering logic
  App.css
  main.jsx          — React entry point
```

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

Try uploading `public/sample.csv` to test the app.

## Deploy

Production build (verified):

```bash
npm run build
```

Output is in the `dist/` folder. Deploy that folder to any static host:

- **Vercel / Netlify**: Connect the repo; build command `npm run build`, publish directory `dist`
- **GitHub Pages**: Set `base` in `vite.config.js` if using a project subpath (e.g. `/repo-name/`)
- **Preview locally**: `npm run preview`

## How it works (brief)

1. **FileUpload** reads the selected file and passes CSV text to **App**.
2. **App** uses PapaParse to convert CSV into an array of row objects.
3. **Filter** lets you type search text per column; **App** filters rows before passing them to **DataTable**.
4. **DataTable** renders headers and matching rows in a table.
