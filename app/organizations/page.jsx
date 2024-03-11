"use client";

import { useState, useEffect } from "react";
import AddOrgForm from "@/components/AddOrgForm";
import OrgCard from "@/components/OrgCard";
import OrgListItem from "@/components/OrgListItem";

import { PiCards } from "react-icons/pi";
import { FaList } from "react-icons/fa6";

const OrganizationsPage = () => {
  const [organizations, setOrganizations] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showOrgs, setShowOrgs] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewStyle, setViewStyle] = useState("card"); // New state for view style

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
    } else if (action === "all") {
      setShowAddForm(false);
      setShowOrgs(true);
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

  // Group organizations by the first letter of their name
  const groupedOrganizations = filteredOrganizations.reduce((acc, org) => {
    const firstLetter = org.name[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(org);
    return acc;
  }, {});

  return (
    <div className="min-h-screen pt-8 mx-auto max-w-7xl">
      <div className="flex justify-between">
        <div className="flex gap-x-4">
          <button
            onClick={() => handleClick("all")}
            className="px-2 py-1 mb-4 text-white transition duration-300 ease-in-out border-2 rounded-md bg-primary-500 border-primary-500 hover:bg-primary-600 hover:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 hover:border-black hover:text-black hover:bg-white"
          >
            All Organizations
          </button>
          <button
            onClick={() => handleClick("add")}
            className="px-2 py-1 mb-4 text-white transition duration-300 ease-in-out border-2 rounded-md bg-primary-500 border-primary-500 hover:bg-primary-600 hover:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 hover:border-black hover:text-black hover:bg-white"
          >
            Add Organization
          </button>
        </div>
        <div className="flex items-center text-white gap-x-2">
          <input
            type="text"
            placeholder="Search by name or domain"
            className="px-2 py-1 mb-4 border-2 rounded-md"
            onChange={handleSearchChange}
          />
          <select
            className="px-2 py-1 mb-4 border-2 rounded-md"
            onChange={(e) => setViewStyle(e.target.value)}
          >
            <option value="card">
              <PiCards /> Cards
            </option>
            <option value="list">
              <FaList /> List
            </option>
          </select>
        </div>
      </div>
      <div className={showOrgs ? "flex flex-wrap gap-x-2 gap-y-2" : "hidden"}>
        {viewStyle === "card" ? (
          filteredOrganizations.map((organization) => (
            <div key={organization._id}>
              <OrgCard {...organization} />
            </div>
          ))
        ) : (
          <div className="w-full">
            {Object.keys(groupedOrganizations)
              .sort()
              .map((letter) => (
                <div key={letter} className="col-span-2">
                  <h2 className="my-10 text-2xl font-bold text-accent">
                    {letter}
                  </h2>
                  {groupedOrganizations[letter].map((organization) => (
                    <OrgListItem
                      key={organization._id}
                      name={organization.name}
                      domain={organization.domain}
                    />
                  ))}
                </div>
              ))}
          </div>
        )}
      </div>
      <div className={showAddForm ? "flex" : "hidden"}>
        <AddOrgForm />
      </div>
    </div>
  );
};

export default OrganizationsPage;