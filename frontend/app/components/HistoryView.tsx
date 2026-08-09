"use client";

import { RiArrowDownSLine } from "react-icons/ri";

export default function HistoryView() {
  const historyItems = [
    {
      id: 1,
      question: "Brown spots appearing on wheat leaves",
      answer:
        "It looks like a potential fungal infection, possibly rust or spot blotch. Consider applying...",
      date: "Oct 24, 2023",
    },
    {
      id: 2,
      question: "Ideal time to sow mustard seeds in Punjab region",
      answer:
        "The optimal window for sowing mustard in your region is generally between mid-October...",
      date: "Oct 12, 2023",
    },
    {
      id: 3,
      question: "Leaves curling inwards on tomato plants",
      answer:
        "Leaf curl in tomatoes can be caused by environmental stress, viral infections, or herbicide...",
      date: "Sep 28, 2023",
    },
  ];

  return (
    <div id="history-view" className="view-section">
      <header className="history-header">
        <h1 className="history-title">Query history</h1>
        <p className="history-subtitle">
          Your past questions and crop advisories.
        </p>
      </header>

      <div className="history-list">
        {historyItems.map((item) => (
          <div key={item.id} className="history-card">
            <div className="history-card-header">
              <div className="history-card-content">
                <h3 className="query-question">{item.question}</h3>
                <p className="query-answer">{item.answer}</p>
              </div>
              <div className="history-card-meta">
                <span className="query-date">{item.date}</span>
                <RiArrowDownSLine className="chevron-icon" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
