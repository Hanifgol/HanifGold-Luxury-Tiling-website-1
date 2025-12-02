
import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Icons } from '../components/Icons';
import { Link } from 'react-router-dom';
import { Project } from '../types';

// --- Helper Components ---
const ProjectCard = ({ project }: { project: Project }) => {
    const [showBefore, setShowBefore] = useState(false);
    // If afterImageUrl is present, use it as the "After" state, otherwise use imageUrl.
    const afterImage = project.afterImageUrl || project.imageUrl;
    // Use beforeImageUrl if present.
    const hasBefore = !!project.beforeImageUrl;

    return (
        <div 
            className="group relative bg-neutral-900 overflow-hidden cursor-pointer h-[450px] rounded-sm"
            onMouseEnter={() => hasBefore && setShowBefore(true)}
            onMouseLeave={() => hasBefore && setShowBefore(false)}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 z-10 pointer-events-none"></div>
            
            {/* Image Container */}
            <div className="relative w-full h-full">
                <img 
                    src={showBefore && project.beforeImageUrl ? project.beforeImageUrl : afterImage} 
                    alt={project.title} 
                    className={`w-full h-full object-cover transition-transform duration-1000 ${!showBefore ? 'group-hover:scale-110' : ''}`}
                />
                
                {hasBefore && (
                    <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10 shadow-lg">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-white flex items-center gap-1.5">
                            {showBefore ? (
                                <><Icons.RotateCcw size={10} className="text-gold-500"/> Before</>
                            ) : (
                                <><Icons.CheckCircle size={10} className="text-green-500"/> After</>
                            )}
                        </span>
                    </div>
                )}
            </div>

            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 pointer-events-none">
                <span className="text-gold-500 text-[10px] uppercase tracking-[0.2em] font-bold mb-2 flex items-center gap-2">
                    <span className="w-8 h-px bg-gold-500"></span> {project.category}
                </span>
                <h3 className="text-2xl font-serif text-white mb-3 group-hover:text-gold-400 transition-colors">{project.title}</h3>
                <p className="text-gray-300 text-sm leading-6 line-clamp-3 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 font-light mb-4">
                    {project.description}
                </p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    <span className="text-xs text-white uppercase tracking-widest border-b border-white/30 pb-1">View Details</span>
                </div>
            </div>
            <div className="absolute top-6 left-6 z-20 bg-black/50 backdrop-blur-md px-3 py-1 text-xs text-white uppercase tracking-wider rounded-sm border border-white/5">
                {project.location}
            </div>
        </div>
    );
};

