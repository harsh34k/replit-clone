import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import SelectDefault from "./Dropdown";

export default function InputDefault() {
    const [selectedValue, setSelectedValue] = useState("");
    const [inputLable, setInputLable] = useState("")
    const [userName, setUserName] = useState("")

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(inputLable);
        console.log(selectedValue);
    }
    return (
        <div className="bg-red-50 w-screen h-screen flex justify-center items-center">
            <form onSubmit={handleFormSubmit} method="post" className="flex ">
                <SelectDefault selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
                <Input label="Repl Name" value={inputLable} onChange={(e) => setInputLable(e.target.value)} />
                <Input label="User Name" value={userName} onChange={(e) => setUserName(e.target.value)} />

                <button className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none" type="submit">submit</button>
            </form>
        </div>
    );
}