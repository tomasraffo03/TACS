# Frontend Guidelines - TACS World Cup App

Este documento sirve como contexto principal de desarrollo (React + Tailwind CSS) para asistentes de IA. El proyecto frontend está en `/frontend`.

---

## 1. Principios de UI/UX

- **Estética base**: Layout con Sidebar izquierdo fijo (`w-60`, gradiente rojo) y Topbar (`h-[52px]`, fondo blanco con `border-b border-gray-200`). El área de contenido principal usa `bg-gray-50`. Todo debe integrarse fluidamente a este marco.
- **Tema**: **Claro**. Fondo blanco/gris, texto oscuro (`text-gray-900`), accent **rojo** (`#D82D31`) para subastas y CTAs. No usar dark mode.
- **Referencia visual canónica**: `DashboardPage.tsx` + `MainLayout.tsx`. Cualquier nueva pantalla debe sentirse parte del mismo sistema.
- **Feedback visual**: Siempre usar `transition-all duration-150` (o `duration-200`) para hover, active y focus en botones, links y cards.
- **Micro-animaciones**: Las cards usan `hover:-translate-y-0.5 hover:shadow-md` para sentirse interactivas.

---

## 2. Paleta de Colores

### Variables CSS (`index.css` → `@theme`)

| Token Tailwind | Valor | Uso |
|---|---|---|
| `text-text` / `bg-text` | `#111827` (gray-900) | Texto principal |
| `text-muted` | `#6b7280` (gray-500) | Texto secundario, placeholders |
| `bg-bg` | `#f9fafb` (gray-50) | Fondo del `<main>` |
| `bg-surface` | `#ffffff` | Fondo de cards y modales |
| `bg-surface2` | `#f3f4f6` (gray-100) | Chips, badges, hover de surfaces |
| `border-border` | `#e5e7eb` (gray-200) | Bordes y divisores |
| `bg-primary` / `text-primary` | `#D82D31` | Rojo — accent principal (subastas, CTAs, sidebar) |

### Colores de acento (usar inline `style={}`, no como tokens de Tailwind)

```ts
const RED   = '#D82D31'; // subastas, accent principal
const BLUE  = '#03BAE9'; // búsqueda, alertas, info
const GREEN = '#05B15A'; // propuestas, éxito, ganado
```

> **Regla**: Los colores de acento **siempre** se usan con opacidad para fondos: `${RED}15` (≈ 8%), `${RED}30` (≈ 19%), `${RED}40`.

### Sidebar (MainLayout)
El sidebar usa su propio estilo autónomo: gradiente `linear-gradient(160deg, #D82D31 0%, #8B1518 100%)`, no heredar del tema claro.

---

## 3. Patrón de Sección (Dashboard Pattern)

Las páginas con contenido agrupado usan el patrón `Section` del Dashboard:

```tsx
// Encabezado de sección
<div className="flex items-center gap-2">
  <span className="w-3 h-3 rounded-full shrink-0" style={{ background: RED }} />
  <h2 className="text-base font-bold text-gray-900">Título</h2>
  {/* Contador opcional */}
  <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-bold"
        style={{ background: `${RED}15`, color: RED }}>
    {count}
  </span>
</div>

// Contenido
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

Cada color de bullet identifica semánticamente la sección:
- 🔴 `RED` → subastas, activo, urgente
- 🔵 `BLUE` → búsqueda, alertas, información
- 🟢 `GREEN` → propuestas, éxito, completado
- ⚫ `#d1d5db` (gray-300) → finalizado, histórico

---

## 4. Cards

```tsx
// Card estándar — fondo blanco, borde sutil, rounded-2xl
<div
  className="rounded-2xl p-4 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
  style={{ background: 'white', border: `1.5px solid ${RED}30` }}
>
  ...
</div>
```

- **Forma**: `rounded-2xl` (no `rounded-xl`)
- **Fondo**: `white` (no `bg-surface`)
- **Borde**: `1.5px solid` con el color accent al 30% de opacidad
- **Hover**: `hover:-translate-y-0.5 hover:shadow-md` (leve elevación)
- **Estado finalizado**: reducir `opacity` a `0.75`, borde neutral `#e5e7eb`

---

## 5. Componentes UI

### Botones

```tsx
// Primary (acción principal)
<button style={{ background: RED, color: 'white' }}
        className="rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-150 hover:opacity-90 active:scale-95">
  Acción
</button>

// Outlined
<button className="border border-gray-200 text-gray-700 rounded-xl px-4 py-2 text-sm font-medium
                   transition-all duration-150 hover:border-gray-300 hover:shadow-sm">
  Secundario
</button>

// Icon Button (Topbar style)
<button className="border border-gray-200 rounded-lg w-8 h-8 flex items-center justify-center
                   hover:border-[#03BAE9] hover:text-[#03BAE9] transition-all duration-150">
  <svg .../>
</button>
```

### Inputs

```tsx
<input className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-800
                  focus:outline-none focus:ring-2 transition-all duration-150"
       style={{ '--tw-ring-color': RED } as React.CSSProperties}
/>
```

