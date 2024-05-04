import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        // console.log(`Setting up axios interceptors ${auth?.accessToken}`);
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
              if (!config.headers['Authorization']) {
                if (auth?.accessToken) {
                  config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                  config.withCredentials = true;
                  console.log(`Setting up axios ${auth?.accessToken}`);
                //   alert(`Setting up axios ${auth?.accessToken}`);
                }
              }
              return config;
            },
            (error) => Promise.reject(error)
          );
          const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
              console.log(`errorrrrrrrr ${error}`);
              const prevRequest = error?.config;
              console.log('prevRequest:', prevRequest);
              console.log('prevRequest.sent:', prevRequest?.sent);
              console.log('error.response:', error.response);
              console.log('error.response.status:', error.response?.status);
                // alert(error?.response?.status === 401)
                // alert(!prevRequest?.sent)
              if (error?.response?.status === 401 && !prevRequest?.sent) {
                console.log('Refreshing access token...');
                prevRequest.sent = true;
                const newAccessToken = await refresh();
                console.log("newAccessToken", newAccessToken);
                prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axiosPrivate(prevRequest);
              }
          
              return Promise.reject(error);
            }
          );
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth])

    return axiosPrivate;
}

export default useAxiosPrivate;