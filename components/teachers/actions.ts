import {createClient} from "@/utils/supabase/client";
import {Teacher} from "@/types/Teacher";

export async function fetchTeachers(
    city: string,
    online: boolean,
    studentsLocation: boolean,
    teachersLocation: boolean,
    nameSearchQuery: string,
    setTeachers: {
      (value: (Array<Teacher> | { (prevState: Array<Teacher>): Array<Teacher> })): void
    },
    setError: {
      (value: (null | string | { (prevState: (null | string)): (null | string) })): void
    })
  {
  const supabase = createClient();

  let query = supabase.from("teachers").select("*");

  if (city && city !== "Wszystkie") {
    query = query.eq("city", city)
  }

  if (online) {
    query = query.eq("online", true);
  }

  if (studentsLocation) {
    query = query.eq("students_location", true);
  }

  if (teachersLocation) {
    query = query.eq("teachers_location", true);
  }

  if (nameSearchQuery) {
    query = query.or('name.ilike."%' + nameSearchQuery + '%", surname.ilike."%' + nameSearchQuery + '%"')
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

export async function fetchTeacher(
  userId: string, setTeacher: (teacher: Teacher|null) => void, setError: (message: string | null) => void,
  )
{
  const supabase = createClient();

  let query = supabase
    .from("teachers")
    .select("*")
    .eq("user", userId);

  const {data, error} = await query;

  if (error) {
    setError(error.message);
    setTeacher(null);
  } else {
    setError(null);
    setTeacher(data[0] ?? null);
  }
}