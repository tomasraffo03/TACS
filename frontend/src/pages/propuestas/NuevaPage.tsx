import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function PropuestasNuevaPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const figuritaDelLink = location.state?.figuritaSeleccionada;

  // Mock data - figuritas available from other users
  const figuritasDisponibles = [
    {
      id: "fig-1",
      figuritaBase: {
        seleccion: { id: "sel-1", nombre: "Argentina", grupo: "A" },
        equipo: { id: "eq-1", nombre: "River Plate" },
        categoria: { id: "cat-1", nombre: "Oro" },
        jugador: { id: "jug-1", nombre: "Messi" },
      },
    },
    {
      id: "fig-2",
      figuritaBase: {
        seleccion: { id: "sel-2", nombre: "Brazil", grupo: "G" },
        equipo: { id: "eq-2", nombre: "Flamengo" },
        categoria: { id: "cat-1", nombre: "Oro" },
        jugador: { id: "jug-2", nombre: "Neymar" },
      },
    },
  ];

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

  // State for expanded/collapsed sections
  const [expandedSections, setExpandedSections] = useState<{
    mias: boolean;
    disponibles: boolean;
  }>({
    mias: false,
    disponibles: true,
  });

  // Handle checkbox for figuritas to offer
  const handleToggleFigurita = (id: string) => {
    if (figuritasOfrecidas.includes(id)) {
      setFiguritasOfrecidas(figuritasOfrecidas.filter(fid => fid !== id));
    } else {
      setFiguritasOfrecidas([...figuritasOfrecidas, id]);
    }
  };

  // Toggle accordion section
  const toggleSection = (section: 'mias' | 'disponibles') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
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

      {/* Buscar Figurita Button */}
      <button 
        onClick={() => navigate('/buscar')}
        className="mb-6 p-3 bg-primary text-text font-bold rounded-lg hover:opacity-90 transition-opacity w-full"
      >
        Buscar Figurita
      </button>

      {/* Section 1: Figuritas Disponibles (Accordion) */}
      <div className="mb-8">
        <button
          onClick={() => toggleSection('disponibles')}
          className="w-full flex items-center justify-between p-4 bg-surface border border-border rounded-lg hover:bg-surface/80 transition-colors mb-2"
        >
          <h3 className="text-lg font-semibold text-text">¿Qué figurita quieres?</h3>
          <span className="text-primary text-xl">{expandedSections.disponibles ? '▼' : '►'}</span>
        </button>
        
        {expandedSections.disponibles && (
          <div className="space-y-2">
            {figuritasDisponibles.map(fig => (
              <label key={fig.id} className="flex items-center p-3 bg-surface rounded-lg border border-border cursor-pointer hover:bg-surface/80 transition-colors">
                <input
                  type="radio"
                  name="figuritaQuiero"
                  value={fig.id}
                  checked={figuritaSeleccionada === fig.id}
                  onChange={(e) => setFiguritaSeleccionada(e.target.value)}
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

      {/* Section 2: Mis Figuritas (Accordion) */}
      <div className="mb-8">
        <button
          onClick={() => toggleSection('mias')}
          className="w-full flex items-center justify-between p-4 bg-surface border border-border rounded-lg hover:bg-surface/80 transition-colors mb-2"
        >
          <h3 className="text-lg font-semibold text-text">¿Qué figuritas ofreces?</h3>
          <span className="text-primary text-xl">{expandedSections.mias ? '▼' : '►'}</span>
        </button>
        
        {expandedSections.mias && (
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