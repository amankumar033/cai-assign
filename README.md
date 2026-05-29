# CSV Viewer

A React Vite client-side web app for uploading, previewing, filtering, and exploring CSV files. Built with React and Vite. All parsing and filtering runs in your browser—nothing is sent to a server.

## Features

- **Drag & drop upload** — Click or drop a `.csv` file to load it instantly
- **Dataset overview** — See total rows, column count, and displayed/matching rows at a glance
- **Column filters** — Search within any column; filters combine (all must match)
- **Paginated table** — View data in pages of 50 rows with Load more / Show all controls
- **Responsive layout** — Upload and overview sit side by side on desktop; stack on mobile
- **Privacy-first** — Files are read locally with the File API; no backend or cloud storage

## Tech stack

| Layer        | Technology        |
| ------------ | ----------------- |
| UI           | React 19          |
| Build tool   | Vite 8            |
| Styling      | Tailwind CSS 4    |
| CSV parsing  | [Papa Parse](https://www.papaparse.com/) |

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (20+ recommended)

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

### Production build

```bash
npm run build
npm run preview
```

`npm run build` outputs static files to `dist/`. Serve that folder with any static host, or use `npm run preview` to test the build locally.

### Lint

```bash
npm run lint
```

## How to use

1. **Upload** — Drag a CSV onto the upload area or click to browse. Only `.csv` files are accepted.
2. **Review overview** — After a successful load, the right panel shows row and column counts.
3. **Filter** — Use the search boxes under each column name. Active filters reduce the “Displayed rows” count.
4. **Browse the table** — Scroll horizontally for wide files. Use **Load more** or **Show all** for large datasets.
5. **Replace or remove** — Use **Replace file** or **Remove file** in the upload card to start over.

## Project structure

```
src/
├── App.jsx              # Main state: parse CSV, filters, layout
├── main.jsx             # React entry point
├── index.css            # Tailwind + shared UI classes
└── components/
    ├── Header.jsx       # Top navigation bar
    ├── Footer.jsx       # Page footer
    ├── FileUpload.jsx   # Drag-and-drop file input
    ├── StatsPanel.jsx   # Overview metrics
    ├── Filter.jsx       # Per-column search filters
    └── DataTable.jsx    # Paginated data table
```

## Configuration notes

- **Rows per page** — Default is 50 (`ROWS_PER_PAGE` in `DataTable.jsx`).
- **Visible filters** — First 3 columns shown by default; use **Show more** for the rest (`Filter.jsx`).
- **Max content width** — Desktop layout uses `max-w-[1600px]` (see `.page-container` in `index.css`).

## License

Private / educational use unless otherwise specified.
