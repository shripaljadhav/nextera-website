'use client'

import { useState } from 'react'
import Section from '@/components/layout/Section'
import PageShell from '@/components/layout/PageShell'

type Step = 1 | 2 | 3 | 4 | 5 | 6

export default function StartPage() {
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [formData, setFormData] = useState({
    whatToBuild: [] as string[],
    currentStage: '',
    outcome: '',
    timeline: '',
    budgetRange: '',
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleMultiSelect = (value: string) => {
    setFormData(prev => ({
      ...prev,
      whatToBuild: prev.whatToBuild.includes(value)
        ? prev.whatToBuild.filter(v => v !== value)
        : [...prev.whatToBuild, value],
    }))
  }

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((currentStep + 1) as Step)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'START_WIZARD',
          wizardData: formData,
        }),
      })

      if (response.ok) {
        setCurrentStep(6) // Success step
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const progress = (currentStep / 5) * 100

  return (
    <PageShell title="Start Your Project" description="Guided brief to help us understand your needs.">
      <section className="py-20 bg-gray-50">
        <Section maxWidth="2xl">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Step {currentStep} of 5</span>
              <span className="text-sm font-medium text-gray-700">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg border border-gray-200">
            {/* Step 1: What do you want to build? */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">What do you want to build?</h2>
                <p className="text-gray-600 mb-6">Select all that apply</p>
                <div className="space-y-3">
                  {['Web app', 'Mobile app', 'SaaS', 'AI automation', 'E-commerce', 'Landing page', 'Other'].map((option) => (
                    <label
                      key={option}
                      className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary-300 hover:bg-primary-50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={formData.whatToBuild.includes(option)}
                        onChange={() => handleMultiSelect(option)}
                        className="mr-3"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Current stage */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">What's your current stage?</h2>
                <div className="space-y-3">
                  {['Idea', 'MVP', 'Existing product', 'Scale-up'].map((option) => (
                    <label
                      key={option}
                      className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary-300 hover:bg-primary-50 transition-colors"
                    >
                      <input
                        type="radio"
                        name="currentStage"
                        value={option}
                        checked={formData.currentStage === option}
                        onChange={(e) => setFormData(prev => ({ ...prev, currentStage: e.target.value }))}
                        className="mr-3"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Most important outcome */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">What's the most important outcome?</h2>
                <div className="space-y-3">
                  {['More revenue', 'Efficiency', 'Better UX', 'Modern stack', 'Scale', 'Other'].map((option) => (
                    <label
                      key={option}
                      className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary-300 hover:bg-primary-50 transition-colors"
                    >
                      <input
                        type="radio"
                        name="outcome"
                        value={option}
                        checked={formData.outcome === option}
                        onChange={(e) => setFormData(prev => ({ ...prev, outcome: e.target.value }))}
                        className="mr-3"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Timeline & Budget */}
            {currentStep === 4 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Timeline & Budget</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Timeline</label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select...</option>
                      <option value="asap">ASAP</option>
                      <option value="1-month">Within 1 month</option>
                      <option value="3-months">Within 3 months</option>
                      <option value="6-months">Within 6 months</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData(prev => ({ ...prev, budgetRange: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select...</option>
                      <option value="under-10k">Under $10k</option>
                      <option value="10k-25k">$10k - $25k</option>
                      <option value="25k-50k">$25k - $50k</option>
                      <option value="50k-100k">$50k - $100k</option>
                      <option value="100k-plus">$100k+</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Contact details */}
            {currentStep === 5 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Additional Message</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Success Step */}
            {currentStep === 6 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">✓</div>
                <h2 className="text-2xl font-bold mb-4">Thank you!</h2>
                <p className="text-gray-600 mb-6">We've received your brief and will be in touch within 24 hours.</p>
                <a href="/" className="text-primary-600 font-medium hover:underline">
                  Return to home →
                </a>
              </div>
            )}

            {/* Navigation Buttons */}
            {currentStep < 6 && (
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Back
                </button>
                {currentStep < 5 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                )}
              </div>
            )}
          </form>
        </Section>
      </section>
    </PageShell>
  )
}

