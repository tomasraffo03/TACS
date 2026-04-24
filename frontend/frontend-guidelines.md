# Frontend Guidelines - TACS World Cup App

Este documento sirve como contexto principal de desarrollo (React + Tailwind CSS) para asistentes de IA. El proyecto frontend está en /frontend

## 1. Principios de UI/UX
- **Estética Base**: Layout existente con Sidebar izquierdo (`w-60`, colapsable/fijo) y Topbar superior (`h-[52px]`). Todo debe integrarse fluidamente a este marco.
- **Diseño**: Inspirado en Material Design 3 pero implementado con Tailwind (vanilla). Limpio, moderno, deportivo y enfocado en la usabilidad.
- **Dark Theme por defecto**: Fuerte contraste entre el fondo oscuro y los acentos vibrantes (verde/rojo) que evocan el mundial.
- **Feedback visual**: Siempre usar transiciones (`transition-all duration-150`) para hover, active, focus en botones y links.

## 2. Paleta de Colores (Theme CSS Variables)
Utilizar estrictamente estas clases de Tailwind (ya mapeadas en `index.css`):
- `bg-primary` / `text-primary`: **#3CAC3B** (Verde cancha, acciones principales, success)
- `bg-secondary` / `text-secondary`: **#E61D25** (Rojo vibrante, acentos, danger, notificaciones)
- `bg-bg`: **#0f1111** (Fondo base de la app)
- `bg-surface`: **#1a1e1e** (Cards, Sidebar, Topbar, Modales)
- `bg-surface2`: **#242828** (Hover states de surfaces, inputs, elementos secundarios)
- `border-border`: **#2a2e2e** (Divisores, contornos)
- `text-muted`: **#D1D4D1** (Textos secundarios, íconos)
- `text-text`: **#e8ebe8** (Texto principal)

*Nota: Aprovechar modificadores de opacidad (ej. `bg-primary/15`, `hover:bg-primary/10`) para estados activos, highlights o botones outlined.*

## 3. Adaptando Material Design sin librerías
- **Cards y Contenedores**: Usar `bg-surface border border-border rounded-xl shadow-sm`.
- **Botones**: 
  - *Primary*: `bg-primary text-white rounded-lg px-4 py-2 font-medium hover:brightness-110 active:scale-95 transition-all`
  - *Outlined*: `border border-border text-text rounded-lg hover:border-primary hover:text-primary hover:bg-primary/10 transition-all`
  - *Icon Buttons*: Usar dimensiones fijas (`w-8 h-8`), centrado (`flex items-center justify-center`) y formas redondeadas.
- **Inputs**: `bg-surface2 border border-border rounded-lg px-3 py-2 text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all`.
- **Elevación/Z-Index**: Evitar sombras excesivas en el tema oscuro, preferir bordes sutiles (`border-border`) y diferenciación de fondos (`surface` vs `bg`) para jerarquizar componentes.
- **Tipografía**: Interfaz densa pero legible (texto base `text-sm`, metadata `text-xs`, headers `text-lg` o `text-xl font-semibold`).

## 4. Convenciones de Componentes
- **Archivos y Estructura**: 
  - `src/components/`: Componentes genéricos, atómicos y reutilizables (Buttons, Inputs, Modals, StickerCards).
  - `src/pages/`: Componentes a nivel de vista (las rutas principales).
  - `src/layouts/`: Estructuras base (como `MainLayout.tsx`).
- **Nomenclatura**: PascalCase para archivos `.tsx` (ej: `UserCard.tsx`).
- **Iconos**: Usar SVG inline limpios (stroke-based, `strokeWidth="1.8"`, sin dependencias extrañas si es posible, siguiendo la estética del `MainLayout`).

## 5. Uso de Tailwind (Patrones Comunes)
- Preferir clases utilitarias directas sobre CSS customizado.
- **Layouts**: Abusar de Flexbox (`flex flex-col gap-4`, `flex items-center justify-between`) y Grid (`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6`) para responsividad.
- **Truncado**: Para textos largos en cards, usar `overflow-hidden text-ellipsis whitespace-nowrap` o `line-clamp-2`.
- **Scroll**: Para áreas scrolleables internas, asegurar `overflow-y-auto overflow-x-hidden` y el diseño usará automáticamente el custom scrollbar definido en `index.css`.

## 6. Estructura de Estados y Props
- **Props**: Siempre definir interfaces claras arriba del componente. Mantener componentes funcionales limpios.
  ```tsx
  interface StickerCardProps {
    sticker: Sticker;
    onTradeRequest?: (id: string) => void;
  }
  ```
- **Estado**: 
  - Usar estado local (`useState`) estrictamente para UI (modales, toggles, forms).
  - Para datos globales (Usuario, preferencias) usar el contexto existente (`useAuth`) o stores globales.
  - Extraer lógica de negocio compleja o fetching a custom hooks (`useStickers.ts`, `useTrade.ts`).

## 7. Buenas Prácticas para Pantallas Complejas
- **Composición**: Dividir vistas gigantes (ej. Dashboard) en sub-componentes especializados (ej. `DashboardStats`, `RecentTrades`, `MissingStickers`).
- **Carga y Error**: Siempre prever Skeleton loaders (`animate-pulse` o `animate-pulse-dot`) para pantallas con fetch de datos asíncronos, y Empty States agradables cuando no hay información.
- **Desacople**: Evitar hacer llamadas a la API directamente en un componente de UI puro. Pasarlas como callbacks desde componentes "Contenedores" o Páginas.

## 8. Patrón Container vs Presentational
- **Pages (containers)**: manejan estado, lógica, fetching y coordinación.
- **Components (presentational)**: reciben datos por props y no conocen la API.
- Evitar lógica compleja dentro de componentes visuales.

## 9. Modales
- Usar overlay oscuro: `bg-black/50 backdrop-blur-sm`
- Centrado con flex (`items-center justify-center`)
- Contenedor: `bg-surface rounded-xl p-6 w-full max-w-lg`
- Animación: fade + scale (`opacity + scale-95 → scale-100`)
- Cerrar con:
  - botón explícito
  - click fuera (opcional)
  - ESC (si es simple)

## 10. Estados de Entidades
Las entidades deben tener estados visuales claros:

Ejemplo (subastas):
- activa → highlight sutil (`border-primary/40`)
- finalizada → opacidad reducida (`opacity-60`)
- ganada → acento verde (`bg-primary/10`)
- perdida → acento rojo (`bg-secondary/10`)

## 11. Listas y Grids
- Listas principales deben usar grid responsive:
  `grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6`
- Mantener consistencia de altura entre cards
- Evitar saltos de layout (usar min-h en cards si hace falta)

## 12. Performance UI
- Evitar re-renders innecesarios (usar keys correctas en listas)
- Componentes pesados deben separarse
- Lazy load para modales si es necesario