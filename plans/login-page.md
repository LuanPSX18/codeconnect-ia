# Plano — Página de Login (CodeConnect)

## Contexto

A `apps/web` está praticamente vazia (apenas o boilerplate do Vite). Vamos construir a página de Login conforme o mockup anexo, seguindo as diretrizes do `CLAUDE.md`:

- **Atomic Design** estrito (atoms → molecules → organisms → templates → pages)
- **Tailwind** para estilos (mandatório no projeto, ainda não instalado)
- **Vitest + Testing Library** com teste co-localizado por componente (mandatório)
- Layout reutilizável para a futura página de **Cadastro** (mesmo template, banner e formulário diferentes)

Decisões alinhadas com o usuário:
- Fundo escuro sólido por ora (decoração de elos de corrente fica para depois)
- Submit/social/forgot apenas com `console.log` ou `href="#"` (sem chamada de API)
- Instalar `react-router-dom` agora; rota `/cadastro` recebe placeholder
- Validação: apenas atributo `required` nativo, sem mensagens custom

---

## A. Setup de tooling

### A.1 Tailwind v4 (plugin Vite oficial)

```
pnpm --filter web add -D tailwindcss @tailwindcss/vite
```

Atualizar [apps/web/vite.config.ts](../apps/web/vite.config.ts):

```ts
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    css: true,
  },
})
```

Substituir o conteúdo de [apps/web/src/index.css](../apps/web/src/index.css):

```css
@import "tailwindcss";

@theme {
  --color-bg-app: #0d0e12;
  --color-card: #1f2028;
  --color-border-subtle: #2e303a;
  --color-input: #2a2c35;
  --color-brand: #5cf28a;        /* botão Login verde */
  --color-brand-strong: #34d399;
  --color-text: #e5e7eb;
  --color-text-muted: #9ca3af;
}

html, body, #root { height: 100%; }
body { background: var(--color-bg-app); color: var(--color-text); }
```

Apagar `App.css` e o import dele em `App.tsx`. Limpar `assets/react.svg`, `assets/vite.svg`, `assets/hero.png` (não usados).

### A.2 Vitest + Testing Library

