# Styling Reference Guide

## Modal Component Improvements

### Before
```jsx
<div className="bg-card border border-border rounded-2xl shadow-2xl">
  <div className="flex items-center justify-between p-6 border-b border-border">
    {/* Simple header */}
  </div>
</div>
```

### After
```jsx
<div className="relative bg-gradient-to-br from-card to-card/80 border border-border/50 rounded-2xl shadow-2xl">
  <div className="flex items-center justify-between p-6 border-b border-border/30 bg-gradient-to-r from-primary/5 to-accent-secondary/5">
    {/* Enhanced header with gradient */}
  </div>
</div>
```

**Key Changes:**
- Gradient background from card to card/80
- Backdrop blur support
- Gradient header with accent colors
- Improved border opacity

---

## Form Input Enhancements

### Before
```jsx
<input
  className="px-4 py-2.5 bg-background border border-border rounded-lg text-foreground focus:ring-2"
/>
```

### After
```jsx
<input
  className="px-4 py-3.5 bg-background/50 border border-border rounded-xl focus:ring-2 focus:ring-primary hover:border-border/80 transition backdrop-blur-sm"
/>
```

**Improvements:**
- Increased padding (2.5 → 3.5)
- Rounded corners (lg → xl)
- Backdrop blur for depth
- Hover state with border opacity change
- Background opacity (50%)
- Smooth transition

---

## Button Styling Pattern

### Before
```jsx
<button className="px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark">
  Action
</button>
```

### After
```jsx
<button className="px-4 py-3.5 bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white rounded-xl font-semibold transition duration-200 shadow-lg hover:shadow-glow-blue">
  Action
</button>
```

**Enhancements:**
- Gradient background (both states)
- Rounded corners (lg → xl)
- Shadow effects (static + hover glow)
- Explicit duration timing
- Font weight increase
- Better hover state

---

## Card Component Pattern

### Before
```jsx
<div className="bg-card border border-border rounded-xl p-6">
  {/* Content */}
</div>
```

### After
```jsx
<div className={`bg-gradient-to-br from-color/5 to-card border border-border/50 rounded-xl p-6 hover:shadow-lg transition-all backdrop-blur-sm`}>
  {/* Content */}
</div>
```

**Improvements:**
- Subtle gradient overlay
- Reduced border opacity
- Hover shadow effect
- Backdrop blur for depth
- Smooth transition-all

---

## Header Layout Pattern

### Responsive Classes Structure

```jsx
<header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-40">
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
    {/* Left side - min-w-0 for text truncation */}
    <div className="slide-up min-w-0">
      {/* Title */}
    </div>
    
    {/* Right side - flex column on mobile, row on large */}
    <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
      {/* User info and buttons */}
    </div>
  </div>
</header>
```

**Responsive Behavior:**
- Mobile: Full width, stacked
- Small: Side-by-side, flexible
- Large: Optimized layout with proper spacing

---

## Error Message Component

### Before
```jsx
{errors.name && (
  <div className="text-danger text-sm">{errors.name}</div>
)}
```

### After
```jsx
{errors.name && (
  <div className="flex items-center gap-2 text-danger text-sm bg-danger/5 p-2.5 rounded-lg border border-danger/20">
    <AlertCircle className="w-4 h-4 flex-shrink-0" />
    {errors.name}
  </div>
)}
```

**Improvements:**
- Background color with low opacity
- Icon indicator
- Border with color
- Better visual hierarchy
- Improved spacing

---

## Color Opacity Scale

Common opacity values used:
- **5** - Very light, subtle (5%)
- **10** - Light, gentle (10%)
- **20** - Medium-light, noticeable (20%)
- **30** - Medium, clear (30%)
- **50** - Moderate, transparent (50%)

---

## Tailwind Class Combinations

### Input Field (Complete)
```
w-full px-4 py-3.5 bg-background/50 border border-border rounded-xl 
text-foreground placeholder-muted focus:ring-2 focus:ring-primary 
focus:border-transparent outline-none transition hover:border-border/80 
backdrop-blur-sm
```

### Button (Complete)
```
px-4 py-3.5 bg-gradient-to-r from-primary to-primary-light 
hover:from-primary-dark hover:to-primary text-white rounded-xl 
font-semibold transition duration-200 shadow-lg hover:shadow-glow-blue 
disabled:opacity-50 disabled:cursor-not-allowed
```

### Card (Complete)
```
bg-gradient-to-br from-color/5 to-card border border-border/50 
rounded-xl p-6 hover:shadow-lg transition-all backdrop-blur-sm 
hover:border-color/50
```

---

## Size & Spacing Standards

### Padding
- Compact: 2-3 (0.5-0.75rem)
- Normal: 4-6 (1-1.5rem)
- Comfortable: 8 (2rem)
- Spacious: 10+ (2.5rem+)

### Border Radius
- Small inputs: lg (8px)
- Standard cards: xl (12px)
- Large cards: 2xl (16px)
- Extra large: 3xl (24px)

### Font Sizes
- Label: sm (0.875rem)
- Body: base (1rem)
- Heading: lg-2xl (1.125rem - 1.5rem)
- Large heading: 3xl-4xl (1.875rem - 2.25rem)

---

## Animation Combinations

### Entry Animation
```
<div className="slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
```

### Hover Transform
```
className="hover:scale-110 transition transform"
```

### Smooth Color Transition
```
className="hover:text-primary transition duration-200"
```

---

## Z-Index Scale

- Modal backdrop & content: z-50
- Header: z-40
- Default: no z-index
- Background elements: no z-index

---

## Accessibility Checklist

- [ ] Color contrast ratio ≥ 4.5:1 for text
- [ ] Focus indicator visible (ring)
- [ ] Required fields marked with asterisk
- [ ] Error messages with icon + text
- [ ] Hover states for all interactive elements
- [ ] Touch targets minimum 44x44px
- [ ] Proper semantic HTML
- [ ] Alt text for images
