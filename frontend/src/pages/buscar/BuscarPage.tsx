import { useNavigate } from 'react-router-dom';

export default function BuscarPage() {

  
const figuritas = [
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
  {
    id: "fig-3",
    figuritaBase: {
      seleccion: { id: "sel-3", nombre: "France", grupo: "D" },
      equipo: { id: "eq-3", nombre: "PSG" },
      categoria: { id: "cat-2", nombre: "Plata" },
      jugador: { id: "jug-3", nombre: "Mbappé" },
    },
  },
  
];


  const navigate = useNavigate();

  return (
    <div className="page-enter">
      <h1 className="text-3xl font-bold text-text mb-6">Trabajando</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar figurita..."
          className="w-full p-3 bg-surface border border-border rounded-lg text-text placeholder-muted focus:outline-none focus:border-primary"
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Número"
          className="p-3 bg-surface border border-border rounded-lg text-text placeholder-muted focus:outline-none focus:border-primary"
        />
        <input
          type="text"
          placeholder="Selección"
          className="p-3 bg-surface border border-border rounded-lg text-text placeholder-muted focus:outline-none focus:border-primary"
        />
        <input
          type="text"
          placeholder="Jugador"
          className="p-3 bg-surface border border-border rounded-lg text-text placeholder-muted focus:outline-none focus:border-primary"
        />
        <button className="p-3 bg-primary text-text font-bold rounded-lg hover:opacity-90 transition-opacity">
          Buscar
        </button>
      </div>


      <div className="grid grid-cols-3 gap-4">
        {figuritas.map((figurita) => (
          <div key={figurita.id} className="bg-surface p-4 rounded-lg border border-border">
            <p className= "text-sm font-bold text-text mb-2">{figurita.id}</p>
            <p className="text-sm text-muted mb-2">{figurita.figuritaBase.seleccion.nombre}</p>
            <p className="text-xl font-bold text-primary mb-2">{figurita.figuritaBase.jugador.nombre}</p>
            <p className="text-sm text-text mb-3">{figurita.figuritaBase.equipo.nombre}</p>
            <p className="text-xs text-muted mb-4">{figurita.figuritaBase.categoria.nombre}</p>

            <button 
            onClick={() => navigate('/propuestas/nueva',{ state: { figuritaSeleccionada: figurita } })}
            className="w-full p-2 bg-primary text-text font-bold rounded-lg hover:opacity-90 transition-opacity">
              Hacer Propuesta
            </button>
          </div>
          
        ))}
      </div>

    </div>
  );
}
