"use client";
import  {createClient} from "@/utils/supabase/client";

import {useEffect, useState} from "react";
import {User} from "@supabase/auth-js";
import {Teacher} from "@/types/Teacher";
import {fetchTeacher, updateTeacher} from "@/components/teachers/actions";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Switch} from "@/components/ui/switch";

function ProfilePage() {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null);
  const [teacher, setTeacher] = useState<Teacher | null>()
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const {data} = await supabase.auth.getUser();
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

  function toggleOnline(){
      setTeacher(prevTeacher => ({
          ...prevTeacher,
          online: !prevTeacher?.online
      }) as Teacher);
  }
    function toggleTeacher(){
        setTeacher(prevTeacher => ({
            ...prevTeacher,
            teacher_location: !prevTeacher?.teacher_location
        }) as Teacher);
    }
    function toggleStudent(){
        setTeacher(prevTeacher => ({
            ...prevTeacher,
            student_location: !prevTeacher?.student_location
        }) as Teacher);
    }


  return (
    <>
      {
        editMode ?
          <div className="container mx-auto py-10">
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={"https://github.com/shadcn.png"} alt={teacher?.name}/>
                    <AvatarFallback>{teacher?.name[0]}{teacher?.surname[0]}</AvatarFallback>
                  </Avatar>
                  <CardTitle>Edycja profilu nauczyciela</CardTitle>
                </div>
              </CardHeader>
              <form action={updateTeacher}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Imię</Label>
                    <Input id="name" name="name" defaultValue={teacher?.name} required/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="surname">Nazwisko</Label>
                    <Input id="surname" name="surname" defaultValue={teacher?.surname} required/>
                  </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Opis</Label>
                        <Textarea name="description" id="description" placeholder="Powiedz nam coś o sobie" defaultValue={teacher?.description} />
                    </div>
                    {/*Textarea z polem description */}
                    <div className={"space-y-2"}>
                        <Label htmlFor="city">Miasto</Label>
                        <Select name={"city"}  defaultValue={teacher?.city}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Wybierz miasto" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Kraków">Kraków</SelectItem>
                                <SelectItem value="Poznań">Poznań</SelectItem>
                                <SelectItem value="Warszawa">Warszawa</SelectItem>
                                <SelectItem value="Wyszków">Wyszków</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="online"> Prowadzę Lekcje Online</Label>
                        <Switch name="online" id="online" checked={teacher?.online} onCheckedChange={toggleOnline}/>
                    </div>
                    <div>
                        <Label htmlFor="teacher_location"> Prowadzę Lekcje W Swoim Domu</Label>
                        <Switch name="teacher_location" id="teacher_location" checked={teacher?.teacher_location} onCheckedChange={toggleTeacher}/>
                    </div>
                    <div>
                        <Label htmlFor="student_location"> Prowadzę Lekcje W Domu Ucznia</Label>
                        <Switch name="student_location" id="student_location" checked={teacher?.student_location} onCheckedChange={toggleStudent}/>
                    </div>
                  <Input name={"id"} value={teacher?.id} type={"hidden"}/>
                  <div className="text-xs text-muted-foreground">ID: {teacher?.id}</div>

                </CardContent>
                <CardFooter className="flex justify-between">
                  {/*<Button variant="outline" type="button" onClick={() => history.back()}>*/}
                  {/*  Anuluj*/}
                  {/*</Button>*/}
                  <Button type="submit">Zapisz zmiany</Button>
                </CardFooter>
              </form>
            </Card>
          </div>
          // <div>
          //   <Form action={readQuery}>
          //     {/* On submission, the input value will be appended to
          // the URL, e.g. /search?query=abc */}
          //     <Input name="query" />
          //     <Button type="submit">Submit</Button>
          //   </Form>
          //
          //   <Button onClick={() => setEditMode(false)}>Zapisz</Button>
          // </div>
          :
          <div className={"flex flex-col"}>
            <p>{error}</p>
            <div className={"flex space-x-4"}>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png"/>
                <AvatarFallback>{teacher?.name[0]}{teacher?.surname[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className={"text-3xl"}>{teacher?.name} {teacher?.surname}</h1>
                <small>{user?.id}</small>
              </div>
            </div>
            <p>{teacher?.description}</p>
            <p>{teacher?.city}</p>
            <Button onClick={() => setEditMode(true)}>Edytuj</Button>
          </div>
      }


    </>
  );
}

export default ProfilePage;