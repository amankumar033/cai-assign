/**
 * FileUpload.jsx — drag-and-drop CSV upload
 */

import { useRef, useState } from 'react'

function FileUpload({ onFileLoad, dataReady = false }) {
  const [isDragging, setIsDragging] = useState(false)
  const [fileName, setFileName] = useState(null)
  const inputRef = useRef(null)

  const processFile = (file) => {
    if (!file.name.toLowerCase().endsWith('.csv')) {
      alert('Please upload a CSV file (.csv)')
      return
    }

    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = (e) => onFileLoad(e.target.result)
    reader.readAsText(file)
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (!file) return
    processFile(file)
    event.target.value = ''
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) processFile(file)
  }

  const handleReset = () => {
    setFileName(null)
    onFileLoad(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  const openFilePicker = () => inputRef.current?.click()

  const isLoaded = Boolean(fileName)
  const isSuccess = fileName && dataReady

  return (
    <section className="card flex h-full flex-col">
      <div className="card-header flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="section-title">Upload file</h2>
          <p className="section-desc">
            {isSuccess
              ? 'Your spreadsheet is loaded and ready'
              : isLoaded
                ? 'File selected — waiting for valid data'
                : 'Select or drag a .csv file to begin'}
          </p>
        </div>
        {isSuccess && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            <svg className="h-3.5 w-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            Loaded
          </span>
        )}
        {isLoaded && !isSuccess && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
            No data
          </span>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="hidden"
        aria-hidden="true"
      />

      <div className="flex flex-1 flex-col p-4 sm:p-6">
        {fileName ? (
          <div
            className={`flex min-h-[200px] flex-1 flex-col rounded-xl border bg-white p-5 sm:p-6 ${
              isSuccess
                ? 'border-emerald-200/80 shadow-sm shadow-emerald-100/50'
                : 'border-amber-200/80 bg-amber-50/20'
            }`}
          >
            <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
              <div
                className={`mb-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl shadow-sm ring-1 sm:mb-0 sm:mr-5 ${
                  isSuccess
                    ? 'bg-emerald-50 text-emerald-600 ring-emerald-100'
                    : 'bg-amber-50 text-amber-600 ring-amber-100'
                }`}
              >
                {isSuccess ? (
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className={`text-lg font-semibold ${
                    isSuccess ? 'text-zinc-800' : 'text-amber-900'
                  }`}
                >
                  {isSuccess ? 'File loaded successfully' : 'Could not read data'}
                </p>
                <p className="mt-1 text-sm text-zinc-500">
                  {isSuccess
                    ? 'Scroll down to filter and explore your table.'
                    : 'The file may be empty or not formatted as CSV with headers.'}
                </p>

                <div className="mt-4 flex items-center gap-3 rounded-lg border border-zinc-100 bg-zinc-50/80 px-4 py-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                      isSuccess
                        ? 'bg-emerald-100/80 text-emerald-600'
                        : 'bg-amber-100/80 text-amber-600'
                    }`}
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="truncate text-sm font-medium text-zinc-800" title={fileName}>
                      {fileName}
                    </p>
                    <p className="text-xs text-zinc-500">.csv spreadsheet</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-2 pt-6 sm:flex-row">
              <button type="button" onClick={openFilePicker} className="btn-secondary w-full sm:w-auto">
                Replace file
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="btn-link w-full py-2 text-center sm:w-auto sm:py-0"
              >
                Remove file
              </button>
            </div>
          </div>
        ) : (
          <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={openFilePicker}
            onKeyDown={(e) => e.key === 'Enter' && openFilePicker()}
            role="button"
            tabIndex={0}
            className={`
              relative flex min-h-[200px] flex-1 cursor-pointer flex-col items-center justify-center
              rounded-xl border-2 border-dashed transition-all
              ${
                isDragging
                  ? 'border-indigo-400 bg-indigo-50/40'
                  : 'border-zinc-300 bg-zinc-50/50 hover:border-zinc-400 hover:bg-zinc-50'
              }
            `}
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-zinc-400 shadow-sm ring-1 ring-zinc-200">
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>

            <p className="px-4 text-center font-medium text-zinc-700">
              {isDragging ? 'Drop your CSV here' : 'Drag & drop your CSV here'}
            </p>
            <p className="mt-1 text-sm text-zinc-500">or click to browse files</p>
            <p className="mt-3 rounded-full bg-zinc-200/60 px-3 py-1 text-xs text-zinc-600">
              .csv only
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default FileUpload