### Badges / Pills

```tsx
// Estado activo
<span className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
      style={{ background: `${RED}15`, color: RED }}>
  Activa
</span>

// Estado neutral
<span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-500">
  Finalizada
</span>
```

### Modales

```tsx
// Overlay
<div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
  {/* Contenedor */}
  <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">
    ...
  </div>
</div>
```

Animación: `fadeIn` para el overlay, `slideUp` para el contenedor (ambas definidas en `index.css`).

---

## 6. Tipografía

| Rol | Clases |
|---|---|
| Título de página | `text-2xl font-bold text-gray-900` |
| Subtítulo de página | `text-sm text-gray-500` |
| Encabezado de sección | `text-base font-bold text-gray-900` |
| Cuerpo / Label | `text-sm text-gray-700` |
| Metadata / Caption | `text-xs text-gray-400` |
| Uppercase label | `text-[0.68rem] uppercase tracking-widest text-gray-400` |

Fuente: `Inter` (definida en `--font-sans`).

---

## 7. Estructura de Archivos

```
src/
  pages/
    admin/           → AdminPage.tsx
    buscar/          → BuscarPage.tsx
    coleccion/       → ColeccionPage.tsx + FaltantesPage.tsx, RepetidasPage.tsx
    home/            → DashboardPage.tsx + components/
    intercambios/    → IntercambiosPage.tsx
    login/           → LoginPage.tsx
    notificaciones/  → NotificacionesPage.tsx
    perfil/          → PerfilPage.tsx, HistorialPage.tsx
    propuestas/      → PropuestasPage.tsx + NuevaPage.tsx, ...
    registro/        → RegisterPage.tsx
    subastas/        → SubastasPage.tsx + ActivasPage.tsx, MiasPage.tsx, NuevaPage.tsx, ParticipandoPage.tsx
  components/
    auctions/        → AuctionCard, AuctionDetailModal, BidForm, ...
    ...
```

> **Regla**: cada página vive en su propia subcarpeta. La raíz de `pages/` no debe contener archivos `.tsx` sueltos.

- **Nomenclatura**: PascalCase para archivos `.tsx`.
- **Íconos**: SVG inline, `strokeWidth="1.8"`, sin librerías externas.

---

## 8. Estados de Carga y Vacío

```tsx
// Loading (patrón compartido entre páginas de subastas — importar de ActivasPage)
export function PageLoading({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center py-20 gap-2 text-gray-400 text-sm">
      <svg className="animate-spin w-4 h-4" .../>
      {label}
    </div>
  );
}

// Error
export function PageError({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-2 text-center">
      <p className="text-sm font-semibold" style={{ color: RED }}>{message}</p>
      <p className="text-xs text-gray-400">Verificá que el servidor esté corriendo en localhost:8080.</p>
    </div>
  );
}

// Empty state
<div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
  <div className="w-14 h-14 rounded-full flex items-center justify-center"
       style={{ background: `${accentColor}12`, border: `1.5px solid ${accentColor}30` }}>
    <svg viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="1.8" className="w-6 h-6">
      {icon}
    </svg>
  </div>
  <p className="text-sm font-semibold text-gray-800">{title}</p>
  <p className="text-xs text-gray-400 max-w-xs">{subtitle}</p>
</div>
```

---

## 9. Estados de Entidades (Subastas)

| Estado | Borde | Fondo | Opacidad |
|---|---|---|---|
| `active` | `${RED}30` | `white` | 1 |
| `finished` | `#e5e7eb` | `#f9fafb` | 0.75 |
| `won` | `#05B15A40` | `#05B15A08` | 1 |
| `lost` | `${RED}30` | `${RED}05` | 0.75 |

---

## 10. Patrón Container / Presentational

- **Pages (containers)**: manejan estado (`useState`), fetching, coordinación y lógica de negocio.
- **Components (presentational)**: reciben datos por props, no conocen la API, no hacen fetches.
- Extraer fetching a servicios en `src/services/`.

---

## 11. Navegación intra-página (sub-tabs)

Para rutas anidadas con múltiples sub-vistas (como Subastas, Colección, Propuestas):

```tsx
<nav className="flex gap-2 flex-wrap border-b border-gray-200 pb-4">
  {links.map(({ to, label }) => (
    <NavLink key={to} to={to} className="no-underline">
      {({ isActive }) => (
        <span
          className="inline-block px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150"
          style={isActive ? { background: `${RED}15`, color: RED, fontWeight: 600 } : { color: '#6b7280' }}
        >
          {label}
        </span>
      )}
    </NavLink>
  ))}
</nav>
```

---

## 12. Performance UI

- Usar `keys` correctas en listas (preferir IDs de entidad, nunca índices).
- Lazy load de páginas: ya configurado en `router.tsx` con `React.lazy`.
- Modales: montar condicionalmente (`{condition && <Modal />}`), no ocultarlos con CSS.
- Evitar re-renders innecesarios: si un componente es costoso, considerar `React.memo`.