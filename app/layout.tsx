import PageContainer from "../components/containers/page-container";
import Nav from "../components/navigation/nav";
import "../styles/globals.css";
import AuthContext from "../components/auth/auth-context";

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className="bg-black">
        <AuthContext>
          <section className="flex">
            <Nav />
            <PageContainer>{children}</PageContainer>
          </section>
        </AuthContext>
      </body>
    </html>
  );
}
