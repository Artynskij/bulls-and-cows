# Design — Bulls and Cows

## 1. Структуры данных и алгоритмы

**Состояние** (`src/types.ts`): `GameState` содержит `settings`, `secret: string`,
`history: Attempt[]`, `status`, `startedAt`, `finishedAt`. Секрет — строка, а не число,
чтобы сохранять ведущие нули (`0123`). `Attempt` хранит `guess`, `bulls`, `cows`,
`timestamp` — результат лежит рядом с попыткой, история рендерится без пересчёта.
Обновление иммутабельно (`src/state/addAttempt.ts`): `history: [...state.history, attempt]`,
`{ ...state }`; повторная попытка возвращает тот же объект.

**`evaluateGuess`** (`src/core/evaluateGuess.ts`): обе строки приводятся к нижнему
регистру (hex). `bulls` — `filter` по позициям, где `guess[i] === secret[i]`.
`cows` — `filter` по позициям, где `guess[i] !== secret[i]` и `secret.includes(guess[i])`.
Условие `!==` не даёт посчитать цифру и как bull, и как cow.

**`countPossibleSecrets`** (`src/core/countPossibleSecrets.ts`): P(base, length) =
base! / (base − length)!. Рекурсия: `length === 0` → 1, `length > base` → 0, иначе
`base * f(length - 1, base - 1)`. Мемоизация в `Map<string, number>` с ключом
`"length:base"`; проверка `cached !== undefined`, потому что `0` — валидный результат.

## 2. Сложность (Big O)

- **`generateSecret`** — O(length · base): на каждой из `length` итераций `splice`
  сдвигает пул (O(base)); при `base ≤ 16` практически O(length).
- **`evaluateGuess`** — O(n²), n = длина: для каждой позиции вызывается
  `secret.includes`, что само O(n).
- **`isValidGuess`** — O(n): `every` по символам и построение `Set` — линейны.
- **`countPossibleSecrets`** — O(length) без кеша (глубина рекурсии), O(1) при
  попадании в кеш; память O(length) на стек и кеш.

## 3. Принципы чистого кода

- **Чистые функции** — `src/core/*.ts`: нет DOM, `localStorage`, `Math.random()`
  напрямую (`generateSecret` принимает `random` параметром).
- **Иммутабельность** — `src/state/addAttempt.ts` (`[...history, attempt]`),
  `src/state/records.ts` (`[...existing, entry].sort(...)`).
- **HOF** — `src/core/evaluateGuess.ts` (`filter`), `src/core/isValidGuess.ts`
  (`every`, `Set`).
- **Каррирование** — `src/core/createDigitValidator.ts`: `(base) => (char) => boolean`,
  используется в `src/core/isValidGuess.ts` и `src/ui/renderGame.ts`.
- **Мемоизация** — `src/core/countPossibleSecrets.ts` (`Map` с ключом `"length:base"`).
- **Рекурсия** — `src/core/countPossibleSecrets.ts`.
- **Разделение слоёв** — `src/core/` (логика), `src/state/` (состояние + localStorage),
  `src/ui/` (рендер через `document.createElement`, без `innerHTML`), `src/app.ts`
  (контроллер).
