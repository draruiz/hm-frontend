# Copilot Instructions — Dra. Ruiz AI Frontend

## Arquitectura: Feature-Sliced Design (FSD)

Organiza el código siguiendo las capas de FSD. Cada feature nueva debe vivir en su propia carpeta con la estructura:

```
src/
  features/
    <feature-name>/
      ui/          # Componentes de presentación
      model/       # Tipos, stores (zustand), schemas (zod)
      api/         # Servicios y queries (react-query)
      hooks/       # Custom hooks de la feature
      index.ts     # Barrel export (API pública de la feature)
  shared/
    ui/            # Componentes globales reutilizables
    hooks/         # Hooks compartidos
    lib/           # Utilidades genéricas
    config/        # Configuración global
```

- Las features no deben importar directamente de otras features; usa `shared/` para código compartido.
- Exporta solo lo necesario desde el `index.ts` de cada feature.

## Formularios: React Hook Form + Zod

- Todos los formularios deben usar `react-hook-form` con `@hookform/resolvers/zod`.
- Define el schema Zod en `model/` (o junto al formulario si es pequeño) y deriva el tipo con `z.infer<typeof schema>`.
- Usa `useForm<FormType>({ resolver: zodResolver(schema) })`.
- Prefiere `Controller` o `register` según el componente MUI; evita estados locales para valores del formulario.

## Reutilización de componentes globales

- Antes de crear un componente nuevo, verifica si ya existe uno reutilizable en `src/components/` o `src/shared/ui/`.
- Si un componente se usa en más de una feature, muévelo a `shared/ui/`.
- Componentes comunes del proyecto: `Modal`, `Backdrop`, `DropdownMenu`, `Icon`, `ErrorBoundary`, botones en `button/`.

## Performance en animaciones

- Prioriza `transform` y `opacity` para animaciones CSS (propiedades que no disparan layout/paint).
- Usa `will-change` con moderación y solo cuando haya jank medible.
- Para Motion (framer-motion): prefiere `layout` animations y `AnimatePresence` con `mode="wait"`.
- Envuelve componentes pesados con animación en `React.memo` o `React.lazy` si no son visibles al cargar.
- Prefiere `requestAnimationFrame` sobre `setTimeout` para sincronizar con el frame del navegador.
- GSAP: usa `gsap.context()` para cleanup en `useEffect` y evita re-renders innecesarios.

## Separación lógica / markup con Custom Hooks

- Extrae la lógica de negocio, side-effects y transformaciones de datos a custom hooks (`use<Feature>.ts`).
- El componente solo debería contener JSX y bindeo de props; toda la lógica vive en el hook.
- Patrón recomendado:

```tsx
// hooks/useFeature.ts
export function useFeature() {
  // state, queries, handlers
  return { data, handlers, state };
}

// ui/FeatureView.tsx
export function FeatureView() {
  const { data, handlers, state } = useFeature();
  return <>{/* solo markup */}</>;
}
```
