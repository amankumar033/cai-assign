/**
 * Filter.jsx — column search filters (collapsed to one row by default)
 */

import { useState } from 'react'

const FILTERS_PER_ROW = 3

function Filter({ headers, filters, onFilterChange }) {
  const [showAllFilters, setShowAllFilters] = useState(false)

  if (!headers || headers.length === 0) {
    return null
  }

  const visibleHeaders = showAllFilters
    ? headers
    : headers.slice(0, FILTERS_PER_ROW)

  const hiddenCount = headers.length - FILTERS_PER_ROW
  const hasMoreFilters = headers.length > FILTERS_PER_ROW

  const clearAllFilters = () => {
    headers.forEach((header) => onFilterChange(header, ''))
  }

  const hasActiveFilters = headers.some((h) => (filters[h] || '').trim())

  return (
    <section className="card">
      <div className="card-header flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="section-title">Filters</h2>
          <p className="section-desc">Search within each column</p>
        </div>
        <div className="flex w-full flex-wrap gap-2 sm:w-auto">
          {hasActiveFilters && (
            <button type="button" onClick={clearAllFilters} className="btn-secondary flex-1 sm:flex-none">
              Clear all
            </button>
          )}
          {hasMoreFilters && (
            <button
              type="button"
              onClick={() => setShowAllFilters((prev) => !prev)}
              className="btn-primary flex-1 sm:flex-none"
            >
              {showAllFilters ? 'Show less' : `Show more (${hiddenCount})`}
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
        {visibleHeaders.map((header) => (
          <div key={header}>
            <label className="mb-1.5 block text-xs font-medium text-zinc-600">
              {header}
            </label>
            <div className="relative">
              <svg
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder={`Search ${header}...`}
                value={filters[header] || ''}
                onChange={(e) => onFilterChange(header, e.target.value)}
                className="w-full rounded-md border border-zinc-200 bg-white py-2.5 pl-10 pr-3 text-sm text-zinc-700 placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>
        ))}
      </div>

      {!showAllFilters && hasMoreFilters && (
        <p className="border-t border-zinc-100 px-4 py-3 text-xs text-zinc-500 sm:px-6">
          Showing {FILTERS_PER_ROW} of {headers.length} columns.
        </p>
      )}
    </section>
  )
}

export default Filter
