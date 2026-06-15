import Modal from '../shared/Modal';
import { Calendar, Hash, Maximize2, CheckCircle, XCircle, Layers, Link2, ScanFace, Eye, MapPin } from 'lucide-react';

function FaceCard({ face, index }) {
  const box   = face.box ?? [];
  const lands = face.entities?.find(e => e.kind === 'namedpoints')?.namedpoints ?? {};
  const conf  = face.entities?.find(e => e.kind === 'classes')?.classes?.face;
  const pct   = v => `${(v * 100).toFixed(1)}%`;

  return (
    <div className="rounded-xl p-4" style={{
      background: 'rgba(124,58,237,0.07)',
      border: '1px solid rgba(124,58,237,0.18)',
    }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ background: 'linear-gradient(135deg,#7c3aed,#4f46e5)' }}>
            {index + 1}
          </div>
          <span className="text-purple-300 text-sm font-semibold">Cara detectada</span>
        </div>
        {conf !== undefined && (
          <span className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(52,211,153,0.15)', color: '#34d399', border: '1px solid rgba(52,211,153,0.25)' }}>
            {(conf * 100).toFixed(1)}% confianza
          </span>
        )}
      </div>

      {box.length === 4 && (
        <div className="mb-3">
          <div className="flex items-center gap-1.5 mb-2">
            <MapPin size={12} className="text-blue-400" />
            <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">Bounding Box</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[['X', box[0]], ['Y', box[1]], ['W', box[2]], ['H', box[3]]].map(([k, v]) => (
              <div key={k} className="text-center py-2 rounded-lg"
                style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.15)' }}>
                <p className="text-gray-500 text-xs">{k}</p>
                <p className="text-blue-300 text-xs font-bold mt-0.5">{pct(v)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {Object.keys(lands).length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <Eye size={12} className="text-purple-400" />
            <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">Landmarks</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {Object.entries(lands).map(([name, coords]) => (
              <div key={name} className="flex items-center justify-between px-3 py-1.5 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="text-gray-400 text-xs capitalize">{name.replace(/-/g, ' ')}</span>
                <span className="text-purple-300 text-xs font-mono">
                  {pct(coords[0])}, {pct(coords[1])}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function FaceDetectionDetail({ record, onClose }) {
  if (!record) return null;

  let entitiesParsed = null;
  try { entitiesParsed = JSON.parse(record.entities); } catch { /* noop */ }

  const faces    = entitiesParsed?.[0]?.objects ?? [];
  const isActive = record.status === 'A';

  return (
    <Modal title="" onClose={onClose} noPadding wide>
      <div className="overflow-hidden rounded-2xl flex" style={{ background: 'linear-gradient(160deg,rgba(12,8,35,1),rgba(7,5,22,1))', minHeight: '520px' }}>

        {/* Columna izquierda — imagen */}
        <div className="relative w-56 shrink-0">
          <img src={record.imageUrl} alt="face" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 50%, rgba(7,5,22,1) 100%)' }} />
          <div className="absolute top-4 left-3 flex flex-col gap-2">
            <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full w-fit"
              style={{ background: 'rgba(124,58,237,0.8)', border: '1px solid rgba(167,139,250,0.5)', backdropFilter: 'blur(8px)' }}>
              <Layers size={11} />{faces.length} cara{faces.length !== 1 ? 's' : ''}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full w-fit"
              style={isActive
                ? { background: 'rgba(16,185,129,0.8)', border: '1px solid rgba(52,211,153,0.5)', backdropFilter: 'blur(8px)' }
                : { background: 'rgba(239,68,68,0.8)',  border: '1px solid rgba(248,113,113,0.5)', backdropFilter: 'blur(8px)' }}>
              {isActive ? <CheckCircle size={11} /> : <XCircle size={11} />}
              {isActive ? 'Activo' : 'Inactivo'}
            </span>
          </div>
        </div>

        {/* Columna derecha — datos */}
        <div className="flex-1 flex flex-col overflow-y-auto" style={{ maxHeight: '520px' }}>

          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-5 pb-3 shrink-0"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl"
                style={{ background: 'linear-gradient(135deg,rgba(59,130,246,0.3),rgba(29,78,216,0.2))', border: '1px solid rgba(59,130,246,0.3)' }}>
                <ScanFace size={16} className="text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-base leading-none">Face Detection</h3>
                <p className="text-gray-600 text-xs mt-0.5">Resultado del análisis</p>
              </div>
            </div>
            <button onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-500 hover:text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>✕</button>
          </div>

          {/* Stats */}
          <div className="px-5 py-4 flex flex-col gap-3 shrink-0">
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Dimensiones', value: record.width ? `${record.width}×${record.height}` : '—', icon: Maximize2,   color: '#34d399' },
                { label: 'Status API',  value: record.statusCode || '—',                                  icon: CheckCircle, color: '#60a5fa' },
                { label: 'MD5',         value: record.md5 ? record.md5.slice(0,10) + '…' : '—',          icon: Hash,        color: '#f59e0b' },
              ].map(({ label, value, icon, color }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 py-3 rounded-xl text-center"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  {icon({ size: 15, style: { color } })}
                  <p className="text-white text-xs font-bold">{value}</p>
                  <p className="text-gray-600 text-xs">{label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <Calendar size={14} className="text-pink-400 shrink-0" />
                <div>
                  <p className="text-gray-600 text-xs">Creado</p>
                  <p className="text-gray-200 text-xs font-medium">
                    {record.createdAt ? new Date(record.createdAt).toLocaleDateString('es-PE') : '—'}
                  </p>
                </div>
              </div>
              <a href={record.imageUrl} target="_blank" rel="noreferrer"
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors"
                style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)' }}>
                <Link2 size={14} className="text-blue-400 shrink-0" />
                <div>
                  <p className="text-gray-600 text-xs">Ver imagen</p>
                  <p className="text-blue-400 text-xs">Abrir enlace ↗</p>
                </div>
              </a>
            </div>
          </div>

          {/* Caras */}
          {faces.length > 0 && (
            <div className="px-5 pb-4 flex flex-col gap-3">
              <div className="flex items-center gap-2" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
                <Layers size={14} className="text-purple-400" />
                <span className="text-gray-300 text-sm font-semibold">
                  {faces.length} cara{faces.length !== 1 ? 's' : ''} detectada{faces.length !== 1 ? 's' : ''}
                </span>
              </div>
              {faces.map((face, i) => <FaceCard key={i} face={face} index={i} />)}
            </div>
          )}

          <div className="px-5 pb-5 mt-auto shrink-0" />
        </div>
      </div>
    </Modal>
  );
}
