'use server'


import {lessonSchema} from "@/app/form/types";

export async function save(
    formData: FormData
) {
    const result = lessonSchema.safeParse(formData);

    if (!result.success) {
        // Obsługa błędów (można np. zwrócić komunikat do UI)
        console.error(result.error.format());
        return { errors: result.error.format() };
    }
    console.log(formData);
}