# Home Page Content Editing Guide

## Where to Edit Home Page Content

The home page (`/`) displays content from multiple sources. Here's where to edit each section:

### 1. **Hero Section** (Top Banner)
**Current Status:** ❌ Hardcoded in `components/pages/HomeClient.tsx`
- Hero title: "We build modern software that actually moves your business forward"
- Hero description: "SaaS, AI automation, mobile apps, and web experiences that scale with your vision"
- Button text: "Book a strategy call"

**To Edit:** Currently requires code changes. Can be made editable via admin panel.

---

### 2. **Featured Services Section** ("What We Do")
**Location:** `/admin/services`
- Shows services where `isFeatured: true`
- Maximum 5 services displayed
- Ordered by creation date (oldest first)

**How to Edit:**
1. Go to `/admin/services`
2. Click "Edit" on any service
3. Check the "Featured Service" checkbox
4. Save changes

**Note:** Only featured services appear on the home page.

---

### 3. **Featured Solutions Section**
**Location:** `/admin/solutions`
- Shows solutions where `isFeatured: true` AND `status: 'LIVE'`
- Maximum 3 solutions displayed
- Ordered by creation date (oldest first)

**How to Edit:**
1. Go to `/admin/solutions`
2. Click "Edit" on any solution
3. Check the "Featured" checkbox
4. Set Status to "LIVE"
5. Save changes

---

### 4. **Case Studies Section**
**Location:** `/admin/case-studies`
- Shows latest 3 case studies
- Ordered by creation date (newest first)

**How to Edit:**
1. Go to `/admin/case-studies`
2. Create new case studies or edit existing ones
3. Latest 3 will automatically appear on home page

---

### 5. **Blog Posts Section**
**Location:** `/admin/blog`
- Shows latest 3 published blog posts
- Only published posts appear
- Ordered by publish date (newest first)

**How to Edit:**
1. Go to `/admin/blog`
2. Create new blog posts or edit existing ones
3. Make sure to publish them (set "Published" status)
4. Latest 3 published posts will appear on home page

---

### 6. **Timeline Events Section**
**Location:** `/admin/timeline`
- Shows first 3 timeline events
- Ordered by `order` field (ascending)

**How to Edit:**
1. Go to `/admin/timeline`
2. Create new timeline events or edit existing ones
3. Set the "Order" field (lower numbers appear first)
4. First 3 events will appear on home page

---

### 7. **Process Steps Section** ("How We Work")
**Current Status:** ❌ Hardcoded in `components/pages/HomeClient.tsx`
- 4 steps: Discover, Design, Build, Grow
- Each with title, description, output, and icon

**To Edit:** Currently requires code changes. Can be made editable via admin panel.

---

## Summary

### ✅ Editable via Admin Panel:
- Featured Services → `/admin/services` (mark as featured)
- Featured Solutions → `/admin/solutions` (mark as featured, set status to LIVE)
- Case Studies → `/admin/case-studies`
- Blog Posts → `/admin/blog` (must be published)
- Timeline Events → `/admin/timeline` (set order field)

### ❌ Currently Hardcoded (Requires Code Changes):
- Hero section text
- Process steps section

---

## Recommendation

Would you like me to create a dedicated "Home Page Settings" section in the admin panel where you can edit:
- Hero title and description
- Process steps
- Other home page content

This would make the entire home page fully editable through the CMS!

