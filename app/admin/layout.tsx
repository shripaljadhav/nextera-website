import Link from 'next/link'
import { getSession } from '@/lib/auth-helpers'
import LogoutButton from '@/components/admin/LogoutButton'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  
  // If no session, don't render nav (login page will handle its own layout)
  if (!session) {
    return <>{children}</>
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/pages', label: 'Pages' },
    { href: '/admin/products', label: 'Products' },
    { href: '/admin/services', label: 'Services' },
    { href: '/admin/solutions', label: 'Solutions' },
    { href: '/admin/case-studies', label: 'Case Studies' },
    { href: '/admin/blog', label: 'Blog' },
    { href: '/admin/careers', label: 'Careers' },
    { href: '/admin/leads', label: 'Leads' },
    { href: '/admin/timeline', label: 'Timeline' },
    { href: '/admin/labs', label: 'Labs' },
    { href: '/admin/settings', label: 'Settings' },
  ]

  return (
    <div className="admin-layout min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/admin" className="flex items-center space-x-2 px-4">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <span className="text-xl font-bold text-gray-900 hidden sm:block">Nextera CMS</span>
              </Link>
              <div className="hidden lg:flex ml-8 space-x-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-3 px-4 py-2 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 text-xs font-semibold">
                    {session.user?.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="hidden md:block">
                  <p className="text-xs font-medium text-gray-900">{session.user?.name || 'Admin'}</p>
                  <p className="text-xs text-gray-500">{session.user?.email}</p>
                </div>
              </div>
              <Link
                href="/"
                target="_blank"
                className="hidden sm:flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>View Site</span>
              </Link>
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-2 overflow-x-auto">
        <div className="flex space-x-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center px-3 py-2 text-xs font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg whitespace-nowrap transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
