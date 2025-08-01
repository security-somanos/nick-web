# Glitch 3D Setup Guide

## Configuración actual

### ✅ Scripts cargados globalmente en layout.tsx:
- Three.js desde CDN
- GLTFLoader desde CDN  
- glitchGL.min.js desde archivo local

### 📁 Estructura de archivos:
```
public/
  scripts/
    glitchGL.min.js  ← Reemplazar con archivo real
components/
  glitch-effect.tsx  ← Componente React simplificado
app/
  layout.tsx        ← Scripts cargados aquí
  page.tsx          ← Ejemplo de uso
```

## Uso del componente

```tsx
import { GlitchEffect } from "@/components/glitch-effect"

// En tu componente:
<GlitchEffect className="w-full h-full">
  {/* Contenido del efecto */}
</GlitchEffect>
```

## Características implementadas

✅ **Scripts globales** - Three.js y glitchGL cargados en el HTML
✅ **Componente simplificado** - Sin imports dinámicos
✅ **Responsive design** - Se adapta al tamaño del contenedor
✅ **Cleanup** - Limpieza automática de recursos
✅ **Error handling** - Manejo de errores si no carga la librería
✅ **TypeScript support** - Tipado completo

## Próximos pasos

1. **Reemplazar glitchGL.min.js** con el archivo real de la librería
2. **Personalizar el efecto** según tus necesidades
3. **Integrar con el diseño** de Nick Spanos

## Notas técnicas

- Los scripts se cargan al final del body para mejor performance
- El componente espera 100ms para que los scripts se carguen
- Incluye fallback si Three.js no está disponible
- Compatible con SSR (Server Side Rendering) 