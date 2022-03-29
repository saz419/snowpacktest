export const fetchAgents = async () => {
  const res = await fetch("/api/agents.json");
  return res.json();
};
