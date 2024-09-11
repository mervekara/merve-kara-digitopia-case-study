"use client";

import LoginForm from "@/components/LoginForm";
import withAuth from "@/hoc/withAuth";
import { useTranslations } from "next-intl";

const Login = () => {
  const t = useTranslations("messages.Home");

  const loginTranslations = {
    title: t("login.title"),
    emailLabel: t("login.emailLabel"),
    passwordLabel: t("login.passwordLabel"),
    submitButton: t("login.submitButton"),
  };

  return (
    <div className="min-h-full flex items-center justify-center bg-gray-100 overflow-hidden">
      <LoginForm translations={loginTranslations} />
    </div>
  );
};

export default withAuth(Login);
