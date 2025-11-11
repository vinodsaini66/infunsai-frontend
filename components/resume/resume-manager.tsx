"use client"

import React, { useState } from "react"
import { Form, Input, Button, Upload, Space, message, Card } from "antd"
import { PlusOutlined, InboxOutlined } from "@ant-design/icons"
import type { UploadProps } from "antd"
import { RcFile } from "antd/es/upload"

const { Dragger } = Upload
const { TextArea } = Input

export const ResumeManager = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<RcFile | null>(null)

  // Drag & Drop Upload config
  const uploadProps: UploadProps = {
    name: "resume",
    multiple: false,
    beforeUpload: (file) => {
      setFile(file)
      return false // prevent auto-upload
    },
    onRemove: () => setFile(null),
  }

  const handleSubmit = async (values: any) => {
    if (!file) {
      message.error("Please upload your resume file.")
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("data", JSON.stringify(values))

      const res = await fetch("/api/resume", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) throw new Error("Failed to submit resume")

      message.success("Resume submitted successfully!")
      form.resetFields()
      setFile(null)
    } catch (error) {
      console.error(error)
      message.error("Error submitting resume")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="shadow-md rounded-xl">
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        disabled={loading}
      >
        {/* Resume Upload */}
        <Form.Item label="Upload Resume (PDF or DOCX)" required>
          <Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to upload</p>
          </Dragger>
        </Form.Item>

        {/* Basic Info */}
        <Form.Item
          label="Full Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input placeholder="John Doe" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            { required: true, message: "Please enter your phone number" },
            { pattern: /^[0-9]{10}$/, message: "Enter valid 10-digit number" },
          ]}
        >
          <Input placeholder="9876543210" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Enter a valid email" },
          ]}
        >
          <Input placeholder="example@email.com" />
        </Form.Item>

        <Form.Item
          label="Profile Summary"
          name="profileSummary"
          rules={[{ required: true, message: "Please add a profile summary" }]}
        >
          <TextArea rows={4} placeholder="Brief introduction about yourself..." />
        </Form.Item>

        {/* Skills */}
        <Form.List name="skills" 
          rules={[{ required: true, message: "Please add at least one skill" }]}>
          {(fields, { add, remove }) => (
            <div>
              <label className="font-medium">Skills</label>
              {fields.map((field) => (
                <Space key={field.key} align="baseline" className="mb-2">
                  <Form.Item
                    {...field}
                    name={[field.name, "skill"]}
                    rules={[{ required: true, message: "Skill is required" }]}
                  >
                    <Input placeholder="e.g. React.js" />
                  </Form.Item>
                  <Button danger type="link" onClick={() => remove(field.name)}>
                    Remove
                  </Button>
                </Space>
              ))}
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
                block
              >
                Add Skill
              </Button>
            </div>
          )}
        </Form.List>

        {/* Work Experience */}
        <Form.List name="experience">
          {(fields, { add, remove }) => (
            <div className="mt-4">
              <label className="font-medium">Work Experience</label>
              {fields.map((field) => (
                <Card key={field.key} size="small" className="mb-3 border">
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Form.Item
                      label="Company Name"
                      name={[field.name, "company"]}
                      rules={[{ required: true, message: "Company name required" }]}
                    >
                      <Input placeholder="Company name" />
                    </Form.Item>

                    <Form.Item
                      label="Position"
                      name={[field.name, "position"]}
                      rules={[{ required: true, message: "Position required" }]}
                    >
                      <Input placeholder="Job Title" />
                    </Form.Item>

                    <Form.Item
                      label="Duration"
                      name={[field.name, "duration"]}
                      rules={[{ required: true, message: "Duration required" }]}
                    >
                      <Input placeholder="e.g. Jan 2020 - Dec 2023" />
                    </Form.Item>

                    <Form.Item
                      label="Responsibilities"
                      name={[field.name, "responsibilities"]}
                    >
                      <TextArea rows={2} placeholder="Describe your key work..." />
                    </Form.Item>

                    <Button danger type="link" onClick={() => remove(field.name)}>
                      Remove Experience
                    </Button>
                  </Space>
                </Card>
              ))}
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
                block
              >
                Add Experience
              </Button>
            </div>
          )}
        </Form.List>

        <Form.Item className="mt-6">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="bg-emerald-600"
          >
            Submit Resume
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}
