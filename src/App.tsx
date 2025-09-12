import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Applications from "./pages/Applications";
import ApplicationDetails from "./pages/ApplicationDetails";
import AddApplication from "./pages/AddApplication";
import Discovery from "./pages/Discovery";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Integrations from "./pages/Integrations";
import Settings from "./pages/Settings";
import Calendar from "./pages/Calendar";
import Procurement from "./pages/Procurement";
import Fields from "./pages/Fields";
import FieldsView from "./pages/FieldsView";
import Dashboard from "./pages/Dashboard";
import RequireAuth from "./components/RequireAuth";
import Sidebar from "./components/layout/Sidebar";
import ViewSubCategories from "./pages/ViewSubCategories";
import AddSubCategory from "./pages/AddSubCategory";
import CategoryView from "./pages/CategoryView";
import AddCategory from "./pages/AddCategory";
import LeadsBySubCategory from "./pages/LeadsBySubCategory";
import ClientManage from "./pages/ClientManage";
import ClientLeadTransfersPage from "./pages/ClientLeadTransfersPage";
// import AllSubCategory from "./components/AllSubCategory";

// Create a layout component that includes the sidebar
const AppLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};


// Redirect to /category by default
const RedirectToCategory = () => {
  return <Navigate to="/category" replace />;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<RedirectToCategory />} />
          {/* <Route path="/" element={<AllSubCategory />} /> */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<AppLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="applications" element={<Applications />} />
              <Route path="applications/add" element={<AddApplication />} />
              <Route path="application/:id" element={<ApplicationDetails />} />
              <Route path="discovery" element={<Discovery />} />
              <Route path="integrations" element={<Integrations />} />
              <Route path="settings" element={<Settings />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="calendar/add" element={<Calendar />} />
              <Route path="categories" element={<CategoryView />} />
              <Route path="category" element={<CategoryView />} />
              <Route path="category/add" element={<AddCategory />} />
              <Route path="subcategories" element={<ViewSubCategories />} />
              <Route path="subcategories/add" element={<AddSubCategory />} />
              <Route path="procurement" element={<Procurement />} />
              <Route path="fields" element={<Fields />} />
              <Route path="fields/view" element={<FieldsView />} />
              <Route path="leadsbysubcategory" element={<LeadsBySubCategory />} />
              <Route path="client-manage" element={<ClientManage />} />
              <Route path="client-lead-transfers/:clientId" element={<ClientLeadTransfersPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