// --- Home Page ---
export const Home = () => {
  const { services, projects, testimonials } = useContent();

  return (
    <>
      {/* Hero */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2600&auto=format&fit=crop" 
            alt="Luxury Marble Floor" 
            className="w-full h-full object-cover opacity-60 scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/30 via-transparent to-luxury-black/80"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto space-y-8">
          <h2 className="text-gold-500 uppercase tracking-[0.4em] text-xs md:text-sm font-bold animate-fade-in-up">Welcome to HanifGold</h2>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight tracking-tight font-medium drop-shadow-xl">
            Redefining Luxury <br/> <span className="italic font-light text-gray-200">One Tile at a Time</span>
          </h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
            Premium tiling services in Lagos, Ibadan, and Ogun State. We bring Italian craftsmanship to your Nigerian home.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Link to="/contact" className="px-10 py-4 bg-gold-600 hover:bg-gold-500 text-white text-sm font-bold tracking-[0.15em] uppercase transition-all shadow-xl hover:shadow-gold-500/20 rounded-sm">
              Request Quote
            </Link>
            <Link to="/portfolio" className="px-10 py-4 bg-transparent border border-white/30 hover:border-gold-500 hover:text-gold-500 text-white text-sm font-bold tracking-[0.15em] uppercase transition-all backdrop-blur-sm rounded-sm">
              View Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-24 bg-luxury-black relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-900/50 to-transparent"></div>
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 space-y-3">
            <span className="text-gold-500 uppercase tracking-[0.2em] text-xs font-bold">Our Expertise</span>
            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight">Premium Services</h2>
            <div className="w-20 h-1 bg-gold-600 mx-auto mt-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {services.slice(0, 3).map((service) => (
              <div key={service.id} className="group bg-neutral-900/50 border border-white/5 hover:border-gold-600/30 transition-all duration-500 overflow-hidden rounded-sm hover:shadow-2xl hover:shadow-black/50">
                <div className="h-72 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                </div>
                <div className="p-10 space-y-4">
                  <h3 className="text-2xl font-serif text-white group-hover:text-gold-500 transition-colors">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-7 font-light">{service.shortDescription}</p>
                  <div className="pt-4">
                    <Link to="/services" className="inline-flex items-center text-gold-500 text-xs uppercase tracking-widest font-bold group-hover:gap-3 transition-all">
                      Explore Service <Icons.ArrowRight size={14} className="ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section className="py-24 bg-luxury-charcoal relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-5/12 space-y-8">
              <div>
                 <span className="text-gold-500 uppercase tracking-[0.2em] text-xs font-bold block mb-3">Featured Project</span>
                 <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">{projects[0]?.title || "Luxury Villa"}</h2>
              </div>
              <p className="text-gray-300 leading-8 font-light text-lg">
                {projects[0]?.description || "Experience the pinnacle of luxury."}
              </p>
              <ul className="space-y-4 text-gray-400 font-light">
                <li className="flex items-center gap-4"><Icons.CheckCircle size={20} className="text-gold-500"/> <span className="text-sm tracking-wide">Premium Material Sourcing</span></li>
                <li className="flex items-center gap-4"><Icons.CheckCircle size={20} className="text-gold-500"/> <span className="text-sm tracking-wide">Precision Installation</span></li>
                <li className="flex items-center gap-4"><Icons.CheckCircle size={20} className="text-gold-500"/> <span className="text-sm tracking-wide">5-Year Warranty</span></li>
              </ul>
              <div className="pt-4">
                <Link to="/portfolio" className="px-8 py-4 bg-transparent border border-gold-600/50 text-gold-500 hover:bg-gold-600 hover:text-white transition-all uppercase text-xs font-bold tracking-[0.15em] rounded-sm">
                  View Full Gallery
                </Link>
              </div>
            </div>
            <div className="w-full md:w-7/12 relative group">
              <div className="absolute -top-6 -left-6 w-32 h-32 border-t border-l border-gold-500/30 hidden md:block transition-all group-hover:border-gold-500"></div>
              <div className="relative overflow-hidden rounded-sm shadow-2xl">
                <img src={projects[0]?.imageUrl || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800"} alt="Project" className="w-full object-cover transform transition-transform duration-700 hover:scale-105" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b border-r border-gold-500/30 hidden md:block transition-all group-hover:border-gold-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-luxury-black bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-16">
             <Icons.Star size={32} className="text-gold-500 mx-auto mb-4 opacity-50" />
             <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight">Client Testimonials</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.slice(0, 2).map((t) => (
              <div key={t.id} className="bg-neutral-900/80 p-10 border border-white/5 relative rounded-sm hover:border-gold-500/20 transition-colors">
                <div className="absolute top-8 right-8 text-gold-700 opacity-20"><Icons.MessageCircle size={48} /></div>
                <div className="flex text-gold-500 mb-6 gap-1">
                  {[...Array(t.rating)].map((_, i) => <Icons.Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-gray-300 italic mb-8 text-lg font-light leading-relaxed font-serif">"{t.content}"</p>
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-gold-600 rounded-full flex items-center justify-center text-white font-serif font-bold text-lg">
                      {t.clientName.charAt(0)}
                   </div>
                   <div className="text-left">
                      <h4 className="text-white font-bold text-sm tracking-wide">{t.clientName}</h4>
                      <p className="text-gold-600 text-xs uppercase tracking-wider mt-0.5">{t.role}</p>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

// --- Services Page ---
export const Services = () => {
  const { services } = useContent();
  return (
    <div className="pt-12 pb-24 container mx-auto px-4">
      <div className="text-center mb-20 space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tight">Our Services</h1>
        <p className="text-gray-400 text-lg font-light leading-relaxed">From concept to completion, we provide end-to-end luxury tiling solutions tailored to your unique taste. Experience the difference of true craftsmanship.</p>
        <div className="w-16 h-1 bg-gold-600 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 gap-20">
        {services.map((service, idx) => (
          <div key={service.id} className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-10 md:gap-20 items-center`}>
            <div className="w-full md:w-1/2 h-96 overflow-hidden shadow-2xl rounded-sm relative group">
               <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
               <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <span className="text-gold-500 text-xs font-bold uppercase tracking-[0.2em]">0{idx + 1}</span>
              <h2 className="text-4xl font-serif text-white">{service.title}</h2>
              <p className="text-gray-300 leading-8 font-light text-lg">{service.fullDescription}</p>
              
              <div className="pt-4">
                <h4 className="text-white text-xs uppercase tracking-widest font-bold mb-4 border-b border-white/10 pb-2 inline-block">Key Features</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-400 text-sm font-medium">
                      <span className="w-1.5 h-1.5 bg-gold-500 rounded-full"></span> {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-6">
                <Link to="/contact" className="text-white border-b border-gold-500 pb-1 hover:text-gold-500 transition-colors text-sm uppercase tracking-wider font-bold">Book this Service</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Portfolio Page ---
export const Portfolio = () => {
  const { projects } = useContent();
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="pt-12 pb-24 container mx-auto px-4">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tight">Our Masterpieces</h1>
        <p className="text-gray-400 font-light max-w-2xl mx-auto">Browse our curated collection of executed projects across Nigeria.</p>
        <div className="flex flex-wrap justify-center gap-4 mt-8 pt-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-2 text-xs uppercase tracking-widest transition-all border rounded-sm font-bold ${
                filter === cat 
                ? 'bg-gold-600 border-gold-600 text-white' 
                : 'border-white/10 text-gray-400 hover:border-gold-500 hover:text-gold-500 bg-neutral-900/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

// --- News / Blog Page ---
export const News = () => {
  const { blogPosts } = useContent();
  const publishedPosts = blogPosts.filter(p => p.status === 'published' || !p.status);

  return (
    <div className="pt-12 pb-24 container mx-auto px-4">
      <div className="text-center mb-20 space-y-4">
        <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tight">Luxury Living Journal</h1>
        <p className="text-gray-400 max-w-2xl mx-auto font-light text-lg">Insights, trends, and expert advice from the world of premium tiling.</p>
        <div className="w-16 h-1 bg-gold-600 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {publishedPosts.map((post) => (
          <div key={post.id} className="bg-neutral-900 border border-white/5 flex flex-col group hover:border-gold-600/30 transition-all rounded-sm overflow-hidden">
            <div className="h-64 overflow-hidden relative">
              <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute top-4 left-4 bg-white text-luxury-black text-xs font-bold px-4 py-1.5 uppercase tracking-wider shadow-lg">
                {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col space-y-4">
              <div className="flex items-center gap-2">
                 <span className="w-2 h-2 bg-gold-500 rounded-full"></span>
                 <span className="text-xs text-gold-500 uppercase tracking-widest font-bold">{post.category || 'General'}</span>
              </div>
              <h3 className="text-2xl font-serif text-white leading-tight group-hover:text-gold-500 transition-colors cursor-pointer">{post.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed flex-1 line-clamp-3 font-light border-b border-white/5 pb-6">{post.excerpt}</p>
              <div className="flex justify-between items-center text-xs text-gray-500 uppercase tracking-widest pt-2">
                <span className="flex items-center gap-2"><Icons.Users size={12} /> {post.author}</span>
                <button className="text-white hover:text-gold-500 font-bold flex items-center gap-1 transition-colors">Read Article <Icons.ArrowRight size={10} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {publishedPosts.length === 0 && (
          <div className="text-center py-20 text-gray-500 font-light border border-dashed border-white/10 rounded-sm">
              No articles published yet. Check back soon.
          </div>
      )}
    </div>
  );
};

// --- Contact/Booking Page ---
export const Contact = () => {
  const { config, services } = useContent();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', date: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submit
    setTimeout(() => {
        setSubmitted(true);
        setIsSubmitting(false);
        setFormData({ name: '', email: '', phone: '', service: '', date: '' });
    }, 1500);
  };

  return (
    <div className="pt-12 pb-24 container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="space-y-10">
          <div>
             <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 tracking-tight">Get in Touch</h1>
             <p className="text-gray-400 text-lg font-light leading-relaxed">Ready to transform your space? Contact HanifGold today for a consultation. We prioritize precision and client satisfaction above all else.</p>
          </div>
          
          <div className="space-y-8">
             <div className="flex items-start gap-6 group">
               <div className="p-4 bg-neutral-900 border border-white/10 rounded-sm text-gold-500 group-hover:border-gold-500 transition-colors"><Icons.MapPin size={24} /></div>
               <div>
                 <h4 className="text-white font-bold mb-2 font-serif text-lg">Our Office</h4>
                 <p className="text-gray-400 text-sm leading-relaxed">{config.address}</p>
               </div>
             </div>
             <div className="flex items-start gap-6 group">
               <div className="p-4 bg-neutral-900 border border-white/10 rounded-sm text-gold-500 group-hover:border-gold-500 transition-colors"><Icons.Phone size={24} /></div>
               <div>
                 <h4 className="text-white font-bold mb-2 font-serif text-lg">Phone</h4>
                 <p className="text-gray-400 text-sm">{config.phone}</p>
                 <p className="text-gray-500 text-xs mt-1">Mon-Sat, 8am - 6pm</p>
               </div>
             </div>
             <div className="flex items-start gap-6 group">
               <div className="p-4 bg-neutral-900 border border-white/10 rounded-sm text-gold-500 group-hover:border-gold-500 transition-colors"><Icons.Mail size={24} /></div>
               <div>
                 <h4 className="text-white font-bold mb-2 font-serif text-lg">Email</h4>
                 <p className="text-gray-400 text-sm">{config.email}</p>
               </div>
             </div>
          </div>
        </div>

        <div className="bg-neutral-900 border border-white/5 p-10 md:p-12 shadow-2xl relative overflow-hidden rounded-sm">
           <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
           
           {!submitted ? (
             <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
               <h3 className="text-2xl font-serif text-white mb-8 border-b border-white/10 pb-4">Request a Consultation</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                   <label className="block text-xs uppercase tracking-wider text-gray-500 font-bold">Name</label>
                   <input required type="text" className="w-full bg-black/30 border border-white/10 text-white p-4 focus:outline-none focus:border-gold-500 transition-colors rounded-sm text-sm" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                 </div>
                 <div className="space-y-2">
                   <label className="block text-xs uppercase tracking-wider text-gray-500 font-bold">Phone</label>
                   <input required type="tel" className="w-full bg-black/30 border border-white/10 text-white p-4 focus:outline-none focus:border-gold-500 transition-colors rounded-sm text-sm" placeholder="+234..." value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                 </div>
               </div>
               <div className="space-y-2">
                 <label className="block text-xs uppercase tracking-wider text-gray-500 font-bold">Email</label>
                 <input required type="email" className="w-full bg-black/30 border border-white/10 text-white p-4 focus:outline-none focus:border-gold-500 transition-colors rounded-sm text-sm" placeholder="email@address.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                   <label className="block text-xs uppercase tracking-wider text-gray-500 font-bold">Service Needed</label>
                   <select className="w-full bg-black/30 border border-white/10 text-white p-4 focus:outline-none focus:border-gold-500 transition-colors rounded-sm text-sm appearance-none" value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})}>
                     <option value="">Select Service</option>
                     {services.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                   </select>
                 </div>
                 <div className="space-y-2">
                   <label className="block text-xs uppercase tracking-wider text-gray-500 font-bold">Preferred Date</label>
                   <input type="date" className="w-full bg-black/30 border border-white/10 text-white p-4 focus:outline-none focus:border-gold-500 transition-colors rounded-sm text-sm" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                 </div>
               </div>
               
               <div className="space-y-2">
                 <label className="block text-xs uppercase tracking-wider text-gray-500 font-bold">Floor Plans (Optional)</label>
                 <div className="border border-dashed border-white/20 bg-black/20 p-8 text-center text-gray-500 hover:border-gold-500 hover:text-gold-500 transition-all cursor-pointer rounded-sm group">
                   <Icons.FolderOpen className="mx-auto mb-2 opacity-50 group-hover:opacity-100" />
                   <p className="text-xs">Click to upload files</p>
                 </div>
               </div>

               <button type="submit" disabled={isSubmitting} className="w-full bg-gold-600 hover:bg-gold-500 text-white font-bold py-5 uppercase tracking-[0.2em] text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg mt-4 rounded-sm">
                 {isSubmitting ? 'Sending Request...' : 'Submit Request'}
               </button>
             </form>
           ) : (
             <div className="text-center py-20 flex flex-col items-center justify-center h-full">
               <div className="inline-block p-6 rounded-full bg-green-500/10 text-green-500 mb-8 border border-green-500/20 animate-pulse">
                 <Icons.CheckCircle size={64} />
               </div>
               <h3 className="text-3xl text-white font-serif mb-4">Request Received</h3>
               <p className="text-gray-400 font-light max-w-sm mx-auto mb-8">Thank you, {formData.name}. We will contact you shortly to confirm details.</p>
               <button onClick={() => setSubmitted(false)} className="text-gold-500 hover:text-white underline text-sm uppercase tracking-wider font-bold">Send another request</button>
             </div>
           )}
        </div>
      </div>
      
      {/* Map Placeholder */}
      <div className="mt-24 h-[400px] w-full bg-neutral-900 border border-white/5 flex items-center justify-center text-gray-500 rounded-sm relative overflow-hidden group">
        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Lagos_Island_Map.png/640px-Lagos_Island_Map.png')] bg-cover bg-center opacity-20 grayscale transition-opacity group-hover:opacity-30"></div>
        <div className="text-center relative z-10 bg-black/80 p-8 rounded-sm backdrop-blur-sm border border-white/10">
            <Icons.MapPin size={48} className="mx-auto mb-4 text-gold-500"/>
            <h4 className="text-white font-serif text-xl mb-2">Visit Our Showroom</h4>
            <p className="text-sm text-gray-400 font-light">{config.address}</p>
        </div>
      </div>
    </div>
  );
};

export const About = () => {
    const { config } = useContent();
    return (
        <div className="pt-12 pb-24 container mx-auto px-4">
             <div className="max-w-4xl mx-auto text-center mb-20 space-y-6">
                <span className="text-gold-500 uppercase tracking-[0.2em] text-xs font-bold">About Us</span>
                <h1 className="text-4xl md:text-6xl font-serif text-white">{config.companyName}</h1>
                <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed font-serif italic text-opacity-80">"{config.missionStatement}"</p>
                <div className="w-24 h-px bg-white/20 mx-auto mt-8"></div>
                <p className="text-gray-400 leading-8 font-light text-lg">{config.aboutText}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                {[
                    { title: "Our Mission", text: config.missionStatement, icon: Icons.Sparkles },
                    { title: "Service Areas", text: "Proudly serving high-end clients across Lagos (Lekki, Ikoyi, VI), Ibadan (Bodija, Jericho), and Ogun State (Abeokuta, OTA).", icon: Icons.MapPin },
                    { title: "Materials", text: "Direct partnerships with Italian and Spanish quarries ensure only the finest Grade A porcelain, marble, and granite.", icon: Icons.Layers },
                ].map((item, i) => (
                    <div key={i} className="bg-neutral-900 p-10 border-t-2 border-gold-500 hover:bg-neutral-800 transition-colors group">
                        <item.icon size={32} className="text-gold-600 mb-6 group-hover:text-gold-500 transition-colors" />
                        <h3 className="text-2xl text-white font-serif mb-4">{item.title}</h3>
                        <p className="text-gray-400 leading-relaxed font-light">{item.text}</p>
                    </div>
                ))}
            </div>

            <div className="relative rounded-sm overflow-hidden h-96">
                <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2600&auto=format&fit=crop" alt="Team" className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000 scale-105" />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
                    <h2 className="text-4xl md:text-5xl text-white font-serif mb-4">Meet The Craftsmen</h2>
                    <Link to="/contact" className="text-white border border-white px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-white hover:text-black transition-all">Work With Us</Link>
                </div>
            </div>
        </div>
    )
}
