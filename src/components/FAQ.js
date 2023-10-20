import React from 'react';
import './FAQ.css';  // Assuming you'll save the CSS in a file named FAQ.css
import '../App.css';  // Assuming you'll save the CSS in a file named FAQ.css

function FAQ() {
    const faqs = [
        { question: "Why do I need to register?", answer: "You must register so that your BMR is able to be calculated and meals can be customized to fit your needs." },
        { question: "How do I register?", answer: "Click on the 'Register' button on the top right corner of the homepage." },
        // ... Add more FAQs here
    ];

    return (
        <div className = "main-div">
                <h2>Frequently Asked Questions</h2>
                {faqs.map((faq, index) => (
                    <div key={index} className="faq-item">
                        <p className="faq-question">{faq.question}</p>
                        <p className="faq-answer">{faq.answer}</p>
                    </div>
                ))}
        </div>
    );
}

export default FAQ;
