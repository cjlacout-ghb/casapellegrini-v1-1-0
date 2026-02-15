---
name: admin_modal
description: Instructions and templates for creating a robust developer/administrator modal for debugging and state management with premium aesthetics.
---

# Admin Modal Skill

This skill provides a standardized approach to implementing an "Admin Modal" or "Login Access" within a Next.js application. It is designed to be discreet, secure, and visually premium.

## Core Logic

An Admin Modal should follow these principles:
1. **Hidden/Discreet Entry**: Use a "Developer Gesture" (triple-click) or a "Discrete Link" (a separator or a hidden pixel) in the footer.
2. **Visual Excellence**: Matches the brand's aesthetic. For premium sites, use dark overlays, serif typography, and elegant iconography.
3. **State Management**: Use a simple local state to control visibility and handle authentication/actions.

## Activation Methods

### 1. The Developer Gesture (Triple Click)
Best for total invisibility.
```tsx
const [clickCount, setClickCount] = useState(0);
const [isOpen, setIsOpen] = useState(false);

const handleGesture = () => {
  setClickCount(prev => {
    if (prev + 1 >= 3) {
      setIsOpen(true);
      return 0;
    }
    return prev + 1;
  });
  setTimeout(() => setClickCount(0), 2000);
};
```

### 2. The Hybrid Approach (Discreet Link)
Best for usability without cluttering. Use a dot, a separator, or a specific part of the copyright text.
```tsx
<div className="flex items-center gap-2">
  <span>© 2024 Project Name</span>
  <span 
    onClick={() => setIsOpen(true)} 
    className="opacity-20 hover:opacity-100 cursor-default transition-opacity"
  >
    •
  </span>
  <span>All rights reserved</span>
</div>
```

## UI Guidelines (Premium Admin)
1. **Background**: Dark, high-contrast overlay (e.g., `#1A1A1A`).
2. **Typography**: Use the project's primary serif font for headings.
3. **Inputs**: Bordered fields with internal icons and clear labels.
4. **Button**: Bold, high-contrast accent color with micro-animations.

## Template Structure
Create an `AdminModal.tsx` that accepts:
- `isOpen`: boolean
- `onClose`: () => void
- `onLogin`: (credentials) => void (or children for custom admin tools)

## Implementation Steps
1. Define the trigger in a global component (Footer/Header).
2. Create the Modal component with the provided design.
3. Implement local authentication or developer tools.
