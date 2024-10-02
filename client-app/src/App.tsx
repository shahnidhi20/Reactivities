import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Header, List } from "semantic-ui-react";

function App() {
  const [activities, setActvities] = useState([]);

  //sideeffect
  useEffect(() => {
    //when this component renders
    axios.get("http://localhost:5000/api/activities").then((resposne) => {
      setActvities(resposne.data);
    });
  }, []);

  return (
    <div>
      <Header as="h1" icon="users" content="Activities"></Header>
      <List>
        {activities.map((activity: any) => (
          <List.Item key={activity.id}>{activity.title}</List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
