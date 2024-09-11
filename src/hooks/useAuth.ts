"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { getCookie, deleteCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { JwtDecoded } from "@/types/types";
import { setAuthData } from "../features/authSlice";
import { useLocale } from "next-intl";

export const useAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const locale = useLocale();
  const accessToken = getCookie("accessToken") as string;
  const idToken = getCookie("idToken") as string;

  useEffect(() => {
    if (!accessToken || !idToken) {
      router.push(`/${locale}/login`);
      return;
    }

    try {
      const decodedToken = jwtDecode<JwtDecoded>(idToken);
      dispatch(
        setAuthData({
          accessToken: accessToken as string,
          decodedToken: decodedToken,
        }),
      );
    } catch (error) {
      console.error("Token decoding failed:", error);
      deleteCookie("accessToken");
      deleteCookie("idToken");
      router.push(`/${locale}/login`);
    }
  }, [dispatch, router, locale, accessToken, idToken]);

  console.log(accessToken);

  return { accessToken };
};
