# CredNova - Animations & Visual Enhancements Guide

## Intro Screen
The app now features a premium intro screen that displays when users first visit:
- Animated CredNova branding with gradient text
- Loading progress bar with animated fill
- Dynamic loading messages ("Analyzing your data..." → "Calculating score..." → "Preparing dashboard...")
- Glow background effects with purple radial gradient
- 5-second presentation before redirecting to dashboard/login
- Smooth fade animations for all text elements

## Button Animations

### 1. AnimatedButton (Primary)
The standard button used throughout the app with:
- **Hover Effect**: Scale up by 5% smoothly
- **Tap Effect**: Scale down to 95% for tactile feedback
- **Variants**: Primary, Secondary, Outline, Ghost, Danger, Success, Glow
- **Loading State**: Rotating spinner with "Loading..." text
- **Icon Support**: Left/right icon positioning with fade-in animations
- **Glow Variants**: Pulsing box-shadow for AI action buttons

### 2. Glow Button (AI Actions)
For high-impact AI operations:
- Continuous pulsing glow animation (2-second cycle)
- Alternates between purple (#7c3aed) and blue (#3b82f6)
- Enhanced hover scale (1.06x)
- Gradient background (purple to blue)
- Perfect for "Generate AI Insights", "Simulate Score" buttons

### 3. Loading Button
For operations that take time:
- Animated spinner that rotates infinitely
- Text dims when loading to indicate disabled state
- Smooth hover and tap animations
- Disables user interaction while loading

### 4. Button Variants Styling

**Primary**: Gradient purple-to-blue with glow shadow
**Secondary**: Glass-morphism effect with backdrop blur and white border
**Outline**: Purple border with hover background tint
**Ghost**: Minimal style, pure hover effect
**Danger**: Red background for destructive actions (Reset, Delete)
**Success**: Green background for positive confirmations
**Glow**: Pulsing AI-style with continuous animation

## Component Animations

### Credit Profile Dropdown
- Smooth open/close animations
- Staggered content reveal
- Hover effects on action buttons inside dropdown

### Score Circle
- Animated circumference drawing on load
- Smooth number counter animation to target score
- Pulsing glow effect around the circle

### Feature Cards (GlassCard)
- Staggered entrance animations
- Hover lift effect (translateY)
- Glow effect intensifies on hover
- Smooth backdrop blur transitions

### Navigation
- Smooth button state transitions
- Scale animations on active nav items
- Color gradient transitions on hover

### Financial Forms
- Input field animations on focus
- Smooth height transitions for expandable sections
- Animated number displays with counter effects

### Activity Timeline
- Staggered item animations from top to bottom
- Animated connecting lines between events
- Smooth icon rotations on hover

## Animation Principles Used

1. **Framer Motion**: All animations use the Framer Motion library for smooth, performant motion
2. **Spring Physics**: Buttons use spring stiffness (300) for natural, bouncy feel
3. **Staggered Animations**: Multiple elements animate in sequence for visual flow
4. **Infinite Loops**: Loading spinners and glow effects use infinite repeat
5. **Gesture-Based**: Hover and tap animations provide tactile feedback
6. **Accessibility**: All animations respect prefers-reduced-motion settings via Framer Motion

## How to Use These Components

```tsx
// Standard button with animation
import { AnimatedButton } from '@/components/ui/animated-button';

<AnimatedButton variant="primary" onClick={handleClick}>
  Check Score
</AnimatedButton>

// AI action button with glow
<AnimatedButton variant="glow" onClick={handleSimulate}>
  Generate AI Insights
</AnimatedButton>

// Danger action
<AnimatedButton variant="danger" onClick={handleReset}>
  Reset Data
</AnimatedButton>

// Loading state
<AnimatedButton isLoading={isLoading} onClick={handleSubmit}>
  Submit
</AnimatedButton>

// With icon
<AnimatedButton icon={<ZapIcon />} iconPosition="left">
  Simulate Future
</AnimatedButton>
```

## Performance Notes
- All animations use CSS transforms (scale, translateY) for GPU acceleration
- Framer Motion automatically optimizes motion for 60fps performance
- Glow effects use box-shadow (performant on modern browsers)
- No layout thrashing; animations are physics-based, not frame-based

## Visual Hierarchy
- **Glow buttons** (Most prominent) - AI actions, primary CTAs
- **Primary buttons** (High) - Main action buttons with gradient
- **Secondary buttons** (Medium) - Alternative actions with glass effect
- **Ghost buttons** (Low) - Minimal, secondary interactions

---

**Last Updated**: April 24, 2026
**App Version**: CredNova v1.0
