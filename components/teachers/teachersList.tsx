"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

type Teacher = {
  id: string;
  name: string;
  surname: string;
  city: string;
};

function TeachersList() {
  const [selectedCity, setSelectedCity] = useState<string>("Wyszków");
  const [error, setError] = useState<string | null>(null);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  async function fetchTeachers(city: string) {
    const supabase = createClient();

    const {data, error} = await supabase
      .from("teachers")
      .select("*")
      .eq("city", city)
      .order("name", { ascending: true })

    if (error) {
      setError(error.message);
      setTeachers([]); // Czyszczenie listy nauczycieli w przypadku błędu
    } else {
      setError(null);
      setTeachers(data ?? []);
    }
  }

  async function fetchTeachersWithoutCity() {
    const supabase = createClient();

    const {data, error} = await supabase
      .from("teachers")
      .select("*")
      .order("name", { ascending: true })

    if (error) {
      setError(error.message);
      setTeachers([]); // Czyszczenie listy nauczycieli w przypadku błędu
    } else {
      setError(null);
      setTeachers(data ?? []);
    }
  }

  useEffect(() => {
    if (selectedCity === "") {
      fetchTeachersWithoutCity();
    } else {
      fetchTeachers(selectedCity);
    }
  }, [selectedCity]);

  return (
    <>

      <select onChange={(e) => setSelectedCity(e.target.value)} value={selectedCity}>
        <option value="">Wszystkie</option>
        <option value="Wyszków">Wyszków</option>
        <option value="Warszawa">Warszawa</option>
      </select>
      {error && <p style={{ color: "red" }}>Błąd: {error}</p>}
      <ul>
        {teachers.map((teacher) => (
          <li key={teacher.id}>
            {teacher.city} | {teacher.name} {teacher.surname}
          </li>
        ))}
      </ul>
    </>
  );
}

export default TeachersList;
