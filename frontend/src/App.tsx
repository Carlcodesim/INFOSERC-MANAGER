import { useState } from 'react'
import { Activity, ArrowDownRight, ArrowRight, ArrowUpRight, BookOpen, CalendarDays, CheckCircle2, ChevronDown, CircleHelp, ClipboardList, Command, FileText, Gauge, HeartHandshake, LayoutDashboard, Menu, MoreHorizontal, Plus, Search, Settings2, Users, X } from 'lucide-react'

type Section = 'Resumen' | 'Contenidos' | 'Tareas' | 'Colaboradores' | 'Actividades' | 'Estadísticas' | 'Ajustes'

const navigation: { label: Section; icon: typeof Gauge; hint: string }[] = [
  { label: 'Resumen', icon: LayoutDashboard, hint: 'Vista general' },
  { label: 'Contenidos', icon: FileText, hint: 'Tutoriales y publicaciones' },
  { label: 'Tareas', icon: ClipboardList, hint: 'Organización del trabajo' },
  { label: 'Colaboradores', icon: Users, hint: 'Personas y equipo' },
  { label: 'Actividades', icon: CalendarDays, hint: 'Programas y eventos' },
  { label: 'Estadísticas', icon: Activity, hint: 'Impacto de INFOSERC' },
  { label: 'Ajustes', icon: Settings2, hint: 'Configuración' },
]

const tasks = [
  { title: 'Definir las categorías de tutoriales', area: 'Contenidos', priority: 'Alta', state: 'En progreso' },
  { title: 'Preparar calendario de publicaciones', area: 'Planificación', priority: 'Media', state: 'Pendiente' },
  { title: 'Documentar la misión de INFOSERC', area: 'Organización', priority: 'Alta', state: 'Pendiente' },
]

