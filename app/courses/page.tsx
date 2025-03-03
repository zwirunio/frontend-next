import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import CoursesSideList from "@/components/courses/CoursesSideList";


export default async function Page() {



  const cookieStore = await cookies()
  const supabase = cookieStore && createClient(cookieStore)

  const { data: courses, error } = await supabase.from('courses').select()

  if (error) {
    return <p>Błąd ładowania danych: {error.message}</p>
  }

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 lg:space-x-6">
      {/* Course List Sidebar */}
      <div className="w-full md:w-1/3 lg:w-1/4">
        <CoursesSideList courses={courses}/>
      </div>
    </div>
  )
}
