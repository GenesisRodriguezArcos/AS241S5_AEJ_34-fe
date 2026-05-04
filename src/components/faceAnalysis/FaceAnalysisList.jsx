import { Eye, Pencil, Trash2, RotateCcw } from 'lucide-react';

export default function FaceAnalysisList({ data, onSelect, onEdit, onDisable, onEnable, showInactive }) {
  if (!data.length)
    return <p className="text-gray-500 text-center py-12">No hay registros.</p>;

  return (
    <div className="table-3d rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr style={{ background: 'rgba(124,58,237,0.08)', borderBottom: '1px solid rgba(124,58,237,0.15)' }}>
            <th className="px-4 py-3.5 text-left text-xs font-semibold text-purple-400 uppercase tracking-wider">Imagen</th>
            <th className="px-4 py-3.5 text-left text-xs font-semibold text-purple-400 uppercase tracking-wider">Request ID</th>
            <th className="px-4 py-3.5 text-left text-xs font-semibold text-purple-400 uppercase tracking-wider">Error Code</th>
            <th className="px-4 py-3.5 text-left text-xs font-semibold text-purple-400 uppercase tracking-wider">Estado</th>
            <th className="px-4 py-3.5 text-left text-xs font-semibold text-purple-400 uppercase tracking-wider">Creado</th>
            <th className="px-4 py-3.5 text-left text-xs font-semibold text-purple-400 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr
              key={row.id}
              className="transition-colors"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.025)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <td className="px-4 py-3">
                <img
                  src={row.imageUrl}
                  alt="face"
                  className="w-12 h-12 object-cover rounded-xl cursor-pointer transition-transform hover:scale-110"
                  style={{ border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }}
                  onClick={() => onSelect(row)}
                />
              </td>
              <td className="px-4 py-3 font-mono text-xs text-gray-500">{row.requestId || '—'}</td>
              <td className="px-4 py-3">
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-lg"
                  style={row.errorCode === 0
                    ? { background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)' }
                    : { background: 'rgba(239,68,68,0.15)',  color: '#f87171', border: '1px solid rgba(239,68,68,0.2)'  }
                  }
                >
                  {row.errorCode ?? '—'}
                </span>
              </td>
              <td className="px-4 py-3">
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={row.status === 'A'
                    ? { background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)' }
                    : { background: 'rgba(239,68,68,0.15)',  color: '#f87171', border: '1px solid rgba(239,68,68,0.2)'  }
                  }
                >
                  {row.status === 'A' ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-500 text-sm">
                {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '—'}
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-1.5">
                  <button onClick={() => onSelect(row)} title="Ver detalle"
                    className="p-1.5 rounded-lg transition-all hover:scale-110"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: '#9ca3af' }}>
                    <Eye size={14} />
                  </button>
                  {!showInactive && (
                    <button onClick={() => onEdit(row)} title="Editar"
                      className="p-1.5 rounded-lg transition-all hover:scale-110"
                      style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)', color: '#60a5fa' }}>
                      <Pencil size={14} />
                    </button>
                  )}
                  {row.status === 'A' ? (
                    <button onClick={() => onDisable(row.id)} title="Eliminar"
                      className="p-1.5 rounded-lg transition-all hover:scale-110"
                      style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }}>
                      <Trash2 size={14} />
                    </button>
                  ) : (
                    <button onClick={() => onEnable(row.id)} title="Restaurar"
                      className="p-1.5 rounded-lg transition-all hover:scale-110"
                      style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.2)', color: '#34d399' }}>
                      <RotateCcw size={14} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
