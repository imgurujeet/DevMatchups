"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReactOtpInput from "react-otp-input";
import { Button } from "@/components/ui/button"


export default function VerifyForm() {
  const router = useRouter();
  const [otp, setOtp] = useState(""); 
 
  
  const onSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/signup",{});
      console.log("response", response);
      // Navigate to another page if needed
       router.push('/team');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('Axios error message:', error?.response?.data?.message || error?.message);
      } else {
        console.log("Unexpected Error", error);
      }
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">      
      <form onSubmit={onSubmit} className="w-full grid place-items-center h-[80vh]">
        <Card className="w-full max-w-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Verify Email</CardTitle>
            <CardDescription>OTP is sent to your Email.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <ReactOtpInput
                value={otp}
                onChange={(otp) => setOtp(otp)}
                numInputs={6}
                shouldAutoFocus
                renderInput={(props: any) => (
                  <input
                    {...props}
                    placeholder="-"
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-[48px] lg:w-[60px] border-0 bg-black rounded-[0.5rem] text-white aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                  />
                )}
                containerStyle={{
                  justifyContent: "space-between",
                  gap: "0 6px",
                }}
              />
            </div>
            <Button type="submit" className="w-full">
              Verify
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
