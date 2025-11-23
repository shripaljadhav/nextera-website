'use client'

import Link from 'next/link'

interface TableActionsProps {
  editHref?: string
  viewHref?: string
  showView?: boolean
  deleteAction?: () => void
  row: any
}

export default function TableActions({ editHref, viewHref, showView, deleteAction, row }: TableActionsProps) {
  return (
    <>
      {editHref && (
        <Link
          href={editHref.replace('[id]', row.id)}
          className="text-primary-600 hover:text-primary-700 font-medium mr-4"
        >
          Edit
        </Link>
      )}
      {viewHref && showView && (
        <a
          href={viewHref.replace('[slug]', row.slug || row.id).replace('[id]', row.id)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          View
        </a>
      )}
      {deleteAction && (
        <button
          onClick={() => deleteAction()}
          className="text-red-600 hover:text-red-700 font-medium ml-4"
        >
          Delete
        </button>
      )}
    </>
  )
}

