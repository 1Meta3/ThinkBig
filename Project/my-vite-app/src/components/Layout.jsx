import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="d-flex">
        <Sidebar />
        <main className="flex-grow-1 p-4" style={{ minHeight: "100vh", backgroundColor: "#f9f9f9" }}>
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
