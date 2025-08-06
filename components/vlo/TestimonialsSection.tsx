import { Card } from "../LendingHealthCheck/ui/card";
import { Quote, Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "We were blown away by how natural the experience felt — and the AI made faster decisions than our team ever could.",
      author: "Sarah Chen",
      title: "VP of Lending, Midwest CU",
      rating: 5
    },
    {
      quote: "Our members love the conversational interface. It's like having a loan officer available 24/7.",
      author: "Marcus Rodriguez",
      title: "Digital Innovation Director, Pioneer Bank",
      rating: 5
    },
    {
      quote: "The transparency in decision-making has increased our member trust significantly. They understand exactly why they were approved.",
      author: "Jennifer Thompson",
      title: "Chief Lending Officer, Community First FCU",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            What Early Adopters Are Saying
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Leading financial institutions are already transforming their lending with Algebrik AI
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 bg-card border-2 border-accent/10 hover:border-accent/30 transition-all duration-300 hover:shadow-xl relative">
              {/* Quote Icon */}
              <div className="absolute -top-4 left-6 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <Quote className="h-4 w-4 text-primary" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4 mt-2">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-lg text-primary mb-6 italic leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="border-t border-accent/20 pt-4">
                <div className="font-semibold text-primary">{testimonial.author}</div>
                <div className="text-sm text-muted-foreground">{testimonial.title}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        {/* <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">Trusted by forward-thinking financial institutions</p>
          <div className="flex justify-center items-center gap-8 text-primary/60">
            <div className="text-lg font-semibold">50+ Credit Unions</div>
            <div className="w-1 h-1 bg-accent rounded-full" />
            <div className="text-lg font-semibold">25+ Community Banks</div>
            <div className="w-1 h-1 bg-accent rounded-full" />
            <div className="text-lg font-semibold">$2B+ Loans Processed</div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default TestimonialsSection;