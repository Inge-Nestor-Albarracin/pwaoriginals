"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCountdown, setIsCountdown] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (isCountdown) {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        }

        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, isCountdown]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const startNormalTimer = () => {
    setIsCountdown(false);
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsCountdown(false);
    setSeconds(0);
  };

  const startFrenchPress = () => {
    setSeconds(120);
    setIsCountdown(true);
    setIsRunning(true);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white p-6">
      <section className="w-full max-w-md bg-zinc-900 rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold mb-6">Cronómetro</h1>

        <div className="text-7xl font-mono mb-8">
          {formatTime(seconds)}
        </div>

        <div className="flex gap-3 justify-center mb-8">
          <button
            onClick={startNormalTimer}
            className="px-5 py-2 rounded-xl bg-green-600 hover:bg-green-700"
          >
            Iniciar
          </button>

          <button
            onClick={pauseTimer}
            className="px-5 py-2 rounded-xl bg-yellow-600 hover:bg-yellow-700"
          >
            Pausar
          </button>

          <button
            onClick={resetTimer}
            className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700"
          >
            Reiniciar
          </button>
        </div>

        <div className="border-t border-zinc-700 pt-5">
          <p className="mb-3 text-zinc-300">
            Barra rápida
          </p>

          <button
            onClick={startFrenchPress}
            className="w-full py-3 rounded-xl bg-amber-700 hover:bg-amber-800 font-semibold"
          >
            Café en prensa francesa - 2 minutos
          </button>
        </div>
      </section>
    </main>
  );
}