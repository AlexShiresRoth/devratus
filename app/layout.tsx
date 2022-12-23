import "../styles/globals.css";

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className="bg-black">{children}</body>
    </html>
  );
}
