import TeachersList from "@/components/teachers/teachersList";

export default function TeachersPage() {
  return (
    <div className={"flex flex-col space-y-4"}>
      <h1 className={"text-3xl"}>Lista nauczycieli</h1>
      <TeachersList/>
    </div>
  )

}