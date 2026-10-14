import { useMemo, useState } from 'react';
import { ArrowUpRight, BookOpen, Clock3, Globe2, Layers3, Search, SlidersHorizontal } from 'lucide-react';
import { AcademyCourse, CatalogMode, departmentCourses, departments, onlineCourses } from './catalog';
import './catalog.css';

export default function AcademyCatalog({ onSelect }: { onSelect: (value: string) => void }) {
  const [mode, setMode] = useState<CatalogMode>('online');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [expanded, setExpanded] = useState(false);
  const source = mode === 'online' ? onlineCourses : departmentCourses;
  const categories = [...new Set(source.map(course => course.category))];
  const matches = useMemo(() => source.filter(course => (category === 'all' || course.category === category)
    && `${course.title} ${course.category}`.toLowerCase().includes(query.trim().toLowerCase())), [source, category, query]);
  const visible = expanded || query || category !== 'all' ? matches : matches.slice(0, 6);

  const changeMode = (next: CatalogMode) => { setMode(next); setCategory('all'); setQuery(''); setExpanded(false); };
  const enquire = (course: AcademyCourse) => {
    onSelect(course.enrollmentLabel);
    document.getElementById('enroll')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    window.setTimeout(() => document.querySelector<HTMLInputElement>('#enroll input')?.focus({ preventScroll: true }), 450);
  };

  return <section className="section academy-catalog" id="academy-catalog" aria-labelledby="academy-catalog-title">
    <div className="ac-intro">
      <div><span className="eyebrow"><Layers3 size={13} /> THE ACADEMY COLLECTION</span>
        <h2 id="academy-catalog-title">A new skill.<br /><em>A new possibility.</em></h2></div>
      <p>From your first digital skill to your next professional chapter. Explore our proposed course collection and find your starting point.</p>
    </div>
    <div className="ac-switch" aria-label="Course collection">
      <button type="button" className={mode === 'online' ? 'active' : ''} aria-pressed={mode === 'online'} onClick={() => changeMode('online')}><Globe2 size={17} /><span>Online certificates<small>6 categories · fully online proposed</small></span><b>30</b></button>
      <button type="button" className={mode === 'department' ? 'active' : ''} aria-pressed={mode === 'department'} onClick={() => changeMode('department')}><Layers3 size={17} /><span>IT departments<small>7 departments · explore technology</small></span><b>35</b></button>
    </div>
    <div className="ac-controls">
      <label className="ac-search"><Search size={17} /><span className="ac-sr">Search courses</span><input type="search" placeholder="What would you like to learn?" value={query} onChange={event => setQuery(event.target.value)} /></label>
      <label className="ac-category"><SlidersHorizontal size={15} /><span className="ac-sr">Filter by {mode === 'online' ? 'category' : 'department'}</span><select value={category} onChange={event => setCategory(event.target.value)}><option value="all">All {mode === 'online' ? 'categories' : 'departments'}</option>{categories.map(item => <option key={item} value={item}>{item}</option>)}</select></label>
    </div>
    <div className="ac-summary"><span aria-live="polite">{matches.length} {matches.length === 1 ? 'course' : 'courses'} to explore{visible.length < matches.length ? ` · showing ${visible.length}` : ''}</span><span>PROPOSED COLLECTION / 2026</span></div>
    <div className="ac-grid">
      {visible.map((course) => <article className="ac-card glass" key={course.id}>
        <div className="ac-card-top"><span className="ac-card-symbol"><BookOpen size={20} /></span><span>{mode === 'online' ? 'ONLINE CERTIFICATE' : `DEPARTMENT ${departments.find(item => item.category === course.category)?.number}`}</span><span className="ac-card-number">{String(source.indexOf(course) + 1).padStart(2, '0')}</span></div>
        <p className="ac-course-category">{course.category}</p>
        <h3>{course.title}</h3>
        <div className="ac-course-mode">{course.duration ? <><Clock3 size={13} />{course.duration}<span>·</span><Globe2 size={13} />Fully online</> : <><Clock3 size={13} />Schedule & delivery to be confirmed</>}</div>
        <div className="ac-card-footer"><div><small>{mode === 'online' ? 'PROPOSED COURSE FEE' : 'PROPOSED DEPARTMENT FEE'}</small><strong>{course.fee}</strong>{mode === 'department' && <span>Confirm fee for your chosen course</span>}</div><button type="button" onClick={() => enquire(course)} aria-label={`Enquire about ${course.title}`}><span>Enquire</span><ArrowUpRight size={17} /></button></div>
      </article>)}
    </div>
    {matches.length === 0 && <div className="ac-empty"><Search size={28} /><h3>No courses found</h3><p>Try another skill or browse the full collection.</p><button type="button" className="button outline" onClick={() => { setQuery(''); setCategory('all'); }}>Reset filters</button></div>}
    {!query && category === 'all' && matches.length > 6 && <div className="ac-more"><button type="button" className="button outline" aria-expanded={expanded} onClick={() => { setExpanded(!expanded); if (expanded) document.getElementById('academy-catalog')?.scrollIntoView({ block: 'start' }); }}>{expanded ? 'Show fewer courses' : `Explore all ${matches.length} ${mode === 'online' ? 'certificates' : 'IT courses'}`}<ArrowUpRight size={17} /></button></div>}
    <p className="ac-planning-note"><span>Before you enrol</span> Fees{mode === 'online' ? ', durations and fully online delivery' : ' and departmental ranges'} are proposed for planning. Confirm the curriculum, {mode === 'department' ? 'course-specific fee, duration, classroom or online arrangements, ' : 'delivery arrangements, '}intake availability and certificate recognition with Digitalmod Academy before enrolling. An enquiry is not a confirmed admission.</p>
  </section>;
}

