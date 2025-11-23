'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import Breadcrumbs from '@/components/admin/Breadcrumbs'
import FormField from '@/components/admin/FormField'
import FormSection from '@/components/admin/FormSection'
import RichTextEditor from '@/components/admin/RichTextEditor'
import SectionManager from '@/components/admin/SectionManager'
import SectionEditor from '@/components/admin/SectionEditor'
import DeleteButton from '@/components/admin/DeleteButton'

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

export default function EditPagePage() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
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

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await fetch(`/api/pages/${params.id}`)
        if (response.ok) {
          const { page } = await response.json()
          setFormData({
            title: page.title || '',
            slug: page.slug || '',
            content: page.content || '',
            metaTitle: page.metaTitle || '',
            metaDescription: page.metaDescription || '',
            isPublished: page.isPublished || false,
          })
          
          // Parse sections if they exist
          if (page.sections) {
            try {
              const parsedSections = JSON.parse(page.sections)
              setSections(Array.isArray(parsedSections) ? parsedSections : [])
            } catch {
              setSections([])
            }
          } else {
            setSections([])
          }
        }
      } catch (error) {
        console.error('Error fetching page:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchPage()
    }
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setErrors({})

    try {
      const response = await fetch(`/api/pages/${params.id}`, {
        method: 'PUT',
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
        setErrors({ submit: data.error || 'Error updating page' })
      }
    } catch (error) {
      console.error('Error:', error)
      setErrors({ submit: 'Error updating page' })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    const response = await fetch(`/api/pages/${params.id}`, {
      method: 'DELETE',
    })

    if (response.ok) {
      router.push('/admin/pages')
    } else {
      throw new Error('Failed to delete')
    }
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <svg className="animate-spin h-8 w-8 text-primary-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-gray-600">Loading page...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[
        { label: 'Dashboard', href: '/admin' },
        { label: 'Pages', href: '/admin/pages' },
        { label: 'Edit Page' },
      ]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Page</h1>
          <p className="mt-2 text-sm text-gray-600">
            Update page information, content, and sections with rich text editing and styling options.
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
                onChange={(value) => setFormData({ ...formData, title: value })}
                required
                error={errors.title}
              />
              <FormField
                label="URL Slug"
                name="slug"
                type="text"
                value={formData.slug}
                onChange={(value) => setFormData({ ...formData, slug: value })}
                required
                helpText="Used in the URL"
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
              helpText="SEO title"
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
              helpText="SEO description"
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

          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <DeleteButton onDelete={handleDelete} itemName={formData.title} />
            
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/pages"
                className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium inline-flex items-center space-x-2"
              >
                {saving ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}
