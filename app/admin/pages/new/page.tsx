'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Breadcrumbs from '@/components/admin/Breadcrumbs'
import FormField from '@/components/admin/FormField'
import FormSection from '@/components/admin/FormSection'
import RichTextEditor from '@/components/admin/RichTextEditor'
import SectionManager from '@/components/admin/SectionManager'
import SectionEditor from '@/components/admin/SectionEditor'

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

export default function NewPagePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [editingSection, setEditingSection] = useState<Section | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    metaTitle: '',
    metaDescription: '',
    isPublished: false,
  })
  const [sections, setSections] = useState<Section[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    try {
      const response = await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          sections: sections.length > 0 ? JSON.stringify(sections) : null,
        }),
      })

      if (response.ok) {
        router.push('/admin/pages')
      } else {
        const data = await response.json()
        setErrors({ submit: data.error || 'Error creating page' })
      }
    } catch (error) {
      console.error('Error:', error)
      setErrors({ submit: 'Error creating page' })
    } finally {
      setLoading(false)
    }
  }

  // Auto-generate slug from title
  const handleTitleChange = (value: string) => {
    setFormData({
      ...formData,
      title: value,
      slug: formData.slug || value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    })
  }

  const handleSectionSave = (section: Section) => {
    const updatedSections = sections.map(s => s.id === section.id ? section : s)
    setSections(updatedSections)
    setEditingSection(null)
  }

  const handleSectionEdit = (id: string) => {
    const section = sections.find(s => s.id === id)
    if (section) {
      setEditingSection(section)
    }
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[
        { label: 'Dashboard', href: '/admin' },
        { label: 'Pages', href: '/admin/pages' },
        { label: 'New Page' },
      ]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">New Custom Page</h1>
          <p className="mt-2 text-sm text-gray-600">
            Create a new custom page with rich text editing and section management.
          </p>
        </div>
        <Link
          href="/admin/pages"
          className="inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span>Cancel</span>
        </Link>
      </div>

      {editingSection ? (
        <SectionEditor
          section={editingSection}
          onSave={handleSectionSave}
          onCancel={() => setEditingSection(null)}
        />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormSection title="Basic Information" description="Essential details about the page">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                label="Page Title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleTitleChange}
                required
                placeholder="About Us"
                helpText="The title of the page"
                error={errors.title}
              />
              <FormField
                label="URL Slug"
                name="slug"
                type="text"
                value={formData.slug}
                onChange={(value) => setFormData({ ...formData, slug: value })}
                required
                placeholder="about-us"
                helpText="Used in the URL (e.g., /about-us). Auto-generated from title."
                error={errors.slug}
              />
            </div>
          </FormSection>

          <FormSection title="Page Content" description="Main content using rich text editor">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Content
              </label>
              <RichTextEditor
                value={formData.content}
                onChange={(value) => setFormData({ ...formData, content: value })}
                placeholder="Enter page content here..."
              />
              <p className="mt-2 text-sm text-gray-500">
                Use the toolbar above to format text, add links, images, and more.
              </p>
            </div>
          </FormSection>

          <FormSection title="Page Sections" description="Manage and reorder page sections with drag-and-drop">
            <SectionManager
              sections={sections}
              onChange={(updatedSections) => setSections(updatedSections)}
              onEdit={handleSectionEdit}
            />
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>Tip:</strong> Click the edit icon on any section to customize its content and styling. Drag sections to reorder them.
              </p>
            </div>
          </FormSection>

          <FormSection title="SEO Settings" description="Meta information for search engines">
            <FormField
              label="Meta Title"
              name="metaTitle"
              type="text"
              value={formData.metaTitle}
              onChange={(value) => setFormData({ ...formData, metaTitle: value })}
              placeholder="Leave empty to use page title"
              helpText="SEO title (appears in browser tab and search results)"
              error={errors.metaTitle}
            />

            <FormField
              label="Meta Description"
              name="metaDescription"
              type="textarea"
              value={formData.metaDescription}
              onChange={(value) => setFormData({ ...formData, metaDescription: value })}
              rows={3}
              placeholder="Brief description for search engines"
              helpText="SEO description (appears in search results)"
              error={errors.metaDescription}
            />
          </FormSection>

          <FormSection title="Publishing" description="Control page visibility">
            <FormField
              label="Publish Page"
              name="isPublished"
              type="checkbox"
              value={formData.isPublished}
              onChange={(value) => setFormData({ ...formData, isPublished: value })}
              helpText="Make this page visible on the website"
            />
          </FormSection>

          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}

          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <Link
              href="/admin/pages"
              className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium inline-flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Create Page</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
