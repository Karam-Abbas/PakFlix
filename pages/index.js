import { useRouter } from 'next/router';
import { useState } from 'react';

// Static Site Generation for FAQs
export async function getStaticProps() {
  const faqs = [
    {
      question: "What is Netflix?",
      answer:
        "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    },
    {
      question: "How much does Netflix cost?",
      answer:
        "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from PKR 250 to PKR 1,100 a month. No extra costs, no contracts.",
    },
    {
      question: "Where can I watch?",
      answer:
        "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device.",
    },
    {
      question: "How do I cancel?",
      answer:
        "Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks.",
    },
    {
      question: "What can I watch on Netflix?",
      answer:
        "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more.",
    },
    {
      question: "Is Netflix good for kids?",
      answer:
        "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly content.",
    },
  ];

  return {
    props: {
      faqs,
    },
  };
}

export default function Home({ faqs }) {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-black text-white">
      {/* HERO SECTION */}
      <div className="relative h-screen overflow-hidden">
        {/* Background Image */}
        <img
          src="/images/hero.jpg"
          alt="Netflix Hero"
          className="absolute w-full h-full object-cover opacity-50"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-0" />

        {/* Header with Logo */}
        <div className="absolute top-0 left-0 w-full px-8 py-6 z-10 flex justify-start">
          <img
            src="/images/logo.png"
            alt="Netflix Logo"
            className="h-12 w-auto"
          />
        </div>

        {/* Hero Text + Button */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-5xl font-bold mb-4">Unlimited movies, TV shows, and more.</h1>
          <h2 className="text-2xl mb-8">Watch anywhere. Cancel anytime.</h2>
          <button
            onClick={() => router.push('/login')}
            className="bg-red-600 px-8 py-3 text-lg rounded font-semibold hover:bg-red-700 transition"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* FAQ SECTION */}
      <section className="bg-black py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-800">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left text-xl md:text-2xl font-medium hover:bg-gray-700 transition"
                >
                  {faq.question}
                  <span className="text-3xl">{openIndex === index ? '✕' : '+'}</span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-96 px-6 py-4' : 'max-h-0'
                  }`}
                >
                  <p className="text-gray-300 text-lg">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button Under FAQs */}
          <div className="mt-10 text-center">
            <p className="text-lg mb-4">Ready to watch? Click below to get started.</p>
            <button
              onClick={() => router.push('/login')}
              className="bg-red-600 hover:bg-red-700 transition text-white text-lg font-semibold px-8 py-3 rounded"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
