export interface ProductProps {
  id: string | number;
  title: string;
  price: number;
  quantity: number;
  description: string;
}

export interface TransactionProps {
  id: string | number;
  name: string;
  quantity: number;
  title: string;
  price: number;
  idProduct?: string | number;
}
