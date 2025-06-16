import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useTranslations } from "next-intl";

export default function Age({
  age,
  setAge,
  disabled,
}: {
  age: string;
  setAge: (age: string) => void;
  disabled?: boolean;
}) {
  const t = useTranslations("HomePage");

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="age">{t("labelAge")}</Label>
      <Input
        disabled={disabled}
        value={age}
        onChange={(e) => setAge(e.target.value)}
        name="age"
        placeholder={t("placeholderAge")}
      />
    </div>
  );
}
