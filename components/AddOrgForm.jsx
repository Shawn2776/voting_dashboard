"use client";

import { NextResponse } from "next/server";
import { useState } from "react";

const AddOrgForm = () => {
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

  const handleChange = (e) => {
    setOrganization({ ...organization, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      confirm(
        `Do you want to create your organization with the following information? 
            Name: ${organization.name} 
            Domain: ${organization.domain} 
            Address Line 1: ${organization.addrLine1} 
            Address Line 2: ${organization.addrLine2} 
            City: ${organization.city} 
            State: ${organization.state} 
            ZIP Code: ${organization.zip} 
            Phone: ${organization.phone} 
            Email: ${organization.email} 
            Password: ${organization.password}`
      )
    ) {
      try {
        const response = await fetch("/api/organizations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(organization),
        });
        const data = await response.json();
        setOrganization({
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
        alert("Your organization has been created successfully!");
      } catch (error) {
        return NextResponse.json(
          { error: "Internal Server Error" },
          { status: 500 }
        );
      }
    } else {
      return;
    }
  };

  const handleClear = () => {
    if (confirm("Are you sure you want to clear the organizations?")) {
      setOrganization({
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
    } else {
      return;
    }
  };

  return (
    <div className="px-10 py-2 rounded-md shadow-md w-[410px] bg-slate-500 shadow-black">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Organization Name:
          <input
            type="text"
            name="name"
            value={organization.name}
            onChange={handleChange}
            required
            className="block w-full pl-4 mt-1 border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </label>
        <label className="block">
          Domain:
          <input
            type="text"
            name="domain"
            value={organization.domain}
            onChange={handleChange}
            required
            className="block w-full pl-4 mt-1 border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </label>
        <label className="block">
          Address Line 1:
          <input
            type="text"
            name="addrLine1"
            value={organization.addrLine1}
            onChange={handleChange}
            required
            className="block w-full pl-4 mt-1 border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </label>
        <label className="block">
          Address Line 2:
          <input
            type="text"
            name="addrLine2"
            value={organization.addrLine2}
            onChange={handleChange}
            className="block w-full pl-4 mt-1 border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </label>
        <label className="block">
          City:
          <input
            type="text"
            name="city"
            value={organization.city}
            onChange={handleChange}
            required
            className="block w-full pl-4 mt-1 border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </label>
        <label className="block">
          State:
          <input
            type="text"
            name="state"
            value={organization.state}
            onChange={handleChange}
            required
            className="block w-full pl-4 mt-1 border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </label>
        <label className="block">
          ZIP Code:
          <input
            type="text"
            name="zip"
            value={organization.zip}
            onChange={handleChange}
            required
            className="block w-full pl-4 mt-1 border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </label>
        <label className="block">
          Phone:
          <input
            type="text"
            name="phone"
            value={organization.phone}
            onChange={handleChange}
            required
            className="block w-full pl-4 mt-1 border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </label>
        <label className="block">
          Admin Email:
          <input
            type="email"
            name="email"
            value={organization.email}
            onChange={handleChange}
            required
            className="block w-full pl-4 mt-1 border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </label>
        <label className="block">
          Password:
          <input
            type="password"
            name="password"
            value={organization.password}
            onChange={handleChange}
            required
            className="block w-full pl-4 mt-1 border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </label>
        <div>
          <button
            type="submit"
            className="px-4 py-2 text-white rounded-md bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Submit
          </button>
          <button
            onClick={handleClear}
            type="button"
            className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOrgForm;
