import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ScanFace, BrainCircuit, Cpu } from 'lucide-react';

const links = [
  { to: '/dashboard',      label: 'Dashboard',      Icon: LayoutDashboard },
  { to: '/face-detection', label: 'Face Detection', Icon: ScanFace        },
  { to: '/face-analysis',  label: 'Face Analysis',  Icon: BrainCircuit    },
];

export default function Sidebar() {
  return (
    <aside
      className="w-64 min-h-screen flex flex-col"
      style={{
        background: 'linear-gradient(180deg, rgba(10,8,30,0.97) 0%, rgba(15,10,40,0.97) 100%)',
        backdropFilter: 'blur(30px)',
        borderRight: '1px solid rgba(124,58,237,0.2)',
        boxShadow: '4px 0 40px rgba(0,0,0,0.6), inset -1px 0 0 rgba(255,255,255,0.04)',
      }}
    >
      {/* Logo */}
      <div className="px-6 py-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex items-center gap-3">
          <div
            className="p-2.5 rounded-xl"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
              boxShadow: '0 0 25px rgba(124,58,237,0.6), 0 4px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.25)',
            }}
          >
            <Cpu size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-base tracking-wide leading-none glow-text">
              Genesis AI
            </h1>
            <p className="text-purple-400 text-xs mt-0.5 opacity-80">Face Recognition</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 flex flex-col gap-1">
        <p className="text-gray-600 text-xs font-semibold uppercase tracking-widest px-3 mb-3">
          Navegación
        </p>
        {links.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'nav-active text-purple-200'
                  : 'text-gray-500 hover:text-gray-200 hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={17} className={isActive ? 'text-purple-400' : 'text-gray-600'} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div
            className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"
            style={{ boxShadow: '0 0 8px rgba(52,211,153,0.9)' }}
          />
          <p className="text-gray-500 text-xs">Sistema activo · v1.0.0</p>
        </div>
      </div>
    </aside>
  );
}
