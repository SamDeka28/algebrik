import { Card } from "../LendingHealthCheck/ui/card";
import { Quote, Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    "/ufcu-assets/ufcum.webp",
    "/ufcu-assets/ufcuf.webp"
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

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 bg-card border-2 border-accent/10 hover:border-accent/30 transition-all duration-300 hover:shadow-xl relative">
              {/* Quote Icon */}
              <img src={testimonial}/>
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