import { Outlet } from "react-router-dom";
import "./Container.css";

export const Container = () => {
  return (
    <section className="Container">
      {/* Navbar */}

      <div className="ContainerOutlet">
        <Outlet />
      </div>
    </section>
  );
};
