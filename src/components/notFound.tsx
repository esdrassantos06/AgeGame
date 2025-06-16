import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFoundPage() {
  const t = useTranslations("NotFound");

  return (
    <main className="flex flex-col items-center justify-center w-full min-h-screen p-8 bg-background text-foreground">
      <h1 className="text-6xl font-extrabold mb-4">{t("title")}</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-xl text-center">
        {t("message")}
      </p>
      <Button asChild>
        <Link href={"/"}>{t("buttonBackHome") ?? "Go back home"}</Link>
      </Button>
    </main>
  );
}
