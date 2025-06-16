"use client";
import Age from "@/components/Age";
import { BirthDate } from "@/components/BirthDate";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  validateBirthDateWithAge,
  isValidRomanNumeral,
} from "@/utils/validateBirthDateWithAge";
import romans from "romans";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Header from "@/components/Header";

export default function Home() {
  const [birthDate, setBirthDate] = useState<Date | undefined>();
  const [age, setAge] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const t = useTranslations("HomePage");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: string[] = [];

    if (!birthDate) {
      toast.error(t("errors.toastErrors.noBirthDate"));
      return;
    }

    const today = new Date();
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    if (birthDate > oneYearAgo) {
      toast.error(t("errors.toastErrors.birthDateTooRecent"));
    }

    if (!age) {
      toast.error(t("errors.toastErrors.noAge"));
      return;
    }

    if (age && !isValidRomanNumeral(age)) {
      newErrors.push(t("errors.toastErrors.invalidRomanNumeral"));
    }

    if (age && age !== age.toUpperCase()) {
      newErrors.push(t("errors.toastErrors.notCapitalized"));
    }

    if (birthDate && age && isValidRomanNumeral(age)) {
      const isValid = validateBirthDateWithAge(birthDate, age);
      if (!isValid) {
        try {
          const numericAge = romans.deromanize(age);
          if (numericAge === 1) {
            newErrors.push(t("errors.toastErrors.notMatchingAge1"));
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          } else {
            newErrors.push(
              t("errors.toastErrors.notMatchingAgeOther", { numericAge })
            );
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }
        } catch {
          newErrors.push(t("errors.toastErrors.invalidRomanFormat"));
        }
      }
    }

    if (newErrors.length > 0) {
      setErrors((prevErrors) => [...prevErrors, ...newErrors]);
      newErrors.forEach((msg) => toast.error(msg));
      return;
    }

    setErrors([]);
    toast.success(t("success"));
  };

  useEffect(() => {
    if (errors.length > 1) {
      setAge("");
    }
  }, [errors]);

  return (
    <>
      <Header />
      <main className="flex flex-col gap-10 items-center justify-center size-full">
        <div className="text-center">
          <h1 className="font-bold text-2xl">{t("title")}</h1>
          <p>{t("description")}</p>
        </div>
        <form
          id="myForm"
          onSubmit={handleSubmit}
          className="flex w-100 flex-col gap-4"
        >
          <div>
            <BirthDate
              disabled={errors.length > 1}
              onDateChange={setBirthDate}
            />
          </div>
          <div>
            <Age age={age} setAge={setAge} disabled={errors.length > 1} />
          </div>

          {errors.length > 1 && (
            <div className="flex flex-col items-start gap-4">
              <p className="text-red-500 text-center">
                {t("errors.textError")}
              </p>
              <Button asChild variant={"destructive"} className="w-full">
                <Link
                  onClick={() => setErrors([])}
                  href="https://en.wikipedia.org/wiki/Roman_numerals"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("study")} 🤬
                </Link>
              </Button>
            </div>
          )}

          <div>
            <Button
              variant={"outline"}
              disabled={errors.length > 1}
              className="w-full"
              type="submit"
            >
              {t("submitButton")}
            </Button>
          </div>
        </form>
      </main>
    </>
  );
}
