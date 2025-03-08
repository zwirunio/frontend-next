"use client";


import {createClient} from "@/utils/supabase/client";
import {useEffect, useState} from "react";
import {User} from "@supabase/auth-js";

function ProfilePage() {
    const [user, setUser] = useState<User|null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const supabase = createClient(); // Tworzymy instancję Supabase wewnątrz komponentu
            const { data } = await supabase.auth.getUser();
            setUser(data?.user || null);
        };

        fetchUser();
    }, []);

  return (
    <>
      <h1>Profile</h1>

        {user?.id}


    </>
  );
}

export default ProfilePage;