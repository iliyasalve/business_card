import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import Script from 'next/script';
import Seo from '../components/Seo';
import BentoSkills from '../components/BentoSkills';
import ProjectCarousel from '../components/ProjectCarousel';

interface Degree {
  title: string;
  institution: string;
  location: string;
  period: string;
  description: string;
  projects?: string[];
}

interface Job {
  position: string;
  company: string;
  dates: string;
  description: string[];
}

interface Training {
  title: string;
  institution: string;
  location: string;
  period: string;
  description: string;
  badgeId?: string;
}

const Home = () => {
  const { t: tCommon } = useTranslation('common');
  const { t: tExp } = useTranslation('experience');
  const { t: tEdu } = useTranslation('education');
  const { t: tTrain } = useTranslation('training');

  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // Fetch translation content
  const jobs = tExp('jobs', { returnObjects: true }) as Job[] || [];
  const degrees = tEdu('degrees', { returnObjects: true }) as Degree[] || [];
  const trainings = tTrain('trainings', { returnObjects: true }) as Training[] || [];

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      section.classList.add('transition-[opacity,transform]', 'duration-1000', 'opacity-0', 'translate-y-10');
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  return (
    <>
      <Seo
        title={tCommon('home.meta.title') || 'Iliya Glazunov'}
        description={tCommon('home.meta.description') || ''}
        keywords={tCommon('home.meta.keywords') || ''}
        image={tCommon('home.meta.image') || '/images/photo.jpg'}
      />
      <Head>
        <title>{tCommon('header.title')}</title>
      </Head>
      <Script src="https://web3forms.com/client/script.js" async defer />

      <div className="w-full">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden" id="home">
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 blur-[120px] -z-10 rounded-full" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 blur-[120px] -z-10 rounded-full" />
          
          <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-gutter relative z-10 w-full">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-label-sm uppercase mb-6">
                {tCommon('home.statusTag', 'Available for new opportunities')}
              </span>
              <h1 className="font-display text-display text-gradient mb-6 leading-tight">
                {tCommon('home.title')}
              </h1>
              <p className="font-body-lg text-on-surface-variant mb-10 max-w-2xl">
                {tCommon('home.subtitle', 'Full-Stack / Mobile Developer & Data Analyst passionate about software engineering, data science, and high-performance solutions.')}
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#projects"
                  className="px-8 py-4 bg-primary text-on-primary rounded-xl font-bold flex items-center gap-2 hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95"
                >
                  {tCommon('home.viewProjects', 'View Projects')}
                  <span className="material-symbols-outlined">arrow_forward</span>
                </a>
                <a 
                  href="#contact"
                  className="px-8 py-4 border border-outline/30 rounded-xl font-bold hover:bg-surface-variant hover:text-primary transition-all text-on-background"
                >
                  {tCommon('header.contact', 'Contact Me')}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-section-gap-lg" id="about">
          <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-gutter">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden glass-card relative">
                  <img 
                    alt="Iliya Glazunov" 
                    className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] object-cover rounded-2xl"
                    src={tCommon('home.image', '/images/photo.jpg')}
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
              </div>
              <div>
                <h2 className="font-display text-headline-lg mb-6">{tCommon('about.headline', 'Beyond the Code.')}</h2>
                <div className="text-on-surface-variant font-body-lg space-y-4 leading-relaxed">
                  <p>{tCommon('about.p1', 'I am an adaptable software engineer with a strong foundation in computer science and a passion for data analysis and software development.')}</p>
                  <p>{tCommon('about.p2', 'With multiple years of practical and volunteer experience building systems ranging from Django/PostgreSQL platforms to peer-to-peer visualizers and game engines, I thrive on solving multi-disciplinary challenges.')}</p>
                </div>
                <div className="grid grid-cols-2 gap-8 mt-10">
                  <div>
                    <div className="text-primary font-display text-headline-md mb-1">{tCommon('about.stat1_val', '5+')}</div>
                    <div className="text-on-surface-variant font-label-sm uppercase">{tCommon('about.stat1_lbl', 'Years Dev Experience')}</div>
                  </div>
                  <div>
                    <div className="text-primary font-display text-headline-md mb-1">{tCommon('about.stat2_val', '15+')}</div>
                    <div className="text-on-surface-variant font-label-sm uppercase">{tCommon('about.stat2_lbl', 'Completed Projects')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section (Bento Grid) */}
        <section className="py-section-gap-lg bg-surface-container-low" id="skills">
          <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-gutter">
            <h2 className="font-display text-headline-lg text-center mb-16">{tCommon('header.skills')}</h2>
            <BentoSkills />
          </div>
        </section>

        {/* Experience Section (Timeline) */}
        <section className="py-section-gap-lg" id="experience">
          <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-gutter">
            <h2 className="font-display text-headline-lg mb-16">{tExp('title', 'The Journey.')}</h2>
            <div className="space-y-12 relative">
              {/* Continuous vertical timeline line */}
              <div className="absolute left-[8px] md:left-[168px] top-2 bottom-0 w-0.5 bg-surface-variant"></div>
              {jobs.map((job, idx) => (
                <div key={idx} className="flex gap-8 group">
                  <div className="hidden md:block w-32 pt-2 text-on-surface-variant font-label-sm text-right shrink-0">
                    {job.dates.split(',')[0]}
                  </div>
                  <div className="relative flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-primary border-4 border-background z-10"></div>
                  </div>
                  <div className={`${idx === jobs.length - 1 ? 'pb-0' : 'pb-12'} flex-grow`}>
                    <h4 className="font-display text-headline-md mb-1">{job.position}</h4>
                    <div className="text-primary font-medium mb-4">{job.company} <span className="md:hidden text-xs text-on-surface-variant ml-2">({job.dates})</span></div>
                    <ul className="text-on-surface-variant max-w-3xl list-disc pl-5 space-y-2 leading-relaxed font-body-md text-sm sm:text-base">
                      {job.description.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-section-gap-lg bg-surface-container-low" id="projects">
          <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-gutter">
            <ProjectCarousel />
          </div>
        </section>

        {/* Education & Certifications */}
        <section className="py-section-gap-lg" id="education">
          <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-gutter">
            <div className="grid md:grid-cols-2 gap-16">
              {/* Academic Foundation */}
              <div>
                <h2 className="font-display text-headline-lg mb-12">{tEdu('title', 'Academic Foundation.')}</h2>
                <div className="space-y-8">
                  {degrees.map((deg, idx) => (
                    <div 
                      key={idx}
                      className="p-6 rounded-2xl border border-surface-variant hover:border-primary/40 transition-colors"
                    >
                      <h4 className="font-display text-headline-md mb-1">{deg.title}</h4>
                      <p className="text-primary font-medium mb-1">{deg.institution}</p>
                      <p className="text-on-surface-variant text-xs mb-3">{deg.location} · {deg.period}</p>
                      <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed mb-4">{deg.description}</p>
                      {deg.projects && (
                        <div className="mt-2 text-xs text-on-surface-variant">
                          <span className="font-bold text-primary block uppercase tracking-wide mb-1">{tEdu('keyProjects', 'Key Projects')}</span>
                          <ul className="list-disc pl-4 space-y-1">
                            {deg.projects.map((proj: string, i: number) => (
                              <li key={i}>{proj}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h2 className="font-display text-headline-lg mb-12">{tTrain('title', 'Certifications.')}</h2>
                <div className="max-h-[1190px] overflow-y-auto no-scrollbar pt-2 px-1 -mt-2 -mx-1">
                  <div className="grid grid-cols-1 gap-4">
                    {trainings.map((train, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-4 glass-card rounded-xl">
                        <div className="w-12 h-12 rounded-lg bg-surface-variant flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-primary">
                            {idx % 2 === 0 ? 'verified_user' : 'cloud_done'}
                          </span>
                        </div>
                        <div>
                          <h5 className="font-bold text-on-surface">{train.title.replace(/\s*(Professional Certificate|Certificate)$/i, '')}</h5>
                          <p className="text-on-surface-variant text-label-sm mb-1">{train.institution} · {train.period}</p>
                          {train.badgeId && (
                            <a 
                              href={`https://www.credly.com/badges/${train.badgeId}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-primary dark:text-primary-fixed-dim font-bold text-sm inline-flex items-center gap-1 group"
                            >
                              <span className="group-hover:underline">{tTrain('verify', 'Verify Credential')}</span>
                              <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-0.5">arrow_forward</span>
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-section-gap-lg bg-surface-container-low" id="contact">
          <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-gutter">
            <div className="max-w-4xl mx-auto glass-card rounded-[2rem] p-6 sm:p-10 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -z-10"></div>
              <div className="text-center mb-16">
                <h2 className="font-display text-display mb-6 leading-tight">{tCommon('contact.title', "Let's build the future.")}</h2>
                <p className="text-on-surface-variant font-body-lg">
                  {tCommon('contact.intro', 'Currently accepting selected consulting roles and software engineering opportunities.')}
                </p>
              </div>
              <form 
                className="grid md:grid-cols-2 gap-8" 
                onSubmit={async (e) => {
                  e.preventDefault();
                  setFormStatus('sending');
                  setStatusMessage('');

                  const formElement = e.currentTarget;

                  // Client-side hCaptcha validation
                  const hCaptcha = formElement.querySelector('textarea[name=h-captcha-response]') as HTMLTextAreaElement | null;
                  if (!hCaptcha || !hCaptcha.value) {
                    setFormStatus('error');
                    setStatusMessage(tCommon('contact.captchaError', 'Please fill out the captcha field.'));
                    return;
                  }

                  const formData = new FormData(formElement);
                  formData.append("access_key", "b57b2b40-aad5-42b9-b25d-6c29b3d06cf1");

                  try {
                    const response = await fetch("https://api.web3forms.com/submit", {
                      method: "POST",
                      body: formData
                    });

                    const data = await response.json();

                    if (response.ok && data.success) {
                      setFormStatus('success');
                      setStatusMessage(tCommon('contact.successMessage', 'Success! Your message has been sent.'));
                      formElement.reset();
                      // Reset hCaptcha widget if window.hcaptcha exists
                      if (typeof window !== 'undefined' && (window as any).hcaptcha) {
                        (window as any).hcaptcha.reset();
                      }
                    } else {
                      setFormStatus('error');
                      setStatusMessage(data.message || tCommon('contact.errorMessage', 'Something went wrong. Please try again.'));
                    }
                  } catch (error) {
                    setFormStatus('error');
                    setStatusMessage(tCommon('contact.errorMessage', 'Something went wrong. Please try again.'));
                  }
                }}
              >
                <div className="space-y-6">
                  <div>
                    <label className="block font-label-sm uppercase mb-2 text-on-surface-variant px-1">{tCommon('contact.name', 'Your Name')}</label>
                    <input
                      name="name"
                      required
                      type="text"
                      className="w-full bg-surface-variant/60 dark:bg-surface-variant/30 border-b-2 border-outline/50 dark:border-outline/20 focus:border-primary focus:ring-0 transition-all py-4 px-4 rounded-lg placeholder:text-on-surface-variant/70 dark:placeholder:text-on-surface-variant/40 font-body-md text-on-surface"
                      placeholder={tCommon('contact.namePlaceholder', 'John Doe')}
                    />
                  </div>
                  <div>
                    <label className="block font-label-sm uppercase mb-2 text-on-surface-variant px-1">{tCommon('contact.emailLabel', 'Email Address')}</label>
                    <input
                      name="email"
                      required
                      type="email"
                      className="w-full bg-surface-variant/60 dark:bg-surface-variant/30 border-b-2 border-outline/50 dark:border-outline/20 focus:border-primary focus:ring-0 transition-all py-4 px-4 rounded-lg placeholder:text-on-surface-variant/70 dark:placeholder:text-on-surface-variant/40 font-body-md text-on-surface"
                      placeholder={tCommon('contact.emailPlaceholder', 'john@example.com')}
                    />
                  </div>
                </div>
                <div className="flex flex-col h-full">
                  <label className="block font-label-sm uppercase mb-2 text-on-surface-variant px-1">{tCommon('contact.message', 'Message')}</label>
                  <textarea
                    name="message"
                    required
                    className="w-full flex-grow bg-surface-variant/60 dark:bg-surface-variant/30 border-b-2 border-outline/50 dark:border-outline/20 focus:border-primary focus:ring-0 transition-all py-4 px-4 rounded-lg resize-none placeholder:text-on-surface-variant/70 dark:placeholder:text-on-surface-variant/40 font-body-md text-on-surface min-h-[140px]"
                    placeholder={tCommon('contact.messagePlaceholder', 'Tell me about your project...')}
                  ></textarea>
                </div>

                {/* hCaptcha widget */}
                <div className="md:col-span-2 flex justify-center items-center w-full mt-2 overflow-hidden">
                  <div className="h-captcha mx-auto" data-captcha="true" data-theme="dark" data-sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"></div>
                </div>

                <div className="md:col-span-2 mt-4">
                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className="w-full py-4 bg-primary text-on-primary rounded-xl font-bold hover:shadow-lg hover:shadow-primary/30 hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formStatus === 'sending' ? tCommon('contact.sending', 'Sending...') : tCommon('contact.send', 'Send Message')}
                    <span className="material-symbols-outlined">send</span>
                  </button>
                </div>

                {statusMessage && (
                  <div className={`md:col-span-2 mt-4 p-4 rounded-xl text-center text-sm font-semibold ${
                    formStatus === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
                  }`}>
                    {statusMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
