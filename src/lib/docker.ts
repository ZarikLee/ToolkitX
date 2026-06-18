import { Container, ContainerDetail } from "@/types";

const DOCKER_API_BASE = "/api/docker";

export async function listContainers(): Promise<Container[]> {
  const response = await fetch(`${DOCKER_API_BASE}/containers`);
  if (!response.ok) {
    throw new Error("Failed to fetch containers");
  }
  return response.json();
}

export async function getContainer(id: string): Promise<ContainerDetail> {
  const response = await fetch(`${DOCKER_API_BASE}/containers/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch container");
  }
  return response.json();
}

export async function startContainer(id: string): Promise<void> {
  const response = await fetch(`${DOCKER_API_BASE}/containers/${id}/start`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Failed to start container");
  }
}

export async function stopContainer(id: string): Promise<void> {
  const response = await fetch(`${DOCKER_API_BASE}/containers/${id}/stop`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Failed to stop container");
  }
}

export async function restartContainer(id: string): Promise<void> {
  const response = await fetch(
    `${DOCKER_API_BASE}/containers/${id}/restart`,
    { method: "POST" }
  );
  if (!response.ok) {
    throw new Error("Failed to restart container");
  }
}

export async function removeContainer(id: string): Promise<void> {
  const response = await fetch(`${DOCKER_API_BASE}/containers/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to remove container");
  }
}

export async function getContainerLogs(
  id: string,
  tail: number = 100
): Promise<string> {
  const response = await fetch(
    `${DOCKER_API_BASE}/containers/${id}/logs?tail=${tail}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch container logs");
  }
  return response.text();
}
