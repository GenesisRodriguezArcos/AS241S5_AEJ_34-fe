export default function Modal({ title, onClose, children, noPadding = false, wide = false }) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <div
        className={`w-full ${wide ? 'max-w-2xl' : 'max-w-md'} rounded-2xl overflow-hidden ${noPadding ? '' : 'p-6'}`}
        style={{
          background: 'linear-gradient(145deg, rgba(15,10,40,0.99), rgba(8,6,28,0.99))',
          border: '1px solid rgba(124,58,237,0.2)',
          boxShadow:
            '0 30px 70px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
        onClick={e => e.stopPropagation()}
      >
        {title && (
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-white font-semibold text-base glow-text">{title}</h3>
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              ✕
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
