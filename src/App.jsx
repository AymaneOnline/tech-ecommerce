import AppRouter from "./routes/router";
import MainLayout from "@/components/layout/MainLayout";

export default function App() {
  return (
    <MainLayout>
      <AppRouter />
    </MainLayout>
  );
}
