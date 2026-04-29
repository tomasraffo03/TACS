const BLUE = '#03BAE9';

interface Props {
  nombre: string;
  numero: string;
  pais: string;
  estado: 'repetida' | 'faltante';
}

export default function FiguritaCard({ nombre, numero, pais, estado }: Props) {
  const esRepetida = estado === 'repetida';
  const color      = esRepetida ? BLUE : '#9CA3AF';

  return (
    <div
      className="flex-none w-40 rounded-2xl p-4 flex flex-col items-center gap-2 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
      style={{ border: `1.5px solid ${color}30` }}
    >
      {/* Avatar figurita */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-black"
        style={{ background: `${color}15`, color }}
      >
        {numero}
      </div>

      <div className="text-center">
        <p className="text-xs font-bold text-gray-800 leading-tight">{nombre}</p>
        <p className="text-xs text-gray-400">{pais}</p>
      </div>

      <span
        className="text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize"
        style={{ background: `${color}15`, color }}
      >
        {estado}
      </span>
    </div>
  );
}
