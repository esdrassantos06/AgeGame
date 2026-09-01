# Age - The Game

Pick your birth date, then type your age. In Roman numerals. Get it wrong and the app calls you names until you go study.

The game itself is thin on purpose: one page, a date picker, a text field, and a validator that checks the numeral parses, is uppercase, and actually matches the age implied by the birth date. What I was really after was Next.js 15 App Router with `next-intl` locale routing and theme switching on something that wasn't another todo list.

## Running it

Node 18.18+ or Bun.

```bash
bun install
bun run dev
```

Open http://localhost:3000. The middleware reads your `Accept-Language` and redirects to `/en` or `/pt`.

## Stack

Next.js 15 with Turbopack in dev, React 19, TypeScript, Tailwind 4, shadcn/ui on top of Radix. `next-intl` handles the locale segment and message loading, `romans` parses the numerals, `react-day-picker` is the calendar, `sonner` throws the error toasts.

## Where things are

- `src/app/[locale]/page.tsx` is the whole game
- `src/components/BirthDate.tsx` and `src/components/Age.tsx` are the two inputs
- `src/utils/validateBirthDateWithAge.ts` decides whether you get insulted
- `src/i18n/routing.ts` plus `src/middleware.ts` do locale detection and redirects
- `messages/en.json` and `messages/pt.json` hold every string, insults included

Not production software.
