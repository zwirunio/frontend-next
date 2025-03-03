"use client";

import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import React, {useContext, useState} from "react";
import {AuthContext} from "@/contexts/auth-context-provider";

function LoginPage() {
    const authContext = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        if(email && password == "123") {
          authContext?.setAuth({email});
          console.log("Logged in");
        }
    }
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Logowanie</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input onChange={(e)=>setEmail(e.target.value)} type="email" id="email" name="email" placeholder="Enter email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input onChange={(e)=>setPassword(e.target.value)}  type="password" id="password" name="password" placeholder="Enter password" required />
            </div>
            <CardFooter className="flex justify-end p-0 mt-4">
              <Button type="submit" className="w-full hover:bg-primary">
                Zaloguj się
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    );
}

export default LoginPage;