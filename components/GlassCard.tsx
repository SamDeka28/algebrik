type GlassCardProps = {
    title: string;
    description: string;
  };
  
  export default function GlassCard({ title, description }: GlassCardProps) {
    return (
      <div className="p-6 glass-card text-white rounded-lg shadow-lg bg-white/10 backdrop-blur-lg">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p>{description}</p>
      </div>
    );
  }
  