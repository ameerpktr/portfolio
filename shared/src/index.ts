export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  message: string;
  website?: string;
};

export type ApiResponse<T> = {
  ok: boolean;
  data?: T;
  message?: string;
};
