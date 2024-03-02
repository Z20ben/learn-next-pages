import { useEffect } from "react";
import dynamic from "next/dynamic";

const LayoutComponent = dynamic(() => import("@/layout"))

export default function Main() {
  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((res) => console.log("response => ", res))

      .catch((err) => console.log("error => ", err));
  }, []);

  return (
    <div>
      <LayoutComponent metaTitle="Home" metaDescription="Semua informasi home" >
        <p>Home</p>
      </LayoutComponent>
    </div>
  );
}

