import { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react';
import { DataContextType, Project, Service, Testimonial, SiteConfig, BlogPost, JournalEntry } from '../types';
import { INITIAL_CONFIG, INITIAL_PROJECTS, INITIAL_SERVICES, INITIAL_TESTIMONIALS, INITIAL_BLOG_POSTS } from '../constants';
import { supabase } from '../lib/supabaseClient';

const ContentContext = createContext<DataContextType | undefined>(undefined);

// Helper to map snake_case DB fields to camelCase TS interfaces
const mapKeysToCamel = (obj: any): any => {
    if (Array.isArray(obj)) return obj.map(mapKeysToCamel);
    if (obj !== null && typeof obj === 'object') {
        return Object.keys(obj).reduce((acc, key) => {
            const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
            acc[camelKey] = mapKeysToCamel(obj[key]);
            return acc;
        }, {} as any);
    }
    return obj;
};

// Helper to map camelCase TS interfaces to snake_case DB fields
const mapKeysToSnake = (obj: any): any => {
    if (Array.isArray(obj)) return obj.map(mapKeysToSnake);
    if (obj !== null && typeof obj === 'object') {
        return Object.keys(obj).reduce((acc, key) => {
            const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
            acc[snakeKey] = mapKeysToSnake(obj[key]);
            return acc;
        }, {} as any);
    }
    return obj;
};

export const ContentProvider = ({ children }: PropsWithChildren) => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [config, setConfig] = useState<SiteConfig>(INITIAL_CONFIG);
  
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [session, setSession] = useState<any>(null);

  // Initialize Data & Auth
  useEffect(() => {
    const fetchData = async () => {
        // Fetch Projects
        const { data: pData } = await supabase.from('projects').select('*').order('date', { ascending: false });
        if(pData && pData.length > 0) setProjects(mapKeysToCamel(pData));

        // Fetch Services
        const { data: sData } = await supabase.from('services').select('*');
        if(sData && sData.length > 0) setServices(mapKeysToCamel(sData));

        // Fetch Testimonials
        const { data: tData } = await supabase.from('testimonials').select('*');
        if(tData && tData.length > 0) setTestimonials(mapKeysToCamel(tData));

        // Fetch Blog
        const { data: bData } = await supabase.from('blog_posts').select('*').order('date', { ascending: false });
        if(bData && bData.length > 0) setBlogPosts(mapKeysToCamel(bData));

        // Fetch Config
        const { data: cData } = await supabase.from('site_config').select('*').single();
        if(cData) setConfig(mapKeysToCamel(cData));
    };

    fetchData();

    // Initialize Auth
    const initAuth = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            setIsAuthenticated(!!session);
        } catch (e) {
            console.error("Auth init error:", e);
        } finally {
            setIsAuthLoading(false);
        }
    };
    initAuth();

    // Listen for Auth Changes (Sign in, Sign out, Token Refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsAuthenticated(!!session);
      setIsAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch Private Data (Journal) when session changes
  useEffect(() => {
    if (session) {
        const fetchJournal = async () => {
            const { data } = await supabase
                .from('journal_entries')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (data) {
                setJournalEntries(mapKeysToCamel(data));
            }
        };
        fetchJournal();
    } else {
        setJournalEntries([]);
    }
  }, [session]);


  // --- Actions with Supabase Persistence ---

  const updateProject = async (updatedProject: Project) => {
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p)); // Optimistic
    const { id, ...data } = updatedProject;
    await supabase.from('projects').update(mapKeysToSnake(data)).eq('id', id);
  };

  const addProject = async (project: Project) => {
    setProjects(prev => [project, ...prev]);
    const { id, ...data } = project; 
    await supabase.from('projects').insert(mapKeysToSnake(project));
  };

  const deleteProject = async (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    await supabase.from('projects').delete().eq('id', id);
  };

  const updateService = async (updatedService: Service) => {
    setServices(prev => prev.map(s => s.id === updatedService.id ? updatedService : s));
    const { id, ...data } = updatedService;
    await supabase.from('services').update(mapKeysToSnake(data)).eq('id', id);
  };

  const updateConfig = async (newConfig: SiteConfig) => {
    setConfig(newConfig);
    const { data } = await supabase.from('site_config').select('id').single();
    if (data) {
        await supabase.from('site_config').update(mapKeysToSnake(newConfig)).eq('id', data.id);
    } else {
        await supabase.from('site_config').insert(mapKeysToSnake(newConfig));
    }
  };

  const addTestimonial = async (t: Testimonial) => {
    setTestimonials(prev => [t, ...prev]);
    await supabase.from('testimonials').insert(mapKeysToSnake(t));
  };

  const deleteTestimonial = async (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
    await supabase.from('testimonials').delete().eq('id', id);
  };

  const addBlogPost = async (post: BlogPost) => {
    setBlogPosts(prev => [post, ...prev]);
    await supabase.from('blog_posts').insert(mapKeysToSnake(post));
  };

  const updateBlogPost = async (post: BlogPost) => {
    setBlogPosts(prev => prev.map(p => p.id === post.id ? post : p));
    const { id, ...data } = post;
    await supabase.from('blog_posts').update(mapKeysToSnake(data)).eq('id', id);
  };

  const deleteBlogPost = async (id: string) => {
    setBlogPosts(prev => prev.filter(p => p.id !== id));
    await supabase.from('blog_posts').delete().eq('id', id);
  };

  // --- Journal Actions ---

  const addJournalEntry = async (entry: Partial<JournalEntry>) => {
    if (!session?.user) return;
    
    const dbEntry = {
        ...mapKeysToSnake(entry),
        user_id: session.user.id
    };

    const { data, error } = await supabase.from('journal_entries').insert(dbEntry).select().single();
    
    if (error) {
        console.error("Error adding journal entry:", error);
        return;
    }
    
    if (data) {
        setJournalEntries(prev => [mapKeysToCamel(data), ...prev]);
    }
  };

  const updateJournalEntry = async (entry: JournalEntry) => {
    // Optimistic
    setJournalEntries(prev => prev.map(e => e.id === entry.id ? entry : e));
    
    const { id, userId, createdAt, ...updates } = entry;
    // We only update title/content/updated_at. user_id is fixed.
    const dbUpdates = {
        ...mapKeysToSnake(updates),
        updated_at: new Date().toISOString()
    };
    
    await supabase.from('journal_entries').update(dbUpdates).eq('id', id);
  };

  const deleteJournalEntry = async (id: string) => {
    setJournalEntries(prev => prev.filter(e => e.id !== id));
    await supabase.from('journal_entries').delete().eq('id', id);
  };

  // Auth wrapper
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) {
        console.error("Login Error:", error.message);
        return { success: false, error: error.message };
    }
    return { success: true };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setSession(null);
    setJournalEntries([]); // Clear private data
  };

  return (
    <ContentContext.Provider value={{
      projects, services, testimonials, blogPosts, journalEntries, config,
      updateProject, addProject, deleteProject,
      updateService, updateConfig,
      addTestimonial, deleteTestimonial,
      addBlogPost, updateBlogPost, deleteBlogPost,
      addJournalEntry, updateJournalEntry, deleteJournalEntry,
      isAuthenticated, isAuthLoading, login, logout
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};