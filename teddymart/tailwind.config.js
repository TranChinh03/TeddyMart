/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        0.1: "0.1rem",
        15: "1rem",
      },
      colors: {
        main_bg: "#f5f5f5",
        main_form: "#ffffff",
        btn_main_bg: "#e6a247",
        btn_second_bg: "#211f30",
        sidebar: "#207ca3",
        highlight_sidebar: "#64a4bf",
        hover: "#cee8f5",
        txt_main_color: "#000000de",
        txt_mediumgrey: "#888",
        txt_lightgrey: "#9a9a9a",
        txt_white: "#fff",
        message_success: "#51a351",
        checkbox_bg: "#f34334",
      },

      fontSize: {
        12: "12px",
        13: "13px",
        14: "14px",
        17: "17px",
        19: "19px",
        20: "20px",
        2.2: "2.2rem",
      },

      fontFamily: {
        roboto: ["Roboto", "Helvetica Neue", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
