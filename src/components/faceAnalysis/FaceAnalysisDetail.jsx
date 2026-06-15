import Modal from '../shared/Modal';
import { Calendar, Hash, CheckCircle, XCircle, AlertCircle, User, Layers, Link2, BrainCircuit, Smile, Eye } from 'lucide-react';

function FaceCard({ face, index }) {
  const rows = [
    { label: 'Edad',        value: face.age !== undefined ? `${face.age} años` : null,                                                              color: '#60a5fa' },
    { label: 'Género',      value: face.gender ? `${face.gender} (${face.gender_probability}%)` : null,                                             color: '#f472b6' },
    { label: 'Emoción',     value: face.emotion ? `${face.emotion} (${face.emotion_probability}%)` : null,                                          color: '#fbbf24' },
    { label: 'Mascarilla',  value: face.wear_facemask !== undefined ? (face.wear_facemask ? 'Sí' : 'No') : null,                                    color: '#f87171' },
    { label: 'Es real',     value: face.is_real_face !== undefined ? `${face.is_real_face ? 'Sí' : 'No'} (${face.liveness_probability}%)` : null,  color: '#34d399' },
  ].filter(r => r.value !== null && r.value !== undefined);

  return (
    <div className="rounded-xl p-4" style={{
      background: 'rgba(79,70,229,0.07)',
      border: '1px solid rgba(79,70,229,0.18)',
    }}>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
          style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)' }}>
          {index + 1}
        </div>
        <span className="text-indigo-300 text-sm font-semibold">Rostro #{index + 1}</span>
      </div>

      {rows.length > 0 ? (
        <div className="grid grid-cols-2 gap-2">
          {rows.map(({ label, value, color }) => (
            <div key={label} className="flex items-center justify-between px-3 py-2 rounded-lg"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <span className="text-gray-500 text-xs">{label}</span>
              <span className="text-xs font-semibold capitalize" style={{ color }}>{value}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-xs text-center py-2">Sin datos adicionales</p>
      )}
    </div>
  );
}

export default function FaceAnalysisDetail({ record, onClose }) {
  if (!record) return null;

  let faceListParsed = null;
  try { faceListParsed = JSON.parse(record.faceList); } catch { /* noop */ }

  const faces    = Array.isArray(faceListParsed) ? faceListParsed : [];
  const isActive = record.status === 'A';
  const isOk     = record.errorCode === 0;

  return (
    <Modal title="" onClose={onClose} noPadding wide>
      <div className="overflow-hidden rounded-2xl flex" style={{ background: 'linear-gradient(160deg,rgba(12,8,35,1),rgba(7,5,22,1))', minHeight: '520px' }}>

        {/* Columna izquierda — imagen */}
        <div className="relative w-56 shrink-0">
          <img src={record.imageUrl} alt="face" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 50%, rgba(7,5,22,1) 100%)' }} />
          <div className="absolute top-4 left-3 flex flex-col gap-2">
            <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full w-fit"
              style={{ background: 'rgba(79,70,229,0.8)', border: '1px solid rgba(129,140,248,0.5)', backdropFilter: 'blur(8px)' }}>
              <User size={11} />{faces.length} rostro{faces.length !== 1 ? 's' : ''}
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
                style={{ background: 'linear-gradient(135deg,rgba(124,58,237,0.3),rgba(79,70,229,0.2))', border: '1px solid rgba(124,58,237,0.3)' }}>
                <BrainCircuit size={16} className="text-purple-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-base leading-none">Face Analysis</h3>
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
                { label: 'Error Code', value: isOk ? '✓ OK' : `Error ${record.errorCode}`, icon: AlertCircle, color: isOk ? '#34d399' : '#f87171' },
                { label: 'Rostros',    value: `${faces.length} detectado${faces.length !== 1 ? 's' : ''}`,    icon: User,        color: '#a78bfa' },
                { label: 'Request ID', value: record.requestId ? record.requestId.slice(0,8) + '…' : '—',     icon: Hash,        color: '#f59e0b' },
              ].map(({ label, value, icon: RowIcon, color }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 py-3 rounded-xl text-center"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <RowIcon size={15} style={{ color }} />
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

          {/* Rostros analizados */}
          {faces.length > 0 && (
            <div className="px-5 pb-4 flex flex-col gap-3">
              <div className="flex items-center gap-2" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
                <Smile size={14} className="text-indigo-400" />
                <span className="text-gray-300 text-sm font-semibold">
                  {faces.length} rostro{faces.length !== 1 ? 's' : ''} analizado{faces.length !== 1 ? 's' : ''}
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
