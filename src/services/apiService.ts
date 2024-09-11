export const fetchData = async <T>(
  url: string, 
  accessToken?: string, 
  email?: string, 
  password?: string
): Promise<T> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const body = email && password
    ? JSON.stringify({ email, password })
    : undefined;

  const response = await fetch(url, {
    method: body ? 'POST' : 'GET',
    headers,
    body,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}. Status: ${response.status}`);
  }

  return response.json() as Promise<T>;
};
