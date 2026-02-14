---
description: Lineamientos de diseño para botones de texto puro en Casa Pellegrini
---

Este workflow describe los estándares visuales y técnicos para todos los botones de navegación, filtros y enlaces que consisten únicamente en texto (sin fondo sólido).

### 1. Estándares Visuales (Tailwind CSS)
Todos los botones de texto puro deben incluir las siguientes clases base:
- **Tamaño:** `text-xs` o `text-[10px]` para un look minimalista.
- **Transformación:** `uppercase` para jerarquía institucional.
- **Espaciado:** `tracking-museum` (definido como `0.15em` en `globals.css`).
- **Transición:** `transition-all duration-300` para cambios suaves.
- **Color Base:** `text-charcoal/60` (atenuado para estados inactivos).
- **Color Hover:** `hover:text-sienna` (activación con el color de acento).

### 2. Estado Activo (Active/Selected)
Cuando un botón representa la página actual o un filtro seleccionado, debe aplicar:
- **Color:** `text-sienna`.
- **Underline:** `border-b border-sienna`.
- **Espaciado de Borde:** `pb-1` (padding-bottom) para separar el subrayado del texto.
- **Posicionamiento:** `relative` (si el underline es un pseudo-elemento o borde absoluto).

### 3. Implementación Sugerida (Ejemplo React/Next.js)

```tsx
<button 
    className={`text-xs uppercase tracking-museum transition-all duration-300 relative pb-1 ${
        isActive ? 'text-sienna border-b border-sienna' : 'text-charcoal/60 hover:text-sienna'
    }`}
>
    NOMBRE DEL BOTÓN
</button>
```

### 4. Casos de Uso
- **Navbar:** Links de navegación principal (Inicio, Colecciones, Contacto).
- **Filtros de Galería:** Categorías (Muebles, Arte, etc.).
- **Paginación:** Números o flechas de texto.
- **Footer:** Links secundarios de navegación.
