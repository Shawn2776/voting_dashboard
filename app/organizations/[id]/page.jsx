"use client";

import EditOrgForm from "@/components/EditOrgForm";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const fetchOrganizationById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/organizations/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch organization");
    }

    const org = await res.json();

    return org;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const EditPage = () => {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const id = segments[segments.length - 1];

  const [organization, setOrganization] = useState({
    name: "",
    domain: "",
    addrLine1: "",
    addrLine2: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchOrganizationById(id);
      if (data) {
        setOrganization(data);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="min-h-screen">
      <div>
        <EditOrgForm organization={organization} />
      </div>
    </div>
  );
};

export default EditPage;
