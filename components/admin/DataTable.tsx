'use client'

import { useState, type ReactNode } from 'react'
import TableActions from './TableActions'

interface Column {
  key: string
  label: string
  sortable?: boolean
  type?: 'text' | 'badge' | 'date' | 'status' | 'boolean' | 'slug' | 'number'
  badgeColors?: Record<string, string>
}

interface ActionConfig {
  editHref?: string
  viewHref?: string
  showView?: boolean
}

interface DataTableProps {
  columns: Column[]
  data: any[]
  searchPlaceholder?: string
  emptyMessage?: ReactNode
  actions?: ActionConfig
  onBulkAction?: (selectedIds: string[], action: string) => void
}

function renderCell(value: any, column: Column, row: any) {
  if (value === null || value === undefined) {
    return <span className="text-gray-400">-</span>
  }

  switch (column.type) {
    case 'badge':
      const badgeColor = column.badgeColors?.[value] || 'bg-gray-100 text-gray-800'
      return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${badgeColor}`}>
          {value}
        </span>
      )
    case 'status':
      const statusColors: Record<string, string> = {
        'LIVE': 'bg-green-100 text-green-800',
        'BETA': 'bg-yellow-100 text-yellow-800',
        'DEVELOPMENT': 'bg-blue-100 text-blue-800',
        'Published': 'bg-green-100 text-green-800',
        'Draft': 'bg-gray-100 text-gray-800',
        'Open': 'bg-green-100 text-green-800',
        'Closed': 'bg-gray-100 text-gray-800',
        'NEW': 'bg-yellow-100 text-yellow-800',
        'CONTACTED': 'bg-blue-100 text-blue-800',
        'CONVERTED': 'bg-green-100 text-green-800',
        ...column.badgeColors,
      }
      const color = statusColors[value] || 'bg-gray-100 text-gray-800'
      return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${color}`}>
          {value}
        </span>
      )
    case 'boolean':
      return value ? (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Yes
        </span>
      ) : (
        <span className="text-gray-400">-</span>
      )
    case 'date':
      return (
        <span className="text-sm text-gray-500">
          {new Date(value).toLocaleDateString()}
        </span>
      )
    case 'slug':
      return (
        <div>
          <p className="font-medium text-gray-900">{row[column.key.replace('Slug', 'Name')] || row.name || row.title}</p>
          <p className="text-xs text-gray-500 font-mono">{value}</p>
        </div>
      )
    default:
      return <span className="text-sm text-gray-900">{value}</span>
  }
}

export default function DataTable({
  columns,
  data,
  searchPlaceholder = 'Search...',
  emptyMessage = 'No items found',
  actions,
  onBulkAction,
}: DataTableProps) {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<string[]>([])
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const filteredData = data.filter((row) => {
    if (!search) return true
    return columns.some((col) => {
      const value = row[col.key]
      return value?.toString().toLowerCase().includes(search.toLowerCase())
    })
  })

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0
    const aVal = a[sortColumn]
    const bVal = b[sortColumn]
    if (sortDirection === 'asc') {
      return aVal > bVal ? 1 : -1
    }
    return aVal < bVal ? 1 : -1
  })

  const handleSort = (key: string) => {
    if (sortColumn === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(key)
      setSortDirection('asc')
    }
  }

  const toggleSelectAll = () => {
    if (selected.length === sortedData.length) {
      setSelected([])
    } else {
      setSelected(sortedData.map((row) => row.id))
    }
  }

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      {/* Search and Actions Bar */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>
        </div>
        {selected.length > 0 && onBulkAction && (
          <div className="ml-4 flex items-center space-x-2">
            <span className="text-sm text-gray-700">{selected.length} selected</span>
            <select
              onChange={(e) => {
                onBulkAction(selected, e.target.value)
                setSelected([])
              }}
              className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Bulk Actions</option>
              <option value="delete">Delete</option>
              <option value="publish">Publish</option>
              <option value="unpublish">Unpublish</option>
            </select>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {onBulkAction && (
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selected.length === sortedData.length && sortedData.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                  }`}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {column.sortable && sortColumn === column.key && (
                      <span className="text-primary-600">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {actions && <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (onBulkAction ? 1 : 0) + (actions ? 1 : 0)}
                  className="px-6 py-12 text-center"
                >
                  <div className="text-gray-500">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    {typeof emptyMessage === 'string' ? (
                      <p className="text-lg font-medium">{emptyMessage}</p>
                    ) : (
                      emptyMessage
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              sortedData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  {onBulkAction && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selected.includes(row.id)}
                        onChange={() => toggleSelect(row.id)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm">
                      {renderCell(row[column.key], column, row)}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <TableActions
                        editHref={actions.editHref}
                        viewHref={actions.viewHref}
                        showView={actions.showView}
                        row={row}
                      />
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {sortedData.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{' '}
            <span className="font-medium">{sortedData.length}</span> of{' '}
            <span className="font-medium">{sortedData.length}</span> results
          </div>
          <div className="flex space-x-2">
            <button
              disabled
              className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg cursor-not-allowed"
            >
              Previous
            </button>
            <button
              disabled
              className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
