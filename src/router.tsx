import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "@/layouts/AppLayout";
import { DashboardView } from "@/views/DashboardView";
import { CreateProjectView } from "./views/projects/CreateProjectView";


export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>}>   
                    <Route path="/" element={<DashboardView/>} index />
                    <Route path="/create/project" element={<CreateProjectView/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}