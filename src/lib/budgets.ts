export async function getBudgets(token: string) {
  const response = await fetch('http://localhost:4000/budgets', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  console.log('BUDGET API STATUS:', response.status);
  console.log('BUDGET API RESPONSE:', data);

  if (!response.ok) {
    throw new Error(`Failed to fetch budgets: ${response.status} - ${JSON.stringify(data)}`);
  }

  return data;
}
