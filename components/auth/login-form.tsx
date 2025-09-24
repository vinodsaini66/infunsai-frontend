"use client";

import { useState } from "react";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation"

const { Link } = Typography;

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const router = useRouter()
  const handleSubmit = async (values: any) => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      toast({
        title: "Login successful!",
        description: "Welcome back to LinkedinAI.",
      })

      router.push("/onboarding")
    } catch (error: any) {
      toast({
        title: "Failed to login",
        description: error.message || "Something went wrong",
      })
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit}
      className="space-y-4"
      initialValues={{ remember: true }}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please enter your email!" },
          { type: "email", message: "Enter a valid email address!" },
        ]}
      >
        <Input placeholder="john@example.com" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please enter your password!" }]}
      >
        <Input.Password placeholder="••••••••" />
      </Form.Item>

      <div className="flex items-center justify-between mb-2">
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Link href="#" className="text-sm">
          Forgot password?
        </Link>
      </div>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          className="w-full"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>
      </Form.Item>
    </Form>
  );
}
