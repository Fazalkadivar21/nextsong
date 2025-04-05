import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark flex flex-col items-center justify-center h-screen w-screen">
        {children}
      </body>
    </html>
  );
}