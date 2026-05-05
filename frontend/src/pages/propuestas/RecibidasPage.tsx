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

interface SolicitudDeIntercambio {
  id: string;
  usuario: Usuario;
  figurita: Figurita;
  figuritasOfrecidas: Figurita[];
  cantidadDisponible: number;
  estado: string;
}

export default function PropuestasRecibidasPage() {
  const { user } = useAuth();
  const [propuestasRecibidas, setPropuestasRecibidas] = useState<SolicitudDeIntercambio[]>([]);
  const [loading, setLoading] = useState(true);
  const [localState, setLocalState] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (!user?.id) return;

    fetch(`http://localhost:8080/api/solicitudes-intercambio/recibidas/${user.id}`)
      .then(res => res.json())
      .then(data => {
        setPropuestasRecibidas(data);
        const initialState = data.reduce((acc: any, prop: any) => ({ 
          ...acc, 
          [prop.id]: prop.estado 
        }), {});
        setLocalState(initialState);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching propuestas recibidas:', error);
        setLoading(false);
      });
  }, [user?.id]);

  const handleAceptar = (propuestaId: string) => {
    fetch(`http://localhost:8080/api/solicitudes-intercambio/${propuestaId}/aceptar`, {
      method: 'PUT'
    })
    .then(res => res.json())
    .then(data => {
      setLocalState(prev => ({ ...prev, [propuestaId]: "aceptado" }));
      console.log(`Propuesta ${propuestaId} aceptada`);
    })
    .catch(error => {
      console.error('Error:', error);
      alert("Error al aceptar propuesta");
    });
  };

  const handleRechazar = (propuestaId: string) => {
    fetch(`http://localhost:8080/api/solicitudes-intercambio/${propuestaId}/rechazar`, {
      method: 'PUT'
    })
    .then(res => res.json())
    .then(data => {
      setLocalState(prev => ({ ...prev, [propuestaId]: "rechazado" }));
      console.log(`Propuesta ${propuestaId} rechazada`);
    })
    .catch(error => {
      console.error('Error:', error);
      alert("Error al rechazar propuesta");
    });
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

  if (loading) {
    return (
      <div className="page-enter">
        <p className="text-text">Cargando propuestas...</p>
      </div>
    );
  }

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
                  <p className="text-text font-semibold">{propuesta.usuario?.username || 'Usuario desconocido'}</p>
                </div>
                <p className={`font-semibold ${getStatusColor(localState[propuesta.id])}`}>
                  {getStatusText(localState[propuesta.id])}
                </p>
              </div>

              {/* What They Want */}
              <div className="mb-4 pb-4 border-b border-border">
                <p className="text-sm text-muted mb-2">Quiere tu figurita:</p>
                <p className="text-text font-semibold">
                  {propuesta.figurita?.figuritaBase?.jugador?.nombre || 'N/A'} - {propuesta.figurita?.figuritaBase?.seleccion?.nombre || 'N/A'}
                </p>
              </div>

              {/* What They Offer */}
              <div className="mb-4 pb-4 border-b border-border">
                <p className="text-sm text-muted mb-2">Te ofrece:</p>
                <div className="space-y-1">
                  {propuesta.figuritasOfrecidas && propuesta.figuritasOfrecidas.length > 0 ? (
                    propuesta.figuritasOfrecidas.map(fig => (
                      <p key={fig.id} className="text-text text-sm">
                        • {fig.figuritaBase?.jugador?.nombre || 'N/A'} - {fig.figuritaBase?.seleccion?.nombre || 'N/A'}
                      </p>
                    ))
                  ) : (
                    <p className="text-text text-sm">Sin figuritas ofrecidas</p>
                  )}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}