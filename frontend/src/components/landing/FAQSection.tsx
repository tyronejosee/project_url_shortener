"use client";

import { Accordion, AccordionItem, Button } from "@heroui/react";

const faqs = [
  {
    question: "How does the link shortener work?",
    answer:
      "Simply paste your long URL into the input field and you’ll get a short link instantly. You can customize it with your domain and add tracking parameters to analyze performance.",
  },
  {
    question: "Can I use my own domain?",
    answer:
      "Yes, the Pro and Enterprise plans allow you to connect your own custom domains. This increases trust and brand recognition. The setup is simple, and our team helps you through the process.",
  },
  {
    question: "What analytics data can I see?",
    answer:
      "You can see total clicks, unique visitors, geographic location, devices, browsers, traffic sources, and much more. The data is updated in real time and can be exported whenever you need.",
  },
  {
    question: "Do links expire?",
    answer:
      "No, links never expire unless you configure them to. You can set optional expiration dates for temporary campaigns or keep your links active indefinitely.",
  },
  {
    question: "Do you offer an API for developers?",
    answer:
      "Yes, we offer a full API available on all paid plans. You can create, edit, delete links and retrieve statistics programmatically. It includes complete documentation and code examples.",
  },
  {
    question: "What security do you provide?",
    answer:
      "All links include SSL/HTTPS, malware protection, password-protected links, and automatic security scanning. Enterprise plans include SSO, full auditing, and GDPR compliance.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="max-w-6xl mx-auto px-4 py-20">
      <header className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-muted-foreground text-balance leading-relaxed">
          Everything you need to know about LinkShort
        </p>
      </header>

      <Accordion selectionMode="single" variant="bordered" className="gap-4">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} aria-label={faq.question} title={faq.question}>
            <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-8 text-center">
        <p className="text-muted-foreground mb-4">Can’t find what you’re looking for?</p>
        <Button variant="bordered">Contact support</Button>
      </div>
    </section>
  );
}
