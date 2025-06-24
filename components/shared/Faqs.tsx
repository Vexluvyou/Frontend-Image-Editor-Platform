import React, { useState } from "react";

const faqs = [
  {
    question: "What is the Image Editor Platform Powered by AI?",
    answer:
      "It’s a web-based tool that lets you edit images using AI technologies such as background removal, recoloring, object removal, and image enhancement.",
  },
  {
    question: "Is the platform free to use?",
    answer:
      "There’s a free tier with limited transformations per day. For unlimited access, you can subscribe to a paid plan.",
  },
  {
    question: "What file formats are supported?",
    answer: "The platform supports JPEG, PNG, and WebP images.",
  },
  {
    question: "Can I undo a transformation?",
    answer:
      "You can revert to the original image as long as you haven’t left the editing page or reloaded the session.",
  },
  {
    question: "How do I get help or support?",
    answer:
      "You can contact our support team via the Help section or email us at support@imageeditor.ai.",
  },
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <main className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
      <ul className="space-y-4">
        {faqs.map((faq, index) => (
          <li
            key={index}
            className="border border-gray-200 rounded-lg shadow-sm p-4 transition-all"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left flex justify-between items-center"
            >
              <span className="text-lg font-medium">{faq.question}</span>
              <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && (
              <p className="mt-2 text-gray-700 text-sm">{faq.answer}</p>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default FAQPage;
