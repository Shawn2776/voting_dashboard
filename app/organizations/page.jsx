"use client";

import { useState, useEffect } from "react";
import AddOrgForm from "@/components/AddOrgForm";
import OrgCard from "@/components/OrgCard";

const OrganizationsPage = () => {
  const [organizations, setOrganizations] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showOrgs, setShowOrgs] = useState(true); // Show organizations by default
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchOrganizations = async () => {
      const response = await fetch("/api/organizations");
      const data = await response.json();
      setOrganizations(data.organizations);
    };

    fetchOrganizations();
  }, []);

  const handleClick = async (action) => {
    if (action === "add") {
      setShowOrgs(false);
      setShowAddForm(true);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredOrganizations = organizations.filter(
    (organization) =>
      organization.name.toLowerCase().includes(searchQuery) ||
      organization.domain?.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="min-h-screen pt-8 mx-auto max-w-7xl">
      <div className="flex justify-between">
        <div className="flex gap-x-4">
          <button
            onClick={() => handleClick("add")}
            className="px-2 py-1 mb-4 text-white transition duration-300 ease-in-out border-2 rounded-md bg-primary-500 border-primary-500 hover:bg-primary-600 hover:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 hover:border-black hover:text-black hover:bg-white"
          >
            Add Organization
          </button>
        </div>
        <input
          type="text"
          placeholder="Search by name or domain"
          className="px-2 py-1 mb-4 border-2 rounded-md"
          onChange={handleSearchChange}
        />
      </div>
      <div className={showOrgs ? "flex flex-wrap gap-x-2 gap-y-2" : "hidden"}>
        {filteredOrganizations.map((organization) => (
          <div key={organization._id}>
            <OrgCard {...organization} />
          </div>
        ))}
      </div>
      <div className={showAddForm ? "flex" : "hidden"}>
        <AddOrgForm />
      </div>
    </div>
  );
};

export default OrganizationsPage;
