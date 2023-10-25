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
        message_success: "#51a351",
        checkbox_bg: "#f34334",
        black: "#000",
        white: "#fff",
        light_grey: "#d2d2d2",
        purple: "#6574c4",
        light_purple: "#3d4b98",
        extreme_lg_grey: "#f5f5f5",
        extra_gray: "#888888",
        medium_lg_grey: "#f3f3f3",
      },
      fontSize: {
        12: "12px",
        13: "13px",
        14: "14px",
        17: "17px",
        19: "19px",
        20: "20px",
        2.2: "2.2rem",
        10: "10px",
      },
      fontFamily: {
        roboto: ["Roboto", "Helvetica Neue", "Arial", "sans-serif"],
      },
      borderWidth: {
        1.5: "1.5px",
      },
    },
  },
  plugins: [],
};
