import { useState } from 'react';

export default function PropuestasRecibidasPage() {
  // Mock data - Proposals OTHERS sent to you
  const [propuestasRecibidas] = useState([
    {
      id: "prop-recv-1",
      figuritaDeseada: {
        id: "mia-1",
        figuritaBase: {
          seleccion: { id: "sel-3", nombre: "France", grupo: "D" },
          equipo: { id: "eq-3", nombre: "PSG" },
          categoria: { id: "cat-2", nombre: "Plata" },
          jugador: { id: "jug-3", nombre: "Mbappé" },
        },
      },
      figuritasOfrecidas: [
        {
          id: "fig-1",
          figuritaBase: {
            seleccion: { id: "sel-1", nombre: "Argentina", grupo: "A" },
            equipo: { id: "eq-1", nombre: "River Plate" },
            categoria: { id: "cat-1", nombre: "Oro" },
            jugador: { id: "jug-1", nombre: "Messi" },
          },
        },
      ],
      usuarioOrigen: {
        id: "user-2",
        username: "JuanPerez",
      },
      estado: "pendiente",
      fechaRecepcion: "2025-04-26",
    },
    {
      id: "prop-recv-2",
      figuritaDeseada: {
        id: "mia-2",
        figuritaBase: {
          seleccion: { id: "sel-4", nombre: "Germany", grupo: "E" },
          equipo: { id: "eq-4", nombre: "Bayern" },
          categoria: { id: "cat-2", nombre: "Plata" },
          jugador: { id: "jug-4", nombre: "Müller" },
        },
      },
      figuritasOfrecidas: [
        {
          id: "fig-2",
          figuritaBase: {
            seleccion: { id: "sel-2", nombre: "Brazil", grupo: "G" },
            equipo: { id: "eq-2", nombre: "Flamengo" },
            categoria: { id: "cat-1", nombre: "Oro" },
            jugador: { id: "jug-2", nombre: "Neymar" },
          },
        },
        {
          id: "fig-3",
          figuritaBase: {
            seleccion: { id: "sel-5", nombre: "Spain", grupo: "E" },
            equipo: { id: "eq-5", nombre: "Barcelona" },
            categoria: { id: "cat-2", nombre: "Plata" },
            jugador: { id: "jug-5", nombre: "Pedri" },
          },
        },
      ],
      usuarioOrigen: {
        id: "user-3",
        username: "MariaGomez",
      },
      estado: "pendiente",
      fechaRecepcion: "2025-04-24",
    },
  ]);

  const [localState, setLocalState] = useState<{ [key: string]: string }>(
    propuestasRecibidas.reduce((acc, prop) => ({ ...acc, [prop.id]: prop.estado }), {})
  );

  const handleAceptar = (propuestaId: string) => {
    setLocalState(prev => ({ ...prev, [propuestaId]: "aceptado" }));
    console.log(`Propuesta ${propuestaId} aceptada`);
  };

  const handleRechazar = (propuestaId: string) => {
    setLocalState(prev => ({ ...prev, [propuestaId]: "rechazado" }));
    console.log(`Propuesta ${propuestaId} rechazada`);
  };

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return "text-yellow-500";
      case "aceptado":
        return "text-green-500";
      case "rechazado":
        return "text-red-500";
      default:
        return "text-muted";
    }
  };

  const getStatusText = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return "⏳ Pendiente";
      case "aceptado":
        return "✅ Aceptado";
      case "rechazado":
        return "❌ Rechazado";
      default:
        return estado;
    }
  };

  return (
    <div className="page-enter">
      <h2 className="text-xl font-semibold text-text mb-6">Propuestas · Recibidas</h2>

      {propuestasRecibidas.length === 0 ? (
        <p className="text-muted">No hay propuestas recibidas</p>
      ) : (
        <div className="space-y-4">
          {propuestasRecibidas.map(propuesta => (
            <div key={propuesta.id} className="bg-surface p-4 rounded-lg border border-border">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted">De:</p>
                  <p className="text-text font-semibold">{propuesta.usuarioOrigen.username}</p>
                </div>
                <p className={`font-semibold ${getStatusColor(localState[propuesta.id])}`}>
                  {getStatusText(localState[propuesta.id])}
                </p>
              </div>

              {/* What They Want */}
              <div className="mb-4 pb-4 border-b border-border">
                <p className="text-sm text-muted mb-2">Quiere tu figurita:</p>
                <p className="text-text font-semibold">
                  {propuesta.figuritaDeseada.figuritaBase.jugador.nombre} - {propuesta.figuritaDeseada.figuritaBase.seleccion.nombre}
                </p>
              </div>

              {/* What They Offer */}
              <div className="mb-4 pb-4 border-b border-border">
                <p className="text-sm text-muted mb-2">Te ofrece:</p>
                <div className="space-y-1">
                  {propuesta.figuritasOfrecidas.map(fig => (
                    <p key={fig.id} className="text-text text-sm">
                      • {fig.figuritaBase.jugador.nombre} - {fig.figuritaBase.seleccion.nombre}
                    </p>
                  ))}
                </div>
              </div>

              {/* Buttons - Only show if pending */}
              {localState[propuesta.id] === "pendiente" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAceptar(propuesta.id)}
                    className="flex-1 p-2 bg-green-600 text-text font-bold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Aceptar
                  </button>
                  <button
                    onClick={() => handleRechazar(propuesta.id)}
                    className="flex-1 p-2 bg-red-600 text-text font-bold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Rechazar
                  </button>
                </div>
              )}

              {/* Date */}
              <p className="text-xs text-muted mt-2">{propuesta.fechaRecepcion}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}