```
pnpm --filter web add -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Adicionar scripts em [apps/web/package.json](../apps/web/package.json):
```json
"test": "vitest",
"test:run": "vitest run"
```

Criar [apps/web/src/setupTests.ts](../apps/web/src/setupTests.ts):
```ts
import '@testing-library/jest-dom/vitest'
```

Em [apps/web/tsconfig.app.json](../apps/web/tsconfig.app.json) adicionar `"types": ["vitest/globals", "@testing-library/jest-dom"]` e incluir `setupTests.ts` no `include`.

### A.3 Router

```
pnpm --filter web add react-router-dom
```

Reescrever [apps/web/src/App.tsx](../apps/web/src/App.tsx) para:

```tsx
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { CadastroPage } from './pages/CadastroPage/CadastroPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
      </Routes>
    </BrowserRouter>
  )
}
```

---

## B. Decomposição Atômica

### B.1 Atoms — `apps/web/src/components/atoms/`

| Componente | Caminho | Props |
|---|---|---|
| `Button` | [atoms/Button/Button.tsx](../apps/web/src/components/atoms/Button/Button.tsx) | `{ variant?: 'primary'; type?: 'button' \| 'submit'; endIcon?: ReactNode; disabled?: boolean; onClick?: () => void; children: ReactNode; className?: string }` |
| `Input` | [atoms/Input/Input.tsx](../apps/web/src/components/atoms/Input/Input.tsx) | `Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & { id: string }` (com `forwardRef`) |
| `Label` | [atoms/Label/Label.tsx](../apps/web/src/components/atoms/Label/Label.tsx) | `{ htmlFor: string; children: ReactNode }` |
| `Checkbox` | [atoms/Checkbox/Checkbox.tsx](../apps/web/src/components/atoms/Checkbox/Checkbox.tsx) | `{ id: string; label: string; checked: boolean; onChange: (v: boolean) => void }` |
| `TextLink` | [atoms/TextLink/TextLink.tsx](../apps/web/src/components/atoms/TextLink/TextLink.tsx) | `{ to: string; children: ReactNode; className?: string }` (wrapper de `Link` do `react-router-dom`) |
| `Divider` | [atoms/Divider/Divider.tsx](../apps/web/src/components/atoms/Divider/Divider.tsx) | `{ children?: ReactNode }` (linha + texto centralizado opcional + linha) |

Regra: atoms **não** importam de molecules/organisms/templates.

### B.2 Molecules — `apps/web/src/components/molecules/`

| Componente | Caminho | Props |
|---|---|---|
| `FormField` | [molecules/FormField/FormField.tsx](../apps/web/src/components/molecules/FormField/FormField.tsx) | `{ id: string; label: string; type?: 'text' \| 'password' \| 'email'; placeholder?: string; value: string; onChange: (v: string) => void; required?: boolean }` (compõe `Label` + `Input`, garante `htmlFor`/`id`) |
| `SocialLoginButton` | [molecules/SocialLoginButton/SocialLoginButton.tsx](../apps/web/src/components/molecules/SocialLoginButton/SocialLoginButton.tsx) | `{ iconSrc: string; iconAlt: string; label: string; onClick?: () => void }` (ícone em cima, label embaixo) |

### B.3 Organisms — `apps/web/src/components/organisms/`

| Componente | Caminho | Props |
|---|---|---|
| `LoginForm` | [organisms/LoginForm/LoginForm.tsx](../apps/web/src/components/organisms/LoginForm/LoginForm.tsx) | `{ onSubmit?: (data: { email: string; password: string; remember: boolean }) => void }` |

`LoginForm` segura o `useState` dos três campos, renderiza:
- Título "Login" + subtítulo "Boas-vindas! Faça seu login."
- Dois `FormField` (email/usuário, senha)
- Linha flex com `Checkbox` "Lembrar-me" + `TextLink` "Esqueci a senha" (`to="#"`)
- `Button` primary submit "Login →"
- `Divider` "ou entre com outras contas"
- Grid 2-colunas com dois `SocialLoginButton` (Github, Gmail)
- Rodapé: texto "Ainda não tem conta?" + `TextLink` "Crie seu cadastro! 📋" (`to="/cadastro"`)

`onSubmit` default: `console.log` do payload (sem fetch).

### B.4 Templates — `apps/web/src/components/templates/`

| Componente | Caminho | Props |
|---|---|---|
| `AuthLayout` | [templates/AuthLayout/AuthLayout.tsx](../apps/web/src/components/templates/AuthLayout/AuthLayout.tsx) | `{ bannerSrc: string; bannerAlt: string; children: ReactNode }` |

Estrutura:
- Wrapper `min-h-screen flex items-center justify-center bg-[var(--color-bg-app)] p-6`
- Card centralizado: `bg-[var(--color-card)] rounded-2xl flex overflow-hidden max-w-5xl w-full`
- Coluna esquerda: `<img src={bannerSrc} alt={bannerAlt} className="w-1/2 object-cover hidden md:block" />`
- Coluna direita: `<section className="w-full md:w-1/2 p-10">{children}</section>`

**Esse é o ponto de reuso para Cadastro:** muda apenas `bannerSrc` e o `children`.

### B.5 Pages — `apps/web/src/pages/`

- [pages/LoginPage/LoginPage.tsx](../apps/web/src/pages/LoginPage/LoginPage.tsx)
  ```tsx
  <AuthLayout bannerSrc="/banner-login.png" bannerAlt="Pessoa programando">
    <LoginForm />
  </AuthLayout>
  ```
- [pages/CadastroPage/CadastroPage.tsx](../apps/web/src/pages/CadastroPage/CadastroPage.tsx) — placeholder mínimo:
  ```tsx
  <AuthLayout bannerSrc="/banner-login.png" bannerAlt="Cadastro">
    <h1 className="text-3xl font-bold">Cadastro em breve</h1>
  </AuthLayout>
  ```
  (usa o mesmo banner por enquanto; será trocado quando o asset chegar)

---

## C. Ordem de implementação

1. **Tooling**: instalar Tailwind + plugin Vite, atualizar `vite.config.ts`, reescrever `index.css`, instalar Vitest stack, criar `setupTests.ts`, atualizar `tsconfig.app.json`, adicionar scripts `test`. Smoke: `pnpm --filter web dev` + `pnpm --filter web test`.
2. **Router**: instalar `react-router-dom`, reescrever `App.tsx` com `BrowserRouter` e dois `Route`s apontando para componentes vazios temporários.
3. **Atoms** (cada um com `.test.tsx` co-localizado): `Button` → `Input` → `Label` → `TextLink` → `Checkbox` → `Divider`.
4. **Molecules**: `FormField` → `SocialLoginButton`.
5. **Organism**: `LoginForm` (compõe tudo, segura estado, `console.log` no submit).
6. **Template**: `AuthLayout`.
7. **Pages**: `LoginPage` (real) + `CadastroPage` (placeholder).
8. **Limpeza**: remover `App.css`, `assets/react.svg`, `assets/vite.svg`, `assets/hero.png` se não usados.
9. **Smoke final**: `pnpm --filter web dev` → navegar `/login` → clicar "Crie seu cadastro!" → confirmar `/cadastro` → voltar.

---

## D. Estratégia de testes (mínimo essencial)

| Componente | Teste essencial |
|---|---|
| `Button` | renderiza children; chama `onClick`; respeita `disabled`; renderiza `endIcon` |
| `Input` | renderiza com `id`/`type`/`placeholder`; dispara `onChange` |
| `Label` | renderiza com `htmlFor` correto |
| `Checkbox` | reflete `checked`; clicar dispara `onChange(!checked)`; clicar no label também alterna |
| `TextLink` | renderiza `<a>` com `href` igual a `to` (envolver em `MemoryRouter`) |
| `Divider` | renderiza children quando fornecido; renderiza sem children |
| `FormField` | label `for` = input `id`; digitar dispara `onChange(value)` |
| `SocialLoginButton` | renderiza `<img alt>` e label; chama `onClick` |
| `LoginForm` | preencher email + senha + submeter chama `onSubmit` com `{ email, password, remember: false }`; toggle "Lembrar-me" reflete no payload; link de cadastro tem `href="/cadastro"` |
| `AuthLayout` | renderiza banner com `src`/`alt`; renderiza children |
| `LoginPage` | dentro de `MemoryRouter`; banner `src` é `/banner-login.png`; heading "Login" presente |

Usar `userEvent` (não `fireEvent`) para interações. Envolver em `MemoryRouter` quando o componente usar `Link`.

---

## E. Arquivos críticos

**Modificados:**
- [apps/web/vite.config.ts](../apps/web/vite.config.ts)
- [apps/web/src/index.css](../apps/web/src/index.css)
- [apps/web/src/App.tsx](../apps/web/src/App.tsx)
- [apps/web/tsconfig.app.json](../apps/web/tsconfig.app.json)
- [apps/web/package.json](../apps/web/package.json)

**Criados:**
- [apps/web/src/setupTests.ts](../apps/web/src/setupTests.ts)
- 6 atoms + testes em [apps/web/src/components/atoms/](../apps/web/src/components/atoms/)
- 2 molecules + testes em [apps/web/src/components/molecules/](../apps/web/src/components/molecules/)
- 1 organism + teste em [apps/web/src/components/organisms/](../apps/web/src/components/organisms/)
- 1 template + teste em [apps/web/src/components/templates/](../apps/web/src/components/templates/)
- 2 pages em [apps/web/src/pages/](../apps/web/src/pages/)

**Deletados:**
- `apps/web/src/App.css`
- `apps/web/src/assets/react.svg`, `vite.svg`, `hero.png` (se confirmadamente sem uso)

---

## F. Verificação ponta a ponta

1. `pnpm --filter web test` — todos os testes co-localizados passam.
2. `pnpm --filter web dev` — abre Vite no navegador.
3. Navegar `http://localhost:5173/` → redireciona para `/login`.
4. Conferir layout: banner à esquerda, formulário à direita, fundo escuro, botão verde, divider, dois ícones sociais, footer.
5. Preencher email + senha → clicar "Login" → ver `console.log` do payload no DevTools.
6. Marcar "Lembrar-me" e submeter de novo → `remember: true` no payload.
7. Clicar "Crie seu cadastro!" → URL muda para `/cadastro`, layout idêntico, conteúdo do formulário substituído pelo placeholder.
8. Botão "voltar" do navegador → volta para `/login` com estado limpo.
9. Redimensionar para mobile → banner some, formulário ocupa toda a largura.
10. `pnpm --filter web build` — build de produção sem erros de TS.

---

## G. Reuso futuro (cadastro)

Quando a página de cadastro for implementada de verdade, criar apenas:
- `organisms/CadastroForm/CadastroForm.tsx` (campos próprios)
- Trocar `<LoginForm />` por `<CadastroForm />` em `CadastroPage`
- Atualizar `bannerSrc` para o novo asset

`AuthLayout`, `Button`, `Input`, `Label`, `FormField`, `Checkbox`, `TextLink`, `Divider` e `SocialLoginButton` (se aplicável) serão reaproveitados sem mudança.
