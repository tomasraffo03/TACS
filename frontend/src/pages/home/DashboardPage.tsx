import { useNavigate } from 'react-router-dom';
import Carousel from './components/Carousel';
import Figurita from '../../components/Figurita';
import PropuestaCard from './components/PropuestaCard';
import SubastaCard from './components/SubastaCard';
import AlertaCard from './components/AlertaCard';

const BLUE  = '#03BAE9';
const RED   = '#D82D31';
const GREEN = '#05B15A';

// ── Mock data ─────────────────────────────────────────────────────────────────
// Figuritas que te faltan y otros usuarios tienen disponibles para intercambio
const FIGURITAS = [
  { id: 1, name: 'K. Mbappé',     age: 25, number: 7,  position: 'Attacker',   photo: 'https://media.api-sports.io/football/players/278.png'  },
  { id: 2, name: 'E. Haaland',    age: 23, number: 9,  position: 'Attacker',   photo: 'https://media.api-sports.io/football/players/1100.png' },
  { id: 3, name: 'J. Bellingham', age: 20, number: 5,  position: 'Midfielder', photo: 'https://media.api-sports.io/football/players/1478.png' },
  { id: 4, name: 'K. De Bruyne',  age: 32, number: 17, position: 'Midfielder', photo: 'https://media.api-sports.io/football/players/627.png'  },
  { id: 5, name: 'M. Salah',      age: 31, number: 11, position: 'Attacker',   photo: 'https://media.api-sports.io/football/players/306.png'  },
  { id: 6, name: 'R. Lewandowski',age: 35, number: 9,  position: 'Attacker',   photo: 'https://media.api-sports.io/football/players/174.png'  },
];

const PROPUESTAS = [
  { id: 1, usuario: 'carlitos99',   ofrecidas: ['Messi #10'],          solicitadas: ['Mbappé #7', 'Pedri #8'], tipo: 'enviada'  as const, fecha: 'hoy' },
  { id: 2, usuario: 'sofi_fig',     ofrecidas: ['Haaland #9'],         solicitadas: ['Kane #9'],               tipo: 'recibida' as const, fecha: 'ayer' },
  { id: 3, usuario: 'lauti_fútbol', ofrecidas: ['Vinicius #20', 'Pedri #8'], solicitadas: ['Messi #10'],        tipo: 'enviada'  as const, fecha: '2 días' },
  { id: 4, usuario: 'manu_col',     ofrecidas: ['Ronaldo #7'],         solicitadas: ['Benzema #9'],            tipo: 'recibida' as const, fecha: '3 días' },
];

const SUBASTAS = [
  { id: 1, figurita: 'Messi #10 Argentina',   propietario: 'carlitos99',   ofertas: 5, tiempo: '2h 30m', esMia: false },
  { id: 2, figurita: 'Mbappé #7 Francia',     propietario: 'yo',           ofertas: 3, tiempo: '5h 10m', esMia: true  },
  { id: 3, figurita: 'Haaland #9 Noruega',    propietario: 'pepe_crack',   ofertas: 1, tiempo: '1h 05m', esMia: false },
  { id: 4, figurita: 'Vinicius #20 Brasil',   propietario: 'nico_world',   ofertas: 8, tiempo: '3h 45m', esMia: false },
  { id: 5, figurita: 'Bellingham #5 England', propietario: 'yo',           ofertas: 2, tiempo: '6h 00m', esMia: true  },
];

const ALERTAS = [
  { id: 1, tipo: 'propuesta'   as const, mensaje: 'sofi_fig aceptó tu propuesta de intercambio.',         tiempo: 'hace 10 min', leida: false },
  { id: 2, tipo: 'subasta'     as const, mensaje: 'Tu subasta de Mbappé #7 recibió una nueva oferta.',    tiempo: 'hace 1h',     leida: false },
  { id: 3, tipo: 'intercambio' as const, mensaje: 'Intercambio completado con lauti_fútbol.',             tiempo: 'hace 3h',     leida: true  },
  { id: 4, tipo: 'sistema'     as const, mensaje: 'Tu cuenta fue verificada correctamente.',               tiempo: 'ayer',        leida: true  },
];

// ── Sección wrapper ───────────────────────────────────────────────────────────
function Section({
  title, color, to, toLabel, children,
}: {
  title: string;
  color: string;
  to?: string;
  toLabel?: string;
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full shrink-0" style={{ background: color }} />
          <h2 className="text-base font-bold text-gray-900">{title}</h2>
        </div>
        {to && (
          <button
            type="button"
            onClick={() => navigate(to)}
            className="flex items-center gap-1 text-xs font-semibold bg-transparent border-none cursor-pointer transition-colors hover:opacity-70"
            style={{ color }}
          >
            {toLabel ?? 'Ver todos'}
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        )}
      </div>
      <Carousel>{children}</Carousel>
    </section>
  );
}

// ── Página ────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  return (
    <div
      className="page-enter flex flex-col gap-10"
      style={{ margin: '-1.75rem', padding: '1.75rem', minHeight: 'calc(100% + 3.5rem)', background: 'white' }}
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard</h1>
        <p className="text-sm text-gray-500">Resumen de tu actividad</p>
      </div>

      {/* Sugerencias de figuritas faltantes disponibles para intercambio */}
      <Section title="Disponibles para intercambio" color={BLUE} to="/buscar" toLabel="Buscar más">
        {FIGURITAS.map((f) => (
          <Figurita key={f.id} name={f.name} age={f.age} number={f.number} position={f.position} photo={f.photo} estado="faltante" />
        ))}
      </Section>

      {/* Propuestas */}
      <Section title="Propuestas" color={GREEN} to="/propuestas">
        {PROPUESTAS.map((p) => (
          <PropuestaCard
            key={p.id}
            usuario={p.usuario}
            figuritasOfrecidas={p.ofrecidas}
            figuritasSolicitadas={p.solicitadas}
            tipo={p.tipo}
            fecha={p.fecha}
          />
        ))}
      </Section>

      {/* Subastas activas */}
      <Section title="Subastas activas" color={RED} to="/subastas/activas">
        {SUBASTAS.map((s) => (
          <SubastaCard
            key={s.id}
            figurita={s.figurita}
            propietario={s.propietario}
            ofertasCount={s.ofertas}
            tiempoRestante={s.tiempo}
            esMia={s.esMia}
          />
        ))}
      </Section>

      {/* Alertas */}
      <Section title="Alertas pendientes" color={BLUE} to="/notificaciones" toLabel="Ver todas">
        {ALERTAS.map((a) => (
          <AlertaCard key={a.id} tipo={a.tipo} mensaje={a.mensaje} tiempo={a.tiempo} leida={a.leida} />
        ))}
      </Section>
    </div>
  );
}
