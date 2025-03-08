import { z } from "zod";

const now = new Date();
now.setSeconds(0, 0);

// Definiujemy schemat walidacji dla formularza
export const lessonSchema = z.object({
    topic: z.string().min(10, "Temat zajęć musi mieć co najmniej 10 znaków."),
    description: z.string().min(10, "Opis zajęć musi mieć co najmniej 10 znaków."),
    date: z
        .string()
        .nonempty("Data lekcji jest wymagana.")
        .refine((dateString) => {
            const inputDate = new Date(dateString);
            return inputDate > now; // Sprawdzenie, czy data jest w przyszłości
        }, {
            message: "Data lekcji musi być w przyszłości."
        }),
    subject: z.enum(["matematyka", "fizyka", "wf"], {
        errorMap: () => ({ message: "Wybierz poprawny przedmiot." }),
    }),
    studentQty: z
        .string()
        .transform(Number)
        .refine((n) => n >= 1 && n <= process.env.MAX_STUDENTS_PER_CLASS, {
            message: "Ilość miejsc musi być w zakresie 1-"+process.env.MAX_STUDENTS_PER_CLASS+".",
        }),
});

// Typy dla TypeScript
export type LessonFormData = z.infer<typeof lessonSchema>;
