import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import MainPanel from "./components/Pages/MainPanel/MainPanel";
import ChampionsPanel from "./components/Pages/ChampionsPanel/ChampionsPanel";
import ItemsPanel from "./components/Pages/ItemsPanel/ItemsPanel";

import { useDispatch } from "react-redux";
import RolesPanel from "./components/Pages/RolesPanel/RolesPanel";
import Role from "./components/Pages/RolesPanel/Role";
import { rolesActions, itemActions, championActions } from "./store";
import DuobotRole from "./components/Pages/RolesPanel/DuobotRole/DuobotRole";

export default function App() {
  const dispatch = useDispatch();

  async function getItems() {
    const response = await fetch(`http://localhost:5000/items/get`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const res = await response.json();
    dispatch(itemActions.getItems({ items: [...res] }));
  }

  async function getChampions() {
    const response = await fetch(`http://localhost:5000/champions/get`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const res = await response.json();
    dispatch(championActions.getChampions({ champions: [...res] }));
  }

  async function getRoles() {
    const response = await fetch(`http://localhost:5000/role/get`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const res = await response.json();
    dispatch(rolesActions.getRoles({ roles: [...res] }));
  }

  useEffect(() => {
    getItems();
    getChampions();
    getRoles();
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPanel />}>
          {/* <Route index element={<Main />} /> */}
        </Route>
        <Route path="/champions" element={<ChampionsPanel />}>
          {/* <Route index element={<Main />} /> */}
        </Route>
        <Route path="/items" element={<ItemsPanel />}>
          {/* <Route index element={<Main />} /> */}
        </Route>
        <Route path="/roles">
          <Route index element={<RolesPanel />} />
          <Route path="top" element={<Role val="top" />} />
          <Route path="jungle" element={<Role val="jungle" />} />
          <Route path="mid" element={<Role val="mid" />} />
          <Route path="bot" element={<Role val="bot" />} />
          <Route path="support" element={<Role val="supp" />} />
          <Route path="duobot" element={<DuobotRole />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
