"use client";
import { useState } from "react";

export default function CreatePatient() {
  const [fullName, setFullName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [age, setAge] = useState<number>(18); // Default age to 18, as it's the minimum valid age

  const validGenders = ["Femenino", "Masculino", "sin especificar"];
  const validAges = Array.from(
    { length: 60 - 18 + 1 },
    (_, index) => 18 + index
  );

  return (
    <div className="bg-first flex items-center justify-center min-h-screen">
      <div className="bg-second p-8 rounded-lx shadow-xl max-w-md w-full">
        {/* Full Name Input */}
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Full Name:
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        {/* Age Dropdown */}
        <div className="mb-4">
          <label
            htmlFor="age"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Age:
          </label>
          <select
            id="age"
            name="age"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300  text-black"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
          >
            {validAges.map((age) => (
              <option key={age} value={age}>
                {age}
              </option>
            ))}
          </select>
        </div>

        {/* Gender Dropdown */}
        <div className="mb-4">
          <label
            htmlFor="gender"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Gender:
          </label>
          <select
            id="gender"
            name="gender"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300  text-black "
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="" disabled>
              Select gender
            </option>
            {validGenders.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>

        {/* Debugging: Display current state */}
        <div className="mb-4">
          <h3 className="text-gray-700 text-sm font-bold">Current State:</h3>
          <p>Full Name: {fullName}</p>
          <p>Age: {age}</p>
          <p>Gender: {gender}</p>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
