"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().min(8, {
    message: "email must be at least 10 characters.",
  }),
  password: z.string().min(8, {
    message: "password must be at least 8 characters.",
  }),
});

export default function Login() {
  const [resMessage, setResMessage] = useState("");
  const [show,setShow]=useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const res = await axios.post("/api/auth/signup", values);
    setResMessage(res.data.message);
    setShow(true)
    setTimeout(()=>{setShow(false)},5000)
    form.reset()
  };

  return (
    <>
    <div className="flex flex-col items-center justify-center gap-1 m-4 ">
      <h1 className="text-5xl font-bold">Sign UP, Champ!</h1>
      <p className="text-xl font-thin">We are excited to have you join us.</p>
    </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 border-2 rounded-lg p-10 md:w-1/2 lg:w-1/3 text"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormDescription>Enter email above</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@nextsong.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter email above.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormDescription>Enter password above.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      {show && (
        <Alert className="absolute z-50 top-10 left-1/2 -translate-x-1/2 w-[90%] max-w-md shadow-lg text-emerald-500" variant={resMessage !== "User created" ? "destructive" : "default"}>
          <Terminal className="h-4 w-4" />
          <AlertTitle>{resMessage === "User created" ? "Success!" : "Error!"}</AlertTitle>
          <AlertDescription>
            {resMessage}
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
