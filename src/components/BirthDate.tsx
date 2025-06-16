"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLocale, useTranslations } from "next-intl";
import { enUS, ptBR, Locale } from "date-fns/locale";

const localeMap: Record<string, Locale> = {
  en: enUS,
  "en-US": enUS,
  pt: ptBR,
  "pt-BR": ptBR,
};

function formatDate(date: Date | undefined, locale: string) {
  return date
    ? date.toLocaleDateString(locale, {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";
}

function isValidDate(date: Date | undefined) {
  return date instanceof Date && !isNaN(date.getTime());
}

export function BirthDate({
  onDateChange,
  disabled,
}: {
  onDateChange: (date: Date | undefined) => void;
  disabled?: boolean;
}) {
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const calendarLocale = localeMap[locale] ?? enUS;

  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  const today = new Date();

  const maxDate = new Date(today);
  maxDate.setFullYear(maxDate.getFullYear() - 1);

  const minDate = new Date(today);
  minDate.setFullYear(minDate.getFullYear() - 100);

  React.useEffect(() => {
    if (disabled) {
      setDate(undefined);
      onDateChange(undefined);
      setOpen(false);
    }
  }, [disabled, onDateChange]);

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date-picker" className="px-1">
        {t("labelBirth")}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            disabled={disabled}
            variant="outline"
            id="date-picker"
            className="w-full justify-between font-normal"
          >
            {date ? formatDate(date, locale) : t("placeholderBirth")}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="end">
          <Calendar
            locale={calendarLocale}
            mode="single"
            selected={date}
            captionLayout="dropdown"
            hidden={{ before: minDate, after: maxDate }}
            defaultMonth={maxDate}
            onSelect={(selectedDate) => {
              if (
                selectedDate &&
                isValidDate(selectedDate) &&
                selectedDate >= minDate &&
                selectedDate <= maxDate
              ) {
                setDate(selectedDate);
                onDateChange(selectedDate);
                setOpen(false);
              }
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
