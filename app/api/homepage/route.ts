import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth-helpers'

// GET - Fetch home page settings
export async function GET() {
  try {
    const settings = await prisma.setting.findMany({
      where: {
        key: {
          in: [
            'homepage_hero_title',
            'homepage_hero_subtitle',
            'homepage_hero_description',
            'homepage_hero_primary_button_text',
            'homepage_hero_primary_button_link',
            'homepage_hero_secondary_button_text',
            'homepage_hero_secondary_button_link',
            'homepage_process_steps',
          ],
        },
      },
    })

    // Convert to object
    const settingsObj: Record<string, any> = {}
    settings.forEach((setting) => {
      if (setting.type === 'JSON') {
        settingsObj[setting.key] = JSON.parse(setting.value)
      } else {
        settingsObj[setting.key] = setting.value
      }
    })

    return NextResponse.json({ settings: settingsObj })
  } catch (error) {
    console.error('Error fetching home page settings:', error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

// PUT - Update home page settings
export async function PUT(request: NextRequest) {
  try {
    await requireAuth()

    const body = await request.json()
    const { settings } = body

    // Update or create each setting
    for (const [key, value] of Object.entries(settings)) {
      const settingValue = typeof value === 'object' ? JSON.stringify(value) : String(value)
      const settingType = typeof value === 'object' ? 'JSON' : 'STRING'

      await prisma.setting.upsert({
        where: { key },
        update: {
          value: settingValue,
          type: settingType,
        },
        create: {
          key,
          value: settingValue,
          type: settingType,
        },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating home page settings:', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}

