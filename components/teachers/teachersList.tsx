"use client";

import {createClient} from "@/utils/supabase/client";
import {useEffect, useState} from "react";
import TeachersListElement from "@/components/teachers/teachersListElement";
import {Teacher} from "@/types/Teacher";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import TeacherListFilterBoolean from "@/components/teachers/teacherList/teacherListFilterBoolean";

function TeachersList() {
  const [selectedCity, setSelectedCity] = useState<string>("Wyszków");
  const [error, setError] = useState<string | null>(null);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [online, setOnline] = useState(false);
  const [studentsLocation, setStudentsLocation] = useState(false);
  const [teachersLocation, setTeachersLocation] = useState(false);

  async function fetchTeachers(city: string, online: boolean) {
    const supabase = createClient();

    let query = supabase.from("teachers").select("*");

    if (city && city!=="Wszystkie") {
      query = query.eq("city", city)
    }

    if (online) {
      query = query.eq("online", true);
    }

    if (online) {
      query = query.eq("online", true);
    }

    if (online) {
      query = query.eq("online", true);
    }

    query = query
      .order("name", {ascending: true})
      .order("surname", {ascending: true})

    const {data, error} = await query;


    if (error) {
      setError(error.message);
      setTeachers([]); // Czyszczenie listy nauczycieli w przypadku błędu
    } else {
      setError(null);
      setTeachers(data ?? []);
    }
  }


  useEffect(() => {
      fetchTeachers(selectedCity,online);
  }, [online, selectedCity]);

  return (
    <>
      {error && <p style={{color: "red"}}>Błąd: {error}</p>}
      <div className={"space-y-4"}>
        <TeacherListFilterBoolean name={"Pokaż nauczycieli oferujących nauczanie zdalne?"} desc={"Nauczanie za pomocą internetu."} checked={online} onCheckedChange={setOnline}/>
        <TeacherListFilterBoolean name={"Pokaż nauczycieli oferujących nauczanie w lokalu nauczyciela?"} checked={teachersLocation} onCheckedChange={setTeachersLocation}/>
        <TeacherListFilterBoolean name={"Pokaż nauczycieli oferujących nauczanie w domu ucznia?"} checked={studentsLocation} onCheckedChange={setStudentsLocation}/>
        <Select onValueChange={setSelectedCity} value={selectedCity}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Theme"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Wszystkie">Wszystkie</SelectItem>
            <SelectItem value="Wyszków">Wyszków</SelectItem>
            <SelectItem value="Warszawa">Warszawa</SelectItem>
          </SelectContent>
        </Select>
        {teachers.map((teacher) => (
          <TeachersListElement key={teacher.id} teacher={teacher}/>
        ))}
      </div>
    </>
  );
}

export default TeachersList;
