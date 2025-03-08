import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {save} from "@/app/form/actions";
// import {useFormState} from "react-dom";

// function saveForm(formData: FormData) {
//     const [errors] = await save(formData);
//
//     console.log(errors);
//
// }

const initialState = {};
export default function FormPage(){
    return(
        <Card className={"w-8/12"}>
            <form>
            <CardHeader>Dodawnie lekcji</CardHeader>
            <CardContent>
                <div className={"space-y-2"}>
                    <Label>Temat zajęć</Label>
                    <Input type={"text"} name={"topic"} minLength={10}/>
                </div>
                <div className={"space-y-2"}>
                    <Label>Opis zajęć</Label>
                    <Textarea name={"description"} minLength={10}/>
                </div>
                <div className={"space-y-2"}>
                    <Label htmlFor={"date"}>Data lekcji</Label>
                    <Input name={"date"} type={"datetime-local"} id={"date"}></Input>
                </div>
                <div className={"space-y-2"}>
                    <Label>Przedmiot</Label>
                    <Select name={"subject"}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Wybierz przedmiot" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="matematyka">Matematyka</SelectItem>
                            <SelectItem value="fizyka">Fizyka</SelectItem>
                            <SelectItem value="wf">WF</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className={"space-y-2"}>
                    <Label>Ilość miejsc</Label>
                    <Input name={"studentQty"} type={"number"} min={1} max={32} defaultValue={1}/>
                </div>
            </CardContent>
            <CardFooter>
                <Button formAction={save}>Zapisz</Button>
            </CardFooter>
            </form>
        </Card>
    )
}