/**
 * App.jsx — main container for the CSV Viewer
 */

import { useState } from 'react'
import Papa from 'papaparse'
import Header from './components/Header'
import Footer from './components/Footer'
import FileUpload from './components/FileUpload'
import StatsPanel from './components/StatsPanel'
import Filter from './components/Filter'
import DataTable from './components/DataTable'
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [headers, setHeaders] = useState([])
  const [filters, setFilters] = useState({})

  const handleFileLoad = (csvText) => {
    if (!csvText) {
      setData([])
      setHeaders([])
      setFilters({})
      return
    }

    const result = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    })

    if (result.data && result.data.length > 0) {
      setData(result.data)
      setHeaders(Object.keys(result.data[0]))
      setFilters({})
    } else {
      setData([])
      setHeaders([])
    }
  }

  const handleFilterChange = (column, value) => {
    setFilters((prev) => ({
      ...prev,
      [column]: value,
    }))
  }

  const getFilteredRows = () => {
    return data.filter((row) => {
      return headers.every((header) => {
        const searchText = (filters[header] || '').trim().toLowerCase()
        if (!searchText) return true
        const cellValue = String(row[header] ?? '').toLowerCase()
        return cellValue.includes(searchText)
      })
    })
  }

  const filteredRows = getFilteredRows()
  const activeFilterCount = Object.values(filters).filter((v) => v.trim()).length
  const hasData = headers.length > 0

  return (
    <div className="flex min-h-screen flex-col bg-zinc-100">
      <Header />

      <main className="page-main">
        <div className="space-y-4 pt-8 sm:space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 md:items-stretch">
            <FileUpload onFileLoad={handleFileLoad} dataReady={hasData} />
            <StatsPanel
              totalRows={data.length}
              columnCount={headers.length}
              displayedRows={hasData ? filteredRows.length : 0}
              activeFilterCount={activeFilterCount}
              hasData={hasData}
            />
          </div>

          {hasData && (
            <>
              <Filter
                key={headers.join('|')}
                headers={headers}
                filters={filters}
                onFilterChange={handleFilterChange}
              />
              <DataTable key={headers.join('|')} headers={headers} rows={filteredRows} />
            </>
          )}

          {!hasData && <DataTable headers={[]} rows={[]} />}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
