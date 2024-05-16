"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Patient } from "@/app/pacientes/crear-paciente/interfaces/Patient";
import { FaPersonWalkingDashedLineArrowRight } from "react-icons/fa6";

const daysOfWeek = ["Dom", "Lun", "Mart", "Mier", "Juev", "Vie", "Sab"];
const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];
// const patients = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown"];

const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [scheduledAppointments, setScheduledAppointments] = useState<
    { date: number; time: string }[]
  >([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const linkBack = process.env.PUBLIC_LINK_BACK;

  const today = new Date();
  const daysInMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();

  const handleSchedule = async () => {
    if (selectedDate && selectedTime && selectedPatient) {
      const response = await scheduleAppointment();
    }
  };

  const isScheduled = (date: number, time: string) => {
    return scheduledAppointments.some(
      (appointment) => appointment.date === date && appointment.time === time
    );
  };

  const getPatients = useCallback(async () => {
    try {
      const patients: Patient[] = await axios.get(`${linkBack}/patients`);
      // const patients = response.data.map((patient: Patient) => patient.name);
      setPatients(patients);
      console.log("patients", patients);
    } catch (error) {
      console.error(error);
    }
  }, [linkBack]);

  const scheduleAppointment = async () => {
    try {
      const date = `${selectedDate}/${
        today.getMonth() + 1
      }/${today.getFullYear()}`;
      const patient = findPatient();
      const data = {
        date,
        time: selectedTime,
        patient,
      };
      console.log("data", data);

      // const response = await axios.post(`${linkBack}/appointments`, {
      //   date: selectedDate,
      //   time: selectedTime,
      //   patient: selectedPatient,
      // });
      // console.log("response", response.data);
      const response = await axios.post(`${linkBack}/appointments`, data);
      console.log("response", response.data);
      return;
    } catch (error) {
      console.error(error);
    }
  };

  const findPatient = () => {
    try {
      const patient = patients.find(
        (patient) => patient.name === selectedPatient
      );
      console.log("patient", patient);
      return patient;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPatients();
    console.log("scheduledAppointments", scheduledAppointments);
  }, [getPatients, scheduledAppointments]);

  return (
    // <div className="p-4">
    <div className="bg-first flex items-center justify-center min-h-screen rounded-lx">
      <div className="bg-second p-8 rounded-xl shadow-2xl max-w-md w-full">
        <div className="mb-4">
          <label htmlFor="patient" className="block text-lg font-bold mb-2">
            Seleccione un paciente:
          </label>
          <select
            id="patient"
            className="p-2 border rounded text-first"
            value={selectedPatient ?? ""}
            onChange={(e) => setSelectedPatient(e.target.value)}
          >
            <option value="" disabled>
              Selecione un paciente
            </option>
            {/* {patients.map((patient) => (
              <option key={patient.name} value={patient}>
                {patient.name}
              </option>
            ))} */}
            {patients.map((patient) => (
              <option key={patient.name} value={patient.name}>
                {patient.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-4">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center font-bold">
              {day}
            </div>
          ))}
          {[...Array(daysInMonth)].map((_, i) => {
            const date = i + 1;
            const isSelected = selectedDate === date;
            const isScheduledDay = scheduledAppointments.some(
              (appointment) => appointment.date === date
            );
            return (
              <button
                key={date}
                className={`p-2 rounded ${
                  isScheduledDay
                    ? "bg-yellow-500"
                    : isSelected
                    ? "bg-blue-500 text-white"
                    : "bg-first"
                }`}
                onClick={() => setSelectedDate(date)}
              >
                {date}
              </button>
            );
          })}
        </div>

        {selectedDate && (
          <div className="mb-4">
            <h2 className="text-xl font-bold">Seleccione una hora</h2>
            <div className="grid grid-cols-3 gap-1 mt-2">
              {timeSlots.map((time) => {
                const isSelected = selectedTime === time;
                const isScheduledTime = isScheduled(selectedDate, time);
                return (
                  <button
                    key={time}
                    className={`p-2 rounded ${
                      isScheduledTime
                        ? "bg-red-500 text-white"
                        : isSelected
                        ? "bg-blue-500 text-white"
                        : "bg-first"
                    }`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-4">
          <button
            className="p-2 bg-green-500 text-white rounded"
            onClick={handleSchedule}
            disabled={!selectedDate || !selectedTime || !selectedPatient}
          >
            Agendar Cita
          </button>
        </div>

        {selectedDate && selectedTime && (
          <div className="mt-4">
            <h2 className="text-xl font-bold">Selected Date and Time</h2>
            <p>
              {new Date(
                today.getFullYear(),
                today.getMonth(),
                selectedDate
              ).toDateString()}{" "}
              at {selectedTime}
            </p>
            <p>Patient: {selectedPatient}</p>
          </div>
        )}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Calendar;
