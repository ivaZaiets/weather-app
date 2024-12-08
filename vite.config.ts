import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// Завантажує .env файл
dotenv.config();

console.log("VITE_APP_ID:", process.env.VITE_APP_ID); // Перевірка значення змінної

export default defineConfig({
  plugins: [react()],
  base: "/weather-app/",
  define: {
    "process.env": process.env, // Додає змінні середовища у проєкт
  },
});
