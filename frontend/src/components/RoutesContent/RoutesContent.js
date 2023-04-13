import React from "react";
import {Route, Routes} from "react-router-dom";
import WorksPage from "../pages/WorksPage/WorksPage";
import CreateWorksPage from "../pages/CreateWorkPage/CreateWorkPage";
import AuthPage from "../pages/AuthPage/AuthPage";
import DefaultLayout from "../layouts/DefaultLayout";
import GuestLayout from "../layouts/GuestLayout";
import Logout from "../action/Logout";
import MainPage from "../pages/MainPage/MainPage";
//import WorkScreen from "../pages/WorkScreen/WorkScreen";
import NotFound from "../pages/NotFound/NotFound";

function RoutesContent() {
    return (
        <div>
            <Routes>
                <Route exact="true" path="/" element={<DefaultLayout />}>
                    <Route exact="true" path="/" element={<MainPage />} />
                    <Route exact="true" path="/create-work" element={<CreateWorksPage />} />
                    <Route exact="true" path="/works" element={<WorksPage />} />
                </Route>
                <Route exact="true" path="/" element={<GuestLayout />}>
                    <Route exact="true" path="/auth" element={<AuthPage />} />
                </Route>
                <Route exact="true" path="/logout" element={<Logout />} />
                <Route path='*' element={<NotFound />}/>
            </Routes>
        </div>
    )
}

export default RoutesContent
