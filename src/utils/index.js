import axios from "axios";
export const APP_URL = "http://localhost:5001/api";

export const getEvents = async () => {
  try {
    const response = await axios.get(`${APP_URL}/events/get-all`);
    console.log(response.data);
    return await response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getGoogleSignUp = async (accessToken) => {
  try {
    const user = await axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => res.data);

    if (user?.sub) {
      const data = {
        fullName: user.name,
        email: user.email,
        authProvider: user.email_verified,
      };
      const result = await axios.post(`${APP_URL}/users/sign-up`, data);

      console.log(result);
      return result?.data;
    }
  } catch (error) {
    const err = error?.response?.data || error?.response;
    console.log(error);
    return err;
  }
};
