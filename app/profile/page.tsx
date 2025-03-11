"use client";
import {createClient} from "@/utils/supabase/client";

import {useEffect, useState} from "react";
import {User} from "@supabase/auth-js";
import {Teacher} from "@/types/Teacher";
import {fetchTeacher} from "@/components/teachers/actions";
import {set} from "zod";

function ProfilePage() {
    const [user, setUser] = useState<User|null>(null);
    const [teacher, setTeacher] = useState<Teacher|null>()
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const supabase = createClient();
            const { data } = await supabase.auth.getUser();
            setUser(data?.user || null);
        };
        fetchUser();
    }, []);

  useEffect(() => {
    if (user?.id) {
      fetchTeacher(user?.id, setTeacher, setError)
    } else {
      setError("Nie ma tu jeszcze ID")
    }
  }, [user]);



  return (
    <>
      <h1>Profile</h1>
      {error}
        {user?.id}
      T: {teacher?.name} {teacher?.surname}


    </>
  );
}

export default ProfilePage;