'use client';

import { useState, useEffect } from 'react';
import './valentine.css';

export default function ValentinePage() {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [yesScale, setYesScale] = useState(1);
  const [accepted, setAccepted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [hearts, setHearts] = useState<
    { id: number; x: number; delay: number; isDog: boolean; size: number }[]
  >([]);
  const [showConfetti, setShowConfetti] = useState(false);

  // Your 10 images - compressed for fast loading!
  const images = [
    '/images/IMG_0095_compressed.jpg',
    '/images/IMG_0222_compressed.jpg',
    '/images/IMG_0831_compressed.jpg',
    '/images/IMG_1187_compressed.jpg',
    '/images/IMG_3609_compressed.jpg',
    '/images/IMG_4110_compressed.jpg',
    '/images/IMG_4355_compressed.jpg',
    '/images/IMG_4527_compressed.jpg',
    '/images/IMG_7453_compressed.jpg',
    '/images/IMG_7636_compressed.jpg',
  ];

  // Cycle through images (pause on hover)
  useEffect(() => {
    if (!accepted && !isHovering) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [accepted, isHovering, images.length]);

  // Generate floating hearts and dogs
  useEffect(() => {
    const newHearts = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      isDog: i % 3 === 0, // Every 3rd one is a dog!
      size: Math.random() * 30 + 25, // Random size between 25-55px
    }));
    setHearts(newHearts);
  }, []);

  // Make the "No" button run away!
  const handleNoHover = () => {
    const maxX = 200;
    const maxY = 200;
    setNoButtonPosition({
      x: (Math.random() - 0.5) * maxX,
      y: (Math.random() - 0.5) * maxY,
    });
    // Make Yes button bigger each time!
    setYesScale((prev) => Math.min(prev + 0.2, 2.5));
  };

  const handleYesClick = () => {
    setAccepted(true);
    setShowConfetti(true);
  };

  if (accepted) {
    return (
      <div className="valentine-page accepted-page">
        {/* Confetti explosion */}
        <div className="confetti-container">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                backgroundColor: [
                  '#ff69b4',
                  '#ff1493',
                  '#ffb6c1',
                  '#ff6b9d',
                  '#ffc0cb',
                  '#e91e8e',
                  '#ff85a2',
                ][Math.floor(Math.random() * 7)],
              }}
            />
          ))}
        </div>

        {/* Big celebration */}
        <div className="celebration-content">
          <div className="big-heart-container">
            <span className="mega-heart">💕</span>
          </div>
          <h1 className="celebration-title">YAAAY! 🎉💖</h1>
          <p className="celebration-text">
            You just made me the happiest person ever!
          </p>
          <div className="celebration-emoji-row">
            <span className="bounce-emoji">😍</span>
            <span className="bounce-emoji">💕</span>
            <span className="bounce-emoji">🥰</span>
            <span className="bounce-emoji">💘</span>
            <span className="bounce-emoji">✨</span>
          </div>
          <div className="photo-gallery">
            {images.map((img, i) => (
              <div
                key={i}
                className="gallery-photo"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <img src={img} alt={`Memory ${i + 1}`} />
              </div>
            ))}
          </div>
          <p className="love-message">
            I can&apos;t wait to spend Valentine&apos;s Day with you! 💝
          </p>
        </div>

        {/* Floating hearts and dogs background */}
        <div className="hearts-bg">
          {Array.from({ length: 30 }).map((_, i) =>
            i % 4 === 0 ? (
              <img
                key={i}
                src="/images/dog.jpg"
                alt="Cute doggo"
                className="float-heart float-dog"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  width: `${Math.random() * 40 + 30}px`,
                  height: `${Math.random() * 40 + 30}px`,
                }}
              />
            ) : (
              <span
                key={i}
                className="float-heart"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  fontSize: `${Math.random() * 30 + 15}px`,
                }}
              >
                {
                  ['💕', '💗', '💖', '❤️', '💘', '💝'][
                    Math.floor(Math.random() * 6)
                  ]
                }
              </span>
            ),
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="valentine-page">
      {/* Floating hearts and dogs background */}
      <div className="hearts-bg">
        {hearts.map((heart) =>
          heart.isDog ? (
            <img
              key={heart.id}
              src="/images/dog.jpg"
              alt="Cute doggo"
              className="float-heart float-dog"
              style={{
                left: `${heart.x}%`,
                animationDelay: `${heart.delay}s`,
                width: `${heart.size}px`,
                height: `${heart.size}px`,
              }}
            />
          ) : (
            <span
              key={heart.id}
              className="float-heart"
              style={{
                left: `${heart.x}%`,
                animationDelay: `${heart.delay}s`,
              }}
            >
              💕
            </span>
          ),
        )}
      </div>

      {/* Sparkles */}
      <div className="sparkles">
        {Array.from({ length: 15 }).map((_, i) => (
          <span
            key={i}
            className="sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            ✨
          </span>
        ))}
      </div>

      {/* Main content */}
      <div className="main-content">
        {/* Cute photo showcase */}
        <div className="photo-showcase">
          <div className="photo-frame">
            <img
              src={images[currentImageIndex]}
              alt="Cute photo"
              className="showcase-photo"
            />
            <div className="photo-hearts">
              <span className="photo-heart left">💕</span>
              <span className="photo-heart right">💕</span>
            </div>
          </div>
          {/* Thumbnail strip - hover to see each photo */}
          <div className="thumbnail-strip">
            {images.map((img, i) => (
              <div
                key={i}
                className={`thumbnail ${currentImageIndex === i ? 'active' : ''}`}
                onMouseEnter={() => {
                  setIsHovering(true);
                  setCurrentImageIndex(i);
                }}
                onMouseLeave={() => setIsHovering(false)}
              >
                <img src={img} alt={`Photo ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* The big question */}
        <div className="question-section">
          <div className="title-container">
            <span className="title-heart left-heart">💘</span>
            <h1 className="main-title">
              Will You Be My
              <span className="valentine-text"> Valentine?</span>
            </h1>
            <span className="title-heart right-heart">💘</span>
          </div>

          <p className="subtitle">Pretty please? 🥺👉👈</p>

          {/* Buttons */}
          <div className="buttons-container">
            <button
              className="yes-button"
              onClick={handleYesClick}
              style={{ transform: `scale(${yesScale})` }}
            >
              Yes! 💖
            </button>

            <button
              className="no-button"
              onMouseEnter={handleNoHover}
              onTouchStart={handleNoHover}
              style={{
                transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
              }}
            >
              No 😢
            </button>
          </div>

          <p className="hint-text">(Psst... the No button is a bit shy 😏)</p>
        </div>
      </div>

      {/* Bottom decorations */}
      <div className="bottom-decoration">
        <span>🌸</span>
        <span>💕</span>
        <span>🌸</span>
        <span>💕</span>
        <span>🌸</span>
      </div>
    </div>
  );
}
