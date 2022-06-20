import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// Возвращает ответ на запрос регистрации
const register = (email, name, password) => {
   return axios.post(API_URL + "api/auth/registration", {
      email,
      name,
      password,
   },
   {headers: {'Content-Type': 'application/json'}});
};

// проверка на регистрацию пользователя. 
// Если в ответе есть токен, то сохранить данные(token, userId) в localStorage
// Вернуть данные (token, userId)
const login = async(email, password) => {
   return axios.post(API_URL + "api/auth/login", {
      email,
      password,
   })
   .then((response) => {
      if (response.data.token) {
         localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
   })
};

// Очистить localStorage от данных (token, userId)
const logout = () => {
   localStorage.removeItem("user");
};

const isAuth = (status) => {
   if(status === 401 && localStorage.getItem('user') !== null){
      logout()
      alert("Время аторизации истекло!")
      return true;
   }
   return false;
}

const changeLocalStorageAvatar = (img) => {
   if(localStorage.getItem('user') !== null){
      let authData = JSON.parse(localStorage.getItem("user"));
      localStorage.setItem('user', JSON.stringify({...authData, imgUrlAvatar: img}))
   }
}

const authService = {
  register,
  login,
  logout,
  isAuth,
  changeLocalStorageAvatar
};


export default authService;