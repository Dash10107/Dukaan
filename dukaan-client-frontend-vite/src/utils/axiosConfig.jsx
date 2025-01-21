export const base_url = "https://digic-backend.vercel.app/api";
// export const base_url = "http://localhost:4000/api";
export const x_api_key = "2d0e3d3440f227bf159bb1fd85c86d92426b2953eb258e794f496b79c5b1b597"

const getTokenFromLocalStorage =  localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : null;


export const config = {
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage : ""}`,
    Accept: "application/json",
  },
};

console.log(config);