import {Switch} from "@/components/ui/switch";

export default function TeacherListFilterBoolean(props: { checked: boolean, onCheckedChange: (value : boolean) => void, name: string, desc?: string }) {
  function toggleSwitch(){
    props.onCheckedChange(!props.checked);
  }

  return <div className={"border rounded-xl p-2 flex justify-between items-center"}>
    <div className={"flex flex-col"}>
      <span>{props.name}</span>
      {props.desc && <small>{props.desc}</small>}
    </div>
    <Switch checked={props.checked} onCheckedChange={toggleSwitch}/>
  </div>;
}