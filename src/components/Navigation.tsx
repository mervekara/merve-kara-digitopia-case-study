import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

export default function Navigation() {
  const t = useTranslations("Home");
  const locale = useLocale();

  const navigationKeys = Object.keys(t.raw("navigation"));

  return (
    <nav className="sm:flex items-center justify-center ">
      <ul className="top-8 flex items-center space-x-5">
        {navigationKeys.map((key) => (
          <li key={key} className="animate pop delay-1">
            <Link className="text-gray-800 hover:text-blue-600 transition-colors duration-300 sm:text-sm" href={`/${locale}/${key}`}>{t(`navigation.${key}`)}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
