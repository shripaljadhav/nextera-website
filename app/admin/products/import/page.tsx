'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Breadcrumbs from '@/components/admin/Breadcrumbs'
import FormField from '@/components/admin/FormField'
import FormSection from '@/components/admin/FormSection'
import RichTextEditor from '@/components/admin/RichTextEditor'
import ImageUpload from '@/components/admin/ImageUpload'

export default function ImportProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sourceUrl, setSourceUrl] = useState('')
  const [importing, setImporting] = useState(false)
  const [importError, setImportError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'SaaS',
    description: '',
    content: '',
    tagline: '',
    techStack: '[]',
    screenshots: '[]',
    pricing: '{}',
    changelog: '[]',
    versions: '[]',
    features: '[]',
    status: 'LIVE',
    isFeatured: false,
    websiteUrl: '',
    demoUrl: '',
    githubUrl: '',
    documentationUrl: '',
    logo: '',
    featuredImage: '',
    metaTitle: '',
    metaDescription: '',
  })

  // Parse screenshots for ImageUpload component
  const screenshotsArray = formData.screenshots ? (() => {
    try {
      return JSON.parse(formData.screenshots)
    } catch {
      return []
    }
  })() : []

  // Auto-generate slug from name
  const handleNameChange = (value: string) => {
    const slug = value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    setFormData({
      ...formData,
      name: value,
      slug: slug,
    })
  }

  // Import from URL
  const handleImportFromUrl = async () => {
    if (!sourceUrl.trim()) {
      setImportError('Please enter a URL')
      return
    }

    setImporting(true)
    setImportError('')

    try {
      const response = await fetch('/api/products/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: sourceUrl }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to import')
      }

      const { data } = await response.json()

      // Populate form with imported data
      setFormData({
        ...formData,
        name: data.name || formData.name,
        slug: data.slug || formData.slug,
        description: data.description || formData.description,
        tagline: data.tagline || formData.tagline,
        screenshots: JSON.stringify(data.screenshots || []),
        features: JSON.stringify(data.features || []),
        pricing: JSON.stringify(data.pricing || {}),
        demoUrl: data.demoUrl || formData.demoUrl,
      })

      // Update name to trigger slug generation
      if (data.name) {
        handleNameChange(data.name)
      }
    } catch (error: any) {
      setImportError(error.message || 'Failed to import product')
    } finally {
      setImporting(false)
    }
  }

  // Quick fill helper - paste product info from CodeCanyon/codelist
  const handleQuickFill = () => {
    const text = prompt('📋 Paste product information here:\n\nCopy from CodeCanyon:\n- Product name (first line)\n- Description\n- Features list\n\nThen paste everything here:')
    if (!text) return

    const lines = text.split('\n').filter(l => l.trim())
    
    // Try to extract name (first line that's not too long)
    if (lines.length > 0) {
      const firstLine = lines[0].trim()
      // Skip if it's clearly not a name (too long, has special chars)
      if (firstLine.length < 150 && !firstLine.match(/^https?:\/\//)) {
        handleNameChange(firstLine)
      }
    }

    // Try to extract description (longer paragraphs, usually 2nd or 3rd line)
    const descriptionCandidates = lines.filter(l => {
      const trimmed = l.trim()
      return trimmed.length > 50 && 
             trimmed.length < 1000 && 
             !trimmed.match(/^[-•*]\d+\./) &&
             !trimmed.match(/^https?:\/\//) &&
             !trimmed.toLowerCase().includes('feature') &&
             !trimmed.toLowerCase().includes('price')
    })
    
    if (descriptionCandidates.length > 0) {
      // Use the longest candidate as description
      const description = descriptionCandidates.sort((a, b) => b.length - a.length)[0]
      setFormData({ ...formData, description: description.substring(0, 500) })
    }

    // Try to extract features (lines starting with bullet points, dashes, or numbers)
    const featureLines = lines.filter(l => {
      const trimmed = l.trim()
      return (trimmed.match(/^[-•*]\s+/) || 
              trimmed.match(/^\d+[\.\)]\s+/) ||
              trimmed.toLowerCase().includes('feature') ||
              trimmed.toLowerCase().includes('includes') ||
              trimmed.toLowerCase().includes('support')) &&
             trimmed.length > 15 &&
             trimmed.length < 300
    })
    
    if (featureLines.length > 0) {
      const features = featureLines
        .map(l => l
          .replace(/^[-•*]\s+/, '')
          .replace(/^\d+[\.\)]\s+/, '')
          .replace(/^feature[s]?:\s*/i, '')
          .replace(/^includes?:\s*/i, '')
          .trim()
        )
        .filter(f => f.length > 10 && f.length < 200)
        .slice(0, 30) // Limit to 30 features
      
      if (features.length > 0) {
        setFormData({ ...formData, features: JSON.stringify(features) })
      }
    }

    // Show success message
    alert(`✅ Extracted:\n- Name: ${formData.name || 'Not found'}\n- Description: ${descriptionCandidates.length > 0 ? 'Found' : 'Not found'}\n- Features: ${featureLines.length} found\n\nPlease review and complete the form!`)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    try {
      // Parse JSON fields
      let techStack: string[] = []
      let screenshots: string[] = []
      let pricing: any = {}
      let changelog: any[] = []
      let versions: any[] = []
      let features: string[] = []

      try {
        techStack = formData.techStack ? JSON.parse(formData.techStack) : []
        screenshots = formData.screenshots ? JSON.parse(formData.screenshots) : []
        pricing = formData.pricing ? JSON.parse(formData.pricing) : {}
        changelog = formData.changelog ? JSON.parse(formData.changelog) : []
        versions = formData.versions ? JSON.parse(formData.versions) : []
        features = formData.features ? JSON.parse(formData.features) : []
      } catch (parseError) {
        setErrors({ submit: 'Invalid JSON format in one of the fields' })
        setLoading(false)
        return
      }

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          techStack,
          screenshots,
          pricing,
          changelog,
          versions,
          features,
        }),
      })

      if (response.ok) {
        router.push('/admin/products')
      } else {
        const data = await response.json()
        setErrors({ submit: data.error || 'Error creating product' })
      }
    } catch (error) {
      console.error('Error:', error)
      setErrors({ submit: 'Error creating product' })
    } finally {
      setLoading(false)
    }
  }

  const handleScreenshotsChange = (urls: string[]) => {
    setFormData({ ...formData, screenshots: JSON.stringify(urls) })
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[
        { label: 'Dashboard', href: '/admin' },
        { label: 'Products', href: '/admin/products' },
        { label: 'Import Product' },
      ]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Import Product</h1>
          <p className="mt-2 text-sm text-gray-600">
            Quick import from CodeCanyon, codelist.cc, or other sources
          </p>
        </div>
        <Link
          href="/admin/products"
          className="inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <span>Cancel</span>
        </Link>
      </div>

      {/* Quick Import Helper */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Quick Import Helper</h3>
            <p className="text-sm text-blue-700 mb-4">
              <strong>Recommended:</strong> Use "Quick Fill from Clipboard" - CodeCanyon blocks automated imports.
            </p>
            
            {/* Instructions */}
            <div className="bg-white rounded-lg p-4 mb-4 border border-blue-300">
              <h4 className="font-semibold text-gray-900 mb-2">📋 How to Import from CodeCanyon:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                <li>Open the CodeCanyon product page in your browser</li>
                <li>Copy the product name, description, and features</li>
                <li>Click "Quick Fill from Clipboard" below</li>
                <li>Paste the copied text</li>
                <li>The form will auto-extract name, description, and features</li>
                <li>Manually add screenshots, pricing, and other details</li>
              </ol>
            </div>

            <div className="space-y-3">
              <FormField
                label="Source URL (for reference only)"
                name="sourceUrl"
                type="text"
                value={sourceUrl}
                onChange={(value) => setSourceUrl(value)}
                placeholder="https://codecanyon.net/item/... or https://codelist.cc/..."
                helpText="Paste URL for reference (automated import may not work due to CodeCanyon restrictions)"
              />
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={handleImportFromUrl}
                  disabled={importing || !sourceUrl.trim()}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  title="May not work due to CodeCanyon blocking server requests"
                >
                  {importing ? 'Importing...' : 'Try Import from URL (May Fail)'}
                </button>
                <button
                  type="button"
                  onClick={handleQuickFill}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md"
                >
                  ✨ Quick Fill from Clipboard (Recommended)
                </button>
              </div>
              {importError && (
                <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm font-medium mb-1">⚠️ Import Failed</p>
                  <p className="text-red-600 text-sm">{importError}</p>
                  <p className="text-red-600 text-xs mt-2">
                    💡 <strong>Solution:</strong> Use "Quick Fill from Clipboard" instead. Copy the product info from the CodeCanyon page and paste it.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {errors.submit && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 text-sm">{errors.submit}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormSection title="Basic Information" description="Essential product details">
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              label="Product Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={(value) => handleNameChange(value)}
              required
              error={errors.name}
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

          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              label="Category"
              name="category"
              type="select"
              value={formData.category}
              onChange={(value) => setFormData({ ...formData, category: value })}
              required
              options={[
                { value: 'Mobile Application', label: 'Mobile Application' },
                { value: 'SaaS', label: 'SaaS' },
                { value: 'Website', label: 'Website' },
              ]}
              error={errors.category}
            />
            <FormField
              label="Status"
              name="status"
              type="select"
              value={formData.status}
              onChange={(value) => setFormData({ ...formData, status: value })}
              options={[
                { value: 'LIVE', label: 'Live' },
                { value: 'BETA', label: 'Beta' },
                { value: 'COMING_SOON', label: 'Coming Soon' },
                { value: 'ARCHIVED', label: 'Archived' },
              ]}
            />
          </div>

          <FormField
            label="Tagline"
            name="tagline"
            type="text"
            value={formData.tagline}
            onChange={(value) => setFormData({ ...formData, tagline: value })}
            placeholder="Short catchy tagline"
          />

          <FormField
            label="Short Description"
            name="description"
            type="textarea"
            value={formData.description}
            onChange={(value) => setFormData({ ...formData, description: value })}
            rows={3}
            placeholder="Brief description (shown in listings)"
          />
        </FormSection>

        <FormSection title="Content" description="Full product description">
          <RichTextEditor
            value={formData.content}
            onChange={(value) => setFormData({ ...formData, content: value })}
            placeholder="Full product description with formatting..."
          />
        </FormSection>

        <FormSection title="Media" description="Product images and screenshots">
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              label="Logo URL"
              name="logo"
              type="text"
              value={formData.logo}
              onChange={(value) => setFormData({ ...formData, logo: value })}
              placeholder="https://..."
              helpText="Product logo image URL"
            />
            <FormField
              label="Featured Image URL"
              name="featuredImage"
              type="text"
              value={formData.featuredImage}
              onChange={(value) => setFormData({ ...formData, featuredImage: value })}
              placeholder="https://..."
              helpText="Main product image URL"
            />
          </div>

          <ImageUpload
            label="Screenshots"
            value={screenshotsArray}
            onChange={handleScreenshotsChange}
            helpText="Upload or add URLs of product screenshots"
            maxImages={20}
          />
        </FormSection>

        <FormSection title="Technical Details" description="Tech stack and features">
          <FormField
            label="Tech Stack"
            name="techStack"
            type="textarea"
            value={formData.techStack}
            onChange={(value) => setFormData({ ...formData, techStack: value })}
            rows={3}
            helpText='Enter as JSON array, e.g., ["React", "Node.js", "PostgreSQL"]'
            placeholder='["React", "Node.js", "MongoDB"]'
          />

          <FormField
            label="Features"
            name="features"
            type="textarea"
            value={formData.features}
            onChange={(value) => setFormData({ ...formData, features: value })}
            rows={6}
            helpText='Enter as JSON array, e.g., ["Feature 1", "Feature 2", "Feature 3"]'
            placeholder='["Responsive Design", "User Authentication", "Payment Integration"]'
          />
        </FormSection>

        <FormSection title="Pricing" description="Product pricing information">
          <FormField
            label="Pricing"
            name="pricing"
            type="textarea"
            value={formData.pricing}
            onChange={(value) => setFormData({ ...formData, pricing: value })}
            rows={6}
            helpText='Enter as JSON object, e.g., {"Basic": {"price": 29, "billing": "month", "features": ["Feature 1"]}}'
            placeholder='{"Basic": {"price": 29, "billing": "month", "features": ["Feature 1", "Feature 2"]}}'
          />
        </FormSection>

        <FormSection title="Links" description="Product URLs and resources">
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              label="Website URL"
              name="websiteUrl"
              type="text"
              value={formData.websiteUrl}
              onChange={(value) => setFormData({ ...formData, websiteUrl: value })}
              placeholder="https://..."
            />
            <FormField
              label="Demo URL"
              name="demoUrl"
              type="text"
              value={formData.demoUrl}
              onChange={(value) => setFormData({ ...formData, demoUrl: value })}
              placeholder="https://..."
            />
            <FormField
              label="GitHub URL"
              name="githubUrl"
              type="text"
              value={formData.githubUrl}
              onChange={(value) => setFormData({ ...formData, githubUrl: value })}
              placeholder="https://github.com/..."
            />
            <FormField
              label="Documentation URL"
              name="documentationUrl"
              type="text"
              value={formData.documentationUrl}
              onChange={(value) => setFormData({ ...formData, documentationUrl: value })}
              placeholder="https://..."
            />
          </div>
        </FormSection>

        <FormSection title="Version History" description="Changelog and version information">
          <FormField
            label="Changelog"
            name="changelog"
            type="textarea"
            value={formData.changelog}
            onChange={(value) => setFormData({ ...formData, changelog: value })}
            rows={6}
            helpText='Enter as JSON array, e.g., [{"date": "2024-01-01", "type": "added", "description": "New feature"}]'
            placeholder='[{"date": "2024-01-01", "type": "added", "description": "New feature"}]'
          />

          <FormField
            label="Versions"
            name="versions"
            type="textarea"
            value={formData.versions}
            onChange={(value) => setFormData({ ...formData, versions: value })}
            rows={6}
            helpText='Enter as JSON array, e.g., [{"version": "1.0.0", "date": "2024-01-01", "changes": ["Change 1", "Change 2"]}]'
            placeholder='[{"version": "1.0.0", "date": "2024-01-01", "changes": ["Change 1"]}]'
          />
        </FormSection>

        <FormSection title="SEO" description="Search engine optimization">
          <FormField
            label="Meta Title"
            name="metaTitle"
            type="text"
            value={formData.metaTitle}
            onChange={(value) => setFormData({ ...formData, metaTitle: value })}
            placeholder="SEO title (defaults to product name)"
          />
          <FormField
            label="Meta Description"
            name="metaDescription"
            type="textarea"
            value={formData.metaDescription}
            onChange={(value) => setFormData({ ...formData, metaDescription: value })}
            rows={2}
            placeholder="SEO description"
          />
        </FormSection>

        <FormSection title="Settings">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isFeatured"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700">
              Feature this product on the homepage
            </label>
          </div>
        </FormSection>

        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
          <Link
            href="/admin/products"
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  )
}

