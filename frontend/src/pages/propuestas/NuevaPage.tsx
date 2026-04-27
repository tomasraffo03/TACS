import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function PropuestasNuevaPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const figuritaDelLink = location.state?.figuritaSeleccionada;

  // Mock data - figuritas the user owns
  const misFiguritas = [
    {
      id: "mia-1",
      figuritaBase: {
        seleccion: { id: "sel-3", nombre: "France", grupo: "D" },
        equipo: { id: "eq-3", nombre: "PSG" },
        categoria: { id: "cat-2", nombre: "Plata" },
        jugador: { id: "jug-3", nombre: "Mbappé" },
      },
    },
    {
      id: "mia-2",
      figuritaBase: {
        seleccion: { id: "sel-4", nombre: "Germany", grupo: "E" },
        equipo: { id: "eq-4", nombre: "Bayern" },
        categoria: { id: "cat-2", nombre: "Plata" },
        jugador: { id: "jug-4", nombre: "Müller" },
      },
    },
  ];

  // State for selected figurita to request
  const [figuritaSeleccionada, setFiguritaSeleccionada] = useState<string>(figuritaDelLink?.id || "");

  // State for selected figuritas to offer
  const [figuritasOfrecidas, setFiguritasOfrecidas] = useState<string[]>([]);

  // State for expanded/collapsed accordion
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
    console.log("Propuesta enviada:", { figuritaSeleccionada, figuritasOfrecidas });
    alert("Propuesta enviada!");
  };

  return (
    <div className="page-enter">
      <h2 className="text-xl font-semibold text-text mb-4">Propuestas · Nueva</h2>

      {/* Section 1: Figurita que quieres (Just a button, no accordion) */}
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

      {/* Section 2: Figuritas que ofreces (Accordion) */}
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