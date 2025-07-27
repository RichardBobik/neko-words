# 🐾 Neko Words

**Neko Words** is an Angular-based educational web app that helps users learn Japanese animal names interactively through visual cards, audio pronunciation, and multiple-choice quizzes.

## 🚀 Features

- **Animal Catalog**

  - Browse animals by category (e.g., Amphibian, Mammal, Bird).
  - Search animals by English name.
  - View detailed information and hear Japanese pronunciation.

- **Audio Playback**

  - Tap to hear the pronunciation of animal names in Japanese.
  - Smooth fade and zoom animations enhance the user experience.

- **Interactive Quizzes**

  - Practice animal names in **romaji**, **kana**, or **kanji**.
  - Score tracking, quiz progress, and review of missed questions.
  - Configurable quiz modes with randomized questions and answers.

- **Dark Mode**

  - Toggle light/dark themes to suit your preference.

- **SEO-Friendly**

  - Dynamic meta title and description for improved discoverability.

- **Progressive Web App**
  - Supports offline access via service worker.
  - SSR-ready using Angular Universal and Express.

---

## 🧱 Tech Stack

- **Framework**: Angular 20 (standalone components)
- **Language**: TypeScript
- **Animations**: Angular Animations
- **PWA**: Angular Service Worker
- **Backend**: Express (for SSR)
- **Tooling**: Angular CLI, Prettier, Jasmine/Karma

---

## 📂 Project Structure (Key Parts)

| Path                                      | Description                                  |
| ----------------------------------------- | -------------------------------------------- |
| `src/app/pages/home/`                     | Main UI component (animal list, modal, quiz) |
| `src/app/components/animal-card/`         | Card display with audio playback             |
| `src/app/components/animal-detail-modal/` | Modal for animal details + audio             |
| `src/app/components/quiz-question/`       | Quiz interface component                     |
| `src/app/services/`                       | Core services: audio, quiz logic, data fetch |
| `assets/data/animals.json`                | Static animal data file (English + Japanese) |

---

## 🧪 Available Scripts

| Command                        | Description                                |
| ------------------------------ | ------------------------------------------ |
| `npm start`                    | Run dev server at `http://localhost:4200/` |
| `npm run build`                | Build app for production                   |
| `npm run test`                 | Run unit tests with Karma/Jasmine          |
| `npm run build:ssr`            | Build for server-side rendering            |
| `npm run serve:ssr:neko-words` | Serve the SSR app using Node/Express       |

---

## 🐱 Quiz Modes

- **Romaji** – e.g., _neko_
- **Kana** – e.g., _ねこ_
- **Kanji** – e.g., _猫_

Each mode selects 10 random animals, shuffles answer options, and tracks your score and progress.

---

## 📈 Future Ideas

- Add audio for animal sounds (in addition to Japanese pronunciation).
- Include spaced repetition tracking or flashcard mode.
- Enable localization in other languages.

---

## 📌 Notes

- All animal data is stored in a JSON file at `assets/data/animals.json`.
- Dark mode applies by toggling the `dark-theme` class on the `<body>` element.

---

## 📃 License

MIT License — free to use, modify, and distribute.

---

## 🙌 Acknowledgements

Built with ❤️ using Angular. Designed to make language learning fun, interactive, and visual.
