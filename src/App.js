import { useState } from "react";
import "./App.css";
import Form1 from "./Forms/Form1";
import Form2 from "./Forms/Form2";


function App() {
  const [form, setForm] = useState('event');

  const handleForm = (event) => {
    setForm(event.target.value);
  };

  return (
    <div>
      <main >
      <nav>
      <select onChange={handleForm} value={form} className='color'>
            <option value="event" >Event </option>
            <option value="job" >Job</option>
      </select>
      </nav>
      
        {form === "event" && <Form1 />}
        {form === "job" && <Form2 />}
        
      </main>
    </div>
  );
}

export default App;
