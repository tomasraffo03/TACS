import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-bg text-primary text-sm tracking-widest">
      Cargando…
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
