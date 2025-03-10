import TeachersList from "@/components/teachers/teachersList";

export default function TeachersPage() {
  return (
    <div className={"flex flex-col"}>
      <h1>Lista nauczycieli</h1>
      <TeachersList/>
    </div>
  )

}