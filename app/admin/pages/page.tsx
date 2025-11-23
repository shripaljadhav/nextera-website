import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth-helpers'
import Breadcrumbs from '@/components/admin/Breadcrumbs'
import DataTable from '@/components/admin/DataTable'

// Static website pages with edit links
const staticPages = [
  { 
    id: 'home', 
    title: 'Home', 
    slug: '/', 
    type: 'Static', 
    contentDriven: true,
    editHref: '/admin/homepage',
    icon: '🏠',
    description: 'Main landing page with hero section and featured content'
  },
  { 
    id: 'services', 
    title: 'Services', 
    slug: '/services', 
    type: 'Static', 
    contentDriven: true,
    editHref: '/admin/services',
    icon: '⚙️',
    description: 'Services overview page - edit services content'
  },
  { 
    id: 'solutions', 
    title: 'Solutions', 
    slug: '/solutions', 
    type: 'Static', 
    contentDriven: true,
    editHref: '/admin/solutions',
    icon: '🚀',
    description: 'Solutions overview page - edit solutions content'
  },
  { 
    id: 'case-studies', 
    title: 'Case Studies', 
    slug: '/case-studies', 
    type: 'Static', 
    contentDriven: true,
    editHref: '/admin/case-studies',
    icon: '📊',
    description: 'Case studies showcase - edit case studies'
  },
  { 
    id: 'blog', 
    title: 'Blog', 
    slug: '/blog', 
    type: 'Static', 
    contentDriven: true,
    editHref: '/admin/blog',
    icon: '✍️',
    description: 'Blog listing page - edit blog posts'
  },
  { 
    id: 'careers', 
    title: 'Careers', 
    slug: '/careers', 
    type: 'Static', 
    contentDriven: true,
    editHref: '/admin/careers',
    icon: '💼',
    description: 'Careers page - edit job postings'
  },
  { 
    id: 'journey', 
    title: 'Journey', 
    slug: '/journey', 
    type: 'Static', 
    contentDriven: true,
    editHref: '/admin/timeline',
    icon: '🗺️',
    description: 'Company journey timeline - edit timeline events'
  },
  { 
    id: 'labs', 
    title: 'Labs', 
    slug: '/labs', 
    type: 'Static', 
    contentDriven: true,
    editHref: '/admin/labs',
    icon: '🧪',
    description: 'Labs showcase - edit lab items'
  },
  { 
    id: 'about', 
    title: 'About', 
    slug: '/about', 
    type: 'Static', 
    contentDriven: true,
    editHref: '/admin/settings',
    icon: 'ℹ️',
    description: 'About page - edit company stats and info'
  },
  { 
    id: 'contact', 
    title: 'Contact', 
    slug: '/contact', 
    type: 'Static', 
    contentDriven: false,
    editHref: null,
    icon: '📧',
    description: 'Contact form page (hardcoded)'
  },
  { 
    id: 'start', 
    title: 'Start Project', 
    slug: '/start', 
    type: 'Static', 
    contentDriven: false,
    editHref: null,
    icon: '🎯',
    description: 'Project intake wizard (hardcoded)'
  },
  { 
    id: 'privacy', 
    title: 'Privacy Policy', 
    slug: '/privacy', 
    type: 'Static', 
    contentDriven: false,
    editHref: null,
    icon: '🔒',
    description: 'Privacy policy page (hardcoded)'
  },
  { 
    id: 'terms', 
    title: 'Terms of Service', 
    slug: '/terms', 
    type: 'Static', 
    contentDriven: false,
    editHref: null,
    icon: '📜',
    description: 'Terms of service page (hardcoded)'
  },
]

export default async function AdminPagesPage() {
  await requireAuth()
  const customPages = await prisma.page.findMany({
    orderBy: { createdAt: 'desc' },
  })

  const customColumns = [
    {
      key: 'slug',
      label: 'Title',
      sortable: true,
      type: 'slug' as const,
    },
    {
      key: 'isPublished',
      label: 'Status',
      type: 'status' as const,
    },
    {
      key: 'createdAt',
      label: 'Created',
      sortable: true,
      type: 'date' as const,
    },
  ]

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[
        { label: 'Dashboard', href: '/admin' },
        { label: 'Pages' },
      ]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pages</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage all website pages. Edit content through their respective admin sections.
          </p>
        </div>
        <Link
          href="/admin/pages/new"
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 shadow-sm transition-colors font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Custom Page</span>
        </Link>
      </div>

      {/* Static Website Pages - Beautiful Card Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Website Pages</h2>
            <p className="mt-1 text-sm text-gray-600">
              Static pages with database-driven content. Click to edit their content.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staticPages.map((page) => (
            <div
              key={page.id}
              className="group bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      {page.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{page.title}</h3>
                      <p className="text-xs font-mono text-gray-500 mt-0.5">{page.slug}</p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{page.description}</p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    {page.contentDriven ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Database
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Hardcoded
                      </span>
                    )}
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Static
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mt-4">
                  {page.editHref ? (
                    <Link
                      href={page.editHref}
                      className="flex-1 inline-flex items-center justify-center space-x-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors text-sm font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span>Edit Content</span>
                    </Link>
                  ) : (
                    <div className="flex-1 px-4 py-2 bg-gray-50 text-gray-400 rounded-lg text-sm font-medium text-center cursor-not-allowed">
                      Not Editable
                    </div>
                  )}
                  <a
                    href={page.slug}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Pages (from database) */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Custom Pages</h2>
            <p className="mt-1 text-sm text-gray-600">
              Fully customizable pages created through the CMS.
            </p>
          </div>
        </div>

        <DataTable
          columns={customColumns}
          data={customPages}
          searchPlaceholder="Search custom pages..."
          emptyMessage={
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-lg font-medium text-gray-900 mb-2">No custom pages yet</p>
              <p className="text-sm text-gray-600 mb-4">Create your first custom page to get started</p>
              <Link
                href="/admin/pages/new"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Create Custom Page</span>
              </Link>
            </div>
          }
          actions={{
            editHref: '/admin/pages/[id]',
            viewHref: '/[slug]',
            showView: true,
          }}
        />
      </div>
    </div>
  )
}
