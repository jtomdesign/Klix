// services/authService.js

const BASE_URL = "https://dummyjson.com";

// --- Auth endpoints ---

// POST /auth/login
export async function loginUser({ username, password }) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
      expiresInMins: 30, // optional, defaults to 60
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Login failed");
  }

  return res.json();
  // { id, username, email, firstName, lastName, gender, image, accessToken, refreshToken }
}

// POST /auth/refresh — get a new accessToken using refreshToken
export async function refreshAuthToken(refreshToken) {
  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      refreshToken,
      expiresInMins: 30,
    }),
  });

  if (!res.ok) throw new Error("Token refresh failed");
  return res.json();
  // { accessToken, refreshToken }
}

// GET /auth/me — get current authenticated user (requires Bearer token)
export async function getCurrentUser(accessToken) {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) throw new Error("Failed to fetch current user");
  return res.json();
}

// --- Users endpoints (not auth-protected, general CRUD/browsing) ---

// GET /users — list all users, supports ?limit= & ?skip=
export async function getAllUsers({ limit = 30, skip = 0 } = {}) {
  const res = await fetch(`${BASE_URL}/users?limit=${limit}&skip=${skip}`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
  // { users: [...], total, skip, limit }
}

// GET /users/:id — single user by id
export async function getUserById(id) {
  const res = await fetch(`${BASE_URL}/users/${id}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

// GET /users/search?q= — search users
export async function searchUsers(query) {
  const res = await fetch(
    `${BASE_URL}/users/search?q=${encodeURIComponent(query)}`,
  );
  if (!res.ok) throw new Error("Failed to search users");
  return res.json();
}

// GET /users/filter?key=&value= — filter by a specific field
export async function filterUsers(key, value) {
  const res = await fetch(
    `${BASE_URL}/users/filter?key=${key}&value=${encodeURIComponent(value)}`,
  );
  if (!res.ok) throw new Error("Failed to filter users");
  return res.json();
}

// POST /users/add — add a new user (simulated, not persisted)
export async function addUser(userData) {
  const res = await fetch(`${BASE_URL}/users/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error("Failed to add user");
  return res.json();
}

// PUT/PATCH /users/:id — update a user (simulated, not persisted)
export async function updateUser(id, updates) {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Failed to update user");
  return res.json();
}

// DELETE /users/:id — delete a user (simulated, not persisted)
export async function deleteUser(id) {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete user");
  return res.json();
  // returns deleted user object + isDeleted: true, deletedOn: timestamp
}
