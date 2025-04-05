"use client";

import { Button, Input, Select, SelectItem } from "@heroui/react";
import { domains, privacyItems } from "@/config/constants";
import { GroupRead } from "@/types";

type Props = {
  groups: GroupRead[];
};

export default function CutterContainer({ groups }: Props) {
  return (
    <form className="space-y-6">
      <Input
        label="URL"
        labelPlacement="outside"
        size="lg"
        name="username"
        placeholder="https://www.example.com"
      />
      <div className="flex space-x-6">
        <Input
          type="password"
          label="Password"
          size="lg"
          labelPlacement="outside"
          name="password"
          placeholder="********"
        />
        <Select
          size="lg"
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
          // isDisabled
          size="lg"
          items={domains}
          label="Domain"
          labelPlacement="outside"
          placeholder="Select a Domain"
        >
          {(domain) => <SelectItem key={domain.id}>{domain.domain}</SelectItem>}
        </Select>
        <Select
          // isDisabled
          size="lg"
          items={groups}
          label="Group"
          labelPlacement="outside"
          placeholder="Select a Group"
        >
          {(group) => <SelectItem key={group.id}>{group.name}</SelectItem>}
        </Select>
      </div>
      <div className="flex justify-end">
        <Button size="lg" color="primary">
          Cut
        </Button>
      </div>
    </form>
  );
}
