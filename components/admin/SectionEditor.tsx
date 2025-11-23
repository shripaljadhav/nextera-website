'use client'

import { useState } from 'react'
import RichTextEditor from './RichTextEditor'
import FormField from './FormField'

interface Section {
  id: string
  type: 'hero' | 'content' | 'cta' | 'features' | 'testimonials' | 'custom'
  title: string
  content: string
  order: number
  styles?: {
    backgroundColor?: string
    textColor?: string
    padding?: string
    backgroundImage?: string
  }
}

interface SectionEditorProps {
  section: Section
  onSave: (section: Section) => void
  onCancel: () => void
}

export default function SectionEditor({ section, onSave, onCancel }: SectionEditorProps) {
  const [editedSection, setEditedSection] = useState<Section>(section)

  const handleSave = () => {
    onSave(editedSection)
  }

  return (
    <div className="bg-white rounded-xl border-2 border-primary-300 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">Edit Section</h3>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          label="Section Type"
          name="type"
          type="select"
          value={editedSection.type}
          onChange={(value) => setEditedSection({ ...editedSection, type: value as any })}
          options={[
            { value: 'hero', label: 'Hero' },
            { value: 'content', label: 'Content' },
            { value: 'cta', label: 'Call to Action' },
            { value: 'features', label: 'Features' },
            { value: 'testimonials', label: 'Testimonials' },
            { value: 'custom', label: 'Custom' },
          ]}
        />

        <FormField
          label="Section Title"
          name="title"
          type="text"
          value={editedSection.title}
          onChange={(value) => setEditedSection({ ...editedSection, title: value })}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">Content</label>
        <RichTextEditor
          value={editedSection.content}
          onChange={(value) => setEditedSection({ ...editedSection, content: value })}
          placeholder="Enter section content..."
        />
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Styling Options</h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={editedSection.styles?.backgroundColor || '#ffffff'}
                onChange={(e) => setEditedSection({
                  ...editedSection,
                  styles: { ...editedSection.styles, backgroundColor: e.target.value }
                })}
                className="w-16 h-10 rounded border-2 border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={editedSection.styles?.backgroundColor || '#ffffff'}
                onChange={(e) => setEditedSection({
                  ...editedSection,
                  styles: { ...editedSection.styles, backgroundColor: e.target.value }
                })}
                className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg"
                placeholder="#ffffff"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={editedSection.styles?.textColor || '#000000'}
                onChange={(e) => setEditedSection({
                  ...editedSection,
                  styles: { ...editedSection.styles, textColor: e.target.value }
                })}
                className="w-16 h-10 rounded border-2 border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={editedSection.styles?.textColor || '#000000'}
                onChange={(e) => setEditedSection({
                  ...editedSection,
                  styles: { ...editedSection.styles, textColor: e.target.value }
                })}
                className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg"
                placeholder="#000000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Padding</label>
            <select
              value={editedSection.styles?.padding || 'normal'}
              onChange={(e) => setEditedSection({
                ...editedSection,
                styles: { ...editedSection.styles, padding: e.target.value }
              })}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg"
            >
              <option value="none">None</option>
              <option value="small">Small</option>
              <option value="normal">Normal</option>
              <option value="large">Large</option>
              <option value="xlarge">Extra Large</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Background Image URL</label>
            <input
              type="text"
              value={editedSection.styles?.backgroundImage || ''}
              onChange={(e) => setEditedSection({
                ...editedSection,
                styles: { ...editedSection.styles, backgroundImage: e.target.value }
              })}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
        <button
          onClick={onCancel}
          className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          Save Section
        </button>
      </div>
    </div>
  )
}

