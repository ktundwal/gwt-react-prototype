import React from "react";
import { GWTListView } from "./GWT/GWTListView";
import { ActivationGwtDocument } from "./GWT/ActivationGwtDocument";

export default function App() {
  return (
    <div className="App">
      <GWTListView gwtDocument={ActivationGwtDocument} />
    </div>
  );
}
