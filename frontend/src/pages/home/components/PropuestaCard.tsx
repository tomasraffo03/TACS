const GREEN = '#05B15A';
const RED   = '#D82D31';

interface Props {
  usuario: string;
  figuritasOfrecidas: string[];
  figuritasSolicitadas: string[];
  tipo: 'enviada' | 'recibida';
  fecha: string;
}

function mini(arr: string[], max = 2) {
  if (arr.length <= max) return arr.join(', ');
  return arr.slice(0, max).join(', ') + ` +${arr.length - max}`;
}

export default function PropuestaCard({ usuario, figuritasOfrecidas, figuritasSolicitadas, tipo, fecha }: Props) {
  const color = tipo === 'enviada' ? GREEN : RED;
  const label = tipo === 'enviada' ? 'Enviada' : 'Recibida';

  return (
    <div
      className="flex-none w-52 rounded-2xl p-4 bg-white flex flex-col gap-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
      style={{ border: `1.5px solid ${color}30` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${color}15`, color }}>
          {label}
        </span>
        <span className="text-xs text-gray-300">{fecha}</span>
      </div>

      {/* Usuario */}
      <div className="flex items-center gap-1.5">
        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: color }}>
          {usuario[0].toUpperCase()}
        </div>
        <span className="text-xs font-semibold text-gray-700 truncate">{usuario}</span>
      </div>

      {/* Figuritas */}
      <div className="flex flex-col gap-1.5 text-xs">
        <div className="flex items-center gap-1">
          <svg className="w-3 h-3 shrink-0" style={{ color: RED }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
          <span className="text-gray-500 truncate">{mini(figuritasOfrecidas)}</span>
        </div>
        <div className="flex items-center gap-1">
          <svg className="w-3 h-3 shrink-0" style={{ color: GREEN }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span className="text-gray-500 truncate">{mini(figuritasSolicitadas)}</span>
        </div>
      </div>
    </div>
  );
}
