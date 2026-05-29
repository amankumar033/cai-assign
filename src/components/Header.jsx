/**
 * Header.jsx — site navigation bar (fixed at top)
 */

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200/80 bg-white/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:py-3.5 sm:px-6 lg:px-8">
        {/* Left side - Logo/Brand */}
        <div className="flex items-center gap-3">
           <img src="/csv.png" alt="CSV Viewer" className="w-10 h-10" />
     
          <div>
            <h1 className="text-base font-semibold text-zinc-800 sm:text-lg">CSV Viewer</h1>
            <p className="hidden text-xs text-zinc-500 md:block">
              Spreadsheet preview &amp; search
            </p>
          </div>
        </div>

        {/* Center - Navigation */}
        <nav className="hidden items-center gap-6 text-sm text-zinc-600 md:flex">
          <span className="cursor-pointer font-medium text-indigo-600 transition-colors hover:text-indigo-700">
            Workspace
          </span>
          <span className="cursor-pointer transition-colors hover:text-zinc-800">
            Documentation
          </span>
        </nav>

        {/* Right side - User account */}
        <div className="flex items-center gap-3">
         

          
          {/* Avatar / User Icon */}
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 transition-colors hover:bg-indigo-200">
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              stroke="none"
              aria-hidden="true"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </button>
          <div>
            <p className="text-sm text-zinc-600">Demo User's Account</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header