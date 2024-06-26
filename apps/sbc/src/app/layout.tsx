import './global.css';

export const metadata = {
  title: 'Welcome to sbc',
  description: 'Generated by create-nx-workspace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="bg-blue-600 text-white p-7 text-center">
          <h1>SBC App Header</h1>
        </header>
        {children}
      </body>
    </html>
  );
}
