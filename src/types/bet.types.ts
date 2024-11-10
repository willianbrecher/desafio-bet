export interface IBetCreatedRequest {
    amount: number
}

export interface IBetCreated {
  transactionId: string;
  currency: string;
  balance: number;
  winAmount: number;
}

export interface IBetCanceled {
  transactionId: string;
  balance: number;
  currency: string;
}

export interface IBetPageableListItem {
  id: string;
  createdAt: string;
  amount: number;
  winAmount: number;
  status: number;
}

export interface IBetPageableList {
  data: IBetPageableListItem[];
  total: number;
  page: number;
  limit: number;
}

export interface IBetPageableListQuery {
  id?: string;
  status?: string;
  page: number;
  limit: number;
}
