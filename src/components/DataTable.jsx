/**
 * DataTable.jsx — paginated table with Load more / Show all
 */

import { useState } from 'react'

const ROWS_PER_PAGE = 50

function DataTable({ headers, rows }) {
  const [visibleCount, setVisibleCount] = useState(ROWS_PER_PAGE)

  if (!headers || headers.length === 0) {
    return (
      <section className="card">
        <div className="flex flex-col items-center px-4 py-12 text-center sm:px-6 sm:py-16">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-400">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="font-medium text-zinc-700">No data to display</p>
          <p className="mt-1 max-w-sm text-sm text-zinc-500">
            Upload a CSV file to preview rows and columns here.
          </p>
        </div>
      </section>
    )
  }

  if (rows.length === 0) {
    return (
      <section className="card">
        <div className="px-6 py-12 text-center">
          <p className="font-medium text-zinc-700">No matching rows</p>
          <p className="mt-1 text-sm text-zinc-500">
            Adjust or clear your filters to see results.
          </p>
        </div>
      </section>
    )
  }

  const visibleRows = rows.slice(0, visibleCount)
  const hasMoreRows = visibleCount < rows.length
  const remainingRows = rows.length - visibleCount
  const showingAll = visibleCount >= rows.length

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ROWS_PER_PAGE)
  }

  const handleShowAll = () => {
    setVisibleCount(rows.length)
  }

  const handleShowLess = () => {
    setVisibleCount(ROWS_PER_PAGE)
  }

  return (
    <section className="card">
      <div className="card-header flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="section-title">Data table</h2>
          <p className="section-desc">
            {headers.length} columns · {rows.length} rows
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50">
              {headers.map((header) => (
                <th
                  key={header}
                  className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-600"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {visibleRows.map((row, rowIndex) => (
              <tr key={rowIndex} className="bg-white transition-colors hover:bg-zinc-50/80">
                {headers.map((header) => (
                  <td
                    key={header}
                    className="max-w-xs truncate whitespace-nowrap px-4 py-3 text-zinc-600"
                    title={String(row[header] ?? '')}
                  >
                    {row[header] ?? '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-zinc-200 bg-zinc-50/60 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-center text-sm text-zinc-600 sm:text-left">
          Showing <span className="font-medium text-zinc-800">{visibleRows.length}</span> of{' '}
          <span className="font-medium text-zinc-800">{rows.length}</span> rows
        </p>

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
          {hasMoreRows && (
            <>
              <button type="button" onClick={handleLoadMore} className="btn-secondary w-full sm:w-auto">
                Load more ({Math.min(remainingRows, ROWS_PER_PAGE)})
              </button>
              <button type="button" onClick={handleShowAll} className="btn-outline w-full sm:w-auto">
                Show all ({rows.length})
              </button>
            </>
          )}
          {showingAll && rows.length > ROWS_PER_PAGE && (
            <button type="button" onClick={handleShowLess} className="btn-primary w-full sm:w-auto">
              Show first {ROWS_PER_PAGE}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export default DataTable
