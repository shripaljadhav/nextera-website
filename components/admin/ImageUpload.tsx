'use client'

import { useState } from 'react'

interface ImageUploadProps {
  value: string[]
  onChange: (urls: string[]) => void
  label?: string
  helpText?: string
  maxImages?: number
}

export default function ImageUpload({ value, onChange, label = 'Images', helpText, maxImages = 10 }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setError('')
    setUploading(true)

    try {
      const uploadPromises = Array.from(files).slice(0, maxImages - value.length).map(async (file) => {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.error || 'Upload failed')
        }

        const data = await response.json()
        return data.url
      })

      const urls = await Promise.all(uploadPromises)
      onChange([...value, ...urls])
    } catch (err: any) {
      setError(err.message || 'Failed to upload images')
    } finally {
      setUploading(false)
      // Reset input
      e.target.value = ''
    }
  }

  const removeImage = (index: number) => {
    const newUrls = value.filter((_, i) => i !== index)
    onChange(newUrls)
  }

  const addUrl = () => {
    const url = prompt('Enter image URL:')
    if (url && url.trim()) {
      onChange([...value, url.trim()])
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        {helpText && (
          <p className="text-sm text-gray-500 mb-3">{helpText}</p>
        )}

        {/* Upload Button */}
        <div className="flex items-center space-x-4 mb-4">
          <label className="cursor-pointer inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <span>{uploading ? 'Uploading...' : 'Upload Images'}</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              disabled={uploading || value.length >= maxImages}
              className="hidden"
            />
          </label>
          <button
            type="button"
            onClick={addUrl}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            Add URL
          </button>
          {value.length > 0 && (
            <span className="text-sm text-gray-600">
              {value.length} image{value.length !== 1 ? 's' : ''} added
            </span>
          )}
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Image Preview Grid */}
        {value.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {value.map((url, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-100">
                  <img
                    src={url}
                    alt={`Screenshot ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder-image.png'
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                  title="Remove image"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="mt-1 text-xs text-gray-500 truncate" title={url}>
                  {url.length > 30 ? `${url.substring(0, 30)}...` : url}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* JSON Output (for form submission) */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            JSON Array (auto-generated)
          </label>
          <textarea
            readOnly
            value={JSON.stringify(value, null, 2)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm font-mono"
            rows={3}
          />
        </div>
      </div>
    </div>
  )
}

