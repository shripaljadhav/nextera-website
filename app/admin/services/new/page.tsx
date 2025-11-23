'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Breadcrumbs from '@/components/admin/Breadcrumbs'
import FormField from '@/components/admin/FormField'
import FormSection from '@/components/admin/FormSection'

export default function NewServicePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    category: '',
    isFeatured: false,
    icon: 'rocket',
    outcomes: '',
    timeline: '',
    budgetRange: '',
    relatedServices: '',
    packages: '',
    faqs: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    try {
      // Parse JSON fields
      let outcomes: string[] = []
      let relatedServices: string[] = []
      let packages: any[] = []
      let faqs: any[] = []

      if (formData.outcomes) {
        try {
          outcomes = JSON.parse(formData.outcomes)
        } catch {
          setErrors({ outcomes: 'Invalid JSON format' })
          setLoading(false)
          return
        }
      }

      if (formData.relatedServices) {
        try {
          relatedServices = JSON.parse(formData.relatedServices)
        } catch {
          setErrors({ relatedServices: 'Invalid JSON format' })
          setLoading(false)
          return
        }
      }

      if (formData.packages) {
        try {
          packages = JSON.parse(formData.packages)
        } catch {
          setErrors({ packages: 'Invalid JSON format' })
          setLoading(false)
          return
        }
      }

      if (formData.faqs) {
        try {
          faqs = JSON.parse(formData.faqs)
        } catch {
          setErrors({ faqs: 'Invalid JSON format' })
          setLoading(false)
          return
        }
      }

      const response = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          outcomes: JSON.stringify(outcomes),
          relatedServices: JSON.stringify(relatedServices),
          packages: JSON.stringify(packages),
          faqs: JSON.stringify(faqs),
        }),
      })

      if (response.ok) {
        router.push('/admin/services')
      } else {
        const data = await response.json()
        setErrors({ submit: data.error || 'Error creating service' })
      }
    } catch (error) {
      console.error('Error:', error)
      setErrors({ submit: 'Error creating service' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[
        { label: 'Dashboard', href: '/admin' },
        { label: 'Services', href: '/admin/services' },
        { label: 'New Service' },
      ]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">New Service</h1>
          <p className="mt-2 text-sm text-gray-600">
            Create a new service to showcase your offerings.
          </p>
        </div>
        <Link
          href="/admin/services"
          className="inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span>Cancel</span>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormSection title="Basic Information" description="Essential details about the service">
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              label="Service Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={(value) => setFormData({ ...formData, name: value })}
              required
              placeholder="e.g., Custom Software Development"
              error={errors.name}
            />
            <FormField
              label="URL Slug"
              name="slug"
              type="text"
              value={formData.slug}
              onChange={(value) => setFormData({ ...formData, slug: value })}
              required
              placeholder="custom-software-development"
              helpText="Used in the URL (e.g., /services/custom-software-development)"
              error={errors.slug}
            />
          </div>

          <FormField
            label="Description"
            name="description"
            type="textarea"
            value={formData.description}
            onChange={(value) => setFormData({ ...formData, description: value })}
            rows={4}
            placeholder="Brief description of the service..."
            helpText="A concise description that appears in listings"
            error={errors.description}
          />

          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              label="Category"
              name="category"
              type="text"
              value={formData.category}
              onChange={(value) => setFormData({ ...formData, category: value })}
              placeholder="e.g., Development"
              error={errors.category}
            />
            <FormField
              label="Icon"
              name="icon"
              type="select"
              value={formData.icon}
              onChange={(value) => setFormData({ ...formData, icon: value })}
              options={[
                { value: 'rocket', label: 'Rocket' },
                { value: 'sparkles', label: 'Sparkles' },
                { value: 'code', label: 'Code' },
                { value: 'chart', label: 'Chart' },
              ]}
            />
          </div>

          <FormField
            label="Featured Service"
            name="isFeatured"
            type="checkbox"
            value={formData.isFeatured}
            onChange={(value) => setFormData({ ...formData, isFeatured: value })}
            helpText="Show this service prominently on the homepage"
          />
        </FormSection>

        <FormSection title="Service Details" description="Additional information about the service">
          <FormField
            label="Outcomes"
            name="outcomes"
            type="textarea"
            value={formData.outcomes}
            onChange={(value) => setFormData({ ...formData, outcomes: value })}
            rows={6}
            placeholder='["Outcome 1", "Outcome 2", "Outcome 3"]'
            helpText="JSON array of expected outcomes (e.g., [\"Faster delivery\", \"Better quality\"])"
            error={errors.outcomes}
          />

          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              label="Timeline"
              name="timeline"
              type="text"
              value={formData.timeline}
              onChange={(value) => setFormData({ ...formData, timeline: value })}
              placeholder="e.g., 4-6 weeks"
              error={errors.timeline}
            />
            <FormField
              label="Budget Range"
              name="budgetRange"
              type="text"
              value={formData.budgetRange}
              onChange={(value) => setFormData({ ...formData, budgetRange: value })}
              placeholder="e.g., $10,000 - $50,000"
              error={errors.budgetRange}
            />
          </div>
        </FormSection>

        <FormSection title="Advanced" description="Additional configuration">
          <FormField
            label="Related Services"
            name="relatedServices"
            type="textarea"
            value={formData.relatedServices}
            onChange={(value) => setFormData({ ...formData, relatedServices: value })}
            rows={3}
            placeholder='["service-slug-1", "service-slug-2"]'
            helpText="JSON array of related service slugs"
            error={errors.relatedServices}
          />

          <FormField
            label="Packages"
            name="packages"
            type="textarea"
            value={formData.packages}
            onChange={(value) => setFormData({ ...formData, packages: value })}
            rows={6}
            placeholder='[{"name": "Basic", "price": "$5,000", "features": ["Feature 1"]}]'
            helpText="JSON array of package objects"
            error={errors.packages}
          />

          <FormField
            label="FAQs"
            name="faqs"
            type="textarea"
            value={formData.faqs}
            onChange={(value) => setFormData({ ...formData, faqs: value })}
            rows={6}
            placeholder='[{"question": "Q?", "answer": "A"}]'
            helpText="JSON array of FAQ objects"
            error={errors.faqs}
          />
        </FormSection>

        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-600">{errors.submit}</p>
          </div>
        )}

        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
          <Link
            href="/admin/services"
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
                <span>Create Service</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
