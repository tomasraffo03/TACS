import { NavLink, Outlet, useMatch } from 'react-router-dom';

const subLinks = [
  { to: 'activas',     label: 'Activas' },
  { to: 'participando', label: 'Participando' },
  { to: 'mias',        label: 'Mis Subastas' },
  { to: 'nueva',       label: '+ Nueva' },
];

export default function SubastasPage() {
  const isIndex = useMatch('/subastas');
  return (
    <div className="page-enter">
      <h1 className="text-2xl font-bold text-text mb-1">Subastas</h1>
      <p className="text-sm text-muted mb-6">Participá y creá subastas de figuritas</p>

      <nav className="flex gap-2 mb-8 flex-wrap">
        {subLinks.map(({ to, label }) => (
          <NavLink
            key={to} to={to}
            className={({ isActive }) =>
              'px-4 py-1.5 rounded-md text-sm font-medium border transition-all duration-150 no-underline ' +
              (isActive
                ? 'bg-primary/15 text-primary border-primary/50 font-semibold'
                : 'text-muted border-border hover:bg-surface2 hover:text-text')
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      {isIndex
        ? <p className="text-sm text-muted">Seleccioná una sección.</p>
        : <Outlet />}
    </div>
  );
}
