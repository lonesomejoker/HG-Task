import { useState } from "react";
import BreadCrumbs from "../reusables/BreadCrumbs";
import { FaSpinner } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { useClientContext } from "../context/ClientContext";

const InfiniteScrollPage = () => {
  const { profile, loading } = useClientContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");

  const filteredProfiles = profile?.filter((user) => {
    const fullName = `${user.name?.first} ${user.name?.last}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase());
    const matchesGender =
      genderFilter === "all" ? true : user.gender === genderFilter;
    return matchesSearch && matchesGender;
  });

  return (
    <section>
      <BreadCrumbs
        title={"Infinite Scroll Page"}
        parent={"Dashboard"}
        childpath={"Infinite Scroll"}
      />

      {/*Filter & Search*/}
      <div className="flex gap-3.5 items-center justify-end w-[40%] ml-auto mt-[2.5rem] mb-[1.5rem]">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-[8px] border-2 bg-white border-gray-200 rounded-full caption focus:outline-none"
            placeholder="Search by name"
          />
          <BiSearch className="absolute right-2.5 top-[11px] text-[1.5rem] text-gray-300" />
        </div>
        <select
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
          className="md:w-[35%] px-3 py-[10px] font-body rounded-lg focus:outline-none bg-white border-2 border-gray-200 caption"
        >
          <option value="all">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      {/* User Cards */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProfiles?.map((user, idx) => (
          <section
            key={idx}
            className="items-center flex flex-col lg:flex-row gap-5 justify-between overflow-clip hover:-translate-y-1.5 transition-all duration-300 border border-slate-100 px-6 md:px-8 lg:px-8 py-6 lg:py-8 bg-white rounded-xl shadow-md shadow-slate-200 hover:shadow-lg"
          >
            <div className="mb-4 lg:w-[40%]">
              <img
                className="rounded-full size-[8rem] object-cover mx-auto mb-3"
                src={user.picture?.medium}
                alt="user"
              />
              <h5 className="font-[700] tracking-[0.6px] text-center">
                {user.name.first} {user.name.last}
              </h5>
            </div>
            <div className="space-y-3.5 lg:flex-1">
              <div className="border-b-2 border-gray-200 pb-3">
                <p className="caption mb-1">Email:</p>
                <h6 className="text-wrap">{user.email}</h6>
              </div>
              <div className="border-b-2 border-gray-200 pb-3">
                <p className="caption mb-1">Gender:</p>
                <h6>{user.gender}</h6>
              </div>
              <div>
                <p className="caption mb-1">Contact:</p>
                <h6>{user.cell}</h6>
              </div>
            </div>
          </section>
        ))}
      </section>

      {loading && (
        <FaSpinner className="text-[4rem] text-primary animate-spin text-center mx-auto mt-[1.5rem]" />
      )}
    </section>
  );
};

export default InfiniteScrollPage;
