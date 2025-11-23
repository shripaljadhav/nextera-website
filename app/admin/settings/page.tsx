import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth-helpers'

export default async function AdminSettingsPage() {
  await requireAuth()
  const settings = await prisma.setting.findMany({
    orderBy: { key: 'asc' },
  })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">Site Settings</h2>
        <div className="space-y-4">
          {settings.map((setting) => (
            <div key={setting.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h3 className="font-medium">{setting.key}</h3>
                {setting.description && (
                  <p className="text-sm text-gray-500">{setting.description}</p>
                )}
              </div>
              <button className="text-primary-600 hover:underline text-sm">
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

