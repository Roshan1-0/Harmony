import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import '@styles/testimonials.css'

gsap.registerPlugin(ScrollTrigger)

const TESTIMONIALS = [
  {
    quote:
      "Harmony didn't just redesign our website — they reimagined how our brand communicates. The attention to detail was extraordinary.",
    name: 'Sarah Chen',
    role: 'Creative Director, Solara',
    initials: 'SC',
  },
  {
    quote:
      'Working with this team felt like having an in-house design department that actually understands your vision. Rare and invaluable.',
    name: 'Marcus Webb',
    role: 'Founder, Arclight',
    initials: 'MW',
  },
  {
    quote:
      "The level of craft in every interaction, every animation, every pixel — it's the kind of work that makes you proud to show off your product.",
    name: 'Elena Vasquez',
    role: 'VP Product, Meridian',
    initials: 'EV',
  },
  {
    quote:
      'They have this uncanny ability to take abstract ideas and turn them into interfaces that just feel right. No compromises.',
    name: 'James Okafor',
    role: 'CEO, Volta Collective',
    initials: 'JO',
  },
  {
    quote:
      "Three agencies before them couldn't crack it. Harmony understood our challenge in the first meeting and delivered beyond what we imagined.",
    name: 'Anya Petrov',
    role: 'Brand Manager, Lumen Health',
    initials: 'AP',
  },
  {
    quote:
      'Honest, thoughtful, and incredibly talented. They pushed back when needed and celebrated with us when it all came together.',
    name: 'David Kim',
    role: 'Co-founder, Threadline',
    initials: 'DK',
  },
]

function TestimonialCard({ testimonial }) {
  return (
    <div className="testimonial-card">
      <blockquote className="testimonial-quote">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <div className="testimonial-author">
        <div className="testimonial-avatar" aria-hidden="true">
          {testimonial.initials}
        </div>
        <div className="testimonial-author-info">
          <span className="testimonial-name">{testimonial.name}</span>
          <span className="testimonial-role">{testimonial.role}</span>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    gsap.from(sectionRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      id="testimonials"
      className="testimonials section"
      ref={sectionRef}
    >
      <div className="container">
        {/* Decorative quote mark */}
        <span className="testimonials-quote-mark" aria-hidden="true">
          {'\u201C'}
        </span>

        <div className="testimonials-header">
          <span className="text-label testimonials-label">Testimonials</span>
          <h2 className="testimonials-heading">
            Kind words from
            <br />
            those we&rsquo;ve worked with
          </h2>
        </div>
      </div>

      {/* Infinite marquee */}
      <div className="marquee-container" aria-label="Client testimonials">
        <div className="marquee-track">
          {/* First set */}
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={`a-${i}`} testimonial={t} />
          ))}
          {/* Duplicate set for seamless loop */}
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={`b-${i}`} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
