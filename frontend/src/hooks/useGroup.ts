"use client";

import { useState } from "react";
import {
  createGroup,
  getGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
} from "@/services/groupService";
import { GroupRead, GroupWrite } from "@/types";

export default function useGroup() {
  const [groups, setGroups] = useState<GroupRead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const fetchGroups = async () => {
    setIsLoading(true);
    setErrors([]);
    try {
      const data = await getGroups();
      setGroups(data);
    } catch (error: any) {
      setErrors([error.message]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGroupById = async (id: string) => {
    setIsLoading(true);
    setErrors([]);
    try {
      const data = await getGroupById(id);
      return data;
    } catch (error: any) {
      setErrors([error.message]);
    } finally {
      setIsLoading(false);
    }
  };

  const addGroup = async (data: {
    name: string;
    description: string;
    alias: string;
  }) => {
    setIsLoading(true);
    setErrors([]);
    try {
      const newGroup = await createGroup(data);
      setGroups([...groups, newGroup]);
    } catch (error: any) {
      setErrors([error.message]);
    } finally {
      setIsLoading(false);
    }
  };

  const editGroup = async (id: string, data: GroupWrite) => {
    setIsLoading(true);
    setErrors([]);
    try {
      const updatedGroup = await updateGroup(id, data);
      setGroups(
        groups.map((group) => (group.id === id ? updatedGroup : group))
      );
    } catch (error: any) {
      setErrors([error.message]);
    } finally {
      setIsLoading(false);
    }
  };

  const removeGroup = async (id: string) => {
    setIsLoading(true);
    setErrors([]);
    try {
      await deleteGroup(id);
      setGroups(groups.filter((group) => group.id !== id));
    } catch (error: any) {
      setErrors([error.message]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    groups,
    isLoading,
    errors,
    fetchGroups,
    fetchGroupById,
    addGroup,
    editGroup,
    removeGroup,
  };
}
