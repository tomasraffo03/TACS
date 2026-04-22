import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import PrivateRoute from '../components/PrivateRoute';

// ── Páginas públicas ──────────────────────────────────────────────────────────
const LoginPage = lazy(() => import('../pages/LoginPage'));

// ── Páginas protegidas ────────────────────────────────────────────────────────
const DashboardPage      = lazy(() => import('../pages/DashboardPage'));
const BuscarPage         = lazy(() => import('../pages/BuscarPage'));
const IntercambiosPage   = lazy(() => import('../pages/IntercambiosPage'));
const NotificacionesPage = lazy(() => import('../pages/NotificacionesPage'));
const PerfilPage         = lazy(() => import('../pages/PerfilPage'));

// Colección
const ColeccionPage      = lazy(() => import('../pages/ColeccionPage'));
const RepetidasPage      = lazy(() => import('../pages/coleccion/RepetidasPage'));
const FaltantesPage      = lazy(() => import('../pages/coleccion/FaltantesPage'));

// Propuestas
const PropuestasPage     = lazy(() => import('../pages/PropuestasPage'));
const PropNuevaPage      = lazy(() => import('../pages/propuestas/NuevaPage'));
const PropRecibidasPage  = lazy(() => import('../pages/propuestas/RecibidasPage'));
const PropEnviadasPage   = lazy(() => import('../pages/propuestas/EnviadasPage'));

// Subastas
const SubastasPage       = lazy(() => import('../pages/SubastasPage'));
const SubNuevaPage       = lazy(() => import('../pages/subastas/NuevaPage'));
const SubActivasPage     = lazy(() => import('../pages/subastas/ActivasPage'));
const SubMiasPage        = lazy(() => import('../pages/subastas/MiasPage'));

// Admin (solo rol "admin")
const AdminPage          = lazy(() => import('../pages/AdminPage'));

// ── Router ────────────────────────────────────────────────────────────────────
const router = createBrowserRouter([
  // Ruta pública
  {
    path: '/login',
    element: <LoginPage />,
  },

  // Rutas protegidas — cualquier usuario autenticado
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: 'dashboard',      element: <DashboardPage /> },
          { path: 'buscar',         element: <BuscarPage /> },
          { path: 'intercambios',   element: <IntercambiosPage /> },
          { path: 'notificaciones', element: <NotificacionesPage /> },
          { path: 'perfil',         element: <PerfilPage /> },

          // Colección
          {
            path: 'coleccion',
            element: <ColeccionPage />,
            children: [
              { path: 'repetidas', element: <RepetidasPage /> },
              { path: 'faltantes', element: <FaltantesPage /> },
            ],
          },

          // Propuestas
          {
            path: 'propuestas',
            element: <PropuestasPage />,
            children: [
              { path: 'nueva',     element: <PropNuevaPage /> },
              { path: 'recibidas', element: <PropRecibidasPage /> },
              { path: 'enviadas',  element: <PropEnviadasPage /> },
            ],
          },

          // Subastas
          {
            path: 'subastas',
            element: <SubastasPage />,
            children: [
              { path: 'nueva',   element: <SubNuevaPage /> },
              { path: 'activas', element: <SubActivasPage /> },
              { path: 'mias',    element: <SubMiasPage /> },
            ],
          },
        ],
      },
    ],
  },

  // Rutas protegidas — solo rol "admin"
  {
    element: <PrivateRoute requiredRole="admin" />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: 'admin', element: <AdminPage /> },
        ],
      },
    ],
  },

  // Catch-all
  { path: '*', element: <Navigate to="/dashboard" replace /> },
]);

export default router;
