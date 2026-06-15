import { useState, useEffect } from 'react';
import { faceDetectionService } from '../services/faceDetectionService';
import { faceAnalysisService }  from '../services/faceAnalysisService';
import { ScanFace, BrainCircuit, CheckCircle, XCircle, ImageOff, Activity } from 'lucide-react';

const STAT_STYLES = [
  { from: '#3b82f6', to: '#1d4ed8', glow: 'rgba(59,130,246,0.4)' },
  { from: '#7c3aed', to: '#4f46e5', glow: 'rgba(124,58,237,0.4)' },
  { from: '#10b981', to: '#059669', glow: 'rgba(16,185,129,0.4)' },
  { from: '#ef4444', to: '#b91c1c', glow: 'rgba(239,68,68,0.4)'  },
];

function StatCard({ icon: Icon, label, value, styleIdx }) {
  const s = STAT_STYLES[styleIdx];
  return (
    <div
      className="card-3d rounded-2xl p-5 flex items-center gap-4"
    >
      <div
        className="p-3 rounded-xl shrink-0"
        style={{
          background: `linear-gradient(135deg, ${s.from}, ${s.to})`,
          boxShadow: `0 0 20px ${s.glow}, 0 4px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)`,
        }}
      >
        <Icon size={22} className="text-white" />
      </div>
      <div>
        <p className="text-gray-500 text-xs font-medium">{label}</p>
        <p className="text-white text-3xl font-bold mt-0.5" style={{ textShadow: `0 0 20px ${s.glow}` }}>
          {value ?? '—'}
        </p>
      </div>
    </div>
  );
}

function RecentRow({ imageUrl, label, date, status }) {
  return (
    <div
      className="flex items-center gap-3 py-3 transition-colors hover:bg-white/[0.02] rounded-lg px-2"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
    >
      {imageUrl
        ? <img src={imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0"
            style={{ border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }} />
        : <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
            <ImageOff size={16} className="text-gray-600" />
          </div>
      }
      <div className="flex-1 min-w-0">
        <p className="text-gray-200 text-sm truncate">{label}</p>
        <p className="text-gray-600 text-xs mt-0.5">{date}</p>
      </div>
      <span
        className="text-xs font-semibold px-2.5 py-1 rounded-full shrink-0"
        style={status === 'A'
          ? { background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)' }
          : { background: 'rgba(239,68,68,0.15)',  color: '#f87171', border: '1px solid rgba(239,68,68,0.2)'  }
        }
      >
        {status === 'A' ? 'Activo' : 'Inactivo'}
      </span>
    </div>
  );
}

export default function DashboardPage() {
  const [detections,  setDetections]  = useState([]);
  const [analyses,    setAnalyses]    = useState([]);
  const [detInactive, setDetInactive] = useState([]);
  const [anaInactive, setAnaInactive] = useState([]);
  const [loading,     setLoading]     = useState(true);

  useEffect(() => {
    Promise.all([
      faceDetectionService.findAllActive(),
      faceDetectionService.findAllInactive(),
      faceAnalysisService.findAllActive(),
      faceAnalysisService.findAllInactive(),
    ]).then(([da, di, aa, ai]) => {
      setDetections(da.data);
      setDetInactive(di.data);
      setAnalyses(aa.data);
      setAnaInactive(ai.data);
    }).finally(() => setLoading(false));
  }, []);

  const stats = [
    { icon: ScanFace,     label: 'Detecciones activas', value: detections.length,                        styleIdx: 0 },
    { icon: BrainCircuit, label: 'Análisis activos',     value: analyses.length,                          styleIdx: 1 },
    { icon: CheckCircle,  label: 'Total activos',        value: detections.length + analyses.length,      styleIdx: 2 },
    { icon: XCircle,      label: 'Total inactivos',      value: detInactive.length + anaInactive.length,  styleIdx: 3 },
  ];

  if (loading)
    return (
      <div className="flex items-center justify-center h-full py-32">
        <div className="text-center">
          <div className="w-10 h-10 rounded-full border-2 border-purple-500 border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Cargando dashboard...</p>
        </div>
      </div>
    );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div
          className="p-2.5 rounded-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(79,70,229,0.2))',
            border: '1px solid rgba(124,58,237,0.3)',
            boxShadow: '0 0 20px rgba(124,58,237,0.2)',
          }}
        >
          <Activity size={20} className="text-purple-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white glow-text">Dashboard</h2>
          <p className="text-gray-600 text-sm">Resumen general del sistema</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {stats.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Recent */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {[
          { icon: ScanFace,     title: 'Últimas detecciones', color: '#3b82f6', data: detections.slice(0,5),  keyFn: r => r.imageName || r.imageUrl },
          { icon: BrainCircuit, title: 'Últimos análisis',    color: '#7c3aed', data: analyses.slice(0,5),    keyFn: r => r.requestId  || r.imageUrl },
        ].map(({ icon: Icon, title, color, data, keyFn }) => (
          <div
            key={title}
            className="rounded-2xl p-5"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            <div className="flex items-center gap-2.5 mb-4">
              <Icon size={17} style={{ color }} />
              <h3 className="text-white font-semibold text-sm">{title}</h3>
              <span
                className="ml-auto text-xs px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(255,255,255,0.05)', color: '#6b7280' }}
              >
                {data.length} registros
              </span>
            </div>
            {data.length === 0
              ? <p className="text-gray-700 text-sm text-center py-8">Sin registros</p>
              : data.map(r => (
                  <RecentRow
                    key={r.id}
                    imageUrl={r.imageUrl}
                    label={keyFn(r)}
                    date={r.createdAt ? new Date(r.createdAt).toLocaleString() : '—'}
                    status={r.status}
                  />
                ))
            }
          </div>
        ))}
      </div>
    </div>
  );
}
