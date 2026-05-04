const RED = '#D82D31';
const GREEN = '#05B15A';

type AlertaTipo = 'propuesta' | 'subasta' | 'intercambio' | 'sistema';

const ALERTA_CONFIG: Record<AlertaTipo, { color: string; icon: React.ReactNode }> = {
  propuesta: {
    color: GREEN,
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  subasta: {
    color: RED,
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" /><path d="m13 13 6 6" />
      </svg>
    ),
  },
  intercambio: {
    color: '#05B15A',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M7 16V4m0 0L3 8m4-4 4 4M17 8v12m0 0 4-4m-4 4-4-4" />
      </svg>
    ),
  },
  sistema: {
    color: RED,
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
};

interface Props {
  tipo: AlertaTipo;
  mensaje: string;
  tiempo: string;
  leida?: boolean;
}

export default function AlertaCard({ tipo, mensaje, tiempo, leida = false }: Props) {
  const cfg = ALERTA_CONFIG[tipo];

  return (
    <div
      className="flex-none w-56 rounded-2xl p-4 bg-white flex flex-col gap-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
      style={{ border: `1.5px solid ${cfg.color}${leida ? '20' : '50'}`, opacity: leida ? 0.7 : 1 }}
    >
      <div className="flex items-start justify-between gap-2">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: `${cfg.color}15`, color: cfg.color }}
        >
          {cfg.icon}
        </div>
        {!leida && (
          <span className="w-2 h-2 rounded-full shrink-0 mt-1" style={{ background: RED }} />
        )}
      </div>

      <p className="text-xs font-semibold text-gray-700 leading-snug">{mensaje}</p>

      <span className="text-xs text-gray-400">{tiempo}</span>
    </div>
  );
}
