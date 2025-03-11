import {Teacher} from "@/types/Teacher";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {MapIcon} from "lucide-react";

export default function TeachersListElement({teacher}: { teacher: Teacher }) {
  return (
    <Card key={teacher.id}>
      <CardHeader className={"text-2xl"}>{teacher.name} {teacher.surname} </CardHeader>
      <CardContent>
        <span className={"flex space-x-4 text-gray-500 font-extralight uppercase"}><MapIcon/> <span>{teacher.city}</span></span>
        <hr className={"my-2"}/>
        {teacher.description}
      </CardContent>
    </Card>
  )
}