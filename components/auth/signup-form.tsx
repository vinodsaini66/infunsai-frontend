"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Form, Input, Button } from "antd"

export function SignupForm() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const [form] = Form.useForm()

  const handleSubmit = async (values: any) => {
    console.log("Form values:", values)
    setLoading(true)

    delete values.confirmPassword

    try {
      const res = await fetch("/api/auth/signup", {
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
        title: "Account created successfully!",
        description: "Welcome to LinkedinAI. Let's set up your goals.",
      })

      router.push("/onboarding")
    } catch (error: any) {
      toast({
        title: "Failed to create account",
        description: error.message || "Something went wrong",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      className="max-w-lg mx-auto space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">
        <Form.Item
          label="First Name"
          name="first_name"
          rules={[{ required: true, message: "Please enter your first name" }]}
        >
          <Input placeholder="John" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="last_name"
          rules={[{ required: true, message: "Please enter your last name" }]}
        >
          <Input placeholder="Doe" />
        </Form.Item>
      </div>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please enter your email" },
          { type: "email", message: "Please enter a valid email" },
        ]}
      >
        <Input placeholder="john@example.com" />
      </Form.Item>

      <Form.Item label="Company Name" name="company_name">
        <Input placeholder="Acme Corp" />
      </Form.Item>

      <Form.Item
        label="Current Role"
        name="role"
        rules={[{ required: true, message: "Please select your role" }]}
      >
        <Input placeholder="Current Role" />

      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please enter your password" }]}
      >
        <Input.Password placeholder="Enter password" />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="confirmPassword"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Please confirm your password" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve()
              }
              return Promise.reject(
                new Error("Passwords do not match")
              )
            },
          }),
        ]}
      >
        <Input.Password placeholder="Confirm password" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="w-full"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </Button>
      </Form.Item>
    </Form>
  )
}
