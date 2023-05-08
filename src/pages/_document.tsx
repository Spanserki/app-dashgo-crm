import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-BR">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet"
      />
      <title>DashGO</title>
      <link rel='shortcut icon' href='../icon.png' type='image/png' />
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
