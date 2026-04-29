interface Props {
  name: string;
  age: number;
  number: number;
  position: string;
  photo: string;
  estado?: 'repetida' | 'faltante';
}

const POSITION_ABBR: Record<string, string> = {
  Goalkeeper: 'POR',
  Defender:   'DEF',
  Midfielder: 'MED',
  Attacker:   'DEL',
};

const ESTADO_COLOR = {
  repetida: { bg: '#03BAE915', color: '#03BAE9', border: '#03BAE930' },
  faltante: { bg: '#D82D3115', color: '#D82D31', border: '#D82D3130' },
};

export default function Figurita({ name, age, number, position, photo, estado }: Props) {
  const estadoStyle = estado ? ESTADO_COLOR[estado] : null;
  const abbr = POSITION_ABBR[position] ?? position.slice(0, 3).toUpperCase();

  return (
    <div
      className="flex-none w-36 rounded-2xl overflow-hidden bg-white flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
      style={{ border: `1.5px solid ${estadoStyle?.border ?? '#e5e7eb'}` }}
    >
      {/* Foto */}
      <div className="relative bg-gray-50 flex items-end justify-center pt-4 h-28">
        <img
          src={photo}
          alt={name}
          className="h-24 w-auto object-contain"
          onError={(e) => { e.currentTarget.src = ''; e.currentTarget.style.display = 'none'; }}
        />
        {/* Número */}
        <span
          className="absolute top-2 left-2 w-6 h-6 rounded-full text-xs font-black flex items-center justify-center text-white"
          style={{ background: '#0f1111cc' }}
        >
          {number}
        </span>
        {/* Posición */}
        <span
          className="absolute top-2 right-2 text-xs font-bold px-1.5 py-0.5 rounded-md"
          style={{ background: '#03BAE920', color: '#03BAE9' }}
        >
          {abbr}
        </span>
      </div>

      {/* Info */}
      <div className="px-3 py-2.5 flex flex-col gap-1">
        <p className="text-xs font-bold text-gray-800 leading-tight truncate">{name}</p>
        <p className="text-xs text-gray-400">{age} años</p>

        {estado && (
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full capitalize self-start mt-0.5"
            style={{ background: estadoStyle!.bg, color: estadoStyle!.color }}
          >
            {estado}
          </span>
        )}
      </div>
    </div>
  );
}
