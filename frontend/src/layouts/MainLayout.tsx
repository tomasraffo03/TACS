import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

// ── Icons (inline SVG, zero deps) ────────────────────────────────────────────
const icons: Record<string, JSX.Element> = {
  dashboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  coleccion: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M19 11H5M19 11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2M19 11V9a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2" />
    </svg>
  ),
  buscar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="11" cy="11" r="7" /><path d="m21 21-4.35-4.35" />
    </svg>
  ),
  intercambios: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 16V4m0 0L3 8m4-4 4 4M17 8v12m0 0 4-4m-4 4-4-4" />
    </svg>
  ),
  propuestas: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  subastas: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" /><path d="m13 13 6 6" />
    </svg>
  ),
  notificaciones: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  perfil: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  ),
  admin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
};

const navLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { to: '/coleccion', label: 'Colección', icon: 'coleccion' },
  { to: '/buscar', label: 'Buscar', icon: 'buscar' },
  { to: '/intercambios', label: 'Intercambios', icon: 'intercambios' },
  { to: '/propuestas', label: 'Propuestas', icon: 'propuestas' },
  { to: '/subastas', label: 'Subastas', icon: 'subastas' },
  { to: '/notificaciones', label: 'Notificaciones', icon: 'notificaciones' },
  { to: '/perfil', label: 'Perfil', icon: 'perfil' },
];

export default function MainLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="flex w-screen h-screen overflow-hidden">
      {/* ── Sidebar ── */}
      <aside className="w-60 min-w-60 h-screen bg-surface border-r border-border flex flex-col overflow-hidden shrink-0">
        <div className="flex items-center gap-2.5 px-5 h-[52px] text-sm font-black tracking-[0.15em] text-text border-b border-border uppercase shrink-0">
          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#3CAC3B] shrink-0" />
          TACS
        </div>

        <nav className="flex-1 flex flex-col gap-1 px-3 py-4 overflow-y-auto overflow-x-hidden">
          {navLinks.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                'flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium no-underline transition-all duration-150 ' +
                (isActive
                  ? 'bg-primary/15 text-primary font-semibold'
                  : 'text-muted hover:bg-surface2 hover:text-text')
              }
            >
              <span className="w-[18px] h-[18px] shrink-0 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
                {icons[icon]}
              </span>
              <span className="text-[0.85rem] overflow-hidden text-ellipsis whitespace-nowrap">{label}</span>
            </NavLink>
          ))}

          {user?.role === 'admin' && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                'flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium no-underline transition-all duration-150 mt-2 border-t border-border pt-4 ' +
                (isActive
                  ? 'bg-primary/15 text-primary font-semibold'
                  : 'text-muted hover:bg-surface2 hover:text-text')
              }
            >
              <span className="w-[18px] h-[18px] shrink-0 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
                {icons.admin}
              </span>
              <span className="text-[0.85rem] overflow-hidden text-ellipsis whitespace-nowrap">Admin</span>
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-3 px-4 py-4 border-t border-border shrink-0">
          <div className="w-8 h-8 rounded-full bg-primary/15 border border-primary text-primary font-bold text-xs flex items-center justify-center shrink-0">
            {user?.username?.[0]?.toUpperCase() ?? '?'}
          </div>
          <div className="flex-1 flex flex-col overflow-hidden">
            <span className="text-xs font-semibold text-text overflow-hidden text-ellipsis whitespace-nowrap">
              {user?.username ?? 'Invitado'}
            </span>
            <span className="text-[0.7rem] text-muted capitalize">{user?.role ?? '—'}</span>
          </div>
          <button
            className="bg-transparent border-none cursor-pointer text-muted w-[22px] h-[22px] flex items-center justify-center shrink-0 rounded p-0 transition-all duration-150 hover:text-secondary hover:bg-secondary/10 [&>svg]:w-4 [&>svg]:h-4"
            onClick={logout}
            title="Cerrar sesión"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <header className="h-[52px] flex items-center justify-end px-6 bg-surface border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <button
              className="bg-transparent border border-border rounded-lg text-muted w-8 h-8 flex items-center justify-center cursor-pointer transition-all duration-150 hover:text-primary hover:border-primary hover:bg-primary/10 [&>svg]:w-4 [&>svg]:h-4"
              title="Notificaciones"
            >
              {icons.notificaciones}
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-7 bg-bg">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
