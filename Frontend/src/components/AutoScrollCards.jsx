import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "../styles/AutoScrollCards.css"; 

const AutoScrollCards = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const cardData = [
    {
      id: 1,
      img: "/images/card1.jpg",
      title: "Feed Homeless Dogs",
      description:
        "Providing food and shelter to animals in need. Many stray dogs suffer from hunger and harsh weather conditions. Your donation ensures they receive proper nutrition and care, helping them lead healthier lives.",
      raised: 7500,
      goal: 12000,
      welfare: "ACF",
    },
    {
      id: 2,
      img: "/images/card2.jpg",
      title: "Animals Rights",
      description:
        "Supporting animal rights in Pakistan. Stray and domestic animals often face cruelty and neglect. This campaign aims to raise awareness, promote humane treatment, and advocate for stronger animal protection laws.",
      raised: 9800,
      goal: 15000,
      welfare: "Pak Animal Welfare",
    },
    {
      id: 3,
      img: "/images/card3.jpg",
      title: "Injured Dog",
      description:
        "Funds required for operation of injured dog. A stray dog has suffered severe injuries and requires urgent medical attention. Your support will cover surgery, medication, and post-operative care to ensure a full recovery.",
      raised: 6200,
      goal: 10000,
      welfare: "PCF Rescue",
    },
    {
      id: 4,
      img: "/images/card4.jpg",
      title: "Shelter for street cats and dogs",
      description:
        "Helping homeless animals find shelters. Many stray cats and dogs roam the streets with no place to call home. This initiative helps provide them with safe shelters, food, and medical aid to improve their well-being.",
      raised: 5000,
      goal: 9000,
      welfare: "Animal Care Center",
    },
  ];

  return (
    <motion.section
      ref={ref}
      className="auto-scroll-section"
      initial={{ opacity: 0, y: 100 }} // Start from bottom
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h3
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="scrollsection-h3"
      >
        OUR CAUSES
      </motion.h3>
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="section-heading"
      >
        Our Causes and Rescue Cases
      </motion.h2>

      <Swiper
        modules={[Autoplay]}
        slidesPerView={3}
        spaceBetween={30}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {cardData.map((card, index) => (
          <SwiperSlide key={card.id}>
            <motion.div
              className="campaign-card"
              initial={{ opacity: 0, y: 50 }} // Animate each card
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
            >
              <img src={card.img} alt={card.title} className="campaign-image" />
              <span className="welfare-name">{card.welfare}</span>
              <h3 className="compaign-heading">{card.title}</h3>
              <p className="compaign-description">{card.description}</p>

              {/* Progress Bar */}
              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{ width: `${(card.raised / card.goal) * 100}%` }}
                >
                  {Math.round((card.raised / card.goal) * 100)}%
                </div>
              </div>

              {/* Raised & Goal Amounts */}
              <div className="funds-info">
                <span className="raised">
                  Raised: <strong>${card.raised.toLocaleString()}</strong>
                </span>
                <span className="goal">
                  Goal: <strong>${card.goal.toLocaleString()}</strong>
                </span>
              </div>

              {/* Donate Button */}
              <button className="cardsdonate-btn">Donate Now</button>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.section>
  );
};

export default AutoScrollCards;
