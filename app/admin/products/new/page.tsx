'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Breadcrumbs from '@/components/admin/Breadcrumbs'
import FormField from '@/components/admin/FormField'
import FormSection from '@/components/admin/FormSection'
import RichTextEditor from '@/components/admin/RichTextEditor'
import ImageUpload from '@/components/admin/ImageUpload'

export default function NewProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
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
    setFormData({
      ...formData,
      name: value,
      slug: formData.slug || value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    })
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

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[
        { label: 'Dashboard', href: '/admin' },
        { label: 'Products', href: '/admin/products' },
        { label: 'New Product' },
      ]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">New Product</h1>
          <p className="mt-2 text-sm text-gray-600">
            Create a new product with screenshots, pricing, versions, and more.
          </p>
        </div>
        <Link
          href="/admin/products"
          className="inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span>Cancel</span>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormSection title="Basic Information" description="Essential product details">
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              label="Product Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleNameChange}
              required
              placeholder="My Awesome Product"
              error={errors.name}
            />
            <FormField
              label="URL Slug"
              name="slug"
              type="text"
              value={formData.slug}
              onChange={(value) => setFormData({ ...formData, slug: value })}
              required
              placeholder="my-awesome-product"
              helpText="Auto-generated from name"
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
            placeholder="A short, catchy tagline"
            helpText="Brief one-line description"
          />

          <FormField
            label="Short Description"
            name="description"
            type="textarea"
            value={formData.description}
            onChange={(value) => setFormData({ ...formData, description: value })}
            rows={3}
            placeholder="Brief description of the product"
            helpText="This appears in listings and cards"
          />
        </FormSection>

        <FormSection title="Full Description" description="Detailed product description using rich text editor">
          <RichTextEditor
            value={formData.content}
            onChange={(value) => setFormData({ ...formData, content: value })}
            placeholder="Enter full product description..."
          />
        </FormSection>

        <FormSection title="Tech Stack" description="Technologies used in this product">
          <FormField
            label="Tech Stack (JSON Array)"
            name="techStack"
            type="textarea"
            value={formData.techStack}
            onChange={(value) => setFormData({ ...formData, techStack: value })}
            rows={4}
            placeholder='["React", "Node.js", "PostgreSQL", "AWS"]'
            helpText='Enter as JSON array, e.g., ["React", "Node.js", "PostgreSQL"]'
            error={errors.techStack}
          />
        </FormSection>

        <FormSection title="Screenshots" description="Upload product screenshots or add URLs">
          <ImageUpload
            value={screenshotsArray}
            onChange={(urls) => setFormData({ ...formData, screenshots: JSON.stringify(urls) })}
            label="Product Screenshots"
            helpText="Upload images or add URLs. Images will be stored in /public/uploads"
            maxImages={20}
          />
        </FormSection>

        <FormSection title="Pricing" description="Product pricing information">
          <FormField
            label="Pricing (JSON Object)"
            name="pricing"
            type="textarea"
            value={formData.pricing}
            onChange={(value) => setFormData({ ...formData, pricing: value })}
            rows={6}
            placeholder='{"free": {"price": 0, "features": ["Basic features"]}, "pro": {"price": 29, "billing": "monthly", "features": ["All features"]}}'
            helpText="Enter pricing tiers as JSON object"
            error={errors.pricing}
          />
        </FormSection>

        <FormSection title="Features" description="Product features list">
          <FormField
            label="Features (JSON Array)"
            name="features"
            type="textarea"
            value={formData.features}
            onChange={(value) => setFormData({ ...formData, features: value })}
            rows={6}
            placeholder='["Feature 1", "Feature 2", "Feature 3"]'
            helpText="Enter features as JSON array"
            error={errors.features}
          />
        </FormSection>

        <FormSection title="Versions" description="Product version history">
          <FormField
            label="Versions (JSON Array)"
            name="versions"
            type="textarea"
            value={formData.versions}
            onChange={(value) => setFormData({ ...formData, versions: value })}
            rows={6}
            placeholder='[{"version": "1.0.0", "date": "2024-01-01", "changes": ["Initial release"]}]'
            helpText="Enter version history as JSON array of objects"
            error={errors.versions}
          />
        </FormSection>

        <FormSection title="Changelog" description="Product changelog entries">
          <FormField
            label="Changelog (JSON Array)"
            name="changelog"
            type="textarea"
            value={formData.changelog}
            onChange={(value) => setFormData({ ...formData, changelog: value })}
            rows={6}
            placeholder='[{"date": "2024-01-15", "type": "added", "description": "New feature added"}]'
            helpText="Enter changelog entries as JSON array"
            error={errors.changelog}
          />
        </FormSection>

        <FormSection title="Links & Media" description="Product URLs and images">
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              label="Website URL"
              name="websiteUrl"
              type="text"
              value={formData.websiteUrl}
              onChange={(value) => setFormData({ ...formData, websiteUrl: value })}
              placeholder="https://product.example.com"
            />
            <FormField
              label="Demo URL"
              name="demoUrl"
              type="text"
              value={formData.demoUrl}
              onChange={(value) => setFormData({ ...formData, demoUrl: value })}
              placeholder="https://demo.example.com"
            />
            <FormField
              label="GitHub URL"
              name="githubUrl"
              type="text"
              value={formData.githubUrl}
              onChange={(value) => setFormData({ ...formData, githubUrl: value })}
              placeholder="https://github.com/username/repo"
            />
            <FormField
              label="Documentation URL"
              name="documentationUrl"
              type="text"
              value={formData.documentationUrl}
              onChange={(value) => setFormData({ ...formData, documentationUrl: value })}
              placeholder="https://docs.example.com"
            />
            <FormField
              label="Logo URL"
              name="logo"
              type="text"
              value={formData.logo}
              onChange={(value) => setFormData({ ...formData, logo: value })}
              placeholder="https://example.com/logo.png"
            />
            <FormField
              label="Featured Image URL"
              name="featuredImage"
              type="text"
              value={formData.featuredImage}
              onChange={(value) => setFormData({ ...formData, featuredImage: value })}
              placeholder="https://example.com/featured.jpg"
            />
          </div>
        </FormSection>

        <FormSection title="SEO Settings" description="Meta information for search engines">
          <FormField
            label="Meta Title"
            name="metaTitle"
            type="text"
            value={formData.metaTitle}
            onChange={(value) => setFormData({ ...formData, metaTitle: value })}
            placeholder="Leave empty to use product name"
            helpText="SEO title"
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
          />
        </FormSection>

        <FormSection title="Settings" description="Product visibility and features">
          <FormField
            label="Featured Product"
            name="isFeatured"
            type="checkbox"
            value={formData.isFeatured}
            onChange={(value) => setFormData({ ...formData, isFeatured: value })}
            helpText="Show this product in featured sections"
          />
        </FormSection>

        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-600">{errors.submit}</p>
          </div>
        )}

        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
          <Link
            href="/admin/products"
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
                <span>Create Product</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

