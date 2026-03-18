import React, { useState } from "react";
import SectionList from "./SectionList";
import { TopBarIcons } from "../assets/icons/topBarIcons";
import EmptyList from "./components/EmptyList";
import { useBackNavigation } from "../hooks/useBackNavigation";
import { useGiftCards } from "../hooks/useGiftCards";
function GiftCardMarket() {
  const [active, setActive] = useState(0);
  const [query, setQuery] = useState("");
  const goBack = useBackNavigation();
  const { marketCards, categories } = useGiftCards();

  const filters = categories.length > 0 ? categories : ["All"];
  const activeFilter = filters[active] || "All";
  const normalizedQuery = query.trim().toLowerCase();

  const filteredCards = marketCards.filter((card) => {
    const matchQuery =
      normalizedQuery.length === 0 ||
      card.name.toLowerCase().includes(normalizedQuery) ||
      card.category.toLowerCase().includes(normalizedQuery);

    const matchCategory =
      activeFilter === "All" || card.category === activeFilter;

    return matchQuery && matchCategory;
  });

  const list = [
    {
      title: `Available Cards (${filteredCards.length})`,
      data: filteredCards,
    },
  ];

  return (
    <section className="gift-card-market">
      <header className="card-market-header">
        <button onClick={goBack}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <h3>Buy a Gift Card</h3>
      </header>
      <div className="market-body">
        <div className="search-bar">
          {TopBarIcons.search}
          <input
            type="search"
            name="search"
            id="giftcard-search"
            placeholder="Search brands or categories"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className="filter">
          {filters.map((filter, index) => (
            <button
              className={active === index ? "active" : ""}
              key={filter}
              onClick={() => setActive(index)}
            >
              {filter}
            </button>
          ))}
        </div>
        {filteredCards.length > 0 ? <SectionList list={list} /> : <EmptyList />}
      </div>
    </section>
  );
}

export default GiftCardMarket;
