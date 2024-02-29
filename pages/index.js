import Header from "@/components/header";
import Footer from "@/components/footer";
import Content from "@/components/content"
import Layout from "@/layout";
import { useEffect } from "react";

export default function Main() {
  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((res) => console.log("response => ", res))

      .catch((err) => console.log("error => ", err));
  }, []);

  return (
    <div>
      <Layout metaTitle="Home" metaDescription="Semua informasi home" >
        <p>Home</p>
      </Layout>
    </div>
  );
}

