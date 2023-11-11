import ClientOnly from "@/components/ClientOnly";
import Footer from "@/components/Footer";
import ToastContainerBar from "@/components/ToastContainerBar";
import LoginModal from "@/components/models/LoginModal";
import RegisterModal from "@/components/models/RegisterModal";
import ForgotPasswordModal from "@/components/models/ForgotPasswordModal";
import RentModal from "@/components/models/RentModal";
import SearchModal from "@/components/models/SearchModal";
import FiltersModal from "@/components/models/FiltersModal";
import Navbar from "@/components/navbar/Navbar";
import { Nunito } from "next/font/google";
import "../styles/globals.css";
import getCurrentUser from "./actions/getCurrentUser";

export const metadata = {
  title: "Paradise",
  description: "Paradise",
  icons:
    "https://firebasestorage.googleapis.com/v0/b/paradise-booking-app.appspot.com/o/icon.png?alt=media&token=b81865c8-a944-429f-bf2d-a90441163cac",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({ children }) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToastContainerBar />
          <SearchModal />
          <RegisterModal />
          <LoginModal />
          <ForgotPasswordModal />
          <FiltersModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-[10vh] min-h-[70vh]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
