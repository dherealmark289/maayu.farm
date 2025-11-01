import "./globals.css";
import "./ui/borders.css";
import Footer from "./ui/Footer";

export const metadata = { title: "Mayu Farm — Pixel Menus" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div style={{ flex: '1 0 auto' }}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}


