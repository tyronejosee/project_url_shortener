"use client";

import { Button, Input, Select, SelectItem } from "@heroui/react";
import { domains, groups, privacyItems } from "@/config/constants";

export default function CutterPage() {
  return (
    <main className="max-w-screen-md mx-auto p-6">
      <h1 className="text-4xl font-bold text-center pb-10">URL Cutter</h1>
      <form className="space-y-6">
        <Input
          isRequired
          label="URL"
          labelPlacement="outside"
          name="username"
          placeholder="https://www.example.com"
        />
        <div className="flex space-x-6">
          <Input
            type="password"
            label="Password"
            labelPlacement="outside"
            name="password"
            placeholder="********"
          />
          <Select
            items={privacyItems}
            label="Privacy"
            labelPlacement="outside"
            placeholder="Select a Domain"
            defaultSelectedKeys={["public"]}
          >
            {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
          </Select>
        </div>
        <div className="flex space-x-6">
          <Select
            isDisabled
            items={domains}
            label="Domain"
            labelPlacement="outside"
            placeholder="Select a Domain"
          >
            {(domain) => (
              <SelectItem key={domain.id}>{domain.domain}</SelectItem>
            )}
          </Select>
          <Select
            isDisabled
            items={groups}
            label="Group"
            labelPlacement="outside"
            placeholder="Select a Group"
          >
            {(group) => <SelectItem key={group.id}>{group.name}</SelectItem>}
          </Select>
        </div>
        <Button color="primary">Cut</Button>
      </form>
    </main>
  );
}
