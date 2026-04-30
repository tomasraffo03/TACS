import { NavLink, Outlet, useMatch } from 'react-router-dom';

const RED = '#D82D31';

const subLinks = [
  { to: 'activas',      label: 'Activas' },
  { to: 'participando', label: 'Participando' },
  { to: 'mias',         label: 'Mis Subastas' },
  { to: 'nueva',        label: '+ Nueva' },
];

export default function SubastasPage() {
  const isIndex = useMatch('/subastas');
  return (
    <div className="page-enter flex flex-col gap-6">
      {/* Título */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Subastas</h1>
        <p className="text-sm text-gray-500">Participá y creá subastas de figuritas</p>
      </div>

      {/* Sub-navegación estilo Dashboard */}
      <nav className="flex gap-2 flex-wrap border-b border-gray-200 pb-4">
        {subLinks.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className="no-underline"
          >
            {({ isActive }) => (
              <span
                className="inline-block px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150"
                style={
                  isActive
                    ? { background: `${RED}15`, color: RED, fontWeight: 600 }
                    : { color: '#6b7280' }
                }
                onMouseEnter={e => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.background = '#f3f4f6';
                }}
                onMouseLeave={e => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.background = '';
                }}
              >
                {label}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {isIndex
        ? <p className="text-sm text-gray-400">Seleccioná una sección.</p>
        : <Outlet />}
    </div>
  );
}
