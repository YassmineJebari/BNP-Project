// Interface pour un utilisateur
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'USER' | 'ADMIN';
  createdAt: Date;
}

// Ce qu'on envoie pour se connecter
export interface LoginRequest {
  email: string;
  password: string;
}

// Ce qu'on envoie pour s'inscrire
export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// Ce que le backend renvoie après connexion
export interface AuthResponse {
  token: string;
  user: User;
}