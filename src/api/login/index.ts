import request from "@/util/request";
import type {CustomAxiosRequestConfig} from "@/util/request";

export const loginService = (query: any) => {
  return request({
        url: "/login",
        method: "post",
        data: query,
        noToken: true,
  } as CustomAxiosRequestConfig);
};

export const registerService = (query: any) => {
  return request({
        url: "/register",
        method: "post",
        data: query,
        noToken: true,
  } as CustomAxiosRequestConfig);
}