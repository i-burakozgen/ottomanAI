import { useState } from "react";
import { Input, Button } from "@chakra-ui/react";
const Login = () => {
    const [inputs, setInputs] = useState({
        password:"",
        username:"",
      })
  return (
    <>
     <Input placeholder="username" fontSize={14} type="username" value={inputs.username} onChange={(e) => setInputs({...inputs, username:e.target.value})} />
     <Input fontSize={14} type="password" placeholder="password" value={inputs.password}  onChange={(e) => setInputs({...inputs, password:e.target.value})} />
     <Button w={"full"} colorScheme="blue" size={"sm"} fontSize={"14"}>
            Log in
    </Button>
    </>
  )
}

export default Login
