'use client'

import { useState, useEffect } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

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

interface SectionManagerProps {
  sections: Section[]
  onChange: (sections: Section[]) => void
  onEdit?: (id: string) => void
}

function SortableSectionItem({ section, onEdit, onDelete }: { 
  section: Section
  onEdit: (id: string) => void
  onDelete: () => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      hero: 'bg-blue-100 text-blue-700 border-blue-200',
      content: 'bg-green-100 text-green-700 border-green-200',
      cta: 'bg-purple-100 text-purple-700 border-purple-200',
      features: 'bg-orange-100 text-orange-700 border-orange-200',
      testimonials: 'bg-pink-100 text-pink-700 border-pink-200',
      custom: 'bg-gray-100 text-gray-700 border-gray-200',
    }
    return colors[type] || colors.custom
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-primary-300 transition-all"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            </svg>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTypeColor(section.type)}`}>
                {section.type.toUpperCase()}
              </span>
              <span className="text-sm text-gray-500">Order: {section.order}</span>
            </div>
            <h3 className="font-semibold text-gray-900">{section.title || 'Untitled Section'}</h3>
            {section.content && (
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{section.content.replace(/<[^>]*>/g, '').substring(0, 100)}...</p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={() => onEdit(section.id)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit section"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete section"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function SectionManager({ sections, onChange, onEdit }: SectionManagerProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex(s => s.id === active.id)
      const newIndex = sections.findIndex(s => s.id === over.id)

      const newSections = arrayMove(sections, oldIndex, newIndex).map((section, index) => ({
        ...section,
        order: index + 1,
      }))

      onChange(newSections)
    }
  }

  const handleAddSection = () => {
    if (!mounted) return
    
    // Use a more unique ID to avoid hydration issues
    const newSection: Section = {
      id: `section-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'content',
      title: 'New Section',
      content: '',
      order: sections.length + 1,
      styles: {
        backgroundColor: '#ffffff',
        textColor: '#000000',
        padding: 'normal',
      },
    }
    onChange([...sections, newSection])
  }

  const handleEditSection = (id: string) => {
    if (onEdit) {
      onEdit(id)
    }
  }

  const handleDeleteSection = (id: string) => {
    onChange(sections.filter(s => s.id !== id).map((section, index) => ({
      ...section,
      order: index + 1,
    })))
  }

  if (!mounted) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Page Sections</h3>
            <p className="text-sm text-gray-600">Loading...</p>
          </div>
        </div>
        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <p className="text-gray-600">Loading section manager...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Page Sections</h3>
          <p className="text-sm text-gray-600">Drag to reorder sections</p>
        </div>
        <button
          onClick={handleAddSection}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Section</span>
        </button>
      </div>

      {sections.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <p className="text-gray-600 mb-4">No sections yet</p>
          <button
            onClick={handleAddSection}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Add your first section
          </button>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sections.map(s => s.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {sections.map((section) => (
                <SortableSectionItem
                  key={section.id}
                  section={section}
                  onEdit={() => handleEditSection(section.id)}
                  onDelete={() => handleDeleteSection(section.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  )
}

