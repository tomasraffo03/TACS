import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../auth/useAuth';

interface Usuario {
  id: string;
  username: string;
  password?: string;
  email?: string;
  figuritas?: Figurita[];
}

interface FiguritaBase {
  id: string;
  numero?: number;
  seleccion: { id: string; nombre: string; grupo: string };
  equipo: { id: string; nombre: string };
  categoria: { id: string; nombre: string };
  jugador: { id: string; nombre: string };
}

interface Figurita {
  id: string;
  figuritaBase: FiguritaBase;
  owner?: Usuario;
}

export default function PropuestasNuevaPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();  
  
  const figuritaDelLink = location.state?.figuritaSeleccionada as Figurita | undefined;
  const [misFiguritas, setMisFiguritas] = useState<Figurita[]>([]);
  const [figuritaSeleccionada, setFiguritaSeleccionada] = useState<string>(figuritaDelLink?.id || "");
  const [figuritasOfrecidas, setFiguritasOfrecidas] = useState<string[]>([]);
  const [expandedMias, setExpandedMias] = useState<boolean>(false);

  // Handle checkbox for figuritas to offer
  const handleToggleFigurita = (id: string) => {
    if (figuritasOfrecidas.includes(id)) {
      setFiguritasOfrecidas(figuritasOfrecidas.filter(fid => fid !== id));
    } else {
      setFiguritasOfrecidas([...figuritasOfrecidas, id]);
    }
  };

  // Handle submit
  const handleSubmit = () => {
    if (!figuritaSeleccionada || figuritasOfrecidas.length === 0) {
      alert("Debes seleccionar una figurita que quieres y al menos una que ofreces");
      return;
    }

    const newSolicitud = {
      usuario: { id: user?.id },
      figurita: { id: figuritaSeleccionada },
      figuritasOfrecidas: figuritasOfrecidas.map(id => ({ id })),
      estado: "pendiente"
    };

    fetch('http://localhost:8080/api/solicitudes-intercambio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSolicitud)
    })
    .then(res => res.json())
    .then(data => {
      console.log("Propuesta enviada:", data);
      alert("¡Propuesta enviada!");
      navigate('/propuestas/enviadas');
    })
    .catch(error => {
      console.error('Error:', error);
      alert("Error al enviar propuesta");
    });
  };

  useEffect(() => {
    if (!user?.id) return;
    
    fetch(`http://localhost:8080/api/usuarios/${user.id}`)
      .then(res => res.json())
      .then(data => {
        setMisFiguritas(data.figuritas || []);
      })
      .catch(error => {
        console.error('Error fetching figuritas:', error);
      });
  }, [user?.id]);

  return (
    <div className="page-enter">
      <h2 className="text-xl font-semibold text-text mb-4">Propuestas · Nueva</h2>

      {/* Section 1: Figurita que quieres */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-text mb-4">¿Qué figurita quieres?</h3>
        <button 
          onClick={() => navigate('/buscar')}
          className="w-full p-3 bg-primary text-text font-bold rounded-lg hover:opacity-90 transition-opacity"
        >
          Buscar Figurita
        </button>
        {figuritaDelLink && (
          <div className="mt-4 p-3 bg-surface rounded-lg border border-border">
            <p className="text-sm text-muted mb-1">Figurita seleccionada:</p>
            <p className="text-text font-semibold">
              {figuritaDelLink.figuritaBase.jugador.nombre} - {figuritaDelLink.id}
            </p>
          </div>
        )}
      </div>

      {/* Section 2: Figuritas que ofreces */}
      <div className="mb-8">
        <button
          onClick={() => setExpandedMias(!expandedMias)}
          className="w-full flex items-center justify-between p-4 bg-surface border border-border rounded-lg hover:bg-surface/80 transition-colors mb-2"
        >
          <h3 className="text-lg font-semibold text-text">¿Qué figuritas ofreces?</h3>
          <span className="text-primary text-xl">{expandedMias ? '▼' : '►'}</span>
        </button>
        
        {expandedMias && (
          <div className="space-y-2">
            {misFiguritas.map(fig => (
              <label key={fig.id} className="flex items-center p-3 bg-surface rounded-lg border border-border cursor-pointer hover:bg-surface/80 transition-colors">
                <input
                  type="checkbox"
                  checked={figuritasOfrecidas.includes(fig.id)}
                  onChange={() => handleToggleFigurita(fig.id)}
                  className="w-4 h-4 cursor-pointer"
                />
                <span className="ml-3 text-text">
                  {fig.figuritaBase.jugador.nombre} - {fig.figuritaBase.seleccion.nombre}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full p-3 bg-primary text-text font-bold rounded-lg hover:opacity-90 transition-opacity"
      >
        Enviar Propuesta
      </button>
    </div>
  );
}