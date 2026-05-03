import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import "./App.css";

import musicFile from "./music/МОТ_Когда_мужчина_влюблён_Премьера_клипа,_2024.mp3";

import play from "./img/circle-play-regular-full.svg";
import pause from "./img/circle-pause-regular-full.svg";

import restaurant from "./img/L_height.webp";

import married from "./img/360_F_198831835_o8OtnyAyRIInLOWaPO410L0YuZOL4wLj.jpg";
import groom from "./img/360_F_1342942305_I2u6JyECgnfLECvVzRTfqlcOX1nVA6hW.jpg";
import date from "./img/il_fullxfull.7003015888_burb.webp";
import two from "./img/two.jpg";

function App() {
  const [timeLeft, setTimeLeft] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // 💍 27 AVGUST 2026 18:00
  const weddingDate = useMemo(
      () => new Date(2026, 7, 27, 18, 0, 0).getTime(),
      []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance < 0) return;

      setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((distance / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((distance / (1000 * 60)) % 60));
      setSeconds(Math.floor((distance / 1000) % 60));
    }, 1000);

    return () => clearInterval(interval);
  }, [weddingDate]);

  // 🎵 MUSIC TOGGLE (ADDED ONLY FIX)
  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
      <div className="app">

        {/* AUDIO (UNCHANGED STRUCTURE) */}
        <audio ref={audioRef} loop>
          <source src={musicFile} type="audio/mp3" />
        </audio>

        {/* HERO */}
        <section className="hero">
          <div className="hero_text">
            <h1>Bahodir</h1>
            <span>&</span>
            <h1>Mahliyo</h1>

            <div className="hero_div"></div>

            <p className="date">27 AVGUST 2026</p>
          </div>

          {/* 🎵 ONLY MUSIC BUTTON ADDED LOGIC */}

        </section>

        {/* INVITATION */}
        <motion.section className="section invitation">
          <div className="music_btn" onClick={toggleMusic}>
            <motion.img
                src={isPlaying ? pause : play}
                alt="music"
                className="music_icon"
                whileTap={{ scale: 0.9 }}
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 0.5 }}
            />
          </div>
          <h2 className="inv_title">TO‘Y TAKLIFNOMASI</h2>

          <p className="inv_text">
            <span className="gold">Assalomu alaykum!</span> <br/>
            Hurmatli mehmonimiz! <br/>
            Sizni nikoh to‘yimiz munosabati bilan
            bo‘lib o‘tadigan <span className="gold">"Visol oqshomi"</span>ga
            taklif etamiz.
          </p>

          <img className="inv_img" src={married} alt="" />

          <div className="dates">
            <h4 className="inv_date">27.08.2026</h4>
            <h4 className="inv_date">Soat: 18:00</h4>
            <h4 className="inv_date">Manzil: "Versal" to'yxonasi</h4>
          </div>

        </motion.section>

        {/* CALENDAR */}
        <section className="section calendar_section">

          <h2 className="cal_title">WEDDING DATE</h2>

          <img className="cal_image" src={groom} alt="" />

          <div className="calendar_card">

            <div className="cal_header">AUGUST 2026</div>

            <div className="cal_grid">

              {["Sha","Yak","Du","Se","Cho","Pa","Ju"].map(d => (
                  <div key={d} className="cal_day_name">{d}</div>
              ))}

              {Array.from({ length: 31 }, (_, i) => (
                  <div
                      key={i}
                      className={i + 1 === 27 ? "active_day" : "cal_day"}
                  >
                    {i + 1}
                  </div>
              ))}

            </div>
          </div>
        </section>

        {/* COUNTDOWN */}
        <motion.section className="section countdown_section">

          <h2 className="inv_title">TO‘YGACHA</h2>

          <img className="date_sec" src={date} alt=""/>

          <div className="time_boxes">

            <div className="time_box_item">
              <div className="time_value">{days}</div>
              <div className="time_label">Kun</div>
            </div>

            <div className="time_box_item">
              <div className="time_value">{hours}</div>
              <div className="time_label">Soat</div>
            </div>

            <div className="time_box_item">
              <div className="time_value">{minutes}</div>
              <div className="time_label">Minut</div>
            </div>

            <div className="time_box_item">
              <div className="time_value">{seconds}</div>
              <div className="time_label">Sekund</div>
            </div>

          </div>

        </motion.section>

        {/* LOCATION */}
        <section className="section">
          <h2>Versal to‘yxonasi</h2>

          <img src={restaurant} alt="" className="restaurant" />

          <iframe
              className="maps"
              title="map"
              src="https://www.google.com/maps?q=Versal%20to'yxonasi%20Toshkent&output=embed"
          />

          <button
              onClick={() =>
                  window.open("https://www.google.com/maps?q=Versal+to'yxonasi+Toshkent")
              }
          >
            Open Map
          </button>
        </section>

        <section className="section timeline_section">

          <h2 className="timeline_title">TO‘Y DASTURI</h2>

          <div className="timeline_cards">

            {[
              ["17:00","Mehmonlar kutib olish"],
              ["18:00","Boshlanish"],
              ["19:00","Nikoh marosimi"],
              ["20:00","Dastur"],
              ["22:00","Tort kesish 🎂"]
            ].map(([time, text], i) => (
                <div key={i} className="event_card">

                  <div className="event_time">{time}</div>

                  <div className="event_text">{text}</div>

                </div>
            ))}

          </div>

        </section>

        {/* FOOTER */}
        <section className="footer">
          <h1>Bahodir & Mahliyo</h1>

          <img src={two} className="two" alt="" />

          <p>Sizni kutamiz ❤️</p>
        </section>

      </div>
  );
}

export default App;