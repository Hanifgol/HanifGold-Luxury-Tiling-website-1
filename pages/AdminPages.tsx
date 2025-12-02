
import React, { useState, useRef } from 'react';
import { useContent } from '../context/ContentContext';
import { Project, Service, Testimonial, BlogPost, JournalEntry } from '../types';
import { Icons } from '../components/Icons';
import { generateMarketingCopy } from '../services/geminiService';

// --- Dashboard Home ---
export const AdminDashboard = () => {
  const { projects, services, testimonials, blogPosts, journalEntries } = useContent();

  const StatCard = ({ title, count, icon: Icon, colorClass }: any) => (
    <div className="bg-white p-6 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
      <div>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-gray-800 tracking-tight">{count}</h3>
      </div>
      <div className={`p-3 rounded-lg ${colorClass} bg-opacity-10 text-opacity-100`}>
        <Icon size={24} className={colorClass.replace('bg-', 'text-')} />
      </div>
    </div>
  );

  return (
    <div className="space-y-8 font-sans">
      <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
            <p className="text-gray-500 text-sm mt-1">Welcome back, Admin. Here's what's happening today.</p>
          </div>
          <span className="text-xs font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full">{new Date().toLocaleDateString()}</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard title="Projects" count={projects.length} icon={Icons.FolderOpen} colorClass="bg-blue-600 text-blue-600" />
        <StatCard title="Services" count={services.length} icon={Icons.Layers} colorClass="bg-purple-600 text-purple-600" />
        <StatCard title="Testimonials" count={testimonials.length} icon={Icons.Users} colorClass="bg-green-600 text-green-600" />
        <StatCard title="Blog Posts" count={blogPosts.length} icon={Icons.FileText} colorClass="bg-orange-600 text-orange-600" />
        <StatCard title="Journal" count={journalEntries.length} icon={Icons.BookOpen} colorClass="bg-gray-800 text-gray-800" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2"><Icons.Sparkles size={18} className="text-gold-500"/> Recent Activity</h2>
            <ul className="space-y-4">
                <li className="flex items-start gap-4 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0"><Icons.CheckCircle size={14} /></div>
                    <div>
                        <p className="text-sm font-medium text-gray-800">System initialized</p>
                        <p className="text-xs text-gray-500 mt-0.5">All database connections established successfully.</p>
                    </div>
                    <span className="ml-auto text-xs text-gray-400">Just now</span>
                </li>
                <li className="flex items-start gap-4 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0"><Icons.Users size={14} /></div>
                    <div>
                        <p className="text-sm font-medium text-gray-800">Admin Login</p>
                        <p className="text-xs text-gray-500 mt-0.5">Secure session started via Supabase Auth.</p>
                    </div>
                    <span className="ml-auto text-xs text-gray-400">2 mins ago</span>
                </li>
            </ul>
        </div>
        
        <div className="bg-gradient-to-br from-luxury-black to-gray-900 text-white p-8 rounded-xl shadow-lg">
            <h2 className="text-lg font-bold mb-4 font-serif text-gold-500">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
                <button className="bg-white/10 hover:bg-white/20 p-4 rounded-lg text-left transition-colors">
                    <Icons.Plus className="mb-2 text-white/70" />
                    <span className="text-sm font-bold block">New Project</span>
                </button>
                 <button className="bg-white/10 hover:bg-white/20 p-4 rounded-lg text-left transition-colors">
                    <Icons.FileText className="mb-2 text-white/70" />
                    <span className="text-sm font-bold block">Write Article</span>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

// --- Journal Editor ---
export const AdminJournal = () => {
  const { journalEntries, addJournalEntry, updateJournalEntry, deleteJournalEntry } = useContent();
  const [selectedEntry, setSelectedEntry] = useState<Partial<JournalEntry> | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleCreate = () => {
    setSelectedEntry({ title: '', content: '' });
    setIsEditing(true);
  };

  const handleEdit = (entry: JournalEntry) => {
    setSelectedEntry(entry);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!selectedEntry?.title || !selectedEntry?.content) return;
    
    if (selectedEntry.id) {
      await updateJournalEntry(selectedEntry as JournalEntry);
    } else {
      await addJournalEntry(selectedEntry);
    }
    setIsEditing(false);
    setSelectedEntry(null);
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if(window.confirm("Delete this journal entry?")) {
        await deleteJournalEntry(id);
        if(selectedEntry?.id === id) {
            setIsEditing(false);
            setSelectedEntry(null);
        }
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col md:flex-row gap-8 font-sans">
      {/* List Sidebar */}
      <div className="w-full md:w-80 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="font-bold text-gray-800 flex items-center gap-2 text-sm uppercase tracking-wide"><Icons.BookOpen size={16} className="text-gray-500"/> Journal</h2>
          <button onClick={handleCreate} className="p-1.5 bg-gray-900 text-white rounded-md hover:bg-gray-700 transition-colors shadow-sm">
            <Icons.Plus size={16} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {journalEntries.map(entry => (
             <div 
               key={entry.id} 
               onClick={() => handleEdit(entry)}
               className={`p-4 rounded-lg border cursor-pointer transition-all group ${
                 selectedEntry?.id === entry.id 
                 ? 'border-gold-500/50 bg-gold-50 shadow-sm' 
                 : 'border-transparent hover:bg-gray-50'
               }`}
             >
                <div className="flex justify-between items-start mb-1">
                   <h3 className={`font-semibold text-sm line-clamp-1 ${selectedEntry?.id === entry.id ? 'text-gray-900' : 'text-gray-700'}`}>{entry.title || 'Untitled'}</h3>
                   <button onClick={(e) => handleDelete(e, entry.id)} className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                     <Icons.X size={14} />
                   </button>
                </div>
                <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">{entry.content}</p>
                <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                   <Icons.Calendar size={10} />
                   {new Date(entry.createdAt).toLocaleDateString()}
                </div>
             </div>
          ))}
          {journalEntries.length === 0 && (
            <div className="flex flex-col items-center justify-center h-40 text-gray-400 text-sm p-4 text-center">
                <Icons.BookOpen className="mb-2 opacity-20" size={32} />
                No entries found.
            </div>
          )}
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden relative">
        {isEditing && selectedEntry ? (
           <>
             <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                <input 
                  className="bg-transparent text-2xl font-serif font-bold text-gray-900 outline-none w-full placeholder-gray-300" 
                  placeholder="Entry Title..."
                  value={selectedEntry.title}
                  onChange={e => setSelectedEntry({...selectedEntry, title: e.target.value})}
                  autoFocus
                />
                <button 
                  onClick={handleSave}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-200 ml-4 shrink-0"
                >
                  <Icons.Save size={16} /> Save Entry
                </button>
             </div>
             <textarea 
               className="flex-1 p-8 outline-none resize-none text-gray-600 leading-8 font-sans text-lg bg-gray-50/30"
               placeholder="Start writing your thoughts..."
               value={selectedEntry.content}
               onChange={e => setSelectedEntry({...selectedEntry, content: e.target.value})}
             />
             <div className="p-3 border-t bg-gray-50 flex justify-end text-xs text-gray-400 font-mono">
               {selectedEntry.updatedAt ? `Last saved: ${new Date(selectedEntry.updatedAt).toLocaleString()}` : 'Unsaved Draft'}
             </div>
           </>
        ) : (
           <div className="flex-1 flex flex-col items-center justify-center text-gray-300 bg-gray-50/50">
              <div className="bg-white p-6 rounded-full shadow-sm mb-4">
                 <Icons.Edit2 size={40} className="text-gray-200" />
              </div>
              <h3 className="text-lg font-bold text-gray-400 mb-1">Select an Entry</h3>
              <p className="font-light text-sm">Choose a journal entry from the sidebar to view or edit.</p>
           </div>
        )}
      </div>
    </div>
  );
};

// --- Projects Editor ---
export const AdminProjects = () => {
  const { projects, deleteProject, addProject, updateProject } = useContent();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Project>>({});
  const [loadingAI, setLoadingAI] = useState(false);

  const startEdit = (p: Project) => {
    setEditingId(p.id);
    setForm(p);
  };

  const startNew = () => {
    setEditingId('new');
    setForm({
      id: Date.now().toString(),
      title: '', category: 'Residential', location: '', description: '', 
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800', 
      date: new Date().toISOString().split('T')[0]
    });
  };

  const save = () => {
    if (editingId === 'new') {
      addProject(form as Project);
    } else {
      updateProject(form as Project);
    }
    setEditingId(null);
  };

  const handleAI = async () => {
    if (!form.title || !form.location) return alert("Please enter a title and location first.");
    setLoadingAI(true);
    const desc = await generateMarketingCopy(`${form.title} in ${form.location}`, 'project');
    setForm(prev => ({ ...prev, description: desc }));
    setLoadingAI(false);
  };

  if (editingId) {
    return (
      <div className="bg-white p-10 rounded-xl shadow-lg border border-gray-100 max-w-3xl mx-auto font-sans">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
            <h2 className="text-2xl font-bold text-gray-900">{editingId === 'new' ? 'New Project' : 'Edit Project'}</h2>
            <button onClick={() => setEditingId(null)} className="text-gray-400 hover:text-gray-600"><Icons.X size={24} /></button>
        </div>
        
        <div className="space-y-6">
          <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Project Title</label>
              <input className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all" placeholder="e.g. Lekki Penthouse" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
                 <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                 <input className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all" placeholder="Residential" value={form.category} onChange={e => setForm({...form, category: e.target.value})} />
            </div>
            <div>
                 <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
                 <input className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all" placeholder="Lagos, Nigeria" value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
            </div>
          </div>
          <div className="relative">
             <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
             <textarea className="w-full border border-gray-300 p-4 rounded-lg h-40 focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all resize-none" placeholder="Describe the project..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
             <button onClick={handleAI} disabled={loadingAI} className="absolute bottom-4 right-4 text-xs bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1.5 rounded-md flex items-center gap-1.5 hover:bg-purple-100 transition-colors font-bold shadow-sm">
                <Icons.Sparkles size={14} /> {loadingAI ? 'Thinking...' : 'AI Generate'}
             </button>
          </div>
          <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
              <input className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all text-sm font-mono text-gray-500" placeholder="https://..." value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} />
          </div>
          <div className="flex justify-end gap-3 pt-6 border-t mt-6">
            <button onClick={() => setEditingId(null)} className="px-6 py-2.5 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">Cancel</button>
            <button onClick={save} className="px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-bold shadow-lg transition-all">Save Project</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="font-sans">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Projects Portfolio</h1>
            <p className="text-gray-500 text-sm mt-1">Manage your showcased work.</p>
        </div>
        <button onClick={startNew} className="bg-gray-900 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-gray-800 shadow-lg transition-all font-bold text-sm">
          <Icons.Plus size={18} /> Add Project
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map(p => (
          <div key={p.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-all duration-300">
            <div className="h-56 overflow-hidden relative">
              <img src={p.imageUrl} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={p.title} />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-3 backdrop-blur-sm">
                 <button onClick={() => startEdit(p)} className="p-3 bg-white rounded-full text-gray-900 hover:text-blue-600 transition-colors shadow-lg transform hover:scale-110"><Icons.Edit2 size={18} /></button>
                 <button onClick={() => deleteProject(p.id)} className="p-3 bg-white rounded-full text-gray-900 hover:text-red-600 transition-colors shadow-lg transform hover:scale-110"><Icons.Trash2 size={18} /></button>
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                 <h3 className="font-bold text-lg text-gray-900 truncate pr-2">{p.title}</h3>
                 <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-500 px-2 py-1 rounded">{p.category}</span>
              </div>
              <p className="text-sm text-gray-500 flex items-center gap-1.5"><Icons.MapPin size={14} /> {p.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Blog Editor (WordPress Style) ---
export const AdminBlog = () => {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useContent();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<BlogPost>>({});
  const [loadingAI, setLoadingAI] = useState(false);
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const startEdit = (p: BlogPost) => {
    setEditingId(p.id);
    setForm(p);
    setViewMode('edit');
  };

  const startNew = () => {
    setEditingId('new');
    setForm({
      id: Date.now().toString(),
      title: '', 
      excerpt: '', 
      content: '', 
      author: 'HanifGold Team',
      imageUrl: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=800', 
      date: new Date().toISOString().split('T')[0],
      status: 'draft',
      category: 'General'
    });
    setViewMode('edit');
  };

  const save = () => {
    if (editingId === 'new') {
      addBlogPost(form as BlogPost);
    } else {
      updateBlogPost(form as BlogPost);
    }
    setEditingId(null);
  };

  const handleAI = async () => {
    if (!form.title) return alert("Please enter a title first.");
    setLoadingAI(true);
    const content = await generateMarketingCopy(form.title, 'blog', form.category);
    setForm(prev => ({ 
      ...prev, 
      content: content,
      excerpt: content.substring(0, 100) + '...' 
    }));
    setLoadingAI(false);
  };

  const insertText = (before: string, after: string = "") => {
    if (contentRef.current && form.content !== undefined) {
      const textarea = contentRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = form.content;
      const newText = text.substring(0, start) + before + text.substring(start, end) + after + text.substring(end);
      setForm({...form, content: newText});
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + before.length, end + before.length);
      }, 0);
    }
  };

  // List View
  if (!editingId) {
    return (
      <div className="font-sans">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">News & Articles</h1>
            <p className="text-gray-500 text-sm mt-1">Manage blog content.</p>
          </div>
          <button onClick={startNew} className="bg-gray-900 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-gray-800 shadow-lg transition-all font-bold text-sm">
            <Icons.Plus size={18} /> Add New Post
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
           <div className="grid grid-cols-12 gap-4 p-5 border-b border-gray-100 font-bold text-gray-400 text-xs uppercase tracking-wider bg-gray-50/50">
              <div className="col-span-6">Title</div>
              <div className="col-span-2">Author</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-1 text-right">Actions</div>
           </div>
           {blogPosts.map(p => (
             <div key={p.id} className="grid grid-cols-12 gap-4 p-5 border-b border-gray-50 items-center hover:bg-gray-50 transition-colors last:border-0">
               <div className="col-span-6">
                 <p className="font-bold text-gray-900">{p.title}</p>
                 <p className="md:hidden text-xs text-gray-400 mt-1">{p.excerpt.substring(0,50)}...</p>
               </div>
               <div className="col-span-2 text-sm text-gray-500 font-medium">{p.author}</div>
               <div className="col-span-2">
                 <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full border border-blue-100">{p.category || 'Uncategorized'}</span>
               </div>
               <div className="col-span-1">
                 <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                   p.status === 'published' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-gray-100 text-gray-600 border-gray-200'
                 }`}>
                   {p.status === 'published' ? 'Published' : 'Draft'}
                 </span>
               </div>
               <div className="col-span-1 flex justify-end gap-3">
                  <button onClick={() => startEdit(p)} className="text-gray-400 hover:text-blue-600 transition-colors"><Icons.Edit2 size={18}/></button>
                  <button onClick={() => deleteBlogPost(p.id)} className="text-gray-400 hover:text-red-600 transition-colors"><Icons.Trash2 size={18}/></button>
               </div>
             </div>
           ))}
           {blogPosts.length === 0 && <div className="p-12 text-center text-gray-400 text-sm">No posts found. Create one to get started.</div>}
        </div>
      </div>
    );
  }

  // Editor View
  return (
    <div className="h-[calc(100vh-120px)] flex flex-col font-sans">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">{editingId === 'new' ? 'New Article' : 'Edit Article'}</h2>
        <div className="flex gap-3">
           <button onClick={() => setEditingId(null)} className="px-5 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 font-medium text-sm transition-colors">Discard</button>
           <button onClick={save} className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-bold text-sm flex items-center gap-2 shadow-lg transition-all">
             <Icons.CheckCircle size={16} /> Save Changes
           </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 h-full overflow-hidden">
        {/* Main Editor Column */}
        <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2">
          <input 
            className="w-full text-4xl font-serif font-bold p-2 border-none outline-none placeholder-gray-300 focus:ring-0 bg-transparent text-gray-900" 
            placeholder="Article Title..." 
            value={form.title} 
            onChange={e => setForm({...form, title: e.target.value})} 
          />
          
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex-1 flex flex-col overflow-hidden">
            {/* Toolbar */}
            {viewMode === 'edit' && (
              <div className="border-b border-gray-100 p-2 flex gap-1 bg-gray-50/50">
                <button onClick={() => insertText('**', '**')} className="p-2 hover:bg-white hover:shadow-sm rounded text-gray-600 transition-all" title="Bold"><span className="font-bold">B</span></button>
                <button onClick={() => insertText('*', '*')} className="p-2 hover:bg-white hover:shadow-sm rounded text-gray-600 transition-all" title="Italic"><span className="italic">I</span></button>
                <div className="w-px bg-gray-200 mx-2 h-6 self-center"></div>
                <button onClick={() => insertText('## ')} className="p-2 hover:bg-white hover:shadow-sm rounded text-gray-600 font-bold text-sm transition-all" title="Heading 2">H2</button>
                <button onClick={() => insertText('### ')} className="p-2 hover:bg-white hover:shadow-sm rounded text-gray-600 font-bold text-xs transition-all" title="Heading 3">H3</button>
                <div className="w-px bg-gray-200 mx-2 h-6 self-center"></div>
                <button onClick={() => insertText('- ')} className="p-2 hover:bg-white hover:shadow-sm rounded text-gray-600 transition-all" title="Bullet List"><Icons.LayoutDashboard size={14} className="rotate-90"/></button>
                <div className="flex-grow"></div>
                <button 
                  onClick={handleAI} 
                  disabled={loadingAI}
                  className="text-xs bg-purple-50 text-purple-700 border border-purple-100 px-3 py-1.5 rounded-md flex items-center gap-1.5 hover:bg-purple-100 transition-colors font-bold"
                >
                  <Icons.Sparkles size={14} /> {loadingAI ? 'Generating...' : 'AI Writer'}
                </button>
              </div>
            )}
            
            {/* Tabs */}
            <div className="flex border-b border-gray-100 bg-white">
               <button 
                 onClick={() => setViewMode('edit')} 
                 className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${viewMode === 'edit' ? 'text-blue-600 border-blue-600' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
               >
                 Write
               </button>
               <button 
                 onClick={() => setViewMode('preview')} 
                 className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${viewMode === 'preview' ? 'text-blue-600 border-blue-600' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
               >
                 Preview
               </button>
            </div>

            {/* Content Area */}
            {viewMode === 'edit' ? (
              <textarea 
                ref={contentRef}
                className="w-full flex-1 p-8 outline-none resize-none font-mono text-base text-gray-700 leading-relaxed" 
                placeholder="Start writing or type / to choose a block..." 
                value={form.content} 
                onChange={e => setForm({...form, content: e.target.value})} 
              />
            ) : (
              <div className="p-10 prose prose-lg max-w-none overflow-y-auto bg-gray-50/30">
                <h1 className="font-serif text-gray-900">{form.title}</h1>
                <div className="whitespace-pre-wrap font-serif text-gray-700 leading-loose">{form.content}</div>
              </div>
            )}
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Short Excerpt / SEO Meta</label>
            <textarea 
              className="w-full border border-gray-200 p-4 rounded-lg text-sm h-24 focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all resize-none text-gray-600" 
              value={form.excerpt} 
              onChange={e => setForm({...form, excerpt: e.target.value})}
              placeholder="Write a summary for the card view..."
            />
          </div>
        </div>

        {/* Sidebar Settings Column */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
          {/* Status Box */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">Publishing</h3>
            <div className="space-y-4">
               <div className="flex justify-between items-center">
                 <span className="text-sm text-gray-600 font-medium">Status</span>
                 <select 
                   className="border border-gray-300 rounded-md p-1.5 text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
                   value={form.status}
                   onChange={e => setForm({...form, status: e.target.value as any})}
                 >
                   <option value="draft">Draft</option>
                   <option value="published">Published</option>
                 </select>
               </div>
               <div className="flex flex-col gap-1">
                 <span className="text-sm text-gray-600 font-medium">Date</span>
                 <input 
                   type="date" 
                   className="border border-gray-300 rounded-md p-1.5 text-sm w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
                   value={form.date}
                   onChange={e => setForm({...form, date: e.target.value})}
                 />
               </div>
               <div className="flex flex-col gap-1">
                 <span className="text-sm text-gray-600 font-medium">Author</span>
                 <input 
                   className="border border-gray-300 rounded-md p-1.5 text-sm w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
                   value={form.author}
                   onChange={e => setForm({...form, author: e.target.value})}
                 />
               </div>
            </div>
          </div>

          {/* Categories Box */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">Category</h3>
            <div className="space-y-3">
              {['News', 'Trends', 'Maintenance', 'Projects', 'General'].map(cat => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                   <div className="relative flex items-center">
                     <input 
                       type="radio" 
                       name="category"
                       checked={form.category === cat}
                       onChange={() => setForm({...form, category: cat})}
                       className="peer h-4 w-4 cursor-pointer appearance-none rounded-full border border-gray-300 checked:border-gold-500 checked:bg-gold-500 transition-all"
                     />
                   </div>
                   <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{cat}</span>
                </label>
              ))}
              <input 
                 className="w-full border-b border-gray-200 text-sm py-2 mt-2 focus:border-gold-500 outline-none bg-transparent placeholder-gray-400" 
                 placeholder="+ Custom Category"
                 value={!['News', 'Trends', 'Maintenance', 'Projects', 'General'].includes(form.category || '') ? form.category : ''}
                 onChange={e => setForm({...form, category: e.target.value})}
              />
            </div>
          </div>

          {/* Featured Image Box */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">Featured Image</h3>
            {form.imageUrl && (
              <div className="rounded-lg overflow-hidden border border-gray-200 mb-3 shadow-sm">
                 <img src={form.imageUrl} alt="Preview" className="w-full h-32 object-cover" />
              </div>
            )}
            <input 
              className="w-full border border-gray-300 p-2 rounded-md text-xs font-mono text-gray-500 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="https://..." 
              value={form.imageUrl} 
              onChange={e => setForm({...form, imageUrl: e.target.value})}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Services Editor ---
export const AdminServices = () => {
    const { services, updateService } = useContent();
    const [editing, setEditing] = useState<string | null>(null);
    const [form, setForm] = useState<Service | null>(null);
    const [loadingAI, setLoadingAI] = useState(false);

    const handleEdit = (s: Service) => {
        setEditing(s.id);
        setForm({ ...s });
    }

    const handleAI = async () => {
        if(!form) return;
        setLoadingAI(true);
        const copy = await generateMarketingCopy(form.title, 'service');
        setForm({ ...form, fullDescription: copy });
        setLoadingAI(false);
    }

    const save = () => {
        if(form) updateService(form);
        setEditing(null);
    }

    if(editing && form) {
        return (
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 max-w-3xl mx-auto font-sans">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Edit Service</h3>
                    <button onClick={() => setEditing(null)}><Icons.X className="text-gray-400 hover:text-gray-600" /></button>
                </div>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Service Title</label>
                        <input className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-gold-500 outline-none" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Short Description</label>
                        <input className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-gold-500 outline-none" value={form.shortDescription} onChange={e => setForm({...form, shortDescription: e.target.value})} />
                    </div>
                    <div className="relative">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Full Description</label>
                        <textarea className="w-full border border-gray-300 p-4 rounded-lg h-32 focus:ring-2 focus:ring-gold-500 outline-none resize-none leading-relaxed" value={form.fullDescription} onChange={e => setForm({...form, fullDescription: e.target.value})} />
                        <button onClick={handleAI} disabled={loadingAI} className="absolute bottom-4 right-4 text-xs bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1 rounded-md flex items-center gap-1 hover:bg-purple-100 font-bold">
                             <Icons.Sparkles size={12} /> {loadingAI ? 'Generating...' : 'Enhance with AI'}
                        </button>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Features (comma separated)</label>
                        <input className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-gold-500 outline-none" value={form.features.join(', ')} onChange={e => setForm({...form, features: e.target.value.split(',').map(s => s.trim())})} />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button onClick={() => setEditing(null)} className="px-5 py-2 border border-gray-300 rounded-lg text-gray-600 font-medium hover:bg-gray-50">Cancel</button>
                        <button onClick={save} className="px-5 py-2 bg-gray-900 text-white rounded-lg font-bold hover:bg-gray-800 shadow-lg">Save Changes</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="font-sans">
            <h1 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">Services Management</h1>
            <div className="space-y-4">
                {services.map(s => (
                    <div key={s.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center hover:shadow-md transition-shadow group">
                        <div className="flex items-center gap-6">
                            <img src={s.imageUrl} className="w-20 h-20 rounded-lg object-cover shadow-sm" alt="" />
                            <div>
                                <h3 className="font-bold text-lg text-gray-900 group-hover:text-gold-600 transition-colors">{s.title}</h3>
                                <p className="text-sm text-gray-500 truncate max-w-lg mt-1">{s.shortDescription}</p>
                            </div>
                        </div>
                        <button onClick={() => handleEdit(s)} className="text-gray-400 hover:text-blue-600 p-3 rounded-full hover:bg-blue-50 transition-all">
                            <Icons.Edit2 size={20} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

// --- Testimonials Editor ---
export const AdminTestimonials = () => {
  const { testimonials, addTestimonial, deleteTestimonial } = useContent();
  const [form, setForm] = useState<Partial<Testimonial>>({
    clientName: '', role: '', content: '', rating: 5
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(form.clientName && form.content) {
      addTestimonial({
        ...form,
        id: Date.now().toString(),
        rating: Number(form.rating)
      } as Testimonial);
      setForm({ clientName: '', role: '', content: '', rating: 5 });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 font-sans">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">Manage Testimonials</h1>
        <div className="space-y-6">
          {testimonials.map(t => (
             <div key={t.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 relative hover:shadow-md transition-shadow">
                <button onClick={() => deleteTestimonial(t.id)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors"><Icons.X size={16} /></button>
                <div className="flex text-gold-500 mb-3 gap-0.5">
                   {[...Array(t.rating)].map((_, i) => <Icons.Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="italic text-gray-600 mb-4 text-sm leading-relaxed">"{t.content}"</p>
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs">{t.clientName.charAt(0)}</div>
                   <div>
                       <p className="font-bold text-sm text-gray-900">{t.clientName}</p>
                       <p className="text-xs text-gray-500 uppercase tracking-wider">{t.role}</p>
                   </div>
                </div>
             </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 h-fit sticky top-8">
         <h3 className="text-lg font-bold text-gray-900 mb-6">Add New Testimonial</h3>
         <form onSubmit={handleSubmit} className="space-y-5">
            <div>
               <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Client Name</label>
               <input required className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-gold-500 outline-none" value={form.clientName} onChange={e => setForm({...form, clientName: e.target.value})} />
            </div>
            <div>
               <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Role / Location</label>
               <input className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-gold-500 outline-none" value={form.role} onChange={e => setForm({...form, role: e.target.value})} />
            </div>
            <div>
               <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Feedback</label>
               <textarea required className="w-full border border-gray-300 p-3 rounded-lg h-32 focus:ring-2 focus:ring-gold-500 outline-none resize-none" value={form.content} onChange={e => setForm({...form, content: e.target.value})} />
            </div>
            <div>
               <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Rating</label>
               <select className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-gold-500 outline-none bg-white" value={form.rating} onChange={e => setForm({...form, rating: Number(e.target.value)})}>
                 <option value="5">5 Stars - Excellent</option>
                 <option value="4">4 Stars - Very Good</option>
                 <option value="3">3 Stars - Good</option>
               </select>
            </div>
            <button type="submit" className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 font-bold shadow-lg transition-all mt-2">Add Testimonial</button>
         </form>
      </div>
    </div>
  );
};

// --- Settings Editor ---
export const AdminSettings = () => {
    const { config, updateConfig } = useContent();
    const [form, setForm] = useState(config);
    const [msg, setMsg] = useState('');

    const save = () => {
        updateConfig(form);
        setMsg('Settings saved successfully');
        setTimeout(() => setMsg(''), 3000);
    }

    return (
        <div className="max-w-4xl font-sans">
            <div className="flex justify-between items-center mb-8">
                 <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Site Settings</h1>
                 {msg && <span className="text-green-600 bg-green-50 px-4 py-2 rounded-full text-xs font-bold border border-green-100 flex items-center gap-2"><Icons.CheckCircle size={14}/> {msg}</span>}
            </div>
           
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 space-y-8">
                {/* Logo Section */}
                <div className="border-b border-gray-100 pb-8">
                    <label className="block text-sm font-bold text-gray-700 mb-4">Branding</label>
                    <div className="flex items-start gap-6">
                        {form.logoUrl ? (
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <img src={form.logoUrl} alt="Logo" className="h-16 w-auto object-contain" />
                            </div>
                        ) : (
                            <div className="h-24 w-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs text-center p-2 font-medium border border-dashed border-gray-300">No Logo Set</div>
                        )}
                        <div className="flex-1 space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase">Logo URL</label>
                            <input 
                                className="w-full border border-gray-300 p-3 rounded-lg text-sm focus:ring-2 focus:ring-gold-500 outline-none font-mono" 
                                value={form.logoUrl || ''} 
                                onChange={e => setForm({...form, logoUrl: e.target.value})} 
                                placeholder="Paste Logo Image URL here (e.g. https://...)" 
                            />
                            <p className="text-xs text-gray-400">Leave blank to use the default HanifGold text logo.</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Company Name</label>
                        <input className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-gold-500 outline-none" value={form.companyName} onChange={e => setForm({...form, companyName: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                        <input className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-gold-500 outline-none" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                        <input className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-gold-500 outline-none" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">WhatsApp (No symbols)</label>
                        <input className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-gold-500 outline-none" value={form.whatsappNumber} onChange={e => setForm({...form, whatsappNumber: e.target.value})} />
                    </div>
                </div>
                <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2">Physical Address</label>
                     <input className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-gold-500 outline-none" value={form.address} onChange={e => setForm({...form, address: e.target.value})} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">About Text</label>
                        <textarea className="w-full border border-gray-300 p-4 rounded-lg h-32 focus:ring-2 focus:ring-gold-500 outline-none resize-none text-sm leading-relaxed" value={form.aboutText} onChange={e => setForm({...form, aboutText: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Mission Statement</label>
                        <textarea className="w-full border border-gray-300 p-4 rounded-lg h-32 focus:ring-2 focus:ring-gold-500 outline-none resize-none text-sm leading-relaxed" value={form.missionStatement} onChange={e => setForm({...form, missionStatement: e.target.value})} />
                    </div>
                </div>

                <div className="pt-6 border-t border-gray-100 flex justify-end">
                    <button onClick={save} className="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 font-bold shadow-lg transition-all text-sm">Save All Settings</button>
                </div>
            </div>
        </div>
    )
}