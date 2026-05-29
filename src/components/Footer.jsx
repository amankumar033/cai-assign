/**
 * Footer.jsx — simple site footer for a complete page layout
 */

function Footer() {
  return (
    <footer className="mt-10 border-t border-zinc-200 bg-white sm:mt-16">
      <div className="page-container flex flex-col items-center justify-between gap-3 px-4 py-6 text-center text-sm text-zinc-500 sm:px-5 sm:py-8 md:flex-row md:text-left lg:px-6">
        <p>© {new Date().getFullYear()} CSV Viewer. Built with React &amp; Vite.</p>
        <p className="text-zinc-400">
          Your data stays in the browser — nothing is uploaded to a server.
        </p>
      </div>
    </footer>
  )
}

export default Footer
