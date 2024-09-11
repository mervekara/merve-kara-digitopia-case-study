"use client";

import { ComponentType, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useLocale } from "next-intl";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithAuthComponent = (props: P) => {
    const router = useRouter();
    const locale = useLocale();

    const { accessToken } = useAuth();

    useEffect(() => {
      if (!accessToken) {
        router.push(`/${locale}/login`);
      }
    }, [accessToken, locale, router]);

    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
};

export default withAuth;
