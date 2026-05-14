import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import "./App.css";

import musicFile from "./music/oshiq.m4a";

import play from "./img/circle-play-regular-full.svg";
import pause from "./img/circle-pause-regular-full.svg";

import {  AnimatePresence } from "framer-motion";


import restaurant from "./img/L_height.webp";
import married from "./img/360_F_198831835_o8OtnyAyRIInLOWaPO410L0YuZOL4wLj.jpg";
import groom from "./img/360_F_1342942305_I2u6JyECgnfLECvVzRTfqlcOX1nVA6hW.jpg";
import date from "./img/il_fullxfull.7003015888_burb.webp";
import two from "./img/two.jpg";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

const [showIntro, setShowIntro] = useState(true);


  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

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

          <AnimatePresence>
              {showIntro && (
                  <motion.div
                      className="intro"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                  >
                      <motion.div
                          className="intro_wrapper"
                          initial={{ opacity: 0, scale: 0.9, y: 40 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 1 }}
                      >

                          <div className="intro_top_glow"></div>

                          <div className="intro_img_box">
                              <div className="intro_img_border">
                                  <div className="intro_ring"></div>
                              </div>
                          </div>

                          <p className="intro_sub">
                            To'yga Taklifnoma
                          </p>

                          <h1 className="intro_names">
                              Bahodir <span>&</span> Mahliyo
                          </h1>

                          <div className="intro_line"></div>

                          <p className="intro_date">
                              27 • AUGUST • 2026
                          </p>

                          <motion.button
                              className="enter_btn_new"
                              whileHover={{ scale: 1.06 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setShowIntro(false)}
                          >
                              <span>Taklifnomani Oching</span>
                          </motion.button>

                      </motion.div>
                  </motion.div>
              )}
          </AnimatePresence>



          {/* AUDIO */}
        <audio ref={audioRef} loop>
          <source src={musicFile} type="audio/mp3" />
        </audio>

        {/* HERO */}
        <section className="hero">
          <motion.div
              className="hero_text"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1 }}
          >
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              Bahodir
            </motion.h1>

            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              &
            </motion.span>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
              Mahliyo
            </motion.h1>

            <motion.div
                className="hero_div"
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 1 }}
            />

            <motion.p
                className="date"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
            >
              27 AVGUST 2026
            </motion.p>
          </motion.div>
        </section>

        {/* INVITATION */}
        <motion.section
            className="section invitation"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
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
            <span className="gold">Assalomu alaykum!</span><br />
            Hurmatli mehmonimiz! <br />
            Sizni nikoh to'yimiz munosabati bilan
            bo'lib o'tadigan <span className="gold">"Visol oqshomi"</span>ga <br/>   taklif etamiz.



          </p>

          <motion.img
              className="inv_img"
              src={married}
              alt=""
              whileHover={{ scale: 1.05 }}
          />

          <div className="dates">
            <h4 className="inv_date">27.08.2026</h4>
            <h4 className="inv_date">18:00</h4>
            <h4 className="inv_date">"Versal" to'yxonasi</h4>
          </div>
        </motion.section>

        {/* CALENDAR */}
        <motion.section
            className="section calendar_section"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="cal_title">WEDDING DATE</h2>

          <motion.img
              className="cal_image"
              src={groom}
              alt=""
              whileHover={{ scale: 1.05 }}
          />

          <div className="calendar_card">
            <div className="cal_header">AUGUST 2026</div>

            <div className="cal_grid">
              {["Sha","Yak","Du","Se","Cho","Pa","Ju"].map(d => (
                  <div key={d} className="cal_day_name">{d}</div>
              ))}

              {Array.from({ length: 31 }, (_, i) => (
                  <motion.div
                      key={i}
                      className={i + 1 === 27 ? "active_day" : "cal_day"}
                      whileHover={{ scale: 1.2 }}
                  >
                    {i + 1}
                  </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* COUNTDOWN */}
        <motion.section
            className="section countdown_section"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="inv_title">TO‘YGACHA</h2>

          <img className="date_sec" src={date} alt=""/>

          <div className="time_boxes">
            {[days, hours, minutes, seconds].map((val, i) => (
                <motion.div
                    key={i}
                    className="time_box_item"
                    whileHover={{ scale: 1.1 }}
                >
                  <div className="time_value">{val}</div>
                  <div className="time_label">
                    {["Kun","Soat","Minut","Sekund"][i]}
                  </div>
                </motion.div>
            ))}
          </div>
        </motion.section>

        {/* LOCATION */}
        <motion.section
            className="section"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
        >
          <h2>Versal to‘yxonasi</h2>

          <motion.img
              src={restaurant}
              alt=""
              whileHover={{ scale: 1.05 }}
          />

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
        </motion.section>

        {/* TIMELINE */}
        <motion.section
            className="section timeline_section"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="timeline_title">TO‘Y DASTURI</h2>

          <div className="timeline_cards">
            {[
              ["17:00","Mehmonlar"],
              ["18:00","Boshlanish"],
              ["19:00","Nikoh"],
              ["20:00","Dastur"],
              ["22:00","Tort 🎂"]
            ].map(([time, text], i) => (
                <motion.div
                    key={i}
                    className="event_card"
                    whileHover={{ scale: 1.08 }}
                >
                  <div className="event_time">{time}</div>
                  <div className="event_text">{text}</div>
                </motion.div>
            ))}
          </div>
        </motion.section>

        {/* FOOTER */}
        <motion.section
            className="footer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
        >
          <h1>Bahodir & Mahliyo</h1>

          <motion.img
              src={two}
              className="two"
              whileHover={{ scale: 1.05 }}
          />

          <p>Sizni kutamiz ❤️</p>
          <p>+998 99 999 99 99</p>


        </motion.section>

      </div>
  );
}

export default App;