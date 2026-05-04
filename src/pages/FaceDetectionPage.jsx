import { useState, useEffect, useCallback } from 'react';
import { faceDetectionService } from '../services/faceDetectionService';
import FaceDetectionList   from '../components/faceDetection/FaceDetectionList';
import FaceDetectionDetail from '../components/faceDetection/FaceDetectionDetail';
import FaceDetectionForm   from '../components/faceDetection/FaceDetectionForm';
import { ScanFace, Plus, ArchiveX, Archive } from 'lucide-react';
import { alertSuccess, alertError, alertConfirm, alertConfirmRestore } from '../utils/alerts';

export default function FaceDetectionPage() {
  const [data,         setData]         = useState([]);
  const [showInactive, setShowInactive] = useState(false);
  const [showForm,     setShowForm]     = useState(false);
  const [selected,     setSelected]     = useState(null);
  const [detail,       setDetail]       = useState(null);
  const [loading,      setLoading]      = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = showInactive
        ? await faceDetectionService.findAllInactive()
        : await faceDetectionService.findAllActive();
      setData(res.data);
    } finally {
      setLoading(false);
    }
  }, [showInactive]);

  useEffect(() => { load(); }, [load]);

  const handleSave = async ({ imageUrl, imageName }) => {
    try {
      if (selected) {
        await faceDetectionService.update(selected.id, { ...selected, imageUrl, imageName });
        alertSuccess('Actualizado', 'El registro fue actualizado correctamente.');
      } else {
        await faceDetectionService.detect(imageUrl);
        alertSuccess('Detección exitosa', 'La imagen fue procesada y guardada.');
      }
      setShowForm(false);
      setSelected(null);
      load();
    } catch {
      alertError('Error', 'No se pudo procesar la solicitud.');
    }
  };

  const handleDisable = async (id) => {
    const result = await alertConfirm('¿Eliminar registro?', 'El registro pasará a estado inactivo.');
    if (result.isConfirmed) {
      try {
        await faceDetectionService.disable(id);
        alertSuccess('Eliminado', 'El registro fue desactivado.');
        load();
      } catch {
        alertError('Error', 'No se pudo eliminar el registro.');
      }
    }
  };

  const handleEnable = async (id) => {
    const result = await alertConfirmRestore('¿Restaurar registro?', 'El registro volverá a estado activo.');
    if (result.isConfirmed) {
      try {
        await faceDetectionService.enable(id);
        alertSuccess('Restaurado', 'El registro fue activado nuevamente.');
        load();
      } catch {
        alertError('Error', 'No se pudo restaurar el registro.');
      }
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div
            className="p-2.5 rounded-xl"
            style={{
              background: 'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(29,78,216,0.2))',
              border: '1px solid rgba(59,130,246,0.3)',
              boxShadow: '0 0 20px rgba(59,130,246,0.2)',
            }}
          >
            <ScanFace size={20} className="text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white glow-text">Face Detection</h2>
            <p className="text-gray-600 text-sm mt-0.5">
              {showInactive ? 'Registros inactivos' : 'Registros activos'}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowInactive(v => !v)}
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl font-medium transition-all"
            style={showInactive
              ? { background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.4)', color: '#c4b5fd', boxShadow: '0 0 15px rgba(124,58,237,0.2)' }
              : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#6b7280' }
            }
          >
            {showInactive ? <Archive size={15} /> : <ArchiveX size={15} />}
            {showInactive ? 'Ver activos' : 'Ver inactivos'}
          </button>
          {!showInactive && (
            <button
              onClick={() => { setSelected(null); setShowForm(true); }}
              className="btn-3d flex items-center gap-2 text-sm text-white font-semibold px-4 py-2 rounded-xl"
            >
              <Plus size={16} />
              Nueva detección
            </button>
          )}
        </div>
      </div>

      {loading
        ? <p className="text-gray-500 text-center py-16">Cargando...</p>
        : <FaceDetectionList
            data={data}
            showInactive={showInactive}
            onSelect={setDetail}
            onEdit={row => { setSelected(row); setShowForm(true); }}
            onDisable={handleDisable}
            onEnable={handleEnable}
          />
      }

      {detail && <FaceDetectionDetail record={detail} onClose={() => setDetail(null)} />}

      {showForm && (
        <FaceDetectionForm
          record={selected}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setSelected(null); }}
        />
      )}
    </div>
  );
}
