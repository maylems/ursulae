export type ProxyKeyStatus = 'active' | 'revoked';

// Matches ai-financial-control-backend's /proxy-keys responses.
export type ProxyKey = {
  id: string;
  label: string;
  keyPrefix: string;
  status: ProxyKeyStatus;
  lastUsedAt: string | null;
  createdAt: string;
};

// The plaintext key exists only in the create response.
export type CreatedProxyKey = ProxyKey & { key: string };
