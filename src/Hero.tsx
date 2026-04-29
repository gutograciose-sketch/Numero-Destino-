import { ArrowRight, Sparkles, Star } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

export function Hero({ onStart }: HeroProps) {
  return (
    <div className="hero-container">
      <div className="hero-grid">
        <div className="hero-content animate-fade-in-left">
          <div className="hero-label-wrapper">
            <div className="hero-label-line" />
            <span className="hero-label-text">Fernando Liberal</span>
          </div>

          <div>
            <h1 className="hero-title">
              Sua Alma é<br />
              <span className="hero-title-gradient">
                Frequência.
              </span>
            </h1>
            <p className="hero-description">
              O universo não joga dados. Ele calcula. Descubra o código matemático que rege o seu destino e a missão secreta da sua alma.
            </p>
          </div>

          <div className="hero-buttons">
            <button
              id="btn-start"
              onClick={onStart}
              className="hero-btn-start group"
            >
              Iniciar Alinhamento
              <ArrowRight className="hero-btn-icon group-hover:translate-x-2" />
            </button>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <div className="hero-image-glow" />
          <div className="hero-image-container">
            <div className="hero-image-border-1" />
            <div className="hero-image-border-2" />
            <div className="hero-image-box">
              <img 
                src="/mentor.png"
                alt="Mentor"
                className="hero-img"
              />
              <div className="hero-image-overlay" />
              <div className="hero-image-badge">
                <div className="hero-image-badge-content">
                  <Star className="hero-image-badge-icon" />
                  <span className="hero-image-badge-text">Mestre Mentor</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-benefits-bar">
        {[
          { label: "Precisão", text: "Cálculo Pitagórico Ancestral", icon: Star },
          { label: "Profundidade", text: "Dualidade de Luz e Sombra", icon: Sparkles },
          { label: "Mistério", text: "Revelação de Números Mestres", icon: Star },
          { label: "Legado", text: "Conclusão da Missão de Vida", icon: Sparkles }
        ].map((item, i) => (
          <div key={i} className="hero-benefit-item group">
            <div className="hero-benefit-header">
              <item.icon className="hero-benefit-icon" />
              <p className="hero-benefit-label">{item.label}</p>
            </div>
            <p className="hero-benefit-text">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
