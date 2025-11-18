// app/layout.jsx
import './globals.css';

export const metadata = {
  title: 'Quiz Prompt Builder',
  description: 'Quiz Prompt Builder Uygulaması',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