function App() {
  const [active, setActive] = useState<Section>('Resumen')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showNotice, setShowNotice] = useState(true)

  const current = navigation.find((item) => item.label === active) ?? navigation[0]
  const Icon = current.icon

  return (
    <div className="app-shell">
      {sidebarOpen && <button className="mobile-scrim" aria-label="Cerrar menú" onClick={() => setSidebarOpen(false)} />}
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="brand-lockup">
          <div className="brand-mark"><Command size={22} strokeWidth={2.4} /></div>
          <div><div className="brand-name">INFOSERC<span>.</span></div><div className="brand-caption">CENTRO DE GESTIÓN</div></div>
          <button className="icon-button sidebar-close" aria-label="Cerrar menú" onClick={() => setSidebarOpen(false)}><X size={18} /></button>
        </div>
        <div className="workspace-label">ESPACIO DE TRABAJO</div>
        <button className="workspace-switch"><div className="workspace-avatar">I</div><div className="workspace-copy"><strong>INFOSERC</strong><span>Iniciativa educativa</span></div><ChevronDown size={16} /></button>
        <div className="nav-label">GESTIÓN</div>
        <nav className="main-nav" aria-label="Navegación principal">
          {navigation.map(({ label, icon: NavIcon, hint }) => (
            <button key={label} className={`nav-item ${active === label ? 'nav-item-active' : ''}`} onClick={() => { setActive(label); setSidebarOpen(false) }} title={hint}>
              <NavIcon size={18} strokeWidth={1.8} /><span>{label}</span>{label === 'Tareas' && <span className="nav-count">3</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card"><div className="help-icon"><HeartHandshake size={18} /></div><strong>Educación que sirve</strong><p>Compartimos conocimiento para abrir oportunidades.</p><button onClick={() => setActive('Ajustes')}>Conocer el proyecto <ArrowRight size={14} /></button></div>
          <div className="profile-row"><div className="profile-avatar">A</div><div className="profile-copy"><strong>Administrador</strong><span>Acceso inicial</span></div><MoreHorizontal size={18} className="profile-more" /></div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar"><div className="topbar-left"><button className="icon-button mobile-menu" aria-label="Abrir menú" onClick={() => setSidebarOpen(true)}><Menu size={20} /></button><div className="breadcrumb">INFOSERC <span>/</span> <strong>{active}</strong></div></div><div className="topbar-actions"><div className="status-pill"><span className="status-dot" /> Entorno inicial</div><button className="icon-button search-button" aria-label="Buscar" title="Búsqueda próximamente"><Search size={18} /></button><button className="avatar-small" aria-label="Perfil del administrador">A</button></div></header>
        <div className="page-content">
          <section className="page-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> PLATAFORMA DE GESTIÓN</div><h1>{active === 'Resumen' ? 'Todo empieza aquí.' : active}</h1><p>{active === 'Resumen' ? 'Organiza las ideas, crea recursos y da seguimiento al impacto de INFOSERC.' : current.hint + ' de INFOSERC. Este módulo se habilitará en las próximas etapas.'}</p></div><button className="primary-button" onClick={() => setActive('Tareas')}><Plus size={17} /> Nueva tarea</button></section>

          {showNotice && <div className="notice"><div className="notice-icon"><CircleHelp size={19} /></div><div className="notice-copy"><strong>Tu espacio de trabajo está preparado para comenzar</strong><span>Esta es la primera versión visual. Las tarjetas y tareas son ejemplos; todavía no se guardan en una base de datos.</span></div><button className="notice-close" aria-label="Cerrar aviso" onClick={() => setShowNotice(false)}><X size={17} /></button></div>}

          {active === 'Resumen' ? <>
            <div className="section-title-row"><div><h2>Resumen general</h2><p>Una vista rápida de la organización.</p></div><button className="period-button">Vista inicial <ChevronDown size={15} /></button></div>
            <div className="metric-grid">
              <article className="metric-card"><div className="metric-top"><span>Contenidos planificados</span><span className="metric-icon icon-lavender"><BookOpen size={18} /></span></div><div className="metric-value">—</div><div className="metric-foot"><span className="metric-neutral">Sin datos todavía</span><span className="metric-foot-label">Tutoriales y recursos</span></div></article>
              <article className="metric-card"><div className="metric-top"><span>Tareas abiertas</span><span className="metric-icon icon-blue"><ClipboardList size={18} /></span></div><div className="metric-value">—</div><div className="metric-foot"><span className="metric-neutral">Sin datos todavía</span><span className="metric-foot-label">Trabajo por completar</span></div></article>
              <article className="metric-card"><div className="metric-top"><span>Actividades</span><span className="metric-icon icon-peach"><CalendarDays size={18} /></span></div><div className="metric-value">—</div><div className="metric-foot"><span className="metric-neutral">Sin datos todavía</span><span className="metric-foot-label">Programas y eventos</span></div></article>
              <article className="metric-card"><div className="metric-top"><span>Impacto registrado</span><span className="metric-icon icon-mint"><HeartHandshake size={18} /></span></div><div className="metric-value">—</div><div className="metric-foot"><span className="metric-neutral">Sin datos todavía</span><span className="metric-foot-label">Personas alcanzadas y más</span></div></article>
            </div>

            <div className="content-grid"><section className="panel task-panel"><div className="panel-heading"><div><h2>Primeras tareas sugeridas</h2><p>Un punto de partida para organizar el proyecto.</p></div><button className="text-button" onClick={() => setActive('Tareas')}>Ver tareas <ArrowRight size={15} /></button></div><div className="task-list">{tasks.map((task, index) => <div className="task-row" key={task.title}><div className={`task-checkbox ${index === 0 ? 'task-checkbox-active' : ''}`}>{index === 0 && <CheckCircle2 size={15} />}</div><div className="task-main"><strong>{task.title}</strong><span>{task.area}</span></div><span className={`priority priority-${task.priority === 'Alta' ? 'high' : 'medium'}`}>{task.priority}</span><span className={`task-state ${task.state === 'En progreso' ? 'state-progress' : ''}`}>{task.state}</span></div>)}</div><div className="panel-footer"><span>Ejemplos de planificación, no tareas guardadas.</span><button onClick={() => setActive('Tareas')}>Organizar tareas <ArrowRight size={14} /></button></div></section>

            <section className="panel quick-panel"><div className="panel-heading"><div><h2>Accesos rápidos</h2><p>Los módulos principales de INFOSERC.</p></div></div><div className="quick-links"><button onClick={() => setActive('Contenidos')}><span className="quick-icon quick-purple"><FileText size={18} /></span><span><strong>Planificar contenido</strong><small>Ideas y tutoriales</small></span><ArrowUpRight size={16} /></button><button onClick={() => setActive('Actividades')}><span className="quick-icon quick-orange"><CalendarDays size={18} /></span><span><strong>Crear actividad</strong><small>Programas educativos</small></span><ArrowUpRight size={16} /></button><button onClick={() => setActive('Colaboradores')}><span className="quick-icon quick-green"><Users size={18} /></span><span><strong>Equipo de trabajo</strong><small>Colaboradores futuros</small></span><ArrowUpRight size={16} /></button><button onClick={() => setActive('Estadísticas')}><span className="quick-icon quick-blue"><Activity size={18} /></span><span><strong>Medir el impacto</strong><small>Indicadores y resultados</small></span><ArrowUpRight size={16} /></button></div></section></div>
            <div className="bottom-note"><div className="bottom-note-icon"><HeartHandshake size={18} /></div><div><strong>La tecnología tiene más valor cuando está al servicio de las personas.</strong><span>INFOSERC · Aprender, compartir y crear oportunidades.</span></div><span className="note-spark">✳</span></div>
          </> : <section className="module-placeholder panel"><div className="placeholder-icon"><Icon size={28} /></div><div className="eyebrow">MÓDULO EN PREPARACIÓN</div><h2>{active}</h2><p>{current.hint}. Aquí construiremos las funciones para crear, consultar, editar y organizar información persistente.</p><div className="placeholder-list"><span><CheckCircle2 size={16} /> Diseño y navegación inicial</span><span><ArrowDownRight size={16} /> Falta conectar la API y la base de datos</span></div><button className="primary-button" onClick={() => setActive('Resumen')}>Volver al resumen <ArrowRight size={16} /></button></section>}
          <footer className="page-footer"><span>INFOSERC Manager <span className="footer-separator">·</span> Versión 0.1.0</span><span>Hecho para organizar conocimiento y servicio.</span></footer>
        </div>
      </main>
    </div>
  )
}

export default App