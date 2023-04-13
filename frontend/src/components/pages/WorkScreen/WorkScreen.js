import {Tabs} from "react-bootstrap";
import {Tab} from "bootstrap";
import CreateWorksPage from "../CreateWorkPage/CreateWorkPage";
import WorksPage from "../WorksPage/WorksPage";

export default function WorkScreen () {
    return (
        <div>
            <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="createworks" title="Создать задачу">
                    <CreateWorksPage />
                </Tab>
                <Tab eventKey="profile" title="Задачи">
                    <WorksPage />
                </Tab>
            </Tabs>
        </div>
    )
}