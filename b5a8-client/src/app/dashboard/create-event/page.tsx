"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import CreateEventForm from "./components/CreateEventForm";
import CreateEventHeader from "./components/CreateEventHeader";

export default function CreateEventPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <CreateEventHeader />
        <CreateEventForm />
      </div>
    </DashboardLayout>
  );
}
