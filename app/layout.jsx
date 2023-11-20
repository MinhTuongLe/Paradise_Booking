import ClientOnly from "@/components/ClientOnly";
import Footer from "@/components/Footer";
import ToastContainerBar from "@/components/ToastContainerBar";
import LoginModal from "@/components/models/LoginModal";
import RegisterModal from "@/components/models/RegisterModal";
import ForgotPasswordModal from "@/components/models/ForgotPasswordModal";
import RentModal from "@/components/models/RentModal";
import SearchModal from "@/components/models/SearchModal";
import FiltersModal from "@/components/models/FiltersModal";
import CommentsModal from "@/components/models/CommentsModal";
import RoomsModal from "@/components/models/RoomsModal";
import RoomCommentsModal from "@/components/models/RoomCommentsModal";
import DeleteModal from "@/components/models/DeleteModal";
import ReportModal from "@/components/models/ReportModal";
import Navbar from "@/components/navbar/Navbar";
import { Nunito } from "next/font/google";
import "../styles/globals.css";
import { StoreProvider } from "../store/StoreProvider";

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
  return (
    <html lang="en">
      <body className={font.className}>
        <StoreProvider>
          <ClientOnly>
            <ToastContainerBar />
            <SearchModal />
            <RegisterModal />
            <LoginModal />
            <ForgotPasswordModal />
            <FiltersModal />
            <RentModal />
            <CommentsModal />
            <RoomCommentsModal />
            <DeleteModal />
            <ReportModal />
            <Navbar />
          </ClientOnly>
          <div className="pb-20 pt-[10vh] min-h-[70vh]">{children}</div>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
