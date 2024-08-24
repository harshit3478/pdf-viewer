"use client";
import React from "react";
import Upload from "@/components/upload";
import Modal from "@/components/modal";
import Drawer from "@/components/drawer";
import Loading from "@/components/loading";

export default function Home() {
const [drawerOpen, setDrawerOpen] = React.useState(false);
  return (
    <main className="flex-1">
      <Drawer Drawer={drawerOpen} SetDrawer={setDrawerOpen}>
      <p className="text text-wrap font-[Urbanist] font-semibold text-center text-xl">
              Welcome to pdf reader; It automatically saves the last page you
              visited and also helps you bookmark the pages
            </p>
            <Upload />
      </Drawer>
    </main>
  );
}
