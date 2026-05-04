import { useState, useEffect } from 'react';
import Modal from '../shared/Modal';

export default function FaceAnalysisForm({ record, onSave, onClose }) {
  const isEdit = !!record;
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (record) setImageUrl(record.imageUrl || '');
  }, [record]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ imageUrl });
  };

  return (
    <Modal title={isEdit ? 'Editar análisis' : 'Nuevo análisis'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-gray-500 text-xs mb-1.5 block font-medium">URL de imagen</label>
          <input
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            placeholder="https://..."
            required
            className="input-3d w-full text-gray-200 text-sm px-3 py-2.5 rounded-xl"
          />
        </div>
        <div className="flex gap-3 justify-end mt-2">
          <button type="button" onClick={onClose}
            className="text-sm px-4 py-2 rounded-xl font-medium text-gray-400 transition-all"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            Cancelar
          </button>
          <button type="submit" className="btn-3d text-sm text-white font-semibold px-5 py-2 rounded-xl">
            {isEdit ? 'Guardar cambios' : 'Analizar'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
