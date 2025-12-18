"use client";

import { Card, CardBody } from "@heroui/react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "María González",
    role: "Marketing Director",
    company: "TechStart Spain",
    content:
      "LinkShort transformed our digital marketing strategy. The detailed analytics allow us to optimize every campaign.",
    rating: 5,
  },
  {
    name: "Carlos Ruiz",
    role: "CEO",
    company: "Innovatech",
    content:
      "Branded links increased our click-through rate by 340%. An investment that pays for itself.",
    rating: 5,
  },
  {
    name: "Ana Martínez",
    role: "Product Manager",
    company: "Digital Solutions",
    content:
      "The API integration is seamless. We fully automated link management across our systems.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <header className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
          Trusted by companies worldwide
        </h2>
        <p className="text-lg text-muted-foreground text-balance leading-relaxed">
          Over 500,000 companies around the world use LinkShort to manage their digital links and
          improve performance.
        </p>
      </header>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.name}
            className="bg-card/50 backdrop-blur-sm border-border/50 h-full"
          >
            <CardBody className="pt-6 flex flex-col">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              <p className="text-foreground mb-6 leading-relaxed flex-1">{testimonial.content}</p>

              <div>
                <div className="font-medium">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">
                  {testimonial.role} • {testimonial.company}
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </section>

      <section className="flex flex-wrap justify-center items-center gap-12 opacity-50">
        <div className="text-2xl font-bold">ACME Corp</div>
        <div className="text-2xl font-bold">GlobalTech</div>
        <div className="text-2xl font-bold">InnovaHub</div>
        <div className="text-2xl font-bold">DataFlow</div>
        <div className="text-2xl font-bold">CloudSync</div>
      </section>
    </section>
  );
}
