import React, { useEffect, useState } from "react";
import SectionList from "./SectionList";
import { TopBarIcons } from "../assets/icons/topBarIcons";
import { cards } from "../../test";
import { Link, useNavigate } from "react-router-dom";
import EmptyList from "/src/app/components/EmptyList";
function GiftCardMarket() {
  const [active, setActive] = useState(0);
  const [back, setBack] = useState(false);
  const navigate = useNavigate();
  const filters = [
    "Sports",
    "Digital",
    "Gaming",
    "Experience",
    "Travel",
    "Entertainment",
    "Restaurant",
    "Retail",
  ];

  useEffect(() => {
    if (back) {
      navigate(-1);
    }
  }, [navigate, back]);
  return (
    <section className='gift-card-market'>
      <header className='card-market-header'>
        <button onClick={() => setBack(true)}>
          <i className='fas fa-chevron-left'></i>
        </button>
        <h3>Buy a Gift Card</h3>
      </header>
      <div className='market-body'>
        <div className='search-bar'>
          {TopBarIcons.search}
          <input type='search' name='' id='' placeholder='Search brands' />
        </div>
        <div className='filter'>
          {filters.map((filter, index) => (
            <button
              className={active === index ? "active" : ""}
              key={index}
              onClick={() => setActive(index)}
            >
              {filter}
            </button>
          ))}
        </div>
        {cards.length > 0 ? <SectionList list={cards} /> : <EmptyList />}
      </div>
    </section>
  );
}

export default GiftCardMarket;
