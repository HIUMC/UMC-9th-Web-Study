# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Vite 환경에서 SVG 활용하기

Vite에서는 SVG 파일을 다양한 방식으로 활용할 수 있습니다:

### 1. **인라인 SVG 코드 사용** (현재 프로젝트 방식)
SVG 코드를 직접 JSX에 작성하는 방법입니다.

```tsx
<svg width="24" height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
  <path
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="4"
    d="M7.95 11.95h32m-32 12h32m-32 12h32"
  />
</svg>
```

**장점:**
- 직접적인 스타일 제어 가능 (`currentColor` 사용 가능)
- 별도의 파일 요청이 없음
- 번들 크기 최적화

**단점:**
- 코드가 길어질 수 있음
- 재사용성이 떨어짐

### 2. **public 폴더에서 SVG 파일 불러오기**

```tsx
// public/images/hamburger-button.svg
<img src="/images/hamburger-button.svg" alt="Menu" />
```

**장점:**
- 파일 관리가 용이
- 캐싱 가능

**단점:**
- 색상 변경 불가 (currentColor 적용 안됨)
- 인터랙티브한 제어 어려움

### 3. **React Component로 import** (추천)

`vite-plugin-svgr` 플러그인 사용:

```bash
npm install vite-plugin-svgr -D
```

```ts
// vite.config.ts
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [react(), svgr()],
})
```

```tsx
// 사용 예시
import HamburgerIcon from './assets/hamburger-button.svg?react'

<HamburgerIcon className="w-6 h-6 text-white" />
```

**장점:**
- 컴포넌트처럼 사용 가능
- props로 스타일 제어 가능
- TypeScript 지원
- 재사용성 우수

### 4. **URL로 import**

```tsx
import hamburgerUrl from './assets/hamburger-button.svg'

<img src={hamburgerUrl} alt="Menu" />
```

### 현재 프로젝트 선택 이유
이 프로젝트에서는 **인라인 SVG 코드 방식**을 사용했습니다:
- 단순한 아이콘이므로 직접 작성이 효율적
- `currentColor`로 테마 색상 적응 가능
- 추가 플러그인 불필요

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
