# Wedding Landing Page

A beautiful single-page wedding website for Nicole & Lashca's wedding on April 1, 2026.

## 🎨 Design Theme

**South of France / Garden Wedding Chic**

- Elegant, airy, soft textures
- Minimalist but warm
- Fun and casual tone

### Color Palette

- **Background:** Cream/Off-white (#FDFCF8)
- **Primary Accent:** Sage Green (#8B9D83)
- **Secondary Accent:** Dusty Pink (#D4A5A5)
- **Text:** Slate Grey (#4A5568)

### Typography

- **Headings:** Playfair Display (elegant serif)
- **Body:** Lato (clean sans-serif)

## 📍 Access the Page

Visit: `http://localhost:3000/wedding`

## 🏗️ Structure

The landing page consists of the following sections (in order):

1. **Hero Section** - Couple names, date, countdown timer with parallax background
2. **Our Story** - Narrative with placeholder images
3. **Event Details** - Timeline of ceremony, cocktail hour, and reception
4. **Venue & Map** - Venue description with embedded Google Map
5. **Accommodation** - Grid of 8 accommodation options
6. **Transport** - Uber estimates and car rental info
7. **Dress Code** - South of France theme with color swatches
8. **Registry** - Links to Yuppiechef, @home, and Woolworths
9. **Footer** - Copyright and message

## ✨ Features

- ✅ Smooth scroll navigation
- ✅ Parallax hero background
- ✅ Live countdown timer to wedding day
- ✅ Fade-in animations on scroll
- ✅ Hover effects on cards
- ✅ Mobile-first responsive design
- ✅ Optimized images
- ✅ Accessibility compliant

## 🖼️ Images

### Current Images

- **Hero Background:** `/public/images/wedding/hero-background.png` (Gemini image)
- **Venue Landscape:** `/public/images/wedding/venue-landscape.jpg`

### Placeholder Images

The following sections have placeholder spaces for images to be added later:

- Our Story section (3 photo placeholders)
- Accommodation cards (8 image placeholders)

To add images later, simply replace the placeholder divs with actual images.

## 🔧 Configuration

### Environment Variables

Add these to your `.env` file:

```env
NEXT_PUBLIC_WEDDING_DATE=2026-04-01T14:30:00+02:00
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### Google Maps API Key

To enable the embedded map:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "Maps Embed API"
4. Create credentials (API Key)
5. Add the API key to `.env`

## 🎯 Next Steps

### To Make This the Main Homepage

Option 1: Replace current homepage

```bash
# Backup current homepage
mv src/app/page.tsx src/app/old-page.tsx

# Make wedding page the homepage
mv src/app/wedding/page.tsx src/app/page.tsx
```

Option 2: Keep both and redirect
Add to `src/app/page.tsx`:

```typescript
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/wedding");
}
```

### Adding Real Images

1. **Our Story Photos:**

   - Add 3 couple photos to `/public/images/wedding/`
   - Update `OurStorySection.tsx` to use real images instead of placeholders

2. **Accommodation Photos:**
   - Add 8 accommodation photos to `/public/images/wedding/accommodations/`
   - Update `AccommodationSection.tsx` to use real images

### Customizing Content

All content can be customized by editing the respective component files in:
`/src/components/wedding/`

## 📱 Testing

### Desktop

```bash
npm run dev
# Visit http://localhost:3000/wedding
```

### Mobile

1. Start dev server: `npm run dev`
2. Find your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
3. Visit from mobile: `http://YOUR_IP:3000/wedding`

### Production Build

```bash
npm run build
npm run start
```

## 🚀 Deployment

The site is ready to deploy to Vercel:

```bash
vercel
```

Or push to GitHub and connect to Vercel for automatic deployments.

## 📝 Notes

- The countdown timer updates every second
- All animations are optimized for 60fps
- Images are lazy-loaded for performance
- Smooth scrolling works on all modern browsers
- Mobile-first responsive design ensures great experience on all devices

## 🎨 Customization Tips

### Changing Colors

Update CSS variables in `src/app/globals.css`:

```css
:root {
  --wedding-cream: #fdfcf8;
  --wedding-sage: #8b9d83;
  --wedding-pink: #d4a5a5;
  /* ... */
}
```

### Adjusting Animations

Modify animation variants in component files:

```typescript
const fadeInVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
```

### Adding Sections

Create new component in `/src/components/wedding/` and add to `/src/app/wedding/page.tsx`

## 🐛 Troubleshooting

**Countdown not showing?**

- Check `NEXT_PUBLIC_WEDDING_DATE` in `.env`
- Ensure date format is correct: `YYYY-MM-DDTHH:mm:ss+TZ`

**Map not loading?**

- Verify `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is set
- Check API key has Maps Embed API enabled
- Check browser console for errors

**Images not loading?**

- Verify images are in `/public/images/wedding/`
- Check file names match exactly (case-sensitive)
- Clear Next.js cache: `rm -rf .next`

## 💝 Made with Love

Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.
