'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Breadcrumbs from '@/components/admin/Breadcrumbs'
import FormField from '@/components/admin/FormField'
import FormSection from '@/components/admin/FormSection'

interface ProcessStep {
  title: string
  desc: string
  output: string
  icon: string
}

export default function HomePageSettingsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    heroTitle: '',
    heroSubtitle: '',
    heroDescription: '',
    heroPrimaryButtonText: '',
    heroPrimaryButtonLink: '',
    heroSecondaryButtonText: '',
    heroSecondaryButtonLink: '',
    processSteps: [
      { title: 'Discover', desc: 'Understand your goals', output: 'Roadmap', icon: '🔍' },
      { title: 'Design', desc: 'Create user experiences', output: 'Clickable prototype', icon: '🎨' },
      { title: 'Build', desc: 'Develop with modern tech', output: 'Production-ready system', icon: '⚡' },
      { title: 'Grow', desc: 'Iterate and scale', output: 'Ongoing optimization', icon: '📈' },
    ] as ProcessStep[],
  })

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/homepage')
        if (response.ok) {
          const { settings } = await response.json()
          setFormData({
            heroTitle: settings.homepage_hero_title || '',
            heroSubtitle: settings.homepage_hero_subtitle || '',
            heroDescription: settings.homepage_hero_description || '',
            heroPrimaryButtonText: settings.homepage_hero_primary_button_text || 'Book a strategy call',
            heroPrimaryButtonLink: settings.homepage_hero_primary_button_link || '/contact',
            heroSecondaryButtonText: settings.homepage_hero_secondary_button_text || 'View case studies',
            heroSecondaryButtonLink: settings.homepage_hero_secondary_button_link || '/case-studies',
            processSteps: settings.homepage_process_steps || formData.processSteps,
          })
        }
      } catch (error) {
        console.error('Error fetching settings:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setErrors({})

    try {
      const response = await fetch('/api/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          settings: {
            homepage_hero_title: formData.heroTitle,
            homepage_hero_subtitle: formData.heroSubtitle,
            homepage_hero_description: formData.heroDescription,
            homepage_hero_primary_button_text: formData.heroPrimaryButtonText,
            homepage_hero_primary_button_link: formData.heroPrimaryButtonLink,
            homepage_hero_secondary_button_text: formData.heroSecondaryButtonText,
            homepage_hero_secondary_button_link: formData.heroSecondaryButtonLink,
            homepage_process_steps: formData.processSteps,
          },
        }),
      })

      if (response.ok) {
        // Force a hard refresh of the home page
        router.refresh()
        // Also trigger a revalidation
        await fetch('/api/revalidate?path=/', { method: 'POST' }).catch(() => {})
        alert('Home page settings saved successfully! Refresh the home page to see changes.')
      } else {
        const data = await response.json()
        setErrors({ submit: data.error || 'Error saving settings' })
      }
    } catch (error) {
      console.error('Error:', error)
      setErrors({ submit: 'Error saving settings' })
    } finally {
      setSaving(false)
    }
  }

  const updateProcessStep = (index: number, field: keyof ProcessStep, value: string) => {
    const newSteps = [...formData.processSteps]
    newSteps[index] = { ...newSteps[index], [field]: value }
    setFormData({ ...formData, processSteps: newSteps })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <svg className="animate-spin h-8 w-8 text-primary-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[
        { label: 'Dashboard', href: '/admin' },
        { label: 'Home Page Settings' },
      ]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Home Page Settings</h1>
          <p className="mt-2 text-sm text-gray-600">
            Edit the hero section and process steps displayed on the home page.
          </p>
        </div>
        <a
          href="/"
          target="_blank"
          className="inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          <span>Preview Home Page</span>
        </a>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormSection
          title="Hero Section"
          description="The main banner section at the top of the home page"
        >
          <FormField
            label="Hero Title"
            name="heroTitle"
            type="text"
            value={formData.heroTitle}
            onChange={(value) => setFormData({ ...formData, heroTitle: value })}
            placeholder="We build modern software that actually moves your business"
            helpText="Main headline text"
            error={errors.heroTitle}
          />

          <FormField
            label="Hero Subtitle (Highlighted Text)"
            name="heroSubtitle"
            type="text"
            value={formData.heroSubtitle}
            onChange={(value) => setFormData({ ...formData, heroSubtitle: value })}
            placeholder="forward."
            helpText="Text that appears highlighted in the title"
            error={errors.heroSubtitle}
          />

          <FormField
            label="Hero Description"
            name="heroDescription"
            type="textarea"
            value={formData.heroDescription}
            onChange={(value) => setFormData({ ...formData, heroDescription: value })}
            rows={3}
            placeholder="SaaS, AI automation, mobile apps, and web experiences that scale with your vision."
            helpText="Subheading text below the title"
            error={errors.heroDescription}
          />

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <FormField
                label="Primary Button Text"
                name="heroPrimaryButtonText"
                type="text"
                value={formData.heroPrimaryButtonText}
                onChange={(value) => setFormData({ ...formData, heroPrimaryButtonText: value })}
                placeholder="Book a strategy call"
                error={errors.heroPrimaryButtonText}
              />
              <FormField
                label="Primary Button Link"
                name="heroPrimaryButtonLink"
                type="text"
                value={formData.heroPrimaryButtonLink}
                onChange={(value) => setFormData({ ...formData, heroPrimaryButtonLink: value })}
                placeholder="/contact"
                helpText="URL path (e.g., /contact)"
                error={errors.heroPrimaryButtonLink}
              />
            </div>
            <div>
              <FormField
                label="Secondary Button Text"
                name="heroSecondaryButtonText"
                type="text"
                value={formData.heroSecondaryButtonText}
                onChange={(value) => setFormData({ ...formData, heroSecondaryButtonText: value })}
                placeholder="View case studies"
                error={errors.heroSecondaryButtonText}
              />
              <FormField
                label="Secondary Button Link"
                name="heroSecondaryButtonLink"
                type="text"
                value={formData.heroSecondaryButtonLink}
                onChange={(value) => setFormData({ ...formData, heroSecondaryButtonLink: value })}
                placeholder="/case-studies"
                helpText="URL path (e.g., /case-studies)"
                error={errors.heroSecondaryButtonLink}
              />
            </div>
          </div>
        </FormSection>

        <FormSection
          title="Process Steps"
          description="The 'How We Work' section showing your process (4 steps)"
        >
          <div className="space-y-6">
            {formData.processSteps.map((step, index) => (
              <div key={index} className="p-6 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">Step {index + 1}</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    label="Title"
                    name={`step-${index}-title`}
                    type="text"
                    value={step.title}
                    onChange={(value) => updateProcessStep(index, 'title', value)}
                    placeholder="Discover"
                  />
                  <FormField
                    label="Icon (Emoji)"
                    name={`step-${index}-icon`}
                    type="text"
                    value={step.icon}
                    onChange={(value) => updateProcessStep(index, 'icon', value)}
                    placeholder="🔍"
                    helpText="Single emoji character"
                  />
                  <FormField
                    label="Description"
                    name={`step-${index}-desc`}
                    type="text"
                    value={step.desc}
                    onChange={(value) => updateProcessStep(index, 'desc', value)}
                    placeholder="Understand your goals"
                  />
                  <FormField
                    label="Output"
                    name={`step-${index}-output`}
                    type="text"
                    value={step.output}
                    onChange={(value) => updateProcessStep(index, 'output', value)}
                    placeholder="Roadmap"
                  />
                </div>
              </div>
            ))}
          </div>
        </FormSection>

        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-600">{errors.submit}</p>
          </div>
        )}

        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
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
      </form>
    </div>
  )
}

