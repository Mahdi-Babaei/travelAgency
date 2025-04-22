/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["../**/*.{html,js}"],
  darkMode : "class",
  theme: {
    extend: {
      fontFamily: {
        "Rokh" : "Rokh",
        "RokhMedium" : "Rokh Medium",
        "RokhBold" : "Rokh Bold",
        "RokhNum" : "RokhFaNum",
        "IranSans" : "IranSans",
        "IranSansMedium" : "IranSans Medium",
        "IranSansBold" : "IranSans Bold"
      },
      container: {
        center : true,
        padding :{
          DEFAULT: "1rem",
          lg: "0.625rem"
        } 
      },
      backgroundImage: {
        "home-desktop": 'url("./../images/siteLanding.png")',
      },
    },
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
  },
  plugins: [
    function({addVariant}) {
      addVariant('child','& > *');
      addVariant('child-hover','& > *:hover');
    }
  ],
}

