"use client";
import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { Patient } from "../crear-paciente/interfaces/Patient";

// export default function consultarPacientes() {
const ConsultarPacientes: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const linkBack = process.env.PUBLIC_LINK_BACK;

  const getAllPatients = useCallback(async () => {
    try {
      const response = await axios.get(`${linkBack}/patients`);
      const _patients: Patient[] = response.data;
      setPatients(_patients);
      console.log(_patients);
    } catch (error) {
      console.error(error);
    }
  }, [linkBack]);

  useEffect(() => {
    getAllPatients();
  }, [getAllPatients]);

  return (
    <div
      className={`min-h-screen bg-white sm:py-12 w-full md:w-auto h-full text-black border-4 flex items-center justify-center `}
    >
      <div className="grid gap-12 grid-cols-1 grid-rows-5">
        {/* <div className={`flex justify-center w-full md:w-auto x`}>
          <button
            type="button"
            className="text-Crear Pedido text-first hover:text-white border border-first hover:bg-first focus:ring-4 focus:outline-none focus:ring-first font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  "
          >
            <a href="/pacientes/crear-paciente">CREAR PACIENTES</a>
            {/* Consultar pedidos 
          </button>
        </div> */}
        {patients.map((patient) => (

          <div key={patient.name}>
            <div className="flex justify-center w-full md:w-auto x border-spacing-4">
              <div className="  flex flex-col items-center justify-center text-center shadow-lg">
                <p className="mb-2">
                  <strong>Nombre:</strong> {patient.name}
                </p>
                <p className="mb-2">
                  <strong>Edad:</strong> {patient.age}
                </p>
                <p className="mb-2">
                  <strong>Genero:</strong > {patient.gender}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsultarPacientes;
