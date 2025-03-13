import request from "@/util/request";
import type {CustomAxiosRequestConfig} from "@/util/request";

export const loginService = (query: any) => {
  return request({
        url: "/user/login",
        method: "get",
        data: query,
        noToken: true,
  } as CustomAxiosRequestConfig);
};

export const registerService = (query: any) => {
  return request({
        url: "/user/register",
        method: "post",
        data: query,
        noToken: true,
  } as CustomAxiosRequestConfig);
}