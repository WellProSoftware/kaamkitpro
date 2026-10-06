"use client";

import { useState } from "react";

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");

  const generatePassword = () => {
    let characters = "";

    if (includeUppercase) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) characters += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) characters += "0123456789";
    if (includeSymbols) characters += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!characters) {
      setPassword("");
      return;
    }

    const randomValues = new Uint32Array(length);
    crypto.getRandomValues(randomValues);

    let result = "";

    for (let i = 0; i < length; i++) {
      result += characters[randomValues[i] % characters.length];
    }

    setPassword(result);
  };

  const copyPassword = async () => {
    if (!password) return;

    try {
      await navigator.clipboard.writeText(password);
    } catch {
      // Clipboard may be unavailable in some browsers.
    }
  };

  const passwordStrength =
    password.length >= 20 &&
    includeUppercase &&
    includeLowercase &&
    includeNumbers &&
    includeSymbols
      ? "Very Strong"
      : password.length >= 14 &&
          includeUppercase &&
          includeLowercase &&
          includeNumbers
        ? "Strong"
        : password.length >= 10
          ? "Medium"
          : "Weak";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
            KaamKitPro Tool
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Password Generator
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Generate strong random passwords instantly with custom length
            and character options.
          </p>
        </div>

        {/* Tool */}
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          {/* Password Output */}
          <div>
            <label
              htmlFor="generated-password"
              className="mb-3 block text-sm font-semibold text-slate-900"
            >
              Generated Password
            </label>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="generated-password"
                type="text"
                value={password}
                readOnly
                placeholder="Click Generate Password"
                className="min-w-0 flex-1 rounded-2xl border border-slate-300 bg-slate-50 px-5 py-4 font-mono text-base outline-none"
              />

              <button
                type="button"
                onClick={copyPassword}
                disabled={!password}
                className="rounded-2xl border border-slate-300 px-6 py-4 font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-400"
              >
                Copy
              </button>
            </div>

            {password && (
              <div className="mt-3 text-sm font-semibold text-slate-600">
                Strength:{" "}
                <span className="text-blue-600">
                  {passwordStrength}
                </span>
              </div>
            )}
          </div>

          {/* Length */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password-length"
                className="text-sm font-semibold text-slate-900"
              >
                Password Length
              </label>

              <span className="rounded-lg bg-blue-50 px-3 py-1 text-sm font-bold text-blue-600">
                {length}
              </span>
            </div>

            <input
              id="password-length"
              type="range"
              min="8"
              max="64"
              value={length}
              onChange={(event) => setLength(Number(event.target.value))}
              className="mt-4 w-full accent-blue-600"
            />

            <div className="mt-2 flex justify-between text-xs text-slate-400">
              <span>8</span>
              <span>64</span>
            </div>
          </div>

          {/* Options */}
          <div className="mt-8">
            <h2 className="text-sm font-semibold text-slate-900">
              Include Characters
            </h2>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 p-4 hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={(event) =>
                    setIncludeUppercase(event.target.checked)
                  }
                  className="h-5 w-5 accent-blue-600"
                />

                <span className="text-sm font-medium">
                  Uppercase Letters (A-Z)
                </span>
              </label>

              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 p-4 hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={includeLowercase}
                  onChange={(event) =>
                    setIncludeLowercase(event.target.checked)
                  }
                  className="h-5 w-5 accent-blue-600"
                />

                <span className="text-sm font-medium">
                  Lowercase Letters (a-z)
                </span>
              </label>

              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 p-4 hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(event) =>
                    setIncludeNumbers(event.target.checked)
                  }
                  className="h-5 w-5 accent-blue-600"
                />

                <span className="text-sm font-medium">
                  Numbers (0-9)
                </span>
              </label>

              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 p-4 hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(event) =>
                    setIncludeSymbols(event.target.checked)
                  }
                  className="h-5 w-5 accent-blue-600"
                />

                <span className="text-sm font-medium">
                  Symbols (!@#$...)
                </span>
              </label>
            </div>
          </div>

          {/* Generate */}
          <button
            type="button"
            onClick={generatePassword}
            className="mt-8 w-full rounded-2xl bg-blue-600 px-5 py-4 font-semibold text-white hover:bg-blue-700"
          >
            Generate Password
          </button>

          {/* Info */}
          <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
            <p className="text-sm leading-6 text-slate-600">
              Password generation happens directly in your browser.
              Your generated password is not sent to KaamKitPro.
            </p>
          </div>
        </div>

        {/* How to Use */}
        <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="text-xl font-bold">
            How to use Password Generator
          </h2>

          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-600">
            <li>
              Password length ko slider se choose karo.
            </li>

            <li>
              Uppercase, lowercase, numbers aur symbols select karo.
            </li>

            <li>
              Generate Password button par click karo.
            </li>

            <li>
              Generated password ko Copy button se copy kar lo.
            </li>
          </ol>
        </section>

        {/* SEO Content */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold">
            Free Online Password Generator
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            KaamKitPro Password Generator ek free online tool hai jo
            strong random passwords generate karne mein help karta hai.
            Aap password length aur different character types customize
            kar sakte ho.
          </p>

          <p className="mt-4 leading-7 text-slate-600">
            Strong passwords online accounts ko unauthorized access se
            protect karne mein help karte hain. Better security ke liye
            har important account ke liye unique password use karna
            recommended hai.
          </p>
        </section>

        {/* Back */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            ← Back to KaamKitPro
          </a>
        </div>
      </div>
    </main>
  );
